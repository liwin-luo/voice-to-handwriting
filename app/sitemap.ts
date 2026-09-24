import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = "https://voicetohandwriting.online";
  const paths = ["", "/text", "/handwriting", "/faq", "/privacy", "/contact"];
  return paths.map((path) => ({
    url: `${site}${path}`,
    lastModified: new Date("2026-09-24"),
    changeFrequency: path === "" || path === "/faq" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/faq" ? 0.6 : 0.4,
  }));
}
