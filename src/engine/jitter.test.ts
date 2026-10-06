import { describe, expect, it } from "vitest";
import { charJitter, hash2, mulberry32 } from "./jitter";

describe("mulberry32", () => {
  it("同种子产生相同序列", () => {
    const a = mulberry32(42);
    const b = mulberry32(42);
    expect([a(), a(), a()]).toEqual([b(), b(), b()]);
  });
});

describe("hash2", () => {
  it("确定性且对不同输入分散", () => {
    expect(hash2(1, 2)).toBe(hash2(1, 2));
    expect(hash2(1, 2)).not.toBe(hash2(2, 1));
  });
});

describe("charJitter", () => {
  it("同 seed 同 index 结果确定", () => {
    expect(charJitter(7, 99, 0.6)).toEqual(charJitter(7, 99, 0.6));
  });

  it("intensity=0 时无抖动", () => {
    const j = charJitter(0, 1, 0);
    expect(j.rotate).toBe(0);
    expect(j.translateY).toBe(0);
    expect(j.scale).toBe(1);
    expect(j.opacity).toBe(1);
  });

  it("不同 index 抖动不同且在范围内", () => {
    const rotates = Array.from({ length: 20 }, (_, i) => charJitter(i, 5, 1).rotate);
    expect(new Set(rotates).size).toBeGreaterThan(5);
    for (const r of rotates) {
      expect(r).toBeGreaterThanOrEqual(-2);
      expect(r).toBeLessThanOrEqual(2);
    }
  });
});
