import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["zh", "en"],
  defaultLocale: "zh",
  localePrefix: "as-needed", // 中文无前缀,英文 /en
});

export type Locale = (typeof routing.locales)[number];
