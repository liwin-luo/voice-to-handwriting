import { mulberry32 } from "@/engine/jitter";

/** 每日草书练习的内容池与抽取逻辑。
 *  daily seed:同一日期 + 同一级别,全球用户拿到同一份练习(纯函数,可测试)。
 *  练习内容本身是英文(练的就是英文草书),UI 文案走 i18n。 */

export type DailyLevel = "kids" | "adults";

export interface LetterGroup {
  /** 当日连笔字母钻(3 个字母,如 "cad"),渲染成重复钻串 */
  letters: string;
  words: string[];
}

/** 笔画热身:重复字母即草书连笔圈,首遍深色、其余描灰 */
export const WARMUPS: string[] = [
  "lll fff ttt",
  "eee lll hhh",
  "ooo ddd ccc",
  "mmm nnn uuu",
  "aa gg dd",
  "oo ww vv",
  "pp bb rr",
  "kk hhh kkk",
  "uuu yyy zzz",
  "iii jjj ttt",
  "sss ccc eee",
  "nnn mmm hhh",
];

/** 可连笔字母组:每日抽 2 组,C(12,2)=66 种组合,约 2 个月不重样 */
export const LETTER_GROUPS: LetterGroup[] = [
  { letters: "cad", words: ["cat", "dad", "sad", "add", "candle", "garden", "dance", "card"] },
  { letters: "own", words: ["down", "town", "brown", "crown", "owl", "gown", "snow", "flower"] },
  { letters: "str", words: ["star", "stop", "story", "string", "first", "sister", "storm", "tree"] },
  { letters: "elh", words: ["hello", "help", "held", "shell", "hill", "well", "leaf", "helmet"] },
  { letters: "igt", words: ["pig", "big", "gift", "tiger", "night", "right", "eight", "wing"] },
  { letters: "unm", words: ["sun", "run", "man", "nut", "moon", "mint", "number", "uniform"] },
  { letters: "pbr", words: ["pen", "bag", "big", "red", "run", "bread", "present", "rabbit"] },
  { letters: "fjk", words: ["fan", "fish", "five", "kite", "kind", "jump", "just", "frog"] },
  { letters: "vy", words: ["very", "every", "five", "give", "family", "hungry", "seven", "lazy"] },
  { letters: "adg", words: ["add", "dad", "glad", "garden", "dragon", "badge", "magic", "grain"] },
  { letters: "col", words: ["cold", "color", "close", "coal", "clock", "school", "circle", "lion"] },
  { letters: "sep", words: ["set", "stop", "pen", "soup", "super", "sleep", "ship", "open"] },
];

export const KID_SENTENCES: string[] = [
  "The sun is bright today.",
  "I like to read new books.",
  "My dog runs very fast.",
  "We play in the park.",
  "The cat sleeps on my bed.",
  "Apples are sweet and red.",
  "My best friend is kind.",
  "Birds sing in the morning.",
  "I can write in cursive.",
  "The moon glows at night.",
  "Fish swim in the pond.",
  "Grandma makes warm soup.",
  "The bus comes at eight.",
  "I love rainy days.",
  "Snow falls in winter.",
  "Bees visit every flower.",
  "My kite flies so high.",
  "We walk to school.",
  "The stars are out tonight.",
  "Frogs jump near the lake.",
  "Milk helps me grow strong.",
  "I draw pictures of trees.",
  "The wind moves the leaves.",
  "Slow and steady wins.",
  "Try again and again.",
  "Practice makes progress.",
  "Kind words cost nothing.",
  "I help set the table.",
  "My boots are by the door.",
  "The farm has ten cows.",
  "Bread smells so good.",
  "We picked red berries.",
  "The lamp gives soft light.",
  "Rivers run to the sea.",
  "I feed my fish each day.",
  "Spring brings new buds.",
  "My hat blew off in the wind.",
  "Good nights end with stories.",
];

export const ADULT_SENTENCES: string[] = [
  "Practice makes perfect.",
  "The early bird catches the worm.",
  "Every cloud has a silver lining.",
  "Actions speak louder than words.",
  "Where there is a will, there is a way.",
  "Slow and steady wins the race.",
  "Honesty is the best policy.",
  "A journey of a thousand miles begins with a single step.",
  "Rome was not built in a day.",
  "Fortune favors the bold.",
  "Knowledge is power.",
  "Time waits for no one.",
  "Well begun is half done.",
  "A friend in need is a friend indeed.",
  "Look before you leap.",
  "The pen is mightier than the sword.",
  "Necessity is the mother of invention.",
  "When in Rome, do as the Romans do.",
  "Do not count your chickens before they hatch.",
  "A picture is worth a thousand words.",
  "Better late than never.",
  "Two heads are better than one.",
  "Still waters run deep.",
  "You reap what you sow.",
  "Absence makes the heart grow fonder.",
  "All that glitters is not gold.",
  "Patience is a virtue.",
  "Variety is the spice of life.",
  "Experience is the best teacher.",
  "Great minds think alike.",
  "It is never too late to learn.",
  "Little strokes fell great oaks.",
  "Make hay while the sun shines.",
  "No pain, no gain.",
  "Nothing ventured, nothing gained.",
  "One good turn deserves another.",
  "Practice what you preach.",
  "Silence is golden.",
  "Strike while the iron is hot.",
  "The best things in life are free.",
  "There is no place like home.",
  "Too many cooks spoil the broth.",
  "Waste not, want not.",
  "You cannot judge a book by its cover.",
  "A watched pot never boils.",
  "Good things come to those who wait.",
  "The darkest hour is just before the dawn.",
];

function hashStr(s: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h >>> 0;
}

export function toDateStr(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** 某日期所在周的周一到周日(本地时区) */
export function weekDates(d: Date): string[] {
  const monday = new Date(d);
  monday.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  const out: string[] = [];
  for (let i = 0; i < 7; i++) {
    const cur = new Date(monday);
    cur.setDate(monday.getDate() + i);
    out.push(toDateStr(cur));
  }
  return out;
}

export interface DailySheet {
  dateStr: string;
  warmup: string;
  groups: [LetterGroup, LetterGroup];
  words: [string, string, string];
  sentence: string;
}

/** 确定性抽取:同 (日期, 级别) 永远同一份 */
export function dailyPick(dateStr: string, level: DailyLevel): DailySheet {
  const rand = mulberry32(hashStr(`${dateStr}|${level}`));
  const gi1 = Math.floor(rand() * LETTER_GROUPS.length);
  let gi2 = Math.floor(rand() * (LETTER_GROUPS.length - 1));
  if (gi2 >= gi1) gi2 += 1;
  const g1 = LETTER_GROUPS[gi1];
  const g2 = LETTER_GROUPS[gi2];
  const w1 = g1.words[Math.floor(rand() * g1.words.length)];
  const wi2 = Math.floor(rand() * g2.words.length);
  const w2 = g2.words[wi2];
  const w3 = g2.words[(wi2 + 1 + Math.floor(rand() * (g2.words.length - 1))) % g2.words.length];
  const pool = level === "kids" ? KID_SENTENCES : ADULT_SENTENCES;
  return {
    dateStr,
    warmup: WARMUPS[Math.floor(rand() * WARMUPS.length)],
    groups: [g1, g2],
    words: [w1, w2, w3],
    sentence: pool[Math.floor(rand() * pool.length)],
  };
}
