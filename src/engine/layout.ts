export interface CharBox {
  index: number; // token 索引
  top: number; // 相对文本流顶端的 y(px)
}

/** 按行的 top 值把字符索引分页;跨越页高的行整体移入下一页。 */
export function paginateLineTops(boxes: CharBox[], pageHeight: number): number[][] {
  const pages: number[][] = [];
  let current: number[] = [];
  let pageStartTop: number | null = null;
  for (const b of boxes) {
    if (pageStartTop === null) pageStartTop = b.top;
    if (b.top - pageStartTop >= pageHeight) {
      if (current.length) pages.push(current);
      current = [];
      pageStartTop = b.top;
    }
    current.push(b.index);
  }
  if (current.length) pages.push(current);
  return pages;
}

/** 分页测量只覆盖可见 span(换行是 <br> 无测量值),
 *  本函数把 newline token 补进其前一可见字符所在的页。 */
export function expandPages(groups: number[][], tokens: { kind: string }[]): number[][] {
  const groupOf = new Map<number, number>();
  groups.forEach((g, gi) => g.forEach((idx) => groupOf.set(idx, gi)));
  const result: number[][] = groups.map((g) => [...g]);
  let lastGi = 0;
  for (let i = 0; i < tokens.length; i++) {
    const gi = groupOf.get(i);
    if (gi !== undefined) {
      lastGi = gi;
    } else if (tokens[i].kind === "newline") {
      result[lastGi].push(i);
    }
  }
  return result;
}
