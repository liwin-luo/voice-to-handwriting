import { describe, expect, it } from "vitest";
import { FANCY_STYLES, toFancyText, wrapLines } from "./fancyText";

const cp = (s: string) => [...s].map((c) => c.codePointAt(0)!);

describe("toFancyText", () => {
  it("script 用 Letterlike 例外表:Hello → ℋℯ𝓵𝓵𝓸", () => {
    expect(cp(toFancyText("Hello", "script"))).toEqual([0x210b, 0x212f, 0x1d4c1, 0x1d4c1, 0x2134]);
  });

  it("boldScript 无例外,连续映射", () => {
    expect(cp(toFancyText("Hello", "boldScript"))).toEqual([
      0x1d4d7, 0x1d4ee, 0x1d4f5, 0x1d4f5, 0x1d4f8,
    ]);
  });

  it("fraktur 例外 C H I R Z", () => {
    expect(cp(toFancyText("CHIIRZ", "fraktur"))).toEqual([
      0x212d, 0x210c, 0x2111, 0x2111, 0x211c, 0x2128,
    ]);
  });

  it("outline 的 H 用 ℍ,数字进独立区块", () => {
    expect(cp(toFancyText("H1", "outline"))).toEqual([0x210d, 0x1d7d9]);
  });

  it("mono 有完整数字区", () => {
    expect(cp(toFancyText("2026", "mono"))).toEqual([
      0x1d7f8, 0x1d7f6, 0x1d7f8, 0x1d7fc,
    ]);
  });

  it("italic 的 h 用普朗克常数码位,bold 数字进独立区块", () => {
    expect(toFancyText("h", "italic").codePointAt(0)).toBe(0x210e);
    expect(cp(toFancyText("A0", "bold"))).toEqual([0x1d400, 0x1d7ce]);
  });

  it("没有数学数字的风格把数字原样留下", () => {
    for (const id of ["script", "boldScript", "italic", "boldItalic", "fraktur", "boldFraktur", "sansItalic", "sansBoldItalic"] as const) {
      expect(toFancyText("1.2", id)).toBe("1.2");
    }
  });

  it("非拉丁字符与标点、空格、换行原样保留", () => {
    expect(toFancyText("你好, ok!\n", "script")).toBe("你好, ℴ𝓀!\n");
  });

  it("空字符串返回空", () => {
    expect(toFancyText("", "mono")).toBe("");
  });

  it("未知风格回退原文", () => {
    expect(toFancyText("abc", "nope" as never)).toBe("abc");
  });

  it("每种风格覆盖全部 52 个字母且互不重复、落在合法区块", () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (const style of FANCY_STYLES) {
      const seen = new Set<number>();
      for (const ch of letters) {
        const out = toFancyText(ch, style.id);
        expect([...out]).toHaveLength(1);
        const code = out.codePointAt(0)!;
        expect(code).not.toBe(ch.codePointAt(0));
        seen.add(code);
      }
      expect(seen.size).toBe(52);
    }
  });
});

describe("wrapLines", () => {
  // measure:每字符 10px(空格也算),maxWidth 100px = 每行最多 10 字符
  const m = (s: string) => s.length * 10;

  it("按空格贪心折行,不超 maxWidth", () => {
    expect(wrapLines("aaa bbb ccc ddd", 100, m)).toEqual(["aaa bbb", "ccc ddd"]);
  });

  it("显式换行分段,空段丢弃", () => {
    expect(wrapLines("aaa\n\nbbb", 100, m)).toEqual(["aaa", "bbb"]);
  });

  it("超长单词按字符硬切", () => {
    expect(wrapLines("aaaaaaaaaaaaaaa", 100, m)).toEqual(["aaaaaaaaaa", "aaaaa"]);
  });

  it("行首超长词硬切后,后续词接在残段后", () => {
    expect(wrapLines("aaaaaaaaaaaaaa bb", 100, m)).toEqual(["aaaaaaaaaa", "aaaa bb"]);
  });

  it("CJK 无空格文本按测量硬切", () => {
    expect(wrapLines("你好世界早上好", 60, m)).toEqual(["你好世界早上", "好"]);
  });

  it("空字符串返回空数组", () => {
    expect(wrapLines("", 100, m)).toEqual([]);
  });
});
