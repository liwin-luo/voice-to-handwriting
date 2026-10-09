import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import CursiveTextGenerator from "@/components/CursiveTextGenerator";
import ToolFaq from "@/components/ToolFaq";
import ShareBar from "@/components/ShareBar";
import { CURSIVE_TEXT_FAQS, getLocalizedFaqs } from "@/content/faqs";
import { buildAlternates } from "@/lib/seo";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.cursiveText" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: buildAlternates("/cursive-text-generator", locale as Locale),
  };
}

export default async function CursiveTextGeneratorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("cursiveText");

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <header className="rise mb-7">
        <h1 className="font-hand text-4xl leading-none md:text-5xl">{t("title")}</h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-600">{t("intro")}</p>
      </header>
      <div className="rise max-w-3xl" style={{ animationDelay: "80ms" }}>
        <CursiveTextGenerator />
      </div>
      <p className="rise mt-6 max-w-3xl text-sm leading-relaxed" style={{ animationDelay: "120ms" }}>
        <Link href="/cursive" className="text-accent underline-offset-2 hover:underline">
          {t("alsoImage")}
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
      <ToolFaq
        title={t("faqTitle")}
        items={getLocalizedFaqs(CURSIVE_TEXT_FAQS, locale as Locale)}
      />
    </main>
  );
}
