export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
}

/** 博客索引:新增文章在 src/app/blog/<slug>/page.mdx 建文件后,在此登记 */
export const POSTS: Post[] = [
  {
    slug: "handwritten-card-with-voice",
    title: "用声音写贺卡:3 分钟生成一张手写贺卡",
    date: "2026-10-06",
    description:
      "不会写毛笔字也能送出手写贺卡。打开网页说一段祝福,选好字体纸张,导出打印即可,附赠文案思路。",
  },
  {
    slug: "handwriting-image-generator",
    title: "手写体图片在线生成教程:不打字,说出来就行",
    date: "2026-10-06",
    description:
      "对比打字型手写体工具,介绍语音输入生成手写体图片的方法,以及仿真度、纸张、墨色的调参技巧。",
  },
  {
    slug: "xiaohongshu-handwritten-images",
    title: "小红书手写文案配图怎么做?一个浏览器搞定",
    date: "2026-10-06",
    description:
      "手写风文案图是小红书的高互动形式。教你用声音转手写工具批量产出金句卡片,含封面与排版建议。",
  },
];
