import type { AuthorId } from "@/content/authors";
import type { Locale } from "@/i18n/routing";

export interface Post {
  slug: string;
  /** 写作角色(笔名署名,必填):决定全文语气与选题边界,角色卡见 docs/personas/ */
  author: AuthorId;
  date: string; // 首发
  updated: string; // 最后更新(EEAT:展示维护状态)
  image?: string; // 题图(public/blog);缺省时列表卡片用标题占位
  i18n: Partial<Record<Locale, { title: string; description: string }>>;
}


export function getPostMeta(slug: string, locale: Locale) {
  const post = POSTS.find((p) => p.slug === slug);
  return post ? (post.i18n[locale] ?? post.i18n.en) : undefined;
}

/** 博客索引:新增文章在 src/content/blog/<slug>.<locale>.mdx 建文件并注册到 registry 后,在此登记。
 *  author 必填:先按选题选角色(docs/personas/),再按该角色卡的文风写作。 */
export const POSTS: Post[] = [
  {
    slug: "what-does-your-handwriting-say-about-you",
    author: "mara-voss",
    date: "2026-10-08",
    updated: "2026-10-27",
    image: "/blog/adult-practice.webp",
    i18n: { en: {
        title: "What does your handwriting say about you? The honest guide",
        description:
          "The five features people read in handwriting — slant, size, spacing, baseline, pressure — what science actually says, and how to change the habits you don't like.",
      } },
  },
  {
    slug: "handwritten-card-with-voice",
    author: "june-park",
    date: "2026-10-06",
    updated: "2026-10-13",
    image: "/blog/template-love.webp",
    i18n: { en: {
        title: "Write a greeting card with your voice in 3 minutes",
        description:
          "No calligraphy skills needed. Speak your wishes on a web page, pick a font and paper, export and print — with ready-to-use card copy ideas.",
      } },
  },
  {
    slug: "handwriting-image-generator",
    author: "theo-lindgren",
    date: "2026-10-06",
    updated: "2026-10-07",
    image: "/blog/workspace.webp",
    i18n: { en: {
        title: "Handwriting image generator tutorial: speak, don't type",
        description:
          "Why voice input beats typing for handwriting images, plus tuning tips for realism, paper and ink settings.",
      } },
  },
  {
    slug: "xiaohongshu-handwritten-images",
    author: "theo-lindgren",
    date: "2026-10-06",
    updated: "2026-10-07",
    image: "/blog/templates.webp",
    i18n: { en: {
        title: "Handwritten quote cards for social media, done in a browser",
        description:
          "Handwritten quote images get high engagement on social platforms. Batch-produce them with voice input, with cover and layout tips.",
      } },
  },
  {
    slug: "audio-to-handwriting",
    author: "theo-lindgren",
    date: "2026-10-07",
    updated: "2026-10-07",
    i18n: { en: {
        title: "Transcribe recordings into handwritten notes, free and local",
        description:
          "Upload an audio file and transcribe it with in-browser Whisper, then export as handwriting. Zero cost, audio never uploaded — with real test results and honest limitations.",
      } },
  },
  {
    slug: "handwriting-templates-guide",
    author: "theo-lindgren",
    date: "2026-10-07",
    updated: "2026-10-07",
    image: "/blog/templates.webp",
    i18n: { en: {
        title: "Handwriting template library: six scenarios, pick one and write",
        description:
          "Love letters, apologies, thank-you notes, birthdays, Teachers' Day, New Year — copy and handwriting style in one tap, ready to export.",
      } },
  },
];

/** 面向美国用户的长尾词文章:正文已有全部 8 种语言 */
const US_POSTS: Post[] = [
  {
    slug: "name-tracing-generator",
    author: "clara-hartley",
    date: "2026-10-07",
    updated: "2026-10-07",
    image: "/blog/tracing-worksheet.webp",
    i18n: {
      en: {
        title: "Free name tracing generator: editable worksheets to print",
        description:
          "Type any name, print a personalized tracing worksheet in seconds — example row, light-gray tracing, three-line guides, free PDF. No signup.",
      },
    },
  },
  {
    slug: "free-printable-lined-paper",
    author: "wes-morales",
    date: "2026-10-07",
    updated: "2026-10-13",
    image: "/blog/lined-paper.webp",
    i18n: {
      en: {
        title: "Free printable lined paper: college, wide, graph & 3-line",
        description:
          "Print college-ruled, wide-ruled, graph and three-line handwriting paper on Letter or A4 — choose line color and spacing, download a crisp free PDF.",
      },
    },
  },
  {
    slug: "cursive-practice-worksheets",
    author: "wes-morales",
    date: "2026-10-07",
    updated: "2026-10-07",
    image: "/blog/cursive-workspace.webp",
    i18n: {
      en: {
        title: "Custom cursive practice worksheets, free and printable",
        description:
          "Generate cursive practice sheets from any name or sentence with real cursive fonts, three-line guides and free PDF downloads.",
      },
    },
  },
  {
    slug: "kindergarten-handwriting-paper",
    author: "clara-hartley",
    date: "2026-10-07",
    updated: "2026-10-13",
    image: "/blog/handwriting-paper.webp",
    i18n: {
      en: {
        title: "Kindergarten handwriting paper: the three lines, explained",
        description:
          "What the top, dashed and bottom lines teach, tall/small/tail letter families, and free printable three-line handwriting paper for kindergarten.",
      },
    },
  },
  {
    slug: "letter-to-santa-template",
    author: "june-park",
    date: "2026-10-07",
    updated: "2026-10-07",
    image: "/blog/santa-letter.webp",
    i18n: {
      en: {
        title: "Free printable letter to Santa template (kids can write it)",
        description:
          "A print-ready letter to Santa template: speak or type the words, print in a friendly handwriting font, add a traced signature. Free PDF.",
      },
    },
  },
  {
    slug: "handwritten-thank-you-notes",
    author: "june-park",
    date: "2026-10-07",
    updated: "2026-10-07",
    image: "/blog/thank-you-note.webp",
    i18n: {
      en: {
        title: "How to write a thank you note people keep (with examples)",
        description:
          "The four-part thank you note formula with copy-ready examples for weddings, interviews and teachers — plus options if your handwriting is bad.",
      },
    },
  },
  {
    slug: "diy-wedding-calligraphy",
    author: "june-park",
    date: "2026-10-07",
    updated: "2026-10-07",
    image: "/blog/wedding-script.webp",
    i18n: {
      en: {
        title: "DIY wedding calligraphy: place cards & signs without a pro",
        description:
          "Calligraphy-style place cards, menus, signs and vow keepsakes from your own printer — script fonts, cardstock tips and the window-tracing trick.",
      },
    },
  },
  {
    slug: "pen-pal-letters-for-kids",
    author: "clara-hartley",
    date: "2026-10-07",
    updated: "2026-10-07",
    image: "/blog/pen-pal-letter.webp",
    i18n: {
      en: {
        title: "Pen pal letters for kids: friendly letter format & prompts",
        description:
          "The five parts of a friendly letter, prompt ideas that get replies, and free printable pen pal paper matched to your child's handwriting.",
      },
    },
  },
  {
    slug: "how-to-improve-handwriting-adults",
    author: "wes-morales",
    date: "2026-10-07",
    updated: "2026-10-12",
    image: "/blog/adult-practice.webp",
    i18n: {
      en: {
        title: "How to improve your handwriting as an adult: 4-week plan",
        description:
          "Diagnose size, spacing, slant and baseline, then drill with a 15-minute daily plan — free custom practice sheets from your own sentences.",
      },
    },
  },
  {
    slug: "handwriting-practice-struggling-writers",
    author: "clara-hartley",
    date: "2026-10-07",
    updated: "2026-10-07",
    image: "/blog/tracing-worksheet.webp",
    i18n: {
      en: {
        title: "Handwriting for struggling writers (dysgraphia-friendly)",
        description:
          "Low-pressure handwriting adjustments for kids who fight the pencil: taller bands, light-gray tracing, short sessions and voice input.",
      },
    },
  },
];

POSTS.push(...US_POSTS);

/** /cursive 落地页配套的 cursive 词簇长尾文章,正文已有全部 8 种语言,按 E-E-A-T 结构撰写 */
const CURSIVE_POSTS: Post[] = [
  {
    slug: "how-to-write-in-cursive",
    author: "wes-morales",
    date: "2026-10-07",
    updated: "2026-10-07",
    image: "/blog/cursive-workspace.webp",
    i18n: {
      en: {
        title: "How to write in cursive: a beginner's guide that works",
        description:
          "Learn cursive from scratch: the four strokes, letter families, connection rules and a 30-day plan — with free printable practice sheets.",
      },
    },
  },
  {
    slug: "cursive-alphabet-chart",
    author: "wes-morales",
    date: "2026-10-07",
    updated: "2026-11-02",
    image: "/blog/cursive-alphabet.webp",
    i18n: {
      en: {
        title: "The cursive alphabet, organized the way you'll learn it",
        description:
          "Every cursive letter grouped into stroke families — lowercase and capitals, the five letters that cause most mistakes, plus a free printable chart.",
      },
    },
  },
  {
    slug: "cursive-name-signature",
    author: "wes-morales",
    date: "2026-10-07",
    updated: "2026-10-10",
    image: "/blog/cursive-signature.webp",
    i18n: {
      en: {
        title: "How to write your name in cursive (and build a signature)",
        description:
          "Two-stage method: write your name in legible cursive with printable tracing sheets, then design a signature you can actually reproduce.",
      },
    },
  },
  {
    slug: "is-cursive-still-taught",
    author: "mara-voss",
    date: "2026-10-07",
    updated: "2026-10-07",
    image: "/blog/cursive-workspace.webp",
    i18n: {
      en: {
        title: "Is cursive still taught in schools? The state of cursive",
        description:
          "Cursive left Common Core in 2010 and has been coming back since 2016 — which states require it now, what research says, and what to do about it.",
      },
    },
  },
  {
    slug: "cursive-vs-print",
    author: "mara-voss",
    date: "2026-10-07",
    updated: "2026-10-07",
    image: "/blog/cursive-workspace.webp",
    i18n: {
      en: {
        title: "Cursive vs print: which handwriting style should you learn?",
        description:
          "Speed, legibility, learning curve and what studies actually show — an honest comparison of cursive and print handwriting.",
      },
    },
  },
  {
    slug: "how-to-teach-cursive-kids",
    author: "clara-hartley",
    date: "2026-10-07",
    updated: "2026-10-13",
    image: "/blog/tracing-cursive.webp",
    i18n: {
      en: {
        title: "How to teach cursive writing to kids at home (10 min)",
        description:
          "Readiness signs, letter-family teaching order, and 10-minute lessons with free printable cursive practice sheets for every step.",
      },
    },
  },
  {
    slug: "handwriting-vs-typing-brain",
    author: "mara-voss",
    date: "2026-10-08",
    updated: "2026-10-08",
    image: "/blog/handwriting-vs-typing-brain.webp",
    i18n: {
      en: {
        title: "Handwriting vs typing: what the brain research actually says",
        description:
          "EEG studies, the Mueller & Oppenheimer note-taking debate, and what research does — and doesn't — say about handwriting and cognitive decline.",
      },
    },
  },
  {
    slug: "how-to-improve-your-handwriting",
    author: "wes-morales",
    date: "2026-10-08",
    updated: "2026-10-08",
    image: "/blog/improve-your-handwriting.webp",
    i18n: {
      en: {
        title: "How to improve your handwriting: the complete guide",
        description:
          "Diagnose the four levers (size, spacing, baseline, slant), run a 15-minute daily routine, pick a model style — with free printable practice tools.",
      },
    },
  },
  {
    slug: "sight-word-tracing-worksheets",
    author: "clara-hartley",
    date: "2026-10-08",
    updated: "2026-10-08",
    i18n: {
      en: {
        title: "Sight word tracing worksheets you can print before homework",
        description:
          "A kindergarten sight word tracing sheet with exact generator settings: eight starter words, row size by age, and the same page for this week's spelling list.",
      },
    },
  },
  {
    slug: "how-many-sheets-handwriting",
    author: "theo-lindgren",
    date: "2026-10-08",
    updated: "2026-10-08",
    i18n: {
      en: {
        title: "How many sheets does handwritten text take?",
        description:
          "500 words on college-ruled US Letter takes 3 sheets — about 220 words a side. The calculator settings, then what changes when you paste the real text.",
      },
    },
  },
  {
    slug: "handwriting-workbook",
    author: "wes-morales",
    date: "2026-10-08",
    updated: "2026-10-08",
    i18n: {
      en: {
        title: "A handwriting workbook built from words you actually write",
        description:
          "A two-week adult handwriting workbook: fifteen lines, the exact generator settings, and a 15-minute daily drill. Print it, then make the next one.",
      },
    },
  },
  {
    slug: "cursive-sentences-to-practice",
    author: "clara-hartley",
    date: "2026-10-09",
    updated: "2026-10-09",
    i18n: {
      en: {
        title: "Cursive sentences to practice: free printable pages",
        description:
          "Free cursive sentence worksheets by grade: ten starter sentences built on the o-b-v-w joins, plus the exact tracing and copy-page generator settings. Trace first, then copy.",
      },
    },
  },
  {
    slug: "copywork-generator",
    author: "clara-hartley",
    date: "2026-10-09",
    updated: "2026-10-09",
    i18n: {
      en: {
        title: "A free copywork generator for your homeschool",
        description:
          "Build free printable copywork pages in five minutes: page anatomy by age (5–6 tracing to 12+ paragraphs), the exact generator settings, and a week of starter passages.",
      },
    },
  },
  {
    slug: "cursive-text-generator",
    author: "theo-lindgren",
    date: "2026-10-09",
    updated: "2026-10-09",
    i18n: {
      en: {
        title: "Cursive text generator: cursive you can copy and paste",
        description:
          "Type or speak your words and copy them back as cursive text — the six Unicode styles, which one works where, and why it is not a font.",
      },
    },
  },
  {
    slug: "name-tracing-with-lines",
    author: "clara-hartley",
    date: "2026-10-09",
    updated: "2026-10-09",
    image: "/blog/name-tracing-lines.webp",
    i18n: {
      en: {
        title: "Name tracing with lines: free three-line worksheets to print",
        description:
          "Why the three lines are the lesson, which row height fits which age, and how to print a personalized name tracing worksheet with lines — free PDF.",
      },
    },
  },
  {
    slug: "calligraphy-motto-cards",
    author: "theo-lindgren",
    date: "2026-10-09",
    updated: "2026-10-09",
    image: "/blog/calligraphy-motto.webp",
    i18n: {
      en: {
        title: "Calligraphy motto cards: from trending phrase to card",
        description:
          "Turn 'motto of a calligraphy enthusiast' into a real card: Dancing Script, blue-black ink, blank paper — tested settings, motto copy and export sizes.",
      },
    },
  },
  {
    slug: "cursive-laws-by-state",
    author: "clara-hartley",
    date: "2026-10-09",
    updated: "2026-10-09",
    i18n: {
      en: {
        title: "Cursive laws by state (2026): where US schools must teach it",
        description:
          "An updated state-by-state table of cursive handwriting laws — bill numbers, grade levels, effective dates, and what to do if your state just added it.",
      },
    },
  },
  {
    slug: "best-cursive-fonts",
    author: "theo-lindgren",
    date: "2026-10-09",
    updated: "2026-10-09",
    image: "/blog/best-cursive-fonts.webp",
    i18n: {
      en: {
        title: "Best free cursive fonts: 13 open-source picks reviewed",
        description:
          "Thirteen free cursive fonts, including signature scripts, compared by job — preview them with your text and export PNG, SVG or PDF, no install.",
      },
    },
  },
  {
    slug: "tracing-numbers-by-age",
    author: "clara-hartley",
    date: "2026-10-10",
    updated: "2026-10-10",
    image: "/blog/tracing-numbers-by-age.webp",
    i18n: {
      en: {
        title: "How to teach number tracing by age, one number a night",
        description:
          "How to teach number tracing by age: ages 3 to 4 stay on lines, ages 5 to 6 trace one numeral a night, and age 7 copies with the model covered. Use the table.",
      },
    },
  },
  {
    slug: "spelling-list-word-work",
    author: "clara-hartley",
    date: "2026-10-10",
    updated: "2026-10-10",
    i18n: {
      en: {
        title: "How to do word work with this week's spelling list",
        description:
          "How to do word work from four spelling words: write each three times, then fill the missing letter. What fits on Letter, and why the Dolch list does not.",
      },
    },
  },
  {
    slug: "color-a-name-before-tracing",
    author: "clara-hartley",
    date: "2026-10-10",
    updated: "2026-10-10",
    i18n: {
      en: {
        title: "Color a name before tracing letters at ages 3 to 6",
        description:
          "Color a name before tracing the letters: one name, a thick outline, stars or none. Ages 3 to 4 use a crayon. Ages 5 to 6 trace the same name the next night.",
      },
    },
  },
  {
    slug: "one-character-in-the-grid",
    author: "clara-hartley",
    date: "2026-10-10",
    updated: "2026-10-10",
    i18n: {
      en: {
        title: "Practice one character in the grid, one row a night",
        description:
          "Practice one character in the grid: one character, keep the cross, stop after the dark row. A4, three scripts, and why a sentence fills the squares wrong.",
      },
    },
  },
  {
    slug: "print-handwritten-letters-and-envelopes",
    author: "theo-lindgren",
    date: "2026-10-09",
    updated: "2026-10-09",
    image: "/blog/print-handwritten-letters.webp",
    i18n: {
      en: {
        title: "Print a handwritten letter and envelope for three people",
        description:
          "A three-person thank-you list, Patrick Hand, US Letter notes and #10 envelopes. Free, no signup — the settings, the pages, and what the two PDFs actually contain.",
      },
    },
  },
  {
    slug: "practice-one-handwriting-problem",
    author: "wes-morales",
    date: "2026-10-12",
    updated: "2026-10-12",
    i18n: {
      en: {
        title: "How to fix one handwriting problem",
        description:
          "How to fix one handwriting problem: size, slant, spacing, or print. One sentence, three blank lines, then stop. The model is a font, not a score.",
      },
    },
  },
  {
    slug: "handwriting-worksheets",
    author: "clara-hartley",
    date: "2026-10-14",
    updated: "2026-10-14",
    image: "/blog/handwriting-worksheets.webp",
    i18n: { en: {
        title: "How to make handwriting worksheets for a whole week, tonight",
        description:
          "How to make handwriting worksheets in one sitting: what to type by age, five lists for five school days, and what the sheets will not do. Free generator, no signup.",
      } },
  },
  {
    slug: "numbers-in-cursive",
    author: "clara-hartley",
    date: "2026-10-14",
    updated: "2026-10-14",
    image: "/blog/numbers-in-cursive.webp",
    i18n: { en: {
        title: "Numbers in cursive: what 1 to 10 look like and how to practice them",
        description:
          "Numbers in cursive: numerals stand alone instead of joining, the loops show up in 2, 6, and 8, and the practice page prints with one number per row. Free, no signup.",
      } },
  },
  {
    slug: "graphisme-maternelle",
    author: "clara-hartley",
    date: "2026-10-14",
    updated: "2026-10-14",
    image: "/blog/graphisme-maternelle.webp",
    i18n: {
      en: {
        title: "Graphisme: pre-writing patterns in French maternelle",
        description:
          "How French maternelle builds writing through graphisme: the strokes to train in PS, MS, and GS, the five pattern families, and free printable pre-writing sheets.",
      },
    },
  },
  {
    slug: "quiet-voice-before-handwriting",
    author: "theo-lindgren",
    date: "2026-10-16",
    updated: "2026-10-16",
    image: "/blog/quiet-voice-before-handwriting.webp",
    i18n: {
      en: {
        title: "Fix a quiet voice memo before you turn it into handwriting",
        description:
          "High-pass the rumble, peak-normalize, then boost with a limiter. Then import the file and export a handwritten page. Free, no signup.",
      },
    },
  },
  {
    slug: "handwriting-personality-test",
    author: "theo-lindgren",
    date: "2026-10-20",
    updated: "2026-10-27",
    image: "/blog/handwriting-personality-test.webp",
    i18n: {
      en: {
        title: "Handwriting personality test: pick the shapes you write",
        description:
          "A free handwriting personality test with no upload. Eight shape answers, a fictional label, and one drill to bring back to a practice sheet.",
      },
    },
  },
  {
    slug: "bubble-letters-for-a-display-name",
    author: "theo-lindgren",
    date: "2026-10-26",
    updated: "2026-10-26",
    image: "/blog/bubble-letters-peach2.webp",
    i18n: {
      en: {
        title: "Bubble letters for a short display name",
        description:
          "Type a short name and copy bubble letters for a display name: one heart, bow, or flower. Use a handwriting font when the name has to be a picture.",
      },
    },
  },
  {
    slug: "november-in-cursive",
    author: "wes-morales",
    date: "2026-11-02",
    updated: "2026-11-02",
    image: "/blog/november-cursive.webp",
    i18n: {
      en: {
        title: "November in cursive: the month plus all 12 months",
        description:
          "The capital N rule, the m-b crowd spot and every junction in the word — plus all twelve months ranked by difficulty, with a free printable practice sheet.",
      },
    },
  },
];

POSTS.push(...CURSIVE_POSTS);

// de/fr/pt 等后补语言在此合并
