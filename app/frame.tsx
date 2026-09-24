"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { Copy, LocaleId } from "@/lib/copy";
import { LOCALES, localizedPath } from "@/lib/locales.mjs";

const STEPS = ["/", "/text", "/handwriting"] as const;

export function Frame({ locale, copy, step, children }: { locale: LocaleId; copy: Copy; step?: 1 | 2 | 3; children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const labels = [copy.nav.voice, copy.nav.text, copy.nav.handwriting];
  return (
    <>
      <header className="nav">
        <Link className="logo" href={localizedPath(locale, "/")}>
          <svg viewBox="0 0 32 32" aria-hidden="true">
            <rect width="32" height="32" rx="8" fill="#1f4fd8"/>
            <path d="M8 11.5c2.2 1.2 4.4 8.2 7.2 10.2 2.6 1.8 5.2-6.4 8.8-8.4" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round"/>
          </svg>
          Voice to Handwriting
        </Link>
        <span className="nav-end">
          <span className="domain">voicetohandwriting.online</span>
          <label className="lang">
            <span className="sr">{copy.nav.language}</span>
            <select
              aria-label={copy.nav.language}
              value={locale}
              onChange={(event) => router.push(localizedPath(event.target.value, pathname))}
            >
              {LOCALES.map((item) => (
                <option key={item.id} value={item.id}>{copyName(item.id)}</option>
              ))}
            </select>
          </label>
        </span>
      </header>
      <nav className="steps">
        {STEPS.map((href, index) => (
          <Link key={href} href={localizedPath(locale, href)} aria-current={index + 1 === step ? "step" : undefined}>
            <span>{index + 1}</span>
            {labels[index]}
          </Link>
        ))}
      </nav>
      <main className="stage">{children}</main>
      <footer className="foot">
        <Link href={localizedPath(locale, "/faq")}>{copy.nav.faq}</Link>
        <Link href={localizedPath(locale, "/privacy")}>{copy.nav.privacy}</Link>
        <Link href={localizedPath(locale, "/contact")}>{copy.nav.contact}</Link>
      </footer>
    </>
  );
}

function copyName(id: string) {
  const names: Record<string, string> = {
    en: "English", zh: "中文", hi: "हिन्दी", es: "Español", fr: "Français",
    ar: "العربية", bn: "বাংলা", pt: "Português", ru: "Русский", ur: "اردو",
  };
  return names[id] || id;
}
