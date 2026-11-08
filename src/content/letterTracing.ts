/** 单字母预填:`?words=` 优先,否则 `?letter=a` 预填一个小写字母。
 *  原 /letter-tracing 描红矩阵已下线(2026-11 GSC 砍单),本模块只剩
 *  TracingGenerator(?letter= 预填入口)还在用的这一个函数。 */

/** `?words=` 优先;否则单个拉丁字母 `?letter=a` 预填小写。认不出就不动输入框。 */
export function tracingPrefill(search: string): string | null {
  const params = new URLSearchParams(search);
  const words = params.get("words")?.trim();
  if (words) return words;
  const letter = params.get("letter")?.trim() ?? "";
  if (/^[a-z]$/i.test(letter)) return letter.toLowerCase();
  return null;
}
