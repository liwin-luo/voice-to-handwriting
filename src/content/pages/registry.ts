import type { ComponentType } from "react";
import type { Locale } from "@/i18n/routing";
import aboutEn from "./about.en.mdx";
import aboutZh from "./about.zh.mdx";
import privacyEn from "./privacy.en.mdx";
import privacyZh from "./privacy.zh.mdx";
import termsEn from "./terms.en.mdx";
import termsZh from "./terms.zh.mdx";
import contactEn from "./contact.en.mdx";
import contactZh from "./contact.zh.mdx";

export type PageKey = "about" | "privacy" | "terms" | "contact";

/** 页面 key → 语言 → 内容组件 */
export const PAGE_CONTENT: Record<PageKey, Record<Locale, ComponentType>> = {
  about: { en: aboutEn, zh: aboutZh },
  privacy: { en: privacyEn, zh: privacyZh },
  terms: { en: termsEn, zh: termsZh },
  contact: { en: contactEn, zh: contactZh },
};
