import type { AnchorHTMLAttributes, ReactNode } from "react";
import type { MDXComponents } from "mdx/types";
import { Link } from "@/i18n/navigation";

// MDX 里的站内链接(以 / 开头)统一走 next-intl Link,自动补当前语言前缀,
// 保证翻译版文章里的工具链接停留在当前语言(开发规范 §3.3);
// 外链与 mailto 保持原生 <a>。
function Mdxa({
  href,
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { children?: ReactNode }) {
  if (typeof href === "string" && href.startsWith("/") && !href.startsWith("//")) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
}

// @next/mdx 与 App Router 集成的必需文件(见 Next.js 官方文档)
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...components, a: Mdxa };
}
