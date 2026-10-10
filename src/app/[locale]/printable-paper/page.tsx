import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import PaperGenerator from "@/components/PaperGenerator";
import ToolFaq from "@/components/ToolFaq";
import ShareBar from "@/components/ShareBar";
import { PAPER_FAQS, getLocalizedFaqs } from "@/content/faqs";
import { pageMetadata } from "@/lib/seo";
import { defaultPageFormat } from "@/lib/localeDefaults";
import { PAPER_KINDS } from "@/content/paperKinds";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.printable" });
  return pageMetadata("/printable-paper", locale as Locale, {
    title: t("title"),
    description: t("description"),
  });
}

export default async function PrintablePaperPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("printable");

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <header className="rise mb-7">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 md:text-4xl">{t("title")}</h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-600">{t("intro")}</p>
        <p className="mt-2 text-sm">
          <Link href="/handwriting-page-calculator" className="text-accent underline underline-offset-2">
            {t("calculatorCta")}
          </Link>
        </p>
        <nav className="mt-4 flex flex-wrap gap-2">
          {PAPER_KINDS.map((kind) => (
            <Link
              key={kind.slug}
              href={`/printable-paper/${kind.slug}`}
              className="rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-600 hover:border-zinc-400"
            >
              {kind.copy[locale as Locale].label}
            </Link>
          ))}
        </nav>
      </header>
      <div className="rise" style={{ animationDelay: "80ms" }}>
        <PaperGenerator defaultFormat={defaultPageFormat(locale)} />
      </div>
      <div className="rise mt-6" style={{ animationDelay: "120ms" }}>
        <ShareBar />
      </div>
      <section className="rise mt-10 max-w-3xl text-sm leading-relaxed text-zinc-600" style={{ animationDelay: "160ms" }}>
        <h2 className="mb-2 text-base font-semibold text-zinc-900">{t("seoTitle")}</h2>
        <p>{t("seoText")}</p>
      </section>
      <ToolFaq title={t("faqTitle")} items={getLocalizedFaqs(PAPER_FAQS, locale as Locale)} />
    </main>
  );
}
