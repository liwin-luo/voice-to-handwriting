import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import BulkLetterMailer from "@/components/BulkLetterMailer";
import ToolFaq from "@/components/ToolFaq";
import ShareBar from "@/components/ShareBar";
import { BULK_LETTER_FAQS, getLocalizedFaqs } from "@/content/faqs";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.bulkLetters" });
  return pageMetadata("/printable-handwritten-letters", locale as Locale, {
    title: t("title"),
    description: t("description"),
  });
}

export default async function PrintableHandwrittenLettersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("bulkLetters");

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <header className="rise mb-7">
        <h1 className="font-display text-2xl font-semibold tracking-tight text-stone-900 md:text-[28px]">{t("title")}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-stone-600">{t("intro")}</p>
      </header>
      <div className="rise" style={{ animationDelay: "80ms" }}>
        <BulkLetterMailer />
      </div>
      <div className="rise mt-6" style={{ animationDelay: "120ms" }}>
        <ShareBar />
      </div>
      <section className="rise mt-10 max-w-3xl text-sm leading-relaxed text-stone-600" style={{ animationDelay: "160ms" }}>
        <h2 className="mb-2 text-base font-semibold text-stone-900">{t("seoTitle")}</h2>
        <p className="whitespace-pre-line">{t("seoText")}</p>
      </section>
      <ToolFaq title={t("faqTitle")} items={getLocalizedFaqs(BULK_LETTER_FAQS, locale as Locale)} />
    </main>
  );
}
