export interface PaperPreset {
  id: "blank" | "ruled" | "grid" | "letter" | "rx" | "festive" | "custom";
  name: string;
  /** 文本行高(px),横线/方格纸的格线间距与它一致 */
  lineHeight: number;
  /** CSS background 值 */
  background: string;
}

const L = 40; // 格线间距

/** Rx 处方笺装饰层(SVG data URI):顶部色带(左侧「医生信息」空线 + 右侧 ℞ 符号)+ 右下签名线 + 左下日期线。
 *  ℞ 必须留在 48px 色带内:正文从 y=48 起,避免与文字碰撞 */
const RX_DECOR =
  `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='794' height='1123' viewBox='0 0 794 1123'%3E%3Crect width='794' height='48' fill='%23f1f5f9'/%3E%3Cline x1='0' y1='48' x2='794' y2='48' stroke='%23cbd5e1' stroke-width='2'/%3E%3Cline x1='48' y1='17' x2='300' y2='17' stroke='%23b6c2d2' stroke-width='2'/%3E%3Cline x1='48' y1='35' x2='260' y2='35' stroke='%23c5d0de' stroke-width='2'/%3E%3Ctext x='726' y='40' font-family='Georgia, serif' font-size='46' fill='%23475569' text-anchor='middle'%3E%E2%84%9E%3C/text%3E%3Cline x1='434' y1='1016' x2='746' y2='1016' stroke='%2394a3b8' stroke-width='2'/%3E%3Cline x1='48' y1='1062' x2='300' y2='1062' stroke='%23cbd5e1' stroke-width='2'/%3E%3C/svg%3E") no-repeat`;

/** 节日纸装饰层(SVG data URI):糖果条纹顶带 + 雪花角饰 + 底部绿线。
 *  雪花压在 y≤40:正文从 y=48 起,避免与文字碰撞 */
const FESTIVE_DECOR =
  `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='794' height='1123' viewBox='0 0 794 1123'%3E%3Cdefs%3E%3Cpattern id='candy' width='24' height='22' patternTransform='rotate(45)' patternUnits='userSpaceOnUse'%3E%3Crect width='12' height='22' fill='%23dc2626'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='794' height='20' fill='url(%23candy)'/%3E%3Crect y='22' width='794' height='3' fill='%23166534'/%3E%3Ctext x='56' y='40' font-size='18' fill='%2360a5fa' text-anchor='middle'%3E%E2%9D%84%3C/text%3E%3Ctext x='738' y='40' font-size='18' fill='%2360a5fa' text-anchor='middle'%3E%E2%9D%84%3C/text%3E%3Ctext x='170' y='38' font-size='11' fill='%2393c5fd' text-anchor='middle'%3E%E2%9D%84%3C/text%3E%3Ctext x='624' y='38' font-size='11' fill='%2393c5fd' text-anchor='middle'%3E%E2%9D%84%3C/text%3E%3Cline x1='48' y1='1113' x2='746' y2='1113' stroke='%23166534' stroke-width='2'/%3E%3C/svg%3E") no-repeat`;

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
  {
    id: "rx",
    name: "处方笺",
    lineHeight: 48,
    background: `${RX_DECOR}, repeating-linear-gradient(to bottom, transparent 0 47px, #c7d4e3 47px 48px), #ffffff`,
  },
  {
    id: "festive",
    name: "节日",
    lineHeight: 40,
    background: `${FESTIVE_DECOR}, repeating-linear-gradient(to bottom, transparent 0 39px, #e3d1c2 39px 40px), #fffcf5`,
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
