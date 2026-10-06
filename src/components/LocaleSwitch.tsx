"use client";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { LOCALE_LABELS, routing } from "@/i18n/routing";

/** 语言切换:5 语言 chip 组,替换当前路径到目标语言 */
export default function LocaleSwitch() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center gap-1">
      {routing.locales.map((l) => (
        <button
          key={l}
          onClick={() => router.replace(pathname, { locale: l })}
          className={`cursor-pointer rounded-full px-2 py-1 text-xs transition-colors ${
            l === locale
              ? "bg-accent/10 font-medium text-accent"
              : "text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700"
          }`}
        >
          {LOCALE_LABELS[l]}
        </button>
      ))}
    </div>
  );
}
