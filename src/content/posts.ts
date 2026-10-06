import type { Locale } from "@/i18n/routing";

export interface Post {
  slug: string;
  date: string; // 首发
  updated: string; // 最后更新(EEAT:展示维护状态)
  image: string; // 题图(public/blog 下截图)
  i18n: Record<Locale, { title: string; description: string }>;
}

export function getPostMeta(slug: string, locale: Locale) {
  return POSTS.find((p) => p.slug === slug)?.i18n[locale];
}

/** 博客索引:新增文章在 src/content/blog/<slug>.<locale>.mdx 建文件并注册到 registry 后,在此登记 */
export const POSTS: Post[] = [
  {
    slug: "handwritten-card-with-voice",
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
    date: "2026-10-07",
    updated: "2026-10-07",
    image: "/blog/toolbar.png",
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
