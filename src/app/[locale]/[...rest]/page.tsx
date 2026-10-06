import { notFound } from "next/navigation";

/** 兜底路由:未知路径统一走 [locale]/not-found */
export default function CatchAllPage() {
  notFound();
}
