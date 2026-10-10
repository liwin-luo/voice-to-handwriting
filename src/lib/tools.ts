/** 全站工具分类。页头下拉用 navGroupsFor(只含 nav: true),/tools 用 toolGroupsFor(全量)。
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
  /** 出现在页头「全部工具」下拉。未标的只进 /tools,避免下拉变成整站目录 */
  nav?: boolean;
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

/** 页头下拉:每组只留标了 nav 的常用入口。全量仍走 toolGroupsFor → /tools */
export function navGroupsFor(locale: string): ToolGroup[] {
  return toolGroupsFor(locale)
    .map((g) => ({ ...g, tools: g.tools.filter((t) => t.nav) }))
    .filter((g) => g.tools.length > 0);
}

/** en-only 工具路径判断(RelatedLinks 等内容侧链接需要按语言过滤,否则指向 404) */
export function isEnOnlyTool(href: string): boolean {
  return TOOL_GROUPS.some((g) => g.tools.some((t) => t.enOnly && t.href === href));
}

/** /tools 每组的大卡。必须是该组 tools 里的 href。页头下拉不使用。 */
export const FEATURED_HREF: Record<string, string> = {
  groupWrite: "/",
  groupPractice: "/name-tracing",
  groupFun: "/handwriting-personality-quiz",
};

export const TOOL_GROUPS: ToolGroup[] = [
  {
    labelKey: "groupWrite",
    tools: [
      { href: "/", navKey: "tool", brand: true, nav: true },
      { href: "/cursive", navKey: "cursive", metaKey: "cursive", nav: true },
      { href: "/cursive-text-generator", navKey: "cursiveText", metaKey: "cursiveText", nav: true },
      { href: "/cursive-font-generator", navKey: "cursiveFont", metaKey: "cursiveFont" },
      { href: "/cursive-tattoo-stencil", navKey: "tattooStencil", metaKey: "tattooStencil" },
      { href: "/templates", navKey: "templates", metaKey: "templates" },
      { href: "/printable-handwritten-letters", navKey: "bulkLetters", metaKey: "bulkLetters", nav: true },
    ],
  },
  {
    labelKey: "groupPractice",
    tools: [
      { href: "/name-tracing", navKey: "nameTracing", metaKey: "tracing", nav: true },
      { href: "/letter-tracing", navKey: "letterTracing", metaKey: "letterTracing", enOnly: true },
      { href: "/handwriting-repeater", navKey: "repeater", metaKey: "repeater" },
      { href: "/printable-paper", navKey: "printablePaper", metaKey: "printable", nav: true },
      { href: "/handwriting-page-calculator", navKey: "pageCalc", metaKey: "pageCalc" },
      { href: "/cursive-alphabet", navKey: "cursiveAlphabet", metaKey: "cursiveAlphabet", enOnly: true },
      { href: "/cursive-worksheets", navKey: "cursiveWorks", metaKey: "cursiveWorks" },
      { href: "/signature-practice", navKey: "signaturePractice", metaKey: "signaturePractice" },
      { href: "/number-tracing", navKey: "numberTracing", metaKey: "numberTracing" },
      { href: "/prewriting-strokes", navKey: "prewriting", metaKey: "prewriting" },
      { href: "/cursive-letter-joins", navKey: "cursiveJoins", metaKey: "cursiveJoins" },
      { href: "/architect-lettering", navKey: "architectLetter", metaKey: "architectLetter" },
      { href: "/daily-cursive-handwriting-practice", navKey: "dailyCursive", metaKey: "dailyCursive" },
      { href: "/writing-practice", navKey: "writingPractice", metaKey: "writing", nav: true },
      { href: "/word-work", navKey: "wordWork", metaKey: "wordwork" },
      { href: "/name-coloring", navKey: "coloring", metaKey: "coloring" },
      { href: "/handwriting-workbook-generator", navKey: "workbook", metaKey: "workbook", nav: true },
    ],
  },
  {
    labelKey: "groupFun",
    tools: [
      { href: "/handwriting-personality-quiz", navKey: "quiz", metaKey: "quiz", nav: true },
      { href: "/doctor-handwriting-generator", navKey: "doctor", metaKey: "doctor", nav: true },
    ],
  },
];
