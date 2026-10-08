import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { POSTS } from "@/content/posts";
import { getAuthor } from "@/content/authors";
import { BLOG_CONTENT } from "@/content/blog/registry";
import { RELATED, TOOL_LABEL_KEY } from "@/content/related";
import BlogExplorer, { type BlogCardData, type ToolOption } from "@/components/BlogExplorer";
import { postReadingMinutes } from "@/lib/reading";
import { buildAlternates } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.blog" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: buildAlternates("/blog", locale as Locale),
  };
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
  const tNav = await getTranslations("nav");

  const cards: BlogCardData[] = POSTS.filter((p) => BLOG_CONTENT[p.slug]?.[locale as Locale]).map((p) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const meta = (p.i18n[locale as Locale] ?? p.i18n.en)!;
    return {
      slug: p.slug,
      title: meta.title,
      description: meta.description,
      date: p.date,
      updated: p.updated,
      image: p.image,
      author: getAuthor(p.author, locale as Locale).name,
      minutes: postReadingMinutes(p.slug, locale),
      tools: RELATED[p.slug]?.tools ?? [],
    };
  });

  // 筛选项 = 本语言文章实际关联的工具,按 TOOL_LABEL_KEY 的顺序稳定输出
  const used = new Set(cards.flatMap((c) => c.tools));
  const toolOptions: ToolOption[] = Object.keys(TOOL_LABEL_KEY)
    .filter((href) => used.has(href))
    .map((href) => ({ href, label: tNav(TOOL_LABEL_KEY[href]) }));

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <header className="rise">
        <h1 className="font-hand text-4xl leading-none">{tm("title")}</h1>
        <p className="mt-3 max-w-2xl text-sm text-zinc-500">{t("tagline")}</p>
      </header>
      <div className="rise mt-8" style={{ animationDelay: "80ms" }}>
        <BlogExplorer posts={cards} toolOptions={toolOptions} />
      </div>
    </main>
  );
}
