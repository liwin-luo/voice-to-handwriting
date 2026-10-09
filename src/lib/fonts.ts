import { defaultFontId } from "@/lib/localeDefaults";

/** 站名手写标题用的书法字体,始终阻塞加载 */
export const DEFAULT_FONT_CSS = "/fonts/mashanzheng/result.css";

export function fontStylesheet(fontId: string): string {
  return `/fonts/${fontId}/result.css`;
}

/** 站名书法 + 当前语言的正文默认字体。两者相同则只加载一次。 */
export function blockingFontHrefs(locale: string): string[] {
  const body = fontStylesheet(defaultFontId(locale));
  return body === DEFAULT_FONT_CSS ? [DEFAULT_FONT_CSS] : [DEFAULT_FONT_CSS, body];
}

/** 其余字体:preload 提前拉取,水合后由 FontStylesheets 注入样式表,不阻塞首屏渲染 */
export const ASYNC_FONT_CSS = [
  "/fonts/longcang/result.css",
  "/fonts/liujianmaocao/result.css",
  "/fonts/caveat/result.css",
  "/fonts/zhimangxing/result.css",
  "/fonts/zcoolkuaile/result.css",
  "/fonts/lxgwwenkai/result.css",
  "/fonts/patrickhand/result.css",
  "/fonts/kalam/result.css",
  "/fonts/indieflower/result.css",
  "/fonts/dancingscript/result.css",
  "/fonts/cedarvillecursive/result.css",
  "/fonts/sacramento/result.css",
  "/fonts/kleeone/result.css",
  "/fonts/nanumpenscript/result.css",
];
