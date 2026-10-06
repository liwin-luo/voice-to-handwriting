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
    },
  },
];
