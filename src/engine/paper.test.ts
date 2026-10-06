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

  it("背景图 cover:图层顺序为格线→图片→底色", () => {
    const p = makeCustomPaper({
      bg: "#fffdf8",
      line: "#c7d4e3",
      spacing: 40,
      mode: "ruled",
      image: "data:image/jpeg;base64,abc",
      imageFit: "cover",
    });
    expect(p.background).toContain('url("data:image/jpeg;base64,abc") center / cover no-repeat');
    const gi = p.background.indexOf("repeating-linear-gradient");
    const ui = p.background.indexOf("url(");
    expect(gi).toBeGreaterThanOrEqual(0);
    expect(gi).toBeLessThan(ui); // 格线画在图片之上
    expect(p.background.endsWith("#fffdf8")).toBe(true);
  });

  it("背景图 tile:原尺寸平铺;缺省 fit 视为 cover", () => {
    const tile = makeCustomPaper({
      bg: "#fff",
      line: "#000",
      spacing: 40,
      mode: "blank",
      image: "data:image/png;base64,abc",
      imageFit: "tile",
    });
    expect(tile.background).toContain('url("data:image/png;base64,abc") repeat');

    const def = makeCustomPaper({
      bg: "#fff",
      line: "#000",
      spacing: 40,
      mode: "blank",
      image: "data:image/png;base64,abc",
    });
    expect(def.background).toContain("cover");
  });
});
