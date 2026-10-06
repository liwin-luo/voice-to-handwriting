import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { readFileSync } from "node:fs";
import path from "node:path";
import { routing, type Locale } from "@/i18n/routing";
import { POSTS, getPostMeta } from "@/content/posts";
import { BLOG_CONTENT } from "@/content/blog/registry";
import ProseShell from "@/components/ProseShell";
import { SITE } from "@/lib/site";

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
  const meta = getPostMeta(slug, locale as Locale);
  return meta ? { title: meta.title, description: meta.description } : {};
}

/** 粗略阅读时长:中文按字数、拉丁按词数估算 */
function readingMinutes(mdx: string, locale: string): number {
  const plain = mdx
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#>*`[\]()!-]/g, " ")
    .replace(/\s+/g, " ");
  const cjk = (plain.match(/[\u3400-\u9fff\u3040-\u30ff\uac00-\ud7af]/g) ?? []).length;
  const words = plain.replace(/[\u3400-\u9fff\u3040-\u30ff\uac00-\ud7af]/g, " ").trim().split(/\s+/).filter(Boolean).length;
  const minutes = cjk / 400 + words / 200;
  return Math.max(1, Math.round(minutes));
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
  const ta = await getTranslations({ locale, namespace: "author" });
  const tp = await getTranslations({ locale, namespace: "post" });

  // 阅读时长:直接统计对应语言的 MDX 源文件
  const mdxPath = path.join(process.cwd(), `src/content/blog/${slug}.${locale}.mdx`);
  let mdx = "";
  try {
    mdx = readFileSync(mdxPath, "utf8");
  } catch {
    /* 语言文件缺失时按 1 分钟处理 */
  }
  const minutes = readingMinutes(mdx, locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta?.title,
    description: meta?.description,
    inLanguage: locale,
    datePublished: post?.date,
    dateModified: post?.updated,
    author: { "@type": "Organization", name: ta("name"), url: `${SITE.url}/about` },
    publisher: { "@type": "Organization", name: ta("name"), url: SITE.url },
    image: `${SITE.url}${post?.image ?? ""}`,
    mainEntityOfPage: `${SITE.url}/${locale === "zh" ? "" : locale + "/"}blog/${slug}`,
  };

  return (
    <ProseShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* 署名栏:作者 / 更新时间 / 阅读时长(EEAT) */}
      <div className="mb-8 flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-zinc-200 pb-4 text-xs text-zinc-500">
        <span className="font-medium text-zinc-700">{ta("name")}</span>
        <span className="text-zinc-300">·</span>
        <span>{ta("role")}</span>
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
    </ProseShell>
  );
}
