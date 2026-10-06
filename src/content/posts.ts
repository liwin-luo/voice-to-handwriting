import type { Locale } from "@/i18n/routing";

export interface Post {
  slug: string;
  date: string;
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
];
