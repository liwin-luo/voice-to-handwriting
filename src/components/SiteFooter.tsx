import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SITE } from "@/lib/site";

export default async function SiteFooter() {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");
  const meta = await getTranslations("meta");
  const icp = process.env.NEXT_PUBLIC_ICP;
  return (
    <footer className="mt-14 border-t border-zinc-200 py-7 text-[13px] text-zinc-500">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4">
        <nav className="flex flex-wrap gap-x-5 gap-y-2">
          <Link href="/" className="transition-colors hover:text-zinc-900">
            {nav("tool")}
          </Link>
          <Link href="/blog" className="transition-colors hover:text-zinc-900">
            {nav("blog")}
          </Link>
          <Link href="/about" className="transition-colors hover:text-zinc-900">
            {nav("about")}
          </Link>
          <Link href="/privacy" className="transition-colors hover:text-zinc-900">
            {t("privacy")}
          </Link>
          <Link href="/terms" className="transition-colors hover:text-zinc-900">
            {t("terms")}
          </Link>
          <Link href="/contact" className="transition-colors hover:text-zinc-900">
            {t("contact")}
          </Link>
        </nav>
        <p className="text-zinc-400">
          © {new Date().getFullYear()} {meta("brand")}
        </p>
        {icp && (
          <p>
            <a
              href="https://beian.miit.gov.cn/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-zinc-900"
            >
              {icp}
            </a>
          </p>
        )}
      </div>
    </footer>
  );
}
