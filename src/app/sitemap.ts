import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { POSTS } from "@/content/posts";
import { TEMPLATES } from "@/content/templates";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/templates", "/blog", "/about", "/privacy", "/terms", "/contact", "/history"];
  const entries: MetadataRoute.Sitemap = [];

  const localized = (p: string, locale: string) =>
    locale === routing.defaultLocale ? `${SITE.url}${p || "/"}` : `${SITE.url}/${locale}${p}`;

  /** hreflang:告知搜索引擎每个页面的语言变体(zh 为默认无前缀) */
  const alternatesFor = (p: string) => ({
    languages: Object.fromEntries(routing.locales.map((l) => [l, localized(p, l)])),
  });

  for (const locale of routing.locales) {
    for (const p of paths) {
      entries.push({
        url: localized(p, locale),
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: p === "" ? 1 : 0.7,
        alternates: alternatesFor(p),
      });
    }
    for (const tpl of TEMPLATES) {
      const p = `/templates/${tpl.slug}`;
      entries.push({
        url: localized(p, locale),
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: alternatesFor(p),
      });
    }
    for (const post of POSTS) {
      const p = `/blog/${post.slug}`;
      entries.push({
        url: localized(p, locale),
        lastModified: new Date(post.date),
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: alternatesFor(p),
      });
    }
  }
  return entries;
}
