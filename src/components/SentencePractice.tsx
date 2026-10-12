"use client";

import { useEffect, useRef, useState } from "react";
import { FilePdf, Image as ImageIcon, Microphone, Stop } from "@phosphor-icons/react";
import { jsPDF } from "jspdf";
import { useLocale, useTranslations } from "next-intl";
import {
  LINE_HEIGHTS,
  SENTENCE_PRACTICE_KEY,
  SLANT_DEGREES,
  fitsOneLine,
  guidesFor,
  marginSide,
  modelFont,
  parseSentencePracticeRecord,
  printedSentence,
  sheetRows,
  wordSpaceIndexes,
  type LineHeightId,
  type SentenceFocus,
  type SentencePracticeRecord,
} from "@/engine/sentencePractice";
import { waitForFontFace } from "@/lib/fontFace";
import { fadeInk } from "@/lib/ink";
import { PAGE_FORMATS, speechLang, type PageFormat } from "@/lib/localeDefaults";
import { FONTS } from "@/stores/useEditorStore";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import ColorSwatch from "./ColorSwatch";
import PracticeLayout from "./PracticeLayout";
import WatermarkSwitch from "./WatermarkSwitch";
import { useDebouncedImeSafe } from "./useDebouncedImeSafe";

const FILE_STEM = "handwriting-sentence-practice";
const FOCUSES: SentenceFocus[] = ["size", "slant", "spacing", "print"];
const HEIGHTS: LineHeightId[] = ["large", "regular", "small"];

function primaryFamily(css: string): string {
  return css.match(/'([^']+)'/)?.[1] ?? "cursive";
}

/** 范字行也画同一套线,否则实心字不贴后面要写的基线。 */
function drawSheet(
  ctx: CanvasRenderingContext2D,
  opts: {
    w: number;
    h: number;
    sentence: string;
    focus: SentenceFocus;
    leftHand: boolean;
    bandH: number;
    rewrite: boolean;
    family: string;
    ink: string;
    bg: string;
    watermark: boolean;
    watermarkLabel: string;
    stopLabel: string;
  },
) {
  const { w, h, sentence, focus, leftHand, bandH, rewrite, family, ink, bg } = opts;
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  const side = marginSide(leftHand);
  const marginX = side === "left" ? 48 : w - 48;
  ctx.strokeStyle = "#dc2626";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(marginX, 36);
  ctx.lineTo(marginX, h - 52);
  ctx.stroke();

  const fontSize = Math.round(bandH * 0.62);
  const textX = 72;
  const x0 = 64;
  const x1 = w - 64;
  const top = 56;
  const rows = sheetRows(rewrite);
  const guides = guidesFor(focus, leftHand);
  ctx.font = `${fontSize}px "${family}"`;
  ctx.textBaseline = "alphabetic";
  const widths = [...sentence].map((ch) => ctx.measureText(ch).width);

  rows.forEach((row, index) => {
    const y0 = top + index * bandH;
    const baseline = y0 + bandH - Math.round(fontSize * 0.22);
    ctx.save();
    ctx.beginPath();
    ctx.rect(x0, y0, x1 - x0, bandH);
    ctx.clip();
    for (const guide of guides) {
      if (guide.kind === "baseline") {
        ctx.save();
        ctx.strokeStyle = "#9db3cc";
        ctx.lineWidth = 1.25;
        ctx.beginPath();
        ctx.moveTo(x0, baseline);
        ctx.lineTo(x1, baseline);
        ctx.stroke();
        ctx.restore();
      } else if (guide.kind === "midline") {
        ctx.save();
        ctx.strokeStyle = "#9db3cc";
        ctx.lineWidth = 1;
        ctx.setLineDash([6, 5]);
        ctx.beginPath();
        ctx.moveTo(x0, baseline - fontSize / 2);
        ctx.lineTo(x1, baseline - fontSize / 2);
        ctx.stroke();
        ctx.restore();
      } else if (guide.kind === "slant") {
        const sign = guide.direction === "right" ? 1 : -1;
        const rise = bandH;
        const dx = Math.tan((SLANT_DEGREES * Math.PI) / 180) * rise * sign;
        ctx.save();
        ctx.strokeStyle = "#9db3cc";
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let x = x0 - Math.abs(dx); x <= x1 + Math.abs(dx); x += 32) {
          ctx.moveTo(x, y0 + bandH);
          ctx.lineTo(x + dx, y0);
        }
        ctx.stroke();
        ctx.restore();
      } else {
        const ticks = wordSpaceIndexes(sentence);
        if (ticks.length) {
          const tickH = Math.max(12, fontSize * 0.28);
          ctx.save();
          ctx.strokeStyle = "#9db3cc";
          ctx.lineWidth = 1.25;
          ctx.beginPath();
          let x = textX;
          widths.forEach((width, i) => {
            if (ticks.includes(i)) {
              const mid = x + width / 2;
              ctx.moveTo(mid, baseline);
              ctx.lineTo(mid, baseline - tickH);
            }
            x += width;
          });
          ctx.stroke();
          ctx.restore();
        }
      }
    }
    if (row === "solid") {
      ctx.fillStyle = ink;
      ctx.fillText(sentence, textX, baseline);
    } else if (row === "dashed") {
      ctx.save();
      ctx.strokeStyle = fadeInk(ink);
      ctx.lineWidth = 1.15;
      ctx.setLineDash([2.5, 2.5]);
      ctx.strokeText(sentence, textX, baseline);
      ctx.restore();
    }
    ctx.restore();
  });

  ctx.fillStyle = "#71717a";
  ctx.font = "14px sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillText(opts.stopLabel, 72, h - (opts.watermark ? 40 : 28));

  if (opts.watermark) {
    ctx.fillStyle = "#c9c9ce";
    ctx.font = "11px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(opts.watermarkLabel, w / 2, h - 16);
    ctx.textAlign = "left";
  }
}

/** 成人单句练习纸:一句、一项、五行,写完三行就停。 */
export default function SentencePractice({ defaultFormat }: { defaultFormat: PageFormat }) {
  const t = useTranslations("sentencePractice");
  const tool = useTranslations("tool");
  const watermarkLabel = useTranslations("home")("watermarkLabel");
  const locale = useLocale();
  const { w, h } = PAGE_FORMATS[defaultFormat];
  const sample = t("sample");

  const [sentence, setSentence] = useState("");
  const [focus, setFocus] = useState<SentenceFocus>("size");
  const [leftHand, setLeftHand] = useState(false);
  const [script, setScript] = useState(false);
  const [lineHeight, setLineHeight] = useState<LineHeightId>("regular");
  const [ink, setInk] = useState("#3a3a3a");
  const [bg, setBg] = useState("#ffffff");
  const [watermark, setWatermark] = useState(false);
  const [rewrite, setRewrite] = useState(false);
  const [record, setRecord] = useState<SentencePracticeRecord | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawSentence, compositionProps] = useDebouncedImeSafe(sentence);

  useEffect(() => {
    // 记录只存在浏览器里,首屏保持空,避免和水合结果不一致
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRecord(parseSentencePracticeRecord(localStorage.getItem(SENTENCE_PRACTICE_KEY)));
  }, []);

  const printed = printedSentence(drawSentence, sample);
  const ready = fitsOneLine(printed.sentence);
  const fontId = modelFont(focus, script);
  const font = FONTS.find((item) => item.id === fontId) ?? FONTS[0];
  const family = primaryFamily(font.css);
  const bandH = LINE_HEIGHTS[lineHeight];
  const showSpacingNote = focus === "spacing" && wordSpaceIndexes(printed.sentence).length === 0;

  const stopLabel = t("stopLine");
  const sheetOpts = {
    w,
    h,
    sentence: printed.sentence,
    focus,
    leftHand,
    bandH,
    rewrite,
    family,
    ink,
    bg,
    watermark,
    watermarkLabel,
    stopLabel,
  };

  useEffect(() => {
    if (!ready) return;
    let cancelled = false;
    const run = async () => {
      await waitForFontFace(family);
      await document.fonts.load(`${bandH}px "${family}"`, printed.sentence).catch(() => {});
      if (cancelled) return;
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;
      canvas.width = w;
      canvas.height = h;
      drawSheet(ctx, sheetOpts);
    };
    void run();
    return () => {
      cancelled = true;
    };
    // sheetOpts 每次渲染都是新对象,依赖拆开写
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, printed.sentence, focus, leftHand, script, lineHeight, ink, bg, rewrite, watermark, watermarkLabel, family, w, h, stopLabel]);

  const { supported, listening, interim, error, start, stop } = useSpeechRecognition({
    lang: speechLang(locale),
    onFinal: (chunk) => setSentence((prev) => (prev.trim() ? `${prev} ${chunk}` : chunk)),
  });

  const errorText =
    error === "denied" ? t("errorDenied") : error === "network" ? t("errorNetwork") : error === "stopped" ? t("errorStopped") : null;

  async function ensureFont() {
    const fontSize = Math.round(bandH * 0.62);
    await waitForFontFace(family);
    await document.fonts.load(`${fontSize}px "${family}"`, printed.sentence).catch(() => {});
  }

  function remember() {
    const next: SentencePracticeRecord = {
      sentence: printed.sentence,
      focus,
      leftHand,
      script: focus === "print" ? false : script,
      lineHeight,
      downloadedAt: new Date().toISOString(),
    };
    localStorage.setItem(SENTENCE_PRACTICE_KEY, JSON.stringify(next));
    setRecord(next);
  }

  function paintOffscreen(): HTMLCanvasElement | null {
    const off = document.createElement("canvas");
    off.width = w;
    off.height = h;
    const ctx = off.getContext("2d");
    if (!ctx) return null;
    drawSheet(ctx, sheetOpts);
    return off;
  }

  const downloadPdf = async () => {
    if (!ready) return;
    await ensureFont();
    const off = paintOffscreen();
    if (!off) return;
    const pdf = new jsPDF({ unit: "px", format: [w, h], orientation: "portrait" });
    pdf.addImage(off.toDataURL("image/png"), "PNG", 0, 0, w, h);
    pdf.save(`${FILE_STEM}.pdf`);
    remember();
  };

  const downloadPng = async () => {
    if (!ready) return;
    await ensureFont();
    const scale = 2;
    const off = document.createElement("canvas");
    off.width = w * scale;
    off.height = h * scale;
    const ctx = off.getContext("2d");
    if (!ctx) return;
    ctx.scale(scale, scale);
    drawSheet(ctx, sheetOpts);
    off.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${FILE_STEM}.png`;
      a.click();
      URL.revokeObjectURL(url);
      remember();
    }, "image/png");
  };

  const focusLabel = (id: SentenceFocus) =>
    id === "size" ? t("focusSize") : id === "slant" ? t("focusSlant") : id === "spacing" ? t("focusSpacing") : t("focusPrint");

  const heightLabel = (id: LineHeightId) =>
    id === "large" ? t("lineLarge") : id === "regular" ? t("lineRegular") : t("lineCompact");

  const lastDate = record
    ? new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(new Date(record.downloadedAt))
    : "";

  const writeAgain = () => {
    if (!record) return;
    setSentence(record.sentence);
    setFocus(record.focus);
    setLeftHand(record.leftHand);
    setScript(record.script);
    setLineHeight(record.lineHeight);
    setRewrite(true);
  };

  const choiceClass = (on: boolean) =>
    `cursor-pointer rounded-lg border px-2.5 py-1.5 text-xs transition-colors ${
      on ? "border-accent bg-accent/5 text-accent" : "border-zinc-200 bg-white text-zinc-500 hover:border-zinc-300"
    }`;

  return (
    <PracticeLayout
      input={
        <>
          {record && (
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2">
              <p className="text-sm text-zinc-600">{t("lastSession", { focus: focusLabel(record.focus), date: lastDate })}</p>
              <button type="button" className="btn btn-ghost px-3 py-1.5 text-xs" onClick={writeAgain}>
                {t("writeAgain")}
              </button>
            </div>
          )}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between gap-2">
              <span className="field-label">{t("sentenceLabel")}</span>
              {supported && (
                <button
                  type="button"
                  onClick={listening ? stop : start}
                  className={`${listening ? "btn btn-recording" : "btn btn-ghost"} px-2.5 py-1 text-xs`}
                >
                  {listening ? <Stop weight="fill" className="size-3.5" /> : <Microphone weight="fill" className="size-3.5" />}
                  {listening ? t("listening") : t("mic")}
                </button>
              )}
            </div>
            <textarea
              value={sentence}
              onChange={(e) => setSentence(e.target.value)}
              {...compositionProps}
              rows={2}
              placeholder={sample}
              aria-label={t("sentenceLabel")}
              className="surface-input resize-y p-3 text-sm leading-relaxed"
            />
            {printed.truncated && <p className="text-xs leading-relaxed text-zinc-500">{t("truncated")}</p>}
            {listening && interim && <p className="text-xs text-zinc-400">{interim}…</p>}
            {errorText && <p className="text-xs leading-relaxed text-rose-700">{errorText}</p>}
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="field-label">{t("focusLabel")}</span>
            <div className="flex flex-wrap gap-1.5" role="group" aria-label={t("focusLabel")}>
              {FOCUSES.map((id) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={focus === id}
                  onClick={() => {
                    setFocus(id);
                    if (id === "print") setScript(false);
                  }}
                  className={choiceClass(focus === id)}
                >
                  {focusLabel(id)}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="flex items-center justify-between gap-2 text-sm">
              <span className="text-zinc-700">{t("leftHand")}</span>
              <button
                type="button"
                role="switch"
                aria-checked={leftHand}
                aria-label={t("leftHand")}
                onClick={() => setLeftHand((on) => !on)}
                className={`relative h-6 w-11 cursor-pointer rounded-full transition-colors duration-200 ${
                  leftHand ? "bg-accent" : "bg-zinc-300"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow transition-transform duration-200 ${
                    leftHand ? "translate-x-5" : ""
                  }`}
                />
              </button>
            </label>
            <p className="text-xs leading-relaxed text-zinc-500">{t("leftHandHint")}</p>
            {showSpacingNote && <p className="text-xs leading-relaxed text-zinc-500">{t("spacingNeedsSpaces")}</p>}
          </div>
        </>
      }
      download={
        <>
          <WatermarkSwitch on={watermark} onChange={setWatermark} />
          <div className="flex gap-2">
            <button type="button" onClick={downloadPdf} disabled={!ready} className="btn btn-primary flex-1 px-4 py-2.5 text-sm disabled:cursor-not-allowed disabled:opacity-40">
              <FilePdf className="size-4" />
              {t("downloadPdf")}
            </button>
            <button type="button" onClick={downloadPng} disabled={!ready} className="btn btn-ghost flex-1 px-4 py-2.5 text-sm disabled:cursor-not-allowed disabled:opacity-40">
              <ImageIcon className="size-4 text-zinc-500" />
              {t("downloadPng")}
            </button>
          </div>
        </>
      }
      more={
        <>
          <div className="flex flex-col gap-1.5">
            <span className="field-label">{t("lineHeight")}</span>
            <div className="flex flex-wrap gap-1.5">
              {HEIGHTS.map((id) => (
                <button key={id} type="button" aria-pressed={lineHeight === id} onClick={() => setLineHeight(id)} className={choiceClass(lineHeight === id)}>
                  {heightLabel(id)}
                </button>
              ))}
            </div>
          </div>
          <label className={`flex items-center justify-between gap-2 text-sm ${focus === "print" ? "opacity-50" : ""}`}>
            <span className="text-zinc-700">{t("script")}</span>
            <button
              type="button"
              role="switch"
              aria-checked={focus !== "print" && script}
              aria-label={t("script")}
              disabled={focus === "print"}
              onClick={() => setScript((on) => !on)}
              className={`relative h-6 w-11 rounded-full transition-colors duration-200 ${
                focus !== "print" && script ? "bg-accent" : "bg-zinc-300"
              } ${focus === "print" ? "cursor-not-allowed" : "cursor-pointer"}`}
            >
              <span
                className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow transition-transform duration-200 ${
                  focus !== "print" && script ? "translate-x-5" : ""
                }`}
              />
            </button>
          </label>
          <ColorSwatch label={tool("ink")} value={ink} onChange={setInk} />
          <ColorSwatch label={tool("paperCustom.bg")} value={bg} onChange={setBg} />
        </>
      }
      preview={
        ready ? (
          <div className="overflow-hidden rounded-xl border border-zinc-200 shadow-paper">
            <canvas ref={canvasRef} className="block h-auto w-full" aria-label={t("title")} />
          </div>
        ) : (
          <p role="status" className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-8 text-sm leading-relaxed text-zinc-600">
            {t("tooLong")}
          </p>
        )
      }
    />
  );
}
