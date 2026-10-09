/** 花体文本生成(/cursive-text-generator):把拉丁字母映射为 Unicode Mathematical
 *  Alphanumeric Symbols,输出可复制粘贴的纯文本。纯字符串映射,无字体、无 canvas。 */

export type FancyStyleId =
  | "script"
  | "boldScript"
  | "italic"
  | "bold"
  | "boldItalic"
  | "fraktur"
  | "boldFraktur"
  | "outline"
  | "sans"
  | "sansBold"
  | "sansItalic"
  | "sansBoldItalic"
  | "mono";

export interface FancyStyle {
  id: FancyStyleId;
  /** 字母区起始码点:大写 A;区块按 A-Z(0–25)、a-z(26–51)排列,共 52 个码位 */
  letterBase: number;
  /** 数字区起始码点(数字 0 所在);Unicode 未定义该风格的数学数字时为 null,数字原样保留 */
  digitBase: number | null;
  /** 部分大写/小写字母在区块诞生前已占用,正规码位落在 Letterlike Symbols 区(ℋ ℯ ℜ ℍ 等) */
  exceptions?: Record<string, string>;
}

export const FANCY_STYLES: FancyStyle[] = [
  {
    id: "script",
    letterBase: 0x1d49c,
    digitBase: null,
    exceptions: {
      B: "\u212c",
      E: "\u2130",
      F: "\u2131",
      H: "\u210b",
      I: "\u2110",
      L: "\u2112",
      M: "\u2133",
      R: "\u211b",
      e: "\u212f",
      g: "\u210a",
      o: "\u2134",
    },
  },
  { id: "boldScript", letterBase: 0x1d4d0, digitBase: null },
  {
    id: "italic",
    letterBase: 0x1d434,
    digitBase: null,
    exceptions: { h: "\u210e" },
  },
  { id: "bold", letterBase: 0x1d400, digitBase: 0x1d7ce },
  { id: "boldItalic", letterBase: 0x1d468, digitBase: null },
  {
    id: "fraktur",
    letterBase: 0x1d504,
    digitBase: null,
    exceptions: { C: "\u212d", H: "\u210c", I: "\u2111", R: "\u211c", Z: "\u2128" },
  },
  { id: "boldFraktur", letterBase: 0x1d56c, digitBase: null },
  {
    id: "outline",
    letterBase: 0x1d538,
    digitBase: 0x1d7d8,
    exceptions: {
      C: "\u2102",
      H: "\u210d",
      N: "\u2115",
      P: "\u2119",
      Q: "\u211a",
      R: "\u211d",
      Z: "\u2124",
    },
  },
  { id: "sans", letterBase: 0x1d5a0, digitBase: 0x1d7e2 },
  { id: "sansBold", letterBase: 0x1d5d4, digitBase: 0x1d7ec },
  { id: "sansItalic", letterBase: 0x1d608, digitBase: null },
  { id: "sansBoldItalic", letterBase: 0x1d63c, digitBase: null },
  { id: "mono", letterBase: 0x1d670, digitBase: 0x1d7f6 },
];

/** 现成短语。只放拉丁字母:数学字母区映射不到 CJK,译成中文就不再是花体。 */
export const FANCY_PHRASES = ["Love", "Forever yours", "Thank you", "Dream big"] as const;

/**
 * 按风格把文本转成花体 Unicode 字符。
 * 只映射 A-Z / a-z / 0-9;其余字符(空格、换行、标点、CJK)原样保留。
 */
export function toFancyText(text: string, styleId: FancyStyleId): string {
  const style = FANCY_STYLES.find((s) => s.id === styleId);
  if (!style) return text;

  let out = "";
  for (const ch of text) {
    if (style.exceptions && style.exceptions[ch]) {
      out += style.exceptions[ch];
      continue;
    }
    const code = ch.codePointAt(0)!;
    if (code >= 0x41 && code <= 0x5a) {
      out += String.fromCodePoint(style.letterBase + code - 0x41);
    } else if (code >= 0x61 && code <= 0x7a) {
      out += String.fromCodePoint(style.letterBase + 26 + code - 0x61);
    } else if (style.digitBase !== null && code >= 0x30 && code <= 0x39) {
      out += String.fromCodePoint(style.digitBase + code - 0x30);
    } else {
      out += ch;
    }
  }
  return out;
}

/**
 * 画布折行:按显式换行分段(空段丢弃),段内按空格贪心折行,
 * 单个超长词按字符硬切(for…of 按码位迭代,代理对不会切碎)。
 * maxWidth 单位 px;measure 返回字符串的像素宽(调用方用 ctx.measureText 注入,便于单测)。
 */
export function wrapLines(text: string, maxWidth: number, measure: (s: string) => number): string[] {
  const out: string[] = [];
  for (const para of text.split("\n")) {
    if (para.trim() === "") continue;
    let cur = "";
    for (const word of para.split(" ")) {
      const cand = cur ? `${cur} ${word}` : word;
      if (measure(cand) <= maxWidth) {
        cur = cand;
        continue;
      }
      if (cur) {
        out.push(cur);
        cur = "";
      }
      if (measure(word) > maxWidth) {
        let slice = "";
        for (const ch of word) {
          if (slice && measure(slice + ch) > maxWidth) {
            out.push(slice);
            slice = ch;
          } else {
            slice += ch;
          }
        }
        cur = slice;
      } else {
        cur = word;
      }
    }
    if (cur) out.push(cur);
  }
  return out;
}
