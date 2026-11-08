import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en"],
  defaultLocale: "en",
  localePrefix: "as-needed", // 单语言无前缀;2026-11-08 从 8 语种收缩为 en-only,旧 /{locale}/… URL 由 next.config.ts 308 回英文版
});

export type Locale = (typeof routing.locales)[number];

/** 语言切换器展示用的 endonym */
export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
};
