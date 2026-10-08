import { getTranslations } from "next-intl/server";
import SiteNav from "./SiteNav";
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
