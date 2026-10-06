import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { SITE } from "@/lib/site";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ConsentBanner from "@/components/ConsentBanner";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    metadataBase: new URL(SITE.url),
    title: { default: t("title"), template: `%s | ${t("brand")}` },
    description: t("description"),
    keywords: t("keywords"),
    twitter: { card: "summary_large_image" },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className="h-full antialiased">
      <head>
        {/* 自托管 OFL 手写字体(cn-font-split 切片,按需加载) */}
        <link rel="stylesheet" href="/fonts/mashanzheng/result.css" />
        <link rel="stylesheet" href="/fonts/longcang/result.css" />
        <link rel="stylesheet" href="/fonts/liujianmaocao/result.css" />
        <link rel="stylesheet" href="/fonts/caveat/result.css" />
        <link rel="stylesheet" href="/fonts/zhimangxing/result.css" />
        <link rel="stylesheet" href="/fonts/zcoolkuaile/result.css" />
        <link rel="stylesheet" href="/fonts/lxgwwenkai/result.css" />
        <link rel="stylesheet" href="/fonts/patrickhand/result.css" />
        <link rel="stylesheet" href="/fonts/kalam/result.css" />
        <link rel="stylesheet" href="/fonts/indieflower/result.css" />
        <link rel="stylesheet" href="/fonts/dancingscript/result.css" />
        <link rel="stylesheet" href="/fonts/cedarvillecursive/result.css" />
        {/* AdSense:配置环境变量后自动注入 */}
        {process.env.NEXT_PUBLIC_ADSENSE_CLIENT && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider messages={messages}>
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <SiteFooter />
          <ConsentBanner />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
