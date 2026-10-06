import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import HistoryPanel from "@/components/HistoryPanel";
import { SITE } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.history" });
  return { title: t("title"), description: t("description") };
}

export default async function HistoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("meta.history");

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <header className="rise">
        <h1 className="font-hand text-4xl leading-none">{t("title")}</h1>
        <p className="mt-3 text-sm text-zinc-500">{t("description")}</p>
      </header>
      <div className="rise mt-9" style={{ animationDelay: "80ms" }}>
        <HistoryPanel />
      </div>
      <p className="mt-8 text-xs text-zinc-400">{SITE.name} · localStorage</p>
    </main>
  );
}
