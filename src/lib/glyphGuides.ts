import { GLYPH_STARTS } from "@/lib/glyphStarts.generated";
import { drawGlyphMarks, type GlyphGuideData } from "@/lib/alphabetSheet.mjs";

/** 该字体是否有字形入笔数据(拉丁教学字体有,中日韩字体无) */
export function hasGlyphGuides(fontId: string): boolean {
  return Boolean(GLYPH_STARTS[fontId]);
}

export function glyphGuideData(fontId: string): GlyphGuideData | null {
  return GLYPH_STARTS[fontId] ?? null;
}

/** 笔画引导:落笔绿点(白描边压线可见)+ 初始方向红箭头。调用前需设好 ctx.font。 */
export function drawGlyphGuides(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  baselineY: number,
  fontSize: number,
  fontId: string,
) {
  const data = GLYPH_STARTS[fontId];
  if (!data) return;
  drawGlyphMarks(ctx, text, x, baselineY, fontSize, data);
}
