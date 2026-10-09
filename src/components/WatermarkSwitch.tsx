"use client";

import { useTranslations } from "next-intl";

/** 导出水印开关。默认由调用方传入 true。 */
export default function WatermarkSwitch({
  on,
  onChange,
}: {
  on: boolean;
  onChange: (on: boolean) => void;
}) {
  const t = useTranslations("tool");
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-zinc-700">{t("watermark")}</span>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label={t("watermark")}
        onClick={() => onChange(!on)}
        className={`relative h-6 w-11 cursor-pointer rounded-full transition-colors duration-200 ${
          on ? "bg-accent" : "bg-zinc-300"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow transition-transform duration-200 ${
            on ? "translate-x-5" : ""
          }`}
        />
      </button>
    </div>
  );
}
