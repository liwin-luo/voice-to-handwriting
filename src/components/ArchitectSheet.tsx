"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { FilePdf, Image as ImageIcon } from "@phosphor-icons/react";
import { jsPDF } from "jspdf";
import { fadeInk } from "@/lib/ink";
import { PAGE_FORMATS, type PageFormat } from "@/lib/localeDefaults";
import { waitForFontFace } from "@/lib/fontFace";
import ColorSwatch from "./ColorSwatch";
import PageFormatToggle from "./PageFormatToggle";
import PracticeLayout from "./PracticeLayout";

const FAMILY = "Architects Daughter";
const LINES = [
  "A B C D E F G H I J",
  "K L M N O P Q R S T",
  "U V W X Y Z",
  "0 1 2 3 4 5 6 7 8 9",
];

export default function ArchitectSheet({ defaultFormat }: { defaultFormat: PageFormat }) {
  const t = useTranslations("architectLetter");
  const sheet = useTranslations("sheet");
  const tool = useTranslations("tool");
  const tracing = useTranslations("tracing");
  const [ink, setInk] = useState("#1a1a1a");
  const [bg, setBg] = useState("#ffffff");
  const [format, setFormat] = useState<PageFormat>(defaultFormat);
  const { w, h } = PAGE_FORMATS[format];

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      await waitForFontFace(FAMILY);
      await document.fonts.load(`42px "${FAMILY}"`, LINES.join(" ")).catch(() => {});
      if (!cancelled) draw();
    };
    void run();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ink, bg, format, w, h]);

  function draw(target?: CanvasRenderingContext2D) {
    let ctx = target ?? null;
    if (!ctx) {
      const canvas = document.getElementById("architect-sheet") as HTMLCanvasElement | null;
      if (!canvas) return;
      canvas.width = w;
      canvas.height = h;
      ctx = canvas.getContext("2d");
    }
    if (!ctx) return;
    // 预览画布每次归零。导出传入的 ctx 已按分辨率缩放,这里不能清掉。
    if (!target) ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#52525b";
    ctx.font = "18px sans-serif";
    ctx.textBaseline = "alphabetic";
    ctx.fillText(`${sheet("nameLine")}: ____________________`, 48, 40);
    ctx.fillText(`${sheet("dateLine")}: ____________`, w - 280, 40);

    const rowH = 78;
    let y = 64;
    for (const line of LINES) {
      for (const kind of ["solid", "dotted", "blank"] as const) {
        if (y + rowH > h - 24) return;
        const baseline = y + rowH - 16;
        ctx.strokeStyle = "#c5d0de";
        ctx.lineWidth = 1;
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(40, baseline);
        ctx.lineTo(w - 40, baseline);
        ctx.stroke();
        if (kind !== "blank") {
          ctx.font = `40px "${FAMILY}"`;
          ctx.textBaseline = "alphabetic";
          if (kind === "solid") {
            ctx.fillStyle = ink;
            ctx.fillText(line, 48, baseline - 6);
          } else {
            ctx.strokeStyle = fadeInk(ink);
            ctx.lineWidth = 1.1;
            ctx.setLineDash([2.5, 2.5]);
            ctx.strokeText(line, 48, baseline - 6);
            ctx.setLineDash([]);
          }
        }
        y += rowH;
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
    pdf.save("architect-lettering.pdf");
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
      a.download = "architect-lettering.png";
      a.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  };

  return (
    <PracticeLayout
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
          <canvas id="architect-sheet" aria-label={t("sheetLabel")} className="block h-auto w-full" />
        </div>
      }
    />
  );
}
