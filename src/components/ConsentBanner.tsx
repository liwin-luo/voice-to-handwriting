"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const CONSENT_KEY = "vth-consent";

/**
 * Cookie 同意横幅(欧盟合规):
 * - 未做选择时不注入 AdSense 脚本;同意后加载,拒绝则保持不加载
 * - 选择存 localStorage,不再重复打扰
 * 说明:这是轻量自建方案;若后续 EEA 个性化广告占比高,可替换为 Google 认证的 CMP(如 Privacy & Messaging)。
 */
export default function ConsentBanner() {
  const t = useTranslations("consent");
  const [choice, setChoice] = useState<"accepted" | "rejected" | null>(null);
  const [adsenseClient, setAdsenseClient] = useState<string | null>(null);

  useEffect(() => {
    setChoice(localStorage.getItem(CONSENT_KEY) as typeof choice);
    setAdsenseClient(process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? null);
  }, []);

  // 同意后才注入 AdSense(未配置 client 时永远不注入)
  useEffect(() => {
    if (choice !== "accepted" || !adsenseClient) return;
    const id = "adsbygoogle-init";
    if (document.getElementById(id)) return;
    const s = document.createElement("script");
    s.id = id;
    s.async = true;
    s.crossOrigin = "anonymous";
    s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`;
    document.head.appendChild(s);
  }, [choice, adsenseClient]);

  const decide = (v: "accepted" | "rejected") => {
    localStorage.setItem(CONSENT_KEY, v);
    setChoice(v);
  };

  const visible = choice === null && !!adsenseClient;
  const bannerRef = useRef<HTMLDivElement>(null);

  // 横幅盖住工具页吸底导出条。把占用高度写到 --consent-offset,导出条和侧栏据此上移。
  useLayoutEffect(() => {
    const el = bannerRef.current;
    if (!el) {
      document.documentElement.style.removeProperty("--consent-offset");
      return;
    }
    const apply = () => {
      document.documentElement.style.setProperty("--consent-offset", `${el.offsetHeight + 20}px`);
    };
    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(el);
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty("--consent-offset");
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={bannerRef}
      className="glass-bar fixed inset-x-3 bottom-3 z-40 mx-auto flex max-w-3xl flex-col gap-4 p-4 sm:flex-row sm:items-center sm:gap-6 sm:p-5"
    >
      <div className="min-w-0 flex-1">
        <p className="text-sm leading-relaxed text-zinc-600">{t("text")}</p>
        <Link
          href="/privacy"
          className="mt-2 inline-block text-sm text-accent underline underline-offset-2 hover:text-accent-strong"
        >
          {t("privacy")}
        </Link>
      </div>
      <div className="flex w-full shrink-0 flex-col gap-2 sm:w-60">
        <button type="button" onClick={() => decide("accepted")} className="btn btn-primary w-full px-4 py-2.5">
          {t("accept")}
        </button>
        <button type="button" onClick={() => decide("rejected")} className="btn btn-ghost w-full px-4 py-2.5">
          {t("reject")}
        </button>
      </div>
    </div>
  );
}
