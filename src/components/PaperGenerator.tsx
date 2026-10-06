"use client";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { FilePdf } from "@phosphor-icons/react";
import { jsPDF } from "jspdf";

const SIZES: Record<"letter" | "a4", [number, number]> = {
  letter: [816, 1056], // 8.5×11in @96dpi(美国默认)
  a4: [794, 1123],
};

type PaperType = "college" | "wide" | "graph" | "handwriting" | "blank";

/** 可打印纸张生成器:Canvas 精确绘制,导出打印级 PDF */
export default function PaperGenerator() {
  const t = useTranslations("printable");
  const [size, setSize] = useState<"letter" | "a4">("letter");
  const [type, setType] = useState<PaperType>("college");
  const [lineColor, setLineColor] = useState("#a8c0d8");
  const [spacing, setSpacing] = useState(26);
  const [showMargin, setShowMargin] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [w, h] = SIZES[size];

  useEffect(() => {
    draw();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size, type, lineColor, spacing, showMargin]);

  function line(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, dashed = false, alpha = 1) {
    ctx.save();
    ctx.strokeStyle = lineColor;
    ctx.globalAlpha = alpha;
    ctx.lineWidth = 1;
    if (dashed) ctx.setLineDash([9, 7]);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.restore();
  }

  function draw() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);

    const top = 36;
    const bottom = 36;

    if (type === "college" || type === "wide") {
      const L = type === "college" ? 26 : 33;
      for (let y = top + L; y <= h - bottom; y += L) line(ctx, 0, y, w, y);
    } else if (type === "graph") {
      for (let y = top; y <= h - bottom; y += spacing) line(ctx, 0, y, w, y, false, 0.8);
      for (let x = 0; x <= w; x += spacing) line(ctx, x, top, x, h - bottom, false, 0.8);
    } else if (type === "handwriting") {
      const H = Math.max(60, spacing * 3);
      for (let y0 = top; y0 + H <= h - bottom + H; y0 += H) {
        line(ctx, 0, y0, w, y0, false, 0.7); // 顶线
        line(ctx, 0, y0 + H, w, y0 + H); // 基线
        line(ctx, 0, y0 + H * 0.52, w, y0 + H * 0.52, true, 0.8); // 中虚线
      }
    }

    if (showMargin && type !== "graph") {
      ctx.save();
      ctx.strokeStyle = "#e26d6d";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(76, 0);
      ctx.lineTo(76, h);
      ctx.stroke();
      ctx.restore();
    }
  }

  const downloadPdf = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const pdf = new jsPDF({ unit: "px", format: [w, h], orientation: w > h ? "landscape" : "portrait" });
    pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, w, h);
    pdf.save(`printable-paper-${type}.pdf`);
  };

  const types: Array<{ id: PaperType; label: string }> = [
    { id: "college", label: t("typeCollege") },
    { id: "wide", label: t("typeWide") },
    { id: "graph", label: t("typeGraph") },
    { id: "handwriting", label: t("typeHandwriting") },
    { id: "blank", label: t("typeBlank") },
  ];

  return (
    <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[300px_auto]">
      <aside className="flex flex-col gap-4 lg:sticky lg:top-20">
        <div className="flex flex-col gap-1.5">
          <span className="field-label">{t("paperType")}</span>
          <div className="flex flex-wrap gap-1.5">
            {types.map((tp) => (
              <button
                key={tp.id}
                onClick={() => setType(tp.id)}
                className={`cursor-pointer rounded-lg border px-2.5 py-1.5 text-xs transition-colors ${
                  type === tp.id
                    ? "border-accent bg-accent/5 text-accent"
                    : "border-zinc-200 bg-white text-zinc-500 hover:border-zinc-300"
                }`}
              >
                {tp.label}
              </button>
            ))}
          </div>
        </div>

        {(type === "college" || type === "wide" || type === "graph" || type === "handwriting") && (
          <label className="flex items-center justify-between gap-2 text-sm">
            <span className="text-zinc-700">
              {type === "graph" ? t("gridSize") : type === "handwriting" ? t("bandHeight") : t("lineSpacing")}
            </span>
            <span className="flex flex-1 items-center gap-2">
              <input
                type="range"
                min={type === "handwriting" ? 20 : 16}
                max={type === "handwriting" ? 36 : 48}
                value={spacing}
                onChange={(e) => setSpacing(Number(e.target.value))}
                className="accent-accent"
              />
              <span className="font-mono text-xs text-zinc-400">{spacing}px</span>
            </span>
          </label>
        )}

        <label className="flex items-center justify-between gap-2 text-sm">
          <span className="text-zinc-700">{t("lineColor")}</span>
          <input type="color" value={lineColor} onChange={(e) => setLineColor(e.target.value)} className="color-swatch" />
        </label>

        <label className="flex items-center justify-between gap-2 text-sm">
          <span className="text-zinc-700">{t("redMargin")}</span>
          <button
            role="switch"
            aria-checked={showMargin}
            onClick={() => setShowMargin(!showMargin)}
            className={`relative h-6 w-11 cursor-pointer rounded-full transition-colors duration-200 ${
              showMargin ? "bg-accent" : "bg-zinc-300"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow transition-transform duration-200 ${
                showMargin ? "translate-x-5" : ""
              }`}
            />
          </button>
        </label>

        <div className="flex flex-col gap-1.5">
          <span className="field-label">{t("pageSize")}</span>
          <div className="flex gap-1.5">
            {(["letter", "a4"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`flex-1 cursor-pointer rounded-lg border px-2 py-1.5 text-xs uppercase transition-colors ${
                  size === s
                    ? "border-accent bg-accent/5 text-accent"
                    : "border-zinc-200 bg-white text-zinc-500 hover:border-zinc-300"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <button onClick={downloadPdf} className="btn btn-primary px-4 py-2.5 text-sm">
          <FilePdf className="size-4" />
          {t("downloadPdf")}
        </button>
      </aside>

      <div className="overflow-hidden rounded-xl border border-zinc-200 shadow-paper">
        <canvas ref={canvasRef} className="block h-auto w-full" />
      </div>
    </div>
  );
}
