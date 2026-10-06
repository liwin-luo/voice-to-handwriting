import { ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import ToolWorkspace from "@/components/ToolWorkspace";
import AdSlot from "@/components/AdSlot";
import { SITE } from "@/lib/site";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const meta = await getTranslations("meta");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: meta("brand"),
    url: SITE.url,
    description: meta("description"),
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "CNY" },
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="rise mb-7 flex flex-col gap-3">
        <h1 className="font-hand text-4xl leading-none md:text-5xl">{meta("brand")}</h1>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="text-[15px] text-zinc-600">{t("tagline")}</p>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-xs text-zinc-500">
            <ShieldCheck weight="duotone" className="size-3.5 text-accent" />
            {t("badge")}
          </span>
        </div>
      </header>
      <div className="rise" style={{ animationDelay: "80ms" }}>
        <ToolWorkspace />
      </div>
      <div className="rise mt-10" style={{ animationDelay: "160ms" }}>
        <AdSlot />
      </div>
      <footer className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-400">
        <span>{t("footerNote")}</span>
        <Link
          href="/blog"
          className="text-accent underline underline-offset-2 hover:text-accent-strong"
        >
          {t("blogLink")}
        </Link>
      </footer>
    </main>
  );
}
