"use client";
import { useEffect } from "react";
import { NATIVE_BANNER, injectAdScript } from "@/lib/ads";
import { CONSENT_ACCEPTED_EVENT, readConsent } from "@/lib/consent";

/**
 * 原生横幅广告位(当前只挂在博客文章页正文末尾)。
 * 容器 div 随 SSR 输出;invoke 脚本是 Cookie 类,等用户同意 Cookie 后才注入——
 * 组件先于同意挂载的场景靠 CONSENT_ACCEPTED_EVENT 补注,已在同意后进入的场景直接注入。
 */
export default function AdNativeBanner() {
  useEffect(() => {
    const src = NATIVE_BANNER.scriptSrc;
    if (!src) return;
    if (readConsent() === "accepted") {
      injectAdScript("ad-native-banner", src);
      return;
    }
    const onAccepted = () => injectAdScript("ad-native-banner", src);
    window.addEventListener(CONSENT_ACCEPTED_EVENT, onAccepted);
    return () => window.removeEventListener(CONSENT_ACCEPTED_EVENT, onAccepted);
  }, []);

  if (!NATIVE_BANNER.scriptSrc) return null;

  return (
    <section aria-label="Advertisement" className="my-8">
      <div id={NATIVE_BANNER.containerId} />
    </section>
  );
}
