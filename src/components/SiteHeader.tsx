import { getTranslations } from "next-intl/server";
import Logo from "./Logo";
import NavDropdown from "./NavDropdown";
import { Link } from "@/i18n/navigation";
import LocaleSwitch from "./LocaleSwitch";
import { TOOL_GROUPS } from "@/lib/tools";

export default async function SiteHeader() {
  const t = await getTranslations("nav");
  const brand = await getTranslations("meta");
  const groups = TOOL_GROUPS.map((g) => ({
    label: t(g.labelKey),
    items: g.tools.map((tool) => ({
      href: tool.href,
      label: tool.brand ? brand("brand") : t(tool.navKey),
    })),
  }));

  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200/80 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 text-sm">
        <Link href="/" className="group flex items-center gap-2">
          <Logo className="size-6 text-accent transition-transform duration-300 group-hover:-rotate-6" />
          <span className="font-hand text-xl leading-none">{brand("brand")}</span>
        </Link>
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-zinc-600">
          <Link href="/" className="transition-colors hover:text-zinc-950">
            {t("tool")}
          </Link>
          <NavDropdown label={t("allTools")} groups={groups} />
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
