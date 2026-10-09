import { describe, expect, it } from "vitest";
import { navGroupsFor, toolGroupsFor } from "./tools";

const NAV_HREFS = [
  "/",
  "/cursive",
  "/cursive-text-generator",
  "/printable-handwritten-letters",
  "/name-tracing",
  "/printable-paper",
  "/writing-practice",
  "/handwriting-workbook-generator",
  "/handwriting-personality-quiz",
  "/doctor-handwriting-generator",
];

describe("navGroupsFor", () => {
  it("页头只留常用入口,聚合页仍是全量", () => {
    const hrefs = (locale: string, navOnly: boolean) =>
      (navOnly ? navGroupsFor(locale) : toolGroupsFor(locale)).flatMap((g) =>
        g.tools.map((t) => t.href),
      );

    expect(hrefs("zh", true)).toEqual(NAV_HREFS);
    expect(hrefs("en", true)).toEqual(NAV_HREFS);
    expect(hrefs("zh", false)).toContain("/handwriting-page-calculator");
    expect(hrefs("zh", false)).not.toContain("/letter-tracing");
    expect(hrefs("en", false)).toContain("/letter-tracing");
  });
});
