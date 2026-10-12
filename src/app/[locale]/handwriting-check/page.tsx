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
import { DAILY_LIMIT } from "@/lib/handwritingCheck";
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
      <header className="rise mb-7 max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 md:text-4xl">{t("title")}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600">{t("intro")}</p>
        <ul className="mt-4 flex max-w-2xl flex-col gap-1 text-sm leading-relaxed text-zinc-600">
          <li>{t("noteLines")}</li>
          <li>{t("noteClinical")}</li>
          <li>{t("noteDiscard")}</li>
          <li>{t("daily", { count: DAILY_LIMIT })}</li>
        </ul>
      </header>
      <div className="rise" style={{ animationDelay: "80ms" }}>
        <HandwritingCheck />
      </div>
      <section className="rise mt-10" style={{ animationDelay: "160ms" }}>
        <div className="max-w-3xl">
          <h2 className="text-base font-semibold text-zinc-900">{t("seoTitle")}</h2>
          <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-zinc-600">{t("seoText")}</p>
        </div>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-zinc-200 bg-white">
          <table className="w-full min-w-[52rem] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-zinc-50 text-zinc-500">
                <th scope="col" className="sticky left-0 bg-zinc-50 px-4 py-3 font-medium">
                  <span className="sr-only">{t("seoTitle")}</span>
                </th>
                {LEVELS.map((level) => (
                  <th key={level} scope="col" className="px-4 py-3 text-center text-base font-semibold tabular-nums text-accent">
                    {level}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RUBRIC.map((key) => (
                <tr key={key} className="border-t border-zinc-100">
                  <th scope="row" className="sticky left-0 whitespace-nowrap bg-white px-4 py-3 font-medium text-zinc-950 shadow-[1px_0_0_0_#e4e4e7]">
                    {t(key)}
                  </th>
                  {LEVELS.map((level) => (
                    <td key={level} className="px-4 py-3 align-top leading-relaxed text-zinc-700">
                      {t(`anchors.${key}.${level}`)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 text-sm">
          <Link href="/blog/how-to-improve-handwriting-adults" className="text-accent underline underline-offset-2">
            {t("nextLink")}
          </Link>
        </p>
      </section>
      <ToolFaq title={t("faqTitle")} items={getLocalizedFaqs(HANDWRITING_CHECK_FAQS, locale as Locale)} />
    </main>
  );
}
