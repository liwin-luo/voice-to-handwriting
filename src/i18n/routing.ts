import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "zh"],
  defaultLocale: "en",
  // 2026-11-09 恢复双语:en 无前缀,zh 带 /zh 前缀。旧非 zh 语言前缀 URL 仍由 next.config.ts 308 回英文版
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];

/** 语言切换器展示用的 endonym */
export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  zh: "中文",
};
