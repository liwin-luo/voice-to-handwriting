import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import TracingGenerator from "@/components/TracingGenerator";
import ToolFaq from "@/components/ToolFaq";
import ShareBar from "@/components/ShareBar";
import { TRACING_FAQS, getLocalizedFaqs } from "@/content/faqs";
import { buildAlternates } from "@/lib/seo";
import { defaultFontId, defaultPageFormat } from "@/lib/localeDefaults";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.tracing" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: buildAlternates("/name-tracing", locale as Locale),
  };
}

export default async function NameTracingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("tracing");

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <header className="rise mb-7">
        <h1 className="font-hand text-4xl leading-none md:text-5xl">{t("title")}</h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-600">{t("intro")}</p>
      </header>
      <div className="rise" style={{ animationDelay: "80ms" }}>
        <TracingGenerator defaultFontId={defaultFontId(locale)} defaultFormat={defaultPageFormat(locale)} perName />
      </div>
      <div className="rise mt-6" style={{ animationDelay: "120ms" }}>
        <ShareBar />
      </div>
      <section className="rise mt-10 max-w-3xl text-sm leading-relaxed text-zinc-600" style={{ animationDelay: "160ms" }}>
        <h2 className="mb-2 text-base font-semibold text-zinc-900">{t("seoTitle")}</h2>
        <p>{t("seoText")}</p>
      </section>
      <ToolFaq title={t("faqTitle")} items={getLocalizedFaqs(TRACING_FAQS, locale as Locale)} />
    </main>
  );
}
