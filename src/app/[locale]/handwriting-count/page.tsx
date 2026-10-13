import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import HandwritingCount from "@/components/HandwritingCount";
import ToolFaq from "@/components/ToolFaq";
import { HANDWRITING_COUNT_FAQS } from "@/content/pageFaqs";
import { getLocalizedFaqs } from "@/content/faqs";
import { pageMetadata } from "@/lib/seo";
import { DAILY_LIMIT } from "@/lib/handwritingCheck";
import { Link } from "@/i18n/navigation";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.handwritingCount" });
  return pageMetadata("/handwriting-count", locale as Locale, {
    title: t("title"),
    description: t("description"),
  });
}

export default async function HandwritingCountPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("handwritingCount");

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <header className="rise mb-7 max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 md:text-4xl">{t("title")}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600">{t("intro")}</p>
        <ul className="mt-4 flex max-w-2xl flex-col gap-1 text-sm leading-relaxed text-zinc-600">
          <li>{t("noteAny")}</li>
          <li>{t("noteHow")}</li>
          <li>{t("noteDiscard")}</li>
          <li>{t("daily", { count: DAILY_LIMIT })}</li>
        </ul>
      </header>
      <div className="rise" style={{ animationDelay: "80ms" }}>
        <HandwritingCount />
      </div>
      <section className="rise mt-10 max-w-3xl" style={{ animationDelay: "160ms" }}>
        <h2 className="text-base font-semibold text-zinc-900">{t("seoTitle")}</h2>
        <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-zinc-600">{t("seoText")}</p>
        <p className="mt-6 text-sm text-zinc-800">
          {t("checkLead")}{" "}
          <Link href="/handwriting-check" className="text-accent underline underline-offset-2">
            {t("checkLink")}
          </Link>
        </p>
      </section>
      <ToolFaq title={t("faqTitle")} items={getLocalizedFaqs(HANDWRITING_COUNT_FAQS, locale as Locale)} />
    </main>
  );
}
