export const LOCALES = [
  { id: "en", hreflang: "en", dir: "ltr", prefix: "" },
  { id: "zh", hreflang: "zh-Hans", dir: "ltr", prefix: "/zh" },
  { id: "hi", hreflang: "hi", dir: "ltr", prefix: "/hi" },
  { id: "es", hreflang: "es", dir: "ltr", prefix: "/es" },
  { id: "fr", hreflang: "fr", dir: "ltr", prefix: "/fr" },
  { id: "ar", hreflang: "ar", dir: "rtl", prefix: "/ar" },
  { id: "bn", hreflang: "bn", dir: "ltr", prefix: "/bn" },
  { id: "pt", hreflang: "pt-BR", dir: "ltr", prefix: "/pt" },
  { id: "ru", hreflang: "ru", dir: "ltr", prefix: "/ru" },
  { id: "ur", hreflang: "ur", dir: "rtl", prefix: "/ur" },
];

export const PAGES = ["/", "/text", "/handwriting", "/faq", "/privacy", "/contact"];

export function localeById(id) {
  return LOCALES.find((locale) => locale.id === id);
}

export function localeFromPath(pathname) {
  return LOCALES.find((locale) => locale.prefix && (pathname === locale.prefix || pathname.startsWith(`${locale.prefix}/`))) || LOCALES[0];
}

export function barePath(pathname) {
  const locale = localeFromPath(pathname);
  if (!locale.prefix) return pathname || "/";
  const rest = pathname.slice(locale.prefix.length) || "/";
  return rest.startsWith("/") ? rest : `/${rest}`;
}

export function localizedPath(id, pathname) {
  const locale = localeById(id) || LOCALES[0];
  const bare = barePath(pathname);
  if (!locale.prefix) return bare;
  return bare === "/" ? locale.prefix : `${locale.prefix}${bare}`;
}
