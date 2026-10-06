"use client";
import { useState, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import {
  ShareNetwork,
  Copy,
  Check,
  XLogo,
  WhatsappLogo,
  FacebookLogo,
  TelegramLogo,
  RedditLogo,
  LinkedinLogo,
  PinterestLogo,
  EnvelopeSimple,
} from "@phosphor-icons/react";

type Intent = "x" | "facebook" | "whatsapp" | "pinterest" | "telegram" | "reddit" | "linkedin" | "email";

/** 值只来自客户端环境(非订阅源),无需真正的 store 订阅 */
const subscribeNoop = () => () => {};

/**
 * 快捷分享条:把当前工具页链接分享到社交平台。
 * 不接收 props —— 运行时取 location.href 与 document.title,
 * 每个工具页插入一行即可获得正确的标题与 URL(含语言前缀)。
 */
export default function ShareBar() {
  const t = useTranslations("share");
  const [copied, setCopied] = useState(false);
  // 服务端/水合首帧返回 false,水合后再取真实能力,避免按钮列表水合不匹配
  const hasNative = useSyncExternalStore(
    subscribeNoop,
    () => typeof navigator !== "undefined" && !!navigator.share,
    () => false,
  );

  const url = () => window.location.href;
  const title = () => document.title;

  // 各平台分享 intent,链接格式与 SharePreviewModal 一致(对齐各平台官方文档)
  const intentUrls: Record<Intent, () => string> = {
    x: () => `https://twitter.com/intent/tweet?text=${encodeURIComponent(title())}&url=${encodeURIComponent(url())}`,
    facebook: () => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url())}`,
    whatsapp: () => `https://wa.me/?text=${encodeURIComponent(`${title()} ${url()}`)}`,
    pinterest: () =>
      `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(url())}&description=${encodeURIComponent(title())}`,
    telegram: () => `https://t.me/share/url?url=${encodeURIComponent(url())}&text=${encodeURIComponent(title())}`,
    reddit: () => `https://www.reddit.com/submit?url=${encodeURIComponent(url())}&title=${encodeURIComponent(title())}`,
    linkedin: () => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url())}`,
    email: () => `mailto:?subject=${encodeURIComponent(title())}&body=${encodeURIComponent(`${title()}\n${url()}`)}`,
  };

  const openIntent = (target: Intent) => {
    if (target === "email") {
      // mailto 用锚点触发,直接给 window.location.href 赋值会被 lint 视为修改外部变量
      const a = document.createElement("a");
      a.href = intentUrls.email();
      a.click();
      return;
    }
    window.open(intentUrls[target](), "_blank", "noopener,noreferrer");
  };

  const nativeShare = async () => {
    try {
      await navigator.share({ title: title(), text: title(), url: url() });
    } catch {
      /* 用户取消不视为错误 */
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* 剪贴板不可用时静默,按钮本身仍有系统分享兜底 */
    }
  };

  const buttons: Array<{ id: Intent | "native" | "copy"; label: string; icon: React.ReactNode }> = [
    ...(hasNative
      ? [{ id: "native" as const, label: t("shareSystem"), icon: <ShareNetwork className="size-4 text-zinc-500" /> }]
      : []),
    { id: "x", label: "X", icon: <XLogo weight="fill" className="size-4 text-zinc-900" /> },
    { id: "facebook", label: "Facebook", icon: <FacebookLogo weight="fill" className="size-4 text-[#1877F2]" /> },
    { id: "whatsapp", label: "WhatsApp", icon: <WhatsappLogo weight="fill" className="size-4 text-[#25D366]" /> },
    { id: "pinterest", label: "Pinterest", icon: <PinterestLogo weight="fill" className="size-4 text-[#E60023]" /> },
    { id: "telegram", label: "Telegram", icon: <TelegramLogo weight="fill" className="size-4 text-[#229ED9]" /> },
    { id: "reddit", label: "Reddit", icon: <RedditLogo weight="fill" className="size-4 text-[#FF4500]" /> },
    { id: "linkedin", label: "LinkedIn", icon: <LinkedinLogo weight="fill" className="size-4 text-[#0A66C2]" /> },
    { id: "email", label: t("email"), icon: <EnvelopeSimple className="size-4 text-zinc-500" /> },
    {
      id: "copy",
      label: copied ? t("copied") : t("copyUrl"),
      icon: copied ? <Check className="size-4 text-green-600" /> : <Copy className="size-4 text-zinc-500" />,
    },
  ];

  const on_click = (id: (typeof buttons)[number]["id"]) => {
    if (id === "native") void nativeShare();
    else if (id === "copy") void copyLink();
    else openIntent(id);
  };

  return (
    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-2 rounded-xl border border-zinc-200 bg-white px-4 py-3">
      <span className="mr-1 inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500">
        <ShareNetwork className="size-4" />
        {t("barLabel")}
      </span>
      {buttons.map((b) => (
        <button
          key={b.id}
          onClick={() => on_click(b.id)}
          title={b.label}
          aria-label={b.label}
          className="btn btn-ghost px-3 py-1.5 text-xs"
        >
          {b.icon}
          {b.label}
        </button>
      ))}
    </div>
  );
}
