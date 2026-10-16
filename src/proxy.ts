import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware({
  ...routing,
  // middleware 默认的 alternateLinks 会按 routing.locales 给每个响应注入全语言
  // hreflang Link 头,而字母矩阵/数字课/letter-tracing 等页面只有 en(博客仅部分
  // 翻译),被声明的变体全是 404(2026-10 Semrush 404 报告 1646 条的根因)。
  // hreflang 统一以页面 metadata 为准:seo.ts 的 buildAlternates 已按真实存在的
  // 语言输出 <link rel="alternate">。
  alternateLinks: false,
});

export const config = {
  // 排除 API、静态资源与带扩展名的文件
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
