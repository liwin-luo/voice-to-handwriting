import { mergeI18n, EXTRA_POST_I18N } from "@/content/extra-locales";
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
    updated: "2026-10-08",
    image: "/blog/adult-practice.png",
    i18n: {
      en: {
        title: "What does your handwriting say about you? The honest guide",
        description:
          "The five features people read in handwriting — slant, size, spacing, baseline, pressure — what science actually says, and how to change the habits you don't like.",
      },
      zh: {
        title: "你的字迹说明了什么?诚实版解读指南",
        description:
          "人们从字迹里读的五个特征——倾斜、字号、间距、基线、笔压,科学到底怎么说,以及如何改掉你不喜欢的书写习惯。附 2 分钟笔迹性格小测验。",
      },
      ja: {
        title: "あなたの字は何を語る?正直な筆跡ガイド",
        description:
          "筆跡で読まれる 5 つの特徴——傾き・サイズ・間隔・ベースライン・筆圧。科学が実際に支持することと、気に入らない習慣の直し方。2 分の筆跡クイズ付き。",
      },
      ko: {
        title: "당신의 글씨는 무엇을 말할까? 솔직한 필적 가이드",
        description:
          "글씨에서 읽는 다섯 가지 특징 — 기울기, 크기, 간격, 베이스라인, 필압. 과학이 실제로 말하는 것과 마음에 들지 않는 습관을 바꾸는 방법. 2분 짜리 글씨 퀴즈 포함.",
      },
      es: {
        title: "¿Qué dice tu letra sobre ti? La guía honesta",
        description:
          "Los cinco rasgos que la gente lee en la letra — inclinación, tamaño, espaciado, línea base, presión — lo que dice la ciencia y cómo cambiar los hábitos que no te gustan.",
      },
      de: {
        title: "Was verrät deine Handschrift? Der ehrliche Ratgeber",
        description:
          "Die fünf Merkmale, die in Handschrift gelesen werden — Neigung, Größe, Abstände, Grundlinie, Druck — was die Wissenschaft sagt und wie du unliebsame Gewohnheiten änderst.",
      },
      fr: {
        title: "Que dit votre écriture sur vous ? Le guide honnête",
        description:
          "Les cinq traits que l'on lit dans l'écriture — inclinaison, taille, espaces, ligne de base, pression — ce que dit la science et comment changer les habitudes qui vous déplaisent.",
      },
      pt: {
        title: "O que a sua letra diz sobre você? O guia honesto",
        description:
          "Os cinco traços que as pessoas leem na letra — inclinação, tamanho, espaçamento, linha de base, pressão — o que a ciência diz e como mudar os hábitos que você não gosta.",
      },
    },
  },
  {
    slug: "handwritten-card-with-voice",
    author: "june-park",
    date: "2026-10-06",
    updated: "2026-10-07",
    image: "/blog/template-love.png",
    i18n: {
      zh: {
        title: "用声音写贺卡:3 分钟生成一张手写贺卡",
        description:
          "不会写毛笔字也能送出手写贺卡。打开网页说一段祝福,选好字体纸张,导出打印即可,附赠文案思路。",
      },
      en: {
        title: "Write a greeting card with your voice in 3 minutes",
        description:
          "No calligraphy skills needed. Speak your wishes on a web page, pick a font and paper, export and print — with ready-to-use card copy ideas.",
      },
      ja: {
        title: "声でグリーティングカードを 3 分で作る",
        description:
          "筆文字が苦手でも大丈夫。ページに向かって祝福を話すだけで手書き風カードに。フォントと用紙を選んで書き出すだけ、文例つき。",
      },
      ko: {
        title: "음성으로 3분 만에 손글씨 카드 만들기",
        description:
          "서예를 몰라도 괜찮습니다. 웹페이지에서 축하 메시지를 말하면 손글씨 카드가 완성됩니다. 글꼴과 용지를 고르고 내보내기만 하세요.",
      },
      es: {
        title: "Crea una tarjeta escrita a mano con tu voz en 3 minutos",
        description:
          "No necesitas buena letra. Di tu mensaje en la web, elige fuente y papel, exporta e imprime — con ideas de texto incluidas.",
      },
    },
  },
  {
    slug: "handwriting-image-generator",
    author: "theo-lindgren",
    date: "2026-10-06",
    updated: "2026-10-07",
    image: "/blog/workspace.png",
    i18n: {
      zh: {
        title: "手写体图片在线生成教程:不打字,说出来就行",
        description:
          "对比打字型手写体工具,介绍语音输入生成手写体图片的方法,以及仿真度、纸张、墨色的调参技巧。",
      },
      en: {
        title: "Handwriting image generator tutorial: speak, don't type",
        description:
          "Why voice input beats typing for handwriting images, plus tuning tips for realism, paper and ink settings.",
      },
      ja: {
        title: "手書き風画像ジェネレーター:入力せずに話すだけ",
        description:
          "入力型ツールとの違い、音声入力で手書き風画像を作る方法、リアリティ・用紙・インクの調整テクニックを解説。",
      },
      ko: {
        title: "손글씨 이미지 생성기: 타이핑 대신 말하세요",
        description:
          "타이핑형 도구와의 차이, 음성 입력으로 손글씨 이미지를 만드는 방법, 리얼리즘·용지·잉크 조정 팁.",
      },
      es: {
        title: "Generador de imágenes manuscritas: habla en vez de escribir",
        description:
          "Por qué la voz gana al tecleo para imágenes manuscritas, y cómo ajustar realismo, papel y tinta.",
      },
    },
  },
  {
    slug: "xiaohongshu-handwritten-images",
    author: "theo-lindgren",
    date: "2026-10-06",
    updated: "2026-10-07",
    image: "/blog/templates.png",
    i18n: {
      zh: {
        title: "小红书手写文案配图怎么做?一个浏览器搞定",
        description:
          "手写风文案图是小红书的高互动形式。教你用声音转手写工具批量产出金句卡片,含封面与排版建议。",
      },
      en: {
        title: "Handwritten quote cards for social media, done in a browser",
        description:
          "Handwritten quote images get high engagement on social platforms. Batch-produce them with voice input, with cover and layout tips.",
      },
      ja: {
        title: "SNS でウケる手書き風カードの作り方",
        description:
          "手書き風の金言カードは SNS で高エンゲージメント。音声入力で量産する方法を、カバー・レイアウトのコツ付きで解説。",
      },
      ko: {
        title: "SNS 손글씨 문구 카드 만드는 법",
        description:
          "손글씨 문구 이미지는 SNS에서 참여율이 높습니다. 음성 입력으로 양산하는 방법과 커버·레이아웃 팁.",
      },
      es: {
        title: "Tarjetas con citas manuscritas para redes sociales",
        description:
          "Las imágenes con citas manuscritas logran gran interacción. Prodúcelas en lote con entrada por voz, con consejos de portada y maquetación.",
      },
    },
  },
  {
    slug: "audio-to-handwriting",
    author: "theo-lindgren",
    date: "2026-10-07",
    updated: "2026-10-07",
    i18n: {
      zh: {
        title: "录音怎么免费转成手写笔记?浏览器本地方案实测",
        description:
          "上传音频文件,在浏览器本地用 Whisper 转写成文字再排版手写。零成本、音频不上传,含实测结果与诚实的局限说明。",
      },
      en: {
        title: "Transcribe recordings into handwritten notes, free and local",
        description:
          "Upload an audio file and transcribe it with in-browser Whisper, then export as handwriting. Zero cost, audio never uploaded — with real test results and honest limitations.",
      },
      ja: {
        title: "録音を無料で手書きノートにする方法(ブラウザローカル実測)",
        description:
          "音声ファイルをアップロードすると、ブラウザ内の Whisper で文字起こしし手書きスタイルに。実測結果と正直な制限事項つき。",
      },
      ko: {
        title: "녹음을 무료로 손글씨 노트로: 브라우저 로컬 방식 실측",
        description:
          "오디오 파일을 올리면 브라우저 안의 Whisper가 변환하고 손글씨로 내보냅니다. 실측 결과와 솔직한 한계 포함.",
      },
      es: {
        title: "De grabación a nota manuscrita, gratis y en local",
        description:
          "Sube un audio, transcríbelo con Whisper en el navegador y expórtalo manuscrito. Con pruebas reales y limitaciones honestas.",
      },
    },
  },
  {
    slug: "handwriting-templates-guide",
    author: "theo-lindgren",
    date: "2026-10-07",
    updated: "2026-10-07",
    image: "/blog/templates.png",
    i18n: {
      zh: {
        title: "手写模板库:6 个场景,选一个就能写",
        description:
          "情书、道歉信、感谢信、生日、教师节、新年——6 个场景的手写模板,文案与样式一键套用,改几个字就能导出。",
      },
      en: {
        title: "Handwriting template library: six scenarios, pick one and write",
        description:
          "Love letters, apologies, thank-you notes, birthdays, Teachers' Day, New Year — copy and handwriting style in one tap, ready to export.",
      },
      ja: {
        title: "手書きテンプレート集:6 シーン、選んですぐ書ける",
        description:
          "ラブレター、お詫び状、お礼状、バースデー、教師の日、新年——文案とスタイルをワンタップ適用。",
      },
      ko: {
        title: "손글씨 템플릿: 6가지 상황, 골라서 바로 쓰기",
        description:
          "러브레터, 사과편지, 감사편지, 생일, 스승의 날, 새해 —— 문구와 스타일을 원탭 적용.",
      },
      es: {
        title: "Plantillas manuscritas: seis escenarios, elige y escribe",
        description:
          "Cartas de amor, disculpas, agradecimientos, cumpleaños, Día del Maestro y Año Nuevo — texto y estilo en un toque.",
      },
    },
  },
];

/** 面向美国用户的长尾词文章:正文已有全部 8 种语言 */
const US_POSTS: Post[] = [
  {
    slug: "name-tracing-generator",
    author: "clara-hartley",
    date: "2026-10-07",
    updated: "2026-10-07",
    image: "/blog/tracing-worksheet.png",
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
    updated: "2026-10-07",
    image: "/blog/lined-paper.png",
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
    image: "/blog/cursive-workspace.png",
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
    updated: "2026-10-07",
    image: "/blog/handwriting-paper.png",
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
    image: "/blog/santa-letter.png",
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
    image: "/blog/thank-you-note.png",
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
    image: "/blog/wedding-script.png",
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
    image: "/blog/pen-pal-letter.png",
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
    updated: "2026-10-07",
    image: "/blog/adult-practice.png",
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
    image: "/blog/tracing-worksheet.png",
    i18n: {
      en: {
        title: "Handwriting practice for struggling writers (dysgraphia-friendly)",
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
    image: "/blog/cursive-workspace.png",
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
    updated: "2026-10-07",
    image: "/blog/cursive-alphabet.png",
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
    updated: "2026-10-07",
    image: "/blog/cursive-signature.png",
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
    image: "/blog/cursive-workspace.png",
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
    image: "/blog/cursive-workspace.png",
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
    updated: "2026-10-07",
    image: "/blog/tracing-cursive.png",
    i18n: {
      en: {
        title: "How to teach cursive writing to kids at home (10-min lessons)",
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
    image: "/blog/handwriting-vs-typing-brain.png",
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
    image: "/blog/improve-your-handwriting.png",
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
    slug: "handwriting-repeater",
    author: "theo-lindgren",
    date: "2026-10-08",
    updated: "2026-10-08",
    image: "/blog/handwriting-repeater.png",
    i18n: {
      en: {
        title: "Handwriting repeater: loop a sentence until the strokes stick",
        description:
          "Free handwriting repeater settings: Patrick Hand, trace guide on, loop on. Watch the pen, then download a looping GIF of one pass.",
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
        title: "Cursive sentences to practice: printable pages for the sentence jump",
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
];

POSTS.push(...CURSIVE_POSTS);

// de/fr/pt 等后补语言在此合并
mergeI18n(POSTS, EXTRA_POST_I18N);
