/** 连笔字母表画布:图表页、描红页、单字母练习条。
 *  浏览器导出与 scripts/cursive-alphabet-printables.mjs 共用这一份。
 *  落笔点算法与 glyphGuides.ts 相同,改一处要改另一处。 */

const INK = "#1a1a1a";

/** 两套配色:color 用于屏幕与常规打印;gray 是省墨黑白版(参考线与笔顺标记转灰阶)。
 *  scripts/cursive-alphabet-printables.mjs 按变体选择,浏览器导出默认 color。 */
const PALETTES = {
  color: { lineTop: "#b8c8dc", lineMid: "#9db3cc", dot: "#2e9e44", arrow: "#d92c2c" },
  gray: { lineTop: "#c9c9c9", lineMid: "#adadad", dot: "#4b4b4b", arrow: "#1a1a1a" },
};

/** 单元格画什么:pair = Aa 并排;capital / lower = 单列(大写表、小写表变体用)。 */
function pairOf(entry, pairMode) {
  if (pairMode === "capital") return entry.capital;
  if (pairMode === "lower") return entry.lower;
  return entry.capital + entry.lower;
}

/** 固定 4 列。64px 是图表页标题带,行数按数量向上取整。 */
export function chartGrid(count, pageW, pageH, margin) {
  const cols = 4;
  const rows = Math.ceil(count / cols);
  return {
    cols,
    rows,
    cellW: (pageW - margin * 2) / cols,
    cellH: (pageH - margin * 2 - 64) / rows,
  };
}

export function drawGlyphMarks(ctx, text, x, baselineY, fontSize, data, palette = PALETTES.color) {
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
      ctx.fillStyle = palette.dot;
      ctx.fill();
      const rad = (-g[2] * Math.PI) / 180;
      const ax = gx + Math.cos(rad) * arrowLen;
      const ay = gy + Math.sin(rad) * arrowLen;
      const ang = Math.atan2(ay - gy, ax - gx);
      ctx.strokeStyle = palette.arrow;
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

function threeLine(ctx, x, y0, width, bandH, palette) {
  ctx.save();
  ctx.strokeStyle = palette.lineTop;
  ctx.lineWidth = 1;
  ctx.globalAlpha = 0.7;
  ctx.beginPath();
  ctx.moveTo(x, y0);
  ctx.lineTo(x + width, y0);
  ctx.stroke();
  ctx.restore();
  ctx.save();
  ctx.strokeStyle = palette.lineMid;
  ctx.setLineDash([8, 6]);
  ctx.beginPath();
  ctx.moveTo(x, y0 + bandH * 0.52);
  ctx.lineTo(x + width, y0 + bandH * 0.52);
  ctx.stroke();
  ctx.restore();
  ctx.save();
  ctx.strokeStyle = palette.lineMid;
  ctx.beginPath();
  ctx.moveTo(x, y0 + bandH);
  ctx.lineTo(x + width, y0 + bandH);
  ctx.stroke();
  ctx.restore();
}

function paintPair(ctx, pair, x, baseline, fontSize, family, guide, guides, dashed, palette) {
  ctx.font = `${fontSize}px "${family}"`;
  ctx.textBaseline = "alphabetic";
  ctx.save();
  if (dashed) {
    ctx.strokeStyle = INK;
    ctx.lineWidth = 1.15;
    ctx.setLineDash([2.5, 2.5]);
    ctx.strokeText(pair, x, baseline);
  } else {
    ctx.fillStyle = INK;
    ctx.fillText(pair, x, baseline);
  }
  ctx.restore();
  if (guides && guide && !dashed) drawGlyphMarks(ctx, pair, x, baseline, fontSize, guide, palette);
}

/** 第一页:26 格(默认 Aa 并排,pairMode 可只画大写/小写),三线格,可选落笔点。 */
export function paintChart(ctx, opts) {
  const { w, h, family, guide, guides, letters, title, subtitle, pairMode = "pair", palette = PALETTES.color } = opts;
  const margin = 40;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, w, h);
  const grid = chartGrid(letters.length, w, h, margin);
  const titleSize = 36;
  ctx.font = `${titleSize}px "${family}"`;
  ctx.fillStyle = INK;
  ctx.textBaseline = "alphabetic";
  ctx.fillText(title, margin, margin + titleSize);
  const titleW = ctx.measureText(title).width;
  ctx.font = "13px system-ui, sans-serif";
  ctx.fillStyle = "#6b7280";
  ctx.fillText(subtitle, margin + titleW + 14, margin + titleSize - 6);
  letters.forEach((e, i) => {
    const col = i % grid.cols;
    const row = Math.floor(i / grid.cols);
    const x = margin + col * grid.cellW;
    const y0 = margin + 64 + row * grid.cellH;
    const scaled = Math.min(grid.cellH * 0.55, 175);
    const bandW = grid.cellW - 16;
    threeLine(ctx, x + 4, y0, bandW, scaled, palette);
    const baseline = y0 + scaled - 4;
    const cellFont = Math.round(scaled * 0.62);
    paintPair(ctx, pairOf(e, pairMode), x + 8, baseline, cellFont, family, guide, guides, false, palette);
  });
}

/** 第二页:两列,同一行先实心再虚线描红。落笔点只画在实心字母上。 */
export function paintTrace(ctx, opts) {
  const { w, h, family, guide, guides, letters, title, note, pairMode = "pair", palette = PALETTES.color } = opts;
  const margin = 36;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = INK;
  ctx.font = `28px "${family}"`;
  ctx.textBaseline = "alphabetic";
  ctx.fillText(title, margin, margin + 28);
  ctx.font = "13px system-ui, sans-serif";
  ctx.fillStyle = "#6b7280";
  ctx.fillText(note, margin, margin + 48);
  const cols = 2;
  const rows = Math.ceil(letters.length / cols);
  const top = margin + 64;
  const cellW = (w - margin * 2) / cols;
  const cellH = (h - top - margin) / rows;
  letters.forEach((e, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = margin + col * cellW;
    const y0 = top + row * cellH + 1;
    const bandW = cellW - 14;
    // 基线留在格子上半，下半留给 f/g/j/p/q/y 的下行
    const bandH = cellH * 0.62;
    threeLine(ctx, x, y0, bandW, bandH, palette);
    const baseline = y0 + bandH - 1;
    const fontSize = Math.round(bandH * 0.7);
    const pair = pairOf(e, pairMode);
    paintPair(ctx, pair, x + 6, baseline, fontSize, family, guide, guides, false, palette);
    ctx.font = `${fontSize}px "${family}"`;
    const solidW = ctx.measureText(pair).width;
    paintPair(ctx, pair, x + 6 + solidW + 16, baseline, fontSize, family, guide, guides, true, palette);
  });
}

/** 单字母练习条:上实心、下虚线。尺寸与面板 canvas 一致。
 *  底部 48px 是降部余量:g/j/p/q/y 的下伸笔画在基线下方约 0.35em(≈38px @108px 字号),
 *  不留会被画布下边缘裁掉(虚线行基线正好压在旧高度 376 的底边上)。 */
export const LETTER_STRIP = { w: 680, h: 14 + 175 * 2 + 12 + 48 };

export function paintLetterStrip(ctx, opts) {
  const { family, guide, guides, pair, palette = PALETTES.color } = opts;
  const w = LETTER_STRIP.w;
  const bandH = 175;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, w, LETTER_STRIP.h);
  const fontSize = Math.round(bandH * 0.62);
  for (const [i, dashed] of [false, true].entries()) {
    const y0 = 14 + i * (bandH + 12);
    threeLine(ctx, 40, y0, w - 80, bandH, palette);
    paintPair(ctx, pair, 40, y0 + bandH - 6, fontSize, family, guide, guides, dashed, palette);
  }
}
