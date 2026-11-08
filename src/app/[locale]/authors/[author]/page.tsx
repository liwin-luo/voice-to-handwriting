import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import PageHeader from "@/components/ui/PageHeader";
import { Link } from "@/i18n/navigation";
import { AUTHORS, type AuthorId } from "@/content/authors";
import { getPostMeta, POSTS } from "@/content/posts";
import { SITE } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    Object.keys(AUTHORS).map((author) => ({ locale, author })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; author: string }>;
}): Promise<Metadata> {
  const { locale, author } = await params;
  const a = AUTHORS[author as AuthorId];
  if (!a) return pageMetadata("/authors", locale as Locale);
  const meta = a.i18n[locale as Locale] ?? a.i18n.en!;
  return pageMetadata(`/authors/${author}`, locale as Locale, {
    title: `${a.name} — ${meta.role}`,
    description: meta.bio,
  });
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ locale: string; author: string }>;
}) {
  const { locale, author } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const a = AUTHORS[author as AuthorId];
  if (!a) notFound();
  const ta = await getTranslations("author");
  const meta = a.i18n[locale as Locale] ?? a.i18n.en!;
  const posts = POSTS.filter((p) => p.author === a.id).sort((x, y) => (x.updated < y.updated ? 1 : -1));

  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: a.name,
    description: meta.bio,
    jobTitle: meta.role,
    url: `${SITE.url}/authors/${a.id}`,
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
      <Link href="/authors" className="text-sm text-stone-500 transition-colors hover:text-stone-800">
        ← {ta("backToAuthors")}
      </Link>
      <div className="rise mt-4">
        <PageHeader
          title={a.name}
          intro={meta.bio}
          badge={<span className="field-label">{meta.role}</span>}
        />
      </div>
      <section className="rise mt-10" style={{ animationDelay: "120ms" }}>
        <h2 className="section-title mb-3">{ta("postCount", { n: posts.length })}</h2>
        <ul className="flex flex-col gap-3">
          {posts.map((p) => {
            const m = getPostMeta(p.slug, locale as Locale)!;
            return (
              <li key={p.slug} className="card p-4">
                <Link
                  href={`/blog/${p.slug}`}
                  className="font-medium text-stone-900 underline-offset-2 transition-colors hover:text-accent hover:underline"
                >
                  {m.title}
                </Link>
                <p className="mt-1 text-xs text-stone-400">
                  {ta("updatedLabel")} {p.updated}
                </p>
              </li>
            );
          })}
        </ul>
      </section>
      <p className="rise mt-8 text-xs leading-relaxed text-stone-400" style={{ animationDelay: "200ms" }}>
        {ta("penNameDisclosure")}
      </p>
    </main>
  );
}
