import type { ReactNode } from "react";

/** 博客文章容器:居中栏位 + prose 排版 + 底部广告位 */
export default function ProseShell({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <article className="prose prose-neutral max-w-none">{children}</article>
    </main>
  );
}
