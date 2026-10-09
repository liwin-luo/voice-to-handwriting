import { describe, expect, it } from "vitest";
import { PAGE_FORMATS } from "@/lib/localeDefaults";
import { chartGrid } from "@/lib/alphabetChart";

/** A–Z 图表网格:两种纸型下都要装下 26 格且单元格可用 */

describe("chartGrid", () => {
  const formats = ["letter", "a4"] as const;

  for (const format of formats) {
    it(`${format} 纸型下 4 列网格容纳 26 字母,单元格足够画三线格`, () => {
      const { w, h } = PAGE_FORMATS[format];
      const grid = chartGrid(26, w, h, 40);
      expect(grid.cols * grid.rows).toBeGreaterThanOrEqual(26);
      // 单元格最小可用尺寸:Aa 字形 + 三线格(低于该值打印出来不可练)
      expect(grid.cellW).toBeGreaterThan(150);
      expect(grid.cellH).toBeGreaterThan(100);
    });
  }

  it("边缘数量向上取整行数", () => {
    expect(chartGrid(1, 816, 1056, 40).rows).toBe(1);
    expect(chartGrid(24, 816, 1056, 40).rows).toBe(6);
    expect(chartGrid(25, 816, 1056, 40).rows).toBe(7);
  });
});
