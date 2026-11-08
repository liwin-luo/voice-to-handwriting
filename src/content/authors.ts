import type { Locale } from "@/i18n/routing";

/**
 * 博客作者角色(笔名+桌位署名,不是可验证的真实个人身份)。
 * 每个角色的写作风格、选题边界与禁区见 docs/personas/ 对应角色卡;
 * 新文章必须在 posts.ts 的 Post.author 里从这些 id 中选一个(TS 类型强制)。
 * 全语言共用同一套角色:笔名不翻译,role/bio 按语言给,缺省回退 en。
 */
export type AuthorId =
  | "clara-hartley" // 课堂桌:儿童书写教育(家长/老师)
  | "wes-morales" // 练习桌:成人自我提升
  | "mara-voss" // 科学桌:研究与科普
  | "june-park" // 信纸桌:贺卡/信件/仪式感
  | "theo-lindgren"; // 工具桌:产品教程与玩法(默认回退)

export interface AuthorI18n {
  /** 署名栏角色行,控制在 6 词以内 */
  role: string;
  /** 作者简介(作者页/悬浮提示用),一两句,第三人称 */
  bio: string;
}

export interface Author {
  id: AuthorId;
  /** 署名笔名:全语言一致,便于读者跨语言认出同一角色 */
  name: string;
  i18n: Partial<Record<Locale, AuthorI18n>>;
}

export const AUTHORS: Record<AuthorId, Author> = {
  "clara-hartley": {
    id: "clara-hartley",
    name: "Clara Hartley",
    i18n: { en: {
        role: "Classroom desk · K–3",
        bio: "Writes the classroom-tested guides for parents and teachers — name tracing, three-line paper, first cursive lessons. Everything starts from what actually works with young writers.",
      } },
  },
  "wes-morales": {
    id: "wes-morales",
    name: "Wes Morales",
    i18n: { en: {
        role: "Adult practice coach",
        bio: "Retrained his own handwriting as an adult and now writes the step-by-step improvement plans: diagnosis first, drills second, honest expectations throughout.",
      } },
  },
  "mara-voss": {
    id: "mara-voss",
    name: "Mara Voss",
    i18n: { en: {
        role: "Science desk",
        bio: "Separates what handwriting research shows from what headlines claim — reads the studies, cites them, and says plainly where the evidence stops.",
      } },
  },
  "june-park": {
    id: "june-park",
    name: "June Park",
    i18n: { en: {
        role: "Occasions & letters desk",
        bio: "Believes a handwritten note is the last luxury that costs nothing — writes the thank-you, wedding and seasonal letter guides for moments that deserve ink.",
      } },
  },
  "theo-lindgren": {
    id: "theo-lindgren",
    name: "Theo Lindgren",
    i18n: { en: {
        role: "Maker's desk",
        bio: "Builds the tools and writes the tutorials: workflows, tuning tips and honest limitations, tested on desktop Chrome before anything is published.",
      } },
  },
};

/** 取署名信息;author 缺失或 id 非法时回退到工具桌(站方声音),保证署名栏永远不为空 */
export function getAuthor(id: AuthorId | undefined, locale: Locale): { name: string; role: string; bio: string } {
  const author = (id && AUTHORS[id]) || AUTHORS["theo-lindgren"];
  const t = author.i18n[locale] ?? author.i18n.en;
  return { name: author.name, role: t?.role ?? "", bio: t?.bio ?? "" };
}
