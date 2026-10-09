import { getLocale, getTranslations } from "next-intl/server";
import SiteNav from "./SiteNav";
import { toolGroupsFor } from "@/lib/tools";

export default async function SiteHeader() {
  const locale = await getLocale();
  const t = await getTranslations("nav");
  const brand = await getTranslations("meta");
  const groups = toolGroupsFor(locale).map((g) => ({
    label: t(g.labelKey),
    items: g.tools.map((tool) => ({
      href: tool.href,
      label: tool.brand ? brand("brand") : t(tool.navKey),
    })),
  }));

  return (
    <SiteNav
      brand={brand("brand")}
      groups={groups}
      allToolsLabel={t("allTools")}
      blogLabel={t("blog")}
      aboutLabel={t("about")}
      menuLabel={t("menu")}
    />
  );
}
