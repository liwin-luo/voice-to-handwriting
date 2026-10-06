export interface PaperPreset {
  id: "blank" | "ruled" | "grid" | "letter";
  name: string;
  /** 文本行高(px),横线/方格纸的格线间距与它一致 */
  lineHeight: number;
  /** CSS background 值 */
  background: string;
}

const L = 40; // 格线间距

export const PAPERS: PaperPreset[] = [
  { id: "blank", name: "白纸", lineHeight: 36, background: "#ffffff" },
  {
    id: "ruled",
    name: "横线",
    lineHeight: L,
    background: `repeating-linear-gradient(to bottom, transparent 0 ${L - 1}px, #c7d4e3 ${L - 1}px ${L}px), #ffffff`,
  },
  {
    id: "grid",
    name: "方格",
    lineHeight: L,
    background: `repeating-linear-gradient(to bottom, transparent 0 ${L - 1}px, #d9e2ec ${L - 1}px ${L}px), repeating-linear-gradient(to right, transparent 0 ${L - 1}px, #d9e2ec ${L - 1}px ${L}px), #ffffff`,
  },
  {
    id: "letter",
    name: "信纸",
    lineHeight: L,
    background: `linear-gradient(to right, transparent 0 46px, #e3b3b8 46px 48px, transparent 48px), repeating-linear-gradient(to bottom, transparent 0 ${L - 1}px, #c7d4e3 ${L - 1}px ${L}px), #fffdf8`,
  },
];

export function getPaper(id: string): PaperPreset {
  return PAPERS.find((p) => p.id === id) ?? PAPERS[0];
}
