"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { calendarDay, recordUsage, usageLeft } from "@/lib/handwritingCheck";
import { countTranscript, hasMarks, LOCAL_USAGE_KEY, type CountResult, type Counts } from "@/lib/handwritingCount";

const MAX_BYTES = 2 * 1024 * 1024;

/** ponytail: same canvas squeeze as HandwritingCheck (long edge 1600, jpeg 0.85). */
async function fileToJpeg(file: File): Promise<Blob> {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const el = new Image();
    el.onload = () => resolve(el);
    el.onerror = () => reject(new Error("image"));
    el.src = dataUrl;
  });
  const ratio = Math.min(1, 1600 / Math.max(img.naturalWidth, img.naturalHeight));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(img.naturalWidth * ratio));
  canvas.height = Math.max(1, Math.round(img.naturalHeight * ratio));
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.85));
  if (!blob) throw new Error("blob");
  return blob;
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

type HeroKey = "cjk" | "words" | "digits";

function heroes(counts: Counts): Array<{ key: HeroKey; value: number }> {
  const hasCjk = counts.cjk > 0;
  const hasWords = counts.words > 0;
  if (hasCjk && hasWords) return [
    { key: "cjk", value: counts.cjk },
    { key: "words", value: counts.words },
  ];
  if (hasCjk) return [{ key: "cjk", value: counts.cjk }];
  if (hasWords) return [{ key: "words", value: counts.words }];
  if (counts.digits > 0) return [{ key: "digits", value: counts.digits }];
  return [];
}

export default function HandwritingCount() {
  const t = useTranslations("handwritingCount");
  const locale = useLocale();
  const fileRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [truncated, setTruncated] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [looking, setLooking] = useState(false);
  const [copied, setCopied] = useState(false);
  const [left, setLeft] = useState<number | null>(null);

  const counts = transcript === null ? null : countTranscript(transcript);
  const counted = transcript !== null && counts !== null;

  useEffect(() => {
    let next: number;
    try {
      next = usageLeft(localStorage.getItem(LOCAL_USAGE_KEY), calendarDay());
    } catch {
      next = usageLeft(null, calendarDay());
    }
    // 额度在 localStorage。挂载后再读,服务器渲染保持 null,避免水合不一致。
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLeft(next);
  }, []);

  function rememberTry() {
    try {
      const day = calendarDay();
      const next = recordUsage(localStorage.getItem(LOCAL_USAGE_KEY), day);
      localStorage.setItem(LOCAL_USAGE_KEY, next);
      setLeft(usageLeft(next, day));
    } catch {
      // 隐私模式写不进时,这次照常读,不挡用户。
    }
  }

  function reset() {
    setPhoto(null);
    setTranscript(null);
    setNote("");
    setTruncated(false);
    setNotice(null);
    setCopied(false);
  }

  async function onFile(file: File | undefined) {
    if (!file || left === 0) return;
    setNotice(null);
    setTranscript(null);
    setNote("");
    setTruncated(false);
    setPhoto(null);
    setCopied(false);
    setLooking(true);
    try {
      let blob: Blob;
      try {
        blob = await fileToJpeg(file);
      } catch {
        setNotice(t("badImage"));
        return;
      }
      if (blob.size > MAX_BYTES) {
        setNotice(t("tooBig"));
        return;
      }
      const preview = await blobToDataUrl(blob);
      setPhoto(preview);
      const res = await fetch(`/api/handwriting-count?locale=${encodeURIComponent(locale)}`, {
        method: "POST",
        headers: { "Content-Type": "image/jpeg" },
        body: blob,
      });
      const data = (await res.json()) as CountResult | { error?: string };
      const spent = res.ok || ("error" in data && data.error === "failed");
      if (spent) rememberTry();
      if (!res.ok || !("status" in data)) {
        const error = "error" in data ? data.error : "failed";
        setNotice(t(error === "too_big" ? "tooBig" : error === "bad_image" ? "badImage" : "failed"));
        return;
      }
      if (data.status === "counted") {
        setTranscript(data.transcript);
        setNote(data.note);
        setTruncated(data.truncated);
        return;
      }
      setNotice(t(data.status === "retake" ? "retake" : "empty"));
    } catch {
      setNotice(t("failed"));
    } finally {
      setLooking(false);
      if (fileRef.current) fileRef.current.value = "";
      if (cameraRef.current) cameraRef.current.value = "";
    }
  }

  async function copyText() {
    if (transcript === null) return;
    try {
      await navigator.clipboard.writeText(transcript);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setNotice(t("copyFailed"));
    }
  }

  return (
    <div>
      <p aria-live="polite" className="sr-only">
        {looking ? t("looking") : notice}
      </p>
      <input ref={fileRef} type="file" accept="image/*" className="sr-only" onChange={(e) => onFile(e.target.files?.[0])} />
      <input
        ref={cameraRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="sr-only"
        onChange={(e) => onFile(e.target.files?.[0])}
      />
      {counted && counts ? (
        <Counted
          photo={photo}
          transcript={transcript}
          counts={counts}
          note={note}
          truncated={truncated}
          copied={copied}
          left={left}
          notice={notice}
          onTranscript={setTranscript}
          onCopy={copyText}
          onReset={reset}
        />
      ) : (
        <div className="max-w-3xl rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6" aria-busy={looking}>
          {looking ? (
            <Looking photo={photo} />
          ) : (
            <>
              {photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={photo} alt={t("photoAlt")} className="mb-4 max-h-72 max-w-full rounded-xl border border-zinc-200 object-contain" />
              ) : null}
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white disabled:opacity-50"
                  disabled={left === 0}
                  onClick={() => fileRef.current?.click()}
                >
                  {t("upload")}
                </button>
                <button
                  type="button"
                  className="rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-800 disabled:opacity-50"
                  disabled={left === 0}
                  onClick={() => cameraRef.current?.click()}
                >
                  {t("camera")}
                </button>
              </div>
            </>
          )}
          {notice ? <p className="mt-4 text-sm text-zinc-800">{notice}</p> : null}
          <LimitLine left={left} />
        </div>
      )}
    </div>
  );
}

function Counted({
  photo,
  transcript,
  counts,
  note,
  truncated,
  copied,
  left,
  notice,
  onTranscript,
  onCopy,
  onReset,
}: {
  photo: string | null;
  transcript: string;
  counts: Counts;
  note: string;
  truncated: boolean;
  copied: boolean;
  left: number | null;
  notice: string | null;
  onTranscript: (value: string) => void;
  onCopy: () => void;
  onReset: () => void;
}) {
  const t = useTranslations("handwritingCount");
  const big = heroes(counts);
  const heroKeys = new Set(big.map((item) => item.key));
  const lines: Array<{ key: "latinLetters" | "otherLetters" | "digits" | "punctuation" | "other"; value: number }> = [];
  if (counts.latinLetters > 0) lines.push({ key: "latinLetters", value: counts.latinLetters });
  if (counts.otherLetters > 0) lines.push({ key: "otherLetters", value: counts.otherLetters });
  if (counts.digits > 0 && !heroKeys.has("digits")) lines.push({ key: "digits", value: counts.digits });
  if (counts.punctuation > 0) lines.push({ key: "punctuation", value: counts.punctuation });
  if (counts.other > 0) lines.push({ key: "other", value: counts.other });

  return (
    <div>
      {big.length > 0 ? (
        <div className="flex flex-wrap gap-8">
          {big.map((item) => (
            <div key={item.key}>
              <p className="text-5xl font-semibold leading-none tabular-nums text-zinc-950">{item.value}</p>
              <p className="mt-2 text-sm text-zinc-500">{t(item.key)}</p>
            </div>
          ))}
        </div>
      ) : hasMarks(counts) ? null : (
        <p className="text-sm text-zinc-800">{t("none")}</p>
      )}
      {lines.length > 0 || counts.illegible > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm text-zinc-700">
          {lines.map((line) => (
            <li key={line.key}>
              {t(line.key)} <span className="tabular-nums">{line.value}</span>
            </li>
          ))}
          {counts.illegible > 0 ? <li>{t("illegible", { count: counts.illegible })}</li> : null}
        </ul>
      ) : null}
      {note ? <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-700">{note}</p> : null}
      {truncated ? <p className="mt-2 text-sm text-zinc-800">{t("truncated")}</p> : null}
      <div className="mt-6 grid items-start gap-6 lg:grid-cols-2">
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo} alt={t("photoAlt")} className="max-h-[32rem] w-full rounded-xl border border-zinc-200 object-contain" />
        ) : (
          <div />
        )}
        <div>
          <label htmlFor="handwriting-count-text" className="text-sm font-medium text-zinc-950">
            {t("transcriptLabel")}
          </label>
          <textarea
            id="handwriting-count-text"
            value={transcript}
            onChange={(e) => onTranscript(e.target.value)}
            rows={12}
            className="mt-2 w-full resize-y rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm leading-relaxed text-zinc-950"
          />
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        <button type="button" className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white" onClick={onCopy}>
          {copied ? t("copied") : t("copy")}
        </button>
        <button
          type="button"
          className="rounded-full border border-zinc-300 bg-white px-5 py-2.5 text-sm font-medium text-zinc-800"
          onClick={onReset}
        >
          {t("again")}
        </button>
      </div>
      <LimitLine left={left} />
      {notice ? <p className="mt-4 text-sm text-zinc-800">{notice}</p> : null}
    </div>
  );
}

function Looking({ photo }: { photo: string | null }) {
  const t = useTranslations("handwritingCount");
  return (
    <div>
      <p className="flex items-center gap-3 text-sm font-medium text-zinc-950">
        <Spinner className="size-6 border-2" />
        {t("looking")}
      </p>
      <p className="mt-1 pl-9 text-sm text-zinc-600">{t("lookingHint")}</p>
      <div className="mt-4 h-1 overflow-hidden rounded-full bg-zinc-100" aria-hidden>
        <div className="wait-slide h-full w-1/4 rounded-full bg-accent" />
      </div>
      {photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={photo} alt={t("photoAlt")} className="mt-5 max-h-72 max-w-full rounded-xl border border-zinc-200 object-contain" />
      ) : (
        <div className="mt-5 flex h-40 items-center justify-center rounded-xl border border-dashed border-zinc-300">
          <Spinner className="size-10 border-[3px]" />
        </div>
      )}
    </div>
  );
}

function Spinner({ className }: { className: string }) {
  return (
    <span
      aria-hidden
      className={`inline-block shrink-0 animate-spin rounded-full border-zinc-200 border-t-accent motion-reduce:animate-none ${className}`}
    />
  );
}

function LimitLine({ left }: { left: number | null }) {
  const t = useTranslations("handwritingCount");
  if (left === null) return null;
  if (left === 0) return <p className="mt-3 text-sm text-zinc-800">{t("quota")}</p>;
  return <p className="mt-3 text-sm text-zinc-600">{t("left", { count: left })}</p>;
}
