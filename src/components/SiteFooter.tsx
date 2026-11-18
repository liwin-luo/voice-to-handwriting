import { getLocale, getTranslations } from "next-intl/server";
import { CORE_LOCALES, type Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { DIRECT_LINK_URL } from "@/lib/ads";
import { SITE } from "@/lib/site";

export default async function SiteFooter() {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");
  const meta = await getTranslations("meta");
  const icp = process.env.NEXT_PUBLIC_ICP;
  // es/pt 不译博客与 FAQ 目录(对应页 404),页脚隐藏这两个入口
  const showCoreLinks = CORE_LOCALES.includes(await getLocale() as Locale);
  return (
    <footer className="mt-14 border-t border-stone-200 py-7 text-[13px] text-stone-500">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4">
        <nav className="flex flex-wrap gap-x-5 gap-y-2">
          <Link href="/" className="transition-colors hover:text-stone-900">
            {nav("tool")}
          </Link>
          {showCoreLinks && (
            <Link href="/blog" className="transition-colors hover:text-stone-900">
              {nav("blog")}
            </Link>
          )}
          <Link href="/about" className="transition-colors hover:text-stone-900">
            {nav("about")}
          </Link>
          <Link href="/privacy" className="transition-colors hover:text-stone-900">
            {t("privacy")}
          </Link>
          <Link href="/terms" className="transition-colors hover:text-stone-900">
            {t("terms")}
          </Link>
          <Link href="/contact" className="transition-colors hover:text-stone-900">
            {t("contact")}
          </Link>
          {showCoreLinks && (
            <Link href="/faq" className="transition-colors hover:text-stone-900">
              {t("faq")}
            </Link>
          )}
          {/* Direct Link 广告(Smartlink):纯导航链接,无脚本注入;按 Google 规范标注 sponsored */}
          {DIRECT_LINK_URL && (
            <a
              href={DIRECT_LINK_URL}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="transition-colors hover:text-stone-900"
            >
              {t("sponsored")}
            </a>
          )}
        </nav>
        <p className="text-stone-400">
          © {new Date().getFullYear()} {meta("brand")}
        </p>
        {icp && (
          <p>
            <a
              href="https://beian.miit.gov.cn/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-stone-900"
            >
              {icp}
            </a>
          </p>
        )}
      </div>
    </footer>
  );
}
