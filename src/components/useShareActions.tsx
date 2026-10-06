"use client";
import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import {
  ShareNetwork,
  XLogo,
  WhatsappLogo,
  FacebookLogo,
  PinterestLogo,
  EnvelopeSimple,
} from "@phosphor-icons/react";

type Intent = "x" | "facebook" | "whatsapp" | "pinterest" | "email";

export type ShareButton = { id: Intent | "native"; label: string; icon: React.ReactNode };

/** 值只来自客户端环境(非订阅源),无需真正的 store 订阅 */
const subscribeNoop = () => () => {};

/**
 * 分享动作:供 ShareBar(横条)与 FloatingShare(浮标)共用。
 * 运行时取 location.href 与 document.title,插入处所在的工具页即得到正确的标题与 URL(含语言前缀)。
 *
 * 平台取舍:只保留教育/打印类受众真正会用的入口;
 * Telegram、Reddit、LinkedIn 受众不匹配已移除,复制链接由横条下方的系统分享与浮标承担。
 */
export function useShareActions() {
  const t = useTranslations("share");
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

  const buttons: ShareButton[] = [
    ...(hasNative
      ? [{ id: "native" as const, label: t("shareSystem"), icon: <ShareNetwork className="size-5 text-zinc-500" /> }]
      : []),
    { id: "x", label: "X", icon: <XLogo weight="fill" className="size-5 text-zinc-900" /> },
    { id: "facebook", label: "Facebook", icon: <FacebookLogo weight="fill" className="size-5 text-[#1877F2]" /> },
    { id: "whatsapp", label: "WhatsApp", icon: <WhatsappLogo weight="fill" className="size-5 text-[#25D366]" /> },
    { id: "pinterest", label: "Pinterest", icon: <PinterestLogo weight="fill" className="size-5 text-[#E60023]" /> },
    { id: "email", label: t("email"), icon: <EnvelopeSimple className="size-5 text-zinc-500" /> },
  ];

  const onShare = (id: ShareButton["id"]) => {
    if (id === "native") void nativeShare();
    else openIntent(id);
  };

  return { buttons, onShare };
}
