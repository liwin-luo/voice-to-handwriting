import type { ComponentType } from "react";
import type { Locale } from "@/i18n/routing";
import aboutZh from "./about.zh.mdx";
import aboutEn from "./about.en.mdx";
import privacyZh from "./privacy.zh.mdx";
import privacyEn from "./privacy.en.mdx";
import termsZh from "./terms.zh.mdx";
import termsEn from "./terms.en.mdx";
import contactZh from "./contact.zh.mdx";
import contactEn from "./contact.en.mdx";

export type PageKey = "about" | "privacy" | "terms" | "contact";

/** 页面 key → 语言 → 内容组件 */
export const PAGE_CONTENT: Record<PageKey, Record<Locale, ComponentType>> = {
  about: { zh: aboutZh, en: aboutEn },
  privacy: { zh: privacyZh, en: privacyEn },
  terms: { zh: termsZh, en: termsEn },
  contact: { zh: contactZh, en: contactEn },
};
