"use client";
import { useEffect, useRef, useState } from "react";
import { FilePdf, Image as ImageIcon } from "@phosphor-icons/react";
import { jsPDF } from "jspdf";
import { FONTS } from "@/stores/useEditorStore";
import { glyphGuideData } from "@/lib/glyphGuides";
import { waitForFontFace } from "@/lib/fontFace";
import { PAGE_FORMATS } from "@/lib/localeDefaults";
import { LETTER_STRIP, paintChart, paintLetterStrip, paintTrace } from "@/lib/alphabetSheet.mjs";
import { ALPHABET, ALPHABET_FONTS, ALPHABET_UI, alphabetIndex } from "@/content/cursiveAlphabet";
import { Link } from "@/i18n/navigation";

function primaryFamily(css: string): string {
  return css.match(/'([^']+)'/)?.[1] ?? "cursive";
}

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
    const letter = new URLSearchParams(window.location.search).get("letter");
    if (letter) setSelected(alphabetIndex(letter));
  }, []);

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
  const guide = glyphGuideData(fontId);

  function drawSheet(ctx: CanvasRenderingContext2D) {
    paintLetterStrip(ctx, { family, guide, guides, pair });
  }

  function sheetOpts(w: number, h: number) {
    return {
      w,
      h,
      family,
      guide,
      guides,
      letters: ALPHABET,
      title: ALPHABET_UI.chartTitle,
      subtitle: fontMeta.label,
      note: ALPHABET_UI.traceNote,
    };
  }

  /** 离屏 2x 重绘导出清晰 PNG(与描红生成器同一手法) */
  function downloadPng() {
    const scale = 2;
    const off = document.createElement("canvas");
    off.width = LETTER_STRIP.w * scale;
    off.height = LETTER_STRIP.h * scale;
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
    const { w, h } = PAGE_FORMATS.letter;
    const chart = document.createElement("canvas");
    const trace = document.createElement("canvas");
    chart.width = w;
    chart.height = h;
    trace.width = w;
    trace.height = h;
    const chartCtx = chart.getContext("2d");
    const traceCtx = trace.getContext("2d");
    if (!chartCtx || !traceCtx) return;
    const opts = sheetOpts(w, h);
    paintChart(chartCtx, opts);
    paintTrace(traceCtx, { ...opts, title: ALPHABET_UI.traceTitle });
    const pdf = new jsPDF({ unit: "px", format: [w, h], orientation: "portrait" });
    pdf.addImage(chart.toDataURL("image/png"), "PNG", 0, 0, w, h);
    pdf.addPage([w, h], "portrait");
    pdf.addImage(trace.toDataURL("image/png"), "PNG", 0, 0, w, h);
    pdf.save("cursive-alphabet.pdf");
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
          width={LETTER_STRIP.w}
          height={LETTER_STRIP.h}
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
