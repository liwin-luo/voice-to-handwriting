import type { FaqEntry, FaqItem } from "@/content/faqs";
import type { Locale } from "@/i18n/routing";

/** /cursive-worksheets。免费题放最后，第一条留给「怎么做一张练习纸」。 */
export const CURSIVE_WORKSHEET_FAQS: FaqItem[] = [
  {
    id: "cw-list",
    i18n: { en: {
        q: "How do I make a cursive worksheet from my own words?",
        a: "Paste one word or sentence per line. Those lines repeat down a three-line sheet. The page opens on the large row height. Download the PDF, or a PNG of the page on screen. Nothing you type is uploaded.",
      } },
  },
  {
    id: "cw-guides",
    i18n: { en: {
        q: "What do the green dot and red arrow show?",
        a: "Where the pencil lands, and the direction of the first stroke. They are on by default for Sacramento, the font this page opens with, and for Cedarville Cursive. They are the start of the letter, not a numbered stroke diagram. Blank tracing rows hide them.",
      } },
  },
  {
    id: "cw-free",
    i18n: { en: {
        q: "Is the cursive worksheet generator free?",
        a: "Yes. No signup. The PDF and PNG from this page do not add a site watermark.",
      } },
  },
];

/** /templates 索引。详情页用 templateDetailFaqs，问法不跟这里重复。 */
export const TEMPLATE_FAQS: FaqItem[] = [
  {
    id: "tpl-what",
    i18n: { en: {
        q: "What is in a handwriting template?",
        a: "A finished message, plus a font, paper, and ink already chosen. Open a card and the editor loads that sample. You can change the words, the font, the paper, and the ink before you export a PNG or PDF.",
      } },
  },
  {
    id: "tpl-edit",
    i18n: { en: {
        q: "Can I change the words in a template?",
        a: "Yes. The sample is a starting point. After you open it, every line in the editor can be rewritten. The text stays in your browser.",
      } },
  },
  {
    id: "tpl-blank",
    i18n: { en: {
        q: "Can I start from a blank page instead?",
        a: "Yes. The handwriting tool opens empty. Templates are only for when you want a sample message and a style already paired.",
        link: { href: "/", label: "Handwriting tool" },
      } },
  },
];

type DetailCopy = {
  useQ: (title: string) => string;
  useA: (description: string, useLabel: string) => string;
  editQ: (title: string) => string;
  editA: (firstLine: string) => string;
  printQ: (title: string) => string;
  printA: (useLabel: string) => string;
};

const DETAIL: Record<Locale, DetailCopy> = { en: {
    useQ: (title) => `How do I use “${title}”?`,
    useA: (description, useLabel) =>
      `${description} ${useLabel} opens this sample in the handwriting editor, with this template's font, paper, and ink already set.`,
    editQ: (title) => `Can I change the words in “${title}”?`,
    editA: (firstLine) =>
      `Yes. The sample starts with “${firstLine}”. Rewrite any line in the editor. The text stays in your browser and is not uploaded.`,
    printQ: (title) => `How do I print “${title}”?`,
    printA: (useLabel) =>
      `${useLabel} opens the handwriting tool with this message filled in. Export a PDF to print, or a PNG.`,
  } };

/** 详情页 FAQ：题干和范文首行带上这一篇的标题，13 张模板不会输出同一组问答。 */
export function templateDetailFaqs(
  meta: { title: string; description: string; text: string },
  locale: Locale,
  useLabel: string,
): FaqEntry[] {
  const copy = DETAIL[locale];
  const firstLine = meta.text.split("\n").map((line) => line.trim()).find(Boolean) ?? meta.title;
  return [
    { q: copy.useQ(meta.title), a: copy.useA(meta.description, useLabel) },
    { q: copy.editQ(meta.title), a: copy.editA(firstLine) },
    { q: copy.printQ(meta.title), a: copy.printA(useLabel) },
  ];
}

/** /number-tracing。免费题放最后。 */
export const NUMBER_TRACING_FAQS: FaqItem[] = [
  {
    id: "num-page",
    i18n: { en: {
        q: "How do I print a number tracing worksheet for 1 to 10?",
        a: "The page opens on 1 through 10, one number per page, in Patrick Hand. The first row is solid. The rows under it are dotted. Switch to 1 through 20 when you need the teens. Download the PDF. Nothing you type is uploaded.",
        link: { href: "/blog/tracing-numbers-by-age", label: "Number tracing by age" },
      } },
  },
  {
    id: "num-free",
    i18n: { en: {
        q: "Are number tracing worksheets free?",
        a: "Yes. No account and no watermark. The pages repeat a numeral. How many objects that numeral stands for stays a lesson at the table.",
      } },
  },
];

/** /handwriting-worksheet-generator。/letter-tracing 是 en-only,字体题只有英文带链接;免费题放最后。 */
export const HANDWRITING_WORKSHEET_FAQS: FaqItem[] = [
  {
    id: "worksheet-make",
    i18n: { en: {
        q: "How do I make my own handwriting worksheet?",
        a: "Type your words one per line — or one short sentence per line. The first pass through your list prints solid to copy, and the rows after it are dotted to trace. Pick a row height, download the PDF, and print at actual size. Nothing you type is uploaded.",
        link: { href: "/cursive-worksheets", label: "Same list in cursive" },
      } },
  },
  {
    id: "worksheet-font",
    i18n: { en: {
        q: "Which font do the worksheets use?",
        a: "Neat print defaults to Patrick Hand, an open-source handwriting font. It is close to classroom print, but not a school textbook font, so a few letterforms may differ from your curriculum. You can switch to any font in the list.",
        link: { href: "/name-tracing", label: "Letter-by-letter print practice" },
      } },
  },
  {
    id: "worksheet-names",
    i18n: { en: {
        q: "Can I use it for names too?",
        a: "Yes — type one name per line. If you want each name on its own page with grade-sized rows, the name tracing generator does exactly that, with one dark example row per page.",
        link: { href: "/name-tracing", label: "Name tracing generator" },
      } },
  },
  {
    id: "worksheet-free",
    i18n: { en: {
        q: "Is this handwriting worksheet generator free?",
        a: "Yes. No signup, no watermark on the PDF or PNG, and no usage limit — everything is generated in your browser.",
      } },
  },
];
