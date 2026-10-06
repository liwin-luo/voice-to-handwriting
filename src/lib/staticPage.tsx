import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import ProseShell from "@/components/ProseShell";
import { PAGE_CONTENT, type PageKey } from "@/content/pages/registry";

/** 生成 about/privacy/terms/contact 的通用页面:内容来自 src/content/pages 的双语 MDX */
export function makeStaticPage(key: PageKey) {
  async function Page({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)) notFound();
    setRequestLocale(locale);
    const Body = PAGE_CONTENT[key][locale as Locale];
    return (
      <ProseShell>
        <Body />
      </ProseShell>
    );
  }

  async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: `meta.${key}` });
    return { title: t("title"), description: t("description") };
  }

  return { Page, generateMetadata };
}
