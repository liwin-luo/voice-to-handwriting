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

/** /signature-practice。第一题是怎么印这张纸,免费题放最后。 */
export const SIGNATURE_FAQS: FaqItem[] = [
  {
    id: "sig-make",
    i18n: { en: {
        q: "How do I make a signature practice sheet for my name?",
        a: "Type your name. If it has more than one word, pick the full name, the first name, or the first initial plus the last name. Choose one of the four scripts. The sheet prints that script as a solid line, a dotted line, and blank lines. Download the PDF. Nothing you type is uploaded.",
        link: { href: "/blog/how-to-practice-your-signature", label: "Seven-day practice" },
      } },
  },
  {
    id: "sig-short",
    i18n: { en: {
        q: "Why does the sheet offer a shorter signature?",
        a: "A signature has to survive a receipt line. The full name stays available. The first name, and the initial plus last name, are there so you can practice the version you can repeat quickly. The split is on spaces only. Names like de Luca stay as you typed them.",
        link: { href: "/blog/cursive-name-signature", label: "Design the signature first" },
      } },
  },
  {
    id: "sig-free",
    i18n: { en: {
        q: "Is the signature practice sheet free?",
        a: "Yes. There is no account and no watermark. The scripts are Great Vibes, Alex Brush, Allura, and Mr Dafoe, under the SIL Open Font License. They are models to trace, not your handwriting, and not a signature you can paste onto a contract.",
        link: { href: "/cursive-font-generator", label: "Preview the scripts" },
      } },
  },
];

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

/** /prewriting-strokes。 */
export const PREWRITING_FAQS: FaqItem[] = [
  {
    id: "pre-which",
    i18n: { en: {
        q: "Which strokes are on the prewriting worksheet?",
        a: "Lines are down, across, and slant. Curves are a circle, a wave, and an arch. Each stroke has a solid row, a dotted row, and a blank row. Letters stay on the letter tracing pages.",
        link: { href: "/blog/strokes-before-letter-tracing", label: "Strokes before letters" },
      } },
  },
  {
    id: "pre-free",
    i18n: { en: { q: "Are prewriting stroke worksheets free?", a: "Yes. No account and no watermark. Print the lines before the curves if the child is still learning to aim the pencil." } },
  },
];

/** /cursive-letter-joins。 */
export const CURSIVE_JOIN_FAQS: FaqItem[] = [
  {
    id: "join-pair",
    i18n: { en: {
        q: "How do I practice a cursive letter join?",
        a: "The page opens on same-direction pairs: th, ch, sh, wh, oo, ee, ll, ss. Each pair is its own page in Sacramento. The other set turns in the middle: ai, ay, ou, ow, oa, ea, ir, er. Single letters stay on the cursive alphabet.",
        link: { href: "/blog/how-to-join-cursive-letters", label: "How two letters connect" },
      } },
  },
  {
    id: "join-free",
    i18n: { en: { q: "Are the cursive join pages free?", a: "Yes. No account and no watermark. The page practices the stroke between two letters." } },
  },
];

/** /cursive-tattoo-stencil。 */
export const TATTOO_STENCIL_FAQS: FaqItem[] = [
  {
    id: "tat-mirror",
    i18n: { en: {
        q: "How do I make a cursive tattoo stencil?",
        a: "Type a phrase of up to 42 characters. Leave Mirror for transfer on. Pick a script. Download the PNG. It is black on white and flipped left to right. Turn the mirror off only when you want to read the phrase as it will sit.",
        link: { href: "/blog/export-a-mirrored-cursive-stencil", label: "Export the stencil" },
      } },
  },
  {
    id: "tat-free",
    i18n: { en: {
        q: "Is the cursive tattoo stencil free?",
        a: "Yes. No account. The scripts are open fonts. The PNG is a stencil for transfer paper. The preview is a white rectangle, and the phrase is not uploaded.",
      } },
  },
];

/** /architect-lettering。 */
export const ARCHITECT_FAQS: FaqItem[] = [
  {
    id: "arch-font",
    i18n: { en: {
        q: "What font is on the architect lettering sheet?",
        a: "Architects Daughter, the open font Kimberly Geswein published under the SIL Open Font License. The sheet prints the capitals in three rows and the digits 0 through 9. Each line is solid, then dotted, then blank. Google Fonts describes the face as a squared handwriting. Drafting stencils and school programs are different hands.",
        link: { href: "/blog/squared-hand-lettering-practice", label: "Fifteen minutes a day" },
      } },
  },
  {
    id: "arch-free",
    i18n: { en: { q: "Are architect lettering practice sheets free?", a: "Yes. No account and no watermark. The font is under the SIL Open Font License. The sheet is for tracing that hand." } },
  },
];

/** /handwriting-sentence-practice。英文回链到 practice-one-handwriting-problem;该文只有英文,其他语言不链过去。 */
export const SENTENCE_PRACTICE_FAQS: FaqItem[] = [
  {
    id: "sp-score",
    i18n: { en: {
        q: "Will this sheet score my handwriting?",
        a: "No. Pick one thing, print the page, and write it yourself. The site never sees the letters you put on the paper.",
        link: { href: "/blog/practice-one-handwriting-problem", label: "How to pick one problem" },
      } },
  },
  {
    id: "sp-three",
    i18n: { en: {
        q: "Why only three lines?",
        a: "A long session makes the hand clamp down. Write the three blank lines, then stop.",
      } },
  },
  {
    id: "sp-font",
    i18n: { en: {
        q: "Is the model my handwriting?",
        a: "No. It is a font: Patrick Hand, or Sacramento if you turn the script model on. Print locks the model to Patrick Hand.",
      } },
  },
];

export const HANDWRITING_CHECK_FAQS: FaqItem[] = [
  {
    id: "hc-clinical",
    i18n: { en: {
        q: "Is this a clinical assessment?",
        a: "It is an impression from one photo. It is not a clinical grade.",
      } },
  },
  {
    id: "hc-keep",
    i18n: { en: {
        q: "Do you keep the photo?",
        a: "No. The model looks, then the photo is discarded. The card is made in your browser.",
        link: { href: "/blog/share-a-handwriting-score-card", label: "How to share the card" },
      } },
  },
  {
    id: "hc-card",
    i18n: { en: {
        q: "Why is there sometimes no card?",
        a: "The photo needs another shot, or the writing is not Latin.",
      } },
  },
  {
    id: "hc-card-file",
    i18n: { en: {
        q: "What is on the downloaded card?",
        a: "On a tie, the page names baseline first, then size, then spacing, then slant. “Ahead of N% of people” is a fixed label for that legibility score, not a count of people. The notes beside the card stay on the page. Download saves the selected frame as handwriting-check.png and leaves the notes out. Fewer than two full lines can come back with only legibility, and the other four cells stay blank.",
      } },
  },
];

/** /handwriting-pad。免费题放最后，第一条留给「字存在哪里」。 */
export const PAD_FAQS: FaqItem[] = [
  {
    id: "pad-saved",
    i18n: { en: {
        q: "Where does the handwriting go?",
        a: "It stays in this browser. Refresh the page and the strokes, paper, ink, and width are still there, until you clear the sheet. Nothing is uploaded.",
        link: { href: "/blog/save-a-handwritten-note", label: "How to save the note" },
      } },
  },
  {
    id: "pad-png",
    i18n: { en: {
        q: "What is in the PNG?",
        a: "The sheet you write on: paper and ink, including ruled or grid lines. The buttons are not in the file.",
        link: { href: "/printable-paper", label: "Print blank paper" },
      } },
  },
  {
    id: "pad-screen",
    i18n: { en: {
        q: "Can I write on the whole screen?",
        a: "Yes. Fullscreen fills the screen with the sheet and the tools. Exit, or press Escape, to come back to this page.",
      } },
  },
  {
    id: "pad-read",
    i18n: { en: {
        q: "Does it read my handwriting?",
        a: "No. The strokes stay a picture. The page does not recognize letters, score them, or turn them into a font.",
        link: { href: "/", label: "Set typed words in a handwriting font" },
      } },
  },
  {
    id: "pad-free",
    i18n: { en: {
        q: "Is the online handwriting notepad free?",
        a: "Yes. No signup. Writing happens in your browser.",
      } },
  },
];

export const HANDWRITING_COUNT_FAQS: FaqItem[] = [
  {
    id: "hcount-keep",
    i18n: { en: {
        q: "Do you keep the photo?",
        a: "No. The model looks, then the photo is discarded. The text stays on this page until you leave or upload another.",
      } },
  },
  {
    id: "hcount-rules",
    i18n: { en: {
        q: "How do characters, words, and digits get counted?",
        a: "Chinese characters, kana, and Hangul syllables each count as one character. A word is a run of letters. An apostrophe or hyphen between letters stays inside the word and still counts as punctuation. Each digit counts as one, so 2026 is four. Punctuation is its own line.",
        link: { href: "/blog/count-words-in-handwriting", label: "How to count words in handwriting" },
      } },
  },
  {
    id: "hcount-unread",
    i18n: { en: {
        q: "What if a mark is unreadable?",
        a: "That spot is a □ and is left out of the count. Edit the text and the numbers update.",
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
        link: { href: "/letter-tracing", label: "Letter-by-letter print practice" },
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
