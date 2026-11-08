import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import NameColoringGenerator from "@/components/NameColoringGenerator";
import ShareBar from "@/components/ShareBar";
import ToolFaq from "@/components/ToolFaq";
import { COLORING_FAQS, getLocalizedFaqs } from "@/content/faqs";
import { pageMetadata } from "@/lib/seo";
import { coloringFontId, defaultPageFormat } from "@/lib/localeDefaults";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.coloring" });
  return pageMetadata("/name-coloring", locale as Locale, {
    title: t("title"),
    description: t("description"),
  });
}

export default async function NameColoringPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("coloring");

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <header className="rise mb-7">
        <h1 className="font-display text-2xl font-semibold tracking-tight text-stone-900 md:text-[28px]">{t("title")}</h1>
        <p className="mt-3 text-sm leading-relaxed text-stone-600">{t("intro")}</p>
      </header>
      <div className="rise" style={{ animationDelay: "80ms" }}>
        <NameColoringGenerator defaultFormat={defaultPageFormat(locale)} defaultFontId={coloringFontId(locale)} />
      </div>
      <div className="rise mt-6" style={{ animationDelay: "120ms" }}>
        <ShareBar />
      </div>
      <section
        className="rise mt-10 max-w-3xl text-sm leading-relaxed text-stone-600"
        style={{ animationDelay: "160ms" }}
      >
        <h2 className="mb-2 text-base font-semibold text-stone-900">{t("seoTitle")}</h2>
        <p>{t("seoText")}</p>
      </section>
      <ToolFaq title={t("faqTitle")} items={getLocalizedFaqs(COLORING_FAQS, locale as Locale)} />
    </main>
  );
}
