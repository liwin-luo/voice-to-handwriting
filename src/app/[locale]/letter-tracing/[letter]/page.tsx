import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { routing, type Locale } from "@/i18n/routing";
import { FONTS } from "@/stores/useEditorStore";
import LetterTraceRows from "@/components/LetterTraceRows";
import LetterTracingDownload from "@/components/LetterTracingDownload";
import ToolFaq from "@/components/ToolFaq";
import {
  LETTER_TRACING_UI,
  getPrintLetter,
  letterFaqs,
  letterTracingMetaDescription,
  letterTracingMetaTitle,
  letterTracingTitle,
  printLetterNeighbors,
} from "@/content/letterTracing";
import { pageMetadata } from "@/lib/seo";

/** 单字母描红。仅 en。 */
export function generateStaticParams() {
  return PRINT_PARAMS;
}

const PRINT_PARAMS = "abcdefghijklmnopqrstuvwxyz".split("").map((letter) => ({
  locale: routing.defaultLocale,
  letter,
}));

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; letter: string }>;
}): Promise<Metadata> {
  const { locale, letter } = await params;
  const page = getPrintLetter(letter);
  if (locale !== routing.defaultLocale || !page) return {};
  return pageMetadata(
    `/letter-tracing/${letter}`,
    locale as Locale,
    { title: letterTracingMetaTitle(page), description: letterTracingMetaDescription(page) },
    { available: ["en"] },
  );
}

export default async function LetterTracingPage({
  params,
}: {
  params: Promise<{ locale: string; letter: string }>;
}) {
  const { locale, letter } = await params;
  const page = getPrintLetter(letter);
  if (!hasLocale(routing.locales, locale) || locale !== routing.defaultLocale || !page) notFound();
  setRequestLocale(locale);
  const font = FONTS.find((item) => item.id === "patrickhand") ?? FONTS[0];
  const { prev, next } = printLetterNeighbors(page.slug);
  const ui = LETTER_TRACING_UI;

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <Link
        href="/letter-tracing"
        className="inline-flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-zinc-800"
      >
        <ArrowLeft className="size-3.5" />
        {ui.back}
      </Link>

      <header className="rise mt-6">
        <h1 className="text-2xl font-bold leading-snug md:text-3xl">{letterTracingTitle(page)}</h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-600">{page.seat}</p>
      </header>

      <div className="rise mt-8">
        <LetterTraceRows
          letter={page.slug}
          fontCss={font.css}
          exampleLabel={`${ui.exampleRow}: ${page.slug}`}
          dottedLabel={`${ui.dottedRow}: ${page.slug}`}
        />
        <p className="mt-2 text-xs leading-relaxed text-zinc-400">{ui.fontNote}</p>
        <div className="mt-4 flex flex-col items-start gap-3">
          <LetterTracingDownload letter={page.slug} />
          <p className="text-xs leading-relaxed text-zinc-500">
            {ui.sizeLead}{" "}
            <Link href={`/name-tracing?letter=${page.slug}`} className="text-accent underline-offset-2 hover:underline">
              {ui.nameTracingLink}
            </Link>
          </p>
        </div>
      </div>

      <section className="rise mt-10">
        <h2 className="text-base font-semibold text-zinc-900">{ui.stepsTitle}</h2>
        <ol className="mt-4 flex flex-col gap-3">
          {[page.start, page.motion].map((step, index) => (
            <li key={index} className="flex items-start gap-3 text-sm leading-relaxed text-zinc-600">
              <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-semibold text-accent">
                {index + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </section>

      <section className="rise mt-10">
        <h2 className="text-base font-semibold text-zinc-900">{ui.mistakesTitle}</h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-600">{page.watch}</p>
      </section>

      <section className="rise mt-10">
        <h2 className="text-xs font-semibold tracking-wide text-zinc-400 uppercase">{ui.wordsTitle}</h2>
        <p className="mt-3 text-2xl text-zinc-800" style={{ fontFamily: font.css }}>
          {page.words.join("  ·  ")}
        </p>
      </section>

      <nav className="rise mt-10 flex items-center justify-between gap-4 border-t border-zinc-100 pt-6">
        {prev ? (
          <Link
            href={`/letter-tracing/${prev.slug}`}
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-800"
          >
            <ArrowLeft className="size-3.5" />
            {ui.cardLabel} {prev.slug}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/letter-tracing/${next.slug}`}
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-800"
          >
            {ui.cardLabel} {next.slug}
            <ArrowRight className="size-3.5" />
          </Link>
        ) : (
          <span />
        )}
      </nav>

      <ToolFaq title={ui.faqTitle} items={letterFaqs(page)} />
    </main>
  );
}
