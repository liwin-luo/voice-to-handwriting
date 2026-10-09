import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import PaperGenerator from "@/components/PaperGenerator";
import ToolFaq from "@/components/ToolFaq";
import ShareBar from "@/components/ShareBar";
import { getPaperKind, PAPER_KINDS } from "@/content/paperKinds";
import { getLocalizedFaqs } from "@/content/faqs";
import { paperKindFaqs } from "@/content/paperKindFaqs";
import { buildAlternates } from "@/lib/seo";
import { defaultPageFormat } from "@/lib/localeDefaults";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => PAPER_KINDS.map((kind) => ({ locale, kind: kind.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; kind: string }>;
}): Promise<Metadata> {
  const { locale, kind } = await params;
  const page = getPaperKind(kind);
  const copy = page?.copy[locale as Locale];
  if (!page || !copy) return {};
  return {
    title: copy.title,
    description: copy.description,
    alternates: buildAlternates(`/printable-paper/${page.slug}`, locale as Locale),
  };
}

export default async function PaperKindPage({
  params,
}: {
  params: Promise<{ locale: string; kind: string }>;
}) {
  const { locale, kind } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const page = getPaperKind(kind);
  if (!page) notFound();
  const copy = page.copy[locale];
  setRequestLocale(locale);
  const t = await getTranslations("printable");

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <header className="rise mb-7">
        <p className="mb-2 text-xs text-zinc-500">
          <Link href="/printable-paper" className="underline underline-offset-2 hover:text-zinc-800">
            {t("title")}
          </Link>
        </p>
        <h1 className="font-hand text-4xl leading-none md:text-5xl">{copy.h1}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-600">{copy.intro}</p>
      </header>
      <div className="rise" style={{ animationDelay: "80ms" }}>
        <PaperGenerator defaultType={page.type} lockType defaultFormat={defaultPageFormat(locale)} />
      </div>
      <div className="rise mt-6" style={{ animationDelay: "120ms" }}>
        <ShareBar />
      </div>
      <nav className="mt-8 flex flex-wrap gap-2 text-sm">
        {PAPER_KINDS.filter((k) => k.slug !== page.slug).map((k) => (
          <Link
            key={k.slug}
            href={`/printable-paper/${k.slug}`}
            className="rounded-full border border-zinc-200 px-3 py-1 text-zinc-600 hover:border-zinc-400"
          >
            {k.copy[locale].label}
          </Link>
        ))}
      </nav>
      <ToolFaq
        title={t("faqTitle")}
        items={getLocalizedFaqs(paperKindFaqs(page.slug), locale)}
      />
    </main>
  );
}
