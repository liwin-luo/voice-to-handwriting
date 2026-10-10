"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { FilePdf, Image as ImageIcon } from "@phosphor-icons/react";
import { jsPDF } from "jspdf";
import { fadeInk } from "@/lib/ink";
import { PAGE_FORMATS, type PageFormat } from "@/lib/localeDefaults";
import { strokesFor, type StrokeId } from "@/lib/prewritingStrokes";
import ColorSwatch from "./ColorSwatch";
import PageFormatToggle from "./PageFormatToggle";
import PracticeLayout from "./PracticeLayout";

const ROW_H = 86;

function strokePath(ctx: CanvasRenderingContext2D, id: StrokeId, x: number, y: number, h: number) {
  const top = y + 14;
  const bot = y + h - 18;
  const mid = (top + bot) / 2;
  if (id === "down") {
    for (let i = 0; i < 7; i++) {
      const px = x + i * 46;
      ctx.moveTo(px, top);
      ctx.lineTo(px, bot);
    }
  } else if (id === "across") {
    for (let i = 0; i < 4; i++) {
      const py = top + i * ((bot - top) / 3);
      ctx.moveTo(x, py);
      ctx.lineTo(x + 300, py);
    }
  } else if (id === "slant") {
    for (let i = 0; i < 6; i++) {
      const px = x + i * 48;
      ctx.moveTo(px + 18, top);
      ctx.lineTo(px, bot);
    }
  } else if (id === "circle") {
    for (let i = 0; i < 5; i++) {
      ctx.moveTo(x + i * 62 + 36, mid);
      ctx.arc(x + i * 62 + 22, mid, 16, 0, Math.PI * 2);
    }
  } else if (id === "wave") {
    ctx.moveTo(x, mid);
    for (let px = 0; px <= 280; px += 8) {
      ctx.lineTo(x + px, mid + Math.sin(px / 18) * 16);
    }
  } else {
    for (let i = 0; i < 5; i++) {
      const ax = x + i * 62;
      ctx.moveTo(ax, bot);
      ctx.quadraticCurveTo(ax + 24, top, ax + 48, bot);
    }
  }
}

export default function PrewritingSheet({ defaultFormat }: { defaultFormat: PageFormat }) {
  const t = useTranslations("prewriting");
  const sheet = useTranslations("sheet");
  const tool = useTranslations("tool");
  const tracing = useTranslations("tracing");
  const [group, setGroup] = useState<"lines" | "curves">("lines");
  const [ink, setInk] = useState("#1a1a1a");
  const [bg, setBg] = useState("#ffffff");
  const [format, setFormat] = useState<PageFormat>(defaultFormat);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { w, h } = PAGE_FORMATS[format];
  const strokes = useMemo(() => strokesFor(group), [group]);

  useEffect(() => {
    draw();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [strokes, ink, bg, format, w, h, t]);

  function draw(target?: CanvasRenderingContext2D) {
    let ctx = target ?? null;
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
    ctx.textBaseline = "alphabetic";
    ctx.fillText(`${sheet("nameLine")}: ____________________`, 48, 40);
    ctx.fillText(`${sheet("dateLine")}: ____________`, w - 280, 40);

    let y = 58;
    for (const id of strokes) {
      const caption = t(id);
      for (const kind of ["solid", "dotted", "blank"] as const) {
        if (y + ROW_H > h - 20) return;
        const baseline = y + ROW_H - 12;
        ctx.strokeStyle = "#c5d0de";
        ctx.lineWidth = 1;
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(120, baseline);
        ctx.lineTo(w - 36, baseline);
        ctx.stroke();
        if (kind === "solid") {
          ctx.fillStyle = "#71717a";
          ctx.font = "13px sans-serif";
          ctx.fillText(caption, 36, baseline);
        }
        if (kind !== "blank") {
          ctx.beginPath();
          ctx.strokeStyle = kind === "solid" ? ink : fadeInk(ink);
          ctx.lineWidth = kind === "solid" ? 2.4 : 1.5;
          ctx.lineCap = "round";
          ctx.setLineDash(kind === "dotted" ? [4, 4] : []);
          strokePath(ctx, id, 130, y, ROW_H);
          ctx.stroke();
          ctx.setLineDash([]);
        }
        y += ROW_H;
      }
    }
  }

  const downloadPdf = () => {
    const off = document.createElement("canvas");
    off.width = w;
    off.height = h;
    const ctx = off.getContext("2d");
    if (!ctx) return;
    draw(ctx);
    const pdf = new jsPDF({ unit: "px", format: [w, h], orientation: "portrait" });
    pdf.addImage(off.toDataURL("image/png"), "PNG", 0, 0, w, h);
    pdf.save("prewriting-strokes.pdf");
  };

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
      a.download = "prewriting-strokes.png";
      a.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  };

  const chip = (on: boolean) =>
    `cursor-pointer rounded-lg border px-2.5 py-1.5 text-xs transition-colors ${
      on ? "border-accent bg-accent/5 text-accent" : "border-zinc-200 bg-white text-zinc-500 hover:border-zinc-300"
    }`;

  return (
    <PracticeLayout
      input={
        <div className="flex flex-col gap-1.5">
          <span className="field-label">{t("groupLabel")}</span>
          <div className="flex flex-wrap gap-1.5">
            {(["lines", "curves"] as const).map((id) => (
              <button key={id} type="button" aria-pressed={group === id} onClick={() => setGroup(id)} className={chip(group === id)}>
                {t(id)}
              </button>
            ))}
          </div>
        </div>
      }
      download={
        <div className="flex gap-2">
          <button type="button" onClick={downloadPdf} className="btn btn-primary flex-1 px-4 py-2.5 text-sm">
            <FilePdf className="size-4" />
            {t("downloadPdf")}
          </button>
          <button type="button" onClick={downloadPng} className="btn btn-ghost flex-1 px-4 py-2.5 text-sm">
            <ImageIcon className="size-4 text-zinc-500" />
            {t("downloadPng")}
          </button>
        </div>
      }
      more={
        <>
          <ColorSwatch label={tracing("textColor")} value={ink} onChange={setInk} />
          <ColorSwatch label={tool("paperCustom.bg")} value={bg} onChange={setBg} />
          <PageFormatToggle value={format} onChange={setFormat} />
        </>
      }
      preview={
        <div className="overflow-hidden rounded-xl border border-zinc-200 shadow-paper">
          <canvas ref={canvasRef} aria-label={t("sheetLabel")} className="block h-auto w-full" />
        </div>
      }
    />
  );
}
