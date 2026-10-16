import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  pageExtensions: ["tsx", "ts", "mdx"],
  // /history 已移除(功能并入工具内历史抽屉):对外部链接与已收录 URL 做 308 收尾
  async redirects() {
    return [
      { source: "/history", destination: "/", permanent: true },
      { source: "/:locale/history", destination: "/:locale", permanent: true },
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
