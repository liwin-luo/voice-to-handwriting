import { describe, expect, it } from "vitest";
import { PAPERS, getPaper } from "./paper";

describe("paper presets", () => {
  it("包含四种纸张且 id 唯一", () => {
    const ids = PAPERS.map((p) => p.id);
    expect(new Set(ids).size).toBe(PAPERS.length);
    expect(ids).toEqual(["blank", "ruled", "grid", "letter"]);
  });

  it("getPaper 找不到时回退 blank", () => {
    expect(getPaper("nope").id).toBe("blank");
  });

  it("横线/方格/信纸背景使用 gradient,行高对齐 lineHeight", () => {
    for (const id of ["ruled", "grid", "letter"]) {
      const p = getPaper(id);
      expect(p.background).toContain("gradient");
      expect(p.background).toContain(`${p.lineHeight - 1}px`);
    }
  });
});
