import { describe, expect, it } from "vitest";
import { FAQ_HUB } from "./faqHub";
import { CURSIVE_FAQS, FAQ_ITEMS, REPEATER_FAQS, getLocalizedFaqs } from "./faqs";
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
});
