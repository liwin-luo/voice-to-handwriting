"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { ShareNetwork, X } from "@phosphor-icons/react";
import { useShareActions } from "./useShareActions";

/** 文章页没有分享横条,浮标常驻。列表页(/blog、/zh/blog)不算。 */
function isBlogPostRoute(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  const i = parts.indexOf("blog");
  return i >= 0 && parts.length > i + 1;
}

/**
 * 桌面端悬浮分享浮标:屏幕右侧垂直居中,单图标按钮,点击展开竖排分享面板。
 * 工具页:横条滚出视口后才显示,避免同一屏出现两份分享入口。
 * 博客文章页:没有横条,浮标常驻。列表页不显示。
 * 移动端不渲染(小屏下悬浮控件会遮挡操作)。
 */
export default function FloatingShare() {
  const t = useTranslations("share");
  const pathname = usePathname();
  const { buttons, onShare } = useShareActions();
  const [open, setOpen] = useState(false);
  // 工具页默认视为横条在视口内(浮标隐藏),避免 SSR/水合首帧闪现;
  // 文章页没有横条,首帧即显示
  const [barOnScreen, setBarOnScreen] = useState(() => !isBlogPostRoute(pathname));
  const rootRef = useRef<HTMLDivElement>(null);

  // 观察 #share-bar:横条滚出视口才显示浮标;路由切换后对新的横条重新观察
  useEffect(() => {
    const bar = document.getElementById("share-bar");
    if (!bar) {
      // 文章页常驻浮标;列表、关于等无横条页面保持隐藏。放进微任务,避免在 effect 里同步 setState 造成级联渲染
      const show = isBlogPostRoute(pathname);
      queueMicrotask(() => {
        setBarOnScreen(!show);
        setOpen(false);
      });
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      setBarOnScreen(entry.isIntersecting);
      // 横条回到视口(浮标随之隐藏)时顺手收起面板
      if (entry.isIntersecting) setOpen(false);
    });
    observer.observe(bar);
    return () => observer.disconnect();
  }, [pathname]);

  // 展开时:Esc 或点击浮标以外区域收起
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  if (barOnScreen) return null;

  const share = (id: (typeof buttons)[number]["id"]) => {
    onShare(id);
    // 分享动作(系统面板/平台弹窗)接管后收起浮标面板
    setOpen(false);
  };

  return (
    <div
      ref={rootRef}
      className="fixed top-1/2 right-3 z-30 hidden -translate-y-1/2 flex-col items-center gap-2 lg:flex"
    >
      {open && (
        <div
          role="group"
          aria-label={t("barLabel")}
          className="pop flex flex-col items-center gap-0.5 rounded-2xl border border-zinc-200 bg-white p-1.5 shadow-[0_12px_32px_-12px_rgba(23,23,23,0.3)]"
        >
          {buttons.map((b) => (
            <button
              key={b.id}
              onClick={() => share(b.id)}
              title={b.label}
              aria-label={b.label}
              className="flex size-10 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-zinc-100 focus-visible:bg-zinc-100 focus-visible:outline-none"
            >
              {b.icon}
            </button>
          ))}
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        title={t("barLabel")}
        aria-label={t("barLabel")}
        aria-expanded={open}
        className="btn btn-primary size-11 shadow-md"
      >
        {open ? <X className="size-5" /> : <ShareNetwork className="size-5" weight="bold" />}
      </button>
    </div>
  );
}
