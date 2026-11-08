import type { ComponentType } from "react";
import type { Locale } from "@/i18n/routing";
import aboutEn from "./about.en.mdx";
import privacyEn from "./privacy.en.mdx";
import termsEn from "./terms.en.mdx";
import contactEn from "./contact.en.mdx";

export type PageKey = "about" | "privacy" | "terms" | "contact";

/** 页面 key → 语言 → 内容组件 */
export const PAGE_CONTENT: Record<PageKey, Record<Locale, ComponentType>> = {
  about: { en: aboutEn },
  privacy: { en: privacyEn },
  terms: { en: termsEn },
  contact: { en: contactEn },
};
