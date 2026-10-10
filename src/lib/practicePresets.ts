/** 数字描红和连笔字母对的预填行。一行一个练习项。 */

export function numberLines(count: number): string {
  const n = Math.min(20, Math.max(1, Math.floor(count)));
  return Array.from({ length: n }, (_, i) => String(i + 1)).join("\n");
}

/** 先练同向的连笔，再练换向的。每组都是两个字母，方便一页只重复这一对。 */
export const CURSIVE_JOIN_GROUPS = {
  same: ["th", "ch", "sh", "wh", "oo", "ee", "ll", "ss"],
  turn: ["ai", "ay", "ou", "ow", "oa", "ea", "ir", "er"],
} as const;

export function joinLines(pairs: readonly string[]): string {
  return pairs.join("\n");
}
