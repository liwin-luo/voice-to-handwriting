"use client";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowClockwise,
  CalendarBlank,
  FilePdf,
  Image as ImageIcon,
  Stack,
} from "@phosphor-icons/react";
import { jsPDF } from "jspdf";
import { FONTS } from "@/stores/useEditorStore";
import { useDebouncedImeSafe } from "./useDebouncedImeSafe";
import { dailyPick, toDateStr, weekDates, type DailyLevel, type DailySheet } from "@/content/dailyCursive";
import { PAGE_FORMATS, type PageFormat } from "@/lib/localeDefaults";
import PageFormatToggle from "./PageFormatToggle";
import PracticeLayout from "./PracticeLayout";
const INK = "#1f2937";
const FONT_OPTIONS = ["cedarvillecursive", "dancingscript"] as const;
/** 级别 → 行高与空白练习行数:儿童行高大、句子抄写行少;成人行高小、抄写行多 */
const LEVELS: { id: DailyLevel; bandH: number; blankRows: number }[] = [
  { id: "kids", bandH: 88, blankRows: 2 },
  { id: "adults", bandH: 80, blankRows: 3 },
];

function primaryFamily(css: string): string {
  return css.match(/'([^']+)'/)?.[1] ?? "cursive";
}

/** 客户端本地日期:服务端快照为空字符串,挂载后才有值,天然无水合不匹配 */
const subscribeNoop = () => () => {};
const emptySnapshot = () => "";
const clientDate = () => toDateStr(new Date());

interface SheetOptions {
  sheet: DailySheet;
  displayDate: string;
  name: string;
  family: string;
  bandH: number;
  blankRows: number;
  labels: { title: string; warmup: string; letters: string; words: string; sentence: string; name: string };
  pageW: number;
  pageH: number;
}

/** 标题/姓名用练习字体但保留 CJK 系统回退(标题按 UI locale 翻译,拉丁草书字体没有汉字字形) */
function titleFont(px: number, family: string): string {
  return `${px}px "${family}", "Kaiti SC", "KaiTi", "STKaiti", serif`;
}

function line(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function drawGuides(ctx: CanvasRenderingContext2D, y0: number, bandH: number, pageW: number) {
  const right = pageW - 40;
  ctx.save();
  ctx.strokeStyle = "#b8c8dc";
  ctx.lineWidth = 1;
  ctx.globalAlpha = 0.7;
  line(ctx, 40, y0, right, y0);
  ctx.restore();
  ctx.save();
  ctx.strokeStyle = "#9db3cc";
  ctx.setLineDash([8, 6]);
  line(ctx, 40, y0 + bandH * 0.52, right, y0 + bandH * 0.52);
  ctx.restore();
  ctx.save();
  ctx.strokeStyle = "#9db3cc";
  line(ctx, 40, y0 + bandH, right, y0 + bandH);
  ctx.restore();
}

/** 钻串行:首遍深色示例,其余 28% 描灰,重复铺满整行 */
function drawRepeatRow(ctx: CanvasRenderingContext2D, text: string, y0: number, bandH: number, family: string, pageW: number) {
  const fontSize = Math.round(bandH * 0.6);
  ctx.font = `${fontSize}px "${family}"`;
  ctx.textBaseline = "alphabetic";
  const baseline = y0 + bandH - 8;
  let x = 60;
  let i = 0;
  while (x < pageW - 60) {
    const tw = ctx.measureText(text).width;
    if (x + tw > pageW - 60) break;
    ctx.save();
    if (i === 0) {
      ctx.fillStyle = INK;
      ctx.fillText(text, x, baseline);
    } else {
      ctx.strokeStyle = INK;
      ctx.lineWidth = 1.15;
      ctx.setLineDash([2.5, 2.5]);
      ctx.strokeText(text, x, baseline);
    }
    ctx.restore();
    x += tw + 26;
    i++;
  }
}

/** 句子行:单条描灰(0.35),超宽时按行宽缩放字号 */
function drawSentenceRow(ctx: CanvasRenderingContext2D, text: string, y0: number, bandH: number, family: string, pageW: number) {
  let size = Math.round(bandH * 0.58);
  ctx.font = `${size}px "${family}"`;
  const maxW = pageW - 120;
  const tw = ctx.measureText(text).width;
  if (tw > maxW) {
    size = Math.max(16, Math.floor((size * maxW) / tw));
    ctx.font = `${size}px "${family}"`;
  }
  ctx.save();
  ctx.strokeStyle = INK;
  ctx.lineWidth = 1.15;
  ctx.setLineDash([2.5, 2.5]);
  ctx.textBaseline = "alphabetic";
  ctx.strokeText(text, 60, y0 + bandH - 8);
  ctx.restore();
}

/** 绘制一页每日练习(今日页预览与 7 天套装共用) */
function drawSheet(ctx: CanvasRenderingContext2D, opts: SheetOptions) {
  const { sheet, displayDate, name, family, bandH, blankRows, labels, pageW, pageH } = opts;
  const [W, H] = [pageW, pageH];
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, W, H);
  ctx.textBaseline = "alphabetic";

  // 页眉:标题(练习字体)+ 日期 + 姓名栏
  ctx.fillStyle = "#18181b";
  ctx.font = titleFont(34, family);
  ctx.fillText(labels.title, 60, 64);
  ctx.fillStyle = "#52525b";
  ctx.font = "15px sans-serif";
  ctx.textAlign = "right";
  ctx.fillText(displayDate, W - 60, 58);
  ctx.textAlign = "left";
  ctx.fillStyle = "#71717a";
  ctx.font = "13px sans-serif";
  ctx.fillText(labels.name, 60, 96);
  const nameX = 60 + ctx.measureText(labels.name).width + 14;
  if (name) {
    ctx.fillStyle = INK;
    ctx.font = titleFont(24, family);
    ctx.fillText(name, nameX, 96);
  }
  ctx.save();
  ctx.strokeStyle = "#d4d4d8";
  ctx.lineWidth = 1;
  line(ctx, nameX, 101, W - 60, 101);
  ctx.restore();

  let y = 114;
  const section = (label: string, rows: number, render: (y0: number, row: number) => void) => {
    ctx.fillStyle = "#a1a1aa";
    ctx.font = "600 11px sans-serif";
    ctx.fillText(label.toUpperCase(), 42, y + 8);
    y += 26;
    for (let row = 0; row < rows; row++) {
      drawGuides(ctx, y, bandH, W);
      render(y, row);
      y += bandH;
    }
  };

  section(labels.warmup, 1, (y0) => drawRepeatRow(ctx, sheet.warmup, y0, bandH, family, W));
  section(labels.letters, 2, (y0, row) => drawRepeatRow(ctx, sheet.groups[row].letters, y0, bandH, family, W));
  section(labels.words, 3, (y0, row) => drawRepeatRow(ctx, sheet.words[row], y0, bandH, family, W));
  section(labels.sentence, 1 + blankRows, (y0, row) => {
    if (row === 0) drawSentenceRow(ctx, sheet.sentence, y0, bandH, family, W);
  });

  ctx.fillStyle = "#c9c9ce";
  ctx.font = "11px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("voicetohandwriting.online", W / 2, H - 16);
  ctx.textAlign = "left";
}

/** 每日草书练习生成器:daily seed(同一天全球同一份)+ 打开即下载,零输入门槛 */
export default function DailyCursivePracticeGenerator({ defaultFormat }: { defaultFormat: PageFormat }) {
  const t = useTranslations("dailyCursive");
  const fontNames = useTranslations("tool");
  const locale = useLocale();
  const [format, setFormat] = useState<PageFormat>(defaultFormat);
  const { w: pageW, h: pageH } = PAGE_FORMATS[format];
  const [level, setLevel] = useState<DailyLevel>("kids");
  const [fontId, setFontId] = useState<string>(FONT_OPTIONS[0]);
  const [name, setName] = useState("");
  const today = useSyncExternalStore(subscribeNoop, clientDate, emptySnapshot);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const w = pageW;
  const h = pageH;

  const font = FONTS.find((f) => f.id === fontId) ?? FONTS[0];
  const family = primaryFamily(font.css);
  const preset = LEVELS.find((l) => l.id === level) ?? LEVELS[0];
  // 姓名是用户输入:防抖 + IME 组词期间暂停重绘
  const [drawName, compositionProps] = useDebouncedImeSafe(name);

  const sheet = useMemo(() => (today ? dailyPick(today, level) : null), [today, level]);

  const labelSet = () => ({
    title: t("sheetTitle"),
    warmup: t("warmup"),
    letters: t("letters"),
    words: t("words"),
    sentence: t("sentence"),
    name: t("nameField"),
  });

  const longDate = (dateStr: string) =>
    new Intl.DateTimeFormat(locale, { weekday: "long", year: "numeric", month: "long", day: "numeric" }).format(new Date(`${dateStr}T12:00:00`));

  useEffect(() => {
    if (!sheet) return;
    let cancelled = false;
    const run = async () => {
      // 传入实际文字,确保字体切片按需加载对应字形后再绘制
      const sample = `${t("sheetTitle")} ${drawName} ${sheet.warmup} ${sheet.groups[0].letters} ${sheet.groups[1].letters} ${sheet.words.join(" ")} ${sheet.sentence}`;
      await document.fonts.load(`${Math.round(preset.bandH * 0.6)}px "${family}"`, sample).catch(() => {});
      if (cancelled) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      drawSheet(ctx, {
        sheet,
        displayDate: longDate(sheet.dateStr),
        name: drawName.trim(),
        family,
        bandH: preset.bandH,
        blankRows: preset.blankRows,
        labels: labelSet(),
        pageW,
        pageH,
      });
    };
    void run();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sheet, fontId, drawName, locale, format]);

  const renderSheetCanvas = (dateStr: string): string | null => {
    const off = document.createElement("canvas");
    off.width = w;
    off.height = h;
    const ctx = off.getContext("2d");
    if (!ctx) return null;
    drawSheet(ctx, {
      sheet: dailyPick(dateStr, level),
      displayDate: longDate(dateStr),
      name: drawName.trim(),
      family,
      bandH: preset.bandH,
      blankRows: preset.blankRows,
      labels: labelSet(),
      pageW,
      pageH,
    });
    return off.toDataURL("image/png");
  };

  const downloadPdf = () => {
    const url = renderSheetCanvas(today);
    if (!url) return;
    const pdf = new jsPDF({ unit: "px", format: [w, h], orientation: "portrait" });
    pdf.addImage(url, "PNG", 0, 0, w, h);
    pdf.save(`daily-cursive-practice-${today}.pdf`);
  };

  /** 本周一到周日,每天一页合并导出 */
  const downloadWeek = async () => {
    if (!today) return;
    const dates = weekDates(new Date(`${today}T12:00:00`));
    const urls: string[] = [];
    for (const d of dates) {
      urls.push(renderSheetCanvas(d) ?? "");
      // 逐页让出主线程,7 页连绘不卡交互
      await new Promise((r) => setTimeout(r, 0));
    }
    const pdf = new jsPDF({ unit: "px", format: [w, h], orientation: "portrait" });
    let page = 0;
    for (const u of urls) {
      if (!u) continue;
      if (page > 0) pdf.addPage([w, h], "portrait");
      pdf.addImage(u, "PNG", 0, 0, w, h);
      page++;
    }
    pdf.save(`daily-cursive-practice-week-${dates[0]}.pdf`);
  };

  /** 离屏 2x 重绘,导出清晰的 PNG */
  const downloadPng = () => {
    if (!sheet) return;
    const scale = 2;
    const off = document.createElement("canvas");
    off.width = w * scale;
    off.height = h * scale;
    const ctx = off.getContext("2d");
    if (!ctx) return;
    ctx.scale(scale, scale);
    drawSheet(ctx, {
      sheet,
      displayDate: longDate(sheet.dateStr),
      name: drawName.trim(),
      family,
      bandH: preset.bandH,
      blankRows: preset.blankRows,
      labels: labelSet(),
      pageW,
      pageH,
    });
    off.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `daily-cursive-practice-${today}.png`;
      a.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  };

  return (
    <PracticeLayout
      input={
        <>
          <div className="rounded-xl border border-zinc-200 bg-white p-3">
            <div className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-zinc-400">
                <CalendarBlank className="size-4" />
                {t("todayLabel")}
              </span>
              <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[11px] font-medium text-accent">{t("todayBadge")}</span>
            </div>
            <p className="mt-1.5 font-hand text-lg leading-snug text-zinc-900">{today ? longDate(today) : "—"}</p>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="field-label">{t("levelLabel")}</span>
            <div className="flex gap-1.5">
              {LEVELS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => setLevel(l.id)}
                  className={`cursor-pointer rounded-lg border px-2.5 py-1.5 text-xs transition-colors ${
                    level === l.id
                      ? "border-accent bg-accent/5 text-accent"
                      : "border-zinc-200 bg-white text-zinc-500 hover:border-zinc-300"
                  }`}
                >
                  {t(l.id === "kids" ? "levelKids" : "levelAdults")}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="field-label">{t("nameLabel")}</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              {...compositionProps}
              placeholder={t("namePlaceholder")}
              className="surface-input p-2.5 text-sm"
            />
          </div>
        </>
      }
      download={
        <>
          <div className="flex flex-col gap-2">
            <button onClick={downloadPdf} disabled={!sheet} className="btn btn-primary w-full px-4 py-2.5 text-sm disabled:opacity-40">
              <FilePdf className="size-4" />
              {t("downloadPdf")}
            </button>
            <button onClick={downloadWeek} disabled={!today} className="btn btn-ghost w-full px-4 py-2.5 text-sm disabled:opacity-40">
              <Stack className="size-4 text-zinc-500" />
              {t("downloadWeek")}
            </button>
            <button onClick={downloadPng} disabled={!sheet} className="btn btn-ghost w-full px-4 py-2.5 text-sm disabled:opacity-40">
              <ImageIcon className="size-4 text-zinc-500" />
              {t("downloadPng")}
            </button>
          </div>
          <p className="flex items-start gap-1.5 text-xs leading-relaxed text-zinc-400">
            <ArrowClockwise className="mt-0.5 size-3.5 shrink-0" />
            {t("backTomorrow")}
          </p>
        </>
      }
      more={
        <>
          <div className="flex flex-col gap-1.5">
            <span className="field-label">{t("font")}</span>
            <select value={fontId} onChange={(e) => setFontId(e.target.value)} className="select-field">
              {FONT_OPTIONS.map((id) => (
                <option key={id} value={id}>
                  {fontNames(`fonts.${id}`)}
                </option>
              ))}
            </select>
          </div>
          <PageFormatToggle value={format} onChange={setFormat} />
        </>
      }
      preview={
        <div className="overflow-hidden rounded-xl border border-zinc-200 shadow-paper">
          <canvas ref={canvasRef} className="block h-auto w-full" />
        </div>
      }
    />
  );
}
