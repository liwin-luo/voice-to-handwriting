import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { FEATURED_HREF, toolGroupsFor } from "@/lib/tools";
import { getPaper } from "@/engine/paper";
import { FONTS } from "@/stores/useEditorStore";
import { defaultFontId } from "@/lib/localeDefaults";
import ToolLane from "@/components/ToolLane";
import { buildAlternates } from "@/lib/seo";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.tools" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: buildAlternates("/tools", locale as Locale),
  };
}

export default async function ToolsHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("tools");
  const tnav = await getTranslations("nav");
  const tmeta = await getTranslations("meta");

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <header className="rise mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 md:text-4xl">{t("title")}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600">{t("intro")}</p>
      </header>
      {toolGroupsFor(locale).map((group, gi) => {
        const fontCss = FONTS.find((f) => f.id === defaultFontId(locale))!.css;
        return (
          <ToolLane
            key={group.labelKey}
            title={tnav(group.labelKey)}
            sample={t("sampleWord")}
            fontCss={fontCss}
            paperBackground={getPaper(group.labelKey === "groupFun" ? "letter" : "ruled").background}
            featuredHref={FEATURED_HREF[group.labelKey]}
            delayMs={80 + gi * 60}
            tools={group.tools.map((tool) => ({
              href: tool.href,
              name: tool.brand ? tmeta("brand") : tnav(tool.navKey),
              description: tool.brand ? tmeta("description") : tmeta(`${tool.metaKey}.description`),
            }))}
          />
        );
      })}
    </main>
  );
}
