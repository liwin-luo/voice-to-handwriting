import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import ArchitectSheet from "@/components/ArchitectSheet";
import ToolFaq from "@/components/ToolFaq";
import ShareBar from "@/components/ShareBar";
import { ARCHITECT_FAQS } from "@/content/pageFaqs";
import { getLocalizedFaqs } from "@/content/faqs";
import { pageMetadata } from "@/lib/seo";
import { defaultPageFormat } from "@/lib/localeDefaults";

const ARCHITECT_FONT = "/fonts/architectsdaughter/result.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.architectLetter" });
  return pageMetadata("/architect-lettering", locale as Locale, { title: t("title"), description: t("description") });
}

export default async function ArchitectLetteringPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("architectLetter");

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <link rel="stylesheet" href={ARCHITECT_FONT} />
      <header className="rise mb-7">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 md:text-4xl">{t("title")}</h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-600">{t("intro")}</p>
      </header>
      <div className="rise" style={{ animationDelay: "80ms" }}>
        <ArchitectSheet defaultFormat={defaultPageFormat(locale)} />
      </div>
      <div className="rise mt-6" style={{ animationDelay: "120ms" }}>
        <ShareBar />
      </div>
      <section className="rise mt-10 max-w-3xl text-sm leading-relaxed text-zinc-600" style={{ animationDelay: "160ms" }}>
        <h2 className="mb-2 text-base font-semibold text-zinc-900">{t("seoTitle")}</h2>
        <p className="whitespace-pre-line">{t("seoText")}</p>
      </section>
      <ToolFaq title={t("faqTitle")} items={getLocalizedFaqs(ARCHITECT_FAQS, locale as Locale)} />
    </main>
  );
}
