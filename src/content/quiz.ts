import type { Locale } from "@/i18n/routing";

/** Handwriting Personality Quiz 全部编辑内容。
 *  题干/选项/档案/科普段落按语言完整翻译(8 语言,见 docs/plans/2026-10-08-handwriting-personality-quiz-design.md);
 *  视觉题样张是拉丁字母,所有语言共用同一组样张文字。 */

export type DimensionId = "social" | "expressive" | "space" | "focus" | "pace";
export type ProfileId = "balanced" | "bold" | "planner" | "spirit" | "steady" | "spark";
export type Level = "low" | "mid" | "high";

/** 字母样张的视觉样式:全部用站内自托管字体 + CSS 变换渲染,零图片素材 */
export interface SampleStyle {
  font: "print" | "neat" | "messy" | "fancy" | "everyday" | "caveat";
  slant?: number; // skewX 度数(右倾为正)
  size?: number; // 相对字号(1 为基准)
  spacing?: number; // letter-spacing em
  word?: number; // word-spacing em
  rotate?: number; // 整词旋转度数(模拟基线漂移)
  ink?: "light" | "normal" | "heavy"; // 模拟笔压:墨色深浅 + 笔画厚度
}

export interface QuizOption {
  score: 0 | 1 | 2;
  style?: SampleStyle; // 视觉题:每个选项一种样张;自述题无
  label: string; // 选项文字(无障碍 + 字体加载失败时的兜底)
}

export interface QuizQuestion {
  id: string;
  dimension: DimensionId;
  text?: string; // 视觉题渲染的样张文字(拉丁字母,各语言共用)
  prompt: string;
  options: [QuizOption, QuizOption, QuizOption];
}

export interface PracticeTip {
  text: string;
  href: string;
}

export interface DimensionContent {
  label: string;
  levels: Record<Level, string>;
  practice: PracticeTip;
}

export interface ProfileContent {
  name: string;
  tagline: string;
  points: [string, string, string];
  growth: string;
}

export interface QuizLocaleContent {
  title: string;
  intro: string;
  start: string;
  back: string;
  retake: string;
  /** 进度文案,{n}/{total} 为占位符 */
  progress: string;
  download: string;
  writeCta: string;
  resultHeading: string;
  dimsHeading: string;
  practiceHeading: string;
  growthLabel: string;
  faqTitle: string;
  /** 科学段落尾部的配套文章回链锚文本(§3.3 工具页→文章) */
  articleLink: string;
  scienceTitle: string;
  scienceText: [string, string];
  disclaimer: string;
  dimensions: Record<DimensionId, DimensionContent>;
  profiles: Record<ProfileId, ProfileContent>;
  questions: QuizQuestion[];
}

const en: QuizLocaleContent = {
  title: "Handwriting Personality Test",
  intro:
    "This handwriting personality test asks 12 quick questions about how you write — no photo upload, nothing recorded. You'll get a fun handwriting profile at the end, plus practice tips for the habits behind your letters.",
  start: "Start the quiz",
  back: "Back",
  retake: "Retake the quiz",
  progress: "Question {n} of {total}",
  download: "Download my result",
  writeCta: "Write a line in this style",
  resultHeading: "Your handwriting profile",
  dimsHeading: "What your answers suggest",
  practiceHeading: "Want to practice?",
  growthLabel: "Growth edge",
  faqTitle: "Frequently asked questions",
  articleLink: "Read the honest guide: what does your handwriting say about you?",
  scienceTitle: "Is handwriting analysis real?",
  scienceText: [
    "Graphology — reading personality from handwriting — has been tested many times and doesn't hold up. A 1989 meta-analysis by Neter and Ben-Shakhar found that graphologists' judgments were no better than chance, and psychologists today classify it as a pseudoscience. No quiz, including this one, can read your personality from letterforms.",
    "What handwriting genuinely reflects is habit: when you learned, how often you write, how rushed you feel. Habits can be trained — so if the profile highlights a style you'd like to change, the practice tools below can help.",
  ],
  disclaimer:
    "For fun only — this quiz is entertainment, not a scientific or psychological assessment. Nothing you pick is uploaded or stored.",
  dimensions: {
    social: {
      label: "Social energy",
      levels: { low: "Private", mid: "Adaptive", high: "Outgoing" },
      practice: {
        text: "Fancy a more flowing, connected style? The cursive generator is a gentle place to start.",
        href: "/cursive",
      },
    },
    expressive: {
      label: "Expressiveness",
      levels: { low: "Reserved", mid: "Balanced", high: "Bold" },
      practice: {
        text: "Even letter size comes from rhythm rows — the tracing generator prints them for any word you like.",
        href: "/name-tracing",
      },
    },
    space: {
      label: "Personal space",
      levels: { low: "Close", mid: "Flexible", high: "Airy" },
      practice: {
        text: "Word-spacing rhythm improves with repetition — build a sheet from your own word list in the worksheet generator.",
        href: "/handwriting-worksheet-generator",
      },
    },
    focus: {
      label: "Focus & structure",
      levels: { low: "Free-flowing", mid: "Steady", high: "Precise" },
      practice: {
        text: "A straight baseline is easier on three-line paper — print a free sheet and try one paragraph.",
        href: "/printable-paper",
      },
    },
    pace: {
      label: "Pressure & pace",
      levels: { low: "Light & unhurried", mid: "Moderate", high: "Firm & quick" },
      practice: {
        text: "Tracing rows set a calm, even rhythm — generate practice worksheets from any word list.",
        href: "/cursive-worksheets",
      },
    },
  },
  profiles: {
    balanced: {
      name: "The Balanced Writer",
      tagline: "No single trait runs the show — your hand adapts to the moment.",
      points: [
        "A flexible style suggests you match your writing to the situation — quick notes and careful cards alike.",
        "Graphologists would call this balance; we just call it range.",
        "You have a solid base to build any style on.",
      ],
      growth:
        "Pick one dimension below to refine — balanced writers improve fastest with a single focus.",
    },
    bold: {
      name: "The Bold Expressive",
      tagline: "Big letters, open forms — your writing arrives before you do.",
      points: [
        "Large, rounded letters are read as warmth and confidence — for fun, at least.",
        "You're comfortable taking up space on the page.",
        "Greeting cards and posters are your natural format.",
      ],
      growth:
        "Even bold writing benefits from even spacing — lock in a rhythm so size never costs legibility.",
    },
    planner: {
      name: "The Precision Planner",
      tagline: "Upright, tidy, exact — your hand likes order.",
      points: [
        "Consistent size and straight baselines suggest a patient, detail-first approach.",
        "Yours are the notes people borrow.",
        "Neat letterforms are a trained motor skill — and yours clearly had practice.",
      ],
      growth:
        "Precision can tip into stiffness — try a looser script to add speed without losing structure.",
    },
    spirit: {
      name: "The Free Spirit",
      tagline: "Your letters wander — and that's their charm.",
      points: [
        "A drifting baseline and open forms suggest you think while you write.",
        "Structure isn't your default — great for journals and brainstorming.",
        "Legibility is the only place free spirits pay a price.",
      ],
      growth:
        "One habit fixes most of it: a straight line to write on. Three-line paper does the watching for you.",
    },
    steady: {
      name: "The Quiet Steady",
      tagline: "Upright, even, unhurried — your writing keeps its cool.",
      points: [
        "Upright slant and moderate pressure are read as calm and dependable.",
        "Your hand doesn't rush — and your decisions apparently don't either.",
        "A reserved style that still keeps its letters open.",
      ],
      growth:
        "If speed ever matters, cursive connections add pace without changing your tidy look.",
    },
    spark: {
      name: "The Quick Spark",
      tagline: "Fast, firm, forward-leaning — your hand is in a hurry.",
      points: [
        "Right slant and a brisk pace suggest momentum — you write to keep up with your thoughts.",
        "Firm pressure is read as energy and engagement.",
        "Your quick notes have personality; making them readable is the last mile.",
      ],
      growth:
        "Slow down for one practice sheet a week — rhythm rows train speed that stays legible.",
    },
  },
  questions: [
    {
      id: "slant",
      dimension: "social",
      text: "hello",
      prompt: "Which \u201chello\u201d looks most like yours?",
      options: [
        { score: 2, style: { font: "print", slant: 10 }, label: "Leans to the right" },
        { score: 1, style: { font: "neat", slant: 0 }, label: "Mostly upright" },
        { score: 0, style: { font: "print", slant: -7 }, label: "Leans to the left" },
      ],
    },
    {
      id: "y-tail",
      dimension: "social",
      text: "happy",
      prompt: "How do you finish a letter like y?",
      options: [
        { score: 2, style: { font: "everyday" }, label: "Loops back below the line" },
        { score: 1, style: { font: "caveat" }, label: "A short hook" },
        { score: 0, style: { font: "print" }, label: "Stops with a straight tail" },
      ],
    },
    {
      id: "roundness",
      dimension: "social",
      text: "am",
      prompt: "Which pair matches your everyday letters?",
      options: [
        { score: 2, style: { font: "everyday" }, label: "Round and open" },
        { score: 1, style: { font: "neat" }, label: "Somewhere between" },
        { score: 0, style: { font: "caveat" }, label: "Sharp and angular" },
      ],
    },
    {
      id: "size",
      dimension: "expressive",
      text: "g",
      prompt: "How big is your lowercase writing?",
      options: [
        { score: 0, style: { font: "print", size: 0.8 }, label: "Small — I keep it compact" },
        { score: 1, style: { font: "neat", size: 1.1 }, label: "Medium" },
        { score: 2, style: { font: "print", size: 1.5 }, label: "Large — it fills the line" },
      ],
    },
    {
      id: "capitals",
      dimension: "expressive",
      text: "M",
      prompt: "Pick the capital closest to yours.",
      options: [
        { score: 0, style: { font: "print" }, label: "Plain and simple" },
        { score: 1, style: { font: "neat" }, label: "A little flair" },
        { score: 2, style: { font: "fancy" }, label: "Big flourishes" },
      ],
    },
    {
      id: "word-gap",
      dimension: "space",
      text: "the cat",
      prompt: "How much space do you leave between words?",
      options: [
        { score: 0, style: { font: "neat", word: 0.05 }, label: "Words almost touch" },
        { score: 1, style: { font: "neat", word: 0.4 }, label: "A normal gap" },
        { score: 2, style: { font: "neat", word: 0.9 }, label: "Wide gaps" },
      ],
    },
    {
      id: "letter-gap",
      dimension: "space",
      text: "hand",
      prompt: "And between the letters inside a word?",
      options: [
        { score: 0, style: { font: "print", spacing: -0.03 }, label: "Tight together" },
        { score: 1, style: { font: "print", spacing: 0.03 }, label: "Comfortable" },
        { score: 2, style: { font: "print", spacing: 0.16 }, label: "Roomy" },
      ],
    },
    {
      id: "baseline",
      dimension: "focus",
      text: "sunny day",
      prompt: "When you write a full line, where does it go?",
      options: [
        { score: 0, style: { font: "messy", rotate: 6 }, label: "It drifts up or down" },
        { score: 1, style: { font: "messy", rotate: 2 }, label: "Wanders a little" },
        { score: 2, style: { font: "print", rotate: 0 }, label: "Stays straight" },
      ],
    },
    {
      id: "tidiness",
      dimension: "focus",
      text: "paper",
      prompt: "Which word matches your neatest everyday writing?",
      options: [
        { score: 0, style: { font: "messy" }, label: "Free-form" },
        { score: 1, style: { font: "print" }, label: "Casually tidy" },
        { score: 2, style: { font: "neat" }, label: "Carefully neat" },
      ],
    },
    {
      id: "i-dots",
      dimension: "focus",
      prompt: "Where do the dots over your i's land?",
      options: [
        { score: 2, label: "Exactly above the stem" },
        { score: 1, label: "A little off, or floating high" },
        { score: 0, label: "Wherever they land" },
      ],
    },
    {
      id: "pressure",
      dimension: "pace",
      text: "hello",
      prompt: "How hard do you press when you write?",
      options: [
        { score: 0, style: { font: "caveat", ink: "light" }, label: "Light — pencil-soft" },
        { score: 1, style: { font: "neat", ink: "normal" }, label: "Moderate" },
        { score: 2, style: { font: "print", ink: "heavy" }, label: "Firm — you can see the dents" },
      ],
    },
    {
      id: "pace",
      dimension: "pace",
      prompt: "How do you usually write?",
      options: [
        { score: 0, label: "Slowly and deliberately" },
        { score: 1, label: "It depends on the day" },
        { score: 2, label: "Fast — my hand races ahead" },
      ],
    },
  ],
};

const zh: QuizLocaleContent = {
  title: "手写性格测试",
  intro:
    "这份手写性格测试用 12 道快速选择题看看你平时怎么写字——无需上传照片,也不会记录任何内容。最后你会得到一份趣味笔迹画像,以及针对你书写习惯的练习建议。",
  start: "开始测试",
  back: "上一题",
  retake: "再测一次",
  progress: "第 {n} 题 / 共 {total} 题",
  download: "保存结果卡片",
  writeCta: "用这个风格写一句",
  resultHeading: "你的笔迹画像",
  dimsHeading: "你的答案提示了什么",
  practiceHeading: "想练一练?",
  growthLabel: "提升方向",
  faqTitle: "常见问题",
  articleLink: "延伸阅读:你的字迹说明了什么?诚实版笔迹解读指南",
  scienceTitle: "笔迹分析是科学的吗?",
  scienceText: [
    "笔迹学(graphology,从笔迹推断性格)已被反复验证并不可靠:1989 年 Neter 与 Ben-Shakhar 的荟萃分析发现,笔迹师的判断并不比随机猜测更准,心理学界普遍将其归为伪科学。任何测验——包括本测验——都无法真正从字形读出你的性格。",
    "笔迹真正反映的是习惯:你何时学会写字、平时写得多不多、当下是否匆忙。习惯是可以练的——如果画像里有你想调整的地方,下面的练习工具正好派上用场。",
  ],
  disclaimer:
    "仅供娱乐——本测验是趣味内容,并非科学或心理测评。你的选择不会被上传或保存。",
  dimensions: {
    social: {
      label: "社交能量",
      levels: { low: "内敛", mid: "随和", high: "外向" },
      practice: {
        text: "想要更流畅连贯的书写?花体生成器是个温柔的起点。",
        href: "/cursive",
      },
    },
    expressive: {
      label: "表达力",
      levels: { low: "收敛", mid: "均衡", high: "张扬" },
      practice: {
        text: "均匀的字号来自节奏行训练——描红生成器可以为任意词语打印节奏行。",
        href: "/name-tracing",
      },
    },
    space: {
      label: "空间感",
      levels: { low: "紧密", mid: "灵活", high: "疏朗" },
      practice: {
        text: "词距节奏靠重复培养——用拼写练习生成器、按自己的单词清单出一页。",
        href: "/handwriting-worksheet-generator",
      },
    },
    focus: {
      label: "专注与结构",
      levels: { low: "随性", mid: "平稳", high: "精准" },
      practice: {
        text: "在三条线上写,基线更容易平直——免费打印一张练字纸,试写一段。",
        href: "/printable-paper",
      },
    },
    pace: {
      label: "笔压与速度",
      levels: { low: "轻而从容", mid: "适中", high: "重而快" },
      practice: {
        text: "描红行能带来平稳均匀的节奏——用任意词表生成练习页。",
        href: "/cursive-worksheets",
      },
    },
  },
  profiles: {
    balanced: {
      name: "均衡书写者",
      tagline: "没有单一特质主导——你的手会随场合调整。",
      points: [
        "灵活的风格说明你能匹配场景:速记和用心写的卡片都不在话下。",
        "笔迹学家会称之为平衡;我们只叫它可塑性强。",
        "无论想往哪个方向精进,你都有扎实的基础。",
      ],
      growth: "从下面选一个维度集中练——均衡型书写者专注单点时进步最快。",
    },
    bold: {
      name: "张扬表达者",
      tagline: "字大形开——字还没看清,气场先到。",
      points: [
        "大而圆润的字形常被解读为热情与自信——至少在趣味层面上。",
        "你习惯在纸面上占据存在感。",
        "贺卡和海报是你的天然舞台。",
      ],
      growth: "再张扬的字也受益于均匀的间距——锁定节奏,别让大字牺牲可读性。",
    },
    planner: {
      name: "精准规划者",
      tagline: "直立、整洁、精确——你的手喜欢秩序。",
      points: [
        "稳定的字号和平直的基线,体现出耐心、细节优先的做事方式。",
        "你的笔记就是大家抢着借的那种。",
        "工整的字形是可以训练的肌肉技能——你显然练过。",
      ],
      growth: "精准过头容易僵硬——试试更松快的连笔,在不丢结构的前提下提速。",
    },
    spirit: {
      name: "自由灵魂",
      tagline: "你的字母会散步——这正是它们的魅力。",
      points: [
        "漂移的基线和开放的字形,说明你习惯边写边想。",
        "结构不是你的默认项——写日记和头脑风暴时这反而是优势。",
        "自由灵魂唯一要付的代价,是辨识度。",
      ],
      growth: "一个习惯就能解决大部分问题:在画好的直线上写。三线格会替你盯住基线。",
    },
    steady: {
      name: "沉稳可靠型",
      tagline: "直立、均匀、不慌不忙——你的字沉得住气。",
      points: [
        "直立的笔顺和适中的笔压,常被解读为冷静可靠。",
        "你的手不赶时间,你的决定看起来也是。",
        "风格内敛,字形却依旧开放。",
      ],
      growth: "如果需要速度,花体连笔能在不改变整洁外观的前提下提节奏。",
    },
    spark: {
      name: "急行火花",
      tagline: "快、实、向前倾——你的手总在赶路。",
      points: [
        "右倾的笔顺和轻快的节奏说明你有冲劲——写字是为了跟上思路。",
        "偏重的笔压常被解读为活力与投入。",
        "你的速记自带个性;让它变得易读是最后一公里。",
      ],
      growth: "每周慢下来练一页——节奏行能练出既快又清晰的手感。",
    },
  },
  questions: [
    {
      id: "slant",
      dimension: "social",
      text: "hello",
      prompt: "哪个 \u201chello\u201d 最像你写的?",
      options: [
        { score: 2, style: { font: "print", slant: 10 }, label: "向右倾斜" },
        { score: 1, style: { font: "neat", slant: 0 }, label: "基本竖直" },
        { score: 0, style: { font: "print", slant: -7 }, label: "向左倾斜" },
      ],
    },
    {
      id: "y-tail",
      dimension: "social",
      text: "happy",
      prompt: "y 这样的字母,你的收笔是?",
      options: [
        { score: 2, style: { font: "everyday" }, label: "往下绕一个圈再收回" },
        { score: 1, style: { font: "caveat" }, label: "一个小弯钩" },
        { score: 0, style: { font: "print" }, label: "直直地收住" },
      ],
    },
    {
      id: "roundness",
      dimension: "social",
      text: "am",
      prompt: "哪一组最接近你平时的字?",
      options: [
        { score: 2, style: { font: "everyday" }, label: "圆润开阔" },
        { score: 1, style: { font: "neat" }, label: "介于两者之间" },
        { score: 0, style: { font: "caveat" }, label: "锐利有棱角" },
      ],
    },
    {
      id: "size",
      dimension: "expressive",
      text: "g",
      prompt: "你的小写字母写多大?",
      options: [
        { score: 0, style: { font: "print", size: 0.8 }, label: "偏小——写得紧凑" },
        { score: 1, style: { font: "neat", size: 1.1 }, label: "中等" },
        { score: 2, style: { font: "print", size: 1.5 }, label: "偏大——占满一行" },
      ],
    },
    {
      id: "capitals",
      dimension: "expressive",
      text: "M",
      prompt: "哪个大写字母最接近你写的?",
      options: [
        { score: 0, style: { font: "print" }, label: "朴素简洁" },
        { score: 1, style: { font: "neat" }, label: "有点小花样" },
        { score: 2, style: { font: "fancy" }, label: "大大的花式绕笔" },
      ],
    },
    {
      id: "word-gap",
      dimension: "space",
      text: "the cat",
      prompt: "单词和单词之间,你留多少空隙?",
      options: [
        { score: 0, style: { font: "neat", word: 0.05 }, label: "几乎贴在一起" },
        { score: 1, style: { font: "neat", word: 0.4 }, label: "正常间距" },
        { score: 2, style: { font: "neat", word: 0.9 }, label: "空得很宽" },
      ],
    },
    {
      id: "letter-gap",
      dimension: "space",
      text: "hand",
      prompt: "那单词内部的字母之间呢?",
      options: [
        { score: 0, style: { font: "print", spacing: -0.03 }, label: "挤在一起" },
        { score: 1, style: { font: "print", spacing: 0.03 }, label: "舒适自然" },
        { score: 2, style: { font: "print", spacing: 0.16 }, label: "很宽松" },
      ],
    },
    {
      id: "baseline",
      dimension: "focus",
      text: "sunny day",
      prompt: "写一整行字时,这行字会?",
      options: [
        { score: 0, style: { font: "messy", rotate: 6 }, label: "忽上忽下地漂" },
        { score: 1, style: { font: "messy", rotate: 2 }, label: "略微起伏" },
        { score: 2, style: { font: "print", rotate: 0 }, label: "始终保持水平" },
      ],
    },
    {
      id: "tidiness",
      dimension: "focus",
      text: "paper",
      prompt: "哪个词最接近你平时最工整的字?",
      options: [
        { score: 0, style: { font: "messy" }, label: "自由奔放" },
        { score: 1, style: { font: "print" }, label: "随手还算整齐" },
        { score: 2, style: { font: "neat" }, label: "认真工整" },
      ],
    },
    {
      id: "i-dots",
      dimension: "focus",
      prompt: "i 上的那一点,你通常点在哪儿?",
      options: [
        { score: 2, label: "正好在竖笔正上方" },
        { score: 1, label: "稍微偏一点或飘得高" },
        { score: 0, label: "落到哪儿算哪儿" },
      ],
    },
    {
      id: "pressure",
      dimension: "pace",
      text: "hello",
      prompt: "写字时你下笔多重?",
      options: [
        { score: 0, style: { font: "caveat", ink: "light" }, label: "很轻——像铅笔淡淡扫过" },
        { score: 1, style: { font: "neat", ink: "normal" }, label: "适中" },
        { score: 2, style: { font: "print", ink: "heavy" }, label: "很实——纸背面都有印子" },
      ],
    },
    {
      id: "pace",
      dimension: "pace",
      prompt: "你平时写字的状态是?",
      options: [
        { score: 0, label: "慢慢地、一笔一划" },
        { score: 1, label: "看当天状态" },
        { score: 2, label: "飞快——手一直往前赶" },
      ],
    },
  ],
};


export const QUIZ_CONTENT: Record<Locale, QuizLocaleContent> = { en, zh };
