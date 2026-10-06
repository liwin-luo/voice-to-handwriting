"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { X, ArrowLeft, ArrowRight, ShareNetwork, Copy, Check, XLogo } from "@phosphor-icons/react";
import { SITE } from "@/lib/site";

interface Props {
  open: boolean;
  onClose: () => void;
  /** 每页的 PNG dataUrl(与导出一致的渲染) */
  pages: string[];
}

type ShareTarget = "system" | "x" | "whatsapp" | "facebook" | "clipboard";

/** 预览 + 社交分享弹窗:展示与导出一致的页面真图,支持系统分享与逐平台分享 */
export default function SharePreviewModal({ open, onClose, pages }: Props) {
  const t = useTranslations("share");
  const [index, setIndex] = useState(0);
  const [copied, setCopied] = useState<null | "image" | "link">(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setIndex(0);
      setCopied(null);
      setError(null);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const shareText = t("shareText", { link: SITE.url });
  const current = pages[index];

  const dataUrlToBlob = async (dataUrl: string) => (await fetch(dataUrl)).blob();

  const download = async () => {
    const blob = await dataUrlToBlob(current);
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `handwriting-${index + 1}.png`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const systemShare = async () => {
    try {
      const blob = await dataUrlToBlob(current);
      const file = new File([blob], `handwriting-${index + 1}.png`, { type: "image/png" });
      const nav = navigator as Navigator & { canShare?: (d: unknown) => boolean };
      if (nav.canShare?.({ files: [file] })) {
        await nav.share({ files: [file], text: shareText, title: SITE.name });
      }
    } catch {
      /* 用户取消不视为错误 */
    }
  };

  const copyImage = async () => {
    try {
      const blob = await dataUrlToBlob(current);
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      setCopied("image");
      setTimeout(() => setCopied(null), 2000);
    } catch {
      setError(t("copyFail"));
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied("link");
      setTimeout(() => setCopied(null), 2000);
    } catch {
      setError(t("copyFail"));
    }
  };

  const openIntent = (target: "x" | "whatsapp" | "facebook") => {
    const encoded = encodeURIComponent(shareText);
    const urls = {
      x: `https://twitter.com/intent/tweet?text=${encoded}`,
      whatsapp: `https://wa.me/?text=${encoded}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SITE.url)}&quote=${encoded}`,
    };
    window.open(urls[target], "_blank", "noopener,noreferrer");
  };

  const canSystemShare =
    typeof navigator !== "undefined" &&
    !!(navigator as Navigator & { canShare?: unknown }).canShare;

  const shareButtons: Array<{ id: ShareTarget; label: string }> = [
    ...(canSystemShare ? [{ id: "system" as ShareTarget, label: t("shareSystem") }] : []),
    { id: "x", label: "X" },
    { id: "whatsapp", label: "WhatsApp" },
    { id: "facebook", label: "Facebook" },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 头部 */}
        <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-3.5">
          <h2 className="text-sm font-semibold text-zinc-900">{t("preview")}</h2>
          <div className="flex items-center gap-3">
            {pages.length > 1 && (
              <span className="font-mono text-xs text-zinc-400">
                {index + 1} / {pages.length}
              </span>
            )}
            <button
              onClick={onClose}
              aria-label={t("close")}
              className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        {/* 页面真图预览 */}
        <div className="flex-1 overflow-y-auto bg-zinc-100 p-5">
          <div className="relative mx-auto w-full max-w-xl">
            {pages.length > 1 && index > 0 && (
              <button
                onClick={() => setIndex(index - 1)}
                aria-label={t("prevPage")}
                className="absolute left-2 top-1/2 z-10 flex size-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-zinc-700 shadow hover:bg-white"
              >
                <ArrowLeft className="size-4" />
              </button>
            )}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={current} alt={`page ${index + 1}`} className="w-full rounded-lg border border-zinc-200" />
            {pages.length > 1 && index < pages.length - 1 && (
              <button
                onClick={() => setIndex(index + 1)}
                aria-label={t("nextPage")}
                className="absolute right-2 top-1/2 z-10 flex size-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-zinc-700 shadow hover:bg-white"
              >
                <ArrowRight className="size-4" />
              </button>
            )}
          </div>
        </div>

        {/* 分享区 */}
        <div className="border-t border-zinc-200 px-5 py-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500">
              <ShareNetwork className="size-4" />
              {t("share")}
            </span>
            {shareButtons.map((b) => (
              <button
                key={b.id}
                onClick={b.id === "system" ? systemShare : () => openIntent(b.id as "x")}
                className="btn btn-ghost px-3 py-1.5 text-xs"
              >
                {b.id === "x" && <XLogo className="size-3.5" />}
                {b.label}
              </button>
            ))}
            <button onClick={copyImage} className="btn btn-ghost px-3 py-1.5 text-xs">
              {copied === "image" ? <Check className="size-3.5 text-green-600" /> : <Copy className="size-3.5 text-zinc-500" />}
              {copied === "image" ? t("copied") : t("copyImage")}
            </button>
            <button onClick={copyLink} className="btn btn-ghost px-3 py-1.5 text-xs">
              {copied === "link" ? <Check className="size-3.5 text-green-600" /> : null}
              {copied === "link" ? t("copied") : t("copyLink")}
            </button>
            <button onClick={download} className="btn btn-ghost px-3 py-1.5 text-xs">
              {t("download")}
            </button>
          </div>
          {error && <p className="mt-2 text-xs text-rose-600">{error}</p>}
          <p className="mt-2 text-[11px] text-zinc-400">{t("shareHint")}</p>
        </div>
      </div>
    </div>
  );
}
