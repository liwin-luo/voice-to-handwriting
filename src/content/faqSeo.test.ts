import { describe, expect, it } from "vitest";
import { FAQ_HUB } from "./faqHub";
import { CURSIVE_FAQS, FAQ_ITEMS, REPEATER_FAQS, getLocalizedFaqs } from "./faqs";
import { CURSIVE_WORKSHEET_FAQS, TEMPLATE_FAQS, templateDetailFaqs } from "./pageFaqs";
import { LETTER_HUB_FAQS } from "./letterTracing";
import { getTemplate, getTemplateMeta } from "./templates";
import { routing, type Locale } from "@/i18n/routing";
import { paperKindFaqs } from "./paperKindFaqs";

describe("tool FAQ order and page ownership", () => {
  it("moves a leading free question to the end", () => {
    const cursive = getLocalizedFaqs(CURSIVE_FAQS, "en");
    expect(cursive[0].q).toMatch(/fonts/i);
    expect(cursive.at(-1)?.q).toMatch(/free/i);
    const repeater = getLocalizedFaqs(REPEATER_FAQS, "en");
    expect(repeater[0].q).toMatch(/animation/i);
    expect(repeater[1].q).toMatch(/watch letters/i);
    expect(repeater.at(-1)?.q).toMatch(/free/i);
  });

  it("gives each paper its own questions", () => {
    const dots = getLocalizedFaqs(paperKindFaqs("dot-grid"), "en").map((item) => `${item.q} ${item.a}`);
    expect(dots.join(" ").toLowerCase()).not.toContain("college ruled");
    expect(getLocalizedFaqs(paperKindFaqs("college-ruled"), "en")[0].a).toContain("7.1");
    expect(getLocalizedFaqs(paperKindFaqs("cornell-notes"), "en")[0].q).toMatch(/Cornell/);
  });

  it("does not repeat homepage questions on the faq index", () => {
    const home = new Set(getLocalizedFaqs(FAQ_ITEMS, "en").map((item) => item.q));
    const hub = getLocalizedFaqs(FAQ_HUB, "en");
    expect(hub.length).toBeGreaterThan(0);
    for (const item of hub) {
      expect(home.has(item.q)).toBe(false);
      expect(item.link?.href.startsWith("/")).toBe(true);
    }
  });

  it("gives worksheets, the template index, and each template their own questions", () => {
    expect(LETTER_HUB_FAQS).toHaveLength(3);
    expect(LETTER_HUB_FAQS[2].link?.href).toBe("/name-tracing");
    for (const locale of routing.locales) {
      const sheets = getLocalizedFaqs(CURSIVE_WORKSHEET_FAQS, locale as Locale);
      const library = getLocalizedFaqs(TEMPLATE_FAQS, locale as Locale);
      expect(sheets).toHaveLength(3);
      expect(library).toHaveLength(3);
        expect(sheets.at(-1)?.q.toLowerCase()).toMatch(/free|gratis|grátis|gratuit|kostenlos|免费|無料|무료/);
      const love = getTemplateMeta(getTemplate("love-letter")!, locale as Locale);
      const apology = getTemplateMeta(getTemplate("apology-letter")!, locale as Locale);
      const loveFaq = templateDetailFaqs(love, locale as Locale, "use");
      const apologyFaq = templateDetailFaqs(apology, locale as Locale, "use");
      expect(loveFaq).toHaveLength(3);
      expect(loveFaq[0].q).not.toBe(apologyFaq[0].q);
      expect(loveFaq[1].a).toContain(love.text.split("\n")[0].trim());
      expect(loveFaq[1].a).not.toBe(apologyFaq[1].a);
      expect(library[0].q).not.toBe(loveFaq[0].q);
    }
  });
});
