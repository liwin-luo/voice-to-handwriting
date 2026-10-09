/** /cursive-font-generator 的 SVG 导出。
 *  把 cn-font-split 结果里覆盖 U+0041 的那一片 woff2 以 data URI 嵌进 SVG,
 *  这样纹身稿和设计软件不依赖本机是否安装了字体。纯字符串,无 DOM。 */

const ESC: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" };

export function xmlEscape(value: string): string {
  return value.replace(/[&<>"]/g, (ch) => ESC[ch]);
}

/** unicode-range 是否覆盖码位。只认 U+41 与 U+20-7E 这种写法。 */
export function rangeCovers(unicodeRange: string, codePoint: number): boolean {
  for (const part of unicodeRange.split(",")) {
    const match = part.trim().match(/U\+([0-9A-Fa-f]+)(?:-([0-9A-Fa-f]+))?/i);
    if (!match) continue;
    const start = Number.parseInt(match[1], 16);
    const end = match[2] ? Number.parseInt(match[2], 16) : start;
    if (codePoint >= start && codePoint <= end) return true;
  }
  return false;
}

function weightIncludes400(raw: string): boolean {
  const weight = raw.trim();
  if (weight === "400" || weight === "normal") return true;
  const span = weight.match(/^(\d+)\s+(\d+)$/);
  return span != null && Number(span[1]) <= 400 && 400 <= Number(span[2]);
}

/** 从 result.css 里挑出覆盖拉丁字母 A、且字重含 400 的 woff2 相对路径。 */
export function latinSubsetUrl(css: string): string | null {
  let fallback: string | null = null;
  for (const face of css.split("@font-face").slice(1)) {
    const range = face.match(/unicode-range\s*:\s*([^;}]+)/i)?.[1] ?? "";
    const url = face.match(/url\(\s*["']?([^"')]+\.woff2)["']?\s*\)/i)?.[1];
    if (!url || !rangeCovers(range, 0x41)) continue;
    const weight = face.match(/font-weight\s*:\s*([^;}]+)/i)?.[1] ?? "400";
    if (weightIncludes400(weight)) return url;
    fallback ??= url;
  }
  return fallback;
}

export function buildCursiveSvg(opts: {
  lines: string[];
  family: string;
  size: number;
  ink: string;
  /** null 表示透明底,不画矩形 */
  bg: string | null;
  width: number;
  height: number;
  pad: number;
  lineH: number;
  fontBase64: string;
}): string {
  const family = xmlEscape(opts.family);
  const b64 = opts.fontBase64.replace(/[^A-Za-z0-9+/=]/g, "");
  const texts = opts.lines
    .map(
      (line, i) =>
        `<text x="${opts.pad}" y="${opts.pad + opts.size + i * opts.lineH}" fill="${xmlEscape(opts.ink)}" font-family="${family}" font-size="${opts.size}">${xmlEscape(line)}</text>`,
    )
    .join("");
  const rect = opts.bg == null ? "" : `<rect width="100%" height="100%" fill="${xmlEscape(opts.bg)}"/>`;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${opts.width}" height="${opts.height}" viewBox="0 0 ${opts.width} ${opts.height}">
<defs><style>@font-face{font-family:"${family}";src:url("data:font/woff2;base64,${b64}") format("woff2");font-weight:400;font-style:normal;}</style></defs>
${rect}${texts}
</svg>`;
}
