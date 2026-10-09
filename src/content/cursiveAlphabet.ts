import type { FaqEntry } from "@/content/faqs";
import { CURSIVE_LETTERS } from "@/content/cursiveLetters";

/** /cursive-alphabet 交互式连笔字母表(Phase 0 仅 en,其他语言 404、sitemap 仅 en 变体)。
 *  文案放本模块而非 messages/:EN-only 内容层,且 standards.test.ts 强制 messages
 *  八语言 key 一致,不应为单语内容扩 key(同 cursiveLetters.ts 的约定)。 */

export interface AlphabetFont {
  id: string;
  /** 选择器里的展示名(en) */
  label: string;
  /** print 字体在 UI 里标注出来,供 cursive vs print 对照 */
  isPrint: boolean;
}

/** 教学优先排序:Sacramento 最近 D'Nealian 连续笔画;末尾两款 print 字体供对照 */
export const ALPHABET_FONTS: AlphabetFont[] = [
  { id: "sacramento", label: "Sacramento · teaching cursive", isPrint: false },
  { id: "cedarvillecursive", label: "Cedarville · everyday cursive", isPrint: false },
  { id: "dancingscript", label: "Dancing Script · elegant", isPrint: false },
  { id: "caveat", label: "Caveat · casual pen", isPrint: false },
  { id: "kalam", label: "Kalam · print (compare)", isPrint: true },
  { id: "patrickhand", label: "Patrick Hand · print (compare)", isPrint: true },
];

export interface AlphabetEntry {
  /** 小写字符,如 "a" */
  lower: string;
  /** 大写字符,如 "A" */
  capital: string;
  /** 字母矩阵页 slug(小写/大写),Phase 0 只有 12 个字母有 */
  lowerSlug?: string;
  capitalSlug?: string;
  /** 矩阵页里的练习词(没有矩阵页则无) */
  words?: string[];
}

function letterEntry(ch: string): { lowerSlug?: string; capitalSlug?: string; words?: string[] } {
  const lower = CURSIVE_LETTERS.find((l) => l.form === "lowercase" && l.letter === ch);
  const capital = CURSIVE_LETTERS.find((l) => l.form === "capital" && l.letter === ch.toUpperCase());
  return {
    lowerSlug: lower?.slug,
    capitalSlug: capital?.slug,
    words: lower?.copy.en?.words,
  };
}

function buildAlphabet(): AlphabetEntry[] {
  const out: AlphabetEntry[] = [];
  for (let i = 0; i < 26; i++) {
    const ch = String.fromCharCode(97 + i); // "a" 起
    out.push({ lower: ch, capital: ch.toUpperCase(), ...letterEntry(ch) });
  }
  return out;
}

/** 26 个字母 × 大小写,数组顺序即展示顺序;slug 由字母矩阵注册表解析,未上线的字母无链接 */
export const ALPHABET: AlphabetEntry[] = buildAlphabet();

/** 页面与面板的全部 en 文案与控件标签 */
export const ALPHABET_PAGE = {
  metaTitle: "Cursive Alphabet Chart — Interactive, with Stroke Guides & Printable PDF",
  metaDescription:
    "Every cursive letter from A to Z, uppercase and lowercase, with start-dot and arrow stroke guides. Tap a letter to see how it flows, switch teaching fonts, and print or download the chart free — no signup.",
  h1: "Cursive Alphabet: Every Letter, A to Z",
  intro:
    "Tap any letter to see it full size on a three-line guide, with a green dot marking where the pen lands and an arrow showing the first stroke direction. Switch between a D'Nealian-style teaching cursive and everyday handwriting fonts, then download the practice sheet or the whole chart as a printable PDF — free, no email wall.",
  seoTitle: "A free interactive cursive alphabet chart",
  seoText:
    "A cursive alphabet chart shows all 26 letters in both capital and lowercase forms so you can see each shape, its starting point, and how it connects to the next letter. Most charts online are static pictures: this one is interactive, so you can pick a letter, watch where the pen lands, and compare a D'Nealian-style teaching cursive (Sacramento) with everyday handwriting fonts before you commit anything to paper.\n\nCapitals and lowercase letters follow different logic. Capitals share shapes with print writing but gain entry flourishes; lowercase letters are rebuilt around continuous strokes and exit connectors — which is why letters like b, f, g, and z trip up almost everyone. Twelve of the hardest letters have their own step-by-step lessons on this site, linked right from the chart.\n\nWhen you are ready to practice, download the letter sheet or the full A–Z chart as a PDF: solid example on top, dashed traceable copy below, start dots and direction arrows included. It prints on standard letter or A4 paper and pairs with the site's cursive worksheet generator if you want custom words.",
  faqs: [
    {
      q: "What is the cursive alphabet?",
      a: "The 26 letters of the Latin alphabet written in a connected style, where most letters end with an exit stroke that flows into the next letter. A full chart shows each letter in capital and lowercase form, ideally with the starting point and stroke direction marked — that is what the green dots and arrows on this page do.",
    },
    {
      q: "Which cursive font matches what schools teach?",
      a: "Most US classrooms use either Zaner-Bloser or D'Nealian styles. Sacramento, the default font here, is an open-source font with continuous entry and exit strokes, which makes it the closest free match to D'Nealian cursive. Cedarville Cursive is closer to natural everyday handwriting. Neither is an official school font, but both are honest practice models — your hand will develop its own version.",
    },
    {
      q: "How do I print the cursive alphabet chart?",
      a: "Use the download buttons under the letter panel: the PNG gives you the current letter's practice sheet, and the PDF gives you the full A–Z chart with solid examples, dashed traceable rows, and stroke guides. Files are generated in your browser — nothing is uploaded, and there is no signup or email wall.",
    },
    {
      q: "What order should I learn the cursive alphabet in?",
      a: "By stroke family rather than A to Z: start with letters built from simple up-and-over strokes (i, t, u, w), then cursive climbs like e and l, then bumps (n, m, h), then the harder loops and descenders (b, f, g, j, q, z). The step-by-step lessons linked from this chart follow that order for the trickiest letters.",
    },
    {
      q: "Why do these letters look different from my old school chart?",
      a: "Every cursive tradition — Zaner-Bloser, D'Nealian, Palmer, italic — draws the same 26 letters with slightly different flourishes, and this site uses open-source fonts rather than a licensed school script. The stroke logic and starting points transfer between them; treat the differences as dialects, not mistakes.",
    },
  ] satisfies FaqEntry[],
};

/** 面板控件标签(en-only) */
export const ALPHABET_UI = {
  fontLabel: "Font",
  guidesLabel: "Stroke guides (start dot & arrow)",
  exampleCaption: "Solid example",
  practiceCaption: "Dashed copy — trace it",
  downloadPng: "Letter sheet PNG",
  downloadPdf: "Full A–Z chart PDF",
  wordsLabel: "Words to practice",
  lessonCta: "Open the step-by-step lesson",
  printNote: "Compare the print fonts (Kalam, Patrick Hand) with cursive to see why the connected strokes change letter shapes.",
};
