"use client";

/** 全站唯一的开关样式(替换 14 处复制粘贴的 h-6 w-11 toggle)。 */
export default function Switch({
  checked,
  onChange,
  label,
  disabled,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer items-center rounded-md border transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-40 ${
        checked ? "border-accent bg-accent" : "border-zinc-300 bg-zinc-100"
      }`}
    >
      <span
        className={`inline-block size-3.5 rounded-sm bg-white shadow-xs transition-transform duration-150 ${
          checked ? "translate-x-4" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}
