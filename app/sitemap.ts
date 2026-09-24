import type { MetadataRoute } from "next";
import { LOCALES, localizedPath, PAGES } from "@/lib/locales.mjs";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = "https://voicetohandwriting.online";
  return LOCALES.flatMap((locale) =>
    PAGES.map((path) => ({
      url: `${site}${localizedPath(locale.id, path) === "/" ? "" : localizedPath(locale.id, path)}`,
      lastModified: new Date("2026-09-24"),
      changeFrequency: path === "/" || path === "/faq" ? "weekly" : "monthly",
      priority: path === "/" && locale.id === "en" ? 1 : path === "/" || path === "/faq" ? 0.6 : 0.4,
    })),
  );
}
