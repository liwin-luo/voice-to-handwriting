import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { TOOL_GROUPS } from "@/lib/tools";
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
        <h1 className="font-hand text-4xl leading-none md:text-5xl">{t("title")}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600">{t("intro")}</p>
      </header>
      {TOOL_GROUPS.map((group, gi) => (
        <section
          key={group.labelKey}
          className="rise mt-8"
          style={{ animationDelay: `${80 + gi * 60}ms` }}
        >
          <h2 className="mb-3 text-base font-semibold text-zinc-900">{tnav(group.labelKey)}</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {group.tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group rounded-2xl border border-zinc-200 bg-white p-5 transition-all duration-300 hover:border-accent hover:shadow-[0_10px_30px_-14px_rgba(21,49,126,0.35)]"
              >
                <p className="font-hand text-xl text-zinc-900 transition-colors group-hover:text-accent">
                  {tool.brand ? tmeta("brand") : tnav(tool.navKey)}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                  {tool.brand ? tmeta("description") : tmeta(`${tool.metaKey}.description`)}
                </p>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
