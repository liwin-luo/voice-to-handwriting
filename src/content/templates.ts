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
  i18n: Record<Locale, { title: string; description: string; text: string }>;
}

export function getTemplate(slug: string): HandwritingTemplate | undefined {
  return TEMPLATES.find((t) => t.slug === slug);
}

/** 场景模板:文案 + 配套样式。新模板:在 TEMPLATES 加一项并在 sitemap 补 URL */
export const TEMPLATES: HandwritingTemplate[] = [
  {
    slug: "love-letter",
    style: { fontId: "longcang", paperId: "letter", ink: "#15317e", fontSize: 28, intensity: 0.6, align: "left", indent: true },
    i18n: {
      zh: {
        title: "情书模板:写一封手写情书",
        description: "当面说不出口的话,写下来刚刚好。行书配信纸,含蓄又真诚。",
        text: "见字如面。\n有些话当面说不出口,写下来刚刚好。\n遇见你之后,平凡的日子都有了光。\n往后的路,想和你一起走。",
      },
      en: {
        title: "Love letter template",
        description: "Words easier written than said. Running script on letter paper — subtle and sincere.",
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
        title: "道歉信模板:诚恳的道歉怎么写",
        description: "承认、共情、给出行动。楷书黑墨,一字一句都是认真。",
        text: "对不起。\n那天是我的态度不好,话出口我就后悔了。\n这几天我想了很多,也明白了你的感受。\n希望能当面向你道歉,继续做彼此珍惜的人。",
      },
      en: {
        title: "Apology letter template",
        description: "Own it, empathize, offer action. Regular script in black ink — sincerity in every stroke.",
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
        title: "感谢信模板:把谢谢写得有分量",
        description: "具体回忆 + 祝福回礼,感谢才不流于客套。行书信纸。",
        text: "谢谢您。\n那些帮过我忙、教过我道理的瞬间,我一直记得。\n您的善意没有随时间过去,反而越来越清晰。\n愿您被同样的温柔对待。",
      },
      en: {
        title: "Thank-you letter template",
        description: "Specific memories plus a blessing — gratitude that isn't small talk.",
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
        title: "生日祝福模板:手写生日贺卡",
        description: "居中排版 + 朱红墨色,祝福自带喜庆感,导出就能发。",
        text: "生日快乐!\n愿你所有的努力都有回响,\n想做的事都来得及,想见的人都在身边。\n新的一岁,健康和快乐都要排第一。",
      },
      en: {
        title: "Birthday wishes template",
        description: "Centered layout in vermilion ink — festive, ready to send.",
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
        title: "教师节贺卡模板:写给老师的感谢",
        description: "「当年嫌唠叨的话,如今都成了底气」——适合发圈也适合手抄。",
        text: "老师,谢谢您。\n黑板上的字会擦掉,您教的道理不会。\n当年嫌您唠叨的话,如今都成了我的底气。\n教师节快乐,愿您平安顺遂。",
      },
      en: {
        title: "Teachers' Day card template",
        description: "\"What I once found nagging is now my confidence\" — for posts and for handwriting.",
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
        title: "新年祝福模板:新年贺词手写版",
        description: "朱红大字居中,过年发图就是最应景的那张。",
        text: "新年快乐!\n旧岁的遗憾就留在旧岁,\n新的一年,愿你眼里有光,心里有底气,\n身体健康,万事顺遂,年年都是好年。",
      },
      en: {
        title: "New Year wishes template",
        description: "Big centered vermilion characters — the most fitting image to post.",
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
];
