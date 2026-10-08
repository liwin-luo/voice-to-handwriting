import type { FontId } from "@/stores/useEditorStore";

const ALL_FONT_IDS: FontId[] = [
  "mashanzheng",
  "lxgwwenkai",
  "longcang",
  "zhimangxing",
  "liujianmaocao",
  "zcoolkuaile",
  "caveat",
  "patrickhand",
  "kalam",
  "indieflower",
  "dancingscript",
  "cedarvillecursive",
  "kleeone",
  "nanumpenscript",
];

/** 打印纸张。像素按 96dpi，与 jsPDF 的 px 单位一致（816×1056 = US Letter，794×1123 = A4）。 */
export type PageFormat = "letter" | "a4";

export const PAGE_FORMATS: Record<PageFormat, { w: number; h: number }> = {
  letter: { w: 816, h: 1056 },
  a4: { w: 794, h: 1123 },
};

const SPEECH_LANG: Record<string, string> = {
  en: "en-US",
  es: "es-ES",
  fr: "fr-FR",
  de: "de-DE",
  pt: "pt-BR",
  zh: "zh-CN",
  ja: "ja-JP",
  ko: "ko-KR",
};

/** Web Speech API 的 BCP-47 语言。页面语言决定，不读浏览器语言。 */
export function speechLang(locale: string): string {
  return SPEECH_LANG[locale] ?? "en-US";
}

const DEFAULT_FONT: Record<string, FontId> = {
  en: "patrickhand",
  es: "patrickhand",
  fr: "patrickhand",
  de: "patrickhand",
  pt: "patrickhand",
  zh: "mashanzheng",
  ja: "kleeone",
  ko: "nanumpenscript",
};

export function defaultFontId(locale: string): FontId {
  return DEFAULT_FONT[locale] ?? "patrickhand";
}

/** 英语区用 Letter；其余语言（欧洲与中日韩）用 A4。 */
export function defaultPageFormat(locale: string): PageFormat {
  return locale === "en" ? "letter" : "a4";
}

const LATIN_FONT_IDS = new Set<string>([
  "patrickhand",
  "caveat",
  "kalam",
  "indieflower",
  "dancingscript",
  "cedarvillecursive",
]);

const CJK_CALLIGRAPHY = new Set<string>([
  "mashanzheng",
  "lxgwwenkai",
  "longcang",
  "zhimangxing",
  "liujianmaocao",
  "zcoolkuaile",
  "kleeone",
  "nanumpenscript",
]);

/** 拉丁语页面把西文手写体排在前面。返回字体 id，调用方再对照 FONTS。 */
export function fontOrder(locale: string): FontId[] {
  if (locale === "zh" || locale === "ja" || locale === "ko") return ALL_FONT_IDS;
  const latin = ALL_FONT_IDS.filter((id) => LATIN_FONT_IDS.has(id));
  const rest = ALL_FONT_IDS.filter((id) => !LATIN_FONT_IDS.has(id));
  return [...latin, ...rest];
}

/**
 * 模板样式按语言换字体。中文书法字体在拉丁语正文上不是当地手写习惯：
 * 行草/狂草 → Dancing Script，其余中日韩书法 → Caveat。
 */
export function templateFontId(fontId: string, locale: string): FontId {
  const latin = locale === "en" || locale === "es" || locale === "fr" || locale === "de" || locale === "pt";
  if (!latin || !CJK_CALLIGRAPHY.has(fontId)) return fontId as FontId;
  if (fontId === "longcang" || fontId === "liujianmaocao" || fontId === "zhimangxing") return "dancingscript";
  return "caveat";
}

export function coloringFontId(locale: string): FontId {
  if (locale === "zh") return "zcoolkuaile";
  if (locale === "ja") return "kleeone";
  if (locale === "ko") return "nanumpenscript";
  return "indieflower";
}

/** 行距展示：英语用英寸，其余用毫米。96dpi。 */
export function formatLength(px: number, locale: string): string {
  if (locale === "en") return `${(px / 96).toFixed(2)} in`;
  return `${((px / 96) * 25.4).toFixed(1)} mm`;
}
