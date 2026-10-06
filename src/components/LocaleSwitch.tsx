"use client";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

/** 语言切换:替换当前路径到另一语言 */
export default function LocaleSwitch() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const other = locale === "zh" ? "en" : "zh";
  return (
    <button
      onClick={() => router.replace(pathname, { locale: other })}
      className="cursor-pointer rounded-full border border-zinc-200 px-2.5 py-1 text-xs text-zinc-500 transition-colors hover:border-zinc-300 hover:text-zinc-800"
    >
      {other === "en" ? "EN" : "中文"}
    </button>
  );
}
