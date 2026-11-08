"use client";

import type { ReactNode, Ref } from "react";

/** 全站唯一的工具布局壳:左控制列(var(--tool-col))宽屏吸顶可滚,右侧预览,below 是栅格外的页脚条。
 *  移动端走 contents→lg:grid 穿透:side/preview/below 内部的 order-* 直接参与外层文档流排序,
 *  所以这里只发裸插槽、不包 wrapper——消费方的节点自带 order 类(与旧两套壳逐类对齐)。
 *  ToolWorkspace 与 PracticeLayout 都从这里出。 */
export default function ToolLayout({
  side,
  preview,
  below,
  sideClassName = "",
  previewClassName = "",
  belowClassName = "",
  sideRef,
}: {
  side: ReactNode;
  preview: ReactNode;
  below?: ReactNode;
  /** 附加到左栏容器(如 ToolWorkspace 的 max-h/overflow) */
  sideClassName?: string;
  /** 附加到预览容器(如移动端 order-2) */
  previewClassName?: string;
  /** 附加到 below 容器(如移动端 order-3 + lg:sticky) */
  belowClassName?: string;
  sideRef?: Ref<HTMLDivElement>;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="contents lg:grid lg:grid-cols-[var(--tool-col)_minmax(0,1fr)] lg:items-start lg:gap-x-6">
        <div
          ref={sideRef}
          className={`contents lg:col-start-1 lg:row-start-1 lg:sticky lg:top-20 lg:flex lg:flex-col lg:gap-6 lg:self-start ${sideClassName}`}
        >
          {side}
        </div>
        <div className={`min-w-0 lg:col-start-2 lg:row-start-1 ${previewClassName}`}>{preview}</div>
      </div>
      {below ? <div className={belowClassName}>{below}</div> : null}
    </div>
  );
}
