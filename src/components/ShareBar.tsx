"use client";
import { useTranslations } from "next-intl";
import { ShareNetwork } from "@phosphor-icons/react";
import { useShareActions } from "./useShareActions";

/**
 * 快捷分享条:把当前工具页链接分享到社交平台。
 * 不接收 props —— 动作逻辑见 useShareActions。
 * 根节点 id="share-bar" 供 FloatingShare 观察可见性:横条在视口内时浮标隐藏。
 */
export default function ShareBar() {
  const t = useTranslations("share");
  const { buttons, onShare } = useShareActions();

  return (
    <div
      id="share-bar"
      className="flex flex-wrap items-center gap-x-2.5 gap-y-2 rounded-xl border border-zinc-200 bg-white px-4 py-3"
    >
      <span className="mr-1 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500">
        <ShareNetwork className="size-5" />
        {t("barLabel")}
      </span>
      {buttons.map((b) => (
        <button
          key={b.id}
          onClick={() => onShare(b.id)}
          title={b.label}
          aria-label={b.label}
          className="btn btn-ghost px-3.5 py-2 text-sm"
        >
          {b.icon}
          {b.label}
        </button>
      ))}
    </div>
  );
}
