import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["zh", "en", "ja", "ko", "es"],
  defaultLocale: "zh",
  localePrefix: "as-needed", // 默认语言中文无前缀,其余 /en /ja /ko /es
});

export type Locale = (typeof routing.locales)[number];

/** 语言切换器展示用的 endonym */
export const LOCALE_LABELS: Record<Locale, string> = {
  zh: "中文",
  en: "EN",
  ja: "日本語",
  ko: "한국어",
  es: "Español",
};
