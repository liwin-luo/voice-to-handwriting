import { describe, expect, it } from "vitest";
import { dailyPick, toDateStr, weekDates, ADULT_SENTENCES, KID_SENTENCES } from "./dailyCursive";

describe("dailyPick", () => {
  it("同 (日期, 级别) 永远同一份(确定性)", () => {
    expect(dailyPick("2026-10-08", "kids")).toEqual(dailyPick("2026-10-08", "kids"));
    expect(dailyPick("2026-10-08", "adults")).toEqual(dailyPick("2026-10-08", "adults"));
  });

  it("形状正确:2 个不同字母组、3 个单词、句子来自对应词池", () => {
    for (const level of ["kids", "adults"] as const) {
      const s = dailyPick("2026-10-08", level);
      expect(s.groups[0].letters).not.toBe(s.groups[1].letters);
      expect(s.words).toHaveLength(3);
      expect(s.words.every((w) => w.length > 0)).toBe(true);
      const pool = level === "kids" ? KID_SENTENCES : ADULT_SENTENCES;
      expect(pool).toContain(s.sentence);
    }
  });

  it("kids 与 adults 的句子来自不同词池", () => {
    const s = dailyPick("2026-10-08", "kids");
    expect(ADULT_SENTENCES).not.toContain(s.sentence);
  });

  it("连续 60 天内容有足够变化(句子至少 30 种)", () => {
    const sentences = new Set<string>();
    for (let i = 0; i < 60; i++) {
      const d = new Date(2026, 0, 1 + i);
      sentences.add(dailyPick(toDateStr(d), "adults").sentence);
    }
    expect(sentences.size).toBeGreaterThanOrEqual(30);
  });
});

describe("weekDates", () => {
  it("返回周一到周日共 7 天", () => {
    // 2026-10-08 是周四
    const days = weekDates(new Date(2026, 9, 8));
    expect(days).toHaveLength(7);
    expect(days[0]).toBe("2026-10-05");
    expect(days[6]).toBe("2026-10-11");
  });

  it("周日所在周从本周一算起", () => {
    const days = weekDates(new Date(2026, 9, 11));
    expect(days[0]).toBe("2026-10-05");
  });
});
