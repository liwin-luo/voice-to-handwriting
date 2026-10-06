import { describe, expect, it } from "vitest";
import { tokenize } from "./tokens";

describe("tokenize", () => {
  it("中文字逐字、英文按词、空格与换行独立", () => {
    expect(tokenize("你好 world\n")).toEqual([
      { text: "你", kind: "cjk" },
      { text: "好", kind: "cjk" },
      { text: " ", kind: "space" },
      { text: "world", kind: "word" },
      { text: "\n", kind: "newline" },
    ]);
  });

  it("全角标点与中文符号归入 cjk", () => {
    const kinds = tokenize("你好\uFF0C世界\u3002").map((t) => t.kind);
    expect(kinds.every((k) => k === "cjk")).toBe(true);
  });

  it("数字与小数点归入 word", () => {
    expect(tokenize("3.14 元")).toContainEqual({ text: "3.14", kind: "word" });
  });
});
