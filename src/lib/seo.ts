import { routing, type Locale } from "@/i18n/routing";
import { SITE } from "@/lib/site";

/** 指定路径在某语言下的绝对 URL(默认语言 en 无前缀,与 localePrefix: "as-needed" 一致) */
export function localizedUrl(pathname: string, locale: string): string {
  const p = pathname === "" || pathname === "/" ? "/" : pathname;
  if (locale === routing.defaultLocale) return `${SITE.url}${p}`;
  // 非根路径不带尾斜杠:/zh/cursive 而非 /zh/cursive/,与 next 实际路由一致
  return `${SITE.url}/${locale}${p === "/" ? "" : p}`;
}

/**
 * 页面级 canonical + hreflang:
 * - 每个语言版本自引用 canonical(多语言站 canonical 不得跨语言)
 * - x-default 指向默认语言(en)URL
 * - available 用于部分翻译的页面(如博客),只声明真实存在的语言变体,
 *   指向 404 的 hreflang 会导致整组声明被丢弃
 */
export function buildAlternates(
  pathname: string,
  locale: Locale,
  available?: readonly Locale[],
): { canonical: string; languages: Record<string, string> } {
  const langs = available ?? routing.locales;
  const languages: Record<string, string> = {};
  for (const l of langs) languages[l] = localizedUrl(pathname, l);
  if (langs.includes(routing.defaultLocale)) {
    languages["x-default"] = localizedUrl(pathname, routing.defaultLocale);
  }
  return { canonical: localizedUrl(pathname, locale), languages };
}
