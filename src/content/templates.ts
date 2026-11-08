import type { Locale } from "@/i18n/routing";

export interface TemplateStyle {
  fontId: string;
  paperId: string;
  ink: string;
  fontSize: number;
  intensity: number;
  align: "left" | "center";
  indent: boolean;
}

export interface HandwritingTemplate {
  slug: string;
  style: TemplateStyle;
  i18n: Partial<Record<Locale, { title: string; description: string; text: string }>>;
}

export function getTemplate(slug: string): HandwritingTemplate | undefined {
  return TEMPLATES.find((t) => t.slug === slug);
}

export interface TemplateMeta {
  title: string;
  description: string;
  text: string;
}

/** 模板元数据:当前语言缺翻译时回退英语 */
export function getTemplateMeta(tpl: HandwritingTemplate, locale: Locale): TemplateMeta {
  return tpl.i18n[locale] ?? tpl.i18n.en ?? { title: tpl.slug, description: "", text: "" };
}

/** 场景模板:文案 + 配套样式。新模板:在 TEMPLATES 加一项(en 范文必填),en 范文必填;页面与 sitemap 自动覆盖 */
export const TEMPLATES: HandwritingTemplate[] = [
  {
    slug: "doctor-prescription",
    style: { fontId: "caveat", paperId: "rx", ink: "#1a1a1a", fontSize: 30, intensity: 0.85, align: "left", indent: false },
    i18n: { en: {
        title: "Doctor handwriting template",
        description: "The infamous doctor's prescription scrawl, as a gag. Rx paper, chaotic pen — for joke gifts, props and cards. Obviously not a real prescription.",
        text: "Rx\nCoffee 1000 mg — take one cup at sunrise, refills as needed.\nOne long walk after dinner.\nLaughter, twice daily.\n— Dr. Scribble",
      } },
  },
  {
    slug: "love-letter",
    style: { fontId: "longcang", paperId: "letter", ink: "#15317e", fontSize: 28, intensity: 0.6, align: "left", indent: true },
    i18n: { en: {
        title: "Love letter template",
        description: "How to write a love letter that feels real? Skip the fancy words — write the small things. A handwritten love letter sample with running script on letter paper; edit a line and it's yours.",
        text: "Dear you,\nsome words are easier written than said.\nSince meeting you, ordinary days glow.\nI'd love to walk the road ahead with you.",
      } },
  },
  {
    slug: "apology-letter",
    style: { fontId: "mashanzheng", paperId: "letter", ink: "#1a1a1a", fontSize: 26, intensity: 0.5, align: "left", indent: true },
    i18n: { en: {
        title: "Apology letter template",
        description: "How to write an apology letter that sounds sincere? Own it, empathize, offer action. Works for friends and colleagues — regular script in black ink, ready to personalize.",
        text: "I'm sorry.\nMy tone the other day was wrong, and I regretted it the moment I spoke.\nI've thought it over and I understand how you felt.\nMay I apologize in person? Our friendship matters to me.",
      } },
  },
  {
    slug: "thank-you-letter",
    style: { fontId: "longcang", paperId: "letter", ink: "#15317e", fontSize: 28, intensity: 0.6, align: "left", indent: true },
    i18n: { en: {
        title: "Thank-you letter template",
        description: "How to write a thank-you note that isn't small talk? Recall something specific — for teachers, colleagues, anyone who helped.",
        text: "Thank you.\nI still remember every moment you helped me and guided me.\nYour kindness hasn't faded with time — it's grown clearer.\nMay the same kindness find you.",
      } },
  },
  {
    slug: "birthday-wishes",
    style: { fontId: "mashanzheng", paperId: "blank", ink: "#8c1f28", fontSize: 34, intensity: 0.7, align: "center", indent: false },
    i18n: { en: {
        title: "Birthday wishes template",
        description: "What to write in a birthday card beyond 'happy birthday'? Centered vermilion ink — festive and ready for social media.",
        text: "Happy birthday!\nMay every effort find its echo,\nevery plan still have time, and every loved one be near.\nIn this new year of life: health and joy first.",
      } },
  },
  {
    slug: "teachers-day",
    style: { fontId: "mashanzheng", paperId: "letter", ink: "#1a1a1a", fontSize: 28, intensity: 0.55, align: "left", indent: true },
    i18n: { en: {
        title: "Teachers' Day card template",
        description: "What to write in a Teachers' Day card? \"What I once found nagging is now my confidence\" — for social posts and real handwritten cards.",
        text: "Dear teacher, thank you.\nThe chalkboard gets erased; what you taught never does.\nThe words I once found nagging are now my confidence.\nHappy Teachers' Day — wishing you peace and good health.",
      } },
  },
  {
    slug: "new-year-wishes",
    style: { fontId: "mashanzheng", paperId: "blank", ink: "#8c1f28", fontSize: 36, intensity: 0.7, align: "center", indent: false },
    i18n: { en: {
        title: "New Year wishes template",
        description: "New Year wishes that aren't clichés? Leave the regrets in the old year. Big centered vermilion characters for the year-end post.",
        text: "Happy New Year!\nLeave last year's regrets in the old one.\nIn the year ahead: light in your eyes, confidence in your heart,\ngood health, smooth sailing — may every year be a good one.",
      } },
  },
  {
    slug: "valentines-day",
    style: { fontId: "longcang", paperId: "letter", ink: "#8c1f28", fontSize: 28, intensity: 0.65, align: "left", indent: true },
    i18n: { en: {
        title: "Valentine's letter template",
        description: "What to write for Valentine's Day? 'Liking someone this much can't stay hidden.' Cursive in vermilion — handwriting beats red envelopes.",
        text: "To you,\nwhen people ask how I've been, I think of you.\nLiking someone this much can't stay hidden —\ntoday, I turned it into words.",
      } },
  },
  {
    slug: "mothers-day",
    style: { fontId: "mashanzheng", paperId: "letter", ink: "#1a1a1a", fontSize: 28, intensity: 0.55, align: "left", indent: true },
    i18n: { en: {
        title: "Mother's Day card template",
        description: "What to write in a Mother's Day card? Something specific: 'you held my hand crossing streets; now it's my turn.' Warmer than any transfer.",
        text: "Mom,\nyou held my hand crossing streets; now it's my turn to hold yours.\nYou always say no gifts needed — so just hear this:\ntake care, eat well, I love you.",
      } },
  },
  {
    slug: "fathers-day",
    style: { fontId: "mashanzheng", paperId: "letter", ink: "#15317e", fontSize: 28, intensity: 0.55, align: "left", indent: true },
    i18n: { en: {
        title: "Father's Day card template",
        description: "What to write in a Father's Day card? Dads say little — write it down: the bicycle wind, the 'try again' after failure. Strong script for a quiet man.",
        text: "Dad,\nyou never said much, but I remember the wind on the back of your bicycle\nand that “it's fine, try again” after every failed exam.\nHappy Father's Day. You're getting older — my turn to look after you.",
      } },
  },
  {
    slug: "graduation-message",
    style: { fontId: "longcang", paperId: "blank", ink: "#15317e", fontSize: 30, intensity: 0.7, align: "left", indent: false },
    i18n: { en: {
        title: "Graduation message template",
        description: "What to write in a graduation message? 'May you still be you, and us still us' — for classmates, roommates, exam survivors.",
        text: "To [name],\nthe corridor detentions, the homework we copied together — still vivid.\nThe world is huge; go claim your part.\nYears from now, may you still be you, and us still us.",
      } },
  },
  {
    slug: "get-well-card",
    style: { fontId: "mashanzheng", paperId: "letter", ink: "#15317e", fontSize: 28, intensity: 0.5, align: "left", indent: true },
    i18n: { en: {
        title: "Get-well card template",
        description: "What to write in a get-well card? 'Don't rush to recover; sleep as much as you need.' A handwritten card says it all.",
        text: "Heard you're in hospital — thinking of you.\nDon't rush to recover; sleep as much as you need.\nEverything at home is covered. Just rest.\nWhen you're out, same place, my treat.",
      } },
  },
  {
    slug: "wedding-congratulations",
    style: { fontId: "mashanzheng", paperId: "blank", ink: "#8c1f28", fontSize: 34, intensity: 0.7, align: "center", indent: false },
    i18n: { en: {
        title: "Wedding congratulations template",
        description: "Wedding wishes beyond the envelope? 'May the years ahead season every day well' — a handwritten line they'll actually remember.",
        text: "Congratulations on your wedding!\nI've seen the clumsiness and seriousness of your love.\nI trust you two to turn ordinary days into poetry.\nMay the years ahead season every day well.",
      } },
  },
  {
    slug: "letter-from-santa",
    style: { fontId: "caveat", paperId: "festive", ink: "#8c1f28", fontSize: 30, intensity: 0.55, align: "left", indent: false },
    i18n: { en: {
        title: "Letter from Santa template (handwriting, printable)",
        description: "A handwritten letter from the North Pole: warm wishes in Santa's own script on festive paper. Edit a line, print it, and leave it under the tree on Christmas Eve.",
        text: "Merry Christmas!\nHo ho ho! It's me, Santa. The elves and the reindeer voted: you are officially on the Nice List (we checked it twice).\nOn Christmas Eve please leave a cookie out for me and a few carrots for the reindeer.\nKeep being curious and kind.\nSanta Claus, North Pole",
      } },
  },
  {
    slug: "letter-to-santa",
    style: { fontId: "patrickhand", paperId: "festive", ink: "#8c1f28", fontSize: 26, intensity: 0.45, align: "left", indent: false },
    i18n: { en: {
        title: "Dear Santa letter template for kids (printable)",
        description: "A letter to Santa the child writes and signs: greeting, one true kindness from the year, a short wish list and a question for Santa — friendly print font on festive paper. Edit the lines, print, done.",
        text: "Dear Santa,\nMy name is Mia and I am six.\nThis year I learned to swim, and I shared my toys with my little brother.\nFor Christmas, may I please have a red scooter and some art supplies?\nHow do the reindeer fly?\nI will leave out cookies for you and carrots for the reindeer.\nLove, Mia",
      } },
  },
  {
    slug: "christmas-card-messages",
    style: { fontId: "longcang", paperId: "festive", ink: "#1b4332", fontSize: 30, intensity: 0.6, align: "center", indent: false },
    i18n: { en: {
        title: "Christmas card messages (ready to send)",
        description: "What to write in a Christmas card? Slow mornings, warm lights and people you love — warm without being sappy, in handwriting on festive paper. Send as is or edit one line.",
        text: "Merry Christmas!\nWishing you slow mornings, warm lights and people you love.\nWhatever this year brought, you made it better just by being in it.\nHere's to health, laughter and a little magic in the new year.\nWith love,",
      } },
  },
  {
    slug: "christmas-gift-thank-you",
    style: { fontId: "longcang", paperId: "letter", ink: "#15317e", fontSize: 28, intensity: 0.6, align: "left", indent: true },
    i18n: { en: {
        title: "Christmas gift thank-you note template",
        description: "The day-after-Christmas note that actually gets sent: name the gift, say how you're using it, look one step ahead. Handwriting on letter paper — swap in your gift and sign-off.",
        text: "Dear Aunt Carol,\nthank you for the scarf — I haven't taken it off since Christmas morning.\nEvery time I wear it, I think of your kitchen full of cookies.\nI hope your holidays were warm and restful.\nLet's find a day for tea in January.\nWith love,",
      } },
  },
];

