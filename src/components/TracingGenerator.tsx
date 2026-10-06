"use client";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { FilePdf, Image as ImageIcon } from "@phosphor-icons/react";
import { jsPDF } from "jspdf";
import { FONTS } from "@/stores/useEditorStore";
import { useDebouncedImeSafe } from "./useDebouncedImeSafe";

const LETTER: [number, number] = [816, 1056];

function primaryFamily(css: string): string {
  return css.match(/'([^']+)'/)?.[1] ?? "cursive";
}

/** 姓名描红工作表生成器:美国教师/家长市场(姓名描红 + 三线格) */
export default function TracingGenerator({
  defaultFontId = "patrickhand",
  defaultBandH = 90,
}: {
  defaultFontId?: string;
  defaultBandH?: number;
}) {
  const t = useTranslations("tracing");
  const [names, setNames] = useState("");
  const [fontId, setFontId] = useState(defaultFontId);
  const [showExample, setShowExample] = useState(true);
  const [bandH, setBandH] = useState(defaultBandH);
  const [textColor, setTextColor] = useState("#3a3a3a");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [w, h] = LETTER;

  const font = FONTS.find((f) => f.id === fontId) ?? FONTS[0];
  const family = primaryFamily(font.css);
  // 整页重绘 + 字体加载较重:输入防抖 + 组词期间暂停
  const [drawNames, compositionProps] = useDebouncedImeSafe(names);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      // 传入实际文字,确保字体切片按需加载对应字形后再绘制
      await document.fonts.load(`80px "${family}"`, drawNames).catch(() => {});
      if (!cancelled) draw();
    };
    void run();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawNames, fontId, showExample, bandH, textColor]);

  /** 支持传入离屏 ctx,供导出更高分辨率的 PNG;不传时重置并绘制预览画布 */
  function draw(target?: CanvasRenderingContext2D) {
    let ctx: CanvasRenderingContext2D | null = target ?? null;
    if (!ctx) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = w;
      canvas.height = h;
      ctx = canvas.getContext("2d");
    }
    if (!ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);

    const top = 40;
    const H = bandH;
    const inputLines = drawNames.split("\n").map((l) => l.trim()).filter(Boolean);
    const rows = inputLines.length ? inputLines : [""];

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
      // 示例行用所选颜色,描红行用同色 28% 不透明度浅化,保持可描性
      const isExampleRow = showExample && row < rows.length;
      ctx.save();
      ctx.globalAlpha = isExampleRow ? 1 : 0.28;
      ctx.fillStyle = textColor;
      ctx.fillText(text, 60, y0 + H - 6);
      ctx.restore();
    }
    void showExample;
  }

  const downloadPdf = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const pdf = new jsPDF({ unit: "px", format: [w, h], orientation: "portrait" });
    pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, w, h);
    pdf.save("name-tracing-worksheet.pdf");
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
      a.download = "name-tracing-worksheet.png";
      a.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  };

  return (
    <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[300px_auto]">
      <aside className="flex flex-col gap-4 lg:sticky lg:top-20">
        <div className="flex flex-col gap-1.5">
          <span className="field-label">{t("namesLabel")}</span>
          <textarea
            value={names}
            onChange={(e) => setNames(e.target.value)}
            {...compositionProps}
            rows={4}
            placeholder={t("namesPlaceholder")}
            className="surface-input resize-y p-3 text-sm leading-relaxed"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="field-label">{t("font")}</span>
          <select value={fontId} onChange={(e) => setFontId(e.target.value)} className="select-field">
            {FONTS.map((f) => (
              <option key={f.id} value={f.id}>
                {primaryFamily(f.css)}
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

        <label className="flex items-center justify-between gap-2 text-sm">
          <span className="text-zinc-700">{t("rowHeight")}</span>
          <span className="flex flex-1 items-center gap-2">
            <input type="range" min={60} max={120} value={bandH} onChange={(e) => setBandH(Number(e.target.value))} className="accent-accent" />
            <span className="font-mono text-xs text-zinc-400">{bandH}px</span>
          </span>
        </label>

        <label className="flex items-center justify-between gap-2 text-sm">
          <span className="text-zinc-700">{t("textColor")}</span>
          <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="color-swatch" />
        </label>

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
      </aside>

      <div className="overflow-hidden rounded-xl border border-zinc-200 shadow-paper">
        <canvas ref={canvasRef} className="block h-auto w-full" />
      </div>
    </div>
  );
}
