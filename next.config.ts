import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["tsx", "ts", "mdx"],
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
