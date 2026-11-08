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

export const QUIZ_CONTENT: Record<Locale, QuizLocaleContent> = { en };
