import { mergeI18n, EXTRA_TEMPLATE_I18N } from "@/content/extra-locales";
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

/** 场景模板:文案 + 配套样式。新模板:在 TEMPLATES 加一项并在 sitemap 补 URL */
export const TEMPLATES: HandwritingTemplate[] = [
  {
    slug: "love-letter",
    style: { fontId: "longcang", paperId: "letter", ink: "#15317e", fontSize: 28, intensity: 0.6, align: "left", indent: true },
    i18n: {
      zh: {
        title: "情书模板:手写情书怎么写才感人(含范文)",
        description: "情书怎么写才感人?不用华丽辞藻,写具体的小事就足够。这段手写情书范文用行书配信纸,写给女朋友、男朋友或想珍惜的人,改几个字就是你的。",
        text: "见字如面。\n有些话当面说不出口,写下来刚刚好。\n遇见你之后,平凡的日子都有了光。\n往后的路,想和你一起走。",
      },
      en: {
        title: "Love letter template",
        description: "How to write a love letter that feels real? Skip the fancy words — write the small things. A handwritten love letter sample with running script on letter paper; edit a line and it's yours.",
        text: "Dear you,\nsome words are easier written than said.\nSince meeting you, ordinary days glow.\nI'd love to walk the road ahead with you.",
      },
      ja: {
        title: "ラブレターのテンプレート",
        description: "会って言えないことも、書けば素直に伝わる。行書×レターペーパー。",
        text: "親愛なるあなたへ。\n会って言えないことも、書けば素直に伝わります。\nあなたと出会ってから、毎日が輝いています。\nこれからも一緒に歩んでいきたいです。",
      },
      ko: {
        title: "러브레터 템플릿",
        description: "마주치면 못 할 말도 글로 쓰면 전해집니다. 행서 + 편지지.",
        text: "너에게,\n마주치면 못 할 말도 글로 쓰면 잘 전해져.\n너를 만난 뒤로 평범한 날도 빛나.\n앞으로도 함께 걷고 싶어.",
      },
      es: {
        title: "Plantilla de carta de amor",
        description: "Palabras más fáciles escritas que dichas. Cursiva sobre papel carta.",
        text: "Para ti,\nhay palabras más fáciles escritas que dichas.\nDesde que te conocí, los días comunes brillan.\nQuiero caminar el camino contigo.",
      },
    },
  },
  {
    slug: "apology-letter",
    style: { fontId: "mashanzheng", paperId: "letter", ink: "#1a1a1a", fontSize: 26, intensity: 0.5, align: "left", indent: true },
    i18n: {
      zh: {
        title: "道歉信模板:道歉信怎么写才真诚(给朋友/同事)",
        description: "道歉信怎么写才真诚?公式:承认 + 共情 + 给出行动。这段道歉信范文写给朋友、同事都适用,楷书黑墨一字一句都是认真,直接套用换成你们的事就好。",
        text: "对不起。\n那天是我的态度不好,话出口我就后悔了。\n这几天我想了很多,也明白了你的感受。\n希望能当面向你道歉,继续做彼此珍惜的人。",
      },
      en: {
        title: "Apology letter template",
        description: "How to write an apology letter that sounds sincere? Own it, empathize, offer action. Works for friends and colleagues — regular script in black ink, ready to personalize.",
        text: "I'm sorry.\nMy tone the other day was wrong, and I regretted it the moment I spoke.\nI've thought it over and I understand how you felt.\nMay I apologize in person? Our friendship matters to me.",
      },
      ja: {
        title: "お詫び状のテンプレート",
        description: "認めて、共感して、行動を示す。楷書×黒インクで誠実に。",
        text: "ごめんなさい。\nあ日の態度は良くなかったと、言葉にした瞬間から後悔しています。\nこの数日、あなたの気持ちを考えました。\n直接お詫びさせてください。大切な関係だからこそ。",
      },
      ko: {
        title: "사과편지 템플릿",
        description: "인정하고, 공감하고, 행동을 약속합니다. 해서 + 검정 잉크.",
        text: "미안해.\n그날 내 태도가 잘못했어. 말이 나온 순간부터 후회했어.\n요 며칠 네 마음을 많이 생각했어.\n직접 사과하고 싶어. 소중한 사이니까.",
      },
      es: {
        title: "Plantilla de carta de disculpa",
        description: "Reconocer, empatizar, ofrecer acción. Letra regular en tinta negra.",
        text: "Lo siento.\nMi tono el otro día estuvo mal, y me arrepentí en cuanto hablé.\nHe pensado mucho y entiendo lo que sentiste.\n¿Puedo disculparme en persona? Nuestra amistad me importa.",
      },
    },
  },
  {
    slug: "thank-you-letter",
    style: { fontId: "longcang", paperId: "letter", ink: "#15317e", fontSize: 28, intensity: 0.6, align: "left", indent: true },
    i18n: {
      zh: {
        title: "感谢信模板:感谢信怎么写不流于客套",
        description: "感谢信怎么写不流于客套?写具体的回忆。适合送给老师、同事、帮过你的任何人,行书信纸,手写出来更有分量。",
        text: "谢谢您。\n那些帮过我忙、教过我道理的瞬间,我一直记得。\n您的善意没有随时间过去,反而越来越清晰。\n愿您被同样的温柔对待。",
      },
      en: {
        title: "Thank-you letter template",
        description: "How to write a thank-you note that isn't small talk? Recall something specific — for teachers, colleagues, anyone who helped.",
        text: "Thank you.\nI still remember every moment you helped me and guided me.\nYour kindness hasn't faded with time — it's grown clearer.\nMay the same kindness find you.",
      },
      ja: {
        title: "お礼状のテンプレート",
        description: "具体的な思い出と祝福で、形だけにならない感謝を。",
        text: "ありがとうございます。\n助けてくれた瞬間も、背中を押してくれた言葉も、ずっと覚えています。\nその優しさは色褪せず、むしろ明晰になっています。\nあなたにも同じ優しさが戻ってきますように。",
      },
      ko: {
        title: "감사편지 템플릿",
        description: "구체적인 기억과 축복으로, 형식이 아닌 감사를 전합니다.",
        text: "고마워요.\n도와줬던 순간들, 한마디 한마디가 힘이 되던 말들, 다 기억하고 있어요.\n그 선의는 시간이 지날수록 더 선명해져요.\n당신에게도 같은 따뜻함이 돌아오길 바라요.",
      },
      es: {
        title: "Plantilla de carta de agradecimiento",
        description: "Recuerdos concretos y una bendición: gratitud sin formalismos.",
        text: "Gracias.\nRecuerdo cada momento en que me ayudaste y me guiaste.\nTu bondad no se ha desvanecido con el tiempo: se ve más clara.\nQue la misma bondad te encuentre.",
      },
    },
  },
  {
    slug: "birthday-wishes",
    style: { fontId: "mashanzheng", paperId: "blank", ink: "#8c1f28", fontSize: 34, intensity: 0.7, align: "center", indent: false },
    i18n: {
      zh: {
        title: "生日祝福模板:生日祝福语怎么写不俗套",
        description: "生日祝福语除了「生日快乐」还能写什么?愿所有的努力都有回响。朱红墨色居中排版的生日贺卡,导出就能发朋友圈。",
        text: "生日快乐!\n愿你所有的努力都有回响,\n想做的事都来得及,想见的人都在身边。\n新的一岁,健康和快乐都要排第一。",
      },
      en: {
        title: "Birthday wishes template",
        description: "What to write in a birthday card beyond 'happy birthday'? Centered vermilion ink — festive and ready for social media.",
        text: "Happy birthday!\nMay every effort find its echo,\nevery plan still have time, and every loved one be near.\nIn this new year of life: health and joy first.",
      },
      ja: {
        title: "バースデーカードのテンプレート",
        description: "中央揃え×朱色のインクで、お祝いっぽさ抜群。そのまま送れます。",
        text: "お誕生日おめでとう!\n頑張りが実を結びますように。\nやりたいことは間に合って、会いたい人はそばにいますように。\n新しい一年は、健康と幸せがいちばん前。",
      },
      ko: {
        title: "생일 축하 템플릿",
        description: "가운데 정렬 + 주홍 잉크로 축하 분위기 만점. 바로 보내드릴 수 있어요.",
        text: "생일 축하해!\n노력이 모두 결실을 맺기를,\n하고 싶은 일은 늦지 않고, 보고 싶은 사람은 곁에 있기를.\n새로운 한 해는 건강과 행복이 첫 번째야.",
      },
      es: {
        title: "Plantilla de felicitación de cumpleaños",
        description: "Centrado en tinta cinabrio: festivo y listo para enviar.",
        text: "¡Feliz cumpleaños!\nQue cada esfuerzo encuentre su eco,\nque todo plan llegue a tiempo y tus seres queridos estén cerca.\nEn este nuevo año: salud y alegría primero.",
      },
    },
  },
  {
    slug: "teachers-day",
    style: { fontId: "mashanzheng", paperId: "letter", ink: "#1a1a1a", fontSize: 28, intensity: 0.55, align: "left", indent: true },
    i18n: {
      zh: {
        title: "教师节贺卡文案:教师节祝福语手写版",
        description: "教师节贺卡文案怎么写?「当年嫌唠叨的话,如今都成了底气」——适合发朋友圈,也适合手抄成一张真正的贺卡。",
        text: "老师,谢谢您。\n黑板上的字会擦掉,您教的道理不会。\n当年嫌您唠叨的话,如今都成了我的底气。\n教师节快乐,愿您平安顺遂。",
      },
      en: {
        title: "Teachers' Day card template",
        description: "What to write in a Teachers' Day card? \"What I once found nagging is now my confidence\" — for social posts and real handwritten cards.",
        text: "Dear teacher, thank you.\nThe chalkboard gets erased; what you taught never does.\nThe words I once found nagging are now my confidence.\nHappy Teachers' Day — wishing you peace and good health.",
      },
      ja: {
        title: "教師の日カードのテンプレート",
        description: "「当時はうるさく感じた言葉が、今の支え」——投稿にも手書きにも。",
        text: "先生、ありがとうございます。\n黒板の字は消えても、教えてくれたことは消えません。\n当時は口うるさく感じた言葉が、今の私の支えです。\n教師の日の感謝を込めて。お元気で。",
      },
      ko: {
        title: "스승의 날 카드 템플릿",
        description: "\"그때는 잔소리였던 말들이 지금의 저를 지탱합니다\" — SNS용으로도 좋아요.",
        text: "선생님, 감사합니다.\n칠판의 글씨는 지워져도 가르쳐주신 것은 지워지지 않았어요.\n당시엔 잔소리 같았던 말들이 지금의 저를 지탱합니다.\n스승의 날 축하드려요. 늘 건강하세요.",
      },
      es: {
        title: "Plantilla para el Día del Maestro",
        description: "\"Lo que entonces parecían regaños hoy son mi confianza\" — para publicar o escribir a mano.",
        text: "Querido maestro, gracias.\nLa pizarra se borra; lo que enseñó, no.\nLas palabras que entonces parecían regaños hoy son mi confianza.\nFeliz Día del Maestro: paz y salud.",
      },
    },
  },
  {
    slug: "new-year-wishes",
    style: { fontId: "mashanzheng", paperId: "blank", ink: "#8c1f28", fontSize: 36, intensity: 0.7, align: "center", indent: false },
    i18n: {
      zh: {
        title: "新年祝福语:新年贺词手写模板",
        description: "新年祝福语怎么写不俗套?旧岁的遗憾留在旧岁,新的一年眼里有光。朱红大字居中,跨年发图就是最应景的那张。",
        text: "新年快乐!\n旧岁的遗憾就留在旧岁,\n新的一年,愿你眼里有光,心里有底气,\n身体健康,万事顺遂,年年都是好年。",
      },
      en: {
        title: "New Year wishes template",
        description: "New Year wishes that aren't clichés? Leave the regrets in the old year. Big centered vermilion characters for the year-end post.",
        text: "Happy New Year!\nLeave last year's regrets in the old one.\nIn the year ahead: light in your eyes, confidence in your heart,\ngood health, smooth sailing — may every year be a good one.",
      },
      ja: {
        title: "新年の祝福テンプレート",
        description: "朱色の大きく中央揃えで、年賀投稿にぴったりな一枚に。",
        text: "あけましておめでとう!\n去年の悔しさは去年に置いてきて。\n新しい一年、瞳には光を、心には自信を。\n健康で、何もかもが順調でありますように。",
      },
      ko: {
        title: "새해 인사 템플릿",
        description: "주홍 큰 글씨 가운데 정렬, 연하장 감성 그 자체.",
        text: "새해 복 많이 받아!\n지난해의 아쉬움은 지난해에 두고 오자.\n새해에는 눈에는 빛을, 마음에는 자신감을.\n건강하고 하시는 일 모두 순조롭길, 해마다 좋은 해가 되기를.",
      },
      es: {
        title: "Plantilla de felicitación de Año Nuevo",
        description: "Grandes caracteres centrados en cinabrio: la imagen perfecta para publicar.",
        text: "¡Feliz Año Nuevo!\nDeja los arrepentimientos en el año viejo.\nPara el año nuevo: luz en los ojos, confianza en el corazón,\nsalud y que todo fluya. Que cada año sea bueno.",
      },
    },
  },
  {
    slug: "valentines-day",
    style: { fontId: "longcang", paperId: "letter", ink: "#8c1f28", fontSize: 28, intensity: 0.65, align: "left", indent: true },
    i18n: {
      zh: {
        title: "情人节文案:情人节情书模板(520/2·14 适用)",
        description: "情人节文案怎么写?喜欢这件事,藏是藏不住的。行书配朱红墨,写给唯一的人——手写比红包更打动人。",
        text: "致你:\n别人问我最近怎么样,我总想起你。\n喜欢这件事,藏是藏不住的,\n就像今天,我把它写成了字。",
      },
      en: {
        title: "Valentine's letter template",
        description: "What to write for Valentine's Day? 'Liking someone this much can't stay hidden.' Cursive in vermilion — handwriting beats red envelopes.",
        text: "To you,\nwhen people ask how I've been, I think of you.\nLiking someone this much can't stay hidden —\ntoday, I turned it into words.",
      },
      ja: {
        title: "バレンタインのテンプレート",
        description: "2·14 にも、勇気が出た日にも。行書×朱色のインクで、大切なあの人へ。",
        text: "あなたへ。\n最近どう?と聞かれると、あなたのことを考えます。\n好きという気持ちは隠せないみたい。\n今日、文字にしてみました。",
      },
      ko: {
        title: "발렌타인 레터 템플릿",
        description: "2.14에도, 용기가 생긴 날에도. 행서 + 주홍 잉크.",
        text: "너에게,\n요즘 어떻냐고 물으면 네 생각이 나.\n좋아하는 마음은 숨길 수 없나 봐.\n오늘, 글로 써 봤어.",
      },
      es: {
        title: "Plantilla de carta de San Valentín",
        description: "Para el 14 de febrero o cualquier día valiente. Cursiva en cinabrio.",
        text: "Para ti:\ncuando me preguntan cómo estoy, pienso en ti.\nGustar así no se puede ocultar —\nhoy lo convertí en palabras.",
      },
    },
  },
  {
    slug: "mothers-day",
    style: { fontId: "mashanzheng", paperId: "letter", ink: "#1a1a1a", fontSize: 28, intensity: 0.55, align: "left", indent: true },
    i18n: {
      zh: {
        title: "母亲节贺卡文案:写给妈妈的感谢信",
        description: "母亲节贺卡文案怎么写?写具体的事:小时候您牵我过马路,现在换我牵您。手写一张给妈妈,比转账截图温暖一百倍。",
        text: "妈:\n小时候您牵我过马路,现在换我牵您。\n您总说不用买礼物,那就听我啰嗦这几句:\n注意身体,按时吃饭,我爱您。",
      },
      en: {
        title: "Mother's Day card template",
        description: "What to write in a Mother's Day card? Something specific: 'you held my hand crossing streets; now it's my turn.' Warmer than any transfer.",
        text: "Mom,\nyou held my hand crossing streets; now it's my turn to hold yours.\nYou always say no gifts needed — so just hear this:\ntake care, eat well, I love you.",
      },
      ja: {
        title: "母の日のテンプレート",
        description: "言いにくい感謝を、手書きで伝える。",
        text: "お母さんへ。\n小さい頃は手を繋いでくれたね。今度は僕の番。\nプレゼントはいらないと言うけど、これだけ聞いて:\n体に気をつけて、ちゃんと食べて、愛してる。",
      },
      ko: {
        title: "어머니 날 카드 템플릿",
        description: "말하기 어려운 감사를 손글씨로 전합니다.",
        text: "엄마에게:\n어릴 땐 길 건널 때 손을 잡아줬지. 이번엔 내 차례야.\n선물 필요 없다고 하시지만 이 말만은 들어줘:\n몸 조심하고 밥 챙겨 먹고, 사랑해요.",
      },
      es: {
        title: "Plantilla para el Día de la Madre",
        description: "El agradecimiento difícil de decir, escrito para ella.",
        text: "Madre:\ncuando era pequeña me sostenías la mano al cruzar; ahora me toca a mí.\nSiempre dices que no hacen falta regalos — así que solo escucha:\ncuídate, come bien, te quiero.",
      },
    },
  },
  {
    slug: "fathers-day",
    style: { fontId: "mashanzheng", paperId: "letter", ink: "#15317e", fontSize: 28, intensity: 0.55, align: "left", indent: true },
    i18n: {
      zh: {
        title: "父亲节贺卡文案:写给沉默的父亲",
        description: "父亲节贺卡文案怎么写?和父亲的话少,更要写下来:自行车后座的风、那句「没事,再来」。硬朗楷书配蓝黑墨。",
        text: "爸:\n您话不多,但童年自行车后座的风、\n考试失利时那句「没事,再来」,我都记得。\n父亲节快乐。您老了,换我罩着您。",
      },
      en: {
        title: "Father's Day card template",
        description: "What to write in a Father's Day card? Dads say little — write it down: the bicycle wind, the 'try again' after failure. Strong script for a quiet man.",
        text: "Dad,\nyou never said much, but I remember the wind on the back of your bicycle\nand that “it's fine, try again” after every failed exam.\nHappy Father's Day. You're getting older — my turn to look after you.",
      },
      ja: {
        title: "父の日のテンプレート",
        description: "言葉少めな父に、書いて伝える。楷書×藍黒。",
        text: "お父さんへ。\n言葉少なだけど、自転車の後ろ座席の風も、\n失敗した時の「大丈夫、もう一度」も覚えてるよ。\n父の日おめでとう。今度は僕が支える番。",
      },
      ko: {
        title: "아버지 날 카드 템플릿",
        description: "말 없는 아버지께 글로 전합니다. 해서 + 청흑.",
        text: "아버지에게:\n말은 적었지만 자전거 뒤좌석의 바람도,\n시험 망친 날의 '괜찮아, 다시 해보자'도 다 기억해요.\n아버지 날 축하드려요. 이제는 제가 지켜드릴게요.",
      },
      es: {
        title: "Plantilla para el Día del Padre",
        description: "Con papá se habla poco — escríbelo. Regular en azul oscuro.",
        text: "Papá:\nnunca hablaste mucho, pero recuerdo el viento en la parrilla de tu bici\ny ese «está bien, inténtalo otra vez» tras cada examen.\nFeliz Día del Padre. Te toca a mí cuidarte.",
      },
    },
  },
  {
    slug: "graduation-message",
    style: { fontId: "longcang", paperId: "blank", ink: "#15317e", fontSize: 30, intensity: 0.7, align: "left", indent: false },
    i18n: {
      zh: {
        title: "毕业赠言怎么写?写给同学/室友(含范文)",
        description: "毕业赠言怎么写?「愿多年后再见,你还是你,我们还是我们」——写给同学、室友、一起熬过考试的人,行书白纸青春感拉满。",
        text: "致 XX:\n那年一起罚站的走廊、一起补的作业,都还历历在目。\n世界很大,我们各自去闯,\n愿多年后再见,你还是你,我们还是我们。",
      },
      en: {
        title: "Graduation message template",
        description: "What to write in a graduation message? 'May you still be you, and us still us' — for classmates, roommates, exam survivors.",
        text: "To [name],\nthe corridor detentions, the homework we copied together — still vivid.\nThe world is huge; go claim your part.\nYears from now, may you still be you, and us still us.",
      },
      ja: {
        title: "卒業メッセージのテンプレート",
        description: "送別会で言えない言葉を、卒業アルバムへ。",
        text: "〇〇へ。\n一緒に居残った教室も、寄り添った日々も、まだ鮮やかです。\n世界は広い。それぞれに行こう。\n何年か先に会っても、あなたはあなた、僕らは僕らでありますように。",
      },
      ko: {
        title: "졸업 메시지 템플릿",
        description: "졸업식에서 못 할 말을 기록으로 남깁니다.",
        text: "OO에게:\n같이 꾸중받던 복도, 같이 베낀 숙제도 아직 생생해.\n세상은 넓으니 각자 잘 지내자.\n몇 년 뒤에 만나도 너는 너, 우리는 우리였으면 좋겠어.",
      },
      es: {
        title: "Plantilla de mensaje de graduación",
        description: "Para el anuario, para quienes crecieron contigo.",
        text: "Para [nombre]:\nel pasillo de los castigos, los deberes que copiamos juntos — siguen vivos.\nEl mundo es enorme; ve a por tu parte.\nDentro de unos años, que sigas siendo tú y nosotros nosotros.",
      },
    },
  },
  {
    slug: "get-well-card",
    style: { fontId: "mashanzheng", paperId: "letter", ink: "#15317e", fontSize: 28, intensity: 0.5, align: "left", indent: true },
    i18n: {
      zh: {
        title: "慰问卡怎么写?早日康复祝福语模板",
        description: "探病祝福语怎么写?「别急着好起来,先把觉睡够」——探病不便时,一张手写慰问卡胜过千言万语。",
        text: "听说你住院了,心里一直挂念。\n别急着好起来,先把觉睡够。\n家里的事都有我们,你只管安心休养。\n等你出院,老地方,我请客。",
      },
      en: {
        title: "Get-well card template",
        description: "What to write in a get-well card? 'Don't rush to recover; sleep as much as you need.' A handwritten card says it all.",
        text: "Heard you're in hospital — thinking of you.\nDon't rush to recover; sleep as much as you need.\nEverything at home is covered. Just rest.\nWhen you're out, same place, my treat.",
      },
      ja: {
        title: "お見舞いカードのテンプレート",
        description: "お見舞いに行けない時こそ、手書きの一枚を。",
        text: "入院したと聞いて、ずっと気にかけています。\n急いで治さなくていいから、しっかり寝てください。\n家のことはみんなで守るから、安心して療養して。\n退院したら、いつもの場所でご馳走します。",
      },
      ko: {
        title: "위문 카드 템플릿",
        description: "병문안이 어려울 때 손글씨 한 장으로.",
        text: "입원했다고 들었어. 계속 마음에 걸렸어.\n빨리 나으려고 애쓰지 말고 충분히 자.\n집안 일은 우리가 다 챙길게. 너는 편안히 요양해.\n퇴원하면 그곳에서 내가 살게.",
      },
      es: {
        title: "Plantilla de tarjeta de recuperación",
        description: "Cuando visitar es difícil, una tarjeta lo dice todo.",
        text: "Supe que estás hospitalizado — te tengo presente.\nNo te apresures a sanar; duerme lo que necesites.\nEn casa todo está cubierto. Solo descansa.\nCuando salgas, el mismo lugar, invito yo.",
      },
    },
  },
  {
    slug: "wedding-congratulations",
    style: { fontId: "mashanzheng", paperId: "blank", ink: "#8c1f28", fontSize: 34, intensity: 0.7, align: "center", indent: false },
    i18n: {
      zh: {
        title: "婚礼祝福语怎么写?写给新人的手写贺词",
        description: "婚礼祝福语怎么写不俗套?「愿往后岁月,柴米油盐都是诗」——份子钱之外,一句走心的手写祝福更被记住。",
        text: "新婚快乐!\n见过你们恋爱里的笨拙与认真,\n更相信你们把日子过好的能力。\n愿往后岁月,柴米油盐都是诗。",
      },
      en: {
        title: "Wedding congratulations template",
        description: "Wedding wishes beyond the envelope? 'May the years ahead season every day well' — a handwritten line they'll actually remember.",
        text: "Congratulations on your wedding!\nI've seen the clumsiness and seriousness of your love.\nI trust you two to turn ordinary days into poetry.\nMay the years ahead season every day well.",
      },
      ja: {
        title: "結婚お祝いのテンプレート",
        description: "ご祝儀だけでなく、心に残る一言を。朱色×中央揃え。",
        text: "ご結婚おめでとう!\nお二人の恋の不器用さと真剣さを知っています。\n二人なら日常を詩に変えられると信じています。\nこれからの毎日が、よく味付けされた日々でありますように。",
      },
      ko: {
        title: "결혼 축하 템플릿",
        description: "축의금 말고 기억에 남는 한마디. 주홍 × 가운데 정렬.",
        text: "결혼 축하해!\n사랑할 때의 서툴지만 진심이던 모습 봤으니,\n평범한 날도 시로 만드는 능력을 믿어.\n앞으로의 날들, 소소한 것들이 시가 되기를.",
      },
      es: {
        title: "Plantilla de felicitación de boda",
        description: "Más allá del sobre, una frase sincera que recordarán.",
        text: "¡Felicidades por la boda!\nHe visto lo torpes y lo serios que fueron enamorándose.\nConfío en que convertirán los días comunes en poesía.\nQue los años que vienen sazonen bien cada día.",
      },
    },
  },
  {
    slug: "letter-from-santa",
    style: { fontId: "caveat", paperId: "festive", ink: "#8c1f28", fontSize: 30, intensity: 0.55, align: "left", indent: false },
    i18n: {
      zh: {
        title: "圣诞老人来信模板(手写体,可打印)",
        description: "给孩子一封「北极来的亲笔信」:手写字体配节日信纸,写上孩子这一年的闪光点,平安夜前打印放在圣诞树下。改几个字就是您家的专属来信。",
        text: "圣诞快乐!\n咳咳——是我,圣诞老人!小精灵们说你这一年又善良又爱思考,驯鹿们一致同意把你写进「好孩子名单」(我们核对了两遍)。\n平安夜记得给我留一块饼干,给驯鹿留几根胡萝卜。\n继续做那个闪闪发光的自己。\n圣诞老人 于北极",
      },
      en: {
        title: "Letter from Santa template (handwriting, printable)",
        description: "A handwritten letter from the North Pole: warm wishes in Santa's own script on festive paper. Edit a line, print it, and leave it under the tree on Christmas Eve.",
        text: "Merry Christmas!\nHo ho ho! It's me, Santa. The elves and the reindeer voted: you are officially on the Nice List (we checked it twice).\nOn Christmas Eve please leave a cookie out for me and a few carrots for the reindeer.\nKeep being curious and kind.\nSanta Claus, North Pole",
      },
      ja: {
        title: "サンタからの手紙テンプレート(手書き風・印刷OK)",
        description: "北極からの手書きのお手紙。サンタの字で祝福の一言を。文章を少し直して印刷すれば、クリスマスイブにツリーの下へ。",
        text: "メリークリスマス!\nホホホ!僕だよ、サンタだよ。トナカイたちの投票で、きみはしっかり「いい子リスト」に入っていたよ(2回確認したよ)。\nクリスマスイブにはクッキーをひとつ、トナカイにはにんじんをよろしく。\nこれからもその優しさと好奇心を大切にね。\n北極から、サンタより",
      },
      ko: {
        title: "산타 편지 템플릿(손글씨, 인쇄 가능)",
        description: "북극에서 온 손편지. 산타 글씨로 축하와 격려를 전해요. 몇 줄만 고쳐 인쇄하면 크리스마스 이브 트리 아래에.",
        text: "메리 크리스마스!\n호호호! 나야, 산타. 올 한해 친절하고 호기심 많았던 너는 만장일치로 '착한 아이 명단'에 올랐어(두 번 확인했지).\n크리스마스 이브에는 쿠키 한 조각, 순록에게는 당근 잊지 말기.\n계속 빛나는 아이로 자라거라.\n북극에서, 산타가",
      },
      es: {
        title: "Plantilla de carta de Santa (imprimible)",
        description: "Una carta manuscrita del Polo Norte con deseo y ánimo en letra de Santa. Edita, imprime y déjala bajo el árbol en Nochebuena.",
        text: "¡Feliz Navidad!\n¡Oh, oh, oh! Soy Santa. Los elfos y los renos votaron y estás en la Lista de los Buenos (la revisamos dos veces).\nEn Nochebuena no olvides dejarme una galleta, y zanahorias para los renos.\nSigue siendo tan curioso y amable.\nSanta Claus, Polo Norte",
      },
    },
  },
];

mergeI18n(TEMPLATES, EXTRA_TEMPLATE_I18N);
