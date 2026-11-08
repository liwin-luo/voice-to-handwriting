import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  pageExtensions: ["tsx", "ts", "mdx"],
  // /history 已移除(功能并入工具内历史抽屉):对外部链接与已收录 URL 做 308 收尾
  async redirects() {
    return [
      { source: "/history", destination: "/", permanent: true },
      // 2026-11-08 语种收缩为 en-only:旧语言前缀整体 308 回英文版,保已收录 URL 权重。
      // 放宽为任意两字母前缀:hreflang 事故期被爬的 /ur/* /ru/* 等垃圾前缀也在 GSC 收录里
      // (2026-11-08 审计:266 个历史 URL 中 3 个 404 即此类);裸前缀单独放前面,空 :path* 会产出空 Location
      { source: "/:locale([a-z]{2})", destination: "/", permanent: true },
      {
        source: "/:locale([a-z]{2})/:path*",
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
};

const withMDX = createMDX({ options: { remarkPlugins: [["remark-gfm"]] } });
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(withMDX(nextConfig));
