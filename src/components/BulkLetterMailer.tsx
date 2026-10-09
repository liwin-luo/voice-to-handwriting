"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import { charJitter } from "@/engine/jitter";
import { tokenize } from "@/engine/tokens";
import {
  BULK_LETTER_CAP,
  LETTER_KINDS,
  blankRecipient,
  letterBody,
  paginateLetter,
  parseRecipientCsv,
  recipientsFromRows,
  tableToCsv,
  recipientLines,
  recipientSeed,
  returnLines,
  fromLine,
  type LetterKind,
  type ParseIssue,
  type Recipient,
} from "@/engine/bulkLetters";
import { getPaper } from "@/engine/paper";
import { waitForFontFace } from "@/lib/fontFace";
import { fileToPaperImage } from "@/lib/paperImage";
import { defaultFontId, defaultPageFormat, fontOrder, PAGE_FORMATS } from "@/lib/localeDefaults";
import { FONTS, type FontId } from "@/stores/useEditorStore";
import { buildLetterTemplate, readXlsxRows } from "@/engine/xlsxTable";
import ColorSwatch from "./ColorSwatch";

const RULE = 40;
const COLS = ["name", "street", "city", "region", "postal", "message"] as const;
const LETTER_PAPERS = ["cream", "blank", "ruled", "festive"] as const;
type LetterPaper = (typeof LETTER_PAPERS)[number];
const LETTER_BG = "linear-gradient(to right, transparent 0 46px, #e3b3b8 46px 48px, transparent 48px), #fffdf8";
const ENVELOPE_BG = "#fffdf8";
/** #10 信封 9.5×4.125 in；DL 信封 220×110 mm。均按 96dpi。 */
const ENVELOPE = {
  letter: { w: 912, h: 396 },
  a4: { w: 832, h: 416 },
} as const;

function primaryFamily(css: string): string {
  return css.match(/'([^']+)'/)?.[1] ?? "cursive";
}

function withRafFallback<T>(fn: () => Promise<T>): Promise<T> {
  const orig = window.requestAnimationFrame.bind(window);
  window.requestAnimationFrame = ((cb: FrameRequestCallback) =>
    window.setTimeout(() => cb(performance.now()), 16)) as typeof orig;
  return fn().finally(() => {
    window.requestAnimationFrame = orig;
  });
}

function letterPaperBackground(id: LetterPaper): string {
  if (id === "cream") return LETTER_BG;
  if (id === "blank") return "#ffffff";
  return getPaper(id).background;
}

function JitterText({
  text,
  seed,
  fontCss,
  fontSize,
  intensity,
  color,
}: {
  text: string;
  seed: number;
  fontCss: string;
  fontSize: number;
  intensity: number;
  color: string;
}) {
  const tokens = useMemo(() => tokenize(text), [text]);
  return (
    <div style={{ whiteSpace: "pre-wrap", wordBreak: "break-word", fontFamily: fontCss, fontSize, color, lineHeight: `${RULE}px` }}>
      {tokens.map((tok, i) => {
        if (tok.kind === "newline") return <br key={i} />;
        const j = charJitter(i, seed, intensity);
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              transform: `rotate(${j.rotate}deg) translateY(${j.translateY}px) scale(${j.scale})`,
              letterSpacing: `${j.letterSpacing}px`,
              opacity: j.opacity,
              whiteSpace: "pre",
            }}
          >
            {tok.kind === "space" ? "\u00A0" : tok.text}
          </span>
        );
      })}
    </div>
  );
}

function Scaled({ w, h, children }: { w: number; h: number; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setScale(Math.min(1, el.clientWidth / w));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [w]);
  return (
    <div ref={ref} style={{ height: h * scale }} className="overflow-hidden">
      <div style={{ width: w, height: h, transform: `scale(${scale})`, transformOrigin: "top left" }}>{children}</div>
    </div>
  );
}

function LetterFace({
  text,
  seed,
  fontCss,
  ink,
  background,
  image,
  w,
  h,
  capture,
}: {
  text: string;
  seed: number;
  fontCss: string;
  ink: string;
  background: string;
  image: string | null;
  w: number;
  h: number;
  capture?: boolean;
}) {
  return (
    <div
      data-sheet={capture ? "letter" : undefined}
      className={capture ? undefined : "shadow-paper relative overflow-hidden rounded-xl"}
      style={{ width: w, height: h, background, position: "relative", overflow: "hidden" }}
    >
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      ) : null}
      <div style={{ position: "relative", zIndex: 1, padding: "56px 64px" }}>
        <JitterText text={text} seed={seed} fontCss={fontCss} fontSize={22} intensity={0.5} color={ink} />
      </div>
    </div>
  );
}

function EnvelopeFace({
  back,
  to,
  seed,
  fontCss,
  ink,
  w,
  h,
  capture,
}: {
  back: string[];
  to: string[];
  seed: number;
  fontCss: string;
  ink: string;
  w: number;
  h: number;
  capture?: boolean;
}) {
  return (
    <div
      data-sheet={capture ? "envelope" : undefined}
      className={capture ? undefined : "shadow-paper relative overflow-hidden rounded-xl"}
      style={{ width: w, height: h, background: ENVELOPE_BG, position: "relative", overflow: "hidden" }}
    >
      {/* 96dpi 下 48px = 0.5in。家用打印机靠边约 0.25–0.5in 印不出来。 */}
      <div style={{ position: "absolute", top: 48, left: 48, maxWidth: "46%" }}>
        <JitterText text={back.join("\n")} seed={seed} fontCss={fontCss} fontSize={16} intensity={0.28} color={ink} />
      </div>
      <div style={{ position: "absolute", top: "42%", left: "42%", maxWidth: "50%" }}>
        <JitterText text={to.join("\n")} seed={seed + 1} fontCss={fontCss} fontSize={24} intensity={0.28} color={ink} />
      </div>
    </div>
  );
}

export default function BulkLetterMailer() {
  const t = useTranslations("bulkLetters");
  const tool = useTranslations("tool");
  const locale = useLocale();
  const format = defaultPageFormat(locale);
  const letterSize = PAGE_FORMATS[format];
  const envelopeSize = ENVELOPE[format];
  const [fontId, setFontId] = useState<FontId>(defaultFontId(locale));
  const font = FONTS.find((item) => item.id === fontId) ?? FONTS[0];
  const [ink, setInk] = useState("#1a1a1a");
  const [paperId, setPaperId] = useState<LetterPaper>("cream");
  const [paperImage, setPaperImage] = useState<string | null>(null);
  const [paperError, setPaperError] = useState(false);
  const [kind, setKind] = useState<LetterKind>("thanks");
  const [draft, setDraft] = useState<string | null>(null);
  const [rows, setRows] = useState<Recipient[]>([blankRecipient()]);
  const [fileIssues, setFileIssues] = useState<ParseIssue[]>([]);
  const [returnAddress, setReturnAddress] = useState("");
  const [cursor, setCursor] = useState(0);
  const [job, setJob] = useState<"letters" | "envelopes" | null>(null);
  const [exportError, setExportError] = useState(false);
  const [importError, setImportError] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const exportRef = useRef<HTMLDivElement>(null);

  const live = useMemo(() => recipientsFromRows(rows), [rows]);
  const recipients = live.recipients;
  const issues = fileIssues.length ? fileIssues : live.issues;
  const index = recipients.length === 0 ? 0 : Math.min(cursor, recipients.length - 1);
  const current = recipients[index];
  const sender = fromLine(returnAddress);
  const body = draft ?? t(`body.${kind}`);
  const background = letterPaperBackground(paperId);
  const pagesFor = (person: Recipient) => paginateLetter(letterBody(person, body, sender));
  const fontChoices = fontOrder(locale).flatMap((id) => {
    const item = FONTS.find((fontItem) => fontItem.id === id);
    return item ? [item] : [];
  });

  const setCell = (rowIndex: number, key: (typeof COLS)[number], value: string) => {
    setRows((currentRows) => currentRows.map((row, i) => (i === rowIndex ? { ...row, [key]: value } : row)));
    setFileIssues([]);
    setCursor(0);
  };

  const onImport = async (file: File) => {
    try {
      const lower = file.name.toLowerCase();
      const text =
        lower.endsWith(".csv") || file.type.includes("csv")
          ? await file.text()
          : lower.endsWith(".xlsx")
            ? tableToCsv(await readXlsxRows(await file.arrayBuffer()))
            : null;
      if (text === null) {
        setImportError(true);
        return;
      }
      const parsed = parseRecipientCsv(text.replace(/^\uFEFF/, ""));
      if (parsed.issues.some((issue) => issue.code === "badHeader")) {
        setFileIssues(parsed.issues);
        setImportError(false);
        return;
      }
      setRows(parsed.recipients.length ? parsed.recipients : [blankRecipient()]);
      setFileIssues(parsed.issues);
      setCursor(0);
      setImportError(false);
    } catch {
      setImportError(true);
    }
  };

  const downloadTemplate = () => {
    const bytes = buildLetterTemplate();
    const raw = new ArrayBuffer(bytes.byteLength);
    new Uint8Array(raw).set(bytes);
    const blob = new Blob([raw], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "handwritten-letters-template.xlsx";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  };

  useEffect(() => {
    if (!job || !exportRef.current) return;
    let cancelled = false;
    const root = exportRef.current;
    const size = job === "letters" ? letterSize : envelopeSize;
    const family = primaryFamily(font.css);
    (async () => {
      try {
        await waitForFontFace(family);
        await document.fonts.load(`22px "${family}"`).catch(() => undefined);
        await new Promise((resolve) => setTimeout(resolve, 32));
        if (cancelled) return;
        await Promise.all(
          [...root.querySelectorAll("img")].map(
            (img) =>
              img.complete
                ? Promise.resolve()
                : new Promise<void>((resolve) => {
                    img.onload = () => resolve();
                    img.onerror = () => resolve();
                  }),
          ),
        );
        if (cancelled) return;
        const nodes = [...root.querySelectorAll<HTMLElement>("[data-sheet]")];
        if (nodes.length === 0) return;
        const orient = size.w > size.h ? "landscape" : "portrait";
        // jspdf's px unit is 96/72 until px_scaling; without it an 816px page is 15in, not US Letter.
        const pdf = new jsPDF({ unit: "px", format: [size.w, size.h], orientation: orient, hotfixes: ["px_scaling"] });
        for (let i = 0; i < nodes.length; i++) {
          const url = await withRafFallback(() => toPng(nodes[i], { pixelRatio: 2 }));
          if (cancelled) return;
          if (i > 0) pdf.addPage([size.w, size.h], orient);
          pdf.addImage(url, "PNG", 0, 0, size.w, size.h);
        }
        pdf.save(job === "letters" ? "handwritten-letters.pdf" : "handwritten-envelopes.pdf");
        setExportError(false);
      } catch {
        if (!cancelled) setExportError(true);
      } finally {
        if (!cancelled) setJob(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [job, envelopeSize, font.css, letterSize]);

  const issueText = (issue: ParseIssue) => {
    if (issue.code === "skipped") return t("skipped", { count: issue.count });
    if (issue.code === "truncated") return t("truncated", { count: issue.count });
    return t(issue.code);
  };

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,40rem)_minmax(0,1fr)]">
      <div className="flex flex-col gap-4 lg:sticky lg:top-4">
        <div className="flex flex-col gap-1.5">
          <span className="field-label">{t("kindLabel")}</span>
          <div className="flex flex-wrap gap-1.5">
            {LETTER_KINDS.map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setKind(id);
                  setDraft(null);
                }}
                className={`cursor-pointer rounded-lg border px-2.5 py-1.5 text-xs ${
                  body === t(`body.${id}`) ? "border-accent bg-accent/5 text-accent" : "border-zinc-200 bg-white text-zinc-600"
                }`}
              >
                {t(`kind.${id}`)}
              </button>
            ))}
          </div>
        </div>

        <label className="flex flex-col gap-1.5">
          <span className="field-label">{t("bodyLabel")}</span>
          <textarea
            value={body}
            onChange={(e) => setDraft(e.target.value)}
            rows={6}
            aria-label={t("bodyLabel")}
            className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm leading-relaxed"
          />
          <span className="text-xs leading-relaxed text-zinc-500">{t("bodyHint")}</span>
        </label>

        <div className="flex flex-col gap-1.5">
          <span className="flex items-center justify-between gap-2">
            <span className="field-label">{t("listLabel")}</span>
            <span className="flex flex-wrap justify-end gap-x-3 gap-y-1">
              <button type="button" onClick={downloadTemplate} className="cursor-pointer text-xs text-accent">
                {t("downloadTemplate")}
              </button>
              <button type="button" onClick={() => fileRef.current?.click()} className="cursor-pointer text-xs text-accent">
                {t("importExcel")}
              </button>
              <button
                type="button"
                onClick={() => {
                  const parsed = parseRecipientCsv(t("sampleCsv"));
                  setRows(parsed.recipients.length ? parsed.recipients : [blankRecipient()]);
                  setFileIssues([]);
                  setCursor(0);
                  setImportError(false);
                }}
                className="cursor-pointer text-xs text-accent"
              >
                {t("useSample")}
              </button>
            </span>
          </span>
          <div className="max-h-64 overflow-auto rounded-xl border border-zinc-200">
            <table className="w-full table-fixed border-collapse text-left text-xs">
              <colgroup>
                <col style={{ width: "18%" }} />
                <col style={{ width: "24%" }} />
                <col style={{ width: "16%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "14%" }} />
                <col style={{ width: "14%" }} />
                <col style={{ width: "4%" }} />
              </colgroup>
              <thead className="sticky top-0 z-10 bg-zinc-50 text-zinc-600">
                <tr>
                  {COLS.map((col) => (
                    <th key={col} scope="col" className="px-2 py-1.5 font-medium">
                      {t(`col.${col}`)}
                    </th>
                  ))}
                  <th scope="col" className="w-8">
                    <span className="sr-only">{t("removeRow")}</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rowIndex) => (
                  <tr key={rowIndex} className="border-t border-zinc-100">
                    {COLS.map((col) => (
                      <td key={col} className="p-1">
                        <input
                          value={row[col]}
                          aria-label={`${t(`col.${col}`)} ${rowIndex + 1}`}
                          onChange={(e) => setCell(rowIndex, col, e.target.value)}
                          spellCheck={false}
                          className="w-full min-w-0 rounded-md border border-zinc-200 bg-white px-1.5 py-1"
                        />
                      </td>
                    ))}
                    <td className="p-1">
                      <button
                        type="button"
                        aria-label={`${t("removeRow")} ${rowIndex + 1}`}
                        onClick={() => {
                          setRows((currentRows) =>
                            currentRows.length === 1 ? [blankRecipient()] : currentRows.filter((_, i) => i !== rowIndex),
                          );
                          setFileIssues([]);
                          setCursor(0);
                        }}
                        className="cursor-pointer px-1 text-zinc-400 hover:text-zinc-700"
                      >
                        ×
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            type="button"
            disabled={rows.length >= BULK_LETTER_CAP}
            onClick={() => setRows((currentRows) => [...currentRows, blankRecipient()])}
            className="cursor-pointer self-start text-xs text-accent disabled:opacity-40"
          >
            {t("addRow")}
          </button>
          <span className="text-xs leading-relaxed text-zinc-500">{t("listHint")}</span>
          <input
            ref={fileRef}
            type="file"
            accept=".xlsx,.csv,text/csv"
            aria-label={t("importExcel")}
            className="sr-only"
            onChange={(e) => {
              const file = e.target.files?.[0];
              e.target.value = "";
              if (file) void onImport(file);
            }}
          />
        </div>

        <label className="flex flex-col gap-1.5">
          <span className="field-label">{t("returnLabel")}</span>
          <textarea
            value={returnAddress}
            onChange={(e) => setReturnAddress(e.target.value)}
            rows={4}
            placeholder={t("returnPlaceholder")}
            className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm leading-relaxed"
          />
          <span className="text-xs leading-relaxed text-zinc-500">{t("returnHint")}</span>
        </label>

        <div className="flex flex-col gap-1.5">
          <span className="field-label">{tool("font")}</span>
          <select value={fontId} onChange={(e) => setFontId(e.target.value as FontId)} className="select-field" aria-label={tool("font")}>
            {fontChoices.map((item) => (
              <option key={item.id} value={item.id}>
                {tool(`fonts.${item.id}`)}
              </option>
            ))}
          </select>
        </div>
        <ColorSwatch label={tool("ink")} value={ink} onChange={setInk} />
        <div className="flex flex-col gap-1.5">
          <span className="field-label">{tool("paper")}</span>
          <div className="flex flex-wrap gap-1.5">
            {LETTER_PAPERS.map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => setPaperId(id)}
                className={`cursor-pointer rounded-lg border px-2.5 py-1.5 text-xs ${
                  paperId === id ? "border-accent bg-accent/5 text-accent" : "border-zinc-200 bg-white text-zinc-600"
                }`}
              >
                {id === "cream" ? t("paperCream") : tool(`papers.${id}`)}
              </button>
            ))}
          </div>
          <span className="flex flex-wrap items-center gap-2">
            <button type="button" onClick={() => imageRef.current?.click()} className="cursor-pointer text-xs text-accent">
              {tool("paperCustom.upload")}
            </button>
            {paperImage ? (
              <button
                type="button"
                onClick={() => {
                  setPaperImage(null);
                  setPaperError(false);
                }}
                className="cursor-pointer text-xs text-zinc-500"
              >
                {tool("paperCustom.removeImage")}
              </button>
            ) : null}
          </span>
          <input
            ref={imageRef}
            type="file"
            accept="image/*"
            aria-label={tool("paperCustom.upload")}
            className="sr-only"
            onChange={(e) => {
              const file = e.target.files?.[0];
              e.target.value = "";
              if (!file) return;
              void fileToPaperImage(file).then(
                (url) => {
                  setPaperImage(url);
                  setPaperError(false);
                },
                () => setPaperError(true),
              );
            }}
          />
          <span className="text-xs leading-relaxed text-zinc-500">{t("paperHint")}</span>
        </div>

        {issues.map((issue, i) => (
          <p key={i} className="text-xs leading-relaxed text-zinc-600">
            {issueText(issue)}
          </p>
        ))}
        {importError && <p className="text-xs leading-relaxed text-zinc-600">{t("importFailed")}</p>}
        {paperError && <p className="text-xs leading-relaxed text-zinc-600">{t("paperFailed")}</p>}
        {exportError && <p className="text-xs text-zinc-600">{t("exportFailed")}</p>}

        <div className="flex flex-col gap-2">
          <button
            type="button"
            disabled={!recipients.length || job !== null}
            onClick={() => setJob("letters")}
            className="btn btn-primary px-4 py-2.5 text-sm disabled:opacity-40"
          >
            {job === "letters" ? t("exporting") : t("downloadLetters")}
          </button>
          <button
            type="button"
            disabled={!recipients.length || job !== null}
            onClick={() => setJob("envelopes")}
            className="btn btn-ghost px-4 py-2.5 text-sm disabled:opacity-40"
          >
            {job === "envelopes" ? t("exporting") : t("downloadEnvelopes")}
          </button>
          <p className="text-xs leading-relaxed text-zinc-500">{t(format === "letter" ? "printHintLetter" : "printHintA4")}</p>
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-4">
        {current ? (
          <>
            <div className="flex items-center justify-between gap-3">
              <button type="button" disabled={index === 0} onClick={() => setCursor(index - 1)} className="btn btn-ghost px-3 py-1.5 text-xs disabled:opacity-40">
                {t("prev")}
              </button>
              <span className="text-xs text-zinc-500">{t("recipientN", { n: index + 1, total: recipients.length })}</span>
              <button
                type="button"
                disabled={index >= recipients.length - 1}
                onClick={() => setCursor(index + 1)}
                className="btn btn-ghost px-3 py-1.5 text-xs disabled:opacity-40"
              >
                {t("next")}
              </button>
            </div>
            {pagesFor(current).map((page, i) => (
              <Scaled key={i} w={letterSize.w} h={letterSize.h}>
                <LetterFace
                  text={page}
                  seed={recipientSeed(current.name)}
                  fontCss={font.css}
                  ink={ink}
                  background={background}
                  image={paperImage}
                  w={letterSize.w}
                  h={letterSize.h}
                />
              </Scaled>
            ))}
            <Scaled w={envelopeSize.w} h={envelopeSize.h}>
              <EnvelopeFace
                back={returnLines(returnAddress)}
                to={recipientLines(current)}
                seed={recipientSeed(current.name)}
                fontCss={font.css}
                ink={ink}
                w={envelopeSize.w}
                h={envelopeSize.h}
              />
            </Scaled>
          </>
        ) : (
          <div className="rounded-xl border border-dashed border-zinc-300 px-6 py-16 text-center text-sm text-zinc-500">{t("previewEmpty")}</div>
        )}
      </div>

      {job && (
        <div ref={exportRef} aria-hidden style={{ position: "absolute", left: -12000, top: 0 }}>
          {job === "letters"
            ? recipients.flatMap((person, personIndex) =>
                pagesFor(person).map((page, i) => (
                  <LetterFace
                    key={`${personIndex}-${i}`}
                    capture
                    text={page}
                    seed={recipientSeed(person.name)}
                    fontCss={font.css}
                    ink={ink}
                    background={background}
                    image={paperImage}
                    w={letterSize.w}
                    h={letterSize.h}
                  />
                )),
              )
            : recipients.map((person, personIndex) => (
                <EnvelopeFace
                  key={personIndex}
                  capture
                  back={returnLines(returnAddress)}
                  to={recipientLines(person)}
                  seed={recipientSeed(person.name)}
                  fontCss={font.css}
                  ink={ink}
                  w={envelopeSize.w}
                  h={envelopeSize.h}
                />
              ))}
        </div>
      )}
    </div>
  );
}
