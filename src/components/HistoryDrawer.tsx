"use client";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { X } from "@phosphor-icons/react";
import HistoryPanel from "./HistoryPanel";

/** 工具内历史抽屉:挂载时才渲染;恢复后直接关闭回到编辑器,不跳转首页 */
export default function HistoryDrawer({ onClose }: { onClose: () => void }) {
  const t = useTranslations("history");

  // 锁住背景滚动,避免抽屉打开时页面跟着滚
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-50 bg-zinc-950/50 backdrop-blur-sm" onClick={onClose}>
      <div
        role="dialog"
        aria-label={t("title")}
        className="drawer-panel absolute inset-y-0 right-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 头部 */}
        <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-3.5">
          <h2 className="text-sm font-semibold text-zinc-900">{t("title")}</h2>
          <button
            onClick={onClose}
            aria-label={t("close")}
            className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
          >
            <X className="size-4" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
          <HistoryPanel onRestore={() => onClose()} />
        </div>
      </div>
    </div>,
    document.body,
  );
}
