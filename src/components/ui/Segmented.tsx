"use client";

import type { ReactNode } from "react";

export interface SegmentedOption<V extends string> {
  value: V;
  label: ReactNode;
  title?: string;
}

/** 全站唯一的分段选中语言(替换 17 处复制粘贴的胶囊 toggle):
    选中 = border-accent + bg-accent/5 + text-accent,未选中 = 灰边白底。 */
export default function Segmented<V extends string>({
  value,
  options,
  onChange,
  ariaLabel,
  className = "",
}: {
  value: V;
  options: readonly SegmentedOption<V>[];
  onChange: (next: V) => void;
  ariaLabel: string;
  className?: string;
}) {
  return (
    <div role="radiogroup" aria-label={ariaLabel} className={`flex flex-wrap gap-1.5 ${className}`}>
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            title={opt.title}
            onClick={() => onChange(opt.value)}
            className={`cursor-pointer rounded-md border px-2 py-1 text-xs transition-colors duration-150 ${
              active
                ? "border-accent bg-accent/5 text-accent"
                : "border-zinc-200 bg-white text-zinc-500 hover:border-zinc-300 hover:text-zinc-700"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
