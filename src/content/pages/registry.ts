import type { ComponentType } from "react";
import type { Locale } from "@/i18n/routing";
import aboutEn from "./about.en.mdx";
import aboutZh from "./about.zh.mdx";
import aboutEs from "./about.es.mdx";
import aboutPt from "./about.pt.mdx";
import privacyEn from "./privacy.en.mdx";
import privacyZh from "./privacy.zh.mdx";
import privacyEs from "./privacy.es.mdx";
import privacyPt from "./privacy.pt.mdx";
import termsEn from "./terms.en.mdx";
import termsZh from "./terms.zh.mdx";
import termsEs from "./terms.es.mdx";
import termsPt from "./terms.pt.mdx";
import contactEn from "./contact.en.mdx";
import contactZh from "./contact.zh.mdx";
import contactEs from "./contact.es.mdx";
import contactPt from "./contact.pt.mdx";

export type PageKey = "about" | "privacy" | "terms" | "contact";

/** 页面 key → 语言 → 内容组件(2026-11-18 起四语,es/pt 从 e13f8a8^ 找回,广告披露段已同步新口径) */
export const PAGE_CONTENT: Record<PageKey, Record<Locale, ComponentType>> = {
  about: { en: aboutEn, zh: aboutZh, es: aboutEs, pt: aboutPt },
  privacy: { en: privacyEn, zh: privacyZh, es: privacyEs, pt: privacyPt },
  terms: { en: termsEn, zh: termsZh, es: termsEs, pt: termsPt },
  contact: { en: contactEn, zh: contactZh, es: contactEs, pt: contactPt },
};
