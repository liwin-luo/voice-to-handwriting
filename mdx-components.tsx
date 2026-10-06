import type { MDXComponents } from "mdx/types";

// @next/mdx 与 App Router 集成的必需文件(见 Next.js 官方文档)
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return components;
}
