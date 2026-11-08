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
    } }),
  item("college-ruled-a4", { en: {
      q: "Can I print college ruled paper on A4?",
      a: "Yes. Download US Letter or A4 and print at actual size. Fit-to-page changes the 7.1 mm spacing.",
    } }),
  item("college-ruled-free", { en: { q: "Is college ruled paper free?", a: "Yes. No signup and no watermark on the PDF." } }),
];

const wide = [
  item("wide-ruled-what", { en: {
      q: "What is wide ruled paper?",
      a: "Wide ruled paper leaves 11/32 inch (8.7 mm) between lines, with a red left margin. It is the usual choice from kindergarten through second grade. College ruled is narrower, at 9/32 inch (7.1 mm).",
      link: { href: "/printable-paper/college-ruled", label: "College ruled paper" },
    } }),
  item("wide-ruled-a4", { en: {
      q: "Can I print wide ruled paper on A4?",
      a: "Yes. Download US Letter or A4 and print at actual size. Fit-to-page changes the 8.7 mm spacing.",
    } }),
  item("wide-ruled-free", { en: { q: "Is wide ruled paper free?", a: "Yes. No signup and no watermark on the PDF." } }),
];

const kindergarten = [
  item("kindergarten-what", { en: {
      q: "What is kindergarten handwriting paper?",
      a: "It uses three guides: a top line, a dashed midline for the height of letters like a and c, and a solid baseline. US Letter has 12 of these lines, with a red margin line on the left. Print at actual size. Wide ruled is a single wider gap, not this three-line sheet.",
      link: { href: "/printable-paper/wide-ruled", label: "Wide ruled paper" },
    } }),
  item("kindergarten-a4", { en: {
      q: "Can I print kindergarten handwriting paper on A4?",
      a: "Yes. The PDF is US Letter or A4. Print at actual size so the dashed midline stays in the right place.",
    } }),
  item("kindergarten-free", { en: { q: "Is kindergarten handwriting paper free?", a: "Yes. No signup and no watermark on the PDF." } }),
];

const dots = [
  item("dot-grid-what", { en: {
      q: "What is dot grid paper?",
      a: "Dot grid paper replaces lines with a light lattice of dots. The default pitch is about 7 mm, for bullet journals, sketches, and handwriting drills. It is not lined paper.",
    } }),
  item("dot-grid-a4", { en: {
      q: "Can I print dot grid paper on A4?",
      a: "Yes. Download US Letter or A4 and print at actual size so the dots stay about 7 mm apart.",
    } }),
  item("dot-grid-free", { en: { q: "Is dot grid paper free?", a: "Yes. No signup and no watermark on the PDF." } }),
];

const story = [
  item("story-paper-what", { en: {
      q: "What is story paper?",
      a: "Story paper leaves the top of the page empty for a drawing — about two-fifths of the sheet — and puts wide writing lines underneath. Kindergarten and first grade use it for a picture plus one or two sentences.",
    } }),
  item("story-paper-a4", { en: {
      q: "Can I print story paper on A4?",
      a: "Yes. The picture box and the lines below it are laid out for US Letter or A4. Print at actual size.",
    } }),
  item("story-paper-free", { en: { q: "Is story paper free?", a: "Yes. No signup and no watermark on the PDF." } }),
];

const cornell = [
  item("cornell-notes-what", { en: {
      q: "What is Cornell notes paper?",
      a: "Cornell notes paper splits the page into three parts: a narrow cue column on the left for questions and keywords, lined notes on the right, and a blank summary band along the bottom.",
    } }),
  item("cornell-notes-how", { en: {
      q: "How do you fill in Cornell notes?",
      a: "Write the notes on the right during class. Afterward, add questions and keywords in the left column, then a short summary in the bottom band.",
    } }),
  item("cornell-notes-free", { en: { q: "Is Cornell notes paper free?", a: "Yes. No signup and no watermark on the PDF." } }),
];

const narrow = [
  item("narrow-ruled-what", { en: {
      q: "What is narrow ruled paper?",
      a: "Narrow ruled paper has 1/4 inch (6.4 mm) between lines. College ruled is 9/32 inch (7.1 mm). US Letter fits 41 narrow lines, with a red left margin.",
      link: { href: "/printable-paper/college-ruled", label: "College ruled paper" },
    } }),
  item("narrow-ruled-print", { en: {
      q: "How should I print narrow ruled paper?",
      a: "Print at actual size. Fit-to-page changes the 6.4 mm spacing. The linked PDF is US Letter. Use the page-size control for A4.",
    } }),
  item("narrow-ruled-free", { en: { q: "Is narrow ruled paper free?", a: "Yes. No signup and no watermark on the PDF." } }),
];

const large = [
  item("large-print-what", { en: {
      q: "What is large print writing paper?",
      a: "Large print writing paper leaves 1/2 inch (12.7 mm) between lines. Wide ruled is 11/32 inch (8.7 mm). US Letter has 20 lines and a red left margin. It is the low-vision sheet, not three-line kindergarten paper.",
      link: { href: "/printable-paper/kindergarten", label: "Kindergarten handwriting paper" },
    } }),
  item("large-print-print", { en: {
      q: "How should I print large print paper?",
      a: "Print at actual size. Fit-to-page shrinks the 1/2 inch gap. The linked PDF is US Letter. Use the page-size control for A4.",
    } }),
  item("large-print-free", { en: { q: "Is large print writing paper free?", a: "Yes. No signup and no watermark on the PDF." } }),
];

const graph = [
  item("graph-paper-what", { en: {
      q: "What size are the squares on this graph paper?",
      a: "1/4 inch (6.4 mm), four squares to an inch. There is no red margin. Print at actual size so the squares stay that size.",
    } }),
  item("graph-paper-a4", { en: {
      q: "Can I print this graph paper on A4?",
      a: "Yes. The linked PDF is US Letter. Switch the page size to A4 and download from the page. Print at actual size.",
    } }),
  item("graph-paper-free", { en: { q: "Is this graph paper free?", a: "Yes. No signup and no watermark on the PDF." } }),
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
