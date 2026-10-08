"use client";

import { useTranslations } from "next-intl";
import type { PageFormat } from "@/lib/localeDefaults";

export default function PageFormatToggle({
  value,
  onChange,
}: {
  value: PageFormat;
  onChange: (next: PageFormat) => void;
}) {
  const t = useTranslations("sheet");
  const options: Array<{ id: PageFormat; label: string }> = [
    { id: "letter", label: t("sizeLetter") },
    { id: "a4", label: t("sizeA4") },
  ];
  return (
    <div className="flex flex-col gap-1.5">
      <span className="field-label">{t("pageSize")}</span>
      <div className="flex gap-1.5">
        {options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={`flex-1 cursor-pointer rounded-lg border px-2 py-1.5 text-xs transition-colors ${
              value === opt.id
                ? "border-accent bg-accent/5 text-accent"
                : "border-zinc-200 bg-white text-zinc-500 hover:border-zinc-300"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
