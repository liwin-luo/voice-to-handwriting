import { getTranslations } from "next-intl/server";
import Logo from "./Logo";
import { Link } from "@/i18n/navigation";
import LocaleSwitch from "./LocaleSwitch";

export default async function SiteHeader() {
  const t = await getTranslations("nav");
  const brand = await getTranslations("meta");
  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200/80 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 text-sm">
        <Link href="/" className="group flex items-center gap-2">
          <Logo className="size-6 text-accent transition-transform duration-300 group-hover:-rotate-6" />
          <span className="font-hand text-xl leading-none">{brand("brand")}</span>
        </Link>
        <nav className="flex items-center gap-5 text-zinc-600">
          <Link href="/" className="transition-colors hover:text-zinc-950">
            {t("tool")}
          </Link>
          <Link href="/templates" className="transition-colors hover:text-zinc-950">
            {t("templates")}
          </Link>
          <Link href="/history" className="transition-colors hover:text-zinc-950">
            {t("history")}
          </Link>
          <Link href="/blog" className="transition-colors hover:text-zinc-950">
            {t("blog")}
          </Link>
          <Link href="/about" className="transition-colors hover:text-zinc-950">
            {t("about")}
          </Link>
          <LocaleSwitch />
        </nav>
      </div>
    </header>
  );
}
