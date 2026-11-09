import type { FaqItem } from "@/content/faqs";
import type { Locale } from "@/i18n/routing";

type Row = { q: string; a: string; link?: { href: string; label: string } };

function item(id: string, rows: Record<Locale, Row>): FaqItem {
  return { id, i18n: rows };
}

const college = [
  item("college-ruled-what", { en: {
      q: "What is college ruled paper?",
      a: "College ruled paper leaves 9/32 inch (7.1 mm) between lines, with a red left margin. Wide ruled is wider, at 11/32 inch (8.7 mm). Narrow ruled is tighter, at 1/4 inch (6.4 mm).",
      link: { href: "/printable-paper/wide-ruled", label: "Wide ruled paper" },
    }, zh: { q: "窄行横线纸是什么?", a: "窄行(college ruled)大约从三年级用到大学:行距 7.1 毫米(9/32 英寸),左侧一条红边。宽行是更宽的那张,行距 8.7 毫米(11/32 英寸)。", link: { href: "/printable-paper/wide-ruled", label: "宽行横线" } } }),
  item("college-ruled-a4", { en: {
      q: "Can I print college ruled paper on A4?",
      a: "Yes. Download US Letter or A4 and print at actual size. Fit-to-page changes the 7.1 mm spacing.",
    }, zh: { q: "窄行横线纸能用 A4 打印吗?", a: "可以。下载 Letter 或 A4,按实际尺寸打印。选择「适合页面」会改变 7.1 毫米的行距。" } }),
  item("college-ruled-free", { en: { q: "Is college ruled paper free?", a: "Yes. No signup and no watermark on the PDF." }, zh: { q: "窄行横线纸免费吗?", a: "免费。无需注册,PDF 没有水印。" } }),
];

const wide = [
  item("wide-ruled-what", { en: {
      q: "What is wide ruled paper?",
      a: "Wide ruled paper leaves 11/32 inch (8.7 mm) between lines, with a red left margin. It is the usual choice from kindergarten through second grade. College ruled is narrower, at 9/32 inch (7.1 mm).",
      link: { href: "/printable-paper/college-ruled", label: "College ruled paper" },
    }, zh: { q: "宽行横线纸是什么?", a: "宽行(wide ruled)行距 8.7 毫米(11/32 英寸),左侧一条红边,幼儿园到二年级最常用。窄行更密,行距 7.1 毫米(9/32 英寸)。", link: { href: "/printable-paper/college-ruled", label: "窄行横线" } } }),
  item("wide-ruled-a4", { en: {
      q: "Can I print wide ruled paper on A4?",
      a: "Yes. Download US Letter or A4 and print at actual size. Fit-to-page changes the 8.7 mm spacing.",
    }, zh: { q: "宽行横线纸能用 A4 打印吗?", a: "可以。下载 Letter 或 A4,按实际尺寸打印。选择「适合页面」会改变 8.7 毫米的行距。" } }),
  item("wide-ruled-free", { en: { q: "Is wide ruled paper free?", a: "Yes. No signup and no watermark on the PDF." }, zh: { q: "宽行横线纸免费吗?", a: "免费。无需注册,PDF 没有水印。" } }),
];

const kindergarten = [
  item("kindergarten-what", { en: {
      q: "What is kindergarten handwriting paper?",
      a: "It uses three guides: a top line, a dashed midline for the height of letters like a and c, and a solid baseline. US Letter has 12 of these lines, with a red margin line on the left. Print at actual size. Wide ruled is a single wider gap, not this three-line sheet.",
      link: { href: "/printable-paper/wide-ruled", label: "Wide ruled paper" },
    }, zh: { q: "幼儿园三线格是什么?", a: "三线格有顶线、给 a、c 这类字母高度用的虚中线,以及实线基线。孩子在改用宽行之前用这一张。宽行只是行距更宽的横线,不是这三线。", link: { href: "/printable-paper/wide-ruled", label: "宽行横线" } } }),
  item("kindergarten-a4", { en: {
      q: "Can I print kindergarten handwriting paper on A4?",
      a: "Yes. The PDF is US Letter or A4. Print at actual size so the dashed midline stays in the right place.",
    }, zh: { q: "三线格能用 A4 打印吗?", a: "可以。PDF 有 Letter 和 A4。按实际尺寸打印,虚中线才落在该在的位置。" } }),
  item("kindergarten-free", { en: { q: "Is kindergarten handwriting paper free?", a: "Yes. No signup and no watermark on the PDF." }, zh: { q: "三线格免费吗?", a: "免费。无需注册,PDF 没有水印。" } }),
];

const dots = [
  item("dot-grid-what", { en: {
      q: "What is dot grid paper?",
      a: "Dot grid paper replaces lines with a light lattice of dots. The default pitch is about 7 mm, for bullet journals, sketches, and handwriting drills. It is not lined paper.",
    }, zh: { q: "点阵纸是什么?", a: "点阵纸用浅点代替横线。默认点距大约 7 毫米,适合手帐、草图和练字。它不是横线纸。" } }),
  item("dot-grid-a4", { en: {
      q: "Can I print dot grid paper on A4?",
      a: "Yes. Download US Letter or A4 and print at actual size so the dots stay about 7 mm apart.",
    }, zh: { q: "点阵纸能用 A4 打印吗?", a: "可以。下载 Letter 或 A4,按实际尺寸打印,点距才会保持大约 7 毫米。" } }),
  item("dot-grid-free", { en: { q: "Is dot grid paper free?", a: "Yes. No signup and no watermark on the PDF." }, zh: { q: "点阵纸免费吗?", a: "免费。无需注册,PDF 没有水印。" } }),
];

const story = [
  item("story-paper-what", { en: {
      q: "What is story paper?",
      a: "Story paper leaves the top of the page empty for a drawing — about two-fifths of the sheet — and puts wide writing lines underneath. Kindergarten and first grade use it for a picture plus one or two sentences.",
    }, zh: { q: "故事纸是什么?", a: "故事纸把页面上方留成空白画框,大约占五分之二,下面是宽行横线。幼儿园和一年级用来画一幅图,再写一两句话。" } }),
  item("story-paper-a4", { en: {
      q: "Can I print story paper on A4?",
      a: "Yes. The picture box and the lines below it are laid out for US Letter or A4. Print at actual size.",
    }, zh: { q: "故事纸能用 A4 打印吗?", a: "可以。画框和下面的横线按 Letter 或 A4 排好。按实际尺寸打印。" } }),
  item("story-paper-free", { en: { q: "Is story paper free?", a: "Yes. No signup and no watermark on the PDF." }, zh: { q: "故事纸免费吗?", a: "免费。无需注册,PDF 没有水印。" } }),
];

const cornell = [
  item("cornell-notes-what", { en: {
      q: "What is Cornell notes paper?",
      a: "Cornell notes paper splits the page into three parts: a narrow cue column on the left for questions and keywords, lined notes on the right, and a blank summary band along the bottom.",
    }, zh: { q: "康奈尔笔记纸是什么?", a: "康奈尔笔记把一页分成三块:左边窄栏写问题和关键词,右边横线记笔记,底部留一条总结。" } }),
  item("cornell-notes-how", { en: {
      q: "How do you fill in Cornell notes?",
      a: "Write the notes on the right during class. Afterward, add questions and keywords in the left column, then a short summary in the bottom band.",
    }, zh: { q: "康奈尔笔记怎么填?", a: "课上把笔记写在右边。课后在左栏补问题和关键词,再在底部写一句总结。" } }),
  item("cornell-notes-free", { en: { q: "Is Cornell notes paper free?", a: "Yes. No signup and no watermark on the PDF." }, zh: { q: "康奈尔笔记纸免费吗?", a: "免费。无需注册,PDF 没有水印。" } }),
];

const narrow = [
  item("narrow-ruled-what", { en: {
      q: "What is narrow ruled paper?",
      a: "Narrow ruled paper has 1/4 inch (6.4 mm) between lines. College ruled is 9/32 inch (7.1 mm). US Letter fits 41 narrow lines, with a red left margin.",
      link: { href: "/printable-paper/college-ruled", label: "College ruled paper" },
    }, zh: { q: "1/4 英寸横线纸和窄行有什么不同?", a: "这一页行距 6.4 毫米（1/4 英寸）。窄行（college ruled）是 7.1 毫米。Letter 上是 41 行，左侧一条红边。", link: { href: "/printable-paper/college-ruled", label: "窄行横线" } } }),
  item("narrow-ruled-print", { en: {
      q: "How should I print narrow ruled paper?",
      a: "Print at actual size. Fit-to-page changes the 6.4 mm spacing. The linked PDF is US Letter. Use the page-size control for A4.",
    }, zh: { q: "1/4 英寸横线纸怎么打印?", a: "按实际尺寸打印。「适合页面」会改变 6.4 毫米的行距。页面上的 PDF 是 Letter。要 A4 就在页面里切换纸张再下载。" } }),
  item("narrow-ruled-free", { en: { q: "Is narrow ruled paper free?", a: "Yes. No signup and no watermark on the PDF." }, zh: { q: "1/4 英寸横线纸免费吗?", a: "免费。无需注册,PDF 没有水印。" } }),
];

const large = [
  item("large-print-what", { en: {
      q: "What is large print writing paper?",
      a: "Large print writing paper leaves 1/2 inch (12.7 mm) between lines. Wide ruled is 11/32 inch (8.7 mm). US Letter has 20 lines and a red left margin. It is the low-vision sheet, not three-line kindergarten paper.",
      link: { href: "/printable-paper/kindergarten", label: "Kindergarten handwriting paper" },
    }, zh: { q: "大字横线纸是什么?", a: "行距 12.7 毫米（1/2 英寸）。宽行是 8.7 毫米。Letter 上是 20 行，左侧一条红边。这是低视力用的横线，不是幼儿园三线格。", link: { href: "/printable-paper/kindergarten", label: "幼儿园三线格" } } }),
  item("large-print-print", { en: {
      q: "How should I print large print paper?",
      a: "Print at actual size. Fit-to-page shrinks the 1/2 inch gap. The linked PDF is US Letter. Use the page-size control for A4.",
    }, zh: { q: "大字横线纸怎么打印?", a: "按实际尺寸打印。「适合页面」会把 12.7 毫米的行距缩小。页面上的 PDF 是 Letter。要 A4 就在页面里切换纸张再下载。" } }),
  item("large-print-free", { en: { q: "Is large print writing paper free?", a: "Yes. No signup and no watermark on the PDF." }, zh: { q: "大字横线纸免费吗?", a: "免费。无需注册,PDF 没有水印。" } }),
];

const graph = [
  item("graph-paper-what", { en: {
      q: "What size are the squares on this graph paper?",
      a: "1/4 inch (6.4 mm), four squares to an inch. There is no red margin. Print at actual size so the squares stay that size.",
    }, zh: { q: "这张方格纸的格子多大?", a: "边长 6.4 毫米（1/4 英寸），一英寸四个。没有红边。按实际尺寸打印，格子才保持这个大小。" } }),
  item("graph-paper-a4", { en: {
      q: "Can I print this graph paper on A4?",
      a: "Yes. The linked PDF is US Letter. Switch the page size to A4 and download from the page. Print at actual size.",
    }, zh: { q: "方格纸能用 A4 打印吗?", a: "可以。页面上的 PDF 是 Letter。要 A4 就在页面里切换纸张再下载。按实际尺寸打印。" } }),
  item("graph-paper-free", { en: { q: "Is this graph paper free?", a: "Yes. No signup and no watermark on the PDF." }, zh: { q: "方格纸免费吗?", a: "免费。无需注册,PDF 没有水印。" } }),
];

const BY_SLUG: Record<string, FaqItem[]> = {
  "college-ruled": college,
  "narrow-ruled": narrow,
  "wide-ruled": wide,
  "large-print": large,
  kindergarten,
  "graph-paper": graph,
  "dot-grid": dots,
  "story-paper": story,
  "cornell-notes": cornell,
};

export function paperKindFaqs(slug: string): FaqItem[] {
  return BY_SLUG[slug] ?? [];
}
