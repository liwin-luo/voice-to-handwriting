import type { Metadata } from "next";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import AdSlot from "@/components/AdSlot";
import { TEMPLATES } from "@/content/templates";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.templates" });
  return { title: t("title"), description: t("description") };
}

export default async function TemplatesIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("templates");
  const tm = await getTranslations("meta.templates");

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <header className="rise">
        <h1 className="font-hand text-4xl leading-none">{tm("title")}</h1>
        <p className="mt-3 text-sm text-zinc-500">{t("tagline")}</p>
      </header>
      <div className="mt-9 grid grid-cols-1 gap-4 md:grid-cols-2">
        {TEMPLATES.map((tpl, i) => {
          const meta = tpl.i18n[locale as Locale];
          return (
            <Link
              key={tpl.slug}
              href={`/templates/${tpl.slug}`}
              className="rise group flex flex-col gap-2 rounded-2xl border border-zinc-200 bg-white p-5 transition-all duration-300 hover:border-zinc-300 hover:shadow-[0_16px_32px_-20px_rgba(23,23,23,0.2)]"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <span className="flex items-center justify-between gap-3">
                <span className="text-[17px] font-semibold text-zinc-900 transition-colors group-hover:text-accent">
                  {meta.title}
                </span>
                <ArrowRight className="size-4 shrink-0 text-zinc-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent" />
              </span>
              <span className="text-sm leading-relaxed text-zinc-500">{meta.description}</span>
            </Link>
          );
        })}
      </div>
      <div className="rise mt-10" style={{ animationDelay: "200ms" }}>
        <AdSlot />
      </div>
    </main>
  );
}
