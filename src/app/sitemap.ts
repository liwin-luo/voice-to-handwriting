import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { POSTS } from "@/content/posts";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/blog", "/about", "/privacy", "/terms", "/contact"];
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    // 默认语言 zh 无前缀(home 即 /),en 前缀 /en
    for (const p of paths) {
      const url =
        locale === routing.defaultLocale
          ? `${SITE.url}${p || "/"}`
          : `${SITE.url}/${locale}${p}`;
      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: p === "" ? 1 : 0.7,
      });
    }
    for (const post of POSTS) {
      entries.push({
        url:
          locale === routing.defaultLocale
            ? `${SITE.url}/blog/${post.slug}`
            : `${SITE.url}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }
  return entries;
}
