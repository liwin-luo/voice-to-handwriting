"use client";

import { useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import ToolLayout from "./ToolLayout";

/**
 * 窄屏先看见输入和纸,字体行高收到「更多」。
 * 宽屏左栏是一整列控件:预览变高时不能再把下载按钮撑下去。
 * 布局骨架来自 ToolLayout(统一壳),这里只保留「更多设置」disclosure 语义。
 */
export default function PracticeLayout({
  input,
  preview,
  download,
  more,
}: {
  input?: ReactNode;
  preview: ReactNode;
  download: ReactNode;
  more: ReactNode;
}) {
  const t = useTranslations("sheet");
  const [open, setOpen] = useState(false);

  return (
    <ToolLayout
      side={
        <>
          {input ? <div className="order-1 lg:order-none">{input}</div> : null}
          <div className="order-4 flex flex-col gap-4 lg:order-none">
            <button
              type="button"
              className="btn btn-ghost w-full px-4 py-2.5 text-sm lg:hidden"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {t("moreSettings")}
            </button>
            <div className={`${open ? "flex" : "hidden lg:flex"} flex-col gap-4`}>{more}</div>
          </div>
          <div className="order-3 flex flex-col gap-2 lg:order-none">{download}</div>
        </>
      }
      preview={preview}
      previewClassName="order-2 lg:sticky lg:top-20 lg:self-start"
    />
  );
}
