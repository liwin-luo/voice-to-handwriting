import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // 2026-11-18 恢复 es + pt(用户批准,content-plan §三十二):UI+工具命名空间已译,
  // blog/authors/faq/about 仍按门控 404;pt 承载巴西葡语(SPEECH_LANG 已映射 pt-BR)
  locales: ["en", "zh", "es", "pt"],
  defaultLocale: "en",
  // en 无前缀,zh/es/pt 带 /{locale} 前缀。旧非 zh|es 前缀 URL 仍由 next.config.ts 308 回英文版
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];

/** 语言切换器展示用的 endonym */
export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  zh: "中文",
  es: "Español",
  pt: "Português",
};

/** 每个语言支持的完整 locale 集(zh 之外的拉丁语言未来可扩)。门控页只对前两种输出。 */
export const CORE_LOCALES: Locale[] = ["en", "zh"];
