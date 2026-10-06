import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  pageExtensions: ["tsx", "ts", "mdx"],
};

const withMDX = createMDX({ options: { remarkPlugins: [["remark-gfm"]] } });
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(withMDX(nextConfig));
