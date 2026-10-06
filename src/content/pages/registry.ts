import type { ComponentType } from "react";
import type { Locale } from "@/i18n/routing";
import aboutZh from "./about.zh.mdx";
import aboutEn from "./about.en.mdx";
import aboutJa from "./about.ja.mdx";
import aboutKo from "./about.ko.mdx";
import aboutEs from "./about.es.mdx";
import privacyZh from "./privacy.zh.mdx";
import privacyEn from "./privacy.en.mdx";
import privacyJa from "./privacy.ja.mdx";
import privacyKo from "./privacy.ko.mdx";
import privacyEs from "./privacy.es.mdx";
import termsZh from "./terms.zh.mdx";
import termsEn from "./terms.en.mdx";
import termsJa from "./terms.ja.mdx";
import termsKo from "./terms.ko.mdx";
import termsEs from "./terms.es.mdx";
import contactZh from "./contact.zh.mdx";
import contactEn from "./contact.en.mdx";
import contactJa from "./contact.ja.mdx";
import contactKo from "./contact.ko.mdx";
import contactEs from "./contact.es.mdx";

export type PageKey = "about" | "privacy" | "terms" | "contact";

/** 页面 key → 语言 → 内容组件 */
export const PAGE_CONTENT: Record<PageKey, Record<Locale, ComponentType>> = {
  about: { zh: aboutZh, en: aboutEn, ja: aboutJa, ko: aboutKo, es: aboutEs },
  privacy: { zh: privacyZh, en: privacyEn, ja: privacyJa, ko: privacyKo, es: privacyEs },
  terms: { zh: termsZh, en: termsEn, ja: termsJa, ko: termsKo, es: termsEs },
  contact: { zh: contactZh, en: contactEn, ja: contactJa, ko: contactKo, es: contactEs },
};
