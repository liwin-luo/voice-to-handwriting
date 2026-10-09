import { describe, expect, it } from "vitest";
import { FONTS } from "@/stores/useEditorStore";
import { CURSIVE_LETTERS } from "@/content/cursiveLetters";
import { ALPHABET, ALPHABET_FONTS, ALPHABET_PAGE, ALPHABET_UI } from "@/content/cursiveAlphabet";

/** /cursive-alphabet 内容注册表一致性:防死链、防字体 id 漂移、防文案缺空 */

describe("cursiveAlphabet 注册表", () => {
  it("恰好覆盖 a–z 26 个字母,顺序正确且大小写配对", () => {
    expect(ALPHABET).toHaveLength(26);
    ALPHABET.forEach((entry, i) => {
      expect(entry.lower).toBe(String.fromCharCode(97 + i));
      expect(entry.capital).toBe(String.fromCharCode(65 + i));
    });
  });

  it("引用的字母矩阵 slug 必须真实存在(防死链)", () => {
    const slugs = new Set(CURSIVE_LETTERS.map((l) => l.slug));
    for (const entry of ALPHABET) {
      if (entry.lowerSlug) expect(slugs.has(entry.lowerSlug)).toBe(true);
      if (entry.capitalSlug) expect(slugs.has(entry.capitalSlug)).toBe(true);
    }
  });

  it("slug 与字母字符、大小写形态一致(防止注册表错位)", () => {
    const bySlug = new Map(CURSIVE_LETTERS.map((l) => [l.slug, l]));
    for (const entry of ALPHABET) {
      if (entry.lowerSlug) {
        const l = bySlug.get(entry.lowerSlug)!;
        expect(l.letter).toBe(entry.lower);
        expect(l.form).toBe("lowercase");
      }
      if (entry.capitalSlug) {
        const l = bySlug.get(entry.capitalSlug)!;
        expect(l.letter).toBe(entry.capital);
        expect(l.form).toBe("capital");
      }
    }
  });

  it("字体清单全部存在于 FONTS,且默认教学字体 Sacramento 在首位", () => {
    const ids = new Set<string>(FONTS.map((f) => f.id));
    for (const f of ALPHABET_FONTS) expect(ids.has(f.id)).toBe(true);
    expect(ALPHABET_FONTS[0].id).toBe("sacramento");
  });

  it("页面文案与 FAQ 非空,title 前置主关键词", () => {
    expect(ALPHABET_PAGE.metaTitle.toLowerCase().startsWith("cursive alphabet")).toBe(true);
    expect(ALPHABET_PAGE.h1.toLowerCase()).toContain("cursive alphabet");
    expect(ALPHABET_PAGE.intro.length).toBeGreaterThan(80);
    expect(ALPHABET_PAGE.faqs.length).toBeGreaterThanOrEqual(4);
    for (const f of ALPHABET_PAGE.faqs) {
      expect(f.q.length).toBeGreaterThan(0);
      expect(f.a.length).toBeGreaterThan(0);
    }
  });

  it("UI 标签齐全(面板按钮/控件不得硬编码)", () => {
    for (const value of Object.values(ALPHABET_UI)) {
      expect(typeof value).toBe("string");
      expect(value.length).toBeGreaterThan(0);
    }
  });
});
