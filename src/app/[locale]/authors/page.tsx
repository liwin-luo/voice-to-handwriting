import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CORE_LOCALES, routing, type Locale } from "@/i18n/routing";
import PageHeader from "@/components/ui/PageHeader";
import { Link } from "@/i18n/navigation";
import { AUTHORS, type AuthorId } from "@/content/authors";
import { POSTS } from "@/content/posts";
import { pageMetadata } from "@/lib/seo";

// 2026-11-18 起 /authors 门控 en+zh(es/pt 的桌位区未翻译,404;hreflang/sitemap 同口径)
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
  const t = await getTranslations({ locale, namespace: "meta.authors" });
  return pageMetadata("/authors", locale as Locale, {
    title: t("title"),
    description: t("description"),
  }, { available: CORE_LOCALES });
}

export default async function AuthorsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale) || !CORE_LOCALES.includes(locale as Locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("authors");

  const desks = Object.values(AUTHORS).map((a) => ({
    ...a,
    role: a.i18n[locale as Locale]?.role ?? a.i18n.en!.role,
    bio: a.i18n[locale as Locale]?.bio ?? a.i18n.en!.bio,
    posts: POSTS.filter((p) => p.author === a.id).length,
  }));

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <PageHeader title={t("title")} intro={t("intro")} />
      <div className="rise mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {desks.map((a, i) => (
          <Link
            key={a.id}
            href={`/authors/${a.id}`}
            className="card group flex flex-col gap-2 p-5 transition-colors duration-150 hover:border-accent focus-visible:outline-2 focus-visible:outline-accent"
            style={{ animationDelay: `${80 + i * 40}ms` }}
          >
            <span className="font-display text-lg font-semibold text-stone-900 group-hover:text-accent">
              {a.name}
            </span>
            <span className="field-label">{a.role}</span>
            <span className="text-[13px] leading-relaxed text-stone-600">{a.bio}</span>
            <span className="mt-1 text-xs text-stone-400">
              {t("postCount", { n: a.posts })}
            </span>
          </Link>
        ))}
      </div>
      <p className="rise mt-8 max-w-3xl text-xs leading-relaxed text-stone-400" style={{ animationDelay: "300ms" }}>
        {t("disclosure")}
      </p>
    </main>
  );
}
