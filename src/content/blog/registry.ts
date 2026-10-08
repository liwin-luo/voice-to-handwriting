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
import cardDe from "./handwritten-card-with-voice.de.mdx";
import cardFr from "./handwritten-card-with-voice.fr.mdx";
import cardPt from "./handwritten-card-with-voice.pt.mdx";
import genDe from "./handwriting-image-generator.de.mdx";
import genFr from "./handwriting-image-generator.fr.mdx";
import genPt from "./handwriting-image-generator.pt.mdx";
import xhsDe from "./xiaohongshu-handwritten-images.de.mdx";
import xhsFr from "./xiaohongshu-handwritten-images.fr.mdx";
import xhsPt from "./xiaohongshu-handwritten-images.pt.mdx";
import audioDe from "./audio-to-handwriting.de.mdx";
import audioFr from "./audio-to-handwriting.fr.mdx";
import audioPt from "./audio-to-handwriting.pt.mdx";
import tplGDe from "./handwriting-templates-guide.de.mdx";
import tplGFr from "./handwriting-templates-guide.fr.mdx";
import tplGPt from "./handwriting-templates-guide.pt.mdx";
import audioZh from "./audio-to-handwriting.zh.mdx";
import audioEn from "./audio-to-handwriting.en.mdx";
import audioJa from "./audio-to-handwriting.ja.mdx";
import audioKo from "./audio-to-handwriting.ko.mdx";
import audioEs from "./audio-to-handwriting.es.mdx";
import tplZh from "./handwriting-templates-guide.zh.mdx";
import tplEn from "./handwriting-templates-guide.en.mdx";
import tplJa from "./handwriting-templates-guide.ja.mdx";
import tplKo from "./handwriting-templates-guide.ko.mdx";
import tplEs from "./handwriting-templates-guide.es.mdx";

import ntgEn from "./name-tracing-generator.en.mdx";
import plpEn from "./free-printable-lined-paper.en.mdx";
import cpwEn from "./cursive-practice-worksheets.en.mdx";
import khpEn from "./kindergarten-handwriting-paper.en.mdx";
import lstEn from "./letter-to-santa-template.en.mdx";
import htnEn from "./handwritten-thank-you-notes.en.mdx";
import dwcEn from "./diy-wedding-calligraphy.en.mdx";
import pplEn from "./pen-pal-letters-for-kids.en.mdx";
import ihaEn from "./how-to-improve-handwriting-adults.en.mdx";
import hswEn from "./handwriting-practice-struggling-writers.en.mdx";
import hwcEn from "./how-to-write-in-cursive.en.mdx";
import cacEn from "./cursive-alphabet-chart.en.mdx";
import cnsEn from "./cursive-name-signature.en.mdx";
import icsEn from "./is-cursive-still-taught.en.mdx";
import cvpEn from "./cursive-vs-print.en.mdx";
import htcEn from "./how-to-teach-cursive-kids.en.mdx";
import wdzh from "./what-does-your-handwriting-say-about-you.zh.mdx";
import wden from "./what-does-your-handwriting-say-about-you.en.mdx";
import wdja from "./what-does-your-handwriting-say-about-you.ja.mdx";
import wdko from "./what-does-your-handwriting-say-about-you.ko.mdx";
import wdes from "./what-does-your-handwriting-say-about-you.es.mdx";
import wdde from "./what-does-your-handwriting-say-about-you.de.mdx";
import wdfr from "./what-does-your-handwriting-say-about-you.fr.mdx";
import wdpt from "./what-does-your-handwriting-say-about-you.pt.mdx";

/** slug → 语言 → 内容组件;新增文章:建 <slug>.<locale>.mdx 后在此注册。
 * 值允许 Partial:仅部分语言有正文时,页面按语言 404,sitemap/索引按 availableLocales 过滤 */
export const BLOG_CONTENT: Record<string, Partial<Record<Locale, ComponentType>>> = {
  "what-does-your-handwriting-say-about-you": { zh: wdzh, en: wden, ja: wdja, ko: wdko, es: wdes, de: wdde, fr: wdfr, pt: wdpt },
  "handwritten-card-with-voice": { zh: cardZh, en: cardEn, ja: cardJa, ko: cardKo, es: cardEs, de: cardDe, fr: cardFr, pt: cardPt },
  "handwriting-image-generator": { zh: genZh, en: genEn, ja: genJa, ko: genKo, es: genEs, de: genDe, fr: genFr, pt: genPt },
  "xiaohongshu-handwritten-images": { zh: xhsZh, en: xhsEn, ja: xhsJa, ko: xhsKo, es: xhsEs, de: xhsDe, fr: xhsFr, pt: xhsPt },
  "audio-to-handwriting": { zh: audioZh, en: audioEn, ja: audioJa, ko: audioKo, es: audioEs, de: audioDe, fr: audioFr, pt: audioPt },
  "handwriting-templates-guide": { zh: tplZh, en: tplEn, ja: tplJa, ko: tplKo, es: tplEs, de: tplGDe, fr: tplGFr, pt: tplGPt },
  "name-tracing-generator": { en: ntgEn },
  "free-printable-lined-paper": { en: plpEn },
  "cursive-practice-worksheets": { en: cpwEn },
  "kindergarten-handwriting-paper": { en: khpEn },
  "letter-to-santa-template": { en: lstEn },
  "handwritten-thank-you-notes": { en: htnEn },
  "diy-wedding-calligraphy": { en: dwcEn },
  "pen-pal-letters-for-kids": { en: pplEn },
  "how-to-improve-handwriting-adults": { en: ihaEn },
  "handwriting-practice-struggling-writers": { en: hswEn },
  "how-to-write-in-cursive": { en: hwcEn },
  "cursive-alphabet-chart": { en: cacEn },
  "cursive-name-signature": { en: cnsEn },
  "is-cursive-still-taught": { en: icsEn },
  "cursive-vs-print": { en: cvpEn },
  "how-to-teach-cursive-kids": { en: htcEn },
};

/** 该文章在哪些语言下有正文(sitemap / blog 索引用它过滤,避免 404 URL 进 sitemap) */
export function postLocales(slug: string): Locale[] {
  const entry = BLOG_CONTENT[slug];
  if (!entry) return [];
  return (Object.keys(entry) as Locale[]).filter((l) => Boolean(entry[l]));
}
