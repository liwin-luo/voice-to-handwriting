import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import HandwritingCheck from "@/components/HandwritingCheck";
import ToolFaq from "@/components/ToolFaq";
import { HANDWRITING_CHECK_FAQS } from "@/content/pageFaqs";
import { getLocalizedFaqs } from "@/content/faqs";
import { pageMetadata } from "@/lib/seo";
import { Link } from "@/i18n/navigation";

const RUBRIC = ["legibility", "size", "baseline", "spacing", "slant"] as const;
const LEVELS = ["5", "4", "3", "2", "1"] as const;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.handwritingCheck" });
  return pageMetadata("/handwriting-check", locale as Locale, {
    title: t("title"),
    description: t("description"),
  });
}

export default async function HandwritingCheckPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("handwritingCheck");

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="rise">
        <HandwritingCheck
          title={t("title")}
          intro={t("intro")}
          notes={[t("noteLines"), t("noteClinical"), t("noteDiscard")]}
        />
      </div>
      <section className="rise mt-10 max-w-3xl" style={{ animationDelay: "160ms" }}>
        <h2 className="text-base font-semibold text-zinc-900">{t("seoTitle")}</h2>
        <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-zinc-600">{t("seoText")}</p>
        <div className="mt-8 flex flex-col gap-8">
          {RUBRIC.map((key) => (
            <div key={key}>
              <h3 className="text-sm font-semibold text-zinc-950">{t(key)}</h3>
              <dl className="mt-2 flex flex-col gap-1.5">
                {LEVELS.map((level) => (
                  <div key={level} className="grid grid-cols-[1.5rem_1fr] gap-3 text-sm leading-relaxed">
                    <dt className="tabular-nums font-medium text-accent">{level}</dt>
                    <dd className="text-zinc-700">{t(`anchors.${key}.${level}`)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm">
          <Link href="/blog/how-to-improve-handwriting-adults" className="text-accent underline">
            {t("nextLink")}
          </Link>
        </p>
      </section>
      <ToolFaq title={t("faqTitle")} items={getLocalizedFaqs(HANDWRITING_CHECK_FAQS, locale as Locale)} />
    </main>
  );
}
