import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import ToolWorkspace from "@/components/ToolWorkspace";
import ToolFaq from "@/components/ToolFaq";
import ShareBar from "@/components/ShareBar";
import CursiveLettersHub from "@/components/CursiveLettersHub";
import { CURSIVE_FAQS, getLocalizedFaqs } from "@/content/faqs";
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
  const t = await getTranslations({ locale, namespace: "meta.cursive" });
  return pageMetadata("/cursive", locale as Locale, {
    title: t("title"),
    description: t("description"),
  });
}

export default async function CursivePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("cursive");

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <header className="rise mb-7">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 md:text-4xl">{t("title")}</h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-600">{t("intro")}</p>
      </header>
      <div className="rise" style={{ animationDelay: "80ms" }}>
        <ToolWorkspace
          preset={{ fontId: "cedarvillecursive", paperId: "blank", ink: "#1a1a1a", fontSize: 36 }}
        />
      </div>
      <div className="rise mt-6" style={{ animationDelay: "120ms" }}>
        <ShareBar />
      </div>
      <section
        className="rise mt-10 max-w-3xl text-sm leading-relaxed text-zinc-600"
        style={{ animationDelay: "160ms" }}
      >
        <h2 className="mb-2 text-base font-semibold text-zinc-900">{t("seoTitle")}</h2>
        <p className="whitespace-pre-line">{t("seoText")}</p>
      </section>
      <nav className="rise mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm" style={{ animationDelay: "170ms" }}>
        {locale === routing.defaultLocale && (
          <Link href="/cursive-alphabet" className="text-accent underline underline-offset-2 hover:text-accent-strong">
            {t("alphabetLink")}
          </Link>
        )}
        <Link href="/cursive-worksheets" className="text-accent underline underline-offset-2 hover:text-accent-strong">
          {t("worksheetsLink")}
        </Link>
        <Link href="/handwriting-repeater" className="text-accent underline underline-offset-2 hover:text-accent-strong">
          {t("repeaterLink")}
        </Link>
      </nav>
      <CursiveLettersHub locale={locale as Locale} />
      <ToolFaq title={t("faqTitle")} items={getLocalizedFaqs(CURSIVE_FAQS, locale as Locale)} />
    </main>
  );
}
