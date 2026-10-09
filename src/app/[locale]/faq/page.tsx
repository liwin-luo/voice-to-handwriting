import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { getLocalizedFaqs } from "@/content/faqs";
import { FAQ_HUB } from "@/content/faqHub";
import ToolFaq from "@/components/ToolFaq";
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
  const items = getLocalizedFaqs(FAQ_HUB, locale as Locale);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <header className="rise">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 md:text-4xl">{tm("title")}</h1>
        <p className="mt-3 text-sm text-zinc-500">{tm("description")}</p>
      </header>
      <ToolFaq items={items} />
    </main>
  );
}
