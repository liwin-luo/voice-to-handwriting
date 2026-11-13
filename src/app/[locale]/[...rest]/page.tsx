import { notFound } from "next/navigation";

// 未列入 generateStaticParams 的路径直接静态 404,不走运行时渲染:
// 兜底路由本身没有 generateStaticParams,即所有未知路径都 404。
// 不加这条时,每个爬虫探测/GSC 重爬的失效 URL 都会调用一次函数、
// 现场渲染整棵 layout + not-found,是 Fluid Active CPU 的主要消耗源(2026-11-13)。
export const dynamicParams = false;

/** 兜底路由:未知路径统一走 [locale]/not-found */
export default function CatchAllPage() {
  notFound();
}
