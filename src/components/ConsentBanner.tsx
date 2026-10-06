"use client";
import { useEffect, useState } from "react";
import Script from "next/script";
import { useTranslations } from "next-intl";
import { Cookie } from "@phosphor-icons/react";
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

  if (choice !== null || !adsenseClient) return null;

  return (
    <div className="fixed inset-x-3 bottom-3 z-40 mx-auto flex max-w-3xl flex-col items-start gap-3 rounded-2xl border border-zinc-200 bg-white/95 p-4 shadow-[0_16px_40px_-16px_rgba(23,23,23,0.25)] backdrop-blur-md sm:flex-row sm:items-center">
      <Cookie weight="duotone" className="hidden size-6 shrink-0 text-accent sm:block" />
      <p className="flex-1 text-xs leading-relaxed text-zinc-600">
        {t("text")}{" "}
        <Link href="/privacy" className="text-accent underline underline-offset-2">
          {t("privacy")}
        </Link>
      </p>
      <div className="flex shrink-0 gap-2">
        <button onClick={() => decide("rejected")} className="btn btn-ghost px-3.5 py-2 text-xs">
          {t("reject")}
        </button>
        <button onClick={() => decide("accepted")} className="btn btn-primary px-3.5 py-2 text-xs">
          {t("accept")}
        </button>
      </div>
    </div>
  );
}
