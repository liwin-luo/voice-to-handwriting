import { GLYPH_STARTS } from "@/lib/glyphStarts.generated";

/** 该字体是否有字形入笔数据(拉丁教学字体有,中日韩字体无) */
export function hasGlyphGuides(fontId: string): boolean {
  return Boolean(GLYPH_STARTS[fontId]);
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
  const scale = fontSize / data.upm;
  const arrowLen = Math.max(11, fontSize * 0.2);
  const head = Math.max(5, arrowLen * 0.42);
  let acc = 0;
  ctx.save();
  ctx.setLineDash([]);
  for (const ch of text) {
    const g = data.glyphs[ch];
    if (g) {
      const gx = x + acc + g[0] * scale;
      const gy = baselineY - g[1] * scale;
      ctx.beginPath();
      ctx.arc(gx, gy, 4.6, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(gx, gy, 3, 0, Math.PI * 2);
      ctx.fillStyle = "#2e9e44";
      ctx.fill();
      const rad = (-g[2] * Math.PI) / 180; // 字体 y 向上,canvas y 向下,角度取反
      const ax = gx + Math.cos(rad) * arrowLen;
      const ay = gy + Math.sin(rad) * arrowLen;
      const ang = Math.atan2(ay - gy, ax - gx);
      ctx.strokeStyle = "#d92c2c";
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(gx, gy);
      ctx.lineTo(ax, ay);
      ctx.moveTo(ax, ay);
      ctx.lineTo(ax - head * Math.cos(ang - 0.45), ay - head * Math.sin(ang - 0.45));
      ctx.moveTo(ax, ay);
      ctx.lineTo(ax - head * Math.cos(ang + 0.45), ay - head * Math.sin(ang + 0.45));
      ctx.stroke();
    }
    acc += ctx.measureText(ch).width;
  }
  ctx.restore();
}
