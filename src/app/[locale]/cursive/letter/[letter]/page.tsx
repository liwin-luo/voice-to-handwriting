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
  letterWorkbookWords,
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
  const workbookHref = `/handwriting-workbook-generator?words=${encodeURIComponent(
    letterWorkbookWords(page, copy),
  )}`;

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

      {/* 字形展示 + 练习词条 */}
      <div className="rise mt-8 grid grid-cols-[auto_1fr] items-center gap-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-paper sm:gap-8" style={{ animationDelay: "80ms" }}>
        <div
          className="select-none text-7xl leading-none text-zinc-900 sm:text-8xl"
          style={{ fontFamily: font.css }}
          aria-hidden
        >
          {page.letter}
        </div>
        <div>
          <h2 className="text-xs font-semibold tracking-wide text-zinc-400 uppercase">{ui.wordsTitle}</h2>
          <p
            className="mt-3 leading-[44px] text-zinc-800"
            style={{
              fontFamily: font.css,
              fontSize: 30,
              backgroundImage: `repeating-linear-gradient(to bottom, transparent 0 ${CELLS - 1}px, #e2e8f0 ${CELLS - 1}px ${CELLS}px)`,
            }}
          >
            {[page.letter, ...copy.words].join("  ·  ")}
          </p>
        </div>
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

      {/* 练习纸 CTA */}
      <section className="rise mt-10 rounded-2xl border border-accent/20 bg-accent/5 p-6" style={{ animationDelay: "160ms" }}>
        <h2 className="text-base font-semibold text-zinc-900">{ui.ctaTitle}</h2>
        <div className="mt-4 flex flex-col items-start gap-3">
          <Link href={workbookHref} className="btn btn-primary px-6 py-3">
            {ui.ctaButton}
            <ArrowRight className="size-4" />
          </Link>
          <p className="text-xs leading-relaxed text-zinc-500">{ui.ctaHint}</p>
        </div>
      </section>

      <ToolFaq title={ui.faqTitle} items={copy.faqs} />

      {/* 同族字母导航 */}
      <nav className="rise mt-10 flex items-center justify-between gap-4 border-t border-zinc-100 pt-6" style={{ animationDelay: "180ms" }}>
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
    </main>
  );
}
