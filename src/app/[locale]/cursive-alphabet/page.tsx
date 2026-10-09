import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import CursiveAlphabetPanel from "@/components/CursiveAlphabetPanel";
import ToolFaq from "@/components/ToolFaq";
import ShareBar from "@/components/ShareBar";
import { ALPHABET_PAGE } from "@/content/cursiveAlphabet";
import { buildAlternates } from "@/lib/seo";

/** 交互式连笔字母表(Phase 0 仅 en:其他语言 404,sitemap 只输出 en 变体;
 *  文案来自 cursiveAlphabet 内容模块,理由同 cursiveLetters.ts) */
export function generateStaticParams() {
  return [{ locale: routing.defaultLocale }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== routing.defaultLocale) return {};
  return {
    title: ALPHABET_PAGE.metaTitle,
    description: ALPHABET_PAGE.metaDescription,
    alternates: buildAlternates("/cursive-alphabet", locale as Locale, ["en"]),
  };
}

export default async function CursiveAlphabetPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale) || locale !== routing.defaultLocale) notFound();
  setRequestLocale(locale);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <header className="rise mb-7 max-w-3xl">
        <h1 className="font-hand text-4xl leading-none md:text-5xl">{ALPHABET_PAGE.h1}</h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-600">{ALPHABET_PAGE.intro}</p>
      </header>
      <div className="rise max-w-3xl" style={{ animationDelay: "80ms" }}>
        <CursiveAlphabetPanel />
      </div>
      <p className="rise mt-6 max-w-3xl text-sm leading-relaxed" style={{ animationDelay: "120ms" }}>
        Want custom words instead of the alphabet? The{" "}
        <Link href="/cursive-worksheets" className="text-accent underline-offset-2 hover:underline">
          cursive worksheet generator
        </Link>{" "}
        takes any word list, and the{" "}
        <Link href="/cursive" className="text-accent underline-offset-2 hover:underline">
          cursive writing generator
        </Link>{" "}
        renders full sentences you can trace or export.
      </p>
      <div className="rise mt-6" style={{ animationDelay: "160ms" }}>
        <ShareBar />
      </div>
      <section
        className="rise mt-10 max-w-3xl text-sm leading-relaxed text-zinc-600"
        style={{ animationDelay: "200ms" }}
      >
        <h2 className="mb-2 text-base font-semibold text-zinc-900">{ALPHABET_PAGE.seoTitle}</h2>
        <p className="whitespace-pre-line">{ALPHABET_PAGE.seoText}</p>
      </section>
      <ToolFaq title="Cursive alphabet FAQ" items={ALPHABET_PAGE.faqs} />
    </main>
  );
}
