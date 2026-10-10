import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import TracingGenerator from "@/components/TracingGenerator";
import ToolFaq from "@/components/ToolFaq";
import ShareBar from "@/components/ShareBar";
import { NUMBER_TRACING_FAQS } from "@/content/pageFaqs";
import { getLocalizedFaqs } from "@/content/faqs";
import { pageMetadata } from "@/lib/seo";
import { defaultPageFormat } from "@/lib/localeDefaults";
import { numberLines } from "@/lib/practicePresets";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.numberTracing" });
  return pageMetadata("/number-tracing", locale as Locale, { title: t("title"), description: t("description") });
}

export default async function NumberTracingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("numberTracing");

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <header className="rise mb-7">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 md:text-4xl">{t("title")}</h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-600">{t("intro")}</p>
      </header>
      <div className="rise" style={{ animationDelay: "80ms" }}>
        <TracingGenerator
          defaultFontId="patrickhand"
          defaultBandH={110}
          defaultFormat={defaultPageFormat(locale)}
          rowLabels="lines"
          perName
          defaultOneEach
          initialText={numberLines(10)}
          sampleText="1"
          fileStem="number-tracing"
          presets={[
            { id: "10", label: t("to10"), text: numberLines(10) },
            { id: "20", label: t("to20"), text: numberLines(20) },
          ]}
        />
      </div>
      <div className="rise mt-6" style={{ animationDelay: "120ms" }}>
        <ShareBar />
      </div>
      <section className="rise mt-10 max-w-3xl text-sm leading-relaxed text-zinc-600" style={{ animationDelay: "160ms" }}>
        <h2 className="mb-2 text-base font-semibold text-zinc-900">{t("seoTitle")}</h2>
        <p className="whitespace-pre-line">{t("seoText")}</p>
      </section>
      <ToolFaq title={t("faqTitle")} items={getLocalizedFaqs(NUMBER_TRACING_FAQS, locale as Locale)} />
    </main>
  );
}
