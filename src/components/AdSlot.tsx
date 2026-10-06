"use client";
import { useEffect } from "react";

/**
 * 广告位:未配置 NEXT_PUBLIC_ADSENSE_CLIENT 时渲染低调占位框,
 * 配置后渲染 AdSense 单元。导出流程中不插广告(产品红线)。
 */
export default function AdSlot({ slot }: { slot?: string }) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

  useEffect(() => {
    if (!client) return;
    try {
      (window as any).adsbygoogle = (window as any).adsbygoogle || [];
      (window as any).adsbygoogle.push({});
    } catch {
      /* adsbygoogle 未加载时忽略 */
    }
  }, [client]);

  if (!client) {
    return (
      <div className="flex h-20 items-center justify-center rounded-xl bg-zinc-100/60 text-[11px] tracking-wide text-zinc-400">
        广告位 · 配置 NEXT_PUBLIC_ADSENSE_CLIENT 后生效
      </div>
    );
  }
  return (
    <ins
      className="adsbygoogle block"
      style={{ display: "block" }}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
