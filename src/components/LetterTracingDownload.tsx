"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { FilePdf } from "@phosphor-icons/react";
import { jsPDF } from "jspdf";
import { FONTS } from "@/stores/useEditorStore";
import { PAGE_FORMATS } from "@/lib/localeDefaults";
import { LETTERS_PER_ROW, letterSlotOffsets, repeatedLetterLine } from "@/content/letterTracing";

function primaryFamily(css: string): string {
  return css.match(/'([^']+)'/)?.[1] ?? "cursive";
}

/** 字体样式表由 FontStylesheets 水合后异步注入;等 face 注册再 load。 */
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

const INK = "#3a3a3a";
const BAND = 90;

function paintGuides(ctx: CanvasRenderingContext2D, y0: number, width: number) {
  ctx.save();
  ctx.strokeStyle = "#b8c8dc";
  ctx.lineWidth = 1;
  ctx.globalAlpha = 0.7;
  ctx.beginPath();
  ctx.moveTo(40, y0);
  ctx.lineTo(width - 40, y0);
  ctx.stroke();
  ctx.restore();

  ctx.save();
  ctx.strokeStyle = "#9db3cc";
  ctx.setLineDash([8, 6]);
  ctx.beginPath();
  ctx.moveTo(40, y0 + BAND * 0.52);
  ctx.lineTo(width - 40, y0 + BAND * 0.52);
  ctx.stroke();
  ctx.restore();

  ctx.save();
  ctx.strokeStyle = "#9db3cc";
  ctx.beginPath();
  ctx.moveTo(40, y0 + BAND);
  ctx.lineTo(width - 40, y0 + BAND);
  ctx.stroke();
  ctx.restore();
}

function paintLetters(
  ctx: CanvasRenderingContext2D,
  letter: string,
  slots: number[],
  left: number,
  baseline: number,
  mode: "solid" | "dotted",
) {
  ctx.save();
  ctx.textBaseline = "alphabetic";
  if (mode === "solid") {
    ctx.fillStyle = INK;
    for (const x of slots) ctx.fillText(letter, left + x, baseline);
  } else {
    ctx.strokeStyle = INK;
    ctx.lineWidth = 1.15;
    ctx.setLineDash([2.5, 2.5]);
    for (const x of slots) ctx.strokeText(letter, left + x, baseline);
  }
  ctx.restore();
}

/** 整页 PDF：姓名/日期行 + 第一行实心，其余虚线。字号缩到能放下 8 个字母。 */
export default function LetterTracingDownload({ letter }: { letter: string }) {
  const t = useTranslations("tracing");
  const sheet = useTranslations("sheet");
  const [busy, setBusy] = useState(false);

  const download = async () => {
    if (busy) return;
    setBusy(true);
    try {
      const font = FONTS.find((item) => item.id === "patrickhand") ?? FONTS[0];
      const family = primaryFamily(font.css);
      const line = repeatedLetterLine(letter);
      await waitForFontFace(family);
      await document.fonts.load(`80px "${family}"`, line).catch(() => {});

      const { w, h } = PAGE_FORMATS.letter;
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#52525b";
      ctx.font = "18px sans-serif";
      ctx.fillText(`${sheet("nameLine")}: ____________________`, 48, 32);
      ctx.fillText(`${sheet("dateLine")}: ____________`, w - 260, 32);

      const innerLeft = 48;
      const innerWidth = w - 96;
      let fontSize = Math.round(BAND * 0.62);
      let slots: number[] | null = null;
      while (fontSize >= 28) {
        ctx.font = `${fontSize}px "${family}"`;
        slots = letterSlotOffsets(LETTERS_PER_ROW, ctx.measureText(letter).width, innerWidth);
        if (slots) break;
        fontSize -= 2;
      }
      ctx.font = `${fontSize}px "${family}"`;
      const placed = slots ?? [0];

      let row = 0;
      for (let y0 = 52; y0 + BAND <= h - 30; y0 += BAND, row++) {
        paintGuides(ctx, y0, w);
        paintLetters(ctx, letter, placed, innerLeft, y0 + BAND - 6, row === 0 ? "solid" : "dotted");
      }

      const pdf = new jsPDF({ unit: "px", format: [w, h], orientation: "portrait" });
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, w, h);
      pdf.save(`letter-${letter}-tracing.pdf`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <button type="button" onClick={() => void download()} disabled={busy} className="btn btn-primary px-6 py-3">
      <FilePdf className="size-4" />
      {t("downloadPdf")}
    </button>
  );
}
