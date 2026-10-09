import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { FONTS } from "@/stores/useEditorStore";
import { LETTER_TRACING_UI, PRINT_LETTERS } from "@/content/letterTracing";
import { buildAlternates } from "@/lib/seo";

/** 印刷体字母描红 hub。仅 en，理由同 cursive-alphabet。 */
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
    title: LETTER_TRACING_UI.hubMetaTitle,
    description: LETTER_TRACING_UI.hubMetaDescription,
    alternates: buildAlternates("/letter-tracing", locale as Locale, ["en"]),
  };
}

export default async function LetterTracingHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale) || locale !== routing.defaultLocale) notFound();
  setRequestLocale(locale);
  const font = FONTS.find((item) => item.id === "patrickhand") ?? FONTS[0];

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <header className="rise">
        <h1 className="text-2xl font-bold leading-snug md:text-3xl">{LETTER_TRACING_UI.hubH1}</h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-600">{LETTER_TRACING_UI.hubIntro}</p>
      </header>
      <div className="rise mt-8 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
        {PRINT_LETTERS.map((letter) => (
          <Link
            key={letter.slug}
            href={`/letter-tracing/${letter.slug}`}
            className="group flex flex-col items-center gap-1 rounded-2xl border border-zinc-200 bg-white px-3 py-4 transition-colors hover:border-accent/40"
          >
            <span
              className="pb-2 text-3xl leading-none text-zinc-900 transition-colors group-hover:text-accent"
              style={{ fontFamily: font.css }}
              aria-hidden
            >
              {letter.slug}
            </span>
            <span className="text-[11px] leading-tight text-zinc-400">
              {LETTER_TRACING_UI.cardLabel} {letter.slug}
            </span>
          </Link>
        ))}
      </div>
      <p className="mt-8 text-sm text-zinc-600">
        <Link href="/name-tracing" className="text-accent underline-offset-2 hover:underline">
          {LETTER_TRACING_UI.nameTracingLink}
        </Link>{" "}
        {LETTER_TRACING_UI.nameTracingRest}
      </p>
    </main>
  );
}
