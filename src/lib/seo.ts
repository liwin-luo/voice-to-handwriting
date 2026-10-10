import type { Metadata } from "next";
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

type PageMetaInput = {
  title?: string;
  description?: string;
};

type PageMetaOptions = {
  available?: readonly Locale[];
  /** 仅文章页。列表页和工具页不要编一个页面级发布日。 */
  article?: { publishedTime: string; modifiedTime?: string };
};

/**
 * 页面 metadata:title/description + canonical/hreflang + og:type/og:url。
 * og:url 等于该语言的 canonical,分享时才会落到正确语言。
 * 不写 openGraph.title,交给 Next 用页面 title(含品牌模板)补上。
 */
export function pageMetadata(
  pathname: string,
  locale: Locale,
  meta: PageMetaInput = {},
  options?: PageMetaOptions,
): Metadata {
  const alternates = buildAlternates(pathname, locale, options?.available);
  const article = options?.article;
  // 子页面一旦写 openGraph,会整段替换布局上的分享图。
  // 文章页同目录有自己的 opengraph-image,不填 images 才会用那张。
  // 其余页面指回 [locale]/opengraph-image。
  const brandImage = {
    url: locale === routing.defaultLocale ? "/opengraph-image" : `/${locale}/opengraph-image`,
    width: 1200,
    height: 630,
    alt: "Voice to Handwriting",
    type: "image/png",
  };
  return {
    ...(meta.title !== undefined ? { title: meta.title } : {}),
    ...(meta.description !== undefined ? { description: meta.description } : {}),
    alternates,
    openGraph: article
      ? {
          type: "article",
          url: alternates.canonical,
          publishedTime: article.publishedTime,
          modifiedTime: article.modifiedTime ?? article.publishedTime,
        }
      : { type: "website", url: alternates.canonical, images: [brandImage] },
  };
}
