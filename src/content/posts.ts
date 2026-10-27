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
    updated: "2026-10-27",
    image: "/blog/adult-practice.png",
    i18n: {
      en: {
        title: "What does your handwriting say about you? The honest guide",
        description:
          "The five features people read in handwriting — slant, size, spacing, baseline, pressure — what science actually says, and how to change the habits you don't like.",
      },
      zh: {
        title: "你的字迹说明了什么?读得出习惯,读不出性格",
        description:
          "字迹读得出习惯,读不出性格。1989 年 Neter 与 Ben-Shakhar 的荟萃分析里,笔迹师不比瞎猜更准。字号和占格用田字格练,签名另练。",
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
    updated: "2026-10-13",
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
    updated: "2026-10-13",
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
    updated: "2026-10-13",
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
    updated: "2026-10-12",
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
    updated: "2026-10-10",
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
    updated: "2026-10-13",
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
  {
    slug: "name-tracing-with-lines",
    author: "clara-hartley",
    date: "2026-10-09",
    updated: "2026-10-09",
    image: "/blog/name-tracing-lines.png",
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
    image: "/blog/calligraphy-motto.png",
    i18n: {
      en: {
        title: "Calligraphy motto cards: from trending phrase to handwritten card",
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
    image: "/blog/best-cursive-fonts.png",
    i18n: {
      en: {
        title: "Best free cursive fonts: 13 open-source picks, previewed with your own words",
        description:
          "Thirteen free cursive fonts, including signature scripts, compared by job — preview them with your text and export PNG, SVG or PDF, no install.",
      },
    },
  },
  {
    slug: "how-to-practice-your-signature",
    author: "wes-morales",
    date: "2026-10-10",
    updated: "2026-10-10",
    i18n: {
      en: {
        title: "How to practice your signature for seven days, one script",
        description:
          "How to practice your signature: one short form, one script, fifteen minutes a day. The sheet settings, the seven-day drill, and what it will not sign for you.",
      },
    },
  },
  {
    slug: "tracing-numbers-by-age",
    author: "clara-hartley",
    date: "2026-10-10",
    updated: "2026-10-10",
    image: "/blog/tracing-numbers-by-age.png",
    i18n: {
      en: {
        title: "How to teach number tracing by age, one number a night",
        description:
          "How to teach number tracing by age: ages 3 to 4 stay on lines, ages 5 to 6 trace one numeral a night, and age 7 copies with the model covered. Use the table.",
      },
    },
  },
  {
    slug: "strokes-before-letter-tracing",
    author: "clara-hartley",
    date: "2026-10-10",
    updated: "2026-10-10",
    image: "/blog/strokes-before-letter-tracing.png",
    i18n: {
      en: {
        title: "How to practice strokes before a child traces letters",
        description:
          "How to practice strokes before a child traces letters: lines at 3 to 4, a circle at 5 to 6, then one letter. A five-minute order for tomorrow morning.",
      },
    },
  },
  {
    slug: "how-to-join-cursive-letters",
    author: "clara-hartley",
    date: "2026-10-10",
    updated: "2026-10-27",
    image: "/blog/how-to-join-cursive-letters.png",
    i18n: {
      en: {
        title: "How two cursive letters connect, same way or a turn",
        description:
          "How two cursive letters connect: th keeps traveling the same way, ai turns in the middle. One pair per page. If the pencil lifts, the join did not happen.",
      },
    },
  },
  {
    slug: "export-a-mirrored-cursive-stencil",
    author: "theo-lindgren",
    date: "2026-10-10",
    updated: "2026-10-10",
    image: "/blog/export-a-mirrored-cursive-stencil.png",
    i18n: {
      en: {
        title: "How to export a black mirrored stencil for transfer",
        description:
          "How to export a black mirrored stencil for transfer: a short phrase, mirror on, black on white. The settings from a desktop Chrome check on October 10, 2026.",
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
    slug: "squared-hand-lettering-practice",
    author: "wes-morales",
    date: "2026-10-10",
    updated: "2026-10-10",
    image: "/blog/squared-hand-lettering-practice.png",
    i18n: {
      en: {
        title: "Practice squared handwriting for fifteen minutes a day",
        description:
          "Practice squared handwriting for fifteen minutes a day: check slant and baseline, then one row of Architects Daughter. Readable capitals take four to six weeks.",
      },
    },
  },
  {
    slug: "print-handwritten-letters-and-envelopes",
    author: "theo-lindgren",
    date: "2026-10-09",
    updated: "2026-10-09",
    image: "/blog/print-handwritten-letters.png",
    i18n: {
      en: {
        title: "Print a handwritten letter and a matching envelope for three people",
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
    slug: "save-a-handwritten-note",
    author: "theo-lindgren",
    date: "2026-10-12",
    updated: "2026-10-12",
    image: "/blog/save-a-handwritten-note.png",
    i18n: {
      en: {
        title: "How to save a handwritten note from your phone",
        description:
          "Write on one sheet, download handwriting-pad.png, and reload. The strokes stay in the browser until you clear them. Free, no signup.",
      },
    },
  },
  {
    slug: "count-words-in-handwriting",
    author: "theo-lindgren",
    date: "2026-10-13",
    updated: "2026-10-13",
    image: "/blog/count-words-in-handwriting.png",
    i18n: {
      en: {
        title: "How to count words in handwriting",
        description:
          "How to count words in handwriting: upload one photo, then read the words, letters, and digits. Two Bradley Hand lines came back as 7 words. Free, no signup.",
      },
    },
  },
  {
    slug: "share-a-handwriting-score-card",
    author: "theo-lindgren",
    date: "2026-10-13",
    updated: "2026-10-13",
    image: "/blog/share-a-handwriting-score-card.png",
    i18n: {
      en: {
        title: "How to share a handwriting score card",
        description:
          "How to share a handwriting score card: pick Seal, Certificate, Paper, or Plain, then download the PNG. Free, no signup. The notes beside the card stay selectable text.",
      },
    },
  },
  {
    slug: "handwriting-worksheets",
    author: "clara-hartley",
    date: "2026-10-14",
    updated: "2026-10-14",
    image: "/blog/handwriting-worksheets.png",
    i18n: {
      en: {
        title: "How to make handwriting worksheets for a whole week, tonight",
        description:
          "How to make handwriting worksheets in one sitting: what to type by age, five lists for five school days, and what the sheets will not do. Free generator, no signup.",
      },
      zh: {
        title: "手写练习纸怎么排:今晚做好一周的五张",
        description:
          "怎么给孩子做手写练习纸:一次做完周一到周五的五张,分龄词表、星期到周五的清单,以及练习纸做不到的事。免费生成器,无需注册。",
      },
      ja: {
        title: "書き取りプリントの1週間分を今夜作ってしまう方法",
        description:
          "書き取りプリントの一括作り方:年齢別の中身、月曜から金曜までの 5 リスト、そしてこのプリントにできないこと。無料の生成器、登録不要。",
      },
      ko: {
        title: "쓰기 연습지 일주일 치, 오늘 밤 다 만드는 방법",
        description:
          "쓰기 연습지를 한 번에 만드는 법: 나이별 내용, 월요일부터 금요일까지 다섯 목록, 그리고 이 연습지가 못 하는 것. 무료 생성기, 가입 불필요.",
      },
      es: {
        title: "Cómo dejar listas cinco hojas de caligrafía para toda la semana, esta misma noche",
        description:
          "Cómo hacer hojas de caligrafía de una sola vez: qué escribir según la edad, cinco listas para cinco días escolares y lo que estas hojas no hacen. Generador gratis, sin registro.",
      },
    },
  },
  {
    slug: "numbers-in-cursive",
    author: "clara-hartley",
    date: "2026-10-14",
    updated: "2026-10-14",
    image: "/blog/numbers-in-cursive.png",
    i18n: {
      en: {
        title: "Numbers in cursive: what 1 to 10 look like and how to practice them",
        description:
          "Numbers in cursive: numerals stand alone instead of joining, the loops show up in 2, 6, and 8, and the practice page prints with one number per row. Free, no signup.",
      },
      zh: {
        title: "连笔里的数字:1 到 10 长什么样,怎么练",
        description:
          "连笔里的数字不连写:环在 2、6、8,7 在部分字体没有横杠;练习页一行一个数字。免费,无需注册。",
      },
      ja: {
        title: "筆記体の数字:1 から 10 の形と、練習ページの作り方",
        description:
          "筆記体の数字はつながらず単独で立ちます。輪は 2・6・8 に出て、7 に横棒のないフォントもある。練習ページは 1 行に 1 桁で印刷。無料、登録不要。",
      },
      ko: {
        title: "필기체 숫자: 1부터 10까지 모양과 연습 방법",
        description:
          "필기체 숫자는 이어 쓰지 않고 혼자 섭니다. 고리는 2, 6, 8에 나타나고 7은 글꼴에 따라 가로줄이 없습니다. 연습지는 한 줄에 한 숫자. 무료, 가입 불필요.",
      },
      es: {
        title: "Los números en cursiva: cómo son del 1 al 10 y cómo practicarlos",
        description:
          "Los números en cursiva no se unen: los bucles aparecen en el 2, el 6 y el 8, y el 7 no lleva barra en algunas fuentes. La hoja imprime un número por fila. Gratis, sin registro.",
      },
    },
  },
  {
    slug: "graphisme-maternelle",
    author: "clara-hartley",
    date: "2026-10-14",
    updated: "2026-10-14",
    image: "/blog/graphisme-maternelle.png",
    i18n: {
      // fr 源发(trends FR 词),en 标题仅作列表回退与规范校验,无 en 正文
      en: {
        title: "Graphisme: pre-writing patterns in French maternelle (PS to GS)",
        description:
          "How French maternelle builds writing through graphisme: the strokes to train in PS, MS, and GS, the five pattern families, and free printable pre-writing sheets.",
      },
      fr: {
        title: "Le graphisme en maternelle : les gestes à entraîner avant l'écriture",
        description:
          "Le graphisme en maternelle, de la PS à la GS : les cinq familles de traits, la progression par section, et des fiches de tracés à imprimer gratuitement.",
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
    image: "/blog/handwriting-personality-test.png",
    i18n: {
      en: {
        title: "Handwriting personality test: pick the shapes you write",
        description:
          "A free handwriting personality test with no upload. Eight shape answers, a fictional label, and one drill to bring back to a practice sheet.",
      },
    },
  },
  {
    slug: "daily-cursive-practice-pdf",
    author: "wes-morales",
    date: "2026-10-20",
    updated: "2026-10-20",
    image: "/blog/daily-cursive-practice-pdf.png",
    i18n: {
      en: {
        title: "Daily cursive handwriting practice PDF: fifteen minutes, then stop",
        description:
          "A free daily handwriting practice PDF: switch to Adults, print today's cursive sheet, and stop at fifteen minutes. The settings, one real page, and what the file will not do.",
      },
    },
  },
  {
    slug: "whatsapp-voice-note-handwriting",
    author: "theo-lindgren",
    date: "2026-10-16",
    updated: "2026-10-27",
    image: "/blog/whatsapp-voice-note-handwriting.webp",
    i18n: {
      // de 源发。en 标题仅作列表回退与规范校验,无 en 正文。与英文电平文不是译文。
      en: {
        title: "Turn a WhatsApp voice note into handwriting",
        description:
          "Convert an Opus voice note or an iPhone M4A to MP3, keep the part you need, then import it and export a handwritten page.",
      },
      de: {
        title: "WhatsApp-Sprachnachricht in Handschrift verwandeln",
        description:
          "Opus-Sprachnachricht oder iPhone-M4A in MP3 wandeln, die Stelle schneiden und hier als Handschrift exportieren. Nichts wird hochgeladen.",
      },
    },
  },
  {
    slug: "bubble-letters-for-a-display-name",
    author: "theo-lindgren",
    date: "2026-10-26",
    updated: "2026-10-26",
    image: "/blog/bubble-letters-peach2.png",
    i18n: {
      en: {
        title: "Bubble letters for a short display name",
        description:
          "Type a short name and copy bubble letters for a display name: one heart, bow, or flower. Use a handwriting font when the name has to be a picture.",
      },
    },
  },
];

POSTS.push(...CURSIVE_POSTS);

// de/fr/pt 等后补语言在此合并
mergeI18n(POSTS, EXTRA_POST_I18N);
