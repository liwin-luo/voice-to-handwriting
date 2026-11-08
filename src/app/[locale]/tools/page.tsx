import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { toolGroupsFor } from "@/lib/tools";
import { getPaper } from "@/engine/paper";
import { FONTS } from "@/stores/useEditorStore";
import ToolLane from "@/components/ToolLane";
import PageHeader from "@/components/ui/PageHeader";
import { pageMetadata } from "@/lib/seo";

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
  return pageMetadata("/tools", locale as Locale, {
    title: t("title"),
    description: t("description"),
  });
}

/** 每个工具卡顶部纸样的字体与纸底:取该工具默认输出的代表组合(rx/festive 等装饰纸直接用)。 */
const TOOL_SWATCH: Record<string, { fontId: string; paperId: string }> = {
  "/": { fontId: "patrickhand", paperId: "ruled" },
  "/cursive": { fontId: "cedarvillecursive", paperId: "ruled" },
  "/cursive-text-generator": { fontId: "sacramento", paperId: "letter" },
  "/cursive-font-generator": { fontId: "dancingscript", paperId: "letter" },
  "/templates": { fontId: "dancingscript", paperId: "letter" },
  "/printable-handwritten-letters": { fontId: "dancingscript", paperId: "letter" },
  "/handwriting-workbook-generator": { fontId: "patrickhand", paperId: "ruled" },
  "/name-tracing": { fontId: "patrickhand", paperId: "ruled" },
  "/handwriting-worksheet-generator": { fontId: "patrickhand", paperId: "ruled" },
  "/printable-paper": { fontId: "patrickhand", paperId: "grid" },
  "/handwriting-page-calculator": { fontId: "patrickhand", paperId: "grid" },
  "/cursive-alphabet": { fontId: "sacramento", paperId: "ruled" },
  "/cursive-worksheets": { fontId: "sacramento", paperId: "ruled" },
  "/handwriting-sentence-practice": { fontId: "kalam", paperId: "ruled" },
  "/number-tracing": { fontId: "patrickhand", paperId: "ruled" },
  "/writing-practice": { fontId: "mashanzheng", paperId: "grid" },
  "/word-work": { fontId: "patrickhand", paperId: "ruled" },
  "/name-coloring": { fontId: "indieflower", paperId: "blank" },
  "/handwriting-personality-quiz": { fontId: "caveat", paperId: "blank" },
  "/doctor-handwriting-generator": { fontId: "caveat", paperId: "rx" },
};

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

  const fontCss = (fontId: string) => FONTS.find((f) => f.id === fontId)!.css;

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <PageHeader title={t("title")} intro={t("intro")} />
      {toolGroupsFor(locale).map((group, gi) => (
        <ToolLane
          key={group.labelKey}
          title={tnav(group.labelKey)}
          sample={t("sampleWord")}
          delayMs={80 + gi * 60}
          tools={group.tools.map((tool) => {
            const swatch = TOOL_SWATCH[tool.href] ?? { fontId: "patrickhand", paperId: "ruled" };
            return {
              href: tool.href,
              name: tool.brand ? tmeta("brand") : tnav(tool.navKey),
              description: tool.brand ? tmeta("description") : tmeta(`${tool.metaKey}.description`),
              fontCss: fontCss(swatch.fontId),
              paperBackground: getPaper(swatch.paperId).background,
            };
          })}
        />
      ))}
    </main>
  );
}
