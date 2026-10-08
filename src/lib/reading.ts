import { readFileSync } from "node:fs";
import path from "node:path";

/** 粗略阅读时长:中文按字数、拉丁按词数估算 */
export function readingMinutes(mdx: string): number {
  const plain = mdx
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#>*`[\]()!-]/g, " ")
    .replace(/\s+/g, " ");
  const cjk = (plain.match(/[\u3400-\u9fff\u3040-\u30ff\uac00-\ud7af]/g) ?? []).length;
  const words = plain.replace(/[\u3400-\u9fff\u3040-\u30ff\uac00-\ud7af]/g, " ").trim().split(/\s+/).filter(Boolean).length;
  const minutes = cjk / 400 + words / 200;
  return Math.max(1, Math.round(minutes));
}

/** 统计某篇文章在指定语言的 MDX 源文件;文件缺失时按 1 分钟处理 */
export function postReadingMinutes(slug: string, locale: string): number {
  try {
    return readingMinutes(readFileSync(path.join(process.cwd(), `src/content/blog/${slug}.${locale}.mdx`), "utf8"));
  } catch {
    return 1;
  }
}
