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
import aboutDe from "./about.de.mdx";
import aboutFr from "./about.fr.mdx";
import aboutPt from "./about.pt.mdx";
import privacyDe from "./privacy.de.mdx";
import privacyFr from "./privacy.fr.mdx";
import privacyPt from "./privacy.pt.mdx";
import termsDe from "./terms.de.mdx";
import termsFr from "./terms.fr.mdx";
import termsPt from "./terms.pt.mdx";
import contactDe from "./contact.de.mdx";
import contactFr from "./contact.fr.mdx";
import contactPt from "./contact.pt.mdx";

export type PageKey = "about" | "privacy" | "terms" | "contact";

/** 页面 key → 语言 → 内容组件 */
export const PAGE_CONTENT: Record<PageKey, Record<Locale, ComponentType>> = {
  about: { zh: aboutZh, en: aboutEn, ja: aboutJa, ko: aboutKo, es: aboutEs, de: aboutDe, fr: aboutFr, pt: aboutPt },
  privacy: { zh: privacyZh, en: privacyEn, ja: privacyJa, ko: privacyKo, es: privacyEs, de: privacyDe, fr: privacyFr, pt: privacyPt },
  terms: { zh: termsZh, en: termsEn, ja: termsJa, ko: termsKo, es: termsEs, de: termsDe, fr: termsFr, pt: termsPt },
  contact: { zh: contactZh, en: contactEn, ja: contactJa, ko: contactKo, es: contactEs, de: contactDe, fr: contactFr, pt: contactPt },
};
