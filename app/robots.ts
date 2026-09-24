import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://voicetohandwriting.online/sitemap.xml",
    host: "https://voicetohandwriting.online",
  };
}
