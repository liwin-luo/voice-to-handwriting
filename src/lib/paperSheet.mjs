/** 打印纸几何。像素按 96dpi，与 PaperGenerator / jsPDF 的 px 一致。
 *  改行距或画法后重跑 node scripts/paper-printables.mjs。 */

export const PAPER_INSET = 36;
export const PAPER_MARGIN_X = 76;
export const LINE_COLOR = "#a8c0d8";
export const MARGIN_COLOR = "#e26d6d";
export const LABEL_COLOR = "#5c6b7a";

/** @typedef {"college"|"wide"|"narrow"|"large"|"graph"|"handwriting"|"blank"|"dots"|"story"|"cornell"} PaperSheetType */

/** 默认行距(px)。college 9/32"、wide 11/32"、narrow 1/4"、large 1/2"、graph 1/4" 方格。 */
export const PAPER_SPACING = {
  college: 27,
  cornell: 27,
  wide: 33,
  story: 33,
  narrow: 24,
  large: 48,
  graph: 24,
  handwriting: 28,
  dots: 22,
  blank: 26,
};

/** @param {PaperSheetType} type */
export function spacingFor(type) {
  return PAPER_SPACING[type] ?? 26;
}

/** 红边只对横线、三线、白纸有意义。 */
export function wantsPaperMargin(type) {
  return type === "college" || type === "wide" || type === "narrow" || type === "large" || type === "handwriting" || type === "blank";
}

/** US Letter 上横线能画几条。与 draw 循环同一条件。 */
export function ruledLineCount(h, spacing) {
  const top = PAPER_INSET;
  const bottom = PAPER_INSET;
  let n = 0;
  for (let y = top + spacing; y <= h - bottom; y += spacing) n += 1;
  return n;
}

/** US Letter 上三线格能画几行。与 draw 循环同一条件。 */
export function handwritingBandCount(h, spacing) {
  const top = PAPER_INSET;
  const bottom = PAPER_INSET;
  const band = Math.max(60, spacing * 3);
  let n = 0;
  for (let y0 = top; y0 + band <= h - bottom + band; y0 += band) n += 1;
  return n;
}

/**
 * @typedef {{ op: "line", x1: number, y1: number, x2: number, y2: number, dashed: boolean, alpha: number, width: number, color: "line" | "margin" }
 *   | { op: "rect", x: number, y: number, w: number, h: number, width: number }
 *   | { op: "dot", x: number, y: number, r: number }
 *   | { op: "text", text: string, x: number, y: number }} PaperOp
 */

/**
 * @param {{ type: PaperSheetType, w: number, h: number, spacing: number, showMargin: boolean, labels?: { picture?: string, cues?: string, notes?: string, summary?: string } }} spec
 * @returns {PaperOp[]}
 */
export function paperOps(spec) {
  const { type, w, h, spacing, showMargin, labels = {} } = spec;
  /** @type {Array<Record<string, unknown>>} */
  const ops = [];
  const top = PAPER_INSET;
  const bottom = PAPER_INSET;
  const line = (x1, y1, x2, y2, extra = {}) => {
    ops.push({
      op: "line",
      x1, y1, x2, y2,
      dashed: !!extra.dashed,
      alpha: extra.alpha ?? 1,
      width: extra.width ?? 1,
      color: extra.color ?? "line",
    });
  };

  if (type === "college" || type === "wide" || type === "narrow" || type === "large") {
    for (let y = top + spacing; y <= h - bottom; y += spacing) line(0, y, w, y);
  } else if (type === "graph") {
    for (let y = top; y <= h - bottom; y += spacing) line(0, y, w, y, { alpha: 0.8 });
    for (let x = 0; x <= w; x += spacing) line(x, top, x, h - bottom, { alpha: 0.8 });
  } else if (type === "handwriting") {
    const band = Math.max(60, spacing * 3);
    for (let y0 = top; y0 + band <= h - bottom + band; y0 += band) {
      line(0, y0, w, y0, { alpha: 0.7 });
      line(0, y0 + band, w, y0 + band);
      line(0, y0 + band * 0.52, w, y0 + band * 0.52, { dashed: true, alpha: 0.8 });
    }
  } else if (type === "dots") {
    for (let y = top + spacing; y <= h - bottom; y += spacing) {
      for (let x = spacing; x <= w - spacing; x += spacing) {
        ops.push({ op: "dot", x, y, r: 1.15 });
      }
    }
  } else if (type === "story") {
    const boxH = Math.round((h - top - bottom) * 0.42);
    ops.push({ op: "rect", x: 48, y: top, w: w - 96, h: boxH, width: 1.25 });
    if (labels.picture) ops.push({ op: "text", text: labels.picture, x: 64, y: top + 28 });
    for (let y = top + boxH + spacing; y <= h - bottom; y += spacing) line(0, y, w, y);
  } else if (type === "cornell") {
    const summaryH = 148;
    const summaryY = h - bottom - summaryH;
    const cueX = Math.round(w * 0.28);
    line(cueX, top, cueX, summaryY, { width: 1.25 });
    line(36, summaryY, w - 36, summaryY, { width: 1.25 });
    for (let y = top + spacing; y < summaryY - 6; y += spacing) line(cueX + 10, y, w - 28, y);
    if (labels.cues) ops.push({ op: "text", text: labels.cues, x: 48, y: top + 24 });
    if (labels.notes) ops.push({ op: "text", text: labels.notes, x: cueX + 16, y: top + 24 });
    if (labels.summary) ops.push({ op: "text", text: labels.summary, x: 48, y: summaryY + 28 });
  }

  if (showMargin && wantsPaperMargin(type)) {
    line(PAPER_MARGIN_X, 0, PAPER_MARGIN_X, h, { width: 1.5, color: "margin" });
  }
  return ops;
}
