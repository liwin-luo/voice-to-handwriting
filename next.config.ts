import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  pageExtensions: ["tsx", "ts", "mdx"],
  // /history 已移除(功能并入工具内历史抽屉):对外部链接与已收录 URL 做 308 收尾
  async redirects() {
    return [
      // 2026-11-16 摘掉 proxy.ts(next-intl middleware):Vercel 的 middleware 在静态缓存
      // 查找之前运行,每个请求(含 100% 命中预渲染页的)都要调一次函数,是 Fluid Active
      // CPU 的持续消耗源(约 2-4 分钟/天)。语言协商下沉到边缘层 redirects,只在首页
      // 覆盖(zh 用户深链接本来就走 /zh/*,博客/工具的 GSC 流量入口不受影响):
      { source: "/", has: [{ type: "cookie", key: "NEXT_LOCALE", value: "zh" }], destination: "/zh", permanent: false },
      {
        source: "/",
        // 用户显式切到 en(cookie)时浏览器语言不再劫持
        missing: [{ type: "cookie", key: "NEXT_LOCALE", value: "en" }],
        // has 条件的 value 对整个 header 值做全串匹配(部分匹配不生效,
        // "^\\s*zh" 能中 "zh" 却漏掉 "zh-CN,zh;q=0.9"),因此从头吞全串;
        // 只认 zh 打头(en 等其他语言打头不劫持)
        has: [{ type: "header", key: "accept-language", value: "^zh[\\s\\S]*" }],
        destination: "/zh",
        permanent: false,
      },
      { source: "/history", destination: "/", permanent: true },
      // 2026-11-09 恢复双语(en + zh):旧语言前缀仍 308 回英文版,保已收录 URL 权重;
      // zh 前缀负向断言排除,否则这两条会抢在路由前把 /zh/* 打回英文版。
      // 保持任意两字母前缀(不枚举语种):hreflang 事故期被爬的 /ur/* /ru/* 等垃圾前缀也在 GSC 收录里
      // (2026-11-08 审计:266 个历史 URL 中 3 个 404 即此类);裸前缀单独放前面,空 :path* 会产出空 Location
      { source: "/:locale((?!zh)[a-z]{2})", destination: "/", permanent: true },
      {
        source: "/:locale((?!zh)[a-z]{2})/:path*",
        destination: "/:path*",
        permanent: true,
      },
      // 唯一没有英文正文就下线的文章(de 源发),旧 slug 308 回博客索引
      { source: "/blog/whatsapp-voice-note-handwriting", destination: "/blog", permanent: true },
      // 2026-11-08 第三批聚类合并:同功能工具并入承接方(分析见 us-seo-content-plan §二十三)
      { source: "/word-work", destination: "/handwriting-worksheet-generator", permanent: true },
      { source: "/handwriting-sentence-practice", destination: "/handwriting-worksheet-generator?words=The+quick+brown+fox+jumps+over+the+lazy+dog.", permanent: true },
      { source: "/doctor-handwriting-generator", destination: "/templates/doctor-prescription", permanent: true },
      // 2026-11-08 第二批功能收缩:11 个零曝光/死押注工具页 308 到最近的存活承接页(GSC 依据见 us-seo-content-plan 登记)
      { source: "/handwriting-check", destination: "/tools", permanent: true },
      { source: "/handwriting-count", destination: "/tools", permanent: true },
      { source: "/handwriting-pad", destination: "/tools", permanent: true },
      { source: "/handwriting-repeater", destination: "/cursive-worksheets", permanent: true },
      { source: "/architect-lettering", destination: "/handwriting-worksheet-generator", permanent: true },
      { source: "/cursive-tattoo-stencil", destination: "/cursive-font-generator", permanent: true },
      { source: "/prewriting-strokes", destination: "/handwriting-worksheet-generator", permanent: true },
      { source: "/signature-practice", destination: "/cursive-font-generator", permanent: true },
      { source: "/cursive-letter-joins", destination: "/cursive-worksheets", permanent: true },
      { source: "/daily-cursive-handwriting-practice", destination: "/cursive-worksheets", permanent: true },
      { source: "/letter-tracing", destination: "/name-tracing", permanent: true },
      { source: "/letter-tracing/:letter", destination: "/name-tracing?letter=:letter", permanent: true },
      // 随工具一起下线的 10 篇纯配套文章,slug 308 回博客索引
      ...[
        "handwriting-repeater",
        "daily-cursive-practice-pdf",
        "count-words-in-handwriting",
        "share-a-handwriting-score-card",
        "save-a-handwritten-note",
        "export-a-mirrored-cursive-stencil",
        "how-to-practice-your-signature",
        "squared-hand-lettering-practice",
        "strokes-before-letter-tracing",
        "how-to-join-cursive-letters",
      ].map((slug) => ({ source: `/blog/${slug}`, destination: "/blog", permanent: true })),
      // 文章早期收录在无 /blog 前缀的路径上,外部反链仍指向旧 URL(Semrush 404 报告)
      ...[
        "xiaohongshu-handwritten-images",
        "free-printable-lined-paper",
        "handwritten-card-with-voice",
        "kindergarten-handwriting-paper",
      ].map((slug) => ({ source: `/${slug}`, destination: `/blog/${slug}`, permanent: true })),
      // www 主机归一到裸域(与 SITE.url 一致),避免双主机同时出 200 重复收录
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.voicetohandwriting.online" }],
        destination: "https://voicetohandwriting.online/:path*",
        permanent: true,
      },
    ];
  },
  // 裸路径英文页的服务(原 proxy.ts 内部 rewrite 的替代)。afterFiles 在文件系统检查之后,
  // public/ 资源(fonts/ models/ printables/ blog/ 封面)优先命中不被劫持;首段排除
  // zh(真实 [locale] 路由)与 _next/_vercel(平台路径,Analytics 上报走 /_vercel/*,
  // 不在文件系统里,必须显式排除),带点的段排除 robots.txt / sitemap.xml / icon.svg /
  // GSC 验证文件等根级文件。单段与多段拆成两条,避免 :rest* 空匹配时补出尾斜杠。
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [
        { source: "/", destination: "/en" },
        // 排除锚点用 (?:(?:zh|_next|_vercel)(?:$|/)):lookahead 的 $ 是对整个剩余路径
        // 求值而非单个段,zh$ 在 /zh/blog(剩余串 "zh/blog")上不成立,会漏拦导致
        // /zh/* 多段路径被 rewrite 到 /en/zh/* 打成 404(2026-11-16 本地矩阵发现)
        { source: "/:seg((?!(?:zh|_next|_vercel)(?:$|/))[^./]+)", destination: "/en/:seg" },
        {
          source: "/:seg((?!(?:zh|_next|_vercel)(?:$|/))[^./]+)/:rest+",
          destination: "/en/:seg/:rest+",
        },
      ],
      fallback: [],
    };
  },
};

const withMDX = createMDX({ options: { remarkPlugins: [["remark-gfm"]] } });
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(withMDX(nextConfig));
