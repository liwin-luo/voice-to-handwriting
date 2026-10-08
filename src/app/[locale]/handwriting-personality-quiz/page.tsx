import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import HandwritingQuiz from "@/components/HandwritingQuiz";
import ShareBar from "@/components/ShareBar";
import ToolFaq from "@/components/ToolFaq";
import { QUIZ_FAQS, getLocalizedFaqs } from "@/content/faqs";
import { QUIZ_CONTENT } from "@/content/quiz";
import { SITE } from "@/lib/site";
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
  const t = await getTranslations({ locale, namespace: "meta.quiz" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: buildAlternates("/handwriting-personality-quiz", locale as Locale),
  };
}

export default async function HandwritingQuizPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const c = QUIZ_CONTENT[locale as Locale];
  const meta = await getTranslations({ locale, namespace: "meta.quiz" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: c.title,
    url: `${SITE.url}/handwriting-personality-quiz`,
    description: meta("description"),
    applicationCategory: "EntertainmentApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="rise mb-7">
        <h1 className="font-hand text-4xl leading-none md:text-5xl">{c.title}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600">{c.intro}</p>
      </header>
      <div className="rise" style={{ animationDelay: "80ms" }}>
        <HandwritingQuiz locale={locale as Locale} />
      </div>
      <div className="rise mt-6" style={{ animationDelay: "120ms" }}>
        <ShareBar />
      </div>
      <section
        className="rise mt-10 max-w-3xl text-sm leading-relaxed text-zinc-600"
        style={{ animationDelay: "160ms" }}
      >
        <h2 className="mb-2 text-base font-semibold text-zinc-900">{c.scienceTitle}</h2>
        {c.scienceText.map((p, i) => (
          <p key={i} className="mt-2">
            {p}
          </p>
        ))}
        <p className="mt-3">
          <Link
            href="/blog/what-does-your-handwriting-say-about-you"
            className="text-accent underline underline-offset-2 transition-colors hover:text-accent-strong"
          >
            {c.articleLink}
          </Link>
        </p>
        <p className="mt-4 text-xs text-zinc-400">{c.disclaimer}</p>
      </section>
      <ToolFaq title={c.faqTitle} items={getLocalizedFaqs(QUIZ_FAQS, locale as Locale)} />
    </main>
  );
}
