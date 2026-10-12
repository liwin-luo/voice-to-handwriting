"use client";

import { useEffect, useId, useRef, useState, type ReactNode, type RefObject } from "react";
import { useLocale, useTranslations } from "next-intl";
import { toPng } from "html-to-image";
import { EnvelopeSimple, FacebookLogo, PinterestLogo, ShareNetwork, WhatsappLogo, XLogo } from "@phosphor-icons/react";
import { Link } from "@/i18n/navigation";
import {
  beatenPercent,
  calendarDay,
  canShareCard,
  causeScore,
  formatScore,
  anchorLevel,
  LOCAL_USAGE_KEY,
  recordUsage,
  socialIntent,
  usageLeft,
  weakestCause,
  type CauseKey,
  type CheckResult,
  type Score,
  type ShareableCheck,
  type SocialTarget,
} from "@/lib/handwritingCheck";

const CAUSES: CauseKey[] = ["size", "baseline", "spacing", "slant"];
const FRAMES = ["seal", "certificate", "paper", "plain"] as const;
type FrameId = (typeof FRAMES)[number];
/** 下载时写回克隆节点,避免 html-to-image 的 backgroundColor 盖掉框的底色。 */
const FRAME_BG: Record<FrameId, string> = {
  seal: "#15317e",
  certificate: "#fffcf7",
  paper: "#f7f1e6",
  plain: "#ffffff",
};
const FRAME_SWATCH: Record<FrameId, string> = {
  seal: "bg-[#15317e]",
  certificate: "border-2 border-[#15317e] bg-[#fffcf7]",
  paper: "border-4 border-[#e7dcc8] bg-[#f7f1e6]",
  plain: "border border-zinc-300 bg-white",
};
const MAX_BYTES = 2 * 1024 * 1024;
const SOCIAL: Array<{ id: SocialTarget; label: string; icon: ReactNode }> = [
  { id: "x", label: "X", icon: <XLogo weight="fill" className="size-5 text-zinc-900" /> },
  { id: "facebook", label: "Facebook", icon: <FacebookLogo weight="fill" className="size-5 text-[#1877F2]" /> },
  { id: "whatsapp", label: "WhatsApp", icon: <WhatsappLogo weight="fill" className="size-5 text-[#25D366]" /> },
  { id: "pinterest", label: "Pinterest", icon: <PinterestLogo weight="fill" className="size-5 text-[#E60023]" /> },
  { id: "email", label: "", icon: <EnvelopeSimple className="size-5 text-zinc-500" /> },
];

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

export default function HandwritingCheck() {
  const t = useTranslations("handwritingCheck");
  const shareText = useTranslations("share");
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
  const [frame, setFrame] = useState<FrameId>("seal");

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
      const data = (await res.json()) as CheckResult | { error?: string };
      const spent = res.ok || ("error" in data && data.error === "failed");
      if (spent) rememberTry();
      if (!res.ok || !("status" in data)) {
        const error = "error" in data ? data.error : "failed";
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

  async function renderCard() {
    const node = cardRef.current;
    if (!node) return null;
    const url = await toPng(node, {
      pixelRatio: Math.max(1, 1080 / node.offsetWidth),
      // 画布先铺页面底色,圆角外的透明像素才不会发黑。
      // style 在 backgroundColor 之后写入,把克隆节点的底色改回当前框,否则库会盖掉边框。
      backgroundColor: "#fafaf9",
      style: { backgroundColor: FRAME_BG[frame] },
    });
    const blob = await (await fetch(url)).blob();
    return { url, file: new File([blob], "handwriting-check.png", { type: "image/png" }) };
  }

  function savePng(url: string) {
    const a = document.createElement("a");
    a.href = url;
    a.download = "handwriting-check.png";
    a.click();
  }

  async function download() {
    setSharing(true);
    setNotice(null);
    try {
      const rendered = await renderCard();
      if (rendered) savePng(rendered.url);
    } catch {
      setNotice(t("shareFailed"));
    } finally {
      setSharing(false);
    }
  }

  async function shareFile() {
    setSharing(true);
    setNotice(null);
    try {
      const rendered = await renderCard();
      if (!rendered) return;
      if (navigator.canShare?.({ files: [rendered.file] })) {
        await navigator.share({ files: [rendered.file], title: caption() });
      } else {
        savePng(rendered.url);
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      setNotice(t("shareFailed"));
    } finally {
      setSharing(false);
    }
  }

  function shareSocial(target: SocialTarget) {
    const text = caption();
    const page = window.location.href;
    const href = socialIntent(target, text, page);
    if (target === "email") {
      const a = document.createElement("a");
      a.href = href;
      a.click();
      return;
    }
    window.open(href, "_blank", "noopener,noreferrer");
  }

  function caption() {
    if (!result || !canShareCard(result)) return document.title;
    const line = `${t("legibility")} ${formatScore(result.legibility.value)}`;
    const focus = weakestCause({
      size: causeScore(result, "size"),
      baseline: causeScore(result, "baseline"),
      spacing: causeScore(result, "spacing"),
      slant: causeScore(result, "slant"),
    });
    return focus ? `${line}. ${t("next", { focus: t(focus) })}` : line;
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
    try {
      setLeft(usageLeft(localStorage.getItem(LOCAL_USAGE_KEY), calendarDay()));
    } catch {
      setLeft(usageLeft(null, calendarDay()));
    }
  }, []);

  function rememberTry() {
    try {
      const day = calendarDay();
      const next = recordUsage(localStorage.getItem(LOCAL_USAGE_KEY), day);
      localStorage.setItem(LOCAL_USAGE_KEY, next);
      setLeft(usageLeft(next, day));
    } catch {
      // 隐私模式写不进时,这次照常看,不挡用户。
    }
  }

  useEffect(() => {
    if (!card) return;
    cardRef.current?.scrollIntoView({ block: "nearest" });
  }, [card]);

  function reset() {
    setPhoto(null);
    setResult(null);
    setNotice(null);
  }

  const rows: Array<{ key: "legibility" | CauseKey; score: Score | null; emphasize: boolean }> = card
    ? [
        { key: "legibility", score: card.legibility, emphasize: false },
        ...CAUSES.map((key) => ({ key, score: causeScore(card, key), emphasize: weakest === key })),
      ]
    : [];

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
      {card ? (
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-stretch lg:gap-8">
          <div className="flex min-w-0 flex-col lg:h-full">
            <ShareCard cardRef={cardRef} frame={frame} photo={photo!} result={card} weakest={weakest} />
            <div role="radiogroup" aria-label={t("frameLabel")} className="mt-3 grid shrink-0 grid-cols-4 gap-1.5">
              {FRAMES.map((id) => {
                const on = frame === id;
                return (
                  <button
                    key={id}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => setFrame(id)}
                    className={
                      on
                        ? "rounded-xl border border-accent bg-white px-1 py-1.5 text-zinc-950"
                        : "rounded-xl border border-transparent px-1 py-1.5 text-zinc-600 hover:bg-white"
                    }
                  >
                    <span aria-hidden className={`mx-auto block h-6 rounded-md ${FRAME_SWATCH[id]}`} />
                    <span className="mt-1 block text-center text-[11px] leading-tight">{t(`frames.${id}`)}</span>
                  </button>
                );
              })}
            </div>
            <div className="mt-4 flex shrink-0 flex-wrap gap-3">
              <button
                type="button"
                className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white disabled:opacity-50"
                disabled={sharing}
                onClick={download}
              >
                {t("download")}
              </button>
              <button
                type="button"
                className="rounded-full border border-zinc-300 bg-white px-5 py-2.5 text-sm font-medium text-zinc-800"
                onClick={reset}
              >
                {t("again")}
              </button>
            </div>
            <div className="mt-3 flex w-fit max-w-full shrink-0 flex-wrap items-center rounded-2xl border border-zinc-200 bg-white py-1 pr-1.5 pl-4">
              <span className="mr-1 text-sm text-zinc-500">{shareText("share")}</span>
              <div role="group" aria-label={shareText("share")} className="flex flex-wrap items-center">
                {SOCIAL.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    title={item.id === "email" ? shareText("email") : item.label}
                    aria-label={item.id === "email" ? shareText("email") : item.label}
                    className="flex size-9 items-center justify-center rounded-full hover:bg-zinc-100"
                    onClick={() => shareSocial(item.id)}
                  >
                    {item.icon}
                  </button>
                ))}
                <span aria-hidden className="mx-1 h-4 w-px bg-zinc-200" />
                <button
                  type="button"
                  title={shareText("shareSystem")}
                  aria-label={shareText("shareSystem")}
                  className="flex size-9 items-center justify-center rounded-full hover:bg-zinc-100 disabled:opacity-50"
                  disabled={sharing}
                  onClick={shareFile}
                >
                  <ShareNetwork className="size-5 text-zinc-500" />
                </button>
              </div>
            </div>
            <LimitLine left={left} />
            {notice ? <p className="mt-4 text-sm text-zinc-800">{notice}</p> : null}
          </div>
          <section className="select-text rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6 lg:h-full">
            <div className="mb-5 flex items-end justify-between gap-4 rounded-xl bg-[#15317e]/8 px-4 py-4">
              <div>
                <p className="text-sm font-medium text-zinc-500">{t("legibility")}</p>
                <p className="mt-1 text-5xl font-semibold leading-none tabular-nums text-zinc-950">{formatScore(card.legibility.value)}</p>
              </div>
              <p className="shrink-0 text-right text-2xl font-semibold leading-tight text-accent">{t("ahead", { percent: beatenPercent(card.legibility.value) })}</p>
            </div>
            {card.summary ? (
              <div className="border-b border-zinc-100 pb-5">
                <h2 className="text-base font-semibold text-zinc-900">{t("summaryTitle")}</h2>
                <p className="mt-2 text-sm leading-7 text-zinc-700">{card.summary}</p>
              </div>
            ) : null}
            <ul>
              {rows.map((row) => (
                <ScoreRow
                  key={row.key}
                  label={t(row.key)}
                  score={row.score}
                  figure={row.key === "legibility" && row.score ? formatScore(row.score.value) : undefined}
                  anchor={
                    row.score
                      ? t(`anchors.${row.key}.${row.key === "legibility" ? anchorLevel(row.score.value) : row.score.value}`)
                      : null
                  }
                  empty={card.status === "too_short" ? t("unstable") : t("blank")}
                  emphasize={row.emphasize}
                />
              ))}
            </ul>
            {weakest ? (
              <p className="mt-2 text-sm text-zinc-800">
                {t("next", { focus: t(weakest) })}{" "}
                <Link href="/blog/how-to-improve-handwriting-adults" className="text-accent underline underline-offset-2">
                  {t("nextLink")}
                </Link>
              </p>
            ) : null}
          </section>
        </div>
      ) : (
        <div className="max-w-3xl rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6" aria-busy={looking}>
          {looking ? (
            <Looking photo={photo} />
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
          {notice ? <p className="mt-4 text-sm text-zinc-800">{notice}</p> : null}
          <LimitLine left={left} />
        </div>
      )}
    </div>
  );
}

function Looking({ photo }: { photo: string | null }) {
  const t = useTranslations("handwritingCheck");
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
        <div className="mt-5">
          {/* 等待时给用户看刚选的照片,不能走 next/image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photo} alt={t("photoAlt")} className="max-h-72 max-w-full rounded-xl border border-zinc-200 object-contain" />
        </div>
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

const CARD_SHELL = "w-full overflow-hidden aspect-[4/5] lg:aspect-auto lg:h-auto lg:min-h-[28rem] lg:flex-1";

function ShareCard({
  cardRef,
  frame,
  photo,
  result,
  weakest,
}: {
  cardRef: RefObject<HTMLDivElement | null>;
  frame: FrameId;
  photo: string;
  result: ShareableCheck;
  weakest: CauseKey | null;
}) {
  const t = useTranslations("handwritingCheck");
  const score = formatScore(result.legibility.value);
  const stamp = frame !== "plain";
  const photoWell = (
    <PhotoWell photo={photo} alt={t("photoAlt")} score={score} stamp={stamp} bare={frame === "certificate"} />
  );
  const scores = <ScorePanel result={result} weakest={weakest} tone={frame === "seal" ? "light" : "dark"} />;

  if (frame === "certificate") {
    return (
      <div
        ref={cardRef}
        className={`${CARD_SHELL} rounded-sm bg-[#fffcf7] p-2 shadow-lg`}
        style={{ border: "3px solid #15317e" }}
        aria-label={t("cardLabel")}
      >
        <div className="grid h-full min-h-0 border border-[#15317e] p-3 text-[#1c1917]" style={{ gridTemplateRows: "1fr auto" }}>
          {photoWell}
          {scores}
        </div>
      </div>
    );
  }

  const face =
    frame === "seal"
      ? "grid rounded-2xl bg-[#15317e] p-3 text-[#fafaf9] shadow-lg"
      : frame === "paper"
        ? "grid rounded-2xl border-8 border-[#e7dcc8] bg-[#f7f1e6] p-3 text-[#1c1917]"
        : "grid rounded-2xl border border-zinc-300 bg-white p-3 text-zinc-950";

  return (
    <div ref={cardRef} className={`${CARD_SHELL} ${face}`} style={{ gridTemplateRows: "1fr auto" }} aria-label={t("cardLabel")}>
      <div className={frame === "paper" ? "h-full min-h-0 rounded-lg bg-white" : "h-full min-h-0 rounded-xl bg-[#f7f4ee]"}>{photoWell}</div>
      {scores}
    </div>
  );
}

function PhotoWell({ photo, alt, score, stamp, bare }: { photo: string; alt: string; score: string; stamp: boolean; bare?: boolean }) {
  return (
    <div className={`relative flex h-full min-h-0 items-center justify-center ${bare ? "" : "p-3"}`}>
      {/* 分享图要用原始像素,不能走 next/image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={photo} alt={alt} className="max-h-full max-w-full bg-white object-contain" />
      {stamp ? <ScoreSeal value={score} /> : null}
    </div>
  );
}

function ScorePanel({
  result,
  weakest,
  tone,
}: {
  result: ShareableCheck;
  weakest: CauseKey | null;
  tone: "light" | "dark";
}) {
  const t = useTranslations("handwritingCheck");
  const light = tone === "light";
  return (
    <div className="flex flex-col gap-3 px-2 pb-1 pt-3">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className={light ? "text-[11px] tracking-[0.16em] text-[#fafaf9]/70" : "text-[11px] tracking-[0.16em] text-zinc-500"}>{t("legibility")}</p>
          <p className={light ? "text-5xl font-semibold leading-none tabular-nums" : "text-5xl font-semibold leading-none tabular-nums text-zinc-950"}>{formatScore(result.legibility.value)}</p>
        </div>
        <p className={light ? "max-w-[9rem] text-right text-xs leading-snug text-[#fafaf9]/85" : "max-w-[9rem] text-right text-xs leading-snug text-zinc-600"}>
          {t(`anchors.legibility.${anchorLevel(result.legibility.value)}`)}
        </p>
      </div>
      <div className="grid grid-cols-4 gap-1.5 text-center">
        {CAUSES.map((key) => {
          const score = causeScore(result, key);
          const marked = weakest === key;
          const cell = marked
            ? light
              ? "rounded-md bg-[#fafaf9] px-1 py-1.5 text-[#15317e]"
              : "rounded-md bg-[#15317e] px-1 py-1.5 text-white"
            : light
              ? "rounded-md px-1 py-1.5 text-[#fafaf9]/75"
              : "rounded-md px-1 py-1.5 text-zinc-600";
          return (
            <div key={key} className={cell}>
              <p className="text-lg font-semibold tabular-nums">{score ? score.value : t("blank")}</p>
              <p className="text-[11px] leading-tight">{t(key)}</p>
            </div>
          );
        })}
      </div>
      <div className={light ? "flex items-end justify-between gap-3 border-t border-[#fafaf9]/20 pt-2 text-[11px] leading-tight text-[#fafaf9]/75" : "flex items-end justify-between gap-3 border-t border-zinc-200 pt-2 text-[11px] leading-tight text-zinc-500"}>
        <p>{weakest ? t("next", { focus: t(weakest) }) : null}</p>
        <p className="shrink-0">{t("cardMark")}</p>
      </div>
    </div>
  );
}

function ScoreSeal({ value }: { value: string }) {
  const uid = useId().replace(/:/g, "");
  const top = `${uid}-top`;
  const bottom = `${uid}-bottom`;
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 200"
      className="pointer-events-none absolute right-1 bottom-1 w-32 -rotate-[16deg] sm:w-40"
    >
      <defs>
        <path id={top} d="M36,108 A64,64 0 0 1 164,108" />
        <path id={bottom} d="M36,108 A64,64 0 0 0 164,108" />
      </defs>
      <circle cx="100" cy="100" r="96" fill="rgba(143,42,42,0.08)" stroke="#8f2a2a" strokeWidth="3.5" />
      <circle cx="100" cy="100" r="86" fill="none" stroke="#8f2a2a" strokeWidth="1.4" />
      <text fill="#8f2a2a" fontFamily="Georgia, 'Times New Roman', serif" fontSize="15" fontWeight="700" letterSpacing="2.4">
        <textPath href={`#${top}`} startOffset="50%" textAnchor="middle">
          CERTIFIED
        </textPath>
      </text>
      <text fill="#8f2a2a" fontFamily="Georgia, 'Times New Roman', serif" fontSize="11" fontWeight="700" letterSpacing="1.6">
        <textPath href={`#${bottom}`} startOffset="50%" textAnchor="middle">
          HANDWRITING
        </textPath>
      </text>
      <text
        x="100"
        y="112"
        textAnchor="middle"
        fill="#8f2a2a"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="40"
        fontWeight="700"
      >
        {value}
      </text>
      <circle cx="18" cy="100" r="2.2" fill="#8f2a2a" />
      <circle cx="182" cy="100" r="2.2" fill="#8f2a2a" />
    </svg>
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
  figure,
  anchor,
  empty,
  emphasize,
}: {
  label: string;
  score: Score | null;
  figure?: string;
  anchor: string | null;
  empty?: string;
  emphasize?: boolean;
}) {
  const mark = figure ?? (score ? String(score.value) : empty);
  return (
    <li className="flex gap-4 border-b border-zinc-100 py-4 last:border-b-0">
      <span
        className={
          emphasize
            ? "flex h-11 min-w-11 shrink-0 items-center justify-center rounded-xl bg-accent px-2 text-lg font-semibold tabular-nums text-white"
            : score
              ? "flex h-11 min-w-11 shrink-0 items-center justify-center rounded-xl bg-zinc-100 px-2 text-base font-semibold tabular-nums text-zinc-950"
              : "flex h-11 min-w-11 shrink-0 items-center justify-center rounded-xl bg-zinc-100 px-2 text-xs font-medium text-zinc-500"
        }
      >
        {mark}
      </span>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-zinc-950">{label}</p>
        {anchor ? <p className="mt-0.5 text-sm text-zinc-500">{anchor}</p> : null}
        {score ? <p className="mt-1.5 text-sm leading-relaxed text-zinc-700">{score.evidence}</p> : null}
      </div>
    </li>
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
