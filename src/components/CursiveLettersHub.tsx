import { Link } from "@/i18n/navigation";
import { FONTS } from "@/stores/useEditorStore";
import { getLetterUi, lettersForLocale } from "@/content/cursiveLetters";
import type { Locale } from "@/i18n/routing";

/** /cursive 页底部的字母矩阵 hub:仅当前语言有字母页时渲染(Phase 0 只有 en) */
export default function CursiveLettersHub({ locale }: { locale: Locale }) {
  const ui = getLetterUi(locale);
  const letters = lettersForLocale(locale);
  if (!ui || letters.length === 0) return null;
  const font = FONTS.find((f) => f.id === "cedarvillecursive") ?? FONTS[0];

  return (
    <section className="rise mt-10" style={{ animationDelay: "180ms" }}>
      <h2 className="text-base font-semibold text-zinc-900">{ui.hubTitle}</h2>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-600">{ui.hubIntro}</p>
      <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
        {letters.map((l) => (
          <Link
            key={l.slug}
            href={`/cursive/letter/${l.slug}`}
            className="group flex flex-col items-center gap-1 rounded-2xl border border-zinc-200 bg-white px-3 py-4 transition-colors hover:border-accent/40"
          >
            <span className="text-3xl leading-none text-zinc-900 transition-colors group-hover:text-accent" style={{ fontFamily: font.css }} aria-hidden>
              {l.letter}
            </span>
            <span className="text-[11px] leading-tight text-zinc-400">
              {l.form === "lowercase" ? ui.hubLowercase : ui.hubCapital} {l.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
