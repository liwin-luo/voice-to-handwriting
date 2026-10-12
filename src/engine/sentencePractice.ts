import { TRACE_GRADES } from "@/lib/traceGrades";

/** 单句练习纸的纯判断:截句、一行是否放得下、哪几行有范字、边距和斜线方向。 */

export type SentenceFocus = "size" | "slant" | "spacing" | "print";
export type RowKind = "solid" | "dashed" | "blank";
export type MarginSide = "left" | "right";
export type SlantDirection = "left" | "right";
export type ModelFontId = "patrickhand" | "sacramento";

export type SheetGuide =
  | { kind: "baseline" }
  | { kind: "midline" }
  | { kind: "slant"; direction: SlantDirection }
  | { kind: "spaceTicks" };

/** 与连笔练习纸的大行 / 普通 / 小行同一套行高,不用学前年级名。 */
export const LINE_HEIGHTS = {
  large: TRACE_GRADES[0].bandH,
  regular: TRACE_GRADES[1].bandH,
  small: TRACE_GRADES[2].bandH,
} as const;

export type LineHeightId = keyof typeof LINE_HEIGHTS;

/** 相对竖直偏 15°。正方向是面向右(字顶在基线右上方)。 */
export const SLANT_DEGREES = 15;

/** 拉丁文一行上限。含汉字、假名或谚文时改用 CJK_LINE_MAX。按码位计,不是量出来的行宽。 */
export const LATIN_LINE_MAX = 80;
export const CJK_LINE_MAX = 40;

const SENTENCE_END = /[.!?。！？]/;
const WIDE_SCRIPT = /[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\u3040-\u30ff\uac00-\ud7af]/;
const WORD_SPACE = /[ \u3000]/;

const FOCUSES = new Set<SentenceFocus>(["size", "slant", "spacing", "print"]);
const HEIGHTS = new Set<LineHeightId>(["large", "regular", "small"]);

export const SENTENCE_PRACTICE_KEY = "vth-sentence-practice";

export interface SentencePracticeRecord {
  sentence: string;
  focus: SentenceFocus;
  leftHand: boolean;
  script: boolean;
  lineHeight: LineHeightId;
  downloadedAt: string;
}

/**
 * 只留第一句。句末标点算在这一句里;后面还有字才算被截断。
 * 上限:缩写和小数里的点也会切开("Mr. Smith" → "Mr.")。要更聪明的分句再换分句器。
 * 换行收成空格,否则画布 fillText 会丢掉换行后面的字。
 */
export function firstSentence(text: string): { sentence: string; truncated: boolean } {
  const flat = text.replace(/\s+/g, " ").trim();
  if (!flat) return { sentence: "", truncated: false };
  const match = SENTENCE_END.exec(flat);
  if (!match) return { sentence: flat, truncated: false };
  const end = match.index + match[0].length;
  const sentence = flat.slice(0, end).trim();
  const rest = flat.slice(end).trim();
  return { sentence, truncated: rest.length > 0 };
}

/** 输入为空时用当前语言的例句,输入框本身不填。 */
export function printedSentence(input: string, sample: string): { sentence: string; truncated: boolean } {
  const cut = firstSentence(input);
  if (!cut.sentence) return { sentence: sample.trim(), truncated: false };
  return cut;
}

export function lineLimit(sentence: string): number {
  return WIDE_SCRIPT.test(sentence) ? CJK_LINE_MAX : LATIN_LINE_MAX;
}

export function fitsOneLine(sentence: string): boolean {
  return [...sentence].length <= lineLimit(sentence);
}

/** 间距只认空格(含全角空格)。没有空格时纸上不画竖线。 */
export function wordSpaceIndexes(sentence: string): number[] {
  const indexes: number[] = [];
  [...sentence].forEach((ch, i) => {
    if (WORD_SPACE.test(ch)) indexes.push(i);
  });
  return indexes;
}

/** 再写一遍时拿掉实心行和虚线行,只留三行空白。 */
export function sheetRows(rewrite: boolean): RowKind[] {
  return rewrite ? ["blank", "blank", "blank"] : ["solid", "dashed", "blank", "blank", "blank"];
}

/** 左手把红边距放到右边,少让手抹到刚写的字。 */
export function marginSide(leftHand: boolean): MarginSide {
  return leftHand ? "right" : "left";
}

/** 只有「斜度」才有斜线。左手时改为面向左。 */
export function slantDirection(focus: SentenceFocus, leftHand: boolean): SlantDirection | null {
  if (focus !== "slant") return null;
  return leftHand ? "left" : "right";
}

export function guidesFor(focus: SentenceFocus, leftHand: boolean): SheetGuide[] {
  if (focus === "size") return [{ kind: "baseline" }, { kind: "midline" }];
  if (focus === "print") return [{ kind: "baseline" }];
  if (focus === "spacing") return [{ kind: "baseline" }, { kind: "spaceTicks" }];
  return [{ kind: "slant", direction: leftHand ? "left" : "right" }];
}

/** 印刷体锁定 Patrick Hand。花体开关只在另外三项里把范字换成 Sacramento。 */
export function modelFont(focus: SentenceFocus, script: boolean): ModelFontId {
  if (focus === "print" || !script) return "patrickhand";
  return "sacramento";
}

export function parseSentencePracticeRecord(raw: string | null): SentencePracticeRecord | null {
  if (!raw) return null;
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!data || typeof data !== "object") return null;
  const record = data as Record<string, unknown>;
  if (typeof record.sentence !== "string") return null;
  if (typeof record.focus !== "string" || !FOCUSES.has(record.focus as SentenceFocus)) return null;
  if (typeof record.leftHand !== "boolean") return null;
  if (typeof record.script !== "boolean") return null;
  if (typeof record.lineHeight !== "string" || !HEIGHTS.has(record.lineHeight as LineHeightId)) return null;
  if (typeof record.downloadedAt !== "string" || Number.isNaN(Date.parse(record.downloadedAt))) return null;
  const focus = record.focus as SentenceFocus;
  return {
    sentence: record.sentence,
    focus,
    leftHand: record.leftHand,
    script: focus === "print" ? false : record.script,
    lineHeight: record.lineHeight as LineHeightId,
    downloadedAt: record.downloadedAt,
  };
}
