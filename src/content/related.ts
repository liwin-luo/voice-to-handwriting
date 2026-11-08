import type { Locale } from "@/i18n/routing";
import { postLocales } from "@/content/blog/registry";

/** 工具页 href → messages nav 里的名称 key(8 语言均有) */
export const TOOL_LABEL_KEY: Record<string, string> = {
  "/": "tool",
  "/templates": "templates",
  "/printable-paper": "printablePaper",
  "/name-tracing": "nameTracing",
  "/handwriting-worksheet-generator": "worksheet",
  "/cursive": "cursive",
  "/cursive-text-generator": "cursiveText",
  "/cursive-alphabet": "cursiveAlphabet",
  "/cursive-font-generator": "cursiveFont",
  "/cursive-worksheets": "cursiveWorks",
  "/number-tracing": "numberTracing",
  "/writing-practice": "writingPractice",
  "/name-coloring": "coloring",
  "/handwriting-personality-quiz": "quiz",
  "/handwriting-workbook-generator": "workbook",
  "/handwriting-page-calculator": "pageCalc",
  "/printable-handwritten-letters": "bulkLetters",
};

export interface RelatedConfig {
  tools: string[];
  posts: string[];
}

/**
 * 每篇文章的站内链接规划:尾部 RelatedLinks 区块按此渲染(所有语言版本生效)。
 * 目标:补齐 /cursive-worksheets 反链、voice 核心集群互链、/templates 枢纽。
 * 新文章:在此登记一项,否则尾部无内链区块。
 * 每条上方的簇注释与内容规划里的文章簇用同一个名字(seo-article-playbook.md §2)。
 */
export const RELATED: Record<string, RelatedConfig> = {
  // cursive 集群:全部链向 /cursive-worksheets(原站内 0 反链)
  "cursive-practice-worksheets": {
    tools: ["/cursive-worksheets", "/cursive"],
    posts: ["cursive-alphabet-chart", "how-to-write-in-cursive", "name-tracing-generator"],
  },
  "cursive-alphabet-chart": {
    tools: ["/cursive-alphabet", "/cursive-worksheets", "/cursive"],
    posts: ["cursive-practice-worksheets", "how-to-write-in-cursive", "cursive-name-signature"],
  },
  "how-to-teach-cursive-kids": {
    tools: ["/cursive-worksheets", "/cursive"],
    posts: ["is-cursive-still-taught", "cursive-vs-print", "cursive-alphabet-chart"],
  },
  "cursive-vs-print": {
    tools: ["/cursive-worksheets", "/cursive"],
    posts: ["how-to-write-in-cursive", "cursive-name-signature", "is-cursive-still-taught"],
  },
  "how-to-write-in-cursive": {
    tools: ["/cursive-alphabet", "/cursive-worksheets", "/cursive"],
    posts: ["cursive-alphabet-chart", "cursive-practice-worksheets", "how-to-improve-handwriting-adults"],
  },
  "is-cursive-still-taught": {
    tools: ["/cursive-worksheets", "/cursive"],
    posts: ["how-to-teach-cursive-kids", "cursive-vs-print", "cursive-alphabet-chart"],
  },
  "cursive-name-signature": {
    tools: ["/cursive", "/cursive-worksheets"],
    posts: ["cursive-alphabet-chart", "how-to-improve-handwriting-adults"],
  },
  "tracing-numbers-by-age": {
    tools: ["/number-tracing", "/name-tracing"],
    posts: ["name-tracing-generator", "kindergarten-handwriting-paper"],
  },
  "spelling-list-word-work": {
    tools: ["/handwriting-worksheet-generator", "/name-tracing", "/handwriting-workbook-generator"],
    posts: ["sight-word-tracing-worksheets", "copywork-generator"],
  },
  "color-a-name-before-tracing": {
    tools: ["/name-coloring", "/name-tracing"],
    posts: ["name-tracing-generator", "tracing-numbers-by-age"],
  },
  "one-character-in-the-grid": {
    tools: ["/writing-practice", "/name-tracing", "/printable-paper"],
    posts: ["name-tracing-generator", "kindergarten-handwriting-paper"],
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
  // 导入前的准备:电平(en)与格式(de)。枢纽是首页导入,不是彼此的译文。
  "quiet-voice-before-handwriting": {
    tools: ["/"],
    posts: ["audio-to-handwriting", "handwriting-image-generator"],
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
    tools: ["/number-tracing", "/name-tracing"],
    posts: ["kindergarten-handwriting-paper", "cursive-name-signature", "cursive-practice-worksheets"],
  },

  // 选题池 2026-10-09(rising:createprintables name tracing / calligraphy motto)
  "name-tracing-with-lines": {
    tools: ["/name-tracing", "/printable-paper"],
    posts: ["name-tracing-generator", "kindergarten-handwriting-paper", "handwriting-practice-struggling-writers"],
  },
  "calligraphy-motto-cards": {
    tools: ["/", "/templates"],
    posts: ["handwritten-card-with-voice", "xiaohongshu-handwritten-images", "handwriting-templates-guide"],
  },

  "november-in-cursive": {
    tools: ["/cursive", "/cursive-worksheets"],
    posts: ["how-to-write-in-cursive", "cursive-practice-worksheets", "cursive-alphabet-chart"],
  },

  // cursive 立法数据簇:is-cursive-still-taught 的深度数据页,吃 "cursive laws by state" 词簇
  "cursive-laws-by-state": {
    tools: ["/cursive-worksheets", "/printable-paper"],
    posts: ["is-cursive-still-taught", "how-to-teach-cursive-kids", "cursive-sentences-to-practice"],
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
  // 成人单句练习:枢纽已并入 /handwriting-worksheet-generator(2026-11 聚类合并)。
  "how-to-improve-handwriting-adults": {
    tools: ["/handwriting-worksheet-generator", "/printable-paper", "/name-tracing"],
    posts: ["practice-one-handwriting-problem"],
  },
  "practice-one-handwriting-problem": {
    tools: ["/handwriting-worksheet-generator"],
    posts: ["how-to-improve-handwriting-adults"],
  },
  "handwriting-practice-struggling-writers": {
    tools: ["/name-tracing", "/printable-paper"],
    posts: ["kindergarten-handwriting-paper", "how-to-improve-handwriting-adults", "free-printable-lined-paper"],
  },

  // 笔迹性格测验集群:科普文承接「字迹说明什么」,字形测验文把完整测验指到新站,练习留在本站
  "what-does-your-handwriting-say-about-you": {
    tools: ["/handwriting-personality-quiz", "/printable-paper", "/name-tracing"],
    posts: ["handwriting-personality-test", "how-to-improve-handwriting-adults", "cursive-vs-print"],
  },

  // 上升词两篇:脑科学 Breakout 簇 + 练好字攻略簇,互链并导流 workbook/练习工具
  "handwriting-vs-typing-brain": {
    tools: ["/handwriting-workbook-generator", "/printable-paper"],
    posts: ["how-to-improve-your-handwriting", "how-to-improve-handwriting-adults", "is-cursive-still-taught"],
  },
  "how-to-improve-your-handwriting": {
    tools: ["/handwriting-workbook-generator", "/cursive-worksheets", "/printable-paper"],
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

  // 手写用纸页数:数字估算与贴正文预览,导流计算器与空白纸
  "how-many-sheets-handwriting": {
    tools: ["/handwriting-page-calculator", "/printable-paper"],
    posts: ["free-printable-lined-paper", "kindergarten-handwriting-paper", "how-to-improve-handwriting-adults"],
  },

  // 可复制花体文本:文章教六种风格怎么用,导流工具页;/cursive 承接"要图片/打印"的读者
  "cursive-text-generator": {
    tools: ["/cursive-text-generator", "/cursive-font-generator", "/cursive"],
    posts: ["best-cursive-fonts", "how-to-write-in-cursive", "cursive-name-signature"],
  },

  // 字体选型指南:支柱文承接 "cursive fonts" 浏览意图,导流字体预览工具
  "best-cursive-fonts": {
    tools: ["/cursive-font-generator", "/cursive-text-generator", "/cursive", "/cursive-alphabet"],
    posts: ["cursive-text-generator", "diy-wedding-calligraphy", "how-to-write-in-cursive"],
  },

  // cursive 句子簇:句子级与 cursive-practice-worksheets(字母/单词级)拆开;描红引擎吃整句
  "cursive-sentences-to-practice": {
    tools: ["/name-tracing", "/cursive", "/cursive-worksheets"],
    posts: ["cursive-practice-worksheets", "how-to-teach-cursive-kids", "cursive-alphabet-chart"],
  },

  // copywork(homeschool 抄写)簇:方法讲解 + 免费生成器 + 分学科素材;与 sight-word 词表簇拆开
  "copywork-generator": {
    tools: ["/name-tracing", "/cursive", "/printable-paper", "/handwriting-workbook-generator"],
    posts: ["sight-word-tracing-worksheets", "kindergarten-handwriting-paper", "spelling-list-word-work"],
  },

  // 短名单自己打印信件和信封:用例文,导流工具页;文案与单张卡片交给既有文章
  "print-handwritten-letters-and-envelopes": {
    tools: ["/printable-handwritten-letters", "/templates"],
    posts: ["handwritten-thank-you-notes", "handwriting-templates-guide", "handwritten-card-with-voice"],
  },

  // 通用练习纸簇:枢纽 /handwriting-worksheet-generator。本文教怎么排一周的练习纸;
  // 尾部相关文是同一任务链上的细分生成器文章(姓名/词表/连笔),不是凑数
  "handwriting-worksheets": {
    tools: ["/handwriting-worksheet-generator", "/printable-paper", "/name-tracing"],
    posts: ["name-tracing-generator", "sight-word-tracing-worksheets", "cursive-practice-worksheets"],
  },

  // cursive 数字簇:cursive 集群的数字分支。资讯(字形参考)+ 练法,与印刷体 tracing-numbers-by-age 拆开
  "numbers-in-cursive": {
    tools: ["/cursive-worksheets", "/number-tracing", "/cursive-alphabet"],
    posts: ["cursive-sentences-to-practice", "cursive-alphabet-chart", "tracing-numbers-by-age"],
  },

  // graphisme/pré-écriture 簇:FR 源发(trends graphisme 词)。姊妹篇 strokes-before-letter-tracing
  // 已随 prewriting 工具下线(2026-11);法国读者尾部相关文当前只有 en 邻居,不拿别的簇凑数
  "graphisme-maternelle": {
    tools: ["/printable-paper"],
    posts: [],
  },

  // 笔迹性格测验:完整字形测验在新站,本站 quiz 是两分钟看图版,练那个字形回到练习纸
  "handwriting-personality-test": {
    tools: ["/handwriting-personality-quiz", "/handwriting-worksheet-generator", "/number-tracing"],
    posts: ["what-does-your-handwriting-say-about-you", "tracing-numbers-by-age", "handwriting-worksheets"],
  },

  // 可复制花体:短名圆泡加一个装饰,枢纽仍是 /cursive-text-generator(整句花体)。
  // 印到卡片上走字体预览;一整句连笔粘贴走已有花体文。
  "bubble-letters-for-a-display-name": {
    tools: ["/cursive-font-generator", "/cursive-text-generator"],
    posts: ["cursive-text-generator", "best-cursive-fonts", "cursive-name-signature"],
  },
};

/** 文章在当前语言是否有正文(给相关文章链接防 404) */
export function relatedPostAvailable(slug: string, locale: Locale): boolean {
  return postLocales(slug).includes(locale);
}
