/** 手写循环演示的排版与时间轴。画布按字形从左到右揭开;这里只算盒子和进度。 */

export interface RepeaterGlyph {
  char: string;
  /** 字形左边缘,px */
  x: number;
  /** alphabetic baseline,px */
  baseline: number;
  width: number;
}

export interface RepeaterFrame {
  /** 已经完整写出的字形个数 */
  doneCount: number;
  /** 正在写的下一笔进度,0–1。停住或写完时为 1 */
  partial: number;
  holding: boolean;
  finished: boolean;
}

/** 单次演示的字形上限。更长的句子循环起来看不清,也撑高画布。 */
const MAX_GLYPHS = 240;

/**
 * 按词折行。空格不出现在行首;超宽的词(或没有空格的一段,如中文)再按字拆。
 * ponytail: 零宽字符直接丢掉。升级路径:并进前一个字形的 advance,保留组合附加符号。
 */
export function layoutRepeaterText(opts: {
  text: string;
  maxWidth: number;
  startX: number;
  firstBaseline: number;
  lineHeight: number;
  measure: (s: string) => number;
}): RepeaterGlyph[] {
  const { text, maxWidth, startX, firstBaseline, lineHeight, measure } = opts;
  if (maxWidth <= 0 || lineHeight <= 0) return [];
  const glyphs: RepeaterGlyph[] = [];
  let x = startX;
  let baseline = firstBaseline;
  const limit = startX + maxWidth;

  const newline = () => {
    x = startX;
    baseline += lineHeight;
  };

  const pushChar = (char: string): boolean => {
    if (glyphs.length >= MAX_GLYPHS) return false;
    const width = measure(char);
    if (!(width > 0)) return true;
    if (x > startX && x + width > limit) {
      // 行尾放不下的空格直接丢掉,避免换行后行首留一格空白
      if (char === " ") return true;
      newline();
    }
    if (char === " " && x === startX) return true;
    glyphs.push({ char, x, baseline, width });
    x += width;
    return true;
  };

  const tokens = text.split(/(\s)/).filter((token) => token.length > 0 && token !== "\r");
  for (const token of tokens) {
    if (glyphs.length >= MAX_GLYPHS) break;
    if (token === "\n") {
      newline();
      continue;
    }
    if (token === " " || token === "\t") {
      if (!pushChar(" ")) break;
      continue;
    }
    const width = measure(token);
    const overflows = x > startX && x + width > limit;
    const tooWide = width > maxWidth;
    if (overflows && !tooWide) newline();
    for (const char of token) {
      if (!pushChar(char)) break;
    }
  }
  return glyphs;
}

/**
 * 把经过时间映射到「写到第几个字」。
 * 写完后停 holdMs,loop 为真则整段重来;否则停在写完的那一帧。
 */
export function repeaterFrame(
  elapsedMs: number,
  glyphCount: number,
  msPerGlyph: number,
  holdMs: number,
  loop: boolean,
): RepeaterFrame {
  if (glyphCount <= 0 || msPerGlyph <= 0) {
    return { doneCount: 0, partial: 0, holding: false, finished: true };
  }
  const writeMs = glyphCount * msPerGlyph;
  const cycle = writeMs + Math.max(0, holdMs);
  let t = Number.isFinite(elapsedMs) && elapsedMs > 0 ? elapsedMs : 0;
  if (loop) {
    t = t % cycle;
  } else if (t >= cycle) {
    return { doneCount: glyphCount, partial: 1, holding: false, finished: true };
  }
  if (t >= writeMs) {
    return { doneCount: glyphCount, partial: 1, holding: true, finished: false };
  }
  const doneCount = Math.min(glyphCount - 1, Math.floor(t / msPerGlyph));
  const partial = (t - doneCount * msPerGlyph) / msPerGlyph;
  return { doneCount, partial, holding: false, finished: false };
}
