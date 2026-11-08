import type { ReactNode } from "react";

/** 全站唯一的页面 h1 出口:标准字重字号 + 一句副标题 + 可选徽章/说明行。
    阅读层页面(blog 正文、静态页)继续走 ProseShell,不经过这里。 */
export default function PageHeader({
  title,
  intro,
  badge,
  children,
}: {
  title: string;
  intro?: ReactNode;
  badge?: ReactNode;
  /** h1 下方的额外行(如首页的季节链接) */
  children?: ReactNode;
}) {
  return (
    <header className="rise mb-6 flex flex-col gap-2.5">
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 md:text-[28px] md:leading-snug">
        {title}
      </h1>
      {intro || badge ? (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          {intro ? <p className="text-sm leading-relaxed text-zinc-600">{intro}</p> : null}
          {badge}
        </div>
      ) : null}
      {children}
    </header>
  );
}
