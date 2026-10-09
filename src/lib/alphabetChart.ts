/** 全字母表 A–Z 图表的网格布局(纯函数,供导出 PDF 用)。
 *  尺寸单位为 px(96dpi,与 PAGE_FORMATS 同口径)。 */

export interface ChartGrid {
  cols: number;
  rows: number;
  cellW: number;
  cellH: number;
}

/** 固定 4 列:单元格内 "Aa" 加三线格在常见纸型下仍够宽;行数按数量向上取整 */
export function chartGrid(count: number, pageW: number, pageH: number, margin: number): ChartGrid {
  const cols = 4;
  const rows = Math.ceil(count / cols);
  return {
    cols,
    rows,
    cellW: (pageW - margin * 2) / cols,
    cellH: (pageH - margin * 2 - 64) / rows, // 预留顶部标题带 64px
  };
}
