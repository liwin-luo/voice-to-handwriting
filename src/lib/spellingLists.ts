/** 教师常用词表。点一下填进 Word Work，填完仍可删改。
 *  Dolch pre-primer 是幼儿园 sight words 的起点；Fry 按词频，前 100 是课堂最常印的一截。 */

export const DOLCH_PREPRIMER = [
  "a", "and", "away", "big", "blue", "can", "come", "down", "find", "for",
  "funny", "go", "help", "here", "I", "in", "is", "it", "jump", "little",
  "look", "make", "me", "my", "not", "one", "play", "red", "run", "said",
  "see", "the", "three", "to", "two", "up", "we", "where", "yellow", "you",
];

/** Edward Fry 第一百词，顺序即原表。 */
export const FRY_100 = [
  "the", "of", "and", "a", "to", "in", "is", "you", "that", "it",
  "he", "was", "for", "on", "are", "as", "with", "his", "they", "I",
  "at", "be", "this", "have", "from", "or", "one", "had", "by", "words",
  "but", "not", "what", "all", "were", "we", "when", "your", "can", "said",
  "there", "use", "an", "each", "which", "she", "do", "how", "their", "if",
  "will", "up", "other", "about", "out", "many", "then", "them", "these", "so",
  "some", "her", "would", "make", "like", "him", "into", "time", "has", "look",
  "two", "more", "write", "go", "see", "number", "no", "way", "could", "people",
  "my", "than", "first", "water", "been", "called", "who", "am", "its", "now", "find",
  "long", "down", "day", "did", "get", "come", "made", "may", "part",
];

export const SPELLING_LISTS = [
  { id: "dolch", words: DOLCH_PREPRIMER },
  { id: "fry25", words: FRY_100.slice(0, 25) },
  { id: "fry100", words: FRY_100 },
] as const;

export type SpellingListId = (typeof SPELLING_LISTS)[number]["id"];

/** 文本框内容和某份词表逐行一致(忽略空行)时,对应按钮保持按下。 */
export function spellingListMatches(text: string, words: readonly string[]): boolean {
  const lines = text.split("\n").map((line) => line.trim()).filter(Boolean);
  return lines.length === words.length && lines.every((line, i) => line === words[i]);
}
