import type { Metadata } from "next";
import { COPY, type LocaleId, type PageId } from "./copy";
import { LOCALES, localizedPath, localeById } from "./locales.mjs";

export function pageMetadata(locale: LocaleId, page: PageId): Metadata {
  const meta = COPY[locale].meta[page];
  const bare = page === "home" ? "/" : `/${page}`;
  const canonical = localizedPath(locale, bare);
  const languages: Record<string, string> = { "x-default": localizedPath("en", bare) };
  for (const item of LOCALES) languages[item.hreflang] = localizedPath(item.id, bare);
  return {
    title: { absolute: meta.title },
    description: meta.description,
    alternates: { canonical, languages },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonical,
      locale: (localeById(locale)?.hreflang || "en").replace("-", "_"),
    },
  };
}
