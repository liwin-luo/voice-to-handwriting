import { describe, expect, it } from "vitest";
import { routing } from "@/i18n/routing";
import { PAPER_KINDS } from "./paperKinds";

describe("paperKinds", () => {
  it("每种纸都有全部语言的标题和导语", () => {
    expect(PAPER_KINDS.map((k) => k.slug)).toEqual(["college-ruled", "wide-ruled", "kindergarten"]);
    for (const kind of PAPER_KINDS) {
      for (const locale of routing.locales) {
        const copy = kind.copy[locale];
        expect(copy.title.length).toBeGreaterThan(10);
        expect(copy.intro.length).toBeGreaterThan(20);
        expect(copy.h1).not.toBe(copy.intro);
      }
    }
  });
});
