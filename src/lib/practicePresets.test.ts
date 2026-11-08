import { describe, expect, it } from "vitest";
import { numberLines } from "./practicePresets";

describe("practice presets", () => {
  it("数字一行一个，最多 20", () => {
    expect(numberLines(10).split("\n")).toEqual(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]);
    expect(numberLines(99).split("\n")).toHaveLength(20);
  });
});
