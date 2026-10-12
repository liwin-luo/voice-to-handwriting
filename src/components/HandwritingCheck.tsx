"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { useLocale, useTranslations } from "next-intl";
import { toPng } from "html-to-image";
import { Link } from "@/i18n/navigation";
import {
  canShareCard,
  causeScore,
  DAILY_LIMIT,
  weakestCause,
  type CauseKey,
  type CheckResult,
  type Score,
  type ShareableCheck,
} from "@/lib/handwritingCheck";

const CAUSES: CauseKey[] = ["size", "baseline", "spacing", "slant"];
const MAX_BYTES = 2 * 1024 * 1024;

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

export default function HandwritingCheck({
  title,
  intro,
  notes,
}: {
  title: string;
  intro: string;
  notes: string[];
}) {
  const t = useTranslations("handwritingCheck");
  const locale = useLocale();
  const fileRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [result, setResult] = useState<CheckResult | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [looking, setLooking] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [left, setLeft] = useState<number | null>(null);

  async function onFile(file: File | undefined) {
    if (!file) return;
    setNotice(null);
    setResult(null);
    setPhoto(null);
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
        setPhoto(null);
        setNotice(t("tooBig"));
        return;
      }
      const preview = await blobToDataUrl(blob);
      setPhoto(preview);
      const res = await fetch(`/api/handwriting-check?locale=${encodeURIComponent(locale)}`, {
        method: "POST",
        headers: { "Content-Type": "image/jpeg" },
        body: blob,
      });
      const data = (await res.json()) as (CheckResult & { remaining?: number }) | { error?: string; remaining?: number };
      if (typeof data.remaining === "number") setLeft(data.remaining);
      if (!res.ok || !("status" in data)) {
        const error = "error" in data ? data.error : "failed";
        if (error === "quota") {
          setLeft(0);
          return;
        }
        setNotice(t(error === "too_big" ? "tooBig" : error === "bad_image" ? "badImage" : "failed"));
        return;
      }
      setResult(data);
      if (data.status === "retake") setNotice(t("retake"));
      if (data.status === "unsupported_script") setNotice(t("unsupported"));
    } catch {
      setNotice(t("failed"));
    } finally {
      setLooking(false);
      if (fileRef.current) fileRef.current.value = "";
      if (cameraRef.current) cameraRef.current.value = "";
    }
  }

  async function share() {
    const node = cardRef.current;
    if (!node) return;
    setSharing(true);
    setNotice(null);
    try {
      const url = await toPng(node, {
        pixelRatio: Math.max(1, 1080 / node.offsetWidth),
        backgroundColor: "#fafaf9",
      });
      const blob = await (await fetch(url)).blob();
      const image = new File([blob], "handwriting-check.png", { type: "image/png" });
      if (navigator.canShare?.({ files: [image] })) {
        await navigator.share({ files: [image] });
      } else {
        const a = document.createElement("a");
        a.href = url;
        a.download = "handwriting-check.png";
        a.click();
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      setNotice(t("shareFailed"));
    } finally {
      setSharing(false);
    }
  }

  const card = photo && result && canShareCard(result) ? result : null;
  const weakest = card
    ? weakestCause({
        size: causeScore(card, "size"),
        baseline: causeScore(card, "baseline"),
        spacing: causeScore(card, "spacing"),
        slant: causeScore(card, "slant"),
      })
    : null;

  useEffect(() => {
    let cancel = false;
    fetch(`/api/handwriting-check?locale=${encodeURIComponent(locale)}`)
      .then((res) => res.json())
      .then((data: { remaining?: unknown }) => {
        if (!cancel && typeof data.remaining === "number") setLeft(data.remaining);
      })
      .catch(() => {});
    return () => {
      cancel = true;
    };
  }, [locale]);

  useEffect(() => {
    if (!card) return;
    cardRef.current?.scrollIntoView({ block: "start" });
  }, [card]);

  function reset() {
    setPhoto(null);
    setResult(null);
    setNotice(null);
  }

  if (card) {
    return (
      <div className="mx-auto max-w-xl scroll-mt-8">
        <p aria-live="polite" className="sr-only">
          {t("share")}
        </p>
        <div className="mx-auto max-w-sm">
          <ShareCard cardRef={cardRef} photo={photo!} result={card} weakest={weakest} />
          <div className="mt-4 flex flex-col gap-3">
            <button
              type="button"
              className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white disabled:opacity-50"
              disabled={sharing}
              onClick={share}
            >
              {t("share")}
            </button>
            <button
              type="button"
              className="rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-800"
              onClick={reset}
            >
              {t("again")}
            </button>
          </div>
          <p className="mt-4 text-sm text-zinc-600">{t("daily", { count: DAILY_LIMIT })}</p>
          <LimitLine left={left} />
          {notice ? <p className="mt-4 text-sm text-zinc-800">{notice}</p> : null}
        </div>
        {card.summary ? (
          <section className="mt-8">
            <h2 className="text-sm font-medium text-zinc-950">{t("summaryTitle")}</h2>
            <p className="mt-2 text-sm leading-7 text-zinc-800">{card.summary}</p>
          </section>
        ) : null}
        <div className="mt-8">
          <ScoreRow label={t("legibility")} score={card.legibility} anchor={t(`anchors.legibility.${card.legibility.value}`)} emphasize />
          <ul className="mt-4 flex flex-col gap-3">
            {CAUSES.map((key) => {
              const score = causeScore(card, key);
              return (
                <li key={key}>
                  <ScoreRow
                    label={t(key)}
                    score={score}
                    anchor={score ? t(`anchors.${key}.${score.value}`) : null}
                    empty={card.status === "too_short" ? t("unstable") : t("blank")}
                    emphasize={weakest === key}
                  />
                </li>
              );
            })}
          </ul>
          {weakest ? (
            <p className="mt-5 text-sm text-zinc-800">
              {t("next", { focus: t(weakest) })}{" "}
              <Link href="/blog/how-to-improve-handwriting-adults" className="text-accent underline">
                {t("nextLink")}
              </Link>
            </p>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl">
      <header className="mb-7">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 md:text-4xl">{title}</h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-600">{intro}</p>
        <ul className="mt-4 flex flex-col gap-1 text-sm leading-relaxed text-zinc-600">
          {notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
          <li>{t("daily", { count: DAILY_LIMIT })}</li>
        </ul>
        <LimitLine left={left} />
      </header>
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
      {looking ? (
        <div>
          {photo ? (
            // 等待时给用户看刚选的照片,不能走 next/image
            // eslint-disable-next-line @next/next/no-img-element
            <img src={photo} alt={t("photoAlt")} className="mx-auto max-h-72 max-w-full rounded-lg border border-zinc-200 object-contain" />
          ) : null}
          <p className="mt-4 text-sm font-medium text-zinc-950">{t("looking")}</p>
          <p className="mt-1 text-sm text-zinc-600">{t("lookingHint")}</p>
        </div>
      ) : (
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
      )}
      {notice ? <p className="mt-6 text-sm text-zinc-800">{notice}</p> : null}
    </div>
  );
}

function ShareCard({
  cardRef,
  photo,
  result,
  weakest,
}: {
  cardRef: RefObject<HTMLDivElement | null>;
  photo: string;
  result: ShareableCheck;
  weakest: CauseKey | null;
}) {
  const t = useTranslations("handwritingCheck");
  return (
    <div
      ref={cardRef}
      className="grid w-full overflow-hidden rounded-2xl bg-[#15317e] p-3 text-[#fafaf9] shadow-lg"
      style={{ aspectRatio: "4 / 5", gridTemplateRows: "1fr auto" }}
      aria-label={t("cardLabel")}
    >
      <div className="flex min-h-0 items-center justify-center rounded-xl bg-[#f7f4ee] p-3">
        {/* 分享图要用原始像素,不能走 next/image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo} alt={t("photoAlt")} className="max-h-full max-w-full bg-white object-contain" />
      </div>
      <div className="flex flex-col gap-3 px-2 pb-1 pt-3">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-[11px] tracking-[0.16em] text-[#fafaf9]/70">{t("legibility")}</p>
            <p className="text-6xl font-semibold leading-none tabular-nums">{result.legibility.value}</p>
          </div>
          <p className="max-w-[9rem] text-right text-xs leading-snug text-[#fafaf9]/85">{t(`anchors.legibility.${result.legibility.value}`)}</p>
        </div>
        <div className="grid grid-cols-4 gap-1.5 text-center">
          {CAUSES.map((key) => {
            const score = causeScore(result, key);
            const marked = weakest === key;
            return (
              <div key={key} className={marked ? "rounded-md bg-[#fafaf9] px-1 py-1.5 text-[#15317e]" : "rounded-md px-1 py-1.5 text-[#fafaf9]/75"}>
                <p className="text-lg font-semibold tabular-nums">{score ? score.value : t("blank")}</p>
                <p className="text-[11px] leading-tight">{t(key)}</p>
              </div>
            );
          })}
        </div>
        <div className="flex items-end justify-between gap-3 border-t border-[#fafaf9]/20 pt-2 text-[11px] leading-tight text-[#fafaf9]/75">
          <p>{weakest ? t("next", { focus: t(weakest) }) : null}</p>
          <p className="shrink-0">{t("cardMark")}</p>
        </div>
      </div>
    </div>
  );
}

function LimitLine({ left }: { left: number | null }) {
  const t = useTranslations("handwritingCheck");
  if (left === null) return null;
  if (left === 0) return <p className="mt-3 text-sm text-zinc-800">{t("quota")}</p>;
  return <p className="mt-3 text-sm text-zinc-600">{t("left", { count: left })}</p>;
}

function ScoreRow({
  label,
  score,
  anchor,
  empty,
  emphasize,
}: {
  label: string;
  score: Score | null;
  anchor: string | null;
  empty?: string;
  emphasize?: boolean;
}) {
  return (
    <div className={emphasize ? "border-l-2 border-accent pl-3" : ""}>
      <p className="text-sm text-zinc-800">
        <span className="font-medium text-zinc-950">{label}</span>
        <span className="ml-2 tabular-nums text-accent">{score ? score.value : empty}</span>
      </p>
      {anchor ? <p className="text-sm text-zinc-500">{anchor}</p> : null}
      {score ? <p className="text-sm leading-relaxed text-zinc-700">{score.evidence}</p> : null}
    </div>
  );
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}
