import type { ComponentType } from "react";
import type { Locale } from "@/i18n/routing";
import cardZh from "./handwritten-card-with-voice.zh.mdx";
import cardEn from "./handwritten-card-with-voice.en.mdx";
import genZh from "./handwriting-image-generator.zh.mdx";
import genEn from "./handwriting-image-generator.en.mdx";
import xhsZh from "./xiaohongshu-handwritten-images.zh.mdx";
import xhsEn from "./xiaohongshu-handwritten-images.en.mdx";

/** slug → 语言 → 内容组件;新增文章:建 <slug>.<locale>.mdx 后在此注册 */
export const BLOG_CONTENT: Record<string, Record<Locale, ComponentType>> = {
  "handwritten-card-with-voice": { zh: cardZh, en: cardEn },
  "handwriting-image-generator": { zh: genZh, en: genEn },
  "xiaohongshu-handwritten-images": { zh: xhsZh, en: xhsEn },
};
