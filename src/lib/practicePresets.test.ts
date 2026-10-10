import { describe, expect, it } from "vitest";
import { CURSIVE_JOIN_GROUPS, joinLines, numberLines } from "./practicePresets";

describe("practice presets", () => {
  it("数字一行一个，最多 20", () => {
    expect(numberLines(10).split("\n")).toEqual(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]);
    expect(numberLines(99).split("\n")).toHaveLength(20);
  });

  it("连笔组都是两个字母", () => {
    for (const pairs of Object.values(CURSIVE_JOIN_GROUPS)) {
      expect(pairs.length).toBeGreaterThan(3);
      for (const pair of pairs) expect(pair).toMatch(/^[a-z]{2}$/);
    }
    expect(joinLines(CURSIVE_JOIN_GROUPS.same).startsWith("th\n")).toBe(true);
  });
});
