"use client";
import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import {
  X,
  ArrowLeft,
  ArrowRight,
  ShareNetwork,
  Copy,
  Check,
  XLogo,
  WhatsappLogo,
  FacebookLogo,
  TelegramLogo,
  RedditLogo,
  LinkedinLogo,
  EnvelopeSimple,
} from "@phosphor-icons/react";
import { SITE } from "@/lib/site";

interface Props {
  open: boolean;
  onClose: () => void;
  /** 每页的 PNG dataUrl(与导出一致的渲染) */
  pages: string[];
}

type ShareIntent = "x" | "whatsapp" | "facebook" | "telegram" | "reddit" | "linkedin" | "email";

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

  // 锁住背景滚动,避免弹窗打开时页面跟着滚
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
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
  const plainText = t("sharePlain");
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

  /** Pinterest 引流图:1000×1500 竖版卡(页面图 + 品牌脚注) */
  const downloadPin = async () => {
    const img = new Image();
    img.src = current;
    await img.decode();
    const W = 1000;
    const H = 1500;
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#fafaf9";
    ctx.fillRect(0, 0, W, H);
    const iw = W - 100;
    const ih = img.height * (iw / img.width);
    ctx.drawImage(img, 50, 70, iw, ih);
    ctx.fillStyle = "#15317e";
    ctx.font = '44px "Ma Shan Zheng", serif';
    ctx.textAlign = "center";
    ctx.fillText("Voice to Handwriting", W / 2, H - 90);
    ctx.fillStyle = "#71717a";
    ctx.font = "26px sans-serif";
    ctx.fillText("voicetohandwriting.online", W / 2, H - 44);
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = `handwriting-pin-${index + 1}.png`;
    a.click();
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

  /** 主流平台分享 intent,链接格式对齐各平台官方文档(与常见在线工具站一致) */
  const intentUrls: Record<ShareIntent, string> = {
    x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(plainText)}&url=${encodeURIComponent(SITE.url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${plainText} ${SITE.url}`)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SITE.url)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(SITE.url)}&text=${encodeURIComponent(plainText)}`,
    reddit: `https://www.reddit.com/submit?url=${encodeURIComponent(SITE.url)}&title=${encodeURIComponent(plainText)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(SITE.url)}`,
    email: `mailto:?subject=${encodeURIComponent(SITE.name)}&body=${encodeURIComponent(`${plainText}\n${SITE.url}`)}`,
  };

  const openIntent = (target: ShareIntent) => {
    if (target === "email") {
      window.location.href = intentUrls.email;
      return;
    }
    window.open(intentUrls[target], "_blank", "noopener,noreferrer");
  };

  const canSystemShare =
    typeof navigator !== "undefined" &&
    !!(navigator as Navigator & { canShare?: unknown }).canShare;

  const shareButtons: Array<{ id: ShareIntent | "system"; label: string; icon: ReactNode }> = [
    ...(canSystemShare
      ? [{ id: "system" as const, label: t("shareSystem"), icon: <ShareNetwork className="size-3.5 text-zinc-500" /> }]
      : []),
    { id: "x", label: "X", icon: <XLogo weight="fill" className="size-3.5 text-zinc-900" /> },
    { id: "facebook", label: "Facebook", icon: <FacebookLogo weight="fill" className="size-3.5 text-[#1877F2]" /> },
    { id: "whatsapp", label: "WhatsApp", icon: <WhatsappLogo weight="fill" className="size-3.5 text-[#25D366]" /> },
    { id: "telegram", label: "Telegram", icon: <TelegramLogo weight="fill" className="size-3.5 text-[#229ED9]" /> },
    { id: "reddit", label: "Reddit", icon: <RedditLogo weight="fill" className="size-3.5 text-[#FF4500]" /> },
    { id: "linkedin", label: "LinkedIn", icon: <LinkedinLogo weight="fill" className="size-3.5 text-[#0A66C2]" /> },
    { id: "email", label: t("email"), icon: <EnvelopeSimple className="size-3.5 text-zinc-500" /> },
  ];

  return createPortal(
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

        {/* 页面真图预览:整页完整可见,高度受限时居中缩放 */}
        <div className="flex min-h-0 flex-1 items-center justify-center overflow-y-auto bg-zinc-100 p-5">
          <div className="relative mx-auto flex w-fit max-w-full items-center justify-center">
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
            <img
              src={current}
              alt={`page ${index + 1}`}
              className="max-h-[60vh] w-auto max-w-full rounded-lg border border-zinc-200 bg-white shadow-sm"
            />
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
                onClick={b.id === "system" ? systemShare : () => openIntent(b.id as ShareIntent)}
                className="btn btn-ghost px-3 py-1.5 text-xs"
              >
                {b.icon}
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
            <button onClick={downloadPin} className="btn btn-ghost px-3 py-1.5 text-xs">
              {t("pinDownload")}
            </button>
          </div>
          {error && <p className="mt-2 text-xs text-rose-600">{error}</p>}
          <p className="mt-2 text-[11px] text-zinc-400">{t("shareHint")}</p>
        </div>
      </div>
    </div>,
    document.body,
  );
}
