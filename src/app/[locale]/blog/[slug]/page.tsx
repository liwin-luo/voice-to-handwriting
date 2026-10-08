import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { POSTS, getPostMeta } from "@/content/posts";
import { getAuthor } from "@/content/authors";
import { BLOG_CONTENT, postLocales } from "@/content/blog/registry";
import { postReadingMinutes } from "@/lib/reading";
import ProseShell from "@/components/ProseShell";
import RelatedLinks from "@/components/RelatedLinks";
import { SITE } from "@/lib/site";
import { buildAlternates, localizedUrl } from "@/lib/seo";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    POSTS.filter((p) => BLOG_CONTENT[p.slug]?.[locale]).map((p) => ({ locale, slug: p.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  // 没有正文的语言变体是 404,不能再输出文章标题(否则软 404 仍挂着原文 title)
  if (!BLOG_CONTENT[slug]?.[locale as Locale]) return {};
  const meta = getPostMeta(slug, locale as Locale);
  return meta
    ? {
        title: meta.title,
        description: meta.description,
        alternates: buildAlternates(`/blog/${slug}`, locale as Locale, postLocales(slug)),
      }
    : {};
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const Body = BLOG_CONTENT[slug]?.[locale as Locale];
  if (!Body) notFound();

  const post = POSTS.find((p) => p.slug === slug);
  const meta = getPostMeta(slug, locale as Locale);
  // 署名按文章的写作角色(posts.ts 的 author),笔名全语言一致,role/bio 随语言回退 en
  const author = getAuthor(post?.author, locale as Locale);
  const ta = await getTranslations({ locale, namespace: "author" });
  const tp = await getTranslations({ locale, namespace: "post" });

  // 阅读时长:直接统计对应语言的 MDX 源文件
  const minutes = postReadingMinutes(slug, locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta?.title,
    description: meta?.description,
    inLanguage: locale,
    datePublished: post?.date,
    dateModified: post?.updated,
    author: { "@type": "Person", name: author.name, url: `${SITE.url}/about` },
    publisher: { "@type": "Organization", name: ta("name"), url: SITE.url },
    ...(post?.image ? { image: `${SITE.url}${post.image}` } : {}),
    mainEntityOfPage: localizedUrl(`/blog/${slug}`, locale),
  };

  return (
    <ProseShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* 署名栏:写作角色 / 更新时间 / 阅读时长(EEAT);悬浮显示角色 bio */}
      <div className="mb-8 flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-zinc-200 pb-4 text-xs text-zinc-500">
        <span className="font-medium text-zinc-700" title={author.bio}>
          {author.name}
        </span>
        <span className="text-zinc-300">·</span>
        <span>{author.role}</span>
        <span className="text-zinc-300">·</span>
        <span>
          {tp("updated")} {post?.updated}
        </span>
        <span className="text-zinc-300">·</span>
        <span>{tp("reading", { m: minutes })}</span>
      </div>
      {post?.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.image}
          alt={meta?.title ?? ""}
          width={1440}
          height={900}
          className="mb-8 w-full rounded-xl border border-zinc-200"
        />
      )}
      <Body />
      <RelatedLinks slug={slug} locale={locale as Locale} />
    </ProseShell>
  );
}
