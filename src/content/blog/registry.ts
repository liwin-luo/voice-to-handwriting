import type { ComponentType } from "react";
import type { Locale } from "@/i18n/routing";
import cardEn from "./handwritten-card-with-voice.en.mdx";
import genEn from "./handwriting-image-generator.en.mdx";
import xhsEn from "./xiaohongshu-handwritten-images.en.mdx";
import audioEn from "./audio-to-handwriting.en.mdx";
import tplEn from "./handwriting-templates-guide.en.mdx";

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
import wden from "./what-does-your-handwriting-say-about-you.en.mdx";
import bvtEn from "./handwriting-vs-typing-brain.en.mdx";
import hiyEn from "./how-to-improve-your-handwriting.en.mdx";
import swtEn from "./sight-word-tracing-worksheets.en.mdx";
import hwbEn from "./handwriting-workbook.en.mdx";
import hshEn from "./how-many-sheets-handwriting.en.mdx";
import ctgEn from "./cursive-text-generator.en.mdx";
import cstEn from "./cursive-sentences-to-practice.en.mdx";
import cwgEn from "./copywork-generator.en.mdx";
import ntlEn from "./name-tracing-with-lines.en.mdx";
import cmcEn from "./calligraphy-motto-cards.en.mdx";
import novEn from "./november-in-cursive.en.mdx";
import clbEn from "./cursive-laws-by-state.en.mdx";
import bcfEn from "./best-cursive-fonts.en.mdx";
import phlEn from "./print-handwritten-letters-and-envelopes.en.mdx";
import tnaEn from "./tracing-numbers-by-age.en.mdx";
import slwEn from "./spelling-list-word-work.en.mdx";
import cnbEn from "./color-a-name-before-tracing.en.mdx";
import ocgEn from "./one-character-in-the-grid.en.mdx";
import pohEn from "./practice-one-handwriting-problem.en.mdx";
import hwsEn from "./handwriting-worksheets.en.mdx";
import nicEn from "./numbers-in-cursive.en.mdx";
import gpmEn from "./graphisme-maternelle.en.mdx";


import qvhEn from "./quiet-voice-before-handwriting.en.mdx";
import hptEn from "./handwriting-personality-test.en.mdx";
import bldEn from "./bubble-letters-for-a-display-name.en.mdx";

// 2026-11-09 恢复双语:28 篇存档文章的 zh 正文(e13f8a8^ 找回,死链已按 en 的承接页改法镜像)

import ntgZh from "./name-tracing-generator.zh.mdx";
import plpZh from "./free-printable-lined-paper.zh.mdx";
import cpwZh from "./cursive-practice-worksheets.zh.mdx";
import khpZh from "./kindergarten-handwriting-paper.zh.mdx";
import lstZh from "./letter-to-santa-template.zh.mdx";
import htnZh from "./handwritten-thank-you-notes.zh.mdx";
import dwcZh from "./diy-wedding-calligraphy.zh.mdx";
import pplZh from "./pen-pal-letters-for-kids.zh.mdx";
import ihaZh from "./how-to-improve-handwriting-adults.zh.mdx";
import hswZh from "./handwriting-practice-struggling-writers.zh.mdx";
import hwcZh from "./how-to-write-in-cursive.zh.mdx";
import cacZh from "./cursive-alphabet-chart.zh.mdx";
import cnsZh from "./cursive-name-signature.zh.mdx";
import icsZh from "./is-cursive-still-taught.zh.mdx";
import cvpZh from "./cursive-vs-print.zh.mdx";
import htcZh from "./how-to-teach-cursive-kids.zh.mdx";
import bvtZh from "./handwriting-vs-typing-brain.zh.mdx";
import hiyZh from "./how-to-improve-your-handwriting.zh.mdx";
import ntlZh from "./name-tracing-with-lines.zh.mdx";
import cmcZh from "./calligraphy-motto-cards.zh.mdx";
import wdZh from "./what-does-your-handwriting-say-about-you.zh.mdx";
import cardZh from "./handwritten-card-with-voice.zh.mdx";
import genZh from "./handwriting-image-generator.zh.mdx";
import xhsZh from "./xiaohongshu-handwritten-images.zh.mdx";
import audioZh from "./audio-to-handwriting.zh.mdx";
import tplZh from "./handwriting-templates-guide.zh.mdx";
import hwsZh from "./handwriting-worksheets.zh.mdx";
import nicZh from "./numbers-in-cursive.zh.mdx";

/** slug → 语言 → 内容组件;新增文章:建 <slug>.<locale>.mdx 后在此注册。
 * 值允许 Partial:仅部分语言有正文时,页面按语言 404,sitemap/索引按 availableLocales 过滤 */
export const BLOG_CONTENT: Record<string, Partial<Record<Locale, ComponentType>>> = {
  "what-does-your-handwriting-say-about-you": { en: wden, zh: wdZh },
  "handwritten-card-with-voice": { en: cardEn, zh: cardZh },
  "handwriting-image-generator": { en: genEn, zh: genZh },
  "xiaohongshu-handwritten-images": { en: xhsEn, zh: xhsZh },
  "audio-to-handwriting": { en: audioEn, zh: audioZh },
  "handwriting-templates-guide": { en: tplEn, zh: tplZh },
  "name-tracing-generator": { en: ntgEn, zh: ntgZh },
  "free-printable-lined-paper": { en: plpEn, zh: plpZh },
  "cursive-practice-worksheets": { en: cpwEn, zh: cpwZh },
  "kindergarten-handwriting-paper": { en: khpEn, zh: khpZh },
  "letter-to-santa-template": { en: lstEn, zh: lstZh },
  "handwritten-thank-you-notes": { en: htnEn, zh: htnZh },
  "diy-wedding-calligraphy": { en: dwcEn, zh: dwcZh },
  "pen-pal-letters-for-kids": { en: pplEn, zh: pplZh },
  "how-to-improve-handwriting-adults": { en: ihaEn, zh: ihaZh },
  "handwriting-practice-struggling-writers": { en: hswEn, zh: hswZh },
  "how-to-write-in-cursive": { en: hwcEn, zh: hwcZh },
  "cursive-alphabet-chart": { en: cacEn, zh: cacZh },
  "cursive-name-signature": { en: cnsEn, zh: cnsZh },
  "is-cursive-still-taught": { en: icsEn, zh: icsZh },
  "cursive-vs-print": { en: cvpEn, zh: cvpZh },
  "how-to-teach-cursive-kids": { en: htcEn, zh: htcZh },
  "handwriting-vs-typing-brain": { en: bvtEn, zh: bvtZh },
  "how-to-improve-your-handwriting": { en: hiyEn, zh: hiyZh },
  "sight-word-tracing-worksheets": { en: swtEn },
  "handwriting-workbook": { en: hwbEn },
  "how-many-sheets-handwriting": { en: hshEn },
  "cursive-text-generator": { en: ctgEn },
  "cursive-sentences-to-practice": { en: cstEn },
  "copywork-generator": { en: cwgEn },
  "name-tracing-with-lines": { en: ntlEn, zh: ntlZh },
  "calligraphy-motto-cards": { en: cmcEn, zh: cmcZh },
  "november-in-cursive": { en: novEn },
  "cursive-laws-by-state": { en: clbEn },
  "best-cursive-fonts": { en: bcfEn },
  "print-handwritten-letters-and-envelopes": { en: phlEn },
  "tracing-numbers-by-age": { en: tnaEn },
  "spelling-list-word-work": { en: slwEn },
  "color-a-name-before-tracing": { en: cnbEn },
  "one-character-in-the-grid": { en: ocgEn },
  "practice-one-handwriting-problem": { en: pohEn },
  "handwriting-worksheets": { en: hwsEn, zh: hwsZh },
  "numbers-in-cursive": { en: nicEn, zh: nicZh },
  "graphisme-maternelle": { en: gpmEn },
  "quiet-voice-before-handwriting": { en: qvhEn },
  "handwriting-personality-test": { en: hptEn },
  "bubble-letters-for-a-display-name": { en: bldEn },
};

/** 该文章在哪些语言下有正文(sitemap / blog 索引用它过滤,避免 404 URL 进 sitemap) */
export function postLocales(slug: string): Locale[] {
  const entry = BLOG_CONTENT[slug];
  if (!entry) return [];
  return (Object.keys(entry) as Locale[]).filter((l) => Boolean(entry[l]));
}
