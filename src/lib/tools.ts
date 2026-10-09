/** 全站工具分类(导航分组下拉与 /tools 聚合页共用)。
 *  只做导航与聚合层面的分类,工具 URL 保持不变——这些 slug 本身就是关键词落地页(docs/DEVELOPMENT-STANDARDS.md §2.5)。
 *  文案不在此处:标题取 messages nav.*(RelatedLinks 同源),卡片描述取 messages meta.<key>.description。 */
import { routing } from "@/i18n/routing";

export interface ToolCard {
  href: string;
  /** messages nav 里的名称 key(与 RelatedLinks 的 TOOL_LABEL_KEY 同源) */
  navKey: string;
  /** messages meta 里该工具的命名空间,卡片描述取其 description;主工具用 brand + 顶层 description */
  metaKey?: string;
  /** 主工具卡片标题用品牌名 */
  brand?: boolean;
  /** en-only 工具(如 /cursive-alphabet Phase 0):非默认语言的导航/聚合页要过滤掉,否则 8 语言用户点进 404 */
  enOnly?: boolean;
}

export interface ToolGroup {
  /** messages nav 里的分组标签 key */
  labelKey: string;
  tools: ToolCard[];
}

/** 消费方(SiteHeader/tools 页)一律用本函数取分组,不要直接用 TOOL_GROUPS */
export function toolGroupsFor(locale: string): ToolGroup[] {
  return TOOL_GROUPS.map((g) => ({
    ...g,
    tools: g.tools.filter((t) => !t.enOnly || locale === routing.defaultLocale),
  })).filter((g) => g.tools.length > 0);
}

/** en-only 工具路径判断(RelatedLinks 等内容侧链接需要按语言过滤,否则指向 404) */
export function isEnOnlyTool(href: string): boolean {
  return TOOL_GROUPS.some((g) => g.tools.some((t) => t.enOnly && t.href === href));
}

export const TOOL_GROUPS: ToolGroup[] = [
  {
    labelKey: "groupWrite",
    tools: [
      { href: "/", navKey: "tool", brand: true },
      { href: "/cursive", navKey: "cursive", metaKey: "cursive" },
      { href: "/cursive-text-generator", navKey: "cursiveText", metaKey: "cursiveText" },
      { href: "/cursive-font-generator", navKey: "cursiveFont", metaKey: "cursiveFont" },
      { href: "/templates", navKey: "templates", metaKey: "templates" },
    ],
  },
  {
    labelKey: "groupPractice",
    tools: [
      { href: "/name-tracing", navKey: "nameTracing", metaKey: "tracing" },
      { href: "/letter-tracing", navKey: "letterTracing", metaKey: "letterTracing", enOnly: true },
      { href: "/handwriting-repeater", navKey: "repeater", metaKey: "repeater" },
      { href: "/printable-paper", navKey: "printablePaper", metaKey: "printable" },
      { href: "/handwriting-page-calculator", navKey: "pageCalc", metaKey: "pageCalc" },
      { href: "/cursive-alphabet", navKey: "cursiveAlphabet", metaKey: "cursiveAlphabet", enOnly: true },
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
