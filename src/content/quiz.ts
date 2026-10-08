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
  emoji: string;
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
        text: "Word-spacing rhythm improves with repetition — build a sheet from your own word list in Word Work.",
        href: "/word-work",
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
      emoji: "⚖️",
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
      emoji: "🌟",
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
      emoji: "📐",
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
      emoji: "🦋",
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
      emoji: "🌊",
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
      emoji: "⚡",
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
        href: "/word-work",
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
      emoji: "⚖️",
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
      emoji: "🌟",
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
      emoji: "📐",
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
      emoji: "🦋",
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
      emoji: "🌊",
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
      emoji: "⚡",
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

const ja: QuizLocaleContent = {
  title: "筆跡パーソナリティテスト",
  intro:
    "この筆跡パーソナリティテストは、いつもの書き方について 12 問に答えるだけ。写真のアップロードも記録も一切ありません。最後に楽しい筆跡プロフィールと、文字の癖に合わせた練習のヒントをお届けします。",
  start: "クイズを始める",
  back: "前の質問へ",
  retake: "もう一回やる",
  progress: "質問 {n} / {total}",
  download: "結果カードを保存",
  resultHeading: "あなたの筆跡プロフィール",
  dimsHeading: "回答から読みとれること",
  practiceHeading: "練習してみる?",
  growthLabel: "伸びしろ",
  faqTitle: "よくある質問",
  articleLink: "関連記事:あなたの字は何を語る?正直な筆跡ガイド",
  scienceTitle: "筆跡分析は本当に当たる?",
  scienceText: [
    "筆跡から性格を読む「グラフォロジー(筆跡学)」は何度も検証されてきましたが、裏付けはありません。1989 年の Neter & Ben-Shakhar のメタ分析では、筆跡鑑定人の判断は偶然と変わらないという結果が出ており、現在の心理学では疑似科学に分類されています。このクイズを含め、どんなクイズも文字の形から性格を読み取ることはできません。",
    "筆跡が本当に映し出すのは習慣です。いつ文字を覚えたか、どのくらい書くか、今どれだけ急いでいるか。習慣は練習で変えられます。プロフィールで気になった部分があれば、下の練習ツールがちょうど役に立ちます。",
  ],
  disclaimer:
    "娯楽としてお楽しみください——このクイズは趣味のコンテンツであり、科学的・心理学的な assessment ではありません。選んだ答えはアップロードも保存もされません。",
  dimensions: {
    social: {
      label: "社交エネルギー",
      levels: { low: "内向的", mid: "臨機応変", high: "外向的" },
      practice: {
        text: "もっと流れるようなつながりのある字に?カリグラフィー生成器がやさしい入口です。",
        href: "/cursive",
      },
    },
    expressive: {
      label: "表現力",
      levels: { low: "控えめ", mid: "バランス", high: "大胆" },
      practice: {
        text: "均一な文字サイズはリズム行の練習で身につきます。お好きな単語でトレーニング用紙を印刷できます。",
        href: "/name-tracing",
      },
    },
    space: {
      label: "間の取り方",
      levels: { low: "ぎゅっと", mid: "フレキシブル", high: "ゆったり" },
      practice: {
        text: "単語間のリズムは反復で育ちます。自分の単語リストから練習シートを作れます。",
        href: "/word-work",
      },
    },
    focus: {
      label: "集中と構造",
      levels: { low: "自由気まま", mid: "安定", high: "正確" },
      practice: {
        text: "3 線ノートの上ならベースラインはまっすぐ保ちやすくなります。無料の練習用紙を印刷して一段落書いてみて。",
        href: "/printable-paper",
      },
    },
    pace: {
      label: "筆圧とスピード",
      levels: { low: "軽くゆったり", mid: "ほどほど", high: "力強くスピーディ" },
      practice: {
        text: "なぞり書きの行は安定したリズムを作ります。好きな単語リストから練習シートを生成できます。",
        href: "/cursive-worksheets",
      },
    },
  },
  profiles: {
    balanced: {
      name: "バランスライター",
      emoji: "⚖️",
      tagline: "特定の特徴に偏らず、その場に合わせて手が動くタイプ。",
      points: [
        "柔軟なスタイルは、メモもカードも場面に合わせて書き分けられることを示します。",
        "筆跡学なら「均衡」と呼ぶところ。ここでは単に「幅の広さ」。",
        "どのスタイルを伸ばすにも、土台は十分です。",
      ],
      growth: "下から一つだけ次元を選んで磨くのがおすすめ。バランス型は一点集中が一番伸びます。",
    },
    bold: {
      name: "ボールド表現者",
      emoji: "🌟",
      tagline: "大きな字、開いた形——文字より先に存在感が届く。",
      points: [
        "大きく丸みのある文字は、温かさと自信として読まれます——あくまで楽しみとして。",
        "紙面で存在感を取ることに抵抗がありません。",
        "グリーティングカードやポスターはあなたの得意分野。",
      ],
      growth: "大胆な字こそ均一な間隔が効きます。リズムを固定して、大きさに可読性を犠牲にさせないこと。",
    },
    planner: {
      name: "プレシジョンプランナー",
      emoji: "📐",
      tagline: "まっすぐ、整えて、正確に——手が秩序を好むタイプ。",
      points: [
        "一貫したサイズとまっすぐなベースラインは、辛抱強く細部を重視する姿勢の表れ。",
        "あなたのノートは、みんなが借りたがるノート。",
        "整った字形は訓練できる運動スキル。あなたは明らかに練習済み。",
      ],
      growth: "正確さは硬さに出ることも。構造を保ったままスピードを足すなら、少しゆるやかな筆記体を。",
    },
    spirit: {
      name: "フリースピリット",
      emoji: "🦋",
      tagline: "文字はふらふら散歩気味——それが魅力。",
      points: [
        "ゆれるベースラインと開いた形は、書きながら考えているタイプの証拠。",
        "構造はデフォルトじゃない。ジャーナリングやブレストではむしろ強み。",
        "自由人が代償を払うのは読みやすさだけ。",
      ],
      growth: "ほとんどは一つの習慣で解決します。まっすぐな線の上に書くこと。3 線ノートが代わりに見張ってくれます。",
    },
    steady: {
      name: "クワイエットステディ",
      emoji: "🌊",
      tagline: "まっすぐ、むらなく、慌てない——字も冷静さを保つタイプ。",
      points: [
        "直立した傾きと中程度の筆圧は、落ち着きと頼りやすさとして読まれます。",
        "手は急がない。判断もどうやら同じようです。",
        "控えめながら、文字はきちんと開いたまま。",
      ],
      growth: "スピードが必要になったら、筆記体のつながりが見た目を変えずにテンポを上げてくれます。",
    },
    spark: {
      name: "クイックスパーク",
      emoji: "⚡",
      tagline: "速く、力強く、前のめり——手がいつも急いでいる。",
      points: [
        "右傾きと軽快なテンポは勢いの表れ。思考に追いつくために書いています。",
        "力の強い筆圧はエネルギーと熱中として読まれます。",
        "速書きのメモには個性がある。読みやすくするのがラストワンマイル。",
      ],
      growth: "週に一枚だけゆっくり練習を。リズム行は、読みやすさを保ったまま速くなるトレーニングです。",
    },
  },
  questions: [
    {
      id: "slant",
      dimension: "social",
      text: "hello",
      prompt: "どの「hello」がいちばん自分に近い?",
      options: [
        { score: 2, style: { font: "print", slant: 10 }, label: "右に傾く" },
        { score: 1, style: { font: "neat", slant: 0 }, label: "ほぼまっすぐ" },
        { score: 0, style: { font: "print", slant: -7 }, label: "左に傾く" },
      ],
    },
    {
      id: "y-tail",
      dimension: "social",
      text: "happy",
      prompt: "y のような字の終筆はどうしてる?",
      options: [
        { score: 2, style: { font: "everyday" }, label: "下にループさせて戻す" },
        { score: 1, style: { font: "caveat" }, label: "短いフック" },
        { score: 0, style: { font: "print" }, label: "まっすぐ止める" },
      ],
    },
    {
      id: "roundness",
      dimension: "social",
      text: "am",
      prompt: "いつもの文字に近いのはどのペア?",
      options: [
        { score: 2, style: { font: "everyday" }, label: "丸く開いている" },
        { score: 1, style: { font: "neat" }, label: "その中間" },
        { score: 0, style: { font: "caveat" }, label: "シャープで角ばっている" },
      ],
    },
    {
      id: "size",
      dimension: "expressive",
      text: "g",
      prompt: "小文字はどのくらいの大きさ?",
      options: [
        { score: 0, style: { font: "print", size: 0.8 }, label: "小さめ——コンパクトに" },
        { score: 1, style: { font: "neat", size: 1.1 }, label: "ふつう" },
        { score: 2, style: { font: "print", size: 1.5 }, label: "大きめ——行いっぱいに" },
      ],
    },
    {
      id: "capitals",
      dimension: "expressive",
      text: "M",
      prompt: "いちばん近い大文字はどれ?",
      options: [
        { score: 0, style: { font: "print" }, label: "シンプル飾りなし" },
        { score: 1, style: { font: "neat" }, label: "ちょっとしたアクセント" },
        { score: 2, style: { font: "fancy" }, label: "大きな飾り書き" },
      ],
    },
    {
      id: "word-gap",
      dimension: "space",
      text: "the cat",
      prompt: "単語と単語の間はどのくらい空ける?",
      options: [
        { score: 0, style: { font: "neat", word: 0.05 }, label: "ほぼくっつく" },
        { score: 1, style: { font: "neat", word: 0.4 }, label: "ふつうの間隔" },
        { score: 2, style: { font: "neat", word: 0.9 }, label: "広め" },
      ],
    },
    {
      id: "letter-gap",
      dimension: "space",
      text: "hand",
      prompt: "単語の中の文字同士は?",
      options: [
        { score: 0, style: { font: "print", spacing: -0.03 }, label: "ぎゅっと密着" },
        { score: 1, style: { font: "print", spacing: 0.03 }, label: "ゆったり" },
        { score: 2, style: { font: "print", spacing: 0.16 }, label: "かなり広い" },
      ],
    },
    {
      id: "baseline",
      dimension: "focus",
      text: "sunny day",
      prompt: "一行書くと、行はどうなる?",
      options: [
        { score: 0, style: { font: "messy", rotate: 6 }, label: "上下にふらつく" },
        { score: 1, style: { font: "messy", rotate: 2 }, label: "少しやわれる" },
        { score: 2, style: { font: "print", rotate: 0 }, label: "まっすぐ保てる" },
      ],
    },
    {
      id: "tidiness",
      dimension: "focus",
      text: "paper",
      prompt: "いつもの一番きれいな字に近いのはどれ?",
      options: [
        { score: 0, style: { font: "messy" }, label: "自由奔放" },
        { score: 1, style: { font: "print" }, label: "気楽ながら整っている" },
        { score: 2, style: { font: "neat" }, label: "丁寧にきちんと" },
      ],
    },
    {
      id: "i-dots",
      dimension: "focus",
      prompt: "i の点はどこに打ちがち?",
      options: [
        { score: 2, label: "真上にぴったり" },
        { score: 1, label: "少しズレたり高く浮いたり" },
        { score: 0, label: "落ちたところが正解" },
      ],
    },
    {
      id: "pressure",
      dimension: "pace",
      text: "hello",
      prompt: "書くときの筆圧は?",
      options: [
        { score: 0, style: { font: "caveat", ink: "light" }, label: "軽い——鉛筆みたいに" },
        { score: 1, style: { font: "neat", ink: "normal" }, label: "ふつう" },
        { score: 2, style: { font: "print", ink: "heavy" }, label: "強い——裏に跡がつく" },
      ],
    },
    {
      id: "pace",
      dimension: "pace",
      prompt: "ふだん書くときの調子は?",
      options: [
        { score: 0, label: "ゆっくり一画ずつ" },
        { score: 1, label: "日による" },
        { score: 2, label: "速い——手がどんどん先へ" },
      ],
    },
  ],
};

const ko: QuizLocaleContent = {
  title: "글씨 성격 테스트",
  intro:
    "이 글씨 성격 테스트는 평소 쓰는 글씨에 대한 12개의 짧은 질문으로 이루어집니다 — 사진 업로드도, 기록도 없습니다. 마지막에는 재미로 보는 글씨 프로필과 글씨 습관에 맞운 연습 팁을 받아요.",
  start: "퀴즈 시작",
  back: "이전 질문",
  retake: "다시 하기",
  progress: "질문 {n} / {total}",
  download: "결과 카드 저장",
  resultHeading: "나의 글씨 프로필",
  dimsHeading: "대답이 말해주는 것",
  practiceHeading: "연습해볼까요?",
  growthLabel: "성장 포인트",
  faqTitle: "자주 묻는 질문",
  articleLink: "함께 읽기: 당신의 글씨는 무엇을 말할까? 솔직한 필적 가이드",
  scienceTitle: "글씨 분석은 과학일까?",
  scienceText: [
    "글씨에서 성격을 읽는 그래폴로지(필적학)는 여러 차례 검증됐지만 뒷받침되지 않았습니다. 1989년 Neter와 Ben-Shakhar의 메타분석에서 필적 전문가의 판단은 무작위 추측과 다르지 않았고, 오늘날 심리학계는 이를 유사과학으로 분류합니다. 이 퀴즈를 포함해 어떤 퀴즈도 글자 모양만으로 성격을 읽을 수 없습니다.",
    "글씨가 실제로 반영하는 것은 습관입니다. 언제 글씨를 배웠는지, 얼마나 자주 쓰는지, 지얼마 바쁜지. 습관은 연습으로 바꿀 수 있어요 — 프로필에서 고치고 싶은 부분이 보이면, 아래 연습 도구가 딱입니다.",
  ],
  disclaimer:
    "재미로만 즐겨주세요 — 이 퀴즈는 오락 콘텐츠이며 과학적·심리적 평가가 아닙니다. 고른 답은 업로드되거나 저장되지 않습니다.",
  dimensions: {
    social: {
      label: "사회적 에너지",
      levels: { low: "내향적", mid: "유연함", high: "외향적" },
      practice: {
        text: "좀 더 흐름 있고 이어지는 글씨? 필기체 생성기가 부드러운 출발점입니다.",
        href: "/cursive",
      },
    },
    expressive: {
      label: "표현력",
      levels: { low: "절제", mid: "균형", high: "대담" },
      practice: {
        text: "균일한 글자 크기는 리듬 행 연습에서 나옵니다 — 원하는 단어로 연습지를 인쇄해 보세요.",
        href: "/name-tracing",
      },
    },
    space: {
      label: "간격 감각",
      levels: { low: "촘촘", mid: "유동적", high: "여유" },
      practice: {
        text: "단어 간격 리듬은 반복으로 좋아집니다 — 내 단어 목록으로 연습 시트를 만들어 보세요.",
        href: "/word-work",
      },
    },
    focus: {
      label: "집중과 구조",
      levels: { low: "자유로움", mid: "안정", high: "정밀" },
      practice: {
        text: "3선 용지 위에서는 베이스라인이 훨씬 곧아집니다 — 무료 시트를 인쇄해 한 단락 써 보세요.",
        href: "/printable-paper",
      },
    },
    pace: {
      label: "필압과 속도",
      levels: { low: "가볍고 느긋", mid: "보통", high: "굵고 빠름" },
      practice: {
        text: "따라 쓰기 행은 차분하고 균일한 리듬을 만들어 줍니다 — 단어 목록으로 연습지를 만들어 보세요.",
        href: "/cursive-worksheets",
      },
    },
  },
  profiles: {
    balanced: {
      name: "밸런스 라이터",
      emoji: "⚖️",
      tagline: "한쪽으로 치우치지 않고, 상황에 맞춰 손이 움직이는 타입.",
      points: [
        "유연한 스타일은 메모든 카드든 상황에 맞게 써 내려간다는 뜻.",
        "필적학자들은 균형이라 부르겠죠. 우리는 그냥 범위라고 부릅니다.",
        "어떤 스타일을 키우든 탄탄한 기반이 있습니다.",
      ],
      growth: "아래에서 차원 하나를 골라 다듬어 보세요 — 밸런스형은 한 점 집중이 가장 빨리 늘어요.",
    },
    bold: {
      name: "볼드 익스프레시브",
      emoji: "🌟",
      tagline: "큰 글씨, 열린 꼴 — 글씨가 나보다 먼저 도착한다.",
      points: [
        "크고 둥근 글자는 따뜻함과 자신감으로 읽힙니다 — 어디까지나 재미로.",
        "종이 위에서 존재감을 차지하는 게 편한 타입.",
        "카드와 포스터가 당신의 무대입니다.",
      ],
      growth: "과감한 글씨일수록 균일한 간격이 빛납니다 — 크기가 가독성을 해치지 않게 리듬을 잡아 두세요.",
    },
    planner: {
      name: "프레시전 플래너",
      emoji: "📐",
      tagline: "똑바로, 가지런히, 정확하게 — 손이 질서를 좋아한다.",
      points: [
        "일관된 크기와 곧은 베이스라인은 인내심 있고 디테일 먼저 보는 성향을 암시합니다.",
        "당신의 노트는 다들 빌려 달라는 그 노트.",
        "가지런한 글자꼴은 훈련된 운동 기술 — 당신은 분명 연습했군요.",
      ],
      growth: "정밀함이 경직으로 흐를 수 있어요 — 구조는 지키면서 속도를 더할 봉긋한 필기체를 한번.",
    },
    spirit: {
      name: "프리 스피릿",
      emoji: "🦋",
      tagline: "글자들이 여기저기 산책 — 그게 매력입니다.",
      points: [
        "흐트러진 베이스라인과 열린 꼴은 쓰면서 생각하는 타입의 증거.",
        "구조는 기본값이 아님 — 저널링과 브레인스토밍에선 오히려 강점.",
        "자유로운 영혼이 치르는 건 가독성뿐.",
      ],
      growth: "습관 하나면 대부분 해결됩니다: 곧은 선 위에 쓰기. 3선 용지가 대신 지켜줍니다.",
    },
    steady: {
      name: "콰이어트 스테디",
      emoji: "🌊",
      tagline: "똑바로, 고르게, 서두르지 않게 — 글씨도 침착함을 유지한다.",
      points: [
        "곧은 기울기와 적당한 필압은 침착하고 믿음직스럽다고 읽힙니다.",
        "손은 급하지 않고 — 결정도 보아하니 마찬가지.",
        "절제된 스타일인데도 글자는 여전히 열려 있어요.",
      ],
      growth: "속도가 필요해지면 필기체 연결이 모양을 바꾸지 않고 템포를 더해 줍니다.",
    },
    spark: {
      name: "퀵 스파크",
      emoji: "⚡",
      tagline: "빠르고, 굵고, 앞으로 기울어 — 손이 늘 급하다.",
      points: [
        "오른쪽 기울기와 경쾌한 속도는 추진력의 표시 — 생각을 따라잡으려 쓰는 중.",
        "강한 필압은 에너지와 몰입으로 읽힙니다.",
        "빠른 메모에 개성이 넘쳐요; 읽기 좋게 만드는 게 마지막 한 걸음.",
      ],
      growth: "일주일에 한 장만 천천히 연습 — 리듬 행은 가독성을 지킨 채 빨라지는 훈련입니다.",
    },
  },
  questions: [
    {
      id: "slant",
      dimension: "social",
      text: "hello",
      prompt: "어느 \u201chello\u201d가 제일 내 글씨 같나요?",
      options: [
        { score: 2, style: { font: "print", slant: 10 }, label: "오른쪽으로 기울어" },
        { score: 1, style: { font: "neat", slant: 0 }, label: "거의 수직" },
        { score: 0, style: { font: "print", slant: -7 }, label: "왼쪽으로 기울어" },
      ],
    },
    {
      id: "y-tail",
      dimension: "social",
      text: "happy",
      prompt: "y 같은 글자를 어떻게 막나요?",
      options: [
        { score: 2, style: { font: "everyday" }, label: "아래로 루프 돌려서" },
        { score: 1, style: { font: "caveat" }, label: "짧은 갈고리" },
        { score: 0, style: { font: "print" }, label: "곧게 딱 멈춤" },
      ],
    },
    {
      id: "roundness",
      dimension: "social",
      text: "am",
      prompt: "평소 글씨와 가장 가까운 쌍은?",
      options: [
        { score: 2, style: { font: "everyday" }, label: "둥글고 열려 있음" },
        { score: 1, style: { font: "neat" }, label: "그 중간쯤" },
        { score: 0, style: { font: "caveat" }, label: "날카롭고 각진" },
      ],
    },
    {
      id: "size",
      dimension: "expressive",
      text: "g",
      prompt: "소문자는 얼마나 크게 쓰나요?",
      options: [
        { score: 0, style: { font: "print", size: 0.8 }, label: "작게 — 꽉꽉 모아서" },
        { score: 1, style: { font: "neat", size: 1.1 }, label: "보통" },
        { score: 2, style: { font: "print", size: 1.5 }, label: "크게 — 행을 꽉 채우게" },
      ],
    },
    {
      id: "capitals",
      dimension: "expressive",
      text: "M",
      prompt: "가장 가까운 대문자는?",
      options: [
        { score: 0, style: { font: "print" }, label: "수수하게" },
        { score: 1, style: { font: "neat" }, label: "살짝 멋내기" },
        { score: 2, style: { font: "fancy" }, label: "화려한 장식" },
      ],
    },
    {
      id: "word-gap",
      dimension: "space",
      text: "the cat",
      prompt: "단어 사이는 얼마나 띄우나요?",
      options: [
        { score: 0, style: { font: "neat", word: 0.05 }, label: "거의 붙어있게" },
        { score: 1, style: { font: "neat", word: 0.4 }, label: "보통 간격" },
        { score: 2, style: { font: "neat", word: 0.9 }, label: "넉넉하게" },
      ],
    },
    {
      id: "letter-gap",
      dimension: "space",
      text: "hand",
      prompt: "단어 안의 글자들끼리는?",
      options: [
        { score: 0, style: { font: "print", spacing: -0.03 }, label: "딱 붙여서" },
        { score: 1, style: { font: "print", spacing: 0.03 }, label: "편안하게" },
        { score: 2, style: { font: "print", spacing: 0.16 }, label: "여유롭게" },
      ],
    },
    {
      id: "baseline",
      dimension: "focus",
      text: "sunny day",
      prompt: "한 행을 쓰면 그 행은 어때요?",
      options: [
        { score: 0, style: { font: "messy", rotate: 6 }, label: "위아래로 흘러요" },
        { score: 1, style: { font: "messy", rotate: 2 }, label: "조금씩 흔들려요" },
        { score: 2, style: { font: "print", rotate: 0 }, label: "곧게 유지돼요" },
      ],
    },
    {
      id: "tidiness",
      dimension: "focus",
      text: "paper",
      prompt: "평소 가장 가지런한 글씨와 가장 가까운 단어는?",
      options: [
        { score: 0, style: { font: "messy" }, label: "자유분방" },
        { score: 1, style: { font: "print" }, label: "편하면서도 정돈" },
        { score: 2, style: { font: "neat" }, label: "꼼꼼하게 정갈" },
      ],
    },
    {
      id: "i-dots",
      dimension: "focus",
      prompt: "i의 점은 어디에 찍히나요?",
      options: [
        { score: 2, label: "대롱 위에 딱" },
        { score: 1, label: "조금 삐뚤거나 둥둥 높게" },
        { score: 0, label: "떨어진 자리가 명당" },
      ],
    },
    {
      id: "pressure",
      dimension: "pace",
      text: "hello",
      prompt: "쓸 때 얼마나 세게 누르나요?",
      options: [
        { score: 0, style: { font: "caveat", ink: "light" }, label: "가볍게 — 연필처럼" },
        { score: 1, style: { font: "neat", ink: "normal" }, label: "보통" },
        { score: 2, style: { font: "print", ink: "heavy" }, label: "묵직하게 — 뒷면에 자국이" },
      ],
    },
    {
      id: "pace",
      dimension: "pace",
      prompt: "평소 쓰는 방식은?",
      options: [
        { score: 0, label: "천천히 한 획 한 획" },
        { score: 1, label: "날마다 달라요" },
        { score: 2, label: "빠르게 — 손이 앞서 나가요" },
      ],
    },
  ],
};

const es: QuizLocaleContent = {
  title: "Test de personalidad según tu letra",
  intro:
    "12 preguntas rápidas sobre cómo escribes — sin subir fotos y sin guardar nada. Al final tendrás un perfil caligráfico de entretenimiento y consejos para practicar los hábitos detrás de tus letras.",
  start: "Empezar el test",
  back: "Anterior",
  retake: "Repetir el test",
  progress: "Pregunta {n} de {total}",
  download: "Descargar mi resultado",
  resultHeading: "Tu perfil de escritura",
  dimsHeading: "Lo que sugieren tus respuestas",
  practiceHeading: "¿Quieres practicar?",
  growthLabel: "Para mejorar",
  faqTitle: "Preguntas frecuentes",
  articleLink: "Sigue leyendo: ¿qué dice tu letra sobre ti? La guía honesta",
  scienceTitle: "¿Es real el análisis de la escritura?",
  scienceText: [
    "La grafología —leer la personalidad en la letra— se ha puesto a prueba muchas veces y no se sostiene. Un metaanálisis de 1989 de Neter y Ben-Shakhar concluyó que los juicios de los grafólogos no superaban el azar, y hoy la psicología la clasifica como pseudociencia. Ningún test, tampoco este, puede leer tu personalidad en las formas de las letras.",
    "Lo que la letra refleja de verdad son hábitos: cuándo aprendiste, cuánto escribes, con cuánta prisa. Los hábitos se entrenan — así que si el perfil señala algo que te gustaría cambiar, las herramientas de práctica de abajo pueden ayudarte.",
  ],
  disclaimer:
    "Solo para divertirse — este test es entretenimiento, no una evaluación científica ni psicológica. Nada de lo que elijas se sube ni se guarda.",
  dimensions: {
    social: {
      label: "Energía social",
      levels: { low: "Reservado", mid: "Adaptable", high: "Extrovertido" },
      practice: {
        text: "¿Te apetece un estilo más fluido y conectado? El generador de letra cursiva es un buen punto de partida.",
        href: "/cursive",
      },
    },
    expressive: {
      label: "Expresividad",
      levels: { low: "Contenida", mid: "Equilibrada", high: "Atrevida" },
      practice: {
        text: "Un tamaño uniforme viene de filas con ritmo — el generador de calcos las imprime con la palabra que quieras.",
        href: "/name-tracing",
      },
    },
    space: {
      label: "Espacio personal",
      levels: { low: "Junto", mid: "Flexible", high: "Amplio" },
      practice: {
        text: "El ritmo de los espacios mejora con repetición — crea una hoja con tu propia lista de palabras.",
        href: "/word-work",
      },
    },
    focus: {
      label: "Concentración y estructura",
      levels: { low: "Fluida", mid: "Estable", high: "Precisa" },
      practice: {
        text: "Una línea recta es más fácil en papel de tres líneas — imprime una hoja gratis y prueba con un párrafo.",
        href: "/printable-paper",
      },
    },
    pace: {
      label: "Presión y ritmo",
      levels: { low: "Suave y tranquila", mid: "Moderada", high: "Firme y rápida" },
      practice: {
        text: "Las filas para calcar marcan un ritmo parejo — genera hojas de práctica con cualquier lista de palabras.",
        href: "/cursive-worksheets",
      },
    },
  },
  profiles: {
    balanced: {
      name: "El Equilibrado",
      emoji: "⚖️",
      tagline: "Ningún rasgo manda — tu mano se adapta al momento.",
      points: [
        "Un estilo flexible sugiere que adaptas la letra a la situación: notas rápidas y tarjetas cuidadas.",
        "Los grafólogos lo llamarían equilibrio; nosotros lo llamamos rango.",
        "Tienes una base sólida para construir cualquier estilo.",
      ],
      growth: "Elige una dimensión para pulir — a los equilibrados les va mejor con un solo foco.",
    },
    bold: {
      name: "El Expresivo Atrevido",
      emoji: "🌟",
      tagline: "Letras grandes, formas abiertas — tu letra llega antes que tú.",
      points: [
        "Las letras grandes y redondeadas se leen como calidez y confianza — por diversión, al menos.",
        "Estás a gusto ocupando espacio en el papel.",
        "Las tarjetas y los carteles son tu formato natural.",
      ],
      growth: "Hasta la letra atrevida gana con espaciados parejos — fija un ritmo para que el tamaño no cueste legibilidad.",
    },
    planner: {
      name: "El Planificador Preciso",
      emoji: "📐",
      tagline: "Vertical, ordenado, exacto — tu mano gusta del orden.",
      points: [
        "Tamaño constante y líneas rectas sugieren paciencia y ojo para el detalle.",
        "La tuya es la letra de la que copian los apuntes.",
        "Una letra nítida es una habilidad motriz entrenada — y la tuya se nota practicada.",
      ],
      growth: "La precisión puede volverse rigidez — prueba una cursiva más suelta para ganar velocidad sin perder estructura.",
    },
    spirit: {
      name: "El Espíritu Libre",
      emoji: "🦋",
      tagline: "Tus letras deambulan — y ahí está su encanto.",
      points: [
        "Una línea que sube y baja y formas abiertas sugieren que piensas mientras escribes.",
        "La estructura no es lo tuyo — perfecto para diarios y lluvias de ideas.",
        "La legibilidad es lo único donde el espíritu libre paga peaje.",
      ],
      growth: "Un hábito arregla casi todo: escribir sobre una línea recta. El papel de tres líneas vigila por ti.",
    },
    steady: {
      name: "El Sereno Constante",
      emoji: "🌊",
      tagline: "Vertical, parejo, sin prisa — tu letra mantiene la calma.",
      points: [
        "Trazo vertical y presión moderada se leen como calma y fiabilidad.",
        "Tu mano no se apura — y por lo visto tus decisiones tampoco.",
        "Un estilo reservado que mantiene las letras abiertas.",
      ],
      growth: "Si algún día importa la velocidad, los enlaces de la cursiva añaden ritmo sin cambiar tu letra ordenada.",
    },
    spark: {
      name: "La Chispa Veloz",
      emoji: "⚡",
      tagline: "Rápida, firme, inclinada hacia adelante — tu mano tiene prisa.",
      points: [
        "Inclinación a la derecha y buen ritmo sugieren impulso — escribes para alcanzar tus ideas.",
        "La presión firme se lee como energía y compromiso.",
        "Tus notas rápidas tienen personalidad; hacerlas legibles es la última milla.",
      ],
      growth: "Frena una hoja por semana — las filas con ritmo entrenan velocidad que sigue siendo legible.",
    },
  },
  questions: [
    {
      id: "slant",
      dimension: "social",
      text: "hello",
      prompt: "¿Qué \u201chello\u201d se parece más al tuyo?",
      options: [
        { score: 2, style: { font: "print", slant: 10 }, label: "Se inclina a la derecha" },
        { score: 1, style: { font: "neat", slant: 0 }, label: "Casi vertical" },
        { score: 0, style: { font: "print", slant: -7 }, label: "Se inclina a la izquierda" },
      ],
    },
    {
      id: "y-tail",
      dimension: "social",
      text: "happy",
      prompt: "¿Cómo terminas una letra como la y?",
      options: [
        { score: 2, style: { font: "everyday" }, label: "Con un rulo por debajo de la línea" },
        { score: 1, style: { font: "caveat" }, label: "Con un gancho corto" },
        { score: 0, style: { font: "print" }, label: "Corta con un trazo recto" },
      ],
    },
    {
      id: "roundness",
      dimension: "social",
      text: "am",
      prompt: "¿Qué pareja se parece a tus letras de todos los días?",
      options: [
        { score: 2, style: { font: "everyday" }, label: "Redondas y abiertas" },
        { score: 1, style: { font: "neat" }, label: "A medio camino" },
        { score: 0, style: { font: "caveat" }, label: "Afiladas y angulosas" },
      ],
    },
    {
      id: "size",
      dimension: "expressive",
      text: "g",
      prompt: "¿De qué tamaño escribes las minúsculas?",
      options: [
        { score: 0, style: { font: "print", size: 0.8 }, label: "Pequeñas — bien compactas" },
        { score: 1, style: { font: "neat", size: 1.1 }, label: "Medianas" },
        { score: 2, style: { font: "print", size: 1.5 }, label: "Grandes — llenan el renglón" },
      ],
    },
    {
      id: "capitals",
      dimension: "expressive",
      text: "M",
      prompt: "Elige la mayúscula más parecida a la tuya.",
      options: [
        { score: 0, style: { font: "print" }, label: "Llana y sencilla" },
        { score: 1, style: { font: "neat" }, label: "Con un toque de gracia" },
        { score: 2, style: { font: "fancy" }, label: "Con grandes florituras" },
      ],
    },
    {
      id: "word-gap",
      dimension: "space",
      text: "the cat",
      prompt: "¿Cuánto espacio dejas entre palabras?",
      options: [
        { score: 0, style: { font: "neat", word: 0.05 }, label: "Casi se tocan" },
        { score: 1, style: { font: "neat", word: 0.4 }, label: "Un hueco normal" },
        { score: 2, style: { font: "neat", word: 0.9 }, label: "Huecos amplios" },
      ],
    },
    {
      id: "letter-gap",
      dimension: "space",
      text: "hand",
      prompt: "¿Y entre las letras dentro de una palabra?",
      options: [
        { score: 0, style: { font: "print", spacing: -0.03 }, label: "Apiñadas" },
        { score: 1, style: { font: "print", spacing: 0.03 }, label: "Cómodas" },
        { score: 2, style: { font: "print", spacing: 0.16 }, label: "Con mucho aire" },
      ],
    },
    {
      id: "baseline",
      dimension: "focus",
      text: "sunny day",
      prompt: "Cuando escribes un renglón entero, ¿hacia dónde va?",
      options: [
        { score: 0, style: { font: "messy", rotate: 6 }, label: "Se va subiendo o bajando" },
        { score: 1, style: { font: "messy", rotate: 2 }, label: "Vaga un poco" },
        { score: 2, style: { font: "print", rotate: 0 }, label: "Se mantiene recta" },
      ],
    },
    {
      id: "tidiness",
      dimension: "focus",
      text: "paper",
      prompt: "¿Qué palabra se parece a tu letra diaria más cuidada?",
      options: [
        { score: 0, style: { font: "messy" }, label: "A mi aire" },
        { score: 1, style: { font: "print" }, label: "Desorden ordenado" },
        { score: 2, style: { font: "neat" }, label: "Cuidadosamente nítida" },
      ],
    },
    {
      id: "i-dots",
      dimension: "focus",
      prompt: "¿Dónde caen los puntos de las íes?",
      options: [
        { score: 2, label: "Justo encima del palo" },
        { score: 1, label: "Un poco desviados o flotando" },
        { score: 0, label: "Donde caigan" },
      ],
    },
    {
      id: "pressure",
      dimension: "pace",
      text: "hello",
      prompt: "¿Con cuánta fuerza aprietas al escribir?",
      options: [
        { score: 0, style: { font: "caveat", ink: "light" }, label: "Suave — como a lápiz" },
        { score: 1, style: { font: "neat", ink: "normal" }, label: "Moderada" },
        { score: 2, style: { font: "print", ink: "heavy" }, label: "Firme — se marca el dorso" },
      ],
    },
    {
      id: "pace",
      dimension: "pace",
      prompt: "¿Cómo escribes normalmente?",
      options: [
        { score: 0, label: "Despacio y con calma" },
        { score: 1, label: "Depende del día" },
        { score: 2, label: "Rápido — la mano va por delante" },
      ],
    },
  ],
};

const de: QuizLocaleContent = {
  title: "Handschrift-Persönlichkeitstest",
  intro:
    "Dieser Handschrift-Persönlichkeitstest stellt 12 kurze Fragen darüber, wie du schreibst — kein Foto-Upload, nichts wird gespeichert. Am Ende bekommst du ein Spaße-Handschrift-Profil plus Übungstipps für die Gewohnheiten hinter deinen Buchstaben.",
  start: "Quiz starten",
  back: "Zurück",
  retake: "Quiz wiederholen",
  progress: "Frage {n} von {total}",
  download: "Mein Ergebnis speichern",
  resultHeading: "Dein Handschrift-Profil",
  dimsHeading: "Was deine Antworten nahelegen",
  practiceHeading: "Lust zu üben?",
  growthLabel: "Übungsansatz",
  faqTitle: "Häufige Fragen",
  articleLink: "Weiterlesen: Was verrät deine Handschrift? Der ehrliche Ratgeber",
  scienceTitle: "Ist Handschriftenanalyse echt?",
  scienceText: [
    "Die Graphologie — Persönlichkeit aus Handschrift zu lesen — wurde oft getestet und hält der Prüfung nicht stand. Eine Metaanalyse von Neter und Ben-Shakhar (1989) zeigte, dass Graphologen-Urteile kaum besser als Raten sind; die Psychologie stuft sie heute als Pseudowissenschaft ein. Kein Quiz — auch dieses nicht — kann deine Persönlichkeit aus Buchstabenformen lesen.",
    "Was Handschrift wirklich widerspiegelt, sind Gewohnheiten: wann du gelernt hast, wie oft du schreibst, wie gehetzt du bist. Gewohnheiten lassen sich trainieren — wenn das Profil also einen Stil hervorhebt, den du ändern möchtest, helfen dir die Übungswerkzeuge unten.",
  ],
  disclaimer:
    "Nur zum Spaß — dieses Quiz ist Unterhaltung, keine wissenschaftliche oder psychologische Einschätzung. Deine Auswahl wird weder hochgeladen noch gespeichert.",
  dimensions: {
    social: {
      label: "Soziale Energie",
      levels: { low: "Zurückhaltend", mid: "Anpassungsfähig", high: "Extravertiert" },
      practice: {
        text: "Lust auf einen fließenderen, verbundenen Stil? Der Schreibschrift-Generator ist ein sanfter Einstieg.",
        href: "/cursive",
      },
    },
    expressive: {
      label: "Ausdrucksstärke",
      levels: { low: "Zurückhaltend", mid: "Ausbalanciert", high: "Kühn" },
      practice: {
        text: "Gleichmäßige Buchstabengröße kommt aus Rhythmuszeilen — der Spuren-Generator druckt sie für jedes Wort.",
        href: "/name-tracing",
      },
    },
    space: {
      label: "Persönlicher Raum",
      levels: { low: "Eng", mid: "Flexibel", high: "Luftig" },
      practice: {
        text: "Wortabstand-Rhythmus wächst mit Wiederholung — erstelle ein Blatt aus deiner eigenen Wortliste.",
        href: "/word-work",
      },
    },
    focus: {
      label: "Fokus & Struktur",
      levels: { low: "Frei fließend", mid: "Stabil", high: "Präzise" },
      practice: {
        text: "Auf Drei-Linien-Papier gerät die Grundlinie leichter gerade — druck ein kostenloses Blatt und probiere einen Absatz.",
        href: "/printable-paper",
      },
    },
    pace: {
      label: "Druck & Tempo",
      levels: { low: "Leicht & gemächlich", mid: "Moderat", high: "Fest & schnell" },
      practice: {
        text: "Spurzeilen geben einen ruhigen, gleichmäßigen Rhythmus vor — erzeuge Übungsblätter aus jeder Wortliste.",
        href: "/cursive-worksheets",
      },
    },
  },
  profiles: {
    balanced: {
      name: "Der Ausbalancierte Schreiber",
      emoji: "⚖️",
      tagline: "Kein Zug führt das Regiment — deine Hand passt sich dem Moment an.",
      points: [
        "Ein flexibler Stil deutet darauf hin, dass du die Schrift der Lage anpasst — flotte Notizen wie sorgfältige Karten.",
        "Graphologen würden das Balance nennen; wir nennen es einfach Bandbreite.",
        "Du hast ein solides Fundament für jeden Stil.",
      ],
      growth: "Wähle unten eine Dimension zum Feinschliff — Ausgewogene wachsen am schnellsten mit einem Fokus.",
    },
    bold: {
      name: "Der Kühne Ausdrucksstarke",
      emoji: "🌟",
      tagline: "Große Buchstaben, offene Formen — deine Schrift kommt vor dir an.",
      points: [
        "Große, runde Buchstaben werden als Wärme und Selbstbewusstsein gelesen — zumindest zum Spaß.",
        "Du nimmst gern Raum auf dem Papier ein.",
        "Grußkarten und Poster sind dein natürliches Format.",
      ],
      growth: "Auch kühne Schrift profitiert von gleichmäßigen Abständen — verankere einen Rhythmus, damit Größe nie die Lesbarkeit kostet.",
    },
    planner: {
      name: "Der Präzise Planer",
      emoji: "📐",
      tagline: "Aufrecht, ordentlich, exakt — deine Hand mag Ordnung.",
      points: [
        "Konstante Größe und gerade Grundlinien deuten auf Geduld und Blicks fürs Detail.",
        "Deine Notizen sind die, die sich alle leihen.",
        "Sauber geformte Buchstaben sind eine trainierte motorische Fähigkeit — und deine ist offensichtlich geübt.",
      ],
      growth: "Präzision kann in Steifheit kippen — probiere eine lockerere Schreibschrift für Tempo ohne Strukturverlust.",
    },
    spirit: {
      name: "Der Freie Geist",
      emoji: "🦋",
      tagline: "Deine Buchstaben wandern — das ist ihr Charme.",
      points: [
        "Eine wandernde Grundlinie und offene Formen deuten darauf hin, dass du beim Schreiben denkst.",
        "Struktur ist nicht dein Default — ideal für Tagebücher und Brainstorming.",
        "Lesbarkeit ist der einzige Preis, den freie Geister zahlen.",
      ],
      growth: "Eine Gewohnheit löst das meiste: auf einer geraden Linie schreiben. Drei-Linien-Papier übernimmt das Wachen.",
    },
    steady: {
      name: "Der Ruhige Stetige",
      emoji: "🌊",
      tagline: "Aufrecht, gleichmäßig, ohne Eile — deine Schrift bewahrt Ruhe.",
      points: [
        "Aufrechte Neigung und mäßiger Druck werden als ruhig und verlässlich gelesen.",
        "Deine Hand eilt nicht — und deine Entscheidungen offenbar auch nicht.",
        "Ein zurückhaltender Stil, der die Buchstaben trotzdem offen hält.",
      ],
      growth: "Wenn Tempo mal zählt, fügen Schreibschrift-Verbindungen Speed hinzu, ohne deinen ordentlichen Look zu ändern.",
    },
    spark: {
      name: "Der Flinke Funke",
      emoji: "⚡",
      tagline: "Schnell, kräftig, nach vorn geneigt — deine Hand hat es eilig.",
      points: [
        "Rechtsneigung und flottes Tempo deuten auf Schwung — du schreibst, um mit deinen Gedanken Schritt zu halten.",
        "Fester Druck wird als Energie und Engagement gelesen.",
        "Deine Schnellnotizen haben Charakter; lesbar machen ist die letzte Meile.",
      ],
      growth: "Ein Übungsblatt pro Woche im Slow-Motion — Rhythmuszeilen trainieren Tempo, das lesbar bleibt.",
    },
  },
  questions: [
    {
      id: "slant",
      dimension: "social",
      text: "hello",
      prompt: "Welches \u201ehello\u201c sieht deinem am ähnlichsten?",
      options: [
        { score: 2, style: { font: "print", slant: 10 }, label: "Lehnt nach rechts" },
        { score: 1, style: { font: "neat", slant: 0 }, label: "Meist aufrecht" },
        { score: 0, style: { font: "print", slant: -7 }, label: "Lehnt nach links" },
      ],
    },
    {
      id: "y-tail",
      dimension: "social",
      text: "happy",
      prompt: "Wie beendest du einen Buchstaben wie y?",
      options: [
        { score: 2, style: { font: "everyday" }, label: "Mit einer Schleife unter der Linie" },
        { score: 1, style: { font: "caveat" }, label: "Mit kurzem Haken" },
        { score: 0, style: { font: "print" }, label: "Gerader Endstrich" },
      ],
    },
    {
      id: "roundness",
      dimension: "social",
      text: "am",
      prompt: "Welches Paar ähnelt deinen Alltagsbuchstaben?",
      options: [
        { score: 2, style: { font: "everyday" }, label: "Rund und offen" },
        { score: 1, style: { font: "neat" }, label: "Irgendwo dazwischen" },
        { score: 0, style: { font: "caveat" }, label: "Spitz und kantig" },
      ],
    },
    {
      id: "size",
      dimension: "expressive",
      text: "g",
      prompt: "Wie groß schreibst du Kleinbuchstaben?",
      options: [
        { score: 0, style: { font: "print", size: 0.8 }, label: "Klein — kompakt" },
        { score: 1, style: { font: "neat", size: 1.1 }, label: "Mittel" },
        { score: 2, style: { font: "print", size: 1.5 }, label: "Groß — füllt die Zeile" },
      ],
    },
    {
      id: "capitals",
      dimension: "expressive",
      text: "M",
      prompt: "Welcher Großbuchstabe kommt deinem am nächsten?",
      options: [
        { score: 0, style: { font: "print" }, label: "Schlicht und einfach" },
        { score: 1, style: { font: "neat" }, label: "Ein kleiner Schwung" },
        { score: 2, style: { font: "fancy" }, label: "Große Verschnörkelungen" },
      ],
    },
    {
      id: "word-gap",
      dimension: "space",
      text: "the cat",
      prompt: "Wie viel Platz lässt du zwischen Wörtern?",
      options: [
        { score: 0, style: { font: "neat", word: 0.05 }, label: "Wörter berühren sich fast" },
        { score: 1, style: { font: "neat", word: 0.4 }, label: "Normaler Abstand" },
        { score: 2, style: { font: "neat", word: 0.9 }, label: "Weite Abstände" },
      ],
    },
    {
      id: "letter-gap",
      dimension: "space",
      text: "hand",
      prompt: "Und zwischen den Buchstaben im Wort?",
      options: [
        { score: 0, style: { font: "print", spacing: -0.03 }, label: "Eng an eng" },
        { score: 1, style: { font: "print", spacing: 0.03 }, label: "Angenehm" },
        { score: 2, style: { font: "print", spacing: 0.16 }, label: "Weiträumig" },
      ],
    },
    {
      id: "baseline",
      dimension: "focus",
      text: "sunny day",
      prompt: "Wenn du eine ganze Zeile schreibst — wohin wandert sie?",
      options: [
        { score: 0, style: { font: "messy", rotate: 6 }, label: "Sie wandert auf und ab" },
        { score: 1, style: { font: "messy", rotate: 2 }, label: "Sie schweift ein wenig" },
        { score: 2, style: { font: "print", rotate: 0 }, label: "Sie bleibt gerade" },
      ],
    },
    {
      id: "tidiness",
      dimension: "focus",
      text: "paper",
      prompt: "Welches Wort ähnelt deiner ordentlichsten Alltagsschrift?",
      options: [
        { score: 0, style: { font: "messy" }, label: "Frei fließend" },
        { score: 1, style: { font: "print" }, label: "Lässig ordentlich" },
        { score: 2, style: { font: "neat" }, label: "Sorgfältig sauber" },
      ],
    },
    {
      id: "i-dots",
      dimension: "focus",
      prompt: "Wo landen die Punkte über deinen i?",
      options: [
        { score: 2, label: "Genau über dem Strich" },
        { score: 1, label: "Etwas daneben oder hoch schwebend" },
        { score: 0, label: "Wo sie eben landen" },
      ],
    },
    {
      id: "pressure",
      dimension: "pace",
      text: "hello",
      prompt: "Wie fest drückst du beim Schreiben auf?",
      options: [
        { score: 0, style: { font: "caveat", ink: "light" }, label: "Leicht — bleistiftweich" },
        { score: 1, style: { font: "neat", ink: "normal" }, label: "Moderat" },
        { score: 2, style: { font: "print", ink: "heavy" }, label: "Fest — man sieht die Prägung" },
      ],
    },
    {
      id: "pace",
      dimension: "pace",
      prompt: "Wie schreibst du üblicherweise?",
      options: [
        { score: 0, label: "Langsam und bedächtig" },
        { score: 1, label: "Kommt auf den Tag an" },
        { score: 2, label: "Schnell — die Hand eilt voraus" },
      ],
    },
  ],
};

const fr: QuizLocaleContent = {
  title: "Quiz de personnalité par l'écriture",
  intro:
    "12 questions rapides sur votre façon d'écrire — sans téléverser de photo, sans rien enregistrer. À la fin, un profil d'écriture juste pour le plaisir, plus des conseils pour travailler les habitudes derrière vos lettres.",
  start: "Commencer le quiz",
  back: "Retour",
  retake: "Refaire le quiz",
  progress: "Question {n} sur {total}",
  download: "Télécharger mon résultat",
  resultHeading: "Votre profil d'écriture",
  dimsHeading: "Ce que vos réponses suggèrent",
  practiceHeading: "Envie de vous entraîner ?",
  growthLabel: "Piste de progrès",
  faqTitle: "Questions fréquentes",
  articleLink: "À lire aussi : que dit votre écriture sur vous ? Le guide honnête",
  scienceTitle: "L'analyse de l'écriture, est-ce fiable ?",
  scienceText: [
    "La graphologie — lire la personnalité dans l'écriture — a été testée maintes fois et ne tient pas. Une méta-analyse de 1989 (Neter et Ben-Shakhar) a montré que les jugements des graphologues ne dépassaient pas le hasard ; la psychologie la classe aujourd'hui parmi les pseudosciences. Aucun quiz, celui-ci compris, ne peut lire votre personnalité dans la forme des lettres.",
    "Ce que l'écriture reflète vraiment, ce sont des habitudes : quand vous avez appris, à quelle fréquence vous écrivez, à quel point vous êtes pressé. Les habitudes, ça s'entraîne — si le profil pointe un style que vous voudriez changer, les outils d'entraînement ci-dessous sont là pour ça.",
  ],
  disclaimer:
    "Pour le plaisir uniquement — ce quiz est un divertissement, pas une évaluation scientifique ou psychologique. Rien de vos réponses n'est téléversé ni stocké.",
  dimensions: {
    social: {
      label: "Énergie sociale",
      levels: { low: "Réservé", mid: "Adaptable", high: "Ouvert" },
      practice: {
        text: "Envie d'un style plus fluide et lié ? Le générateur d'écriture cursive est une douce entrée en matière.",
        href: "/cursive",
      },
    },
    expressive: {
      label: "Expressivité",
      levels: { low: "Retenue", mid: "Équilibrée", high: "Assurée" },
      practice: {
        text: "Une taille régulière vient des lignes-rythmes — le générateur de modèles les imprime pour n'importe quel mot.",
        href: "/name-tracing",
      },
    },
    space: {
      label: "Espace personnel",
      levels: { low: "Rassemblé", mid: "Souple", high: "Aéré" },
      practice: {
        text: "Le rythme des espaces se travaille par répétition — créez une feuille avec votre propre liste de mots.",
        href: "/word-work",
      },
    },
    focus: {
      label: "Concentration et structure",
      levels: { low: "Fluide", mid: "Stable", high: "Précise" },
      practice: {
        text: "Une ligne de base droite est plus facile sur papier séyès — imprimez une feuille gratuite et essayez un paragraphe.",
        href: "/printable-paper",
      },
    },
    pace: {
      label: "Pression et rythme",
      levels: { low: "Léger et posé", mid: "Modéré", high: "Appuyé et rapide" },
      practice: {
        text: "Les lignes à reproduire donnent un rythme calme et régulier — générez des feuilles depuis n'importe quelle liste de mots.",
        href: "/cursive-worksheets",
      },
    },
  },
  profiles: {
    balanced: {
      name: "L'Équilibré",
      emoji: "⚖️",
      tagline: "Aucun trait ne domine — votre main s'adapte au moment.",
      points: [
        "Un style flexible suggère que vous ajustez l'écriture à la situation — notes rapides comme cartes soignées.",
        "Les graphologues diraient équilibre ; nous disons simplement amplitude.",
        "Vous avez une base solide pour bâtir n'importe quel style.",
      ],
      growth: "Choisissez une seule dimension à peaufiner — les équilibrés progressent plus vite avec un focus unique.",
    },
    bold: {
      name: "L'Expressif Assumé",
      emoji: "🌟",
      tagline: "Grandes lettres, formes ouvertes — votre écriture arrive avant vous.",
      points: [
        "Les lettres grandes et rondes sont lues comme chaleur et confiance — pour le fun, tout du moins.",
        "Vous êtes à l'aise pour occuper l'espace sur la page.",
        "Cartes et affiches sont votre format naturel.",
      ],
      growth: "Même une écriture assurée gagne aux espaces réguliers — verrouillez un rythme pour que la taille ne coûte jamais la lisibilité.",
    },
    planner: {
      name: "Le Planificateur de Précision",
      emoji: "📐",
      tagline: "Droit, net, exact — votre main aime l'ordre.",
      points: [
        "Taille constante et lignes de base droites suggèrent patience et souci du détail.",
        "Vos notes, ce sont celles qu'on vous emprunte.",
        "Des lettres nettes sont une motricité entraînée — la vôtre a clairement pratiqué.",
      ],
      growth: "La précision peut virer à la raideur — essayez une cursive plus souple pour gagner en vitesse sans perdre la structure.",
    },
    spirit: {
      name: "L'Esprit Libre",
      emoji: "🦋",
      tagline: "Vos lettres vagabondent — et c'est tout leur charme.",
      points: [
        "Une ligne de base qui ondule et des formes ouvertes suggèrent que vous pensez en écrivant.",
        "La structure n'est pas votre défaut — parfait pour le journal intime et le brainstorming.",
        "La lisibilité est le seul péage que paient les esprits libres.",
      ],
      growth: "Une habitude règle l'essentiel : écrire sur une ligne droite. Le papier séyès surveille à votre place.",
    },
    steady: {
      name: "Le Serein Constant",
      emoji: "🌊",
      tagline: "Droit, régulier, sans hâte — votre écriture garde son calme.",
      points: [
        "Une inclinaison verticale et une pression modérée se lisent comme calme et fiabilité.",
        "Votre main ne se presse pas — et vos décisions, apparemment, non plus.",
        "Un style réservé qui garde pourtant les lettres ouvertes.",
      ],
      growth: "Si la vitesse compte un jour, les liaisons cursives ajoutent du tempo sans changer votre allure soignée.",
    },
    spark: {
      name: "L'Étincelle Vive",
      emoji: "⚡",
      tagline: "Rapide, appuyée, penchée en avant — votre main est pressée.",
      points: [
        "Inclinaison à droite et rythme soutenu suggèrent l'élan — vous écrivez pour suivre vos pensées.",
        "Une pression ferme se lit comme énergie et engagement.",
        "Vos notes rapides ont du caractère ; les rendre lisibles est le dernier kilomètre.",
      ],
      growth: "Ralentissez pour une feuille par semaine — les lignes-rythmes entraînent une vitesse qui reste lisible.",
    },
  },
  questions: [
    {
      id: "slant",
      dimension: "social",
      text: "hello",
      prompt: "Quel \u00ab hello \u00bb ressemble le plus au vôtre ?",
      options: [
        { score: 2, style: { font: "print", slant: 10 }, label: "Penché à droite" },
        { score: 1, style: { font: "neat", slant: 0 }, label: "Plutôt droit" },
        { score: 0, style: { font: "print", slant: -7 }, label: "Penché à gauche" },
      ],
    },
    {
      id: "y-tail",
      dimension: "social",
      text: "happy",
      prompt: "Comment terminez-vous une lettre comme y ?",
      options: [
        { score: 2, style: { font: "everyday" }, label: "Une boucle sous la ligne" },
        { score: 1, style: { font: "caveat" }, label: "Un petit crochet" },
        { score: 0, style: { font: "print" }, label: "Un trait droit, c'est tout" },
      ],
    },
    {
      id: "roundness",
      dimension: "social",
      text: "am",
      prompt: "Quelle paire ressemble à vos lettres de tous les jours ?",
      options: [
        { score: 2, style: { font: "everyday" }, label: "Rondes et ouvertes" },
        { score: 1, style: { font: "neat" }, label: "Entre les deux" },
        { score: 0, style: { font: "caveat" }, label: "Anguleuses et vives" },
      ],
    },
    {
      id: "size",
      dimension: "expressive",
      text: "g",
      prompt: "Vos minuscules, c'est plutôt quelle taille ?",
      options: [
        { score: 0, style: { font: "print", size: 0.8 }, label: "Petites — bien compactes" },
        { score: 1, style: { font: "neat", size: 1.1 }, label: "Moyennes" },
        { score: 2, style: { font: "print", size: 1.5 }, label: "Grandes — elles remplissent la ligne" },
      ],
    },
    {
      id: "capitals",
      dimension: "expressive",
      text: "M",
      prompt: "Choisissez la majuscule la plus proche de la vôtre.",
      options: [
        { score: 0, style: { font: "print" }, label: "Simple et sobre" },
        { score: 1, style: { font: "neat" }, label: "Une petite fantaisie" },
        { score: 2, style: { font: "fancy" }, label: "De grandes boucles" },
      ],
    },
    {
      id: "word-gap",
      dimension: "space",
      text: "the cat",
      prompt: "Quel espace laissez-vous entre les mots ?",
      options: [
        { score: 0, style: { font: "neat", word: 0.05 }, label: "Ils se touchent presque" },
        { score: 1, style: { font: "neat", word: 0.4 }, label: "Un espace normal" },
        { score: 2, style: { font: "neat", word: 0.9 }, label: "De grands espaces" },
      ],
    },
    {
      id: "letter-gap",
      dimension: "space",
      text: "hand",
      prompt: "Et entre les lettres à l'intérieur d'un mot ?",
      options: [
        { score: 0, style: { font: "print", spacing: -0.03 }, label: "Serrées" },
        { score: 1, style: { font: "print", spacing: 0.03 }, label: "Confortable" },
        { score: 2, style: { font: "print", spacing: 0.16 }, label: "Bien aérées" },
      ],
    },
    {
      id: "baseline",
      dimension: "focus",
      text: "sunny day",
      prompt: "Quand vous écrivez une ligne entière, elle fait quoi ?",
      options: [
        { score: 0, style: { font: "messy", rotate: 6 }, label: "Elle monte et descend" },
        { score: 1, style: { font: "messy", rotate: 2 }, label: "Elle vagabonde un peu" },
        { score: 2, style: { font: "print", rotate: 0 }, label: "Elle reste droite" },
      ],
    },
    {
      id: "tidiness",
      dimension: "focus",
      text: "paper",
      prompt: "Quel mot ressemble à votre écriture quotidienne la plus soignée ?",
      options: [
        { score: 0, style: { font: "messy" }, label: "Libre" },
        { score: 1, style: { font: "print" }, label: "Décontractée mais nette" },
        { score: 2, style: { font: "neat" }, label: "Soigneusement propre" },
      ],
    },
    {
      id: "i-dots",
      dimension: "focus",
      prompt: "Où atterrissent les points de vos i ?",
      options: [
        { score: 2, label: "Juste au-dessus du trait" },
        { score: 1, label: "Un peu à côté, ou en apesanteur" },
        { score: 0, label: "Là où ils tombent" },
      ],
    },
    {
      id: "pressure",
      dimension: "pace",
      text: "hello",
      prompt: "À quel point appuyez-vous en écrivant ?",
      options: [
        { score: 0, style: { font: "caveat", ink: "light" }, label: "Léger — comme au crayon" },
        { score: 1, style: { font: "neat", ink: "normal" }, label: "Modéré" },
        { score: 2, style: { font: "print", ink: "heavy" }, label: "Appuyé — ça se voit au dos" },
      ],
    },
    {
      id: "pace",
      dimension: "pace",
      prompt: "Comment écrivez-vous d'habitude ?",
      options: [
        { score: 0, label: "Lentement, calmement" },
        { score: 1, label: "Ça dépend des jours" },
        { score: 2, label: "Vite — ma main file devant" },
      ],
    },
  ],
};

const pt: QuizLocaleContent = {
  title: "Quiz de personalidade pela sua letra",
  intro:
    "12 perguntas rápidas sobre como você escreve — sem enviar fotos e sem guardar nada. No fim você recebe um perfil de escrita só por diversão, mais dicas para treinar os hábitos por trás das suas letras.",
  start: "Começar o quiz",
  back: "Voltar",
  retake: "Refazer o quiz",
  progress: "Pergunta {n} de {total}",
  download: "Baixar meu resultado",
  resultHeading: "Seu perfil de escrita",
  dimsHeading: "O que suas respostas sugerem",
  practiceHeading: "Quer praticar?",
  growthLabel: "Ponto de evolução",
  faqTitle: "Perguntas frequentes",
  articleLink: "Leia também: o que a sua letra diz sobre você? O guia honesto",
  scienceTitle: "Análise de letra funciona mesmo?",
  scienceText: [
    "A grafologia — ler personalidade na letra — foi testada muitas vezes e não se sustenta. Uma meta-análise de 1989 (Neter e Ben-Shakhar) mostrou que os julgamentos dos grafólogos não superavam o acaso, e a psicologia hoje a classifica como pseudociência. Nenhum quiz, incluindo este, consegue ler sua personalidade no formato das letras.",
    "O que a letra reflete de verdade são hábitos: quando você aprendeu, com que frequência escreve, quanta pressa está. Hábitos se treinam — se o perfil destacar um estilo que você quer mudar, as ferramentas de prática abaixo podem ajudar.",
  ],
  disclaimer:
    "Só para diversão — este quiz é entretenimento, não uma avaliação científica ou psicológica. Nada do que você escolhe é enviado ou armazenado.",
  dimensions: {
    social: {
      label: "Energia social",
      levels: { low: "Reservada", mid: "Adaptável", high: "Expressiva" },
      practice: {
        text: "Quer um traço mais fluido e conectado? O gerador de letra cursiva é um começo suave.",
        href: "/cursive",
      },
    },
    expressive: {
      label: "Expressividade",
      levels: { low: "Contida", mid: "Equilibrada", high: "Ousada" },
      practice: {
        text: "Tamanho uniforme vem de linhas com ritmo — o gerador de caligrafia as imprime com qualquer palavra.",
        href: "/name-tracing",
      },
    },
    space: {
      label: "Espaço pessoal",
      levels: { low: "Junto", mid: "Flexível", high: "Arejada" },
      practice: {
        text: "O ritmo dos espaços melhora com repetição — monte uma folha com a sua lista de palavras.",
        href: "/word-work",
      },
    },
    focus: {
      label: "Foco e estrutura",
      levels: { low: "Espontânea", mid: "Estável", high: "Precisa" },
      practice: {
        text: "Linha de base reta fica mais fácil no papel de três linhas — imprima uma folha grátis e teste um parágrafo.",
        href: "/printable-paper",
      },
    },
    pace: {
      label: "Pressão e ritmo",
      levels: { low: "Leve e tranquila", mid: "Moderada", high: "Firme e rápida" },
      practice: {
        text: "Linhas para calcar criam um ritmo calmo e uniforme — gere folhas com qualquer lista de palavras.",
        href: "/cursive-worksheets",
      },
    },
  },
  profiles: {
    balanced: {
      name: "O Equilibrado",
      emoji: "⚖️",
      tagline: "Nenhum traço manda sozinho — sua mão se adapta ao momento.",
      points: [
        "Um estilo flexível sugere que você ajusta a letra à situação — recados rápidos e cartões caprichados.",
        "Grafólogos chamariam de equilíbrio; nós chamamos de repertório.",
        "Você tem uma base sólida para construir qualquer estilo.",
      ],
      growth: "Escolha uma dimensão para refinar — quem é equilibrado evolui mais rápido com um foco só.",
    },
    bold: {
      name: "O Expressivo Ousado",
      emoji: "🌟",
      tagline: "Letras grandes, formas abertas — sua letra chega antes de você.",
      points: [
        "Letras grandes e redondas são lidas como calor e confiança — por diversão, ao menos.",
        "Você está à vontade ocupando espaço na página.",
        "Cartões e cartazes são o seu formato natural.",
      ],
      growth: "Até letra ousada ganha com espaços regulares — fixe um ritmo para o tamanho nunca custar legibilidade.",
    },
    planner: {
      name: "O Planejador Preciso",
      emoji: "📐",
      tagline: "Vertical, arrumada, exata — sua mão gosta de ordem.",
      points: [
        "Tamanho constante e linhas retas sugerem paciência e olho no detalhe.",
        "Seus cadernos são os que todo mundo pede emprestado.",
        "Letra nítida é habilidade motora treinada — e a sua claramente tem milhagem.",
      ],
      growth: "Precisão pode virar rigidez — experimente uma cursiva mais solta para ganhar velocidade sem perder a estrutura.",
    },
    spirit: {
      name: "O Espírito Livre",
      emoji: "🦋",
      tagline: "Suas letras passeiam — e esse é o charme delas.",
      points: [
        "Uma linha de base que sobe e desce e formas abertas sugerem que você pensa enquanto escreve.",
        "Estrutura não é o seu padrão — ótimo para diários e brainstorming.",
        "Legibilidade é o único pedágio dos espíritos livres.",
      ],
      growth: "Um hábito resolve quase tudo: escrever sobre uma linha reta. O papel de três linhas vigia por você.",
    },
    steady: {
      name: "O Sereno Constante",
      emoji: "🌊",
      tagline: "Vertical, uniforme, sem pressa — sua letra mantém a calma.",
      points: [
        "Inclinação neutra e pressão moderada são lidas como calma e confiabilidade.",
        "Sua mão não tem pressa — e suas decisões, aparentemente, também não.",
        "Um estilo reservado que mantém as letras abertas.",
      ],
      growth: "Se a velocidade um dia importar, as ligações da cursiva acrescentam ritmo sem mudar seu visual arrumado.",
    },
    spark: {
      name: "A Faísca Acelerada",
      emoji: "⚡",
      tagline: "Rápida, firme, inclinada para frente — sua mão tem pressa.",
      points: [
        "Inclinação à direita e ritmo cadenciado sugerem ímpeto — você escreve para acompanhar o pensamento.",
        "Pressão firme é lida como energia e engajamento.",
        "Seus recados rápidos têm personalidade; deixá-los legíveis é a última milha.",
      ],
      growth: "Desacelere para uma folha por semana — linhas com ritmo treinam velocidade que continua legível.",
    },
  },
  questions: [
    {
      id: "slant",
      dimension: "social",
      text: "hello",
      prompt: "Qual \u201chello\u201d mais parece o seu?",
      options: [
        { score: 2, style: { font: "print", slant: 10 }, label: "Inclinado para a direita" },
        { score: 1, style: { font: "neat", slant: 0 }, label: "Quase na vertical" },
        { score: 0, style: { font: "print", slant: -7 }, label: "Inclinado para a esquerda" },
      ],
    },
    {
      id: "y-tail",
      dimension: "social",
      text: "happy",
      prompt: "Como você termina uma letra como o y?",
      options: [
        { score: 2, style: { font: "everyday" }, label: "Com uma laçada abaixo da linha" },
        { score: 1, style: { font: "caveat" }, label: "Um gancho curto" },
        { score: 0, style: { font: "print" }, label: "Paro num traço reto" },
      ],
    },
    {
      id: "roundness",
      dimension: "social",
      text: "am",
      prompt: "Qual par se parece com as suas letras do dia a dia?",
      options: [
        { score: 2, style: { font: "everyday" }, label: "Redondas e abertas" },
        { score: 1, style: { font: "neat" }, label: "Algum ponto no meio" },
        { score: 0, style: { font: "caveat" }, label: "Pontudas e angulosas" },
      ],
    },
    {
      id: "size",
      dimension: "expressive",
      text: "g",
      prompt: "De que tamanho você escreve as minúsculas?",
      options: [
        { score: 0, style: { font: "print", size: 0.8 }, label: "Pequenas — bem compactas" },
        { score: 1, style: { font: "neat", size: 1.1 }, label: "Médias" },
        { score: 2, style: { font: "print", size: 1.5 }, label: "Grandes — preenchem a linha" },
      ],
    },
    {
      id: "capitals",
      dimension: "expressive",
      text: "M",
      prompt: "Escolha a maiúscula mais parecida com a sua.",
      options: [
        { score: 0, style: { font: "print" }, label: "Simples e direta" },
        { score: 1, style: { font: "neat" }, label: "Um toque de estilo" },
        { score: 2, style: { font: "fancy" }, label: "Grandes floreios" },
      ],
    },
    {
      id: "word-gap",
      dimension: "space",
      text: "the cat",
      prompt: "Quanto espaço você deixa entre palavras?",
      options: [
        { score: 0, style: { font: "neat", word: 0.05 }, label: "Quase se encostam" },
        { score: 1, style: { font: "neat", word: 0.4 }, label: "Um espaço normal" },
        { score: 2, style: { font: "neat", word: 0.9 }, label: "Espaços largos" },
      ],
    },
    {
      id: "letter-gap",
      dimension: "space",
      text: "hand",
      prompt: "E entre as letras dentro de uma palavra?",
      options: [
        { score: 0, style: { font: "print", spacing: -0.03 }, label: "Bem juntas" },
        { score: 1, style: { font: "print", spacing: 0.03 }, label: "Confortável" },
        { score: 2, style: { font: "print", spacing: 0.16 }, label: "Bem espaçadas" },
      ],
    },
    {
      id: "baseline",
      dimension: "focus",
      text: "sunny day",
      prompt: "Quando você escreve uma linha inteira, para onde ela vai?",
      options: [
        { score: 0, style: { font: "messy", rotate: 6 }, label: "Sobe e desce" },
        { score: 1, style: { font: "messy", rotate: 2 }, label: "Vagueia um pouquinho" },
        { score: 2, style: { font: "print", rotate: 0 }, label: "Fica reta" },
      ],
    },
    {
      id: "tidiness",
      dimension: "focus",
      text: "paper",
      prompt: "Qual palavra lembra a sua letra diária mais caprichada?",
      options: [
        { score: 0, style: { font: "messy" }, label: "Do jeito que vier" },
        { score: 1, style: { font: "print" }, label: "Descontraída mas arrumada" },
        { score: 2, style: { font: "neat" }, label: "Cuidadosamente limpa" },
      ],
    },
    {
      id: "i-dots",
      dimension: "focus",
      prompt: "Onde caem os pontos dos seus i's?",
      options: [
        { score: 2, label: "Exatamente sobre o haste" },
        { score: 1, label: "Um pouco fora, ou flutuando alto" },
        { score: 0, label: "Onde caírem" },
      ],
    },
    {
      id: "pressure",
      dimension: "pace",
      text: "hello",
      prompt: "Com quanta força você aperta ao escrever?",
      options: [
        { score: 0, style: { font: "caveat", ink: "light" }, label: "Leve — macio como lápis" },
        { score: 1, style: { font: "neat", ink: "normal" }, label: "Moderada" },
        { score: 2, style: { font: "print", ink: "heavy" }, label: "Firme — marca até o verso" },
      ],
    },
    {
      id: "pace",
      dimension: "pace",
      prompt: "Como você costuma escrever?",
      options: [
        { score: 0, label: "Devagar, com calma" },
        { score: 1, label: "Depende do dia" },
        { score: 2, label: "Rápido — a mão dispara na frente" },
      ],
    },
  ],
};

export const QUIZ_CONTENT: Record<Locale, QuizLocaleContent> = { en, zh, ja, ko, es, de, fr, pt };
