export interface ChartGrid {
  cols: number;
  rows: number;
  cellW: number;
  cellH: number;
}

export interface GlyphGuideData {
  upm: number;
  glyphs: Record<string, [number, number, number]>;
}

export interface LetterPair {
  capital: string;
  lower: string;
}

export interface SheetOpts {
  w: number;
  h: number;
  family: string;
  guide: GlyphGuideData | null;
  guides: boolean;
  letters: LetterPair[];
  title: string;
  subtitle?: string;
  note?: string;
}

export function chartGrid(count: number, pageW: number, pageH: number, margin: number): ChartGrid;

export function drawGlyphMarks(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  baselineY: number,
  fontSize: number,
  data: GlyphGuideData,
): void;

export function paintChart(ctx: CanvasRenderingContext2D, opts: SheetOpts): void;
export function paintTrace(ctx: CanvasRenderingContext2D, opts: SheetOpts): void;

export const LETTER_STRIP: { w: number; h: number };

export function paintLetterStrip(
  ctx: CanvasRenderingContext2D,
  opts: {
    family: string;
    guide: GlyphGuideData | null;
    guides: boolean;
    pair: string;
  },
): void;
