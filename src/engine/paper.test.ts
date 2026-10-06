import { describe, expect, it } from "vitest";
import { PAPERS, getPaper, makeCustomPaper } from "./paper";

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

describe("makeCustomPaper", () => {
  it("横线模式:背景包含底色与格线颜色", () => {
    const p = makeCustomPaper({ bg: "#fffdf8", line: "#c7d4e3", spacing: 40, mode: "ruled" });
    expect(p.background).toContain("#fffdf8");
    expect(p.background).toContain("#c7d4e3");
    expect(p.lineHeight).toBe(40);
  });

  it("方格模式:包含横向与纵向渐变", () => {
    const p = makeCustomPaper({ bg: "#ffffff", line: "#cccccc", spacing: 36, mode: "grid" });
    expect((p.background.match(/repeating-linear-gradient/g) ?? []).length).toBe(2);
    expect(p.lineHeight).toBe(36);
  });

  it("无格线模式:纯底色", () => {
    const p = makeCustomPaper({ bg: "#ffffff", line: "#cccccc", spacing: 40, mode: "blank" });
    expect(p.background).toBe("#ffffff");
  });

  it("行距钳制到 24~64", () => {
    expect(makeCustomPaper({ bg: "#fff", line: "#000", spacing: 10, mode: "ruled" }).lineHeight).toBe(24);
    expect(makeCustomPaper({ bg: "#fff", line: "#000", spacing: 99, mode: "ruled" }).lineHeight).toBe(64);
  });
});
