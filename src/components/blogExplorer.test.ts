import { describe, expect, it } from "vitest";
import { hiddenChipCount } from "./chipOverflow";

describe("hiddenChipCount", () => {
  it("全部放得下时为 0", () => {
    expect(hiddenChipCount([40, 40, 40], 8, 40 + 8 + 40 + 8 + 40)).toBe(0);
  });

  it("从放不下的那颗起全部算隐藏", () => {
    expect(hiddenChipCount([40, 40, 40], 8, 40 + 8 + 40)).toBe(1);
    expect(hiddenChipCount([40, 50, 60], 8, 40)).toBe(2);
  });

  it("空列表为 0", () => {
    expect(hiddenChipCount([], 8, 100)).toBe(0);
  });
});
