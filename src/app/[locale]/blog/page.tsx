import type { Metadata } from "next";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { POSTS } from "@/content/posts";
import { BLOG_CONTENT } from "@/content/blog/registry";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.blog" });
  return { title: t("title"), description: t("description") };
}

export default async function BlogIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("blog");
  const tm = await getTranslations("meta.blog");

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <header className="rise">
        <h1 className="font-hand text-4xl leading-none">{tm("title")}</h1>
        <p className="mt-3 text-sm text-zinc-500">{t("tagline")}</p>
      </header>
      <ul className="mt-9 flex flex-col gap-4">
        {POSTS.map((p, i) => {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const meta = (p.i18n[locale as Locale] ?? p.i18n.en)!;
          return (
            <li key={p.slug} className="rise" style={{ animationDelay: `${80 + i * 60}ms` }}>
              <Link
                href={`/blog/${p.slug}`}
                className="group flex flex-col gap-1.5 rounded-2xl border border-zinc-200 bg-white p-5 transition-all duration-300 hover:border-zinc-300 hover:shadow-[0_16px_32px_-20px_rgba(23,23,23,0.2)]"
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="text-[17px] font-semibold text-zinc-900 transition-colors group-hover:text-accent">
                    {meta.title}
                  </span>
                  <ArrowRight className="size-4 shrink-0 text-zinc-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent" />
                </span>
                <span className="text-sm leading-relaxed text-zinc-500">{meta.description}</span>
                <time className="font-mono text-[11px] text-zinc-400">{p.date}</time>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="rise mt-10" style={{ animationDelay: "260ms" }}>
      </div>
    </main>
  );
}
