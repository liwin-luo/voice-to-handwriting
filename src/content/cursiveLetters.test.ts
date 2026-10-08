import { describe, expect, it } from "vitest";
import { routing, type Locale } from "@/i18n/routing";
import {
  CURSIVE_LETTERS,
  getLetterPage,
  getLetterUi,
  letterWorkbookWords,
  lettersForLocale,
} from "@/content/cursiveLetters";

/** 字母矩阵页内容红线(docs/traffic-ceiling-roadmap.md §2.1):
 *  每页必须有真实增量信息(笔顺/错误点/FAQ),不得模板化灌水;EN-only 阶段非英文必须 404。 */

const SLUG_RE = /^[a-z]+(-[a-z]+)*$/;

describe("cursiveLetters:数据形状", () => {
  it("slug 唯一且为小写 kebab-case", () => {
    const slugs = CURSIVE_LETTERS.map((l) => l.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(SLUG_RE);
  });

  it.each(CURSIVE_LETTERS.map((l) => l.slug))("%s:字形单字符且与 form 大小写一致", (slug) => {
    const l = CURSIVE_LETTERS.find((x) => x.slug === slug)!;
    expect(l.letter).toHaveLength(1);
    if (l.form === "lowercase") {
      expect(l.letter).toBe(l.letter.toLowerCase());
      expect(SLUG_RE.test(l.slug)).toBe(true);
      expect(l.slug).toBe(l.letter);
    } else {
      expect(l.letter).toBe(l.letter.toUpperCase());
      expect(l.slug).toBe(`capital-${l.letter.toLowerCase()}`);
    }
  });

  it.each(CURSIVE_LETTERS.map((l) => l.slug))("%s:en 文案与元数据齐全", (slug) => {
    const l = CURSIVE_LETTERS.find((x) => x.slug === slug)!;
    expect(l.copy.en, `${slug} 缺 en copy`).toBeTruthy();
    expect(l.meta.en?.title.trim()).toBeTruthy();
    expect(l.meta.en!.description.trim()).toBeTruthy();
    expect(l.meta.en!.description.length).toBeLessThanOrEqual(320);
  });
});

describe("cursiveLetters:内容质量红线", () => {
  it.each(CURSIVE_LETTERS.map((l) => l.slug))("%s:笔顺≥3、错误点≥3、练习词≥5 且不重复", (slug) => {
    const copy = CURSIVE_LETTERS.find((x) => x.slug === slug)!.copy.en!;
    expect(copy.steps.length, "笔顺步骤不足").toBeGreaterThanOrEqual(3);
    expect(copy.mistakes.length, "常见错误不足").toBeGreaterThanOrEqual(3);
    expect(copy.words.length, "练习词不足").toBeGreaterThanOrEqual(5);
    expect(new Set(copy.words).size).toBe(copy.words.length);
    for (const s of [...copy.steps, ...copy.mistakes]) expect(s.trim().length).toBeGreaterThanOrEqual(30);
  });

  it.each(CURSIVE_LETTERS.map((l) => l.slug))("%s:练习词都包含目标字母", (slug) => {
    const l = CURSIVE_LETTERS.find((x) => x.slug === slug)!;
    const target = l.letter.toLowerCase();
    for (const w of l.copy.en!.words) expect(w.toLowerCase()).toContain(target);
  });

  it.each(CURSIVE_LETTERS.map((l) => l.slug))("%s:恰好 3 条 FAQ 且回答有实质内容", (slug) => {
    const faqs = CURSIVE_LETTERS.find((x) => x.slug === slug)!.copy.en!.faqs;
    expect(faqs).toHaveLength(3);
    for (const f of faqs) {
      expect(f.q.trim().length).toBeGreaterThanOrEqual(15);
      expect(f.a.trim().length, `FAQ 回答过短:${f.q}`).toBeGreaterThanOrEqual(60);
    }
    expect(new Set(faqs.map((f) => f.q)).size).toBe(3);
  });
});

describe("cursiveLetters:解析与 EN-only 边界", () => {
  it("en 可解析全部字母;非 en 返回 undefined(页面 404,不做语言回退)", () => {
    for (const l of CURSIVE_LETTERS) {
      expect(getLetterPage(l.slug, "en")).toBeDefined();
      for (const locale of routing.locales.filter((x) => x !== "en")) {
        expect(getLetterPage(l.slug, locale), `${l.slug}.${locale} 应 404`).toBeUndefined();
      }
    }
    expect(getLetterPage("nope", "en")).toBeUndefined();
  });

  it("lettersForLocale/getLetterUi:仅 en 有内容(hub 与导航依赖此过滤)", () => {
    expect(lettersForLocale("en")).toHaveLength(CURSIVE_LETTERS.length);
    for (const locale of routing.locales.filter((x) => x !== "en")) {
      expect(lettersForLocale(locale as Locale)).toHaveLength(0);
      expect(getLetterUi(locale as Locale)).toBeUndefined();
    }
  });

  it("workbook 预填词表以字形开头且含全部练习词", () => {
    const l = CURSIVE_LETTERS[0];
    const words = letterWorkbookWords(l, l.copy.en!).split(",");
    expect(words[0]).toBe(l.letter);
    expect(words.slice(1)).toEqual(l.copy.en!.words);
  });
});
