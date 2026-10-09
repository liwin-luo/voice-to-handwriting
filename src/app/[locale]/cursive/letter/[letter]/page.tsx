import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, ArrowRight, X } from "@phosphor-icons/react/dist/ssr";
import { routing, type Locale } from "@/i18n/routing";
import { FONTS } from "@/stores/useEditorStore";
import ToolFaq from "@/components/ToolFaq";
import {
  CURSIVE_LETTERS,
  getLetterPage,
  getLetterUi,
  letterPracticeWords,
  lettersForLocale,
} from "@/content/cursiveLetters";
import { buildAlternates } from "@/lib/seo";

/** 单字母矩阵页(Phase 0 仅 en;其他语言 404,sitemap 同步只输出 en 变体) */
export function generateStaticParams() {
  return CURSIVE_LETTERS.flatMap((l) =>
    l.copy.en ? [{ locale: routing.defaultLocale, letter: l.slug }] : [],
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; letter: string }>;
}): Promise<Metadata> {
  const { locale, letter } = await params;
  const entry = getLetterPage(letter, locale as Locale);
  if (!entry) return {};
  return {
    title: entry.meta.title,
    description: entry.meta.description,
    alternates: buildAlternates(`/cursive/letter/${letter}`, locale as Locale, ["en"]),
  };
}

const CELLS = 44; // 练习条基线间距(px),与字号配平

export default async function CursiveLetterPage({
  params,
}: {
  params: Promise<{ locale: string; letter: string }>;
}) {
  const { locale, letter } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const entry = getLetterPage(letter, locale as Locale);
  const ui = getLetterUi(locale as Locale);
  if (!entry || !ui) notFound();
  const { page, copy } = entry;

  const available = lettersForLocale(locale as Locale);
  const idx = available.findIndex((l) => l.slug === page.slug);
  const prev = idx > 0 ? available[idx - 1] : undefined;
  const next = idx >= 0 && idx < available.length - 1 ? available[idx + 1] : undefined;
  const font = FONTS.find((f) => f.id === "cedarvillecursive") ?? FONTS[0];
  const sheetHref = `/cursive-worksheets?words=${encodeURIComponent(letterPracticeWords(copy))}`;

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <Link
        href="/cursive"
        className="inline-flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-zinc-800"
      >
        <ArrowLeft className="size-3.5" />
        {ui.backToCursive}
      </Link>

      <header className="rise mt-6">
        <h1 className="text-2xl font-bold leading-snug md:text-3xl">{copy.h1}</h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-600">{copy.intro}</p>
      </header>

      <div
        className="rise mt-8 flex items-end justify-center rounded-2xl border border-zinc-200 bg-white px-6 pt-8 pb-4 shadow-paper"
        style={{ animationDelay: "80ms" }}
      >
        <p
          className="select-none text-8xl leading-none text-zinc-900 sm:text-9xl"
          style={{ fontFamily: font.css }}
        >
          {page.letter}
        </p>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-zinc-400">{ui.fontNote}</p>

      {/* 笔顺 */}
      <section className="rise mt-10" style={{ animationDelay: "120ms" }}>
        <h2 className="text-base font-semibold text-zinc-900">{ui.stepsTitle}</h2>
        <ol className="mt-4 flex flex-col gap-3">
          {copy.steps.map((step, i) => (
            <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-zinc-600">
              <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-semibold text-accent">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </section>

      {/* 常见错误 */}
      <section className="rise mt-10" style={{ animationDelay: "140ms" }}>
        <h2 className="text-base font-semibold text-zinc-900">{ui.mistakesTitle}</h2>
        <ul className="mt-4 flex flex-col gap-3">
          {copy.mistakes.map((mistake, i) => (
            <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-zinc-600">
              <X className="mt-0.5 size-4 shrink-0 text-red-700/70" weight="bold" />
              {mistake}
            </li>
          ))}
        </ul>
      </section>

      <nav className="rise mt-10 flex items-center justify-between gap-4 border-t border-zinc-100 pt-6" style={{ animationDelay: "160ms" }}>
        {prev ? (
          <Link
            href={`/cursive/letter/${prev.slug}`}
            className="group inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-800"
            aria-label={ui.prevLetter}
          >
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span className="text-xl" style={{ fontFamily: font.css }} aria-hidden>
              {prev.letter}
            </span>
            cursive {prev.name}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/cursive/letter/${next.slug}`}
            className="group inline-flex items-center gap-2 text-right text-sm text-zinc-500 transition-colors hover:text-zinc-800"
            aria-label={ui.nextLetter}
          >
            cursive {next.name}
            <span className="text-xl" style={{ fontFamily: font.css }} aria-hidden>
              {next.letter}
            </span>
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        ) : (
          <span />
        )}
      </nav>

      <section className="rise mt-10" style={{ animationDelay: "180ms" }}>
        <h2 className="text-xs font-semibold tracking-wide text-zinc-400 uppercase">{ui.wordsTitle}</h2>
        <p
          className="mt-3 leading-[44px] text-zinc-800"
          style={{
            fontFamily: font.css,
            fontSize: 30,
            backgroundImage: `repeating-linear-gradient(to bottom, transparent 0 ${CELLS - 1}px, #e2e8f0 ${CELLS - 1}px ${CELLS}px)`,
          }}
        >
          {copy.words.join("  ·  ")}
        </p>
      </section>

      <section className="rise mt-10 rounded-2xl border border-accent/20 bg-accent/5 p-6" style={{ animationDelay: "200ms" }}>
        <h2 className="text-base font-semibold text-zinc-900">{ui.ctaTitle}</h2>
        <div className="mt-4 flex flex-col items-start gap-3">
          <Link href={sheetHref} className="btn btn-primary px-6 py-3">
            {ui.ctaButton}
            <ArrowRight className="size-4" />
          </Link>
          <p className="text-xs leading-relaxed text-zinc-500">{ui.ctaHint}</p>
          <p className="text-sm">
            <Link href="/cursive-alphabet" className="text-accent underline-offset-2 hover:underline">
              {ui.hubCta} →
            </Link>
          </p>
        </div>
      </section>

      <ToolFaq title={ui.faqTitle} items={copy.faqs} />
    </main>
  );
}
