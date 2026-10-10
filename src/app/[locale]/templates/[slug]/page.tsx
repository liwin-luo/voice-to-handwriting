import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { routing, type Locale } from "@/i18n/routing";
import ToolFaq from "@/components/ToolFaq";
import { templateDetailFaqs } from "@/content/pageFaqs";
import { getTemplate, getTemplateMeta, TEMPLATES } from "@/content/templates";
import { FONTS } from "@/stores/useEditorStore";
import { getPaper } from "@/engine/paper";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => TEMPLATES.map((t) => ({ locale, slug: t.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const tplObj = getTemplate(slug);
  const meta = tplObj ? getTemplateMeta(tplObj, locale as Locale)! : undefined;
  return meta
    ? pageMetadata(`/templates/${slug}`, locale as Locale, {
        title: meta.title,
        description: meta.description,
      })
    : {};
}

export default async function TemplateDetail({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const tpl = getTemplate(slug);
  if (!tpl) notFound();
  const meta = getTemplateMeta(tpl, locale as Locale);
  const t = await getTranslations("templates");
  const tm = await getTranslations("meta.templates");
  const font = FONTS.find((f) => f.id === tpl.style.fontId) ?? FONTS[0];
  const paper = getPaper(tpl.style.paperId);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <Link
        href="/templates"
        className="inline-flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-zinc-800"
      >
        <ArrowLeft className="size-3.5" />
        {tm("title")}
      </Link>

      <header className="rise mt-6">
        <h1 className="text-2xl font-bold leading-snug">{meta.title}</h1>
        <p className="mt-2 text-sm leading-relaxed text-zinc-500">{meta.description}</p>
      </header>

      {/* 手写效果预览:使用模板配套的字体/纸张/墨色/对齐 */}
      <div className="rise shadow-paper mt-8 overflow-hidden rounded-xl" style={{ animationDelay: "80ms" }}>
        <div
          className="p-8 sm:p-12"
          style={{ background: paper.background }}
        >
          <p
            className="whitespace-pre-wrap text-2xl leading-relaxed sm:text-3xl"
            style={{
              fontFamily: font.css,
              color: tpl.style.ink,
              textAlign: tpl.style.align,
              textIndent: tpl.style.indent ? "2em" : 0,
            }}
          >
            {meta.text}
          </p>
        </div>
      </div>

      <div className="rise mt-8 flex flex-col items-start gap-3" style={{ animationDelay: "160ms" }}>
        <Link href={`/?template=${tpl.slug}`} className="btn btn-primary px-6 py-3">
          {t("use")}
        </Link>
        <p className="text-xs text-zinc-400">{t("editHint")}</p>
      </div>
      <ToolFaq title={t("faqTitle")} items={templateDetailFaqs(meta, locale as Locale, t("use"))} />
    </main>
  );
}
