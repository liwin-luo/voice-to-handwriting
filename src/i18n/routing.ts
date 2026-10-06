import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "zh", "ja", "ko", "es", "de", "fr", "pt"],
  defaultLocale: "en",
  localePrefix: "as-needed", // 默认语言英语无前缀(/),其余 /zh /ja /ko /es /de /fr /pt
});

export type Locale = (typeof routing.locales)[number];

/** 语言切换器展示用的 endonym */
export const LOCALE_LABELS: Record<Locale, string> = {
  en: "EN",
  zh: "中文",
  ja: "日本語",
  ko: "한국어",
  es: "Español",
  de: "Deutsch",
  fr: "Français",
  pt: "Português",
};
