import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import CursiveFontBrowser from "@/components/CursiveFontBrowser";
import ToolFaq from "@/components/ToolFaq";
import ShareBar from "@/components/ShareBar";
import { FONT_CATALOG } from "@/content/fontCatalog";
import { CURSIVE_FONT_FAQS, getLocalizedFaqs } from "@/content/faqs";
import { buildAlternates } from "@/lib/seo";

/** 手写字体预览 + 导出工具页(主词 cursive font generator,8 语言) */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.cursiveFont" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: buildAlternates("/cursive-font-generator", locale as Locale),
  };
}

export default async function CursiveFontGeneratorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("cursiveFont");

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      {FONT_CATALOG.flatMap((entry) =>
        entry.stylesheet ? <link key={entry.stylesheet} rel="stylesheet" href={entry.stylesheet} /> : [],
      )}
      <header className="rise mb-7 max-w-3xl">
        <h1 className="font-hand text-4xl leading-none md:text-5xl">{t("title")}</h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-600">{t("intro")}</p>
      </header>
      <div className="rise max-w-3xl" style={{ animationDelay: "80ms" }}>
        <CursiveFontBrowser />
      </div>
      <p className="rise mt-6 max-w-3xl text-sm leading-relaxed" style={{ animationDelay: "120ms" }}>
        <Link href="/cursive-text-generator" className="text-accent underline-offset-2 hover:underline">
          {t("alsoUnicode")}
        </Link>{" "}
        ·{" "}
        <Link href="/cursive" className="text-accent underline-offset-2 hover:underline">
          {t("alsoHandwriting")}
        </Link>
      </p>
      <div className="rise mt-6" style={{ animationDelay: "160ms" }}>
        <ShareBar />
      </div>
      <section
        className="rise mt-10 max-w-3xl text-sm leading-relaxed text-zinc-600"
        style={{ animationDelay: "200ms" }}
      >
        <h2 className="mb-2 text-base font-semibold text-zinc-900">{t("seoTitle")}</h2>
        <p className="whitespace-pre-line">{t("seoText")}</p>
      </section>
      <ToolFaq title={t("faqTitle")} items={getLocalizedFaqs(CURSIVE_FONT_FAQS, locale as Locale)} />
    </main>
  );
}
