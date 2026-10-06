export interface PaperPreset {
  id: "blank" | "ruled" | "grid" | "letter" | "custom";
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

export interface CustomPaperConfig {
  bg: string;
  line: string;
  spacing: number; // px,会被钳制到 24~64
  mode: "blank" | "ruled" | "grid";
  /** 可选背景图(data URL),铺在底色之上、格线之下 */
  image?: string;
  /** cover:等比缩放铺满;tile:原始尺寸平铺 */
  imageFit?: "cover" | "tile";
}

/** 由用户配置构建自定义纸张(纯函数,可测试) */
export function makeCustomPaper(c: CustomPaperConfig): PaperPreset {
  const L = Math.min(64, Math.max(24, Math.round(c.spacing)));
  const ruled = `repeating-linear-gradient(to bottom, transparent 0 ${L - 1}px, ${c.line} ${L - 1}px ${L}px)`;
  const gridCols = `repeating-linear-gradient(to right, transparent 0 ${L - 1}px, ${c.line} ${L - 1}px ${L}px)`;
  const layers =
    c.mode === "ruled" ? ruled : c.mode === "grid" ? `${ruled}, ${gridCols}` : "";
  const img = c.image
    ? c.imageFit === "tile"
      ? `url("${c.image}") repeat`
      : `url("${c.image}") center / cover no-repeat`
    : "";
  const stack = [layers, img].filter(Boolean).join(", ");
  return {
    id: "custom",
    name: "Custom",
    lineHeight: L,
    background: stack ? `${stack}, ${c.bg}` : c.bg,
  };
}
