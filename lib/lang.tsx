import { notFound } from "next/navigation";
import { COPY, type LocaleId, type PageId } from "@/lib/copy";
import { LOCALES, localeById } from "@/lib/locales.mjs";
import { pageMetadata } from "@/lib/seo";

export function langParams() {
  return LOCALES.filter((locale) => locale.id !== "en").map((locale) => ({ lang: locale.id }));
}

export async function langMetadata(params: Promise<{ lang: string }>, page: PageId) {
  const { lang } = await params;
  const locale = localeById(lang);
  if (!locale || locale.id === "en") return {};
  return pageMetadata(locale.id as LocaleId, page);
}

export async function readLang(params: Promise<{ lang: string }>) {
  const { lang } = await params;
  const locale = localeById(lang);
  if (!locale || locale.id === "en") notFound();
  const id = locale.id as LocaleId;
  return { id, copy: COPY[id] };
}
