import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CORE_LOCALES, routing, type Locale } from "@/i18n/routing";
import { getLocalizedFaqs } from "@/content/faqs";
import { FAQ_HUB } from "@/content/faqHub";
import ToolFaq from "@/components/ToolFaq";
import { pageMetadata } from "@/lib/seo";

// 2026-11-18 起 /faq 门控 en+zh(es/pt 的 FAQ 目录未翻译,404;hreflang/sitemap 同口径)
export function generateStaticParams() {
  return CORE_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!CORE_LOCALES.includes(locale as Locale)) notFound();
  const t = await getTranslations({ locale, namespace: "meta.faq" });
  return pageMetadata("/faq", locale as Locale, {
    title: t("title"),
    description: t("description"),
  }, { available: CORE_LOCALES });
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale) || !CORE_LOCALES.includes(locale as Locale)) notFound();
  setRequestLocale(locale);
  const tm = await getTranslations({ locale, namespace: "meta.faq" });
  const items = getLocalizedFaqs(FAQ_HUB, locale as Locale);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <header className="rise">
        <h1 className="font-display text-2xl font-semibold tracking-tight text-stone-900 md:text-[28px]">{tm("title")}</h1>
        <p className="mt-3 text-sm text-stone-500">{tm("description")}</p>
      </header>
      <ToolFaq items={items} />
    </main>
  );
}
