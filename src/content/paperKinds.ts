import type { Locale } from "@/i18n/routing";

export type PaperKindType = "college" | "wide" | "narrow" | "large" | "graph" | "handwriting" | "dots" | "story" | "cornell";

export interface PaperKindCopy {
  /** 短标签，用于索引页链接 */
  label: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
}

export interface PaperKind {
  slug: string;
  type: PaperKindType;
  copy: Record<Locale, PaperKindCopy>;
}

/** 打印纸类型落地页。每页是同一生成器的一种预设，文案按该规格写，避免三页互相复制。 */
export const PAPER_KINDS: PaperKind[] = [
  {
    slug: "college-ruled",
    type: "college",
    copy: { en: {
        label: "College ruled",
        title: "College Ruled Paper — Free Printable PDF (Letter & A4)",
        description: "Print college ruled lined paper with a red margin. About 9/32 inch between lines. Free PDF, no watermark.",
        h1: "College ruled paper",
        intro: "College ruled paper is the 9/32 inch (7.1 mm) ruling used from about third grade through college, with a red left margin. Narrow ruled is a separate sheet at 1/4 inch (6.4 mm). Download a PDF in US Letter or A4 and print at actual size.",
      } },
  },
  {
    slug: "wide-ruled",
    type: "wide",
    copy: { en: {
        label: "Wide ruled",
        title: "Wide Ruled Paper — Free Printable PDF (Letter & A4)",
        description: "Print wide ruled lined paper for early grades. About 11/32 inch between lines, with a red margin. Free PDF.",
        h1: "Wide ruled paper",
        intro: "Wide ruled paper leaves more room between lines — about 11/32 inch (8.7 mm) — so early writers can form letters without crowding. It is the usual choice for kindergarten through second grade. Print US Letter or A4 at actual size.",
      } },
  },
  {
    slug: "kindergarten",
    type: "handwriting",
    copy: { en: {
        label: "Kindergarten lines",
        title: "Kindergarten Handwriting Paper — 12-Line Printable PDF",
        description: "Print 12 lines of primary handwriting paper: a headline, dashed midline, and baseline, with a red left margin. Free PDF. Print at actual size.",
        h1: "Kindergarten handwriting paper",
        intro: "Primary handwriting paper uses three guides on each line: a top line, a dashed midline for letters like a and c, and a solid baseline. US Letter fits 12 of these lines, with a red margin line on the left. Kindergarten and first grade use this sheet before wide ruled. Print at actual size, not fit-to-page.",
      } },
  },
  {
    slug: "dot-grid",
    type: "dots",
    copy: { en: {
        label: "Dot grid",
        title: "Dot Grid Paper — Free Printable PDF (Letter & A4)",
        description: "Evenly spaced dots for bullet journals, sketches, and handwriting drills. Free PDF, no watermark.",
        h1: "Dot grid paper",
        intro: "Dot grid paper replaces lines with a light lattice of dots, so you can write, sketch, or keep a bullet journal without a heavy rule. The default pitch is about 7 mm. Print it in US Letter or A4 at actual size.",
      } },
  },
  {
    slug: "story-paper",
    type: "story",
    copy: { en: {
        label: "Story paper",
        title: "Story Paper with Picture Box — Free Printable PDF",
        description: "A blank picture box on top and wide lines below, for kindergarten draw-and-write pages. Free PDF.",
        h1: "Story paper with a picture box",
        intro: "Story paper leaves the top of the page empty for a drawing and puts wide writing lines underneath. Kindergarten and first grade use it for a picture plus one or two sentences. The box is about two-fifths of the page. Print in US Letter or A4.",
      } },
  },
  {
    slug: "cornell-notes",
    type: "cornell",
    copy: { en: {
        label: "Cornell notes",
        title: "Cornell Notes Paper — Free Printable PDF (Letter & A4)",
        description: "A cue column, lined notes, and a summary band at the bottom. Free Cornell notes PDF, no watermark.",
        h1: "Cornell notes paper",
        intro: "Cornell notes paper splits the page into three parts: a narrow cue column on the left for questions and keywords, lined notes on the right, and a blank summary band along the bottom. Print it in US Letter or A4 and fill the notes during class, the cues after.",
      } },
  },
  {
    slug: "narrow-ruled",
    type: "narrow",
    copy: { en: {
        label: "Narrow ruled",
        title: "Narrow Ruled Paper — Free Printable PDF (1/4 Inch)",
        description: "Print narrow ruled paper at 1/4 inch (6.4 mm) between lines, with a red left margin. 41 lines on US Letter. Print at actual size.",
        h1: "Narrow ruled paper",
        intro: "Narrow ruled paper puts a line every 1/4 inch (6.4 mm). That is tighter than college ruled at 9/32 inch (7.1 mm), so more writing fits on the page. US Letter has 41 lines and a red margin line on the left. Print at actual size, not fit-to-page.",
      } },
  },
  {
    slug: "large-print",
    type: "large",
    copy: { en: {
        label: "Large print",
        title: "Large Print Writing Paper — 1/2 Inch Lined PDF",
        description: "Low-vision writing paper with 1/2 inch between lines and a red left margin. 20 lines on US Letter. Print at actual size.",
        h1: "Large print writing paper",
        intro: "Large print writing paper leaves 1/2 inch (12.7 mm) between lines, wider than wide ruled at 11/32 inch. It is the sheet for low vision and for writers who need a bigger target. US Letter has 20 lines and a red margin line on the left. Print at actual size, not fit-to-page.",
      } },
  },
  {
    slug: "graph-paper",
    type: "graph",
    copy: { en: {
        label: "Graph paper",
        title: "1/4 Inch Graph Paper — Free Printable PDF",
        description: "Print graph paper with 1/4 inch squares (4 per inch) on US Letter or A4. Free PDF, no watermark. Print at actual size.",
        h1: "1/4 inch graph paper",
        intro: "This graph paper uses 1/4 inch (6.4 mm) squares, four to an inch. That is the usual size for school math and for sketching a small diagram. There is no red margin. Print at actual size, not fit-to-page, or the squares will not stay 1/4 inch.",
      } },
  },
];

export function getPaperKind(slug: string): PaperKind | undefined {
  return PAPER_KINDS.find((k) => k.slug === slug);
}
