import type { Metadata } from "next";
import { ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import ToolWorkspace from "@/components/ToolWorkspace";
import ToolFaq from "@/components/ToolFaq";
import ShareBar from "@/components/ShareBar";
import PageHeader from "@/components/ui/PageHeader";
import { getLocalizedFaqs, FAQ_ITEMS } from "@/content/faqs";
import { getPaper } from "@/engine/paper";
import { FONTS } from "@/stores/useEditorStore";
import { SITE } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

/** 证明带:三张真实纸样的 CSS 渲染(calligraphr 的「样张即产品演示」,零图片成本)。
    字体与纸底均为站内默认输出的真实组合。 */
const PROOF_SAMPLES = [
  { fontId: "kalam", paperId: "ruled", line: "Dear diary — the quick brown fox jumps over the lazy dog." },
  { fontId: "dancingscript", paperId: "letter", line: "Thank you so much for having us. It meant a lot." },
  { fontId: "caveat", paperId: "rx", line: "Take one tablet daily, with a bit of coffee." },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata("/", locale as Locale);
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const meta = await getTranslations("meta");
  const faqTitle = await getTranslations("meta.faq");
  // ponytail: 10–12 月显示圣诞信。次年秋天自己回来，没有活动配置。
  const showSantaLinks = new Date().getUTCMonth() >= 9;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: meta("brand"),
    url: SITE.url,
    description: meta("description"),
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHeader
        title={t("h1")}
        intro={t("tagline")}
        badge={
          <span className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-2 py-0.5 text-xs text-zinc-500">
            <ShieldCheck weight="duotone" className="size-3.5 text-accent" />
            {t("badge")}
          </span>
        }
      />
      <div className="rise" style={{ animationDelay: "80ms" }}>
        <ToolWorkspace />
      </div>
      <div className="rise mt-6" style={{ animationDelay: "120ms" }}>
        <ShareBar />
      </div>
      {/* 证明带:工具之下的三种真实输出样张 */}
      <div className="rise mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3" style={{ animationDelay: "160ms" }} aria-hidden>
        {PROOF_SAMPLES.map((s) => {
          const font = FONTS.find((f) => f.id === s.fontId)!;
          return (
            <div key={s.paperId} className="card overflow-hidden">
              <div className="h-28 border-b border-zinc-100" style={{ background: getPaper(s.paperId).background }}>
                <p className="px-4 pt-6 text-lg leading-snug text-zinc-800" style={{ fontFamily: font.css }}>
                  {s.line}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <ToolFaq title={faqTitle("title")} items={getLocalizedFaqs(FAQ_ITEMS, locale as Locale)} />
      <footer className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-400">
        <span>{t("footerNote")}</span>
        <Link
          href="/tools"
          className="text-accent underline underline-offset-2 hover:text-accent-strong"
        >
          {t("allToolsLink")}
        </Link>
        <Link
          href="/blog"
          className="text-accent underline underline-offset-2 hover:text-accent-strong"
        >
          {t("blogLink")}
        </Link>
        <Link
          href="/name-tracing"
          className="text-accent underline underline-offset-2 hover:text-accent-strong"
        >
          {t("nameTracingLink")}
        </Link>
        <Link
          href="/cursive-worksheets"
          className="text-accent underline underline-offset-2 hover:text-accent-strong"
        >
          {t("cursiveWorksheetsLink")}
        </Link>
        {showSantaLinks && (
          <>
            <Link
              href="/blog/letter-to-santa-template"
              className="text-accent underline underline-offset-2 hover:text-accent-strong"
            >
              {t("letterToSantaLink")}
            </Link>
            <Link
              href="/templates/letter-from-santa"
              className="text-accent underline underline-offset-2 hover:text-accent-strong"
            >
              {t("letterFromSantaLink")}
            </Link>
          </>
        )}
      </footer>
    </main>
  );
}
