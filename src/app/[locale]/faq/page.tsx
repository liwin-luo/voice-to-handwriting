import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { FAQ_ITEMS, getFaq } from "@/content/faqs";
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
  const t = await getTranslations({ locale, namespace: "meta.faq" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: buildAlternates("/faq", locale as Locale),
  };
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const tm = await getTranslations({ locale, namespace: "meta.faq" });
  const items = FAQ_ITEMS.map((f) => getFaq(f, locale as Locale));

  // FAQPage 结构化数据:争取 Google 富结果(rich results)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="rise">
        <h1 className="font-hand text-4xl leading-none">{tm("title")}</h1>
        <p className="mt-3 text-sm text-zinc-500">{tm("description")}</p>
      </header>
      <div className="rise mt-9 flex flex-col gap-3" style={{ animationDelay: "60ms" }}>
        {items.map((it, i) => (
          <details
            key={i}
            className="group rounded-2xl border border-zinc-200 bg-white p-5 [&_summary::-webkit-details-marker]:hidden"
            open={i === 0}
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[15px] font-semibold text-zinc-900">
              {it.q}
              <span
                aria-hidden
                className="text-xl leading-none text-accent transition-transform duration-200 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">{it.a}</p>
          </details>
        ))}
      </div>
      <p className="rise mt-8 text-xs text-zinc-400" style={{ animationDelay: "160ms" }}>
        {SITE.name} · voicetohandwriting.online
      </p>
    </main>
  );
}
