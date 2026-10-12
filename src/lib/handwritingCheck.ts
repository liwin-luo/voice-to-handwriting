import type { Locale } from "@/i18n/routing";

/** 智谱模型 id。`custom/` 前缀是别的项目的写法,直连时去掉。 */
export function glmModelId(raw: string): string {
  return raw.trim().replace(/^custom\//, "") || "glm-5.3-flash";
}

const EVIDENCE_LANG: Record<Locale, string> = {
  en: "English",
  es: "Spanish",
  fr: "French",
  de: "German",
  pt: "Portuguese",
  zh: "Chinese",
  ja: "Japanese",
  ko: "Korean",
};

export function buildCheckPrompt(locale: string): string {
  const lang = EVIDENCE_LANG[locale as Locale] ?? "English";
  return [
    "You score one photo of handwriting. Reply with JSON only.",
    `Write every evidence string in ${lang}. Give one short example that is visible in the photo. Do not invent letters you cannot read. An unreadable word counts as illegible; do not fill in missing strokes and then score the completed guess.`,
    "This is an impression from a photo, not a clinical test. Do not diagnose. Do not discuss personality, pressure, speed, or stroke order. Do not compare the writing to a font.",
    'If the writing is mainly Chinese, Japanese, Korean, or another non-Latin script, return {"status":"unsupported_script"}.',
    'If the photo is blurry, cropped through the letters, or badly glared, return {"status":"retake"}.',
    'If there are fewer than two full lines of writing, return {"status":"too_short","legibility":{"value":1,"evidence":"..."},"summary":"..."} and omit the other scores. Replace the sample numbers with your scores.',
    "Otherwise return status scored with all five scores.",
    "Size, baseline, spacing, and slant are integers from 1 to 5. 5 is best. Evidence is required, or that score is dropped.",
    "Legibility is the overall impression, from 1.0 to 5.0 with one decimal place. It is not the average of the other four.",
    "A typical adult note is 3.2 to 3.8. A clear note with one or two slips is 4.0 to 4.4. 4.5 to 4.7 is already unusually even. Use 4.8 or 4.9 only when you would not move a single letter, and only when the other four scores are all 5. Do not write 5.",
    "Legibility bands: 5 every word is readable at a first glance. 4 a few words take a pause and the page can still be read. 3 about half the words need the surrounding words to guess. 2 only a few words can be read. 1 almost nothing is readable.",
    "Size: 5 height stays steady on the line, and all-caps may score 5 when the height is consistent. 4 height is mostly steady. 3 height jumps but letter kinds still separate. 2 height jumps often. 1 heights collapse into one band.",
    "Baseline: 5 the feet of the letters share one line (the printed line if there is one, otherwise the line the writing itself makes). 4 most words sit on that line. 3 a few words float or sink as a whole. 2 many words leave the line. 1 the line has no stable landing.",
    "Spacing is one score for letter spacing and word spacing together. 5 letters sit close inside words and words sit apart, and that pattern holds. 4 spacing is mostly even. 3 some words crash together, or gaps look like a new sentence. 2 word boundaries are often unclear. 1 word boundaries are unclear. Say in the evidence whether the problem is letter spacing or word spacing.",
    "Slant: 5 the whole sample leans the same way, including upright or a consistent leftward lean. 4 the lean is mostly consistent. 3 some words lean right and some lean left. 2 the lean changes often. 1 there is no stable direction.",
    "Do not give letter shape, retracing, margins, or line spacing their own numbers. Mention a repeated letter confusion or heavy retracing only inside evidence, and only when it already hurts legibility.",
    `Also include "summary": 3 to 5 sentences in ${lang}. Say what a reader notices first, which of the four causes most helps or hurts legibility, and one concrete thing to practice next. Use only marks that are visible. Do not invent letters.`,
    'JSON shape: {"status":"scored","summary":"...","legibility":{"value":4.2,"evidence":"..."},"size":{"value":4,"evidence":"..."},"baseline":{"value":4,"evidence":"..."},"spacing":{"value":4,"evidence":"..."},"slant":{"value":4,"evidence":"..."}}',
  ].join("\n");
}

export type ScoreValue = 1 | 2 | 3 | 4 | 5;
export type CauseKey = "size" | "baseline" | "spacing" | "slant";
export type Score = { value: number; evidence: string };
export type Causes = Record<CauseKey, Score | null>;

export type CheckResult =
  | ({ status: "scored"; legibility: Score; summary: string } & Record<CauseKey, Score>)
  | ({ status: "partial"; legibility: Score; summary: string } & Causes)
  | { status: "too_short"; legibility: Score; summary: string }
  | { status: "retake" }
  | { status: "unsupported_script" };

const CAUSES: CauseKey[] = ["size", "baseline", "spacing", "slant"];
/** 并列时按这个顺序取第一个:贴线、大小、间距、斜度。 */
const TIE_ORDER: CauseKey[] = ["baseline", "size", "spacing", "slant"];

function readSummary(raw: unknown): string {
  if (typeof raw !== "string") return "";
  return raw.replace(/\s+/g, " ").trim().slice(0, 480);
}

function roundTenth(value: number): number {
  return Math.round(value * 10) / 10;
}

function readCause(raw: unknown): Score | null {
  const score = readMarked(raw);
  if (!score || !Number.isInteger(score.value) || score.value < 1 || score.value > 5) return null;
  return score;
}

function readLegibility(raw: unknown): Score | null {
  const score = readMarked(raw);
  if (!score || score.value < 1 || score.value > 5) return null;
  return { ...score, value: roundTenth(score.value) };
}

function readMarked(raw: unknown): Score | null {
  if (!raw || typeof raw !== "object") return null;
  const row = raw as { value?: unknown; evidence?: unknown };
  const value = row.value;
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  if (typeof row.evidence !== "string" || !row.evidence.trim()) return null;
  return { value, evidence: row.evidence.trim().slice(0, 240) };
}

/**
 * 好认显示到一位小数。JSON 里的 5 和 5.0 分不开,模型随手给的满分收到 4.7。
 * 4.8 和 4.9 只有四项原因都是 5 才保留,所以这一档只留给极少数样本。
 */
export function shownLegibility(value: number, causes: Array<number | null>): number {
  let shown = roundTenth(value);
  if (shown >= 5) shown = 4.7;
  const present = causes.filter((item): item is number => item != null);
  const rare = present.length === 4 && present.every((item) => item === 5);
  if (shown >= 4.8 && !rare) shown = 4.7;
  return shown;
}

/** 固定曲线,不是线上真实人数。4.8 超越 98%,也就是大约 2% 的人到得了。 */
const BEATEN: Array<[number, number]> = [
  [1.0, 0],
  [2.0, 8],
  [2.5, 16],
  [3.0, 28],
  [3.5, 46],
  [4.0, 66],
  [4.3, 80],
  [4.5, 88],
  [4.6, 92],
  [4.7, 96],
  [4.8, 98],
  [4.9, 99],
  [5.0, 99],
];

export function beatenPercent(value: number): number {
  const score = Math.min(5, Math.max(1, roundTenth(value)));
  let lower = BEATEN[0]!;
  let upper = BEATEN[BEATEN.length - 1]!;
  for (let i = 0; i < BEATEN.length - 1; i++) {
    const left = BEATEN[i]!;
    const right = BEATEN[i + 1]!;
    if (score >= left[0] && score <= right[0]) {
      lower = left;
      upper = right;
      break;
    }
  }
  if (upper[0] === lower[0]) return lower[1];
  const ratio = (score - lower[0]) / (upper[0] - lower[0]);
  return Math.round(lower[1] + (upper[1] - lower[1]) * ratio);
}

export function formatScore(value: number): string {
  return roundTenth(value).toFixed(1);
}

export function anchorLevel(value: number): ScoreValue {
  return Math.min(5, Math.max(1, Math.round(value))) as ScoreValue;
}

export function parseCheckResponse(raw: string): CheckResult {
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start < 0 || end <= start) throw new Error("no json");
  let json: { status?: unknown; summary?: unknown; legibility?: unknown; size?: unknown; baseline?: unknown; spacing?: unknown; slant?: unknown };
  try {
    json = JSON.parse(raw.slice(start, end + 1));
  } catch {
    throw new Error("no json");
  }
  const status = json.status;
  if (status === "retake") return { status: "retake" };
  if (status === "unsupported_script") return { status: "unsupported_script" };
  const legibilityRaw = readLegibility(json.legibility);
  if (!legibilityRaw) throw new Error("no legibility");
  const summary = readSummary(json.summary);
  if (status === "too_short") {
    return { status: "too_short", summary, legibility: { ...legibilityRaw, value: shownLegibility(legibilityRaw.value, []) } };
  }
  if (status !== "scored") throw new Error("bad status");
  const causes = {
    size: readCause(json.size),
    baseline: readCause(json.baseline),
    spacing: readCause(json.spacing),
    slant: readCause(json.slant),
  };
  const legibility = {
    ...legibilityRaw,
    value: shownLegibility(legibilityRaw.value, CAUSES.map((key) => causes[key]?.value ?? null)),
  };
  if (CAUSES.every((key) => causes[key])) {
    return { status: "scored", summary, legibility, size: causes.size!, baseline: causes.baseline!, spacing: causes.spacing!, slant: causes.slant! };
  }
  return { status: "partial", summary, legibility, ...causes };
}

export function weakestCause(causes: Causes): CauseKey | null {
  let best: { key: CauseKey; value: number } | null = null;
  for (const key of TIE_ORDER) {
    const score = causes[key];
    if (!score) continue;
    if (!best || score.value < best.value) best = { key, value: score.value };
  }
  return best?.key ?? null;
}

export type ShareableCheck = Extract<CheckResult, { status: "scored" | "partial" | "too_short" }>;

/** 能给出观感分就可以分享。重拍、非拉丁字母不出卡片。 */
export function canShareCard(result: CheckResult): result is ShareableCheck {
  return result.status === "scored" || result.status === "partial" || result.status === "too_short";
}

export function causeScore(result: ShareableCheck, key: CauseKey): Score | null {
  if (result.status === "too_short") return null;
  return result[key];
}

/** 模型有时把 content 做成字符串,有时做成带 text 的块。 */
export function readModelContent(data: unknown): string {
  const content = (data as { choices?: Array<{ message?: { content?: unknown } }> })?.choices?.[0]?.message?.content;
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return "";
  return content
    .map((part) => {
      if (typeof part === "string") return part;
      if (part && typeof part === "object" && typeof (part as { text?: unknown }).text === "string") {
        return (part as { text: string }).text;
      }
      return "";
    })
    .join("");
}

export const DAILY_LIMIT = 3;
export const LOCAL_USAGE_KEY = "vth-handwriting-check";

/** 浏览器本地日历日。第二天 0 点换一天,当天次数作废。 */
export function calendarDay(now = new Date()): string {
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const date = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${date}`;
}

export function readsLeft(count: number): number {
  return Math.max(0, DAILY_LIMIT - count);
}

function savedCount(saved: string | null, day: string): number {
  if (!saved) return 0;
  try {
    const parsed = JSON.parse(saved) as { day?: unknown; count?: unknown };
    if (parsed.day !== day || typeof parsed.count !== "number" || !Number.isInteger(parsed.count) || parsed.count < 0) return 0;
    return parsed.count;
  } catch {
    return 0;
  }
}

export function usageLeft(saved: string | null, day: string): number {
  return readsLeft(savedCount(saved, day));
}

/** 记一次。换日从 1 开始。返回写回本地的字符串。 */
export function recordUsage(saved: string | null, day: string): string {
  return JSON.stringify({ day, count: savedCount(saved, day) + 1 });
}

export type SocialTarget = "x" | "facebook" | "whatsapp" | "pinterest" | "email";

/** 社交平台的官方分享链接。图片不上传,帖子带分数文案和本页地址。 */
export function socialIntent(target: SocialTarget, text: string, url: string): string {
  const encodedText = encodeURIComponent(text);
  const encodedUrl = encodeURIComponent(url);
  if (target === "x") return `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
  if (target === "facebook") return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  if (target === "whatsapp") return `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`;
  if (target === "pinterest") return `https://www.pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedText}`;
  return `mailto:?subject=${encodedText}&body=${encodeURIComponent(`${text}\n${url}`)}`;
}
