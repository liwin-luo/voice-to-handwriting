import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { POSTS } from "@/content/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/blog", "/about", "/privacy", "/terms", "/contact"].map((p) => ({
    url: `${SITE.url}${p}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.7,
  }));
  const posts = POSTS.map((p) => ({
    url: `${SITE.url}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  return [...staticPages, ...posts];
}
