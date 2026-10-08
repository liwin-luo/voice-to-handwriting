"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import PageFormatToggle from "./PageFormatToggle";
import { useDebouncedImeSafe } from "./useDebouncedImeSafe";
import { tokenize, type Token } from "@/engine/tokens";
import { expandPages, paginateLineTops } from "@/engine/layout";
import {
  blankPaperPath,
  CALC_PAPERS,
  CALC_SCRIPTS,
  estimate,
  handoffPayload,
  isWordScript,
  paginateCells,
  previewSlots,
  SAMPLE_TEXT,
  sheetsFor,
  type CalcFormat,
  type CalcGap,
  type CalcPaper,
  type CalcScript,
  type CalcSize,
} from "@/engine/pageEstimate";
import { defaultFontId, type PageFormat } from "@/lib/localeDefaults";
import { FONTS } from "@/stores/useEditorStore";

const GAPS: CalcGap[] = ["tight", "normal", "loose"];
const SIZES: CalcSize[] = ["small", "normal", "large"];
const HANDOFF_KEY = "vth-page-calc";

function isScript(value: string): value is CalcScript {
  return (CALC_SCRIPTS as readonly string[]).includes(value);
}

/** 横线纸的行线画在文字区底部，和 line-height 对齐。三线格中线用实线代替虚线：repeating-gradient 画不出虚线。 */
function ruledFill(pitch: number, kindergarten: boolean): string {
  if (kindergarten) {
    const mid = Math.round(pitch * 0.52);
    return `repeating-linear-gradient(to bottom, transparent 0 ${mid - 1}px, #b7c6d6 ${mid - 1}px ${mid}px, transparent ${mid}px ${pitch - 1}px, #8ea0b5 ${pitch - 1}px ${pitch}px), #ffffff`;
  }
  return `repeating-linear-gradient(to bottom, transparent 0 ${pitch - 1}px, #c7d4e3 ${pitch - 1}px ${pitch}px), #ffffff`;
}

function gridFill(cell: number): string {
  return `repeating-linear-gradient(to bottom, transparent 0 ${cell - 1}px, #d9e2ec ${cell - 1}px ${cell}px), repeating-linear-gradient(to right, transparent 0 ${cell - 1}px, #d9e2ec ${cell - 1}px ${cell}px), #ffffff`;
}

function TokenFlow({ tokens, indexed }: { tokens: Token[]; indexed?: boolean }) {
  return (
    <div style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
      {tokens.map((tok, i) =>
        tok.kind === "newline" ? (
          <br key={i} />
        ) : (
          <span
            key={i}
            data-idx={indexed ? i : undefined}
            style={{ display: "inline-block", whiteSpace: "pre" }}
          >
            {tok.kind === "space" ? "\u00A0" : tok.text}
          </span>
        ),
      )}
    </div>
  );
}

/** 手写用纸页数：数字走容量公式，正文按字体宽度分页并预览。 */
export default function PageCalculator() {
  const t = useTranslations("pageCalc");
  const sheet = useTranslations("sheet");
  const locale = useLocale();
  const router = useRouter();
  const initialScript: CalcScript = isScript(locale) ? locale : "en";
  const [text, setText] = useState("");
  const [countRaw, setCountRaw] = useState("500");
  const [script, setScript] = useState<CalcScript>(initialScript);
  const [paper, setPaper] = useState<CalcPaper>("college");
  const [format, setFormat] = useState<CalcFormat>(locale === "en" ? "letter" : "a4");
  const [size, setSize] = useState<CalcSize>("normal");
  const [gap, setGap] = useState<CalcGap>("normal");
  const [sides, setSides] = useState<1 | 2>(1);
  const [pitch, setPitch] = useState(40);
  const [debounced, compositionProps] = useDebouncedImeSafe(text);
  const [ruledPages, setRuledPages] = useState<Token[][]>([]);
  const [ruledLastLine, setRuledLastLine] = useState(0);
  const measureRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const est = useMemo(
    () => estimate({ script, paper, format, size, gap, pitch }),
    [script, paper, format, size, gap, pitch],
  );
  const fontId = defaultFontId(script);
  const fontCss = FONTS.find((f) => f.id === fontId)?.css ?? "cursive";
  const tokens = useMemo(() => tokenize(debounced), [debounced]);
  const hasText = debounced.trim().length > 0;
  const cellPages = est.cell != null && hasText ? paginateCells(debounced, est.glyphsPerLine, est.linesPerPage) : null;

  useLayoutEffect(() => {
    if (est.cell != null || !hasText) {
      setRuledPages([]);
      setRuledLastLine(0);
      return;
    }
    let cancelled = false;
    const measure = () => {
      const el = measureRef.current;
      if (!el || cancelled) return;
      const boxes = Array.from(el.querySelectorAll<HTMLElement>("[data-idx]")).map((s) => ({
        index: Number(s.dataset.idx),
        top: s.offsetTop,
      }));
      const groups = paginateLineTops(boxes, est.boxH);
      const pages = expandPages(groups, tokens).map((g) => g.map((i) => tokens[i]));
      const last = groups[groups.length - 1] ?? [];
      const tops = new Set(boxes.filter((b) => last.includes(b.index)).map((b) => b.top));
      setRuledPages(pages);
      setRuledLastLine(tops.size);
    };
    measure();
    document.fonts?.ready.then(() => {
      if (!cancelled) measure();
    });
    return () => {
      cancelled = true;
    };
  }, [hasText, tokens, est.cell, est.boxH, est.boxW, est.fontSize, est.letterSpacingEm, est.pitch, fontCss]);

  const count = Math.max(0, Math.floor(Number(countRaw) || 0));
  const fromCount = sheetsFor(est, count, sides, script);
  const writingPages = cellPages ? cellPages.length : ruledPages.length;

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => setScale(Math.min(1, el.clientWidth / est.pageW));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [est.pageW, writingPages]);
  const textSheets = writingPages === 0 ? 0 : Math.ceil(writingPages / sides);
  const textLastLine = cellPages ? (cellPages[cellPages.length - 1]?.length ?? 0) : ruledLastLine;
  const slots = previewSlots(writingPages);
  const previewH =
    slots.reduce((sum, slot) => sum + (slot.kind === "page" ? est.pageH : 48), 0) +
    Math.max(0, slots.length - 1) * 24;
  const unit = isWordScript(script) ? t("unitWord") : t("unitChar");
  const paperLabel = t(`paper.${paper}`);
  const chars = [...debounced.replace(/\r/g, "")].filter((ch) => ch !== "\n").length;
  const words = debounced.trim() ? debounced.trim().split(/\s+/).length : 0;

  const textStyle = {
    fontFamily: fontCss,
    fontSize: est.fontSize,
    lineHeight: `${est.pitch}px`,
    letterSpacing: `${est.letterSpacingEm}em`,
    color: "#1a1a1a",
  } as const;

  const openTool = () => {
    const payload = handoffPayload(
      { script, paper, format, size, gap, pitch },
      text,
      fontId,
    );
    sessionStorage.setItem(HANDOFF_KEY, JSON.stringify(payload));
    router.push("/");
  };

  const pageShell = (index: number, body: ReactNode) => (
    <div
      key={index}
      className="shadow-paper relative overflow-hidden rounded-xl bg-white"
      style={{ width: est.pageW, height: est.pageH }}
    >
      {body}
      {!est.cell && (
        <span className="absolute top-0 bottom-0 w-px bg-[#e26d6d]" style={{ left: 76 }} />
      )}
      <span className="absolute right-5 bottom-3 font-mono text-[11px] text-zinc-400">
        {t("pageMark", { n: index + 1, total: writingPages })}
      </span>
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
      <label className="flex flex-col gap-1.5">
        <span className="field-label">{t("textLabel")}</span>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, 20000))}
          rows={5}
          placeholder={t("textPlaceholder")}
          className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm leading-relaxed"
          {...compositionProps}
        />
        <span className="flex items-center justify-between gap-2 text-xs text-zinc-400">
          <span>{t("textHint")}</span>
          <button type="button" className="cursor-pointer text-accent" onClick={() => setText(SAMPLE_TEXT[script])}>
            {t("sample")}
          </button>
        </span>
      </label>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[300px_auto]">
        <aside className="flex flex-col gap-4 lg:sticky lg:top-20">
          <label className="flex flex-col gap-1.5">
            <span className="field-label">{t("countLabel")}</span>
            <input
              type="number"
              min={0}
              value={countRaw}
              onChange={(e) => setCountRaw(e.target.value)}
              className="rounded-lg border border-zinc-200 px-2 py-1.5 text-sm"
            />
            <span className="text-xs text-zinc-400">{hasText ? t("usingText") : t("countHint")}</span>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="field-label">{t("scriptLabel")}</span>
            <select
              value={script}
              onChange={(e) => setScript(e.target.value as CalcScript)}
              className="rounded-lg border border-zinc-200 bg-white px-2 py-1.5 text-sm"
            >
              {CALC_SCRIPTS.map((id) => (
                <option key={id} value={id}>
                  {t(`script.${id}`)}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="field-label">{t("paperLabel")}</span>
            <select
              value={paper}
              onChange={(e) => setPaper(e.target.value as CalcPaper)}
              className="rounded-lg border border-zinc-200 bg-white px-2 py-1.5 text-sm"
            >
              {CALC_PAPERS.map((id) => (
                <option key={id} value={id}>
                  {t(`paper.${id}`)}
                </option>
              ))}
            </select>
          </label>

          {paper === "custom" && (
            <label className="flex items-center justify-between gap-2 text-sm">
              <span className="text-zinc-700">{t("pitchLabel")}</span>
              <input
                type="range"
                min={24}
                max={64}
                value={pitch}
                onChange={(e) => setPitch(Number(e.target.value))}
                className="accent-accent"
              />
            </label>
          )}

          <div className="flex flex-col gap-1.5">
            <span className="field-label">{t("sizeLabel")}</span>
            <div className="flex gap-1.5">
              {SIZES.map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setSize(id)}
                  className={`flex-1 cursor-pointer rounded-lg border px-2 py-1.5 text-xs ${
                    size === id ? "border-accent bg-accent/5 text-accent" : "border-zinc-200 bg-white text-zinc-500"
                  }`}
                >
                  {t(`size.${id}`)}
                </button>
              ))}
            </div>
          </div>

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="field-label">{t("gapLabel")}</span>
            <input
              type="range"
              min={0}
              max={2}
              step={1}
              value={GAPS.indexOf(gap)}
              disabled={est.gapLocked}
              onChange={(e) => setGap(GAPS[Number(e.target.value)] ?? "normal")}
              className="accent-accent disabled:opacity-40"
            />
            <span className="text-xs text-zinc-400">{est.gapLocked ? t("gapLocked") : t(`gap.${gap}`)}</span>
          </label>

          <div className="flex flex-col gap-1.5">
            <span className="field-label">{t("sidesLabel")}</span>
            <div className="flex gap-1.5">
              {([1, 2] as const).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setSides(n)}
                  className={`flex-1 cursor-pointer rounded-lg border px-2 py-1.5 text-xs ${
                    sides === n ? "border-accent bg-accent/5 text-accent" : "border-zinc-200 bg-white text-zinc-500"
                  }`}
                >
                  {n === 1 ? t("sidesOne") : t("sidesTwo")}
                </button>
              ))}
            </div>
          </div>

          <PageFormatToggle value={format as PageFormat} onChange={setFormat} />
        </aside>

        <div className="flex flex-col gap-4">
          <div className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm leading-relaxed" aria-live="polite">
            <p className="font-medium text-zinc-900">
              {hasText
                ? t("summaryText", { pages: writingPages, sheets: textSheets, line: textLastLine })
                : count > 0
                  ? t("summaryCount", { sheets: fromCount.sheets, count, unit, perPage: est.perPage, line: fromCount.lastLine })
                  : t("enterPrompt")}
            </p>
            {hasText && (
              <p className="mt-1 text-zinc-500">
                {isWordScript(script) ? t("textStats", { words, chars }) : t("textStatsChars", { chars })}
              </p>
            )}
            {!hasText && count > 0 && !est.gapLocked && (
              <p className="mt-1 text-zinc-500">{t("range", { tight: est.tightPerPage, loose: est.loosePerPage, unit })}</p>
            )}
            <p className="mt-1 text-xs text-zinc-400">
              {t("assumption", {
                paper: paperLabel,
                size: t(`size.${size}`),
                gap: est.gapLocked ? t("gapLockedShort") : t(`gap.${gap}`),
                format: format === "letter" ? sheet("sizeLetter") : sheet("sizeA4"),
                sides: sides === 1 ? t("sidesOne") : t("sidesTwo"),
              })}
            </p>
          </div>

          {hasText && est.cell == null && (
            <div
              ref={measureRef}
              aria-hidden
              style={{
                position: "absolute",
                visibility: "hidden",
                left: -99999,
                width: est.boxW,
                ...textStyle,
              }}
            >
              <TokenFlow tokens={tokens} indexed />
            </div>
          )}

          {hasText && writingPages > 0 && (
            <>
              <div ref={wrapRef} className="overflow-hidden" style={{ height: previewH * scale }}>
                <div className="flex flex-col gap-6" style={{ width: est.pageW, transform: `scale(${scale})`, transformOrigin: "top left" }}>
                  {slots.map((slot, i) => {
                    if (slot.kind === "gap") {
                      return (
                        <p key={`gap-${i}`} className="text-center text-sm text-zinc-400" style={{ width: est.pageW }}>
                          {t("omitted", { count: slot.omitted })}
                        </p>
                      );
                    }
                    if (cellPages && est.cell) {
                      const rows = cellPages[slot.index] ?? [];
                      const cell = est.cell;
                      return pageShell(
                        slot.index,
                        <div
                          style={{
                            position: "absolute",
                            top: est.padTop,
                            left: est.padLeft,
                            display: "grid",
                            gridTemplateColumns: `repeat(${est.glyphsPerLine}, ${cell}px)`,
                            width: est.glyphsPerLine * cell,
                            background: gridFill(cell),
                            fontFamily: fontCss,
                            color: "#1a1a1a",
                          }}
                        >
                          {Array.from({ length: est.linesPerPage * est.glyphsPerLine }, (_, n) => {
                            const r = Math.floor(n / est.glyphsPerLine);
                            const c = n % est.glyphsPerLine;
                            return (
                              <span
                                key={n}
                                style={{
                                  width: cell,
                                  height: cell,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: est.fontSize,
                                }}
                              >
                                {rows[r]?.[c] ?? ""}
                              </span>
                            );
                          })}
                        </div>,
                      );
                    }
                    return pageShell(
                      slot.index,
                      <>
                        <div
                          style={{
                            position: "absolute",
                            top: est.padTop,
                            left: est.padLeft,
                            width: est.boxW,
                            height: est.boxH,
                            background: ruledFill(est.pitch, paper === "kindergarten"),
                          }}
                        />
                        <div style={{ position: "absolute", top: est.padTop, left: est.padLeft, width: est.boxW, ...textStyle }}>
                          <TokenFlow tokens={ruledPages[slot.index] ?? []} />
                        </div>
                      </>,
                    );
                  })}
                </div>
              </div>
            </>
          )}

          <div className="flex flex-wrap gap-2">
            <Link href={blankPaperPath(paper)} className="btn btn-ghost px-4 py-2 text-sm">
              {t("printBlank")}
            </Link>
            <button type="button" onClick={openTool} className="btn btn-primary px-4 py-2 text-sm">
              {t("openTool")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
