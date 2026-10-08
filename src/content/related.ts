import type { Locale } from "@/i18n/routing";
import { postLocales } from "@/content/blog/registry";

/** 工具页 href → messages nav 里的名称 key(8 语言均有) */
export const TOOL_LABEL_KEY: Record<string, string> = {
  "/templates": "templates",
  "/printable-paper": "printablePaper",
  "/name-tracing": "nameTracing",
  "/cursive": "cursive",
  "/cursive-worksheets": "cursiveWorks",
  "/daily-cursive-handwriting-practice": "dailyCursive",
  "/handwriting-personality-quiz": "quiz",
  "/doctor-handwriting-generator": "doctor",
  "/handwriting-workbook-generator": "workbook",
  "/handwriting-repeater": "repeater",
  "/handwriting-page-calculator": "pageCalc",
};

export interface RelatedConfig {
  tools: string[];
  posts: string[];
}

/**
 * 每篇文章的站内链接规划:尾部 RelatedLinks 区块按此渲染(所有语言版本生效)。
 * 目标:补齐 /cursive-worksheets 反链、voice 核心集群互链、/templates 枢纽。
 * 新文章:在此登记一项,否则尾部无内链区块。
 */
export const RELATED: Record<string, RelatedConfig> = {
  // cursive 集群:全部链向 /cursive-worksheets(原站内 0 反链)
  "cursive-practice-worksheets": {
    tools: ["/daily-cursive-handwriting-practice", "/cursive-worksheets", "/cursive"],
    posts: ["cursive-alphabet-chart", "how-to-write-in-cursive", "name-tracing-generator"],
  },
  "cursive-alphabet-chart": {
    tools: ["/daily-cursive-handwriting-practice", "/cursive-worksheets", "/cursive"],
    posts: ["cursive-practice-worksheets", "how-to-write-in-cursive", "cursive-name-signature"],
  },
  "how-to-teach-cursive-kids": {
    tools: ["/daily-cursive-handwriting-practice", "/cursive-worksheets", "/cursive"],
    posts: ["is-cursive-still-taught", "cursive-vs-print", "cursive-alphabet-chart"],
  },
  "cursive-vs-print": {
    tools: ["/daily-cursive-handwriting-practice", "/cursive-worksheets", "/cursive"],
    posts: ["how-to-write-in-cursive", "cursive-name-signature", "is-cursive-still-taught"],
  },
  "how-to-write-in-cursive": {
    tools: ["/daily-cursive-handwriting-practice", "/cursive-worksheets", "/cursive"],
    posts: ["cursive-alphabet-chart", "cursive-practice-worksheets", "how-to-improve-handwriting-adults"],
  },
  "is-cursive-still-taught": {
    tools: ["/daily-cursive-handwriting-practice", "/cursive-worksheets", "/cursive"],
    posts: ["how-to-teach-cursive-kids", "cursive-vs-print", "cursive-alphabet-chart"],
  },
  "cursive-name-signature": {
    tools: ["/daily-cursive-handwriting-practice", "/cursive", "/cursive-worksheets"],
    posts: ["cursive-alphabet-chart", "name-tracing-generator", "diy-wedding-calligraphy"],
  },

  // voice 核心集群:互相导流 + /templates 枢纽
  "handwritten-card-with-voice": {
    tools: ["/templates"],
    posts: ["handwriting-image-generator", "audio-to-handwriting", "xiaohongshu-handwritten-images"],
  },
  "handwriting-image-generator": {
    tools: ["/templates"],
    posts: ["handwritten-card-with-voice", "audio-to-handwriting", "xiaohongshu-handwritten-images"],
  },
  "audio-to-handwriting": {
    tools: ["/templates"],
    posts: ["handwritten-card-with-voice", "handwriting-image-generator", "handwriting-templates-guide"],
  },
  "xiaohongshu-handwritten-images": {
    tools: ["/templates"],
    posts: ["handwriting-image-generator", "handwritten-card-with-voice", "handwriting-templates-guide"],
  },
  "handwriting-templates-guide": {
    tools: ["/templates"],
    posts: ["handwritten-card-with-voice", "handwritten-thank-you-notes", "diy-wedding-calligraphy"],
  },

  // 纸张/练字集群
  "free-printable-lined-paper": {
    tools: ["/printable-paper", "/handwriting-page-calculator", "/name-tracing"],
    posts: ["kindergarten-handwriting-paper", "pen-pal-letters-for-kids", "cursive-practice-worksheets"],
  },
  "kindergarten-handwriting-paper": {
    tools: ["/printable-paper", "/name-tracing"],
    posts: ["free-printable-lined-paper", "name-tracing-generator", "handwriting-practice-struggling-writers"],
  },
  "name-tracing-generator": {
    tools: ["/name-tracing", "/printable-paper"],
    posts: ["kindergarten-handwriting-paper", "cursive-name-signature", "cursive-practice-worksheets"],
  },
  "letter-to-santa-template": {
    tools: ["/name-tracing", "/printable-paper"],
    posts: ["pen-pal-letters-for-kids", "handwritten-thank-you-notes", "handwriting-templates-guide"],
  },
  "pen-pal-letters-for-kids": {
    tools: ["/name-tracing", "/printable-paper"],
    posts: ["letter-to-santa-template", "handwritten-thank-you-notes", "free-printable-lined-paper"],
  },
  "handwritten-thank-you-notes": {
    tools: ["/templates", "/printable-paper"],
    posts: ["diy-wedding-calligraphy", "pen-pal-letters-for-kids", "letter-to-santa-template"],
  },
  "diy-wedding-calligraphy": {
    tools: ["/templates", "/cursive"],
    posts: ["handwritten-thank-you-notes", "cursive-name-signature", "handwriting-templates-guide"],
  },
  "how-to-improve-handwriting-adults": {
    tools: ["/handwriting-personality-quiz", "/printable-paper", "/name-tracing"],
    posts: ["cursive-vs-print", "how-to-write-in-cursive", "handwriting-practice-struggling-writers"],
  },
  "handwriting-practice-struggling-writers": {
    tools: ["/name-tracing", "/printable-paper"],
    posts: ["kindergarten-handwriting-paper", "how-to-improve-handwriting-adults", "free-printable-lined-paper"],
  },

  // 笔迹性格测验集群:文章承接 information 词,导流 quiz 工具
  "what-does-your-handwriting-say-about-you": {
    tools: ["/handwriting-personality-quiz", "/printable-paper", "/name-tracing"],
    posts: ["how-to-improve-handwriting-adults", "cursive-vs-print", "is-cursive-still-taught"],
  },

  // 上升词两篇:脑科学 Breakout 簇 + 练好字攻略簇,互链并导流 workbook/练习工具
  "handwriting-vs-typing-brain": {
    tools: ["/handwriting-workbook-generator", "/daily-cursive-handwriting-practice", "/printable-paper"],
    posts: ["how-to-improve-your-handwriting", "how-to-improve-handwriting-adults", "is-cursive-still-taught"],
  },
  "how-to-improve-your-handwriting": {
    tools: ["/handwriting-workbook-generator", "/daily-cursive-handwriting-practice", "/cursive-worksheets", "/printable-paper"],
    posts: ["handwriting-vs-typing-brain", "how-to-improve-handwriting-adults", "handwriting-practice-struggling-writers"],
  },

  // 教师词表簇:sight word / spelling 描红,导流 name-tracing 与 workbook
  "sight-word-tracing-worksheets": {
    tools: ["/name-tracing", "/handwriting-workbook-generator", "/printable-paper"],
    posts: ["name-tracing-generator", "kindergarten-handwriting-paper", "handwriting-practice-struggling-writers"],
  },

  // 成人练习册:词表组册,与「怎么练好字」计划文拆开
  "handwriting-workbook": {
    tools: ["/handwriting-workbook-generator", "/printable-paper"],
    posts: ["how-to-improve-handwriting-adults", "how-to-improve-your-handwriting", "free-printable-lined-paper"],
  },

  // 循环书写演示:文章教参数,导流 repeater;练习册与描红承接「要打印一整张」
  "handwriting-repeater": {
    tools: ["/handwriting-repeater", "/name-tracing", "/handwriting-workbook-generator"],
    posts: ["handwriting-workbook", "how-to-improve-your-handwriting", "sight-word-tracing-worksheets"],
  },

  // 手写用纸页数:数字估算与贴正文预览,导流计算器与空白纸
  "how-many-sheets-handwriting": {
    tools: ["/handwriting-page-calculator", "/printable-paper"],
    posts: ["free-printable-lined-paper", "kindergarten-handwriting-paper", "how-to-improve-handwriting-adults"],
  },
};

/** 文章在当前语言是否有正文(给相关文章链接防 404) */
export function relatedPostAvailable(slug: string, locale: Locale): boolean {
  return postLocales(slug).includes(locale);
}
