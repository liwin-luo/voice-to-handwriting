"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { X, ArrowLeft, ArrowRight, Copy, Check } from "@phosphor-icons/react";
import ShareBar from "./ShareBar";

interface Props {
  open: boolean;
  onClose: () => void;
  /** 每页的 PNG dataUrl(与导出一致的渲染) */
  pages: string[];
  /** 导出水印当前状态;切换后父组件重渲染页面图 */
  watermark: boolean;
  onWatermarkChange: (on: boolean) => Promise<void>;
}

/** 预览弹窗:展示与导出一致的页面真图。社交分享复用页面上的 ShareBar。 */
export default function SharePreviewModal({ open, onClose, pages, watermark, onWatermarkChange }: Props) {
  const t = useTranslations("share");
  const tTool = useTranslations("tool");
  const [index, setIndex] = useState(0);
  const [copied, setCopied] = useState<null | "image" | "link">(null);
  const [error, setError] = useState<string | null>(null);
  // 水印切换期间图片正在重新截图,禁用开关避免连点
  const [wmPending, setWmPending] = useState(false);

  // 组件在 open 时才由父级挂载,每次打开都是全新状态,无需重置 effect

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

  const current = pages[index];

  const flipWatermark = async () => {
    setWmPending(true);
    try {
      await onWatermarkChange(!watermark);
    } finally {
      setWmPending(false);
    }
  };

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
      await navigator.clipboard.writeText(`${document.title}\n${window.location.href}`);
      setCopied("link");
      setTimeout(() => setCopied(null), 2000);
    } catch {
      setError(t("copyFail"));
    }
  };

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

        {/* 分享区:复制图片是社交分享的主路径,置为主按钮 */}
        <div className="border-t border-zinc-200 px-5 py-4">
          <div className="flex items-center justify-between gap-3">
            <button onClick={copyImage} className="btn btn-primary px-4 py-2.5 text-sm">
              {copied === "image" ? <Check className="size-4" /> : <Copy className="size-4" />}
              {copied === "image" ? t("copied") : t("copyImage")}
            </button>
            <label className="flex cursor-pointer select-none items-center gap-2">
              <span className="text-sm text-zinc-700">{tTool("watermark")}</span>
              <button
                role="switch"
                aria-checked={watermark}
                aria-label={tTool("watermark")}
                disabled={wmPending}
                onClick={flipWatermark}
                className={`relative h-6 w-11 cursor-pointer rounded-full transition-colors duration-200 disabled:opacity-50 ${
                  watermark ? "bg-accent" : "bg-zinc-300"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow transition-transform duration-200 ${
                    watermark ? "translate-x-5" : ""
                  }`}
                />
              </button>
            </label>
          </div>

          <div className="mt-3">
            <ShareBar anchor={false} />
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
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
