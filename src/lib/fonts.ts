/** 默认字体(编辑器初始字体 + 全站 font-hand 标题),阻塞加载保证首屏字形正确 */
export const DEFAULT_FONT_CSS = "/fonts/mashanzheng/result.css";

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
];
