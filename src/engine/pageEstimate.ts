/** 手写用纸容量。像素按 96dpi，与 PAGE_FORMATS 一致。
 *  Letter + college ruled + 4mm 普通拉丁字校准为 33 行 × 40 字/行 = 220 词/面。
 *  行距远大于 4mm（三线格）时拉丁字母跟着行高变大，否则字会浮在格子中间。 */

export const CALC_SCRIPTS = ["en", "es", "fr", "de", "pt", "zh", "ja", "ko"] as const;
export type CalcScript = (typeof CALC_SCRIPTS)[number];

export const CALC_PAPERS = ["college", "wide", "kindergarten", "graph", "genkou400", "genkou200", "custom"] as const;
export type CalcPaper = (typeof CALC_PAPERS)[number];

export type CalcSize = "small" | "normal" | "large";
export type CalcGap = "tight" | "normal" | "loose";
export type CalcFormat = "letter" | "a4";

const PAGE = {
  letter: { w: 816, h: 1056 },
  a4: { w: 794, h: 1123 },
} as const;

/** 书写区边距。左右各 102px，使 Letter 书写宽约 612px，4mm 字母正好 40 个。 */
const BOX = { top: 73, right: 102, bottom: 73, left: 102 } as const;

/** college 9/32in = 27px；wide 11/32in = 33px；三线格一栏 = 28px 间距 × 3。 */
const RULED_PITCH: Record<"college" | "wide" | "kindergarten", number> = {
  college: 27,
  wide: 33,
  kindergarten: 84,
};

const GRAPH_CELL = 26;
const SIZE = { small: 0.8, normal: 1, large: 1.25 } as const;
/** 加在前进宽度上的比例。普通档为 0，对应 4mm 字母。 */
const GAP = { tight: -0.12, normal: 0, loose: 0.28 } as const;
const LATIN_PX = (4 / 25.4) * 96;

const LATIN = new Set<CalcScript>(["en", "es", "fr", "de", "pt"]);

export function isWordScript(script: CalcScript): boolean {
  return LATIN.has(script);
}

export function isCellPaper(paper: CalcPaper): boolean {
  return paper === "graph" || paper === "genkou400" || paper === "genkou200";
}

/** 含词间空格。德语词按 6.5 个字母。中日韩一字即一格。 */
export function charsPerToken(script: CalcScript): number {
  if (script === "de") return 7.5;
  if (LATIN.has(script)) return 6;
  return 1;
}

/** 自定义行距钳制，与 makeCustomPaper 的 24–64px 一致。 */
export function clampPitch(px: number): number {
  return Math.min(64, Math.max(24, Math.round(px)));
}

export interface CapacityInput {
  script: CalcScript;
  paper: CalcPaper;
  format: CalcFormat;
  size: CalcSize;
  gap: CalcGap;
  /** 仅 custom 使用，单位 px */
  pitch?: number;
}

export interface Estimate {
  unit: "word" | "char";
  linesPerPage: number;
  glyphsPerLine: number;
  perPage: number;
  tightPerPage: number;
  loosePerPage: number;
  /** 横线纸为行距；方格纸为格子边长。单位 px */
  pitch: number;
  cell: number | null;
  gapLocked: boolean;
  fontSize: number;
  letterSpacingEm: number;
  pageW: number;
  pageH: number;
  boxW: number;
  boxH: number;
  padTop: number;
  padLeft: number;
}

interface Metrics {
  unit: "word" | "char";
  linesPerPage: number;
  glyphsPerLine: number;
  perPage: number;
  pitch: number;
  cell: number | null;
  gapLocked: boolean;
  fontSize: number;
  letterSpacingEm: number;
  pageW: number;
  pageH: number;
  boxW: number;
  boxH: number;
}

function boxOf(format: CalcFormat) {
  const page = PAGE[format];
  return {
    pageW: page.w,
    pageH: page.h,
    boxW: page.w - BOX.left - BOX.right,
    boxH: page.h - BOX.top - BOX.bottom,
  };
}

function perPageOf(cells: number, script: CalcScript): { unit: "word" | "char"; perPage: number } {
  if (isWordScript(script)) return { unit: "word", perPage: Math.max(1, Math.floor(cells / charsPerToken(script))) };
  return { unit: "char", perPage: Math.max(1, cells) };
}

function metrics(input: CapacityInput): Metrics {
  const box = boxOf(input.format);
  const sizeScale = SIZE[input.size];
  const gapScale = 1 + GAP[input.gap];
  const base: Omit<Metrics, "unit" | "linesPerPage" | "glyphsPerLine" | "perPage" | "pitch" | "cell" | "gapLocked" | "fontSize" | "letterSpacingEm"> = box;

  if (input.paper === "genkou400" || input.paper === "genkou200") {
    const cols = 20;
    const rows = input.paper === "genkou400" ? 20 : 10;
    const cell = Math.max(1, Math.floor(Math.min(box.boxW / cols, box.boxH / rows)));
    const count = perPageOf(cols * rows, input.script);
    return {
      ...base,
      ...count,
      linesPerPage: rows,
      glyphsPerLine: cols,
      pitch: cell,
      cell,
      gapLocked: true,
      fontSize: Math.round(cell * 0.72),
      letterSpacingEm: 0,
    };
  }

  if (input.paper === "graph") {
    const cols = Math.max(1, Math.floor(box.boxW / GRAPH_CELL));
    const rows = Math.max(1, Math.floor(box.boxH / GRAPH_CELL));
    const count = perPageOf(cols * rows, input.script);
    return {
      ...base,
      ...count,
      linesPerPage: rows,
      glyphsPerLine: cols,
      pitch: GRAPH_CELL,
      cell: GRAPH_CELL,
      gapLocked: true,
      fontSize: Math.round(GRAPH_CELL * 0.72),
      letterSpacingEm: 0,
    };
  }

  const pitch = input.paper === "custom" ? clampPitch(input.pitch ?? 40) : RULED_PITCH[input.paper];
  const lines = Math.max(1, Math.floor(box.boxH / pitch));
  const latin = Math.max(LATIN_PX, pitch * 0.42) * sizeScale * gapScale;
  const advance = isWordScript(input.script) ? latin : pitch * 0.92 * sizeScale * gapScale;
  const glyphs = Math.max(1, Math.floor(box.boxW / advance));
  const count = perPageOf(glyphs * lines, input.script);
  const letterSpacingEm = input.gap === "tight" ? -0.04 : input.gap === "loose" ? 0.16 : 0;
  const fontBase = isWordScript(input.script) ? Math.max(LATIN_PX, pitch * 0.42) : pitch * 0.92;
  return {
    ...base,
    ...count,
    linesPerPage: lines,
    glyphsPerLine: glyphs,
    pitch,
    cell: null,
    gapLocked: false,
    fontSize: Math.max(12, Math.round((fontBase * sizeScale) / 0.5)),
    letterSpacingEm,
  };
}

export function estimate(input: CapacityInput): Estimate {
  const selected = metrics(input);
  return {
    ...selected,
    tightPerPage: metrics({ ...input, gap: "tight" }).perPage,
    loosePerPage: metrics({ ...input, gap: "loose" }).perPage,
    padTop: BOX.top,
    padLeft: BOX.left,
  };
}

export function sheetsFor(
  est: Pick<Estimate, "perPage" | "linesPerPage" | "glyphsPerLine" | "unit">,
  count: number,
  sides: 1 | 2,
  script: CalcScript,
): { writingPages: number; sheets: number; lastLine: number } {
  if (!(count > 0) || est.perPage <= 0) return { writingPages: 0, sheets: 0, lastLine: 0 };
  const writingPages = Math.ceil(count / est.perPage);
  const sheets = Math.ceil(writingPages / sides);
  const rem = count % est.perPage;
  const used = rem === 0 ? est.perPage : rem;
  const glyphs = est.unit === "word" ? used * charsPerToken(script) : used;
  const lastLine = Math.min(est.linesPerPage, Math.max(1, Math.ceil(glyphs / est.glyphsPerLine)));
  return { writingPages, sheets, lastLine };
}

/** 方格纸一字一格。换行丢掉本行剩余格子。 */
export function paginateCells(text: string, cols: number, rows: number): string[][] {
  if (cols < 1 || rows < 1 || text.length === 0) return [];
  const pages: string[][] = [];
  let page: string[] = [];
  let row = "";
  const pushRow = () => {
    page.push(row);
    row = "";
    if (page.length >= rows) {
      pages.push(page);
      page = [];
    }
  };
  for (const ch of text) {
    if (ch === "\r") continue;
    if (ch === "\n") {
      pushRow();
      continue;
    }
    row += ch;
    if (row.length >= cols) pushRow();
  }
  if (row.length) pushRow();
  if (page.length) pages.push(page);
  return pages;
}

export type PreviewSlot = { kind: "page"; index: number } | { kind: "gap"; omitted: number };

/** 超过 8 页时只留前 3 页和最后 1 页。 */
export function previewSlots(pageCount: number): PreviewSlot[] {
  if (pageCount <= 0) return [];
  if (pageCount <= 8) return Array.from({ length: pageCount }, (_, index) => ({ kind: "page" as const, index }));
  return [
    { kind: "page", index: 0 },
    { kind: "page", index: 1 },
    { kind: "page", index: 2 },
    { kind: "gap", omitted: pageCount - 4 },
    { kind: "page", index: pageCount - 1 },
  ];
}

export function blankPaperPath(paper: CalcPaper): string {
  if (paper === "college") return "/printable-paper/college-ruled";
  if (paper === "wide") return "/printable-paper/wide-ruled";
  if (paper === "kindergarten") return "/printable-paper/kindergarten";
  return "/printable-paper";
}

export interface Handoff {
  text: string;
  fontId: string;
  fontSize: number;
  pageFormat: CalcFormat;
  spacing: number;
  mode: "ruled" | "grid";
}

export function handoffPayload(input: CapacityInput, text: string, fontId: string): Handoff {
  const est = estimate(input);
  const grid = isCellPaper(input.paper);
  return {
    text: text.slice(0, 20000),
    fontId,
    fontSize: est.fontSize,
    pageFormat: input.format,
    spacing: clampPitch(est.cell ?? est.pitch),
    mode: grid ? "grid" : "ruled",
  };
}

export function parseHandoff(raw: string): Handoff | null {
  try {
    const v = JSON.parse(raw) as Partial<Handoff>;
    if (!v || typeof v.text !== "string") return null;
    if (v.pageFormat !== "letter" && v.pageFormat !== "a4") return null;
    if (v.mode !== "ruled" && v.mode !== "grid") return null;
    if (typeof v.fontSize !== "number" || typeof v.spacing !== "number" || typeof v.fontId !== "string") return null;
    return {
      text: v.text.slice(0, 20000),
      fontId: v.fontId,
      fontSize: Math.min(120, Math.max(12, Math.round(v.fontSize))),
      pageFormat: v.pageFormat,
      spacing: clampPitch(v.spacing),
      mode: v.mode,
    };
  } catch {
    return null;
  }
}

export const SAMPLE_TEXT: Record<CalcScript, string> = {
  en: "The quick brown fox jumps over the lazy dog. Pack a lined sheet before the essay is due, and leave a margin.",
  es: "El zorro marrón salta sobre el perro perezoso. Lleva hojas pautadas antes de que venza la tarea.",
  fr: "Le renard brun saute par-dessus le chien paresseux. Prévois des feuilles lignées avant le devoir.",
  de: "Der schnelle braune Fuchs springt über den faulen Hund. Nimm liniertes Papier mit, bevor der Aufsatz fällig ist.",
  pt: "A raposa marrom salta sobre o cão preguiçoso. Leve folhas pautadas antes de o trabalho vencer.",
  zh: "床前明月光，疑是地上霜。举头望明月，低头思故乡。这篇短文用来看看方格纸大概要几行。",
  ja: "春はあけぼの。やうやう白くなりゆく山際、少し明かりて、紫だちたる雲の細くたなびきたる。",
  ko: "가을이 깊어 하늘이 높고 말이 살찐다. 공책에 몇 줄이 필요한지 이 문장으로 가늠해 본다.",
};
