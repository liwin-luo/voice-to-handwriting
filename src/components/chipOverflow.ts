/** 单行里放不下的 chip 数。avail 为容器内容宽度,gap 为 chip 间距。 */
export function hiddenChipCount(widths: number[], gap: number, avail: number): number {
  let used = 0;
  let visible = 0;
  for (const w of widths) {
    const next = used + (visible ? gap : 0) + w;
    if (next > avail + 1) break;
    used = next;
    visible += 1;
  }
  return widths.length - visible;
}
