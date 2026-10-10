"use client";
import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { FilePdf, Image as ImageIcon } from "@phosphor-icons/react";
import { jsPDF } from "jspdf";
import { FONTS } from "@/stores/useEditorStore";
import { useDebouncedImeSafe } from "./useDebouncedImeSafe";
import { fontOrder, formatLength, PAGE_FORMATS, type PageFormat } from "@/lib/localeDefaults";
import { TRACE_GRADES, gradeForBand, tracingLines, tracingSheets } from "@/lib/traceGrades";
import { drawGlyphGuides, hasGlyphGuides } from "@/lib/glyphGuides";
import { tracingPrefill } from "@/content/letterTracing";
import { fadeInk } from "@/lib/ink";
import ColorSwatch from "./ColorSwatch";
import PageFormatToggle from "./PageFormatToggle";
import PracticeLayout from "./PracticeLayout";

type TraceInk = "dotted" | "outline" | "blank";

function primaryFamily(css: string): string {
  return css.match(/'([^']+)'/)?.[1] ?? "cursive";
}

/** 字体样式表由 FontStylesheets 水合后异步注入;等 face 注册再 load,否则 fonts.load 空转、画出回退字体 */
function waitForFontFace(family: string, timeoutMs = 3000): Promise<void> {
  return new Promise((resolve) => {
    const started = Date.now();
    const tick = () => {
      for (const face of document.fonts) {
        if (face.family.replace(/["']/g, "") === family) return resolve();
      }
      if (Date.now() - started > timeoutMs) return resolve();
      setTimeout(tick, 50);
    };
    tick();
  });
}

/** 姓名描红工作表生成器:美国教师/家长市场(姓名描红 + 三线格) */
export default function TracingGenerator({
  defaultFontId = "patrickhand",
  defaultBandH = 90,
  defaultFormat,
  rowLabels = "grades",
  perName = false,
  defaultOneEach = false,
  initialText = "",
  sampleText,
  fileStem = "name-tracing-worksheet",
  presets,
}: {
  defaultFontId?: string;
  defaultBandH?: number;
  defaultFormat: PageFormat;
  /** 姓名页用年级;连笔页用行高,避免学前标签出现在连笔练习上 */
  rowLabels?: "grades" | "lines";
  /** 姓名描红可按名字拆页;连笔词表保持一页循环 */
  perName?: boolean;
  defaultOneEach?: boolean;
  /** 打开页面就写好的练习行。查询串 ?words= 仍优先 */
  initialText?: string;
  /** 输入为空时画在纸上的示例。不传则用姓名描红的占位名 */
  sampleText?: string;
  fileStem?: string;
  presets?: { id: string; label: string; text: string }[];
}) {
  const t = useTranslations("tracing");
  const fontNames = useTranslations("tool");
  const sheet = useTranslations("sheet");
  const locale = useLocale();
  const [names, setNames] = useState(initialText);
  const sample = sampleText ?? t("namesPlaceholder");
  useEffect(() => {
    const prefill = tracingPrefill(window.location.search);
    // 查询串只在浏览器里有,首屏保持空字符串,避免和水合结果不一致
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (prefill) setNames(prefill);
  }, []);
  const [fontId, setFontId] = useState(defaultFontId);
  const [showExample, setShowExample] = useState(true);
  const [traceInk, setTraceInk] = useState<TraceInk>("dotted");
  const [guides, setGuides] = useState(true);
  const [bandH, setBandH] = useState(defaultBandH);
  const [textColor, setTextColor] = useState("#3a3a3a");
  const [bg, setBg] = useState("#ffffff");
  const [format, setFormat] = useState<PageFormat>(defaultFormat);
  const [oneEach, setOneEach] = useState(defaultOneEach);
  const [pageIndex, setPageIndex] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { w, h } = PAGE_FORMATS[format];
  const fontOptions = fontOrder(locale).map((id) => FONTS.find((f) => f.id === id)!);

  const font = FONTS.find((f) => f.id === fontId) ?? FONTS[0];
  const family = primaryFamily(font.css);
  const guidesAvailable = hasGlyphGuides(fontId);
  // 整页重绘 + 字体加载较重:输入防抖 + 组词期间暂停
  const [drawNames, compositionProps] = useDebouncedImeSafe(names);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      const glyphSample = tracingLines(drawNames, sample).join("");
      // 传入实际文字,确保字体切片按需加载对应字形后再绘制
      await waitForFontFace(family);
      await document.fonts.load(`80px "${family}"`, glyphSample).catch(() => {});
      if (!cancelled) draw();
    };
    void run();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawNames, fontId, showExample, traceInk, guides, bandH, textColor, bg, format, oneEach, pageIndex]);

  const sheets = tracingSheets(tracingLines(drawNames, sample), perName && oneEach);
  const sheetIndex = Math.min(pageIndex, Math.max(0, sheets.length - 1));

  /** 支持传入离屏 ctx,供导出更高分辨率的 PNG;不传时重置并绘制预览画布 */
  function draw(target?: CanvasRenderingContext2D, rows: string[] = sheets[sheetIndex] ?? []) {
    let ctx: CanvasRenderingContext2D | null = target ?? null;
    if (!ctx) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = w;
      canvas.height = h;
      ctx = canvas.getContext("2d");
    }
    if (!ctx) return;
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = "#52525b";
    ctx.font = "18px sans-serif";
    ctx.fillText(`${sheet("nameLine")}: ____________________`, 48, 32);
    ctx.fillText(`${sheet("dateLine")}: ____________`, w - 260, 32);

    const top = 52;
    const H = bandH;

    // 循环填充整页:每行输入重复占多行格子
    let row = 0;
    for (let y0 = top; y0 + H <= h - 30; y0 += H, row++) {
      const text = rows[row % rows.length] ?? "";
      // 三线格:顶线(浅)、中虚线、基线(实)
      ctx.save();
      ctx.strokeStyle = "#b8c8dc";
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.7;
      ctx.beginPath();
      ctx.moveTo(40, y0);
      ctx.lineTo(w - 40, y0);
      ctx.stroke();
      ctx.restore();
      ctx.save();
      ctx.strokeStyle = "#9db3cc";
      ctx.setLineDash([8, 6]);
      ctx.beginPath();
      ctx.moveTo(40, y0 + H * 0.52);
      ctx.lineTo(w - 40, y0 + H * 0.52);
      ctx.stroke();
      ctx.restore();
      ctx.save();
      ctx.strokeStyle = "#9db3cc";
      ctx.beginPath();
      ctx.moveTo(40, y0 + H);
      ctx.lineTo(w - 40, y0 + H);
      ctx.stroke();
      ctx.restore();

      if (!text) continue;
      const fontSize = Math.round(H * 0.62);
      ctx.font = `${fontSize}px "${family}"`;
      ctx.textBaseline = "alphabetic";
      // 示例行实心;描红行按 traceInk:虚线、空心,或只留三线格
      const isExampleRow = showExample && row < rows.length;
      ctx.save();
      if (isExampleRow) {
        ctx.fillStyle = textColor;
        ctx.fillText(text, 60, y0 + H - 6);
      } else if (traceInk === "dotted") {
        ctx.strokeStyle = fadeInk(textColor);
        ctx.lineWidth = 1.15;
        ctx.setLineDash([2.5, 2.5]);
        ctx.strokeText(text, 60, y0 + H - 6);
      } else if (traceInk === "outline") {
        ctx.strokeStyle = fadeInk(textColor, 0.4);
        ctx.lineWidth = 1.35;
        ctx.strokeText(text, 60, y0 + H - 6);
      }
      ctx.restore();
      if (guides && traceInk !== "blank") drawGlyphGuides(ctx, text, 60, y0 + H - 6, fontSize, fontId);
    }
    void showExample;
  }

  const downloadPdf = () => {
    const pdf = new jsPDF({ unit: "px", format: [w, h], orientation: "portrait" });
    sheets.forEach((rows, i) => {
      const off = document.createElement("canvas");
      off.width = w;
      off.height = h;
      const ctx = off.getContext("2d");
      if (!ctx) return;
      draw(ctx, rows);
      if (i > 0) pdf.addPage([w, h], "portrait");
      pdf.addImage(off.toDataURL("image/png"), "PNG", 0, 0, w, h);
    });
    pdf.save(`${fileStem}.pdf`);
  };

  /** 离屏 2x 重绘,导出清晰的 PNG 图片 */
  const downloadPng = () => {
    const scale = 2;
    const off = document.createElement("canvas");
    off.width = w * scale;
    off.height = h * scale;
    const ctx = off.getContext("2d");
    if (!ctx) return;
    ctx.scale(scale, scale);
    draw(ctx);
    off.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${fileStem}.png`;
      a.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  };

    const rowLabel = {
    young: rowLabels === "lines" ? t("lineLarge") : t("gradeYoung"),
    mid: rowLabels === "lines" ? t("lineRegular") : t("gradeMid"),
    older: rowLabels === "lines" ? t("lineCompact") : t("gradeOlder"),
  };
  const guidesOn = guides && guidesAvailable && traceInk !== "blank";

  return (
    <PracticeLayout
      input={
        <>
          <div className="flex flex-col gap-1.5">
            <span className="field-label">{t("namesLabel")}</span>
            {presets && presets.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {presets.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    aria-pressed={names === preset.text}
                    onClick={() => {
                      setNames(preset.text);
                      setPageIndex(0);
                    }}
                    className={`cursor-pointer rounded-lg border px-2.5 py-1.5 text-xs transition-colors ${
                      names === preset.text
                        ? "border-accent bg-accent/5 text-accent"
                        : "border-zinc-200 bg-white text-zinc-500 hover:border-zinc-300"
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            )}
            <textarea
              value={names}
              onChange={(e) => setNames(e.target.value)}
              {...compositionProps}
              rows={4}
              placeholder={sample}
              className="surface-input resize-y p-3 text-sm leading-relaxed"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="field-label">{t("traceStyle")}</span>
            <div className="flex flex-wrap gap-1.5">
              {(
                [
                  ["dotted", t("traceDotted")],
                  ["outline", t("traceOutline")],
                  ["blank", t("traceBlank")],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={traceInk === id}
                  onClick={() => setTraceInk(id)}
                  className={`cursor-pointer rounded-lg border px-2.5 py-1.5 text-xs transition-colors ${
                    traceInk === id
                      ? "border-accent bg-accent/5 text-accent"
                      : "border-zinc-200 bg-white text-zinc-500 hover:border-zinc-300"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          {perName && (
            <label className="flex items-center justify-between gap-2 text-sm">
              <span className="text-zinc-700">{t("oneEach")}</span>
              <button
                type="button"
                role="switch"
                aria-checked={oneEach}
                onClick={() => {
                  setOneEach(!oneEach);
                  setPageIndex(0);
                }}
                className={`relative h-6 w-11 cursor-pointer rounded-full transition-colors duration-200 ${
                  oneEach ? "bg-accent" : "bg-zinc-300"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow transition-transform duration-200 ${
                    oneEach ? "translate-x-5" : ""
                  }`}
                />
              </button>
            </label>
          )}
        </>
      }
      download={
        <div className="flex gap-2">
          <button onClick={downloadPdf} className="btn btn-primary flex-1 px-4 py-2.5 text-sm">
            <FilePdf className="size-4" />
            {t("downloadPdf")}
          </button>
          <button onClick={downloadPng} className="btn btn-ghost flex-1 px-4 py-2.5 text-sm">
            <ImageIcon className="size-4 text-zinc-500" />
            {t("downloadPng")}
          </button>
        </div>
      }
      more={
        <>
          <div className="flex flex-col gap-1.5">
            <span className="field-label">{t("font")}</span>
            <select value={fontId} onChange={(e) => setFontId(e.target.value)} className="select-field">
              {fontOptions.map((f) => (
                <option key={f.id} value={f.id}>
                  {fontNames(`fonts.${f.id}`)}
                </option>
              ))}
            </select>
          </div>
          <label className="flex items-center justify-between gap-2 text-sm">
            <span className="text-zinc-700">{t("showExample")}</span>
            <button
              role="switch"
              aria-checked={showExample}
              onClick={() => setShowExample(!showExample)}
              className={`relative h-6 w-11 cursor-pointer rounded-full transition-colors duration-200 ${
                showExample ? "bg-accent" : "bg-zinc-300"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow transition-transform duration-200 ${
                  showExample ? "translate-x-5" : ""
                }`}
              />
            </button>
          </label>
          <label
            className={`flex items-center justify-between gap-2 text-sm ${guidesAvailable && traceInk !== "blank" ? "" : "opacity-50"}`}
            title={guidesAvailable ? undefined : t("strokeGuidesHint")}
          >
            <span className="text-zinc-700">{t("strokeGuides")}</span>
            <button
              role="switch"
              aria-checked={guidesOn}
              disabled={!guidesAvailable || traceInk === "blank"}
              onClick={() => setGuides(!guides)}
              className={`relative h-6 w-11 rounded-full transition-colors duration-200 ${
                guidesOn ? "bg-accent" : "bg-zinc-300"
              } ${guidesAvailable && traceInk !== "blank" ? "cursor-pointer" : "cursor-not-allowed"}`}
            >
              <span
                className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow transition-transform duration-200 ${
                  guidesOn ? "translate-x-5" : ""
                }`}
              />
            </button>
          </label>
          <div className="flex flex-col gap-1.5">
            <span className="field-label">{t("rowHeight")}</span>
            <div className="flex flex-wrap gap-1.5">
              {TRACE_GRADES.map((g) => {
                const selected = gradeForBand(bandH) === g.id;
                return (
                  <button
                    key={g.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setBandH(g.bandH)}
                    className={`cursor-pointer rounded-lg border px-2.5 py-1.5 text-xs transition-colors ${
                      selected
                        ? "border-accent bg-accent/5 text-accent"
                        : "border-zinc-200 bg-white text-zinc-500 hover:border-zinc-300"
                    }`}
                  >
                    {rowLabel[g.id]}
                  </button>
                );
              })}
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="range"
                min={60}
                max={120}
                value={bandH}
                onChange={(e) => setBandH(Number(e.target.value))}
                className="accent-accent flex-1"
                aria-label={t("rowHeight")}
              />
              <span className="font-mono text-xs text-zinc-400">{formatLength(bandH, locale)}</span>
            </label>
          </div>
          <ColorSwatch label={t("textColor")} value={textColor} onChange={setTextColor} />
          <ColorSwatch label={fontNames("paperCustom.bg")} value={bg} onChange={setBg} />
          <PageFormatToggle value={format} onChange={setFormat} />
        </>
      }
      preview={
        <div className="flex flex-col gap-2">
          <div className="overflow-hidden rounded-xl border border-zinc-200 shadow-paper">
            <canvas ref={canvasRef} className="block h-auto w-full" />
          </div>
          {sheets.length > 1 && (
            <div className="flex items-center justify-between text-sm text-zinc-500">
              <button type="button" className="btn btn-ghost px-3 py-1.5 text-xs" disabled={sheetIndex === 0} onClick={() => setPageIndex(sheetIndex - 1)}>
                {t("prevSheet")}
              </button>
              <span>{t("sheetPage", { current: sheetIndex + 1, total: sheets.length })}</span>
              <button
                type="button"
                className="btn btn-ghost px-3 py-1.5 text-xs"
                disabled={sheetIndex >= sheets.length - 1}
                onClick={() => setPageIndex(sheetIndex + 1)}
              >
                {t("nextSheet")}
              </button>
            </div>
          )}
        </div>
      }
    />
  );
}
