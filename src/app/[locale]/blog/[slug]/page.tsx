import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { POSTS, getPostMeta } from "@/content/posts";
import { BLOG_CONTENT } from "@/content/blog/registry";
import ProseShell from "@/components/ProseShell";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => POSTS.map((p) => ({ locale, slug: p.slug })));
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
  return (
    <ProseShell>
      <Body />
    </ProseShell>
  );
}
