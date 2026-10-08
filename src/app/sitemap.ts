import type { MetadataRoute } from "next";
import { POSTS } from "@/content/posts";
import { postLocales } from "@/content/blog/registry";
import { TEMPLATES } from "@/content/templates";
import { routing } from "@/i18n/routing";
import { buildAlternates, localizedUrl } from "@/lib/seo";

/** /history 是本地工具页,薄内容不进 sitemap */
const PATHS = ["/", "/templates", "/blog", "/faq", "/cursive", "/cursive-worksheets", "/daily-cursive-handwriting-practice", "/handwriting-personality-quiz", "/printable-paper", "/name-tracing", "/word-work", "/writing-practice", "/name-coloring", "/about", "/privacy", "/terms", "/contact"];
const YEARLY_PATHS = new Set(["/privacy", "/terms", "/contact", "/about"]);

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const p of PATHS) {
    for (const locale of routing.locales) {
      entries.push({
        url: localizedUrl(p, locale),
        changeFrequency: YEARLY_PATHS.has(p) ? "yearly" : "weekly",
        priority: p === "/" ? 1 : 0.7,
        alternates: { languages: buildAlternates(p, locale).languages },
      });
    }
  }
  for (const tpl of TEMPLATES) {
    const p = `/templates/${tpl.slug}`;
    for (const locale of routing.locales) {
      entries.push({
        url: localizedUrl(p, locale),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: { languages: buildAlternates(p, locale).languages },
      });
    }
  }
  for (const post of POSTS) {
    // 仅输出有正文的语言变体,避免英-only 文章的其他语言 URL 404
    const available = postLocales(post.slug);
    const p = `/blog/${post.slug}`;
    for (const locale of available) {
      entries.push({
        url: localizedUrl(p, locale),
        // lastmod 用文章真实日期:全站统一刷成构建时间会被 Google 判为不可信
        lastModified: new Date(post.date),
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: { languages: buildAlternates(p, locale, available).languages },
      });
    }
  }
  return entries;
}
