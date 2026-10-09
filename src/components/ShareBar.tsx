"use client";
import { useTranslations } from "next-intl";
import { useShareActions } from "./useShareActions";

/**
 * 快捷分享条:把当前工具页链接分享到社交平台。
 * 不接收 props —— 动作逻辑见 useShareActions。
 * 根节点 id="share-bar" 供 FloatingShare 观察可见性:横条在视口内时浮标隐藏。
 *
 * 版式:白底圆角边框,和上方操作栏同一套描边,但只包住内容。
 * 不拉满工具区宽度,也不用 glass-bar 的投影(那是给粘底操作栏浮起用的)。
 * 平台图标在前,系统分享用分隔线收在末尾。
 */
export default function ShareBar() {
  const t = useTranslations("share");
  const { buttons, onShare } = useShareActions();
  const networks = buttons.filter((b) => b.id !== "native");
  const more = buttons.find((b) => b.id === "native");

  const iconButton = (b: (typeof buttons)[number]) => (
    <button
      key={b.id}
      onClick={() => onShare(b.id)}
      title={b.label}
      aria-label={b.label}
      className="flex size-9 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-accent"
    >
      {b.icon}
    </button>
  );

  return (
    <div
      id="share-bar"
      className="flex w-fit max-w-full flex-wrap items-center rounded-2xl border border-zinc-200/70 bg-white py-1 pr-1.5 pl-4"
    >
      <span aria-hidden className="mr-1 text-sm text-zinc-500">{t("barLabel")}</span>
      <div role="group" aria-label={t("barLabel")} className="flex flex-wrap items-center">
        {networks.map(iconButton)}
        {more && (
          <>
            <span aria-hidden className="mx-1 h-4 w-px bg-zinc-200" />
            {iconButton(more)}
          </>
        )}
      </div>
    </div>
  );
}
