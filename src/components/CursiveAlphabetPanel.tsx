"use client";
import { useEffect, useRef, useState } from "react";
import { FilePdf, Image as ImageIcon } from "@phosphor-icons/react";
import { jsPDF } from "jspdf";
import { FONTS } from "@/stores/useEditorStore";
import { drawGlyphGuides, hasGlyphGuides } from "@/lib/glyphGuides";
import { waitForFontFace } from "@/lib/fontFace";
import { PAGE_FORMATS } from "@/lib/localeDefaults";
import { chartGrid } from "@/lib/alphabetChart";
import { ALPHABET, ALPHABET_FONTS, ALPHABET_UI } from "@/content/cursiveAlphabet";
import { Link } from "@/i18n/navigation";

function primaryFamily(css: string): string {
  return css.match(/'([^']+)'/)?.[1] ?? "cursive";
}

// 字母练习条:两条三线格(上实字示例、下虚线描红),与描红生成器同一套视觉参数
const SHEET_W = 680;
const BAND_H = 175;
const SHEET_H = 14 + BAND_H * 2 + 12;
const INK = "#1a1a1a";

/** 交互式连笔字母表(en-only 页面,文案来自 cursiveAlphabet 内容模块) */
export default function CursiveAlphabetPanel() {
  const [fontId, setFontId] = useState(ALPHABET_FONTS[0].id);
  const [guides, setGuides] = useState(true);
  const [selected, setSelected] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const entry = ALPHABET[selected];

  const font = FONTS.find((f) => f.id === fontId) ?? FONTS[0];
  const family = primaryFamily(font.css);
  const fontMeta = ALPHABET_FONTS.find((f) => f.id === fontId) ?? ALPHABET_FONTS[0];

  useEffect(() => {
    let cancelled = false;
    void waitForFontFace(family).then(() => {
      if (cancelled) return;
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (canvas && ctx) drawSheet(ctx);
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [family, guides, selected]);

  const pair = entry.capital + entry.lower;

  /** 单字母练习条:上带实字示例,下带虚线描红;两条都画笔顺指引 */
  function drawSheet(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, SHEET_W, SHEET_H);
    const fontSize = Math.round(BAND_H * 0.62);
    ctx.font = `${fontSize}px "${family}"`;
    ctx.textBaseline = "alphabetic";
    for (const [i, trace] of [false, true].entries()) {
      const y0 = 14 + i * (BAND_H + 12);
      threeLineBand(ctx, y0);
      const baseline = y0 + BAND_H - 6;
      ctx.save();
      if (trace) {
        ctx.strokeStyle = INK;
        ctx.lineWidth = 1.15;
        ctx.setLineDash([2.5, 2.5]);
        ctx.strokeText(pair, 40, baseline);
      } else {
        ctx.fillStyle = INK;
        ctx.fillText(pair, 40, baseline);
      }
      ctx.restore();
      if (guides && hasGlyphGuides(fontId)) drawGlyphGuides(ctx, pair, 40, baseline, fontSize, fontId);
    }
  }

  /** 全字母表 A–Z 一页图:标题带 + 26 个 "Aa" 三线格,导出 PDF 用 */
  function drawFullChart(): HTMLCanvasElement {
    const { w, h } = PAGE_FORMATS.letter;
    const margin = 40;
    const off = document.createElement("canvas");
    off.width = w;
    off.height = h;
    const ctx = off.getContext("2d");
    if (!ctx) return off;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);
    const grid = chartGrid(ALPHABET.length, w, h, margin);
    const titleSize = 44;
    ctx.font = `${titleSize}px "${family}"`;
    ctx.fillStyle = INK;
    ctx.textBaseline = "alphabetic";
    ctx.fillText("Cursive Alphabet", margin, margin + titleSize);
    ctx.font = "13px system-ui";
    ctx.fillStyle = "#6b7280";
    ctx.fillText(fontMeta.label, margin + 320, margin + titleSize - 6);
    ALPHABET.forEach((e, i) => {
      const col = i % grid.cols;
      const row = Math.floor(i / grid.cols);
      const x = margin + col * grid.cellW;
      const y0 = margin + 64 + row * grid.cellH;
      const scaled = Math.min(grid.cellH * 0.55, BAND_H);
      threeLineBand(ctx, y0, grid.cellW - 16, scaled);
      const baseline = y0 + scaled - 4;
      const cellFont = Math.round(scaled * 0.62);
      ctx.font = `${cellFont}px "${family}"`;
      ctx.fillStyle = INK;
      ctx.fillText(e.capital + e.lower, x + 8, baseline);
      if (guides && hasGlyphGuides(fontId)) drawGlyphGuides(ctx, e.capital + e.lower, x + 8, baseline, cellFont, fontId);
    });
    return off;
  }

  /** 三线格:顶线(浅)、中虚线、基线(实);宽度与带高可缩放(图表单元格复用) */
  function threeLineBand(ctx: CanvasRenderingContext2D, y0: number, width = SHEET_W - 80, bandH = BAND_H) {
    ctx.save();
    ctx.strokeStyle = "#b8c8dc";
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.7;
    ctx.beginPath();
    ctx.moveTo(40, y0);
    ctx.lineTo(40 + width, y0);
    ctx.stroke();
    ctx.restore();
    ctx.save();
    ctx.strokeStyle = "#9db3cc";
    ctx.setLineDash([8, 6]);
    ctx.beginPath();
    ctx.moveTo(40, y0 + bandH * 0.52);
    ctx.lineTo(40 + width, y0 + bandH * 0.52);
    ctx.stroke();
    ctx.restore();
    ctx.save();
    ctx.strokeStyle = "#9db3cc";
    ctx.beginPath();
    ctx.moveTo(40, y0 + bandH);
    ctx.lineTo(40 + width, y0 + bandH);
    ctx.stroke();
    ctx.restore();
  }

  /** 离屏 2x 重绘导出清晰 PNG(与描红生成器同一手法) */
  function downloadPng() {
    const scale = 2;
    const off = document.createElement("canvas");
    off.width = SHEET_W * scale;
    off.height = SHEET_H * scale;
    const ctx = off.getContext("2d");
    if (!ctx) return;
    ctx.scale(scale, scale);
    drawSheet(ctx);
    off.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `cursive-letter-${entry.lower}.png`;
      a.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  }

  function downloadChartPdf() {
    const off = drawFullChart();
    const { w, h } = PAGE_FORMATS.letter;
    const pdf = new jsPDF({ unit: "px", format: [w, h], orientation: "portrait" });
    pdf.addImage(off.toDataURL("image/png"), "PNG", 0, 0, w, h);
    pdf.save("cursive-alphabet-chart.pdf");
  }

  const lessonSlug = entry.lowerSlug ?? entry.capitalSlug;
  const lessonLabel = entry.lowerSlug ? `Cursive ${entry.lower}` : `Cursive ${entry.capital}`;

  return (
    <div>
      <div
        role="listbox"
        aria-label="Cursive alphabet letters"
        className="flex flex-wrap gap-1.5"
        style={{ fontFamily: font.css }}
      >
        {ALPHABET.map((e, i) => (
          <button
            key={e.lower}
            role="option"
            aria-selected={i === selected}
            onClick={() => setSelected(i)}
            className={`h-11 w-14 rounded-xl border text-xl transition-colors ${
              i === selected
                ? "border-accent bg-accent/5 text-accent"
                : "border-zinc-200 bg-white text-zinc-800 hover:border-accent/50"
            }`}
          >
            {e.capital}
            {e.lower}
          </button>
        ))}
      </div>

      <div className="mt-5 rounded-2xl border border-zinc-200 bg-white p-4">
        <canvas
          ref={canvasRef}
          width={SHEET_W}
          height={SHEET_H}
          className="h-auto w-full"
          aria-label={`Cursive ${entry.capital} and ${entry.lower} on a three-line guide`}
        />
        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-zinc-700">
          <label className="flex items-center gap-2">
            <span>{ALPHABET_UI.fontLabel}</span>
            <select
              value={fontId}
              onChange={(e) => setFontId(e.target.value)}
              className="rounded-lg border border-zinc-200 bg-white px-2 py-1.5"
            >
              {ALPHABET_FONTS.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={guides} onChange={(e) => setGuides(e.target.checked)} />
            <span>{ALPHABET_UI.guidesLabel}</span>
          </label>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <button onClick={downloadPng} className="btn btn-ghost flex-1 px-4 py-2.5 text-sm">
            <ImageIcon className="size-4" aria-hidden />
            {ALPHABET_UI.downloadPng}
          </button>
          <button onClick={downloadChartPdf} className="btn btn-ghost flex-1 px-4 py-2.5 text-sm">
            <FilePdf className="size-4" aria-hidden />
            {ALPHABET_UI.downloadPdf}
          </button>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-zinc-400">{ALPHABET_UI.printNote}</p>
      </div>

      {(entry.words || lessonSlug) && (
        <div className="mt-4 text-sm text-zinc-600">
          {entry.words && (
            <p>
              <span className="font-semibold text-zinc-900">{ALPHABET_UI.wordsLabel}: </span>
              <span style={{ fontFamily: font.css, fontSize: "1.15rem" }}>{entry.words.join(" · ")}</span>
            </p>
          )}
          {lessonSlug && (
            <Link
              href={`/cursive/letter/${lessonSlug}`}
              className="mt-1 inline-block text-accent underline-offset-2 hover:underline"
            >
              {ALPHABET_UI.lessonCta} → {lessonLabel}
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
