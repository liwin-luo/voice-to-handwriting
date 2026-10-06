import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { routing, type Locale } from "@/i18n/routing";
import { POSTS, getPostMeta } from "@/content/posts";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Voice to Handwriting";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => POSTS.map((p) => ({ locale, slug: p.slug })));
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const meta = getPostMeta(slug, locale as Locale);
  const title = meta?.title ?? "Voice to Handwriting";

  const font = readFileSync(
    path.join(process.cwd(), "src/assets/fonts/MaShanZheng-Regular.ttf"),
  );
  const brand = locale === "zh" ? "声音转手写" : "Voice to Handwriting";
  const taglines = {
    zh: "说一段话,一键变成手写文稿",
    en: "Speak a paragraph, get a handwritten page",
    ja: "話すだけで手書きの文書に",
    ko: "말하면 손글씨로",
    es: "Habla y conviértelo en escritura a mano",
  };

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fafaf9",
          padding: 80,
        }}
      >
        <div style={{ display: "flex", fontSize: 34, color: "#a1a1aa", letterSpacing: 4 }}>
          {brand}
        </div>
        <div style={{ display: "flex", fontSize: 76, color: "#18181b", lineHeight: 1.25 }}>
          {title}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div style={{ display: "flex", width: 12, height: 52, background: "#15317e", borderRadius: 6 }} />
          <div style={{ display: "flex", fontSize: 34, color: "#52525b" }}>
            {taglines[locale as keyof typeof taglines] ?? taglines.en}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "hand", data: font, weight: 400, style: "normal" }] },
  );
}
