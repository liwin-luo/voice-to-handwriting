import type { Locale } from "@/i18n/routing";

const NOTE_LANG: Record<Locale, string> = {
  en: "English",
  es: "Spanish",
  fr: "French",
  de: "German",
  pt: "Portuguese",
  zh: "Chinese",
  ja: "Japanese",
  ko: "Korean",
};

/** 看不清的记号。计数前先剥掉,本身不加进字数。 */
export const ILLEGIBLE_MARK = "\u25A1";
const TRANSCRIPT_MAX = 8000;
const NOTE_MAX = 240;

export function buildCountPrompt(locale: string): string {
  const lang = NOTE_LANG[locale as Locale] ?? "English";
  return [
    "You transcribe one photo of handwriting. Reply with JSON only.",
    "Transcribe only handwritten marks. Skip printed headers, page numbers, ruling lines, and printed instructions when you can tell them apart.",
    'If the page is entirely printed or typed, with no handwriting, return {"status":"empty"}.',
    "Do not include words that are crossed out.",
    "Do not correct spelling. Do not translate. Do not fill in strokes you cannot see.",
    "Where a mark is unreadable, write one □ for that spot.",
    "Keep line breaks. Do not insert spaces between Chinese, Japanese, or Korean characters. Keep spaces between words in alphabetic writing.",
    "Write digits as digits. Keep Chinese numerals as Chinese characters. Write Hangul as syllable blocks, not jamo.",
    'If the photo is blurry, cropped through the writing, or badly glared, return {"status":"retake"}.',
    `Otherwise return {"status":"counted","transcript":"...","note":"..."}. Include note only when you skipped crossed-out writing or printed text. One short sentence in ${lang}. Omit note otherwise.`,
  ].join("\n");
}

export type Counts = {
  cjk: number;
  words: number;
  latinLetters: number;
  otherLetters: number;
  digits: number;
  punctuation: number;
  illegible: number;
  other: number;
};

export type CountResult =
  | { status: "counted"; transcript: string; note: string; truncated: boolean; counts: Counts }
  | { status: "empty" }
  | { status: "retake" };

type Kind = "cjk" | "latin" | "otherLetter" | "digit" | "punct" | "skip" | "other";

function isHangulSyllable(cp: number): boolean {
  return cp >= 0xac00 && cp <= 0xd7a3;
}

function isHangulJamo(cp: number): boolean {
  return (
    (cp >= 0x1100 && cp <= 0x11ff) ||
    (cp >= 0xa960 && cp <= 0xa97c) ||
    (cp >= 0xd7b0 && cp <= 0xd7fb) ||
    (cp >= 0x3130 && cp <= 0x318f)
  );
}

function kind(ch: string): Kind {
  if (ch === "\u30fc") return "cjk";
  if (/^\p{Script=Han}$/u.test(ch) || /^\p{Script=Hiragana}$/u.test(ch) || /^\p{Script=Katakana}$/u.test(ch)) return "cjk";
  const cp = ch.codePointAt(0) ?? 0;
  if (isHangulSyllable(cp) || isHangulJamo(cp)) return "cjk";
  if (/^\p{L}$/u.test(ch) && /^\p{Script=Latin}$/u.test(ch)) return "latin";
  if (/^\p{L}$/u.test(ch)) return "otherLetter";
  if (/^\p{Nd}$/u.test(ch)) return "digit";
  if (/^\p{P}$/u.test(ch)) return "punct";
  if (/^\p{Z}$/u.test(ch) || /^\p{C}$/u.test(ch)) return "skip";
  return "other";
}

function isConnector(ch: string): boolean {
  return ch === "'" || ch === "\u2019" || ch === "-";
}

export function emptyCounts(): Counts {
  return { cjk: 0, words: 0, latinLetters: 0, otherLetters: 0, digits: 0, punctuation: 0, illegible: 0, other: 0 };
}

export function hasMarks(counts: Counts): boolean {
  return counts.cjk + counts.words + counts.latinLetters + counts.otherLetters + counts.digits + counts.punctuation + counts.illegible + counts.other > 0;
}

/**
 * ponytail: 句点会把 e.g. 切成两个词;谚文若被拆成 jamo,每个字母算 1 字。
 * 升级路径是分词器,不是这一版。
 */
export function countTranscript(text: string): Counts {
  const counts = emptyCounts();
  let body = "";
  for (const ch of text.normalize("NFC")) {
    if (ch === ILLEGIBLE_MARK) counts.illegible += 1;
    else body += ch;
  }
  let inWord = false;
  let pendingConnector = false;
  for (const ch of body) {
    const k = kind(ch);
    if (k === "cjk") counts.cjk += 1;
    else if (k === "latin") counts.latinLetters += 1;
    else if (k === "otherLetter") counts.otherLetters += 1;
    else if (k === "digit") counts.digits += 1;
    else if (k === "punct") counts.punctuation += 1;
    else if (k === "other") counts.other += 1;

    const letter = k === "latin" || k === "otherLetter";
    if (letter) {
      if (!inWord) counts.words += 1;
      inWord = true;
      pendingConnector = false;
    } else if (isConnector(ch) && inWord && !pendingConnector) {
      pendingConnector = true;
    } else {
      inWord = false;
      pendingConnector = false;
    }
  }
  return counts;
}

export function parseCountResponse(raw: string): CountResult {
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start < 0 || end <= start) throw new Error("no json");
  let json: { status?: unknown; transcript?: unknown; note?: unknown };
  try {
    json = JSON.parse(raw.slice(start, end + 1));
  } catch {
    throw new Error("no json");
  }
  if (json.status === "retake") return { status: "retake" };
  const transcriptRaw = typeof json.transcript === "string" ? json.transcript : "";
  const truncated = transcriptRaw.length > TRANSCRIPT_MAX;
  const transcript = transcriptRaw.slice(0, TRANSCRIPT_MAX);
  const counts = countTranscript(transcript);
  if (!hasMarks(counts)) return { status: "empty" };
  const note = typeof json.note === "string" ? json.note.replace(/\s+/g, " ").trim().slice(0, NOTE_MAX) : "";
  return { status: "counted", transcript, note, truncated, counts };
}

export const LOCAL_USAGE_KEY = "vth-handwriting-count";
