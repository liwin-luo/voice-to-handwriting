"use client";
import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { FilePdf, DownloadSimple } from "@phosphor-icons/react";
import { jsPDF } from "jspdf";
import { FONTS } from "@/stores/useEditorStore";
import { useDebouncedImeSafe } from "./useDebouncedImeSafe";
import { coloringFontId, fontOrder, PAGE_FORMATS, type PageFormat } from "@/lib/localeDefaults";
import PageFormatToggle from "./PageFormatToggle";

function primaryFamily(css: string): string {
  return css.match(/'([^']+)'/)?.[1] ?? "cursive";
}

function drawStar(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) {
  ctx.save();
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    const angle = (Math.PI / 2) * -1 + (i * 2 * Math.PI) / 5;
    const inner = angle + Math.PI / 5;
    ctx.lineTo(cx + r * Math.cos(angle), cy - r * Math.sin(angle));
    ctx.lineTo(cx + (r * 0.45) * Math.cos(inner), cy - (r * 0.45) * Math.sin(inner));
  }
  ctx.closePath();
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#18181b";
  ctx.stroke();
  ctx.restore();
}

function drawHeart(ctx: CanvasRenderingContext2D, cx: number, cy: number, s: number) {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(cx, cy + s * 0.35);
  ctx.bezierCurveTo(cx - s, cy - s * 0.45, cx - s * 0.4, cy - s, cx, cy - s * 0.3);
  ctx.bezierCurveTo(cx + s * 0.4, cy - s, cx + s, cy - s * 0.45, cx, cy + s * 0.35);
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#18181b";
  ctx.stroke();
  ctx.restore();
}

/** 名字涂色页生成器:轮廓大字 + 装饰图案,打印给娃涂色 */
export default function NameColoringGenerator({
  defaultFormat,
  defaultFontId,
}: {
  defaultFormat: PageFormat;
  defaultFontId?: string;
}) {
  const t = useTranslations("coloring");
  const locale = useLocale();
  const [namesText, setNamesText] = useState("");
  const [fontId, setFontId] = useState(defaultFontId ?? coloringFontId(locale));
  const [format, setFormat] = useState<PageFormat>(defaultFormat);
  const fontOptions = fontOrder(locale).map((id) => FONTS.find((f) => f.id === id)!);
  const [outline, setOutline] = useState(10); // 描边宽度
  const [decor, setDecor] = useState(true);
  const [pageUrls, setPageUrls] = useState<string[]>([]);
  const font = FONTS.find((f) => f.id === fontId) ?? FONTS[0];
  const family = primaryFamily(font.css);
  const { w, h } = PAGE_FORMATS[format];

  const [debouncedText, compositionProps] = useDebouncedImeSafe(namesText);

  // useMemo 稳定引用,避免每次按键都触发重绘 effect
  const names = useMemo(
    () => debouncedText.split("\n").map((l) => l.trim()).filter(Boolean),
    [debouncedText],
  );

  function drawDecorations(ctx: CanvasRenderingContext2D) {
    if (!decor) return;
    const spots: Array<[number, number, number, "star" | "heart"]> = [
      [110, 150, 34, "star"],
      [w - 110, 130, 28, "heart"],
      [90, h - 200, 26, "heart"],
      [w - 90, h - 170, 32, "star"],
      [w / 2 - 260, h - 140, 24, "star"],
      [w / 2 + 240, h - 150, 26, "heart"],
    ];
    for (const [x, y, s, kind] of spots) {
      if (kind === "star") drawStar(ctx, x, y, s);
      else drawHeart(ctx, x, y, s);
    }
  }

  function drawPage(name: string): string {
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);
    drawDecorations(ctx);

    // 字号自适应:名字缩放到页宽 82% 以内
    let fontSize = 300;
    ctx.font = `${fontSize}px "${family}"`;
    const measured = ctx.measureText(name).width;
    if (measured > w * 0.82) fontSize = Math.floor(fontSize * ((w * 0.82) / measured));
    ctx.font = `${fontSize}px "${family}"`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const cx = w / 2;
    const cy = h / 2;
    // 白色填充(遮挡装饰)+ 深色粗描边 = 可涂色的气泡字
    ctx.lineWidth = outline;
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#18181b";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(name, cx, cy);
    ctx.strokeText(name, cx, cy);
    // 内侧虚线:涂色边界引导
    ctx.save();
    ctx.lineWidth = 2;
    ctx.setLineDash([10, 8]);
    ctx.strokeStyle = "#b8b8b8";
    ctx.fillText(name, cx, cy);
    ctx.restore();

    // 页脚小字
    ctx.fillStyle = "#a1a1aa";
    ctx.font = '20px sans-serif';
    ctx.fillText("voicetohandwriting.online", w / 2, h - 50);
    return canvas.toDataURL("image/png");
  }

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      if (!names.length) {
        setPageUrls([]);
        return;
      }
      const urls: string[] = [];
      for (const name of names) {
        // 传入实际文字,确保 cn-font-split 切片按需加载对应字符的字形
        await document.fonts.load(`200px "${family}"`, name).catch(() => {});
        if (cancelled) return;
        urls.push(drawPage(name));
        // 逐页让出主线程,多页时不至于一次长任务卡住交互
        await new Promise((r) => setTimeout(r, 0));
        if (cancelled) return;
      }
      if (!cancelled) setPageUrls(urls);
    };
    void run();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [names, fontId, outline, decor, format]);

  const downloadPng = () => {
    pageUrls.forEach((u, i) => {
      const a = document.createElement("a");
      a.href = u;
      a.download = `coloring-${i + 1}.png`;
      a.click();
    });
  };

  const downloadPdf = () => {
    if (!pageUrls.length) return;
    const pdf = new jsPDF({ unit: "px", format: [w, h], orientation: "portrait" });
    pageUrls.forEach((u, i) => {
      if (i > 0) pdf.addPage([w, h], "portrait");
      pdf.addImage(u, "PNG", 0, 0, w, h);
    });
    pdf.save("name-coloring-pages.pdf");
  };

  return (
    <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[300px_auto]">
      <aside className="flex flex-col gap-4 lg:sticky lg:top-20">
        <div className="flex flex-col gap-1.5">
          <span className="field-label">{t("namesLabel")}</span>
          <textarea
            value={namesText}
            onChange={(e) => setNamesText(e.target.value)}
            {...compositionProps}
            rows={4}
            placeholder={t("namesPlaceholder")}
            className="surface-input resize-y p-3 text-sm leading-relaxed"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="field-label">{t("font")}</span>
          <select value={fontId} onChange={(e) => setFontId(e.target.value)} className="select-field">
            {fontOptions.map((f) => (
              <option key={f.id} value={f.id}>
                {primaryFamily(f.css)}
              </option>
            ))}
          </select>
        </div>

        <label className="flex items-center justify-between gap-2 text-sm">
          <span className="text-zinc-700">{t("outlineWidth")}</span>
          <span className="flex flex-1 items-center gap-2">
            <input type="range" min={4} max={22} value={outline} onChange={(e) => setOutline(Number(e.target.value))} className="accent-accent" />
            <span className="font-mono text-xs text-zinc-400">{outline}px</span>
          </span>
        </label>

        <label className="flex items-center justify-between gap-2 text-sm">
          <span className="text-zinc-700">{t("decorations")}</span>
          <button
            role="switch"
            aria-checked={decor}
            onClick={() => setDecor(!decor)}
            className={`relative h-6 w-11 cursor-pointer rounded-full transition-colors duration-200 ${
              decor ? "bg-accent" : "bg-zinc-300"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow transition-transform duration-200 ${
                decor ? "translate-x-5" : ""
              }`}
            />
          </button>
        </label>

        <PageFormatToggle value={format} onChange={setFormat} />

        <div className="flex flex-col gap-1.5">
          <button onClick={downloadPng} disabled={!pageUrls.length} className="btn btn-primary px-4 py-2.5 text-sm disabled:opacity-40">
            <DownloadSimple className="size-4" />
            {t("downloadPng")}
          </button>
          <button onClick={downloadPdf} disabled={!pageUrls.length} className="btn btn-ghost px-4 py-2.5 text-sm disabled:opacity-40">
            <FilePdf className="size-4 text-zinc-500" />
            {t("downloadPdf")}
          </button>
        </div>
      </aside>

      <div className="flex flex-col gap-6">
        {pageUrls.map((u, i) => (
          <div key={i} className="overflow-hidden rounded-xl border border-zinc-200 shadow-paper">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={u} alt={`coloring page ${i + 1}`} className="block h-auto w-full" />
          </div>
        ))}
        {pageUrls.length === 0 && (
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-zinc-300 py-24">
            <p className="font-hand text-3xl text-zinc-300">{t("emptyTitle")}</p>
            <p className="text-sm text-zinc-400">{t("emptyHint")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
