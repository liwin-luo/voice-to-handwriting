"use client";
import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { FilePdf, Image as ImageIcon } from "@phosphor-icons/react";
import { jsPDF } from "jspdf";
import { formatLength, PAGE_FORMATS, type PageFormat } from "@/lib/localeDefaults";
import ColorSwatch from "./ColorSwatch";
import PageFormatToggle from "./PageFormatToggle";
import PracticeLayout from "./PracticeLayout";

type PaperType = "college" | "wide" | "graph" | "handwriting" | "blank" | "dots" | "story" | "cornell";

function spacingFor(type: PaperType): number {
  if (type === "college" || type === "cornell") return 27; // 9/32 in, college ruled
  if (type === "wide" || type === "story") return 33; // 11/32 in, wide ruled
  if (type === "handwriting") return 28;
  if (type === "dots") return 22;
  return 26;
}

/** 红边只对横线/三线/白纸有意义;点阵、图画框、康奈尔自带结构 */
function wantsMargin(type: PaperType): boolean {
  return type === "college" || type === "wide" || type === "handwriting" || type === "blank";
}

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

    const top = 36;
    const bottom = 36;

    if (type === "college" || type === "wide") {
      const L = spacing;
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
    } else if (type === "dots") {
      ctx.save();
      ctx.fillStyle = lineColor;
      const r = 1.15;
      for (let y = top + spacing; y <= h - bottom; y += spacing) {
        for (let x = spacing; x <= w - spacing; x += spacing) {
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();
    } else if (type === "story") {
      const boxH = Math.round((h - top - bottom) * 0.42);
      ctx.save();
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1.25;
      ctx.strokeRect(48, top, w - 96, boxH);
      ctx.restore();
      ctx.fillStyle = "#5c6b7a";
      ctx.font = "16px sans-serif";
      ctx.fillText(t("labelPicture"), 64, top + 28);
      for (let y = top + boxH + spacing; y <= h - bottom; y += spacing) line(ctx, 0, y, w, y);
    } else if (type === "cornell") {
      const summaryH = 148;
      const summaryY = h - bottom - summaryH;
      const cueX = Math.round(w * 0.28);
      ctx.save();
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1.25;
      ctx.beginPath();
      ctx.moveTo(cueX, top);
      ctx.lineTo(cueX, summaryY);
      ctx.moveTo(36, summaryY);
      ctx.lineTo(w - 36, summaryY);
      ctx.stroke();
      ctx.restore();
      for (let y = top + spacing; y < summaryY - 6; y += spacing) line(ctx, cueX + 10, y, w - 28, y);
      ctx.fillStyle = "#5c6b7a";
      ctx.font = "16px sans-serif";
      ctx.fillText(t("labelCues"), 48, top + 24);
      ctx.fillText(t("labelNotes"), cueX + 16, top + 24);
      ctx.fillText(t("labelSummary"), 48, summaryY + 28);
    }

    if (showMargin && wantsMargin(type)) {
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
    { id: "wide", label: t("typeWide") },
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
                    if (!wantsMargin(tp.id)) setShowMargin(false);
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
          {wantsMargin(type) && (
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
