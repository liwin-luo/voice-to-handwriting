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
    ];
  },
};

const withMDX = createMDX({ options: { remarkPlugins: [["remark-gfm"]] } });
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(withMDX(nextConfig));
