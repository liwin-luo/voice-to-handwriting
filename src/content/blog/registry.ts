import type { ComponentType } from "react";
import type { Locale } from "@/i18n/routing";
import cardZh from "./handwritten-card-with-voice.zh.mdx";
import cardEn from "./handwritten-card-with-voice.en.mdx";
import cardJa from "./handwritten-card-with-voice.ja.mdx";
import cardKo from "./handwritten-card-with-voice.ko.mdx";
import cardEs from "./handwritten-card-with-voice.es.mdx";
import genZh from "./handwriting-image-generator.zh.mdx";
import genEn from "./handwriting-image-generator.en.mdx";
import genJa from "./handwriting-image-generator.ja.mdx";
import genKo from "./handwriting-image-generator.ko.mdx";
import genEs from "./handwriting-image-generator.es.mdx";
import xhsZh from "./xiaohongshu-handwritten-images.zh.mdx";
import xhsEn from "./xiaohongshu-handwritten-images.en.mdx";
import xhsJa from "./xiaohongshu-handwritten-images.ja.mdx";
import xhsKo from "./xiaohongshu-handwritten-images.ko.mdx";
import xhsEs from "./xiaohongshu-handwritten-images.es.mdx";

/** slug → 语言 → 内容组件;新增文章:建 <slug>.<locale>.mdx 后在此注册 */
export const BLOG_CONTENT: Record<string, Record<Locale, ComponentType>> = {
  "handwritten-card-with-voice": { zh: cardZh, en: cardEn, ja: cardJa, ko: cardKo, es: cardEs },
  "handwriting-image-generator": { zh: genZh, en: genEn, ja: genJa, ko: genKo, es: genEs },
  "xiaohongshu-handwritten-images": { zh: xhsZh, en: xhsEn, ja: xhsJa, ko: xhsKo, es: xhsEs },
};
