"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import { charJitter } from "@/engine/jitter";
import { tokenize } from "@/engine/tokens";
import {
  LETTER_KINDS,
  letterBody,
  paginateLetter,
  parseRecipientCsv,
  tableToCsv,
  recipientLines,
  recipientSeed,
  returnLines,
  fromLine,
  type LetterKind,
  type ParseIssue,
  type Recipient,
} from "@/engine/bulkLetters";
import { waitForFontFace } from "@/lib/fontFace";
import { defaultFontId, defaultPageFormat, PAGE_FORMATS } from "@/lib/localeDefaults";
import { FONTS } from "@/stores/useEditorStore";
import { buildLetterTemplate, readXlsxRows } from "@/engine/xlsxTable";

const INK = "#1a1a1a";
const RULE = 40;
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

function JitterText({
  text,
  seed,
  fontCss,
  fontSize,
  intensity,
}: {
  text: string;
  seed: number;
  fontCss: string;
  fontSize: number;
  intensity: number;
}) {
  const tokens = useMemo(() => tokenize(text), [text]);
  return (
    <div style={{ whiteSpace: "pre-wrap", wordBreak: "break-word", fontFamily: fontCss, fontSize, color: INK, lineHeight: `${RULE}px` }}>
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
  w,
  h,
  capture,
}: {
  text: string;
  seed: number;
  fontCss: string;
  w: number;
  h: number;
  capture?: boolean;
}) {
  return (
    <div
      data-sheet={capture ? "letter" : undefined}
      className={capture ? undefined : "shadow-paper relative overflow-hidden rounded-xl"}
      style={{ width: w, height: h, background: LETTER_BG, position: "relative", overflow: "hidden" }}
    >
      <div style={{ padding: "56px 64px" }}>
        <JitterText text={text} seed={seed} fontCss={fontCss} fontSize={22} intensity={0.5} />
      </div>
    </div>
  );
}

function EnvelopeFace({
  back,
  to,
  seed,
  fontCss,
  w,
  h,
  capture,
}: {
  back: string[];
  to: string[];
  seed: number;
  fontCss: string;
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
      <div style={{ position: "absolute", top: 28, left: 36, maxWidth: "46%" }}>
        <JitterText text={back.join("\n")} seed={seed} fontCss={fontCss} fontSize={16} intensity={0.28} />
      </div>
      <div style={{ position: "absolute", top: "42%", left: "42%", maxWidth: "52%" }}>
        <JitterText text={to.join("\n")} seed={seed + 1} fontCss={fontCss} fontSize={24} intensity={0.28} />
      </div>
    </div>
  );
}

export default function BulkLetterMailer() {
  const t = useTranslations("bulkLetters");
  const locale = useLocale();
  const format = defaultPageFormat(locale);
  const letterSize = PAGE_FORMATS[format];
  const envelopeSize = ENVELOPE[format];
  const font = FONTS.find((item) => item.id === defaultFontId(locale)) ?? FONTS[0];
  const [kind, setKind] = useState<LetterKind>("thanks");
  const [draft, setDraft] = useState<string | null>(null);
  const [csv, setCsv] = useState("");
  const [returnAddress, setReturnAddress] = useState("");
  const [cursor, setCursor] = useState(0);
  const [job, setJob] = useState<"letters" | "envelopes" | null>(null);
  const [exportError, setExportError] = useState(false);
  const [importError, setImportError] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const exportRef = useRef<HTMLDivElement>(null);

  const parsed = useMemo(() => parseRecipientCsv(csv), [csv]);
  const recipients = parsed.recipients;
  const index = recipients.length === 0 ? 0 : Math.min(cursor, recipients.length - 1);
  const current = recipients[index];
  const sender = fromLine(returnAddress);
  const body = draft ?? t(`body.${kind}`);
  const pagesFor = (person: Recipient) => paginateLetter(letterBody(person, body, sender));

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
      setCsv(text.replace(/^\uFEFF/, ""));
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
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
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
              <button type="button" onClick={() => setCsv(t("sampleCsv"))} className="cursor-pointer text-xs text-accent">
                {t("useSample")}
              </button>
            </span>
          </span>
          <textarea
            value={csv}
            onChange={(e) => {
              setCsv(e.target.value);
              setCursor(0);
            }}
            rows={8}
            aria-label={t("listLabel")}
            placeholder={t("listPlaceholder")}
            spellCheck={false}
            className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 font-mono text-xs leading-relaxed"
          />
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

        {parsed.issues.map((issue, i) => (
          <p key={i} className="text-xs leading-relaxed text-zinc-600">
            {issueText(issue)}
          </p>
        ))}
        {importError && <p className="text-xs leading-relaxed text-zinc-600">{t("importFailed")}</p>}
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
                <LetterFace text={page} seed={recipientSeed(current.name)} fontCss={font.css} w={letterSize.w} h={letterSize.h} />
              </Scaled>
            ))}
            <Scaled w={envelopeSize.w} h={envelopeSize.h}>
              <EnvelopeFace
                back={returnLines(returnAddress)}
                to={recipientLines(current)}
                seed={recipientSeed(current.name)}
                fontCss={font.css}
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
                  w={envelopeSize.w}
                  h={envelopeSize.h}
                />
              ))}
        </div>
      )}
    </div>
  );
}
