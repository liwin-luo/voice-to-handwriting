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
import FloatingShare from "@/components/FloatingShare";
import FontStylesheets from "@/components/FontStylesheets";
import { ASYNC_FONT_CSS, blockingFontHrefs } from "@/lib/fonts";
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
  const blockingFonts = blockingFontHrefs(locale);

  return (
    <html lang={locale} className="h-full antialiased">
      <head>
        {/* 自托管 OFL 手写字体(cn-font-split 切片,按需加载)。
            仅默认字体阻塞加载,其余 preload + 水合后注入,避免 11 个 CSS 阻塞首屏 */}
        {blockingFonts.map((href) => (
          <link key={href} rel="stylesheet" href={href} />
        ))}
        {ASYNC_FONT_CSS.filter((href) => !blockingFonts.includes(href)).map((href) => (
          <link key={href} rel="preload" href={href} as="style" />
        ))}
        {/* AdSense 脚本由 ConsentBanner 在用户同意后才注入(components/ConsentBanner.tsx);
            此处不得预加载,否则拒绝 Cookie 的用户也会被加载广告脚本 */}
      </head>
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider messages={messages}>
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <SiteFooter />
          <FloatingShare />
          <ConsentBanner />
          <FontStylesheets />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
