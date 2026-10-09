"use client";

import { useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";

/**
 * 窄屏先看见输入和纸,字体行高收到「更多」。
 * 宽屏仍是左栏控件、右栏预览。
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
  const span = input ? "lg:row-span-3" : "lg:row-span-2";

  return (
    <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[300px_auto] lg:items-start">
      {input ? (
        <div className="order-1 flex flex-col gap-4 lg:col-start-1 lg:row-start-1">{input}</div>
      ) : null}
      <div className={`order-2 lg:sticky lg:top-20 lg:col-start-2 lg:row-start-1 lg:self-start ${span}`}>
        {preview}
      </div>
      <div
        className={`flex flex-col gap-2 ${
          input ? "order-3 lg:col-start-1 lg:row-start-3" : "order-2 lg:col-start-1 lg:row-start-2"
        }`}
      >
        {download}
      </div>
      <div
        className={`flex flex-col gap-4 ${
          input ? "order-4 lg:col-start-1 lg:row-start-2" : "order-3 lg:col-start-1 lg:row-start-1"
        }`}
      >
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
    </div>
  );
}
