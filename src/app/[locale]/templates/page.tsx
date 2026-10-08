import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import TemplatesBrowser, { type TemplateCard } from "@/components/TemplatesBrowser";
import { TEMPLATES, getTemplateMeta } from "@/content/templates";
import { buildAlternates } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.templates" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: buildAlternates("/templates", locale as Locale),
  };
}

export default async function TemplatesIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("templates");

  const cards: TemplateCard[] = TEMPLATES.map((tpl) => {
    const meta = getTemplateMeta(tpl, locale as Locale);
    return { slug: tpl.slug, title: meta.title, description: meta.description };
  });

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <header className="rise">
        <h1 className="font-hand text-4xl leading-none">{t("libraryTitle")}</h1>
        <p className="mt-3 text-sm text-zinc-500">{t("tagline")}</p>
      </header>
      <div className="rise mt-9" style={{ animationDelay: "60ms" }}>
        <TemplatesBrowser templates={cards} />
      </div>
      <section
        className="rise mt-10 max-w-3xl text-sm leading-relaxed text-zinc-600"
        style={{ animationDelay: "200ms" }}
      >
        <h2 className="mb-2 text-base font-semibold text-zinc-900">{t("seoTitle")}</h2>
        <p className="whitespace-pre-line">{t("seoText")}</p>
      </section>
    </main>
  );
}
