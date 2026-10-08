"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { FilePdf } from "@phosphor-icons/react";
import { jsPDF } from "jspdf";
import { FONTS } from "@/stores/useEditorStore";
import { useDebouncedImeSafe } from "./useDebouncedImeSafe";

const W = 816; // Letter @96dpi
const H = 1056;
const TOP = 56;
const BOTTOM = 56;
const WORDS_PER_PAGE = 5;
const ROWS_PER_WORD = 3; // 1 示例行 + 2 描红行
const MAX_WORDS = 60;
const DEFAULT_WORDS = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(65 + i),
).join("\n");

function primaryFamily(css: string): string {
  return css.match(/'([^']+)'/)?.[1] ?? "cursive";
}

/** 手写练习册生成器:封面 + 每词一组(示例行+描红行)的多页 Letter PDF */
export default function HandwritingWorkbookGenerator({
  defaultFontId = "patrickhand",
}: {
  defaultFontId?: string;
}) {
  const t = useTranslations("workbook");
  const [title, setTitle] = useState("");
  const [words, setWords] = useState(DEFAULT_WORDS);
  const [fontId, setFontId] = useState(defaultFontId);
  const [showCover, setShowCover] = useState(true);
  const [showExample, setShowExample] = useState(true);
  const [drawTitle, titleComposition] = useDebouncedImeSafe(title);
  const [drawWords, wordsComposition] = useDebouncedImeSafe(words);

  const font = FONTS.find((f) => f.id === fontId) ?? FONTS[0];
  const family = primaryFamily(font.css);

  const wordList = useMemo(
    () =>
      drawWords
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean)
        .slice(0, MAX_WORDS),
    [drawWords],
  );
  const pages = useMemo(() => {
    const chunks: string[][] = [];
    for (let i = 0; i < wordList.length; i += WORDS_PER_PAGE) {
      chunks.push(wordList.slice(i, i + WORDS_PER_PAGE));
    }
    return chunks;
  }, [wordList]);
  const bookTitle = drawTitle.trim() || t("defaultTitle");
  const bandH = Math.floor((H - TOP - BOTTOM) / (WORDS_PER_PAGE * ROWS_PER_WORD));

  const wrapRef = useRef<HTMLDivElement>(null);

  /** 三线格一行:顶线(浅)+ 中虚线 + 基线(实) */
  function drawRowGuides(ctx: CanvasRenderingContext2D, y0: number) {
    ctx.save();
    ctx.strokeStyle = "#b8c8dc";
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.7;
    ctx.beginPath();
    ctx.moveTo(48, y0);
    ctx.lineTo(W - 48, y0);
    ctx.stroke();
    ctx.restore();
    ctx.save();
    ctx.strokeStyle = "#9db3cc";
    ctx.setLineDash([8, 6]);
    ctx.beginPath();
    ctx.moveTo(48, y0 + bandH * 0.52);
    ctx.lineTo(W - 48, y0 + bandH * 0.52);
    ctx.stroke();
    ctx.restore();
    ctx.save();
    ctx.strokeStyle = "#9db3cc";
    ctx.beginPath();
    ctx.moveTo(48, y0 + bandH);
    ctx.lineTo(W - 48, y0 + bandH);
    ctx.stroke();
    ctx.restore();
  }

  function drawWordsPage(ctx: CanvasRenderingContext2D, pageWords: string[], pageIndex: number) {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, W, H);
    // 不足一页的空位补空白练习行;完全无词时整页仍是可用格线
    const slots: (string | undefined)[] = Array.from({ length: WORDS_PER_PAGE }, (_, i) => pageWords[i]);
    let y0 = TOP;
    for (const word of slots) {
      for (let r = 0; r < ROWS_PER_WORD; r++) {
        drawRowGuides(ctx, y0);
        if (word) {
          const fontSize = Math.round(bandH * 0.62);
          ctx.font = `${fontSize}px "${family}"`;
          ctx.textBaseline = "alphabetic";
          ctx.save();
          ctx.globalAlpha = showExample && r === 0 ? 1 : 0.28;
          ctx.fillStyle = "#3a3a3a";
          ctx.fillText(word, 68, y0 + bandH - 6);
          ctx.restore();
        }
        y0 += bandH;
      }
    }
    ctx.fillStyle = "#9ca3af";
    ctx.font = "13px ui-sans-serif, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(t("pageN", { n: pageIndex + 1 }), W / 2, H - 24);
    ctx.textAlign = "left";
  }

  function drawCover(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, W, H);
    // 双线边框
    ctx.strokeStyle = "#9db3cc";
    ctx.lineWidth = 3;
    ctx.strokeRect(28, 28, W - 56, H - 56);
    ctx.lineWidth = 1;
    ctx.strokeRect(40, 40, W - 80, H - 80);

    ctx.fillStyle = "#3a3a3a";
    ctx.textAlign = "center";
    // 书名自动折行
    const maxWidth = W - 200;
    let size = 64;
    ctx.font = `${size}px "${family}"`;
    while (ctx.measureText(bookTitle).width > maxWidth && size > 28) {
      size -= 4;
      ctx.font = `${size}px "${family}"`;
    }
    const lines: string[] = [];
    for (const raw of bookTitle.split("\n")) {
      let line = "";
      for (const ch of raw) {
        if (ctx.measureText(line + ch).width > maxWidth && line) {
          lines.push(line);
          line = ch;
        } else {
          line += ch;
        }
      }
      lines.push(line);
    }
    const lineH = size * 1.3;
    let y = H * 0.38 - ((lines.length - 1) * lineH) / 2;
    for (const line of lines) {
      ctx.fillText(line, W / 2, y);
      y += lineH;
    }

    // 归属行:This book belongs to ______
    ctx.font = "20px ui-sans-serif, system-ui, sans-serif";
    ctx.fillStyle = "#6b7280";
    const belongsY = H * 0.62;
    ctx.fillText(t("coverBelongsTo"), W / 2, belongsY);
    ctx.strokeStyle = "#9ca3af";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(W / 2 - 140, belongsY + 36);
    ctx.lineTo(W / 2 + 140, belongsY + 36);
    ctx.stroke();
    ctx.textAlign = "left";
  }

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      const sample = bookTitle + wordList.join("");
      await document.fonts.load(`64px "${family}"`, sample).catch(() => {});
      if (cancelled) return;
      const canvases = wrapRef.current?.querySelectorAll<HTMLCanvasElement>("canvas");
      if (!canvases) return;
      const hasCover = showCover;
      canvases.forEach((canvas, i) => {
        const pageIndex = hasCover ? i - 1 : i;
        canvas.width = W;
        canvas.height = H;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        if (hasCover && i === 0) drawCover(ctx);
        else drawWordsPage(ctx, pages[pageIndex] ?? [], pageIndex);
      });
    };
    void run();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookTitle, pages, fontId, showCover, showExample]);

  const downloadPdf = () => {
    const canvases = wrapRef.current?.querySelectorAll<HTMLCanvasElement>("canvas");
    if (!canvases || canvases.length === 0) return;
    const pdf = new jsPDF({ unit: "px", format: [W, H], orientation: "portrait" });
    canvases.forEach((canvas, i) => {
      if (i > 0) pdf.addPage([W, H], "portrait");
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, W, H);
    });
    pdf.save("handwriting-workbook.pdf");
  };

  const pageCount = pages.length + (showCover ? 1 : 0);

  return (
    <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[300px_auto]">
      <aside className="flex flex-col gap-4 lg:sticky lg:top-20">
        <div className="flex flex-col gap-1.5">
          <span className="field-label">{t("titleLabel")}</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            {...titleComposition}
            placeholder={t("defaultTitle")}
            className="surface-input p-3 text-sm"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="field-label">{t("wordsLabel")}</span>
          <textarea
            value={words}
            onChange={(e) => setWords(e.target.value)}
            {...wordsComposition}
            rows={8}
            placeholder={t("wordsPlaceholder")}
            className="surface-input resize-y p-3 font-mono text-sm leading-relaxed"
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
          <span className="text-zinc-700">{t("showCover")}</span>
          <button
            role="switch"
            aria-checked={showCover}
            onClick={() => setShowCover(!showCover)}
            className={`relative h-6 w-11 cursor-pointer rounded-full transition-colors duration-200 ${
              showCover ? "bg-accent" : "bg-zinc-300"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow transition-transform duration-200 ${
                showCover ? "translate-x-5" : ""
              }`}
            />
          </button>
        </label>

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

        <p className="text-xs text-zinc-400">{t("stats", { pages: pageCount, words: wordList.length })}</p>

        <button onClick={downloadPdf} className="btn btn-primary flex-1 px-4 py-2.5 text-sm">
          <FilePdf className="size-4" />
          {t("downloadPdf")}
        </button>
      </aside>

      <div ref={wrapRef} className="flex flex-col gap-6 overflow-hidden rounded-xl">
        {showCover && (
          <canvas className="block h-auto w-full rounded-xl border border-zinc-200 shadow-paper" />
        )}
        {(pages.length > 0 ? pages : [[]]).map((_, i) => (
          <canvas key={i} className="block h-auto w-full rounded-xl border border-zinc-200 shadow-paper" />
        ))}
      </div>
    </div>
  );
}
