/** 全站工具分类(导航分组下拉与 /tools 聚合页共用)。
 *  只做导航与聚合层面的分类,工具 URL 保持不变——这些 slug 本身就是关键词落地页(docs/DEVELOPMENT-STANDARDS.md §2.5)。
 *  文案不在此处:标题取 messages nav.*(RelatedLinks 同源),卡片描述取 messages meta.<key>.description。 */

export interface ToolCard {
  href: string;
  /** messages nav 里的名称 key(与 RelatedLinks 的 TOOL_LABEL_KEY 同源) */
  navKey: string;
  /** messages meta 里该工具的命名空间,卡片描述取其 description;主工具用 brand + 顶层 description */
  metaKey?: string;
  /** 主工具卡片标题用品牌名 */
  brand?: boolean;
}

export interface ToolGroup {
  /** messages nav 里的分组标签 key */
  labelKey: string;
  tools: ToolCard[];
}

export const TOOL_GROUPS: ToolGroup[] = [
  {
    labelKey: "groupWrite",
    tools: [
      { href: "/", navKey: "tool", brand: true },
      { href: "/cursive", navKey: "cursive", metaKey: "cursive" },
      { href: "/cursive-text-generator", navKey: "cursiveText", metaKey: "cursiveText" },
      { href: "/templates", navKey: "templates", metaKey: "templates" },
    ],
  },
  {
    labelKey: "groupPractice",
    tools: [
      { href: "/name-tracing", navKey: "nameTracing", metaKey: "tracing" },
      { href: "/handwriting-repeater", navKey: "repeater", metaKey: "repeater" },
      { href: "/printable-paper", navKey: "printablePaper", metaKey: "printable" },
      { href: "/handwriting-page-calculator", navKey: "pageCalc", metaKey: "pageCalc" },
      { href: "/cursive-worksheets", navKey: "cursiveWorks", metaKey: "cursiveWorks" },
      { href: "/daily-cursive-handwriting-practice", navKey: "dailyCursive", metaKey: "dailyCursive" },
      { href: "/writing-practice", navKey: "writingPractice", metaKey: "writing" },
      { href: "/word-work", navKey: "wordWork", metaKey: "wordwork" },
      { href: "/name-coloring", navKey: "coloring", metaKey: "coloring" },
      { href: "/handwriting-workbook-generator", navKey: "workbook", metaKey: "workbook" },
    ],
  },
  {
    labelKey: "groupFun",
    tools: [
      { href: "/handwriting-personality-quiz", navKey: "quiz", metaKey: "quiz" },
      { href: "/doctor-handwriting-generator", navKey: "doctor", metaKey: "doctor" },
    ],
  },
];
