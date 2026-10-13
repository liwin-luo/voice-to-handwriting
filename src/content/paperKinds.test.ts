import { statSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { routing } from "@/i18n/routing";
import { handwritingBandCount, ruledLineCount, spacingFor } from "@/lib/paperSheet.mjs";
import { PAGE_FORMATS } from "@/lib/localeDefaults";
import { PAPER_KINDS } from "./paperKinds";

describe("paperKinds", () => {
  it("每种纸都有全部语言的标题和导语", () => {
    expect(PAPER_KINDS.map((k) => k.slug)).toEqual([
      "college-ruled",
      "wide-ruled",
      "kindergarten",
      "dot-grid",
      "story-paper",
      "cornell-notes",
      "narrow-ruled",
      "large-print",
      "graph-paper",
    ]);
    for (const kind of PAPER_KINDS) {
      for (const locale of routing.locales) {
        const copy = kind.copy[locale];
        expect(copy.title.length).toBeGreaterThan(10);
        expect(copy.intro.length).toBeGreaterThan(20);
        expect(copy.h1).not.toBe(copy.intro);
      }
      expect(statSync(`public/printables/${kind.slug}.pdf`).size).toBeGreaterThan(1_000);
    }
  });

  it("幼儿园页写明 Letter 上的行数，窄行和大字纸写明各自的行距", () => {
    const h = PAGE_FORMATS.letter.h;
    const kindergarten = PAPER_KINDS.find((k) => k.slug === "kindergarten");
    const narrow = PAPER_KINDS.find((k) => k.slug === "narrow-ruled");
    const large = PAPER_KINDS.find((k) => k.slug === "large-print");
    expect(kindergarten?.copy.en.intro).toContain(String(handwritingBandCount(h, spacingFor("handwriting"))));
    expect(kindergarten?.copy.en.intro.toLowerCase()).toContain("actual size");
    expect(narrow?.copy.en.title).toContain("1/4");
    expect(narrow?.copy.en.intro).toContain(String(ruledLineCount(h, spacingFor("narrow"))));
    expect(large?.copy.en.intro).toContain("1/2 inch");
    expect(large?.copy.en.intro).toContain(String(ruledLineCount(h, spacingFor("large"))));
  });
});
