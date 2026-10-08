import { describe, expect, it } from "vitest";
import { layoutRepeaterText, repeaterFrame } from "./repeater";

/** 空格窄、其余字符等宽,方便断言折行位置 */
function measure(s: string): number {
  let w = 0;
  for (const ch of s) w += ch === " " ? 4 : 10;
  return w;
}

const layout = (text: string, maxWidth: number) =>
  layoutRepeaterText({
    text,
    maxWidth,
    startX: 0,
    firstBaseline: 100,
    lineHeight: 40,
    measure,
  });

describe("layoutRepeaterText", () => {
  it("空文本没有字形", () => {
    expect(layout("", 200)).toEqual([]);
  });

  it("词放得下就留在同一行,放不下整词换行", () => {
    const glyphs = layout("abcde fghij", 60);
    const f = glyphs.find((g) => g.char === "f");
    expect(f).toMatchObject({ x: 0, baseline: 140 });
    expect(glyphs[0]).toMatchObject({ char: "a", x: 0, baseline: 100 });
  });

  it("换行后不把空格留在行首", () => {
    const glyphs = layout("abcde f", 50);
    expect(glyphs.map((g) => g.char).join("")).toBe("abcdef");
    expect(glyphs.at(-1)).toMatchObject({ char: "f", x: 0, baseline: 140 });
  });

  it("显式换行另起一行", () => {
    const glyphs = layout("ab\ncd", 200);
    expect(glyphs.find((g) => g.char === "c")).toMatchObject({ x: 0, baseline: 140 });
  });

  it("没有空格的超宽片段按字折行", () => {
    const glyphs = layout("你好世界", 25);
    expect(glyphs.map((g) => [g.char, g.x, g.baseline])).toEqual([
      ["你", 0, 100],
      ["好", 10, 100],
      ["世", 0, 140],
      ["界", 10, 140],
    ]);
  });
});

describe("repeaterFrame", () => {
  it("开头还没写出任何完整字形", () => {
    expect(repeaterFrame(0, 4, 100, 200, true)).toEqual({
      doneCount: 0,
      partial: 0,
      holding: false,
      finished: false,
    });
  });

  it("写到一半时 partial 落在当前字形上", () => {
    expect(repeaterFrame(150, 4, 100, 200, true)).toMatchObject({
      doneCount: 1,
      partial: 0.5,
      holding: false,
    });
  });

  it("写完后进入停顿,循环再从零开始", () => {
    expect(repeaterFrame(400, 4, 100, 200, true)).toMatchObject({
      doneCount: 4,
      holding: true,
      finished: false,
    });
    expect(repeaterFrame(600, 4, 100, 200, true)).toMatchObject({
      doneCount: 0,
      partial: 0,
      holding: false,
    });
  });

  it("不循环时停在写完的一帧", () => {
    expect(repeaterFrame(10_000, 4, 100, 200, false)).toEqual({
      doneCount: 4,
      partial: 1,
      holding: false,
      finished: true,
    });
  });
});
