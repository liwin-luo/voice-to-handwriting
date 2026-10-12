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
    "Each value is an integer from 1 to 5. 5 is best. Evidence is required, or that score is dropped.",
    "Legibility: 5 every word is readable at a first glance. 4 a few words take a pause and the page can still be read. 3 about half the words need the surrounding words to guess. 2 only a few words can be read. 1 almost nothing is readable.",
    "Size: 5 height stays steady on the line, and all-caps may score 5 when the height is consistent. 4 height is mostly steady. 3 height jumps but letter kinds still separate. 2 height jumps often. 1 heights collapse into one band.",
    "Baseline: 5 the feet of the letters share one line (the printed line if there is one, otherwise the line the writing itself makes). 4 most words sit on that line. 3 a few words float or sink as a whole. 2 many words leave the line. 1 the line has no stable landing.",
    "Spacing is one score for letter spacing and word spacing together. 5 letters sit close inside words and words sit apart, and that pattern holds. 4 spacing is mostly even. 3 some words crash together, or gaps look like a new sentence. 2 word boundaries are often unclear. 1 word boundaries are unclear. Say in the evidence whether the problem is letter spacing or word spacing.",
    "Slant: 5 the whole sample leans the same way, including upright or a consistent leftward lean. 4 the lean is mostly consistent. 3 some words lean right and some lean left. 2 the lean changes often. 1 there is no stable direction.",
    "Do not give letter shape, retracing, margins, or line spacing their own numbers. Mention a repeated letter confusion or heavy retracing only inside evidence, and only when it already hurts legibility.",
    `Also include "summary": 3 to 5 sentences in ${lang}. Say what a reader notices first, which of the four causes most helps or hurts legibility, and one concrete thing to practice next. Use only marks that are visible. Do not invent letters.`,
    'JSON shape: {"status":"scored","summary":"...","legibility":{"value":4,"evidence":"..."},"size":{"value":4,"evidence":"..."},"baseline":{"value":4,"evidence":"..."},"spacing":{"value":4,"evidence":"..."},"slant":{"value":4,"evidence":"..."}}',
  ].join("\n");
}

export type ScoreValue = 1 | 2 | 3 | 4 | 5;
export type CauseKey = "size" | "baseline" | "spacing" | "slant";
export type Score = { value: ScoreValue; evidence: string };
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

function readScore(raw: unknown): Score | null {
  if (!raw || typeof raw !== "object") return null;
  const row = raw as { value?: unknown; evidence?: unknown };
  const value = row.value;
  if (typeof value !== "number" || !Number.isInteger(value) || value < 1 || value > 5) return null;
  if (typeof row.evidence !== "string" || !row.evidence.trim()) return null;
  return { value: value as ScoreValue, evidence: row.evidence.trim().slice(0, 240) };
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
  const legibility = readScore(json.legibility);
  if (!legibility) throw new Error("no legibility");
  const summary = readSummary(json.summary);
  if (status === "too_short") return { status: "too_short", legibility, summary };
  if (status !== "scored") throw new Error("bad status");
  const causes = {
    size: readScore(json.size),
    baseline: readScore(json.baseline),
    spacing: readScore(json.spacing),
    slant: readScore(json.slant),
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
