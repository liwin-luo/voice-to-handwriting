import { describe, expect, it } from "vitest";
import { QUIZ_CONTENT } from "@/content/quiz";
import { formatProgress, scoreQuiz } from "@/lib/quiz";
import { routing } from "@/i18n/routing";

const en = QUIZ_CONTENT.en;
const LOCALES = routing.locales;

describe("scoreQuiz 计分", () => {
  it("全选 2 分档 → 各维度拉满,命中 spark(pace+social 双高)", () => {
    // 各题 2 分选项下标:q1-3=0, q4/5=2, q6-8=2, q9=2, q10=0, q11/12=2
    const r = scoreQuiz([0, 0, 0, 2, 2, 2, 2, 2, 2, 0, 2, 2], en.questions);
    expect(r.dimensions.map((d) => d.level)).toEqual(["high", "high", "high", "high", "high"]);
    expect(r.profile).toBe("spark");
  });

  it("全选 0 分档 → spirit(focus 低 + social 低)", () => {
    const r = scoreQuiz([2, 2, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0], en.questions);
    expect(r.dimensions.every((d) => d.score === 0)).toBe(true);
    expect(r.profile).toBe("spirit");
  });

  it("全选中档 → balanced", () => {
    const r = scoreQuiz([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], en.questions);
    expect(r.dimensions.every((d) => d.level === "mid")).toBe(true);
    expect(r.profile).toBe("balanced");
  });

  it("expressive+social 高但 pace 不高 → bold", () => {
    const r = scoreQuiz([0, 0, 0, 2, 2, 1, 1, 1, 1, 1, 1, 1], en.questions);
    expect(r.profile).toBe("bold");
  });

  it("focus 高且 expressive 不高 → planner", () => {
    const r = scoreQuiz([1, 1, 1, 0, 0, 1, 1, 2, 2, 0, 1, 1], en.questions);
    expect(r.profile).toBe("planner");
  });

  it("social 低但 focus 不低 → steady(不落到 spirit)", () => {
    const r = scoreQuiz([2, 2, 2, 0, 0, 1, 1, 1, 1, 1, 1, 1], en.questions);
    expect(r.profile).toBe("steady");
  });

  it("映射确定性:同答案同结果", () => {
    const a = [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2];
    expect(scoreQuiz(a, en.questions)).toEqual(scoreQuiz(a, en.questions));
  });

  it("答案不足时按 0 分防御,不抛错", () => {
    const r = scoreQuiz([0], en.questions);
    expect(r.dimensions).toHaveLength(5);
    expect(r.profile).toBe("balanced");
  });
});

describe("内容完整性(8 语言)", () => {
  it("每个语言都有完整内容:12 题、选项 3 个且分值为 0/1/2 各一", () => {
    for (const locale of LOCALES) {
      const c = QUIZ_CONTENT[locale];
      expect(c.questions, locale).toHaveLength(12);
      for (const q of c.questions) {
        expect(q.options.map((o) => o.score).sort(), `${locale}:${q.id}`).toEqual([0, 1, 2]);
        for (const o of q.options) {
          expect(o.label.length, `${locale}:${q.id}`).toBeGreaterThan(0);
        }
      }
    }
  });

  it("维度分布固定:social 3 题、expressive 2、space 2、focus 3、pace 2", () => {
    for (const locale of LOCALES) {
      const counts = new Map<string, number>();
      for (const q of QUIZ_CONTENT[locale].questions) {
        counts.set(q.dimension, (counts.get(q.dimension) ?? 0) + 1);
      }
      expect(Object.fromEntries(counts)).toEqual({
        social: 3,
        expressive: 2,
        space: 2,
        focus: 3,
        pace: 2,
      });
    }
  });

  it("视觉题都有样张文字,自述题没有", () => {
    for (const locale of LOCALES) {
      for (const q of QUIZ_CONTENT[locale].questions) {
        if (["i-dots", "pace"].includes(q.id)) {
          expect(q.text, locale).toBeUndefined();
        } else {
          expect(q.text?.length, `${locale}:${q.id}`).toBeGreaterThan(0);
        }
      }
    }
  });

  it("每个维度都有练习建议,且指向站内已知路由", () => {
    const known = new Set([
      "/cursive",
      "/name-tracing",
      "/word-work",
      "/printable-paper",
      "/cursive-worksheets",
      "/writing-practice",
    ]);
    for (const locale of LOCALES) {
      for (const d of Object.values(QUIZ_CONTENT[locale].dimensions)) {
        expect(known.has(d.practice.href), `${locale}:${d.practice.href}`).toBe(true);
        expect(d.practice.text.length).toBeGreaterThan(0);
      }
    }
  });

  it("6 个档案在所有语言下内容齐全", () => {
    const ids = ["balanced", "bold", "planner", "spirit", "steady", "spark"] as const;
    for (const locale of LOCALES) {
      for (const id of ids) {
        const p = QUIZ_CONTENT[locale].profiles[id];
        expect(p.name.length, `${locale}:${id}`).toBeGreaterThan(0);
        expect(p.emoji.length).toBeGreaterThan(0);
        expect(p.points).toHaveLength(3);
        expect(p.growth.length).toBeGreaterThan(0);
      }
    }
  });

  it("进度文案含 {n} 与 {total} 占位符;替换函数工作", () => {
    for (const locale of LOCALES) {
      const t = QUIZ_CONTENT[locale].progress;
      expect(t).toContain("{n}");
      expect(t).toContain("{total}");
    }
    expect(formatProgress("Q {n} / {total}", 3, 12)).toBe("Q 3 / 12");
  });

  it("科学性声明与免责声明在所有语言下非空", () => {
    for (const locale of LOCALES) {
      const c = QUIZ_CONTENT[locale];
      expect(c.scienceText).toHaveLength(2);
      expect(c.disclaimer.length).toBeGreaterThan(0);
    }
  });
});
