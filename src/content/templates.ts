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
      }, zh: {
        title: "医生处方字模板(整活)",
        description: "传说中的「医生处方字」涂鸦,整活专用。Rx 处方纸配潦草笔迹,适合恶搞礼物、道具和贺卡。当然不是真处方。",
        text: "Rx\n咖啡 1000 mg —— 日出时服用一杯,需要时续杯。\n晚饭后散步一次,不许偷懒。\n大笑,每日两次。\n—— 涂鸦医生",
      } },
  },
  {
    slug: "love-letter",
    style: { fontId: "longcang", paperId: "letter", ink: "#15317e", fontSize: 28, intensity: 0.6, align: "left", indent: true },
    i18n: { en: {
        title: "Love letter template",
        description: "How to write a love letter that feels real? Skip the fancy words — write the small things. A handwritten love letter sample with running script on letter paper; edit a line and it's yours.",
        text: "Dear you,\nsome words are easier written than said.\nSince meeting you, ordinary days glow.\nI'd love to walk the road ahead with you.",
      }, zh: {
        title: "情书模板:手写情书怎么写才感人(含范文)",
        description: "情书怎么写才感人?不用华丽辞藻,写具体的小事就足够。这段手写情书范文用行书配信纸,写给女朋友、男朋友或想珍惜的人,改几个字就是你的。",
        text: "见字如面。\n有些话当面说不出口,写下来刚刚好。\n遇见你之后,平凡的日子都有了光。\n往后的路,想和你一起走。",
      } },
  },
  {
    slug: "apology-letter",
    style: { fontId: "mashanzheng", paperId: "letter", ink: "#1a1a1a", fontSize: 26, intensity: 0.5, align: "left", indent: true },
    i18n: { en: {
        title: "Apology letter template",
        description: "How to write an apology letter that sounds sincere? Own it, empathize, offer action. Works for friends and colleagues — regular script in black ink, ready to personalize.",
        text: "I'm sorry.\nMy tone the other day was wrong, and I regretted it the moment I spoke.\nI've thought it over and I understand how you felt.\nMay I apologize in person? Our friendship matters to me.",
      }, zh: {
        title: "道歉信模板:道歉信怎么写才真诚(给朋友/同事)",
        description: "道歉信怎么写才真诚?公式:承认 + 共情 + 给出行动。这段道歉信范文写给朋友、同事都适用,楷书黑墨一字一句都是认真,直接套用换成你们的事就好。",
        text: "对不起。\n那天是我的态度不好,话出口我就后悔了。\n这几天我想了很多,也明白了你的感受。\n希望能当面向你道歉,继续做彼此珍惜的人。",
      } },
  },
  {
    slug: "thank-you-letter",
    style: { fontId: "longcang", paperId: "letter", ink: "#15317e", fontSize: 28, intensity: 0.6, align: "left", indent: true },
    i18n: { en: {
        title: "Thank-you letter template",
        description: "How to write a thank-you note that isn't small talk? Recall something specific — for teachers, colleagues, anyone who helped.",
        text: "Thank you.\nI still remember every moment you helped me and guided me.\nYour kindness hasn't faded with time — it's grown clearer.\nMay the same kindness find you.",
      }, zh: {
        title: "感谢信模板:感谢信怎么写不流于客套",
        description: "感谢信怎么写不流于客套?写具体的回忆。适合送给老师、同事、帮过你的任何人,行书信纸,手写出来更有分量。",
        text: "谢谢您。\n那些帮过我忙、教过我道理的瞬间,我一直记得。\n您的善意没有随时间过去,反而越来越清晰。\n愿您被同样的温柔对待。",
      } },
  },
  {
    slug: "birthday-wishes",
    style: { fontId: "mashanzheng", paperId: "blank", ink: "#8c1f28", fontSize: 34, intensity: 0.7, align: "center", indent: false },
    i18n: { en: {
        title: "Birthday wishes template",
        description: "What to write in a birthday card beyond 'happy birthday'? Centered vermilion ink — festive and ready for social media.",
        text: "Happy birthday!\nMay every effort find its echo,\nevery plan still have time, and every loved one be near.\nIn this new year of life: health and joy first.",
      }, zh: {
        title: "生日祝福模板:生日祝福语怎么写不俗套",
        description: "生日祝福语除了「生日快乐」还能写什么?愿所有的努力都有回响。朱红墨色居中排版的生日贺卡,导出就能发朋友圈。",
        text: "生日快乐!\n愿你所有的努力都有回响,\n想做的事都来得及,想见的人都在身边。\n新的一岁,健康和快乐都要排第一。",
      } },
  },
  {
    slug: "teachers-day",
    style: { fontId: "mashanzheng", paperId: "letter", ink: "#1a1a1a", fontSize: 28, intensity: 0.55, align: "left", indent: true },
    i18n: { en: {
        title: "Teachers' Day card template",
        description: "What to write in a Teachers' Day card? \"What I once found nagging is now my confidence\" — for social posts and real handwritten cards.",
        text: "Dear teacher, thank you.\nThe chalkboard gets erased; what you taught never does.\nThe words I once found nagging are now my confidence.\nHappy Teachers' Day — wishing you peace and good health.",
      }, zh: {
        title: "教师节贺卡文案:教师节祝福语手写版",
        description: "教师节贺卡文案怎么写?「当年嫌唠叨的话,如今都成了底气」——适合发朋友圈,也适合手抄成一张真正的贺卡。",
        text: "老师,谢谢您。\n黑板上的字会擦掉,您教的道理不会。\n当年嫌您唠叨的话,如今都成了我的底气。\n教师节快乐,愿您平安顺遂。",
      } },
  },
  {
    slug: "new-year-wishes",
    style: { fontId: "mashanzheng", paperId: "blank", ink: "#8c1f28", fontSize: 36, intensity: 0.7, align: "center", indent: false },
    i18n: { en: {
        title: "New Year wishes template",
        description: "New Year wishes that aren't clichés? Leave the regrets in the old year. Big centered vermilion characters for the year-end post.",
        text: "Happy New Year!\nLeave last year's regrets in the old one.\nIn the year ahead: light in your eyes, confidence in your heart,\ngood health, smooth sailing — may every year be a good one.",
      }, zh: {
        title: "新年祝福语:新年贺词手写模板",
        description: "新年祝福语怎么写不俗套?旧岁的遗憾留在旧岁,新的一年眼里有光。朱红大字居中,跨年发图就是最应景的那张。",
        text: "新年快乐!\n旧岁的遗憾就留在旧岁,\n新的一年,愿你眼里有光,心里有底气,\n身体健康,万事顺遂,年年都是好年。",
      } },
  },
  {
    slug: "valentines-day",
    style: { fontId: "longcang", paperId: "letter", ink: "#8c1f28", fontSize: 28, intensity: 0.65, align: "left", indent: true },
    i18n: { en: {
        title: "Valentine's letter template",
        description: "What to write for Valentine's Day? 'Liking someone this much can't stay hidden.' Cursive in vermilion — handwriting beats red envelopes.",
        text: "To you,\nwhen people ask how I've been, I think of you.\nLiking someone this much can't stay hidden —\ntoday, I turned it into words.",
      }, zh: {
        title: "情人节文案:情人节情书模板(520/2·14 适用)",
        description: "情人节文案怎么写?喜欢这件事,藏是藏不住的。行书配朱红墨,写给唯一的人——手写比红包更打动人。",
        text: "致你:\n别人问我最近怎么样,我总想起你。\n喜欢这件事,藏是藏不住的,\n就像今天,我把它写成了字。",
      } },
  },
  {
    slug: "mothers-day",
    style: { fontId: "mashanzheng", paperId: "letter", ink: "#1a1a1a", fontSize: 28, intensity: 0.55, align: "left", indent: true },
    i18n: { en: {
        title: "Mother's Day card template",
        description: "What to write in a Mother's Day card? Something specific: 'you held my hand crossing streets; now it's my turn.' Warmer than any transfer.",
        text: "Mom,\nyou held my hand crossing streets; now it's my turn to hold yours.\nYou always say no gifts needed — so just hear this:\ntake care, eat well, I love you.",
      }, zh: {
        title: "母亲节贺卡文案:写给妈妈的感谢信",
        description: "母亲节贺卡文案怎么写?写具体的事:小时候您牵我过马路,现在换我牵您。手写一张给妈妈,比转账截图温暖一百倍。",
        text: "妈:\n小时候您牵我过马路,现在换我牵您。\n您总说不用买礼物,那就听我啰嗦这几句:\n注意身体,按时吃饭,我爱您。",
      } },
  },
  {
    slug: "fathers-day",
    style: { fontId: "mashanzheng", paperId: "letter", ink: "#15317e", fontSize: 28, intensity: 0.55, align: "left", indent: true },
    i18n: { en: {
        title: "Father's Day card template",
        description: "What to write in a Father's Day card? Dads say little — write it down: the bicycle wind, the 'try again' after failure. Strong script for a quiet man.",
        text: "Dad,\nyou never said much, but I remember the wind on the back of your bicycle\nand that “it's fine, try again” after every failed exam.\nHappy Father's Day. You're getting older — my turn to look after you.",
      }, zh: {
        title: "父亲节贺卡文案:写给沉默的父亲",
        description: "父亲节贺卡文案怎么写?和父亲的话少,更要写下来:自行车后座的风、那句「没事,再来」。硬朗楷书配蓝黑墨。",
        text: "爸:\n您话不多,但童年自行车后座的风、\n考试失利时那句「没事,再来」,我都记得。\n父亲节快乐。您老了,换我罩着您。",
      } },
  },
  {
    slug: "graduation-message",
    style: { fontId: "longcang", paperId: "blank", ink: "#15317e", fontSize: 30, intensity: 0.7, align: "left", indent: false },
    i18n: { en: {
        title: "Graduation message template",
        description: "What to write in a graduation message? 'May you still be you, and us still us' — for classmates, roommates, exam survivors.",
        text: "To [name],\nthe corridor detentions, the homework we copied together — still vivid.\nThe world is huge; go claim your part.\nYears from now, may you still be you, and us still us.",
      }, zh: {
        title: "毕业赠言怎么写?写给同学/室友(含范文)",
        description: "毕业赠言怎么写?「愿多年后再见,你还是你,我们还是我们」——写给同学、室友、一起熬过考试的人,行书白纸青春感拉满。",
        text: "致 XX:\n那年一起罚站的走廊、一起补的作业,都还历历在目。\n世界很大,我们各自去闯,\n愿多年后再见,你还是你,我们还是我们。",
      } },
  },
  {
    slug: "get-well-card",
    style: { fontId: "mashanzheng", paperId: "letter", ink: "#15317e", fontSize: 28, intensity: 0.5, align: "left", indent: true },
    i18n: { en: {
        title: "Get-well card template",
        description: "What to write in a get-well card? 'Don't rush to recover; sleep as much as you need.' A handwritten card says it all.",
        text: "Heard you're in hospital — thinking of you.\nDon't rush to recover; sleep as much as you need.\nEverything at home is covered. Just rest.\nWhen you're out, same place, my treat.",
      }, zh: {
        title: "慰问卡怎么写?早日康复祝福语模板",
        description: "探病祝福语怎么写?「别急着好起来,先把觉睡够」——探病不便时,一张手写慰问卡胜过千言万语。",
        text: "听说你住院了,心里一直挂念。\n别急着好起来,先把觉睡够。\n家里的事都有我们,你只管安心休养。\n等你出院,老地方,我请客。",
      } },
  },
  {
    slug: "wedding-congratulations",
    style: { fontId: "mashanzheng", paperId: "blank", ink: "#8c1f28", fontSize: 34, intensity: 0.7, align: "center", indent: false },
    i18n: { en: {
        title: "Wedding congratulations template",
        description: "Wedding wishes beyond the envelope? 'May the years ahead season every day well' — a handwritten line they'll actually remember.",
        text: "Congratulations on your wedding!\nI've seen the clumsiness and seriousness of your love.\nI trust you two to turn ordinary days into poetry.\nMay the years ahead season every day well.",
      }, zh: {
        title: "婚礼祝福语怎么写?写给新人的手写贺词",
        description: "婚礼祝福语怎么写不俗套?「愿往后岁月,柴米油盐都是诗」——份子钱之外,一句走心的手写祝福更被记住。",
        text: "新婚快乐!\n见过你们恋爱里的笨拙与认真,\n更相信你们把日子过好的能力。\n愿往后岁月,柴米油盐都是诗。",
      } },
  },
  {
    slug: "letter-from-santa",
    style: { fontId: "caveat", paperId: "festive", ink: "#8c1f28", fontSize: 30, intensity: 0.55, align: "left", indent: false },
    i18n: { en: {
        title: "Letter from Santa template (handwriting, printable)",
        description: "A handwritten letter from the North Pole: warm wishes in Santa's own script on festive paper. Edit a line, print it, and leave it under the tree on Christmas Eve.",
        text: "Merry Christmas!\nHo ho ho! It's me, Santa. The elves and the reindeer voted: you are officially on the Nice List (we checked it twice).\nOn Christmas Eve please leave a cookie out for me and a few carrots for the reindeer.\nKeep being curious and kind.\nSanta Claus, North Pole",
      }, zh: {
        title: "圣诞老人来信模板(手写体,可打印)",
        description: "给孩子一封「北极来的亲笔信」:手写字体配节日信纸,写上孩子这一年的闪光点,平安夜前打印放在圣诞树下。改几个字就是您家的专属来信。",
        text: "圣诞快乐!\n咳咳——是我,圣诞老人!小精灵们说你这一年又善良又爱思考,驯鹿们一致同意把你写进「好孩子名单」(我们核对了两遍)。\n平安夜记得给我留一块饼干,给驯鹿留几根胡萝卜。\n继续做那个闪闪发光的自己。\n圣诞老人 于北极",
      } },
  },
  {
    slug: "letter-to-santa",
    style: { fontId: "patrickhand", paperId: "festive", ink: "#8c1f28", fontSize: 26, intensity: 0.45, align: "left", indent: false },
    i18n: { en: {
        title: "Dear Santa letter template for kids (printable)",
        description: "A letter to Santa the child writes and signs: greeting, one true kindness from the year, a short wish list and a question for Santa — friendly print font on festive paper. Edit the lines, print, done.",
        text: "Dear Santa,\nMy name is Mia and I am six.\nThis year I learned to swim, and I shared my toys with my little brother.\nFor Christmas, may I please have a red scooter and some art supplies?\nHow do the reindeer fly?\nI will leave out cookies for you and carrots for the reindeer.\nLove, Mia",
      }, zh: {
        title: "给圣诞老人的信模板(儿童可打印,手写体)",
        description: "一封孩子自己写、自己签名的圣诞老人信:友好的印刷体配节日信纸,问候、今年的好事、小心愿、给圣诞老人的一个问题都已排好。改几行,打印出来就能寄。",
        text: "亲爱的圣诞老人:\n我叫米娅,今年六岁。\n今年我学会了游泳,还把玩具分给了弟弟。\n圣诞节我想要一辆红色滑板车和一些画画的工具,可以吗?\n驯鹿是怎么飞起来的呀?\n我会给你留饼干,给驯鹿留胡萝卜。\n爱你的,米娅",
      } },
  },
  {
    slug: "christmas-card-messages",
    style: { fontId: "longcang", paperId: "festive", ink: "#1b4332", fontSize: 30, intensity: 0.6, align: "center", indent: false },
    i18n: { en: {
        title: "Christmas card messages (ready to send)",
        description: "What to write in a Christmas card? Slow mornings, warm lights and people you love — warm without being sappy, in handwriting on festive paper. Send as is or edit one line.",
        text: "Merry Christmas!\nWishing you slow mornings, warm lights and people you love.\nWhatever this year brought, you made it better just by being in it.\nHere's to health, laughter and a little magic in the new year.\nWith love,",
      }, zh: {
        title: "圣诞贺卡文案怎么写?手写祝福语模板",
        description: "圣诞贺卡写什么不俗套?慢一点的早晨、暖一点的灯、你在就好——手写体配节日信纸,居中排版,导出就能发给家人朋友,或只改一行再发。",
        text: "圣诞快乐!\n愿你的假期有慢一点的早晨、暖一点的灯,\n和喜欢的人待在一起。\n这一年无论怎样,有你在,就更好了一点。\n愿新的一年健康、常笑,还有一点点魔法。",
      } },
  },
  {
    slug: "christmas-gift-thank-you",
    style: { fontId: "longcang", paperId: "letter", ink: "#15317e", fontSize: 28, intensity: 0.6, align: "left", indent: true },
    i18n: { en: {
        title: "Christmas gift thank-you note template",
        description: "The day-after-Christmas note that actually gets sent: name the gift, say how you're using it, look one step ahead. Handwriting on letter paper — swap in your gift and sign-off.",
        text: "Dear Aunt Carol,\nthank you for the scarf — I haven't taken it off since Christmas morning.\nEvery time I wear it, I think of your kitchen full of cookies.\nI hope your holidays were warm and restful.\nLet's find a day for tea in January.\nWith love,",
      }, zh: {
        title: "圣诞礼物感谢卡怎么写?手写感谢信模板",
        description: "收到圣诞礼物后的感谢卡怎么写?点出礼物、写上怎么用、再约下一次见面——行书信纸配蓝黑墨,把礼物和称呼换成你收到的就好。",
        text: "亲爱的卡罗尔阿姨:\n谢谢您的围巾,从圣诞节早上到现在我一直围着。\n每次戴上它,就想起您那间飘着饼干香的厨房。\n希望您的假期温暖又安心。\n一月找个下午,我们一起喝茶。\n爱您的,XX",
      } },
  },
];

