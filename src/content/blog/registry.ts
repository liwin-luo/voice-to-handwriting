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
import cardDe from "./handwritten-card-with-voice.de.mdx";
import cardFr from "./handwritten-card-with-voice.fr.mdx";
import cardPt from "./handwritten-card-with-voice.pt.mdx";
import genDe from "./handwriting-image-generator.de.mdx";
import genFr from "./handwriting-image-generator.fr.mdx";
import genPt from "./handwriting-image-generator.pt.mdx";
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
import bvtEn from "./handwriting-vs-typing-brain.en.mdx";
import hiyEn from "./how-to-improve-your-handwriting.en.mdx";
import swtEn from "./sight-word-tracing-worksheets.en.mdx";
import hrpEn from "./handwriting-repeater.en.mdx";
import hwbEn from "./handwriting-workbook.en.mdx";
import hshEn from "./how-many-sheets-handwriting.en.mdx";
import ctgEn from "./cursive-text-generator.en.mdx";
import cstEn from "./cursive-sentences-to-practice.en.mdx";
import cwgEn from "./copywork-generator.en.mdx";


// 18 篇原仅英文文章的 7 语言补全(zh/ja/ko/de/fr/es/pt)
import ntgZh from "./name-tracing-generator.zh.mdx";
import ntgJa from "./name-tracing-generator.ja.mdx";
import ntgKo from "./name-tracing-generator.ko.mdx";
import ntgDe from "./name-tracing-generator.de.mdx";
import ntgFr from "./name-tracing-generator.fr.mdx";
import ntgEs from "./name-tracing-generator.es.mdx";
import ntgPt from "./name-tracing-generator.pt.mdx";
import plpZh from "./free-printable-lined-paper.zh.mdx";
import plpJa from "./free-printable-lined-paper.ja.mdx";
import plpKo from "./free-printable-lined-paper.ko.mdx";
import plpDe from "./free-printable-lined-paper.de.mdx";
import plpFr from "./free-printable-lined-paper.fr.mdx";
import plpEs from "./free-printable-lined-paper.es.mdx";
import plpPt from "./free-printable-lined-paper.pt.mdx";
import cpwZh from "./cursive-practice-worksheets.zh.mdx";
import cpwJa from "./cursive-practice-worksheets.ja.mdx";
import cpwKo from "./cursive-practice-worksheets.ko.mdx";
import cpwDe from "./cursive-practice-worksheets.de.mdx";
import cpwFr from "./cursive-practice-worksheets.fr.mdx";
import cpwEs from "./cursive-practice-worksheets.es.mdx";
import cpwPt from "./cursive-practice-worksheets.pt.mdx";
import khpZh from "./kindergarten-handwriting-paper.zh.mdx";
import khpJa from "./kindergarten-handwriting-paper.ja.mdx";
import khpKo from "./kindergarten-handwriting-paper.ko.mdx";
import khpDe from "./kindergarten-handwriting-paper.de.mdx";
import khpFr from "./kindergarten-handwriting-paper.fr.mdx";
import khpEs from "./kindergarten-handwriting-paper.es.mdx";
import khpPt from "./kindergarten-handwriting-paper.pt.mdx";
import lstZh from "./letter-to-santa-template.zh.mdx";
import lstJa from "./letter-to-santa-template.ja.mdx";
import lstKo from "./letter-to-santa-template.ko.mdx";
import lstDe from "./letter-to-santa-template.de.mdx";
import lstFr from "./letter-to-santa-template.fr.mdx";
import lstEs from "./letter-to-santa-template.es.mdx";
import lstPt from "./letter-to-santa-template.pt.mdx";
import htnZh from "./handwritten-thank-you-notes.zh.mdx";
import htnJa from "./handwritten-thank-you-notes.ja.mdx";
import htnKo from "./handwritten-thank-you-notes.ko.mdx";
import htnDe from "./handwritten-thank-you-notes.de.mdx";
import htnFr from "./handwritten-thank-you-notes.fr.mdx";
import htnEs from "./handwritten-thank-you-notes.es.mdx";
import htnPt from "./handwritten-thank-you-notes.pt.mdx";
import dwcZh from "./diy-wedding-calligraphy.zh.mdx";
import dwcJa from "./diy-wedding-calligraphy.ja.mdx";
import dwcKo from "./diy-wedding-calligraphy.ko.mdx";
import dwcDe from "./diy-wedding-calligraphy.de.mdx";
import dwcFr from "./diy-wedding-calligraphy.fr.mdx";
import dwcEs from "./diy-wedding-calligraphy.es.mdx";
import dwcPt from "./diy-wedding-calligraphy.pt.mdx";
import pplZh from "./pen-pal-letters-for-kids.zh.mdx";
import pplJa from "./pen-pal-letters-for-kids.ja.mdx";
import pplKo from "./pen-pal-letters-for-kids.ko.mdx";
import pplDe from "./pen-pal-letters-for-kids.de.mdx";
import pplFr from "./pen-pal-letters-for-kids.fr.mdx";
import pplEs from "./pen-pal-letters-for-kids.es.mdx";
import pplPt from "./pen-pal-letters-for-kids.pt.mdx";
import ihaZh from "./how-to-improve-handwriting-adults.zh.mdx";
import ihaJa from "./how-to-improve-handwriting-adults.ja.mdx";
import ihaKo from "./how-to-improve-handwriting-adults.ko.mdx";
import ihaDe from "./how-to-improve-handwriting-adults.de.mdx";
import ihaFr from "./how-to-improve-handwriting-adults.fr.mdx";
import ihaEs from "./how-to-improve-handwriting-adults.es.mdx";
import ihaPt from "./how-to-improve-handwriting-adults.pt.mdx";
import hswZh from "./handwriting-practice-struggling-writers.zh.mdx";
import hswJa from "./handwriting-practice-struggling-writers.ja.mdx";
import hswKo from "./handwriting-practice-struggling-writers.ko.mdx";
import hswDe from "./handwriting-practice-struggling-writers.de.mdx";
import hswFr from "./handwriting-practice-struggling-writers.fr.mdx";
import hswEs from "./handwriting-practice-struggling-writers.es.mdx";
import hswPt from "./handwriting-practice-struggling-writers.pt.mdx";
import hwcZh from "./how-to-write-in-cursive.zh.mdx";
import hwcJa from "./how-to-write-in-cursive.ja.mdx";
import hwcKo from "./how-to-write-in-cursive.ko.mdx";
import hwcDe from "./how-to-write-in-cursive.de.mdx";
import hwcFr from "./how-to-write-in-cursive.fr.mdx";
import hwcEs from "./how-to-write-in-cursive.es.mdx";
import hwcPt from "./how-to-write-in-cursive.pt.mdx";
import cacZh from "./cursive-alphabet-chart.zh.mdx";
import cacJa from "./cursive-alphabet-chart.ja.mdx";
import cacKo from "./cursive-alphabet-chart.ko.mdx";
import cacDe from "./cursive-alphabet-chart.de.mdx";
import cacFr from "./cursive-alphabet-chart.fr.mdx";
import cacEs from "./cursive-alphabet-chart.es.mdx";
import cacPt from "./cursive-alphabet-chart.pt.mdx";
import cnsZh from "./cursive-name-signature.zh.mdx";
import cnsJa from "./cursive-name-signature.ja.mdx";
import cnsKo from "./cursive-name-signature.ko.mdx";
import cnsDe from "./cursive-name-signature.de.mdx";
import cnsFr from "./cursive-name-signature.fr.mdx";
import cnsEs from "./cursive-name-signature.es.mdx";
import cnsPt from "./cursive-name-signature.pt.mdx";
import icsZh from "./is-cursive-still-taught.zh.mdx";
import icsJa from "./is-cursive-still-taught.ja.mdx";
import icsKo from "./is-cursive-still-taught.ko.mdx";
import icsPt from "./is-cursive-still-taught.pt.mdx";
import cvpZh from "./cursive-vs-print.zh.mdx";
import cvpJa from "./cursive-vs-print.ja.mdx";
import cvpKo from "./cursive-vs-print.ko.mdx";
import cvpDe from "./cursive-vs-print.de.mdx";
import cvpFr from "./cursive-vs-print.fr.mdx";
import cvpEs from "./cursive-vs-print.es.mdx";
import cvpPt from "./cursive-vs-print.pt.mdx";
import htcZh from "./how-to-teach-cursive-kids.zh.mdx";
import htcJa from "./how-to-teach-cursive-kids.ja.mdx";
import htcKo from "./how-to-teach-cursive-kids.ko.mdx";
import htcDe from "./how-to-teach-cursive-kids.de.mdx";
import htcFr from "./how-to-teach-cursive-kids.fr.mdx";
import htcEs from "./how-to-teach-cursive-kids.es.mdx";
import htcPt from "./how-to-teach-cursive-kids.pt.mdx";
import bvtZh from "./handwriting-vs-typing-brain.zh.mdx";
import bvtJa from "./handwriting-vs-typing-brain.ja.mdx";
import bvtKo from "./handwriting-vs-typing-brain.ko.mdx";
import bvtDe from "./handwriting-vs-typing-brain.de.mdx";
import bvtFr from "./handwriting-vs-typing-brain.fr.mdx";
import bvtEs from "./handwriting-vs-typing-brain.es.mdx";
import bvtPt from "./handwriting-vs-typing-brain.pt.mdx";
import hiyZh from "./how-to-improve-your-handwriting.zh.mdx";
import hiyJa from "./how-to-improve-your-handwriting.ja.mdx";
import hiyKo from "./how-to-improve-your-handwriting.ko.mdx";
import hiyDe from "./how-to-improve-your-handwriting.de.mdx";
import hiyFr from "./how-to-improve-your-handwriting.fr.mdx";
import hiyEs from "./how-to-improve-your-handwriting.es.mdx";
import hiyPt from "./how-to-improve-your-handwriting.pt.mdx";

/** slug → 语言 → 内容组件;新增文章:建 <slug>.<locale>.mdx 后在此注册。
 * 值允许 Partial:仅部分语言有正文时,页面按语言 404,sitemap/索引按 availableLocales 过滤 */
export const BLOG_CONTENT: Record<string, Partial<Record<Locale, ComponentType>>> = {
  "what-does-your-handwriting-say-about-you": { zh: wdzh, en: wden, ja: wdja, ko: wdko, es: wdes, de: wdde, fr: wdfr, pt: wdpt },
  "handwritten-card-with-voice": { zh: cardZh, en: cardEn, ja: cardJa, ko: cardKo, es: cardEs, de: cardDe, fr: cardFr, pt: cardPt },
  "handwriting-image-generator": { zh: genZh, en: genEn, ja: genJa, ko: genKo, es: genEs, de: genDe, fr: genFr, pt: genPt },
  "xiaohongshu-handwritten-images": { zh: xhsZh, en: xhsEn, ja: xhsJa, ko: xhsKo, pt: xhsPt },
  "audio-to-handwriting": { zh: audioZh, en: audioEn, ja: audioJa, ko: audioKo, es: audioEs, de: audioDe, fr: audioFr, pt: audioPt },
  "handwriting-templates-guide": { zh: tplZh, en: tplEn, ja: tplJa, ko: tplKo, es: tplEs, de: tplGDe, fr: tplGFr, pt: tplGPt },
  "name-tracing-generator": { en: ntgEn, zh: ntgZh, ja: ntgJa, ko: ntgKo, de: ntgDe, fr: ntgFr, es: ntgEs, pt: ntgPt },
  "free-printable-lined-paper": { en: plpEn, zh: plpZh, ja: plpJa, ko: plpKo, de: plpDe, fr: plpFr, es: plpEs, pt: plpPt },
  "cursive-practice-worksheets": { en: cpwEn, zh: cpwZh, ja: cpwJa, ko: cpwKo, de: cpwDe, fr: cpwFr, es: cpwEs, pt: cpwPt },
  "kindergarten-handwriting-paper": { en: khpEn, zh: khpZh, ja: khpJa, ko: khpKo, de: khpDe, fr: khpFr, es: khpEs, pt: khpPt },
  "letter-to-santa-template": { en: lstEn, zh: lstZh, ja: lstJa, ko: lstKo, de: lstDe, fr: lstFr, es: lstEs, pt: lstPt },
  "handwritten-thank-you-notes": { en: htnEn, zh: htnZh, ja: htnJa, ko: htnKo, de: htnDe, fr: htnFr, es: htnEs, pt: htnPt },
  "diy-wedding-calligraphy": { en: dwcEn, zh: dwcZh, ja: dwcJa, ko: dwcKo, de: dwcDe, fr: dwcFr, es: dwcEs, pt: dwcPt },
  "pen-pal-letters-for-kids": { en: pplEn, zh: pplZh, ja: pplJa, ko: pplKo, de: pplDe, fr: pplFr, es: pplEs, pt: pplPt },
  "how-to-improve-handwriting-adults": { en: ihaEn, zh: ihaZh, ja: ihaJa, ko: ihaKo, de: ihaDe, fr: ihaFr, es: ihaEs, pt: ihaPt },
  "handwriting-practice-struggling-writers": { en: hswEn, zh: hswZh, ja: hswJa, ko: hswKo, de: hswDe, fr: hswFr, es: hswEs, pt: hswPt },
  "how-to-write-in-cursive": { en: hwcEn, zh: hwcZh, ja: hwcJa, ko: hwcKo, de: hwcDe, fr: hwcFr, es: hwcEs, pt: hwcPt },
  "cursive-alphabet-chart": { en: cacEn, zh: cacZh, ja: cacJa, ko: cacKo, de: cacDe, fr: cacFr, es: cacEs, pt: cacPt },
  "cursive-name-signature": { en: cnsEn, zh: cnsZh, ja: cnsJa, ko: cnsKo, de: cnsDe, fr: cnsFr, es: cnsEs, pt: cnsPt },
  "is-cursive-still-taught": { en: icsEn, zh: icsZh, ja: icsJa, ko: icsKo, pt: icsPt },
  "cursive-vs-print": { en: cvpEn, zh: cvpZh, ja: cvpJa, ko: cvpKo, de: cvpDe, fr: cvpFr, es: cvpEs, pt: cvpPt },
  "how-to-teach-cursive-kids": { en: htcEn, zh: htcZh, ja: htcJa, ko: htcKo, de: htcDe, fr: htcFr, es: htcEs, pt: htcPt },
  "handwriting-vs-typing-brain": { en: bvtEn, zh: bvtZh, ja: bvtJa, ko: bvtKo, de: bvtDe, fr: bvtFr, es: bvtEs, pt: bvtPt },
  "how-to-improve-your-handwriting": { en: hiyEn, zh: hiyZh, ja: hiyJa, ko: hiyKo, de: hiyDe, fr: hiyFr, es: hiyEs, pt: hiyPt },
  "sight-word-tracing-worksheets": { en: swtEn },
  "handwriting-repeater": { en: hrpEn },
  "handwriting-workbook": { en: hwbEn },
  "how-many-sheets-handwriting": { en: hshEn },
  "cursive-text-generator": { en: ctgEn },
  "cursive-sentences-to-practice": { en: cstEn },
  "copywork-generator": { en: cwgEn },
};

/** 该文章在哪些语言下有正文(sitemap / blog 索引用它过滤,避免 404 URL 进 sitemap) */
export function postLocales(slug: string): Locale[] {
  const entry = BLOG_CONTENT[slug];
  if (!entry) return [];
  return (Object.keys(entry) as Locale[]).filter((l) => Boolean(entry[l]));
}
