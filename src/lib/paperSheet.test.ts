import { describe, expect, it } from "vitest";
import { PAGE_FORMATS } from "@/lib/localeDefaults";
import { handwritingBandCount, paperOps, ruledLineCount, spacingFor } from "@/lib/paperSheet.mjs";

describe("paperSheet", () => {
  const { h } = PAGE_FORMATS.letter;

  it("US Letter 上的行数与规格页文案一致", () => {
    expect(ruledLineCount(h, spacingFor("narrow"))).toBe(41);
    expect(ruledLineCount(h, spacingFor("large"))).toBe(20);
    expect(handwritingBandCount(h, spacingFor("handwriting"))).toBe(12);
    expect(spacingFor("graph")).toBe(24);
    expect(spacingFor("college")).toBe(27);
  });

  it("窄行和大字纸是横线加红边，方格纸没有红边", () => {
    const { w } = PAGE_FORMATS.letter;
    const narrow = paperOps({ type: "narrow", w, h, spacing: 24, showMargin: true });
    const margins = narrow.filter((op) => op.op === "line").filter((op) => op.color === "margin");
    expect(margins).toHaveLength(1);
    const graph = paperOps({ type: "graph", w, h, spacing: 24, showMargin: true });
    expect(graph.filter((op) => op.op === "line").some((op) => op.color === "margin")).toBe(false);
    expect(graph.filter((op) => op.op === "line").length).toBeGreaterThan(40);
  });
});
