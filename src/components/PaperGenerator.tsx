"use client";
import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { FilePdf, Image as ImageIcon } from "@phosphor-icons/react";
import { jsPDF } from "jspdf";
import { formatLength, PAGE_FORMATS, type PageFormat } from "@/lib/localeDefaults";
import { paperOps, spacingFor, wantsPaperMargin, type PaperSheetType } from "@/lib/paperSheet.mjs";
import ColorSwatch from "./ColorSwatch";
import PageFormatToggle from "./PageFormatToggle";
import PracticeLayout from "./PracticeLayout";

type PaperType = PaperSheetType;

/** 可打印纸张生成器:Canvas 精确绘制,导出打印级 PDF */
export default function PaperGenerator({
  defaultType = "college",
  defaultFormat,
  lockType = false,
}: {
  defaultType?: PaperType;
  defaultFormat: PageFormat;
  /** 专题页只画这一种纸,其他纸型用页底链接 */
  lockType?: boolean;
}) {
  const t = useTranslations("printable");
  const tool = useTranslations("tool");
  const locale = useLocale();
  const [size, setSize] = useState<PageFormat>(defaultFormat);
  const [type, setType] = useState<PaperType>(defaultType);
  const [lineColor, setLineColor] = useState("#a8c0d8");
  const [bg, setBg] = useState("#ffffff");
  const [spacing, setSpacing] = useState(spacingFor(defaultType));
  const [showMargin, setShowMargin] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { w, h } = PAGE_FORMATS[size];

  useEffect(() => {
    draw();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size, type, lineColor, bg, spacing, showMargin]);

  function line(
    ctx: CanvasRenderingContext2D,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    dashed = false,
    alpha = 1,
    width = 1,
    stroke = lineColor,
  ) {
    ctx.save();
    ctx.strokeStyle = stroke;
    ctx.globalAlpha = alpha;
    ctx.lineWidth = width;
    if (dashed) ctx.setLineDash([9, 7]);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.restore();
  }

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
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    const ops = paperOps({
      type,
      w,
      h,
      spacing,
      showMargin,
      labels: {
        picture: t("labelPicture"),
        cues: t("labelCues"),
        notes: t("labelNotes"),
        summary: t("labelSummary"),
      },
    });
    for (const op of ops) {
      if (op.op === "line") {
        line(ctx, op.x1, op.y1, op.x2, op.y2, op.dashed, op.alpha, op.width, op.color === "margin" ? "#e26d6d" : lineColor);
      } else if (op.op === "rect") {
        ctx.save();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = op.width;
        ctx.strokeRect(op.x, op.y, op.w, op.h);
        ctx.restore();
      } else if (op.op === "dot") {
        ctx.save();
        ctx.fillStyle = lineColor;
        ctx.beginPath();
        ctx.arc(op.x, op.y, op.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else if (op.op === "text") {
        ctx.fillStyle = "#5c6b7a";
        ctx.font = "16px sans-serif";
        ctx.fillText(op.text, op.x, op.y);
      }
    }
  }

  const downloadPdf = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const pdf = new jsPDF({ unit: "px", format: [w, h], orientation: w > h ? "landscape" : "portrait" });
    pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, w, h);
    pdf.save(`printable-paper-${type}.pdf`);
  };

  /** 离屏 2x 重绘,导出清晰的 PNG 图片(打印走 PDF,图片用于快速查看/分享) */
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
      a.download = `printable-paper-${type}.png`;
      a.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  };

  const types: Array<{ id: PaperType; label: string }> = [
    { id: "college", label: t("typeCollege") },
    { id: "narrow", label: t("typeNarrow") },
    { id: "wide", label: t("typeWide") },
    { id: "large", label: t("typeLarge") },
    { id: "graph", label: t("typeGraph") },
    { id: "dots", label: t("typeDots") },
    { id: "handwriting", label: t("typeHandwriting") },
    { id: "story", label: t("typeStory") },
    { id: "cornell", label: t("typeCornell") },
    { id: "blank", label: t("typeBlank") },
  ];

  return (
    <PracticeLayout
      input={
        lockType ? undefined : (
          <div className="flex flex-col gap-1.5">
            <span className="field-label">{t("paperType")}</span>
            <div className="flex flex-wrap gap-1.5">
              {types.map((tp) => (
                <button
                  key={tp.id}
                  onClick={() => {
                    setType(tp.id);
                    setSpacing(spacingFor(tp.id));
                    if (!wantsPaperMargin(tp.id)) setShowMargin(false);
                  }}
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
        )
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
          {type !== "blank" && (
            <label className="flex items-center justify-between gap-2 text-sm">
              <span className="text-zinc-700">
                {type === "graph" || type === "dots" ? t("gridSize") : type === "handwriting" ? t("bandHeight") : t("lineSpacing")}
              </span>
              <span className="flex flex-1 items-center gap-2">
                <input
                  type="range"
                  min={type === "handwriting" ? 20 : type === "dots" ? 14 : 16}
                  max={type === "handwriting" ? 36 : type === "dots" ? 36 : 48}
                  value={spacing}
                  onChange={(e) => setSpacing(Number(e.target.value))}
                  className="accent-accent"
                />
                <span className="font-mono text-xs text-zinc-400">
                  {formatLength(type === "handwriting" ? Math.max(60, spacing * 3) : spacing, locale)}
                </span>
              </span>
            </label>
          )}
          <ColorSwatch label={t("lineColor")} value={lineColor} onChange={setLineColor} />
          <ColorSwatch label={tool("paperCustom.bg")} value={bg} onChange={setBg} />
          {wantsPaperMargin(type) && (
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
          )}
          <PageFormatToggle value={size} onChange={setSize} />
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
