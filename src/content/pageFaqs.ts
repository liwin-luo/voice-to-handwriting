import type { FaqEntry, FaqItem } from "@/content/faqs";
import type { Locale } from "@/i18n/routing";

/** /cursive-worksheets。免费题放最后，第一条留给「怎么做一张练习纸」。 */
export const CURSIVE_WORKSHEET_FAQS: FaqItem[] = [
  {
    id: "cw-list",
    i18n: { en: {
        q: "How do I make a cursive worksheet from my own words?",
        a: "Paste one word or sentence per line. Those lines repeat down a three-line sheet. The page opens on the large row height. Download the PDF, or a PNG of the page on screen. Nothing you type is uploaded.",
      }, zh: { q: "怎样用自己的词生成一张连笔字描红纸?", a: "一词或一句占一行。这些行会在三线格上往下重复。页面默认是大行高。可以下载 PDF，或下载屏幕上这一页的 PNG。输入的文字不会上传。" } },
  },
  {
    id: "cw-guides",
    i18n: { en: {
        q: "What do the green dot and red arrow show?",
        a: "Where the pencil lands, and the direction of the first stroke. They are on by default for Sacramento, the font this page opens with, and for Cedarville Cursive. They are the start of the letter, not a numbered stroke diagram. Blank tracing rows hide them.",
      }, zh: { q: "绿点和红箭头表示什么?", a: "铅笔落下的位置，以及第一笔的方向。本页默认字体 Sacramento 和 Cedarville Cursive 都会显示，并且默认打开。它们只标出这一笔的起点，不是带编号的完整笔顺图。空白描红行不画它们。" } },
  },
  {
    id: "cw-free",
    i18n: { en: {
        q: "Is the cursive worksheet generator free?",
        a: "Yes. No signup. The PDF and PNG from this page do not add a site watermark.",
      }, zh: { q: "这个连笔字描红生成器免费吗?", a: "免费，无需注册。这一页下载的 PDF 和 PNG 不加站点水印。" } },
  },
];

/** /templates 索引。详情页用 templateDetailFaqs，问法不跟这里重复。 */
export const TEMPLATE_FAQS: FaqItem[] = [
  {
    id: "tpl-what",
    i18n: { en: {
        q: "What is in a handwriting template?",
        a: "A finished message, plus a font, paper, and ink already chosen. Open a card and the editor loads that sample. You can change the words, the font, the paper, and the ink before you export a PNG or PDF.",
      }, zh: { q: "一份手写模板里有什么?", a: "一段写好的文字，以及已经配好的字体、纸张和墨色。打开一张卡片，编辑器会载入这篇范文。导出 PNG 或 PDF 之前，文字、字体、纸张和墨色都可以改。" } },
  },
  {
    id: "tpl-edit",
    i18n: { en: {
        q: "Can I change the words in a template?",
        a: "Yes. The sample is a starting point. After you open it, every line in the editor can be rewritten. The text stays in your browser.",
      }, zh: { q: "模板里的文字可以改吗?", a: "可以。范文只是起点。打开之后，编辑器里的每一行都能改。文字留在你的浏览器里。" } },
  },
  {
    id: "tpl-blank",
    i18n: { en: {
        q: "Can I start from a blank page instead?",
        a: "Yes. The handwriting tool opens empty. Templates are only for when you want a sample message and a style already paired.",
        link: { href: "/", label: "Handwriting tool" },
      }, zh: { q: "可以从空白页开始写吗?", a: "可以。手写工具打开时是空的。模板只是在你想要一篇现成文字和配套样式时用。", link: { href: "/", label: "手写工具" } } },
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
  }, zh: {
    useQ: (title) => `「${title}」要怎么用?`,
    useA: (description, useLabel) =>
      `${description}点「${useLabel}」会在手写编辑器里打开这篇范文，字体、纸张和墨色已经按这个模板设好。`,
    editQ: (title) => `「${title}」里的字可以改吗?`,
    editA: (firstLine) =>
      `可以。范文从「${firstLine}」起头。编辑器里每一行都能改。文字留在浏览器里，不会上传。`,
    printQ: (title) => `「${title}」要怎么打印?`,
    printA: (useLabel) => `点「${useLabel}」会把手写工具打开，并填好这段文字。导出 PDF 再打印，或导出 PNG。`,
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
      }, zh: { q: "怎样打印 1 到 10 的数字描红纸?", a: "页面打开就是 1 到 10,一个数字一页,字体是 Patrick Hand。第一行是实心,下面是虚线。需要十几的数字时,换成 1 到 20。下载 PDF。输入的文字不会上传。", link: { href: "/blog/tracing-numbers-by-age", label: "按年龄描数字" } } },
  },
  {
    id: "num-free",
    i18n: { en: {
        q: "Are number tracing worksheets free?",
        a: "Yes. No account and no watermark. The pages repeat a numeral. How many objects that numeral stands for stays a lesson at the table.",
      }, zh: { q: "数字描红纸免费吗?", a: "免费。不用账号,也没有水印。这些页重复一个数字。这个数字表示多少,留在桌上用实物讲。" } },
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
      }, zh: { q: "怎么做一张自己的手写练习纸?", a: "一行输入一个单词,或者一行一个短句。词表第一遍印成深色范字,后面的行都是浅色虚线描红。选好行高,下载 PDF,按实际尺寸打印。输入的内容不会上传。", link: { href: "/cursive-worksheets", label: "同一份词表的连笔版" } } },
  },
  {
    id: "worksheet-font",
    i18n: { en: {
        q: "Which font do the worksheets use?",
        a: "Neat print defaults to Patrick Hand, an open-source handwriting font. It is close to classroom print, but not a school textbook font, so a few letterforms may differ from your curriculum. You can switch to any font in the list.",
        link: { href: "/name-tracing", label: "Letter-by-letter print practice" },
      }, zh: { q: "练习纸用的是什么字体?", a: "印刷体默认是 Patrick Hand,一款开源手写字体。它接近课堂印刷体,但不是教材规范体,个别字形会和课本略有差别。字体列表里的任何一款都可以换着用。" } },
  },
  {
    id: "worksheet-names",
    i18n: { en: {
        q: "Can I use it for names too?",
        a: "Yes — type one name per line. If you want each name on its own page with grade-sized rows, the name tracing generator does exactly that, with one dark example row per page.",
        link: { href: "/name-tracing", label: "Name tracing generator" },
      }, zh: { q: "也能用来练名字吗?", a: "可以——一行输入一个名字。想把每个名字单独放一页、按年级行高排,用姓名描红字帖生成器正合适,每页同样带一行深色范字。", link: { href: "/name-tracing", label: "姓名描红字帖生成器" } } },
  },
  {
    id: "worksheet-free",
    i18n: { en: {
        q: "Is this handwriting worksheet generator free?",
        a: "Yes. No signup, no watermark on the PDF or PNG, and no usage limit — everything is generated in your browser.",
      }, zh: { q: "这个手写练习纸生成器免费吗?", a: "免费。无需注册,PDF 和 PNG 都没有水印,也没有次数限制——全部在你的浏览器里生成。" } },
  },
];
