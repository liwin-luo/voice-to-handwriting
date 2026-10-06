import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import path from "node:path";
import { routing } from "@/i18n/routing";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Voice to Handwriting";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const TAGLINES = {
  zh: "说一段话,一键变成手写文稿",
  en: "Speak a paragraph, get a handwritten page",
  ja: "話すだけで手書きの文書に",
  ko: "말하면 손글씨로",
  es: "Habla y conviértelo en escritura a mano",
} as const;

/** 默认品牌 OG 卡:手写字体渲染(服务端读自托管 TTF,支持 CJK) */
export default async function OgImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const zh = localeParam === "zh";
  const brand = zh ? "声音转手写" : "Voice to Handwriting";
  const tagline = TAGLINES[localeParam as keyof typeof TAGLINES] ?? TAGLINES.en;
  const font = readFileSync(
    path.join(process.cwd(), "src/assets/fonts/MaShanZheng-Regular.ttf"),
  );

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
        <div style={{ display: "flex", fontSize: 40, color: "#a1a1aa", letterSpacing: 4 }}>
          {zh ? "贺卡 · 书信 · 手账 · 文案配图" : "Cards · Letters · Journals · Social posts"}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: zh ? 130 : 104,
            color: "#18181b",
            lineHeight: 1.1,
          }}
        >
          {brand}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <div style={{ display: "flex", width: 12, height: 64, background: "#15317e", borderRadius: 6 }} />
          <div style={{ display: "flex", fontSize: 40, color: "#52525b" }}>{tagline}</div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "hand", data: font, weight: 400, style: "normal" }] },
  );
}
