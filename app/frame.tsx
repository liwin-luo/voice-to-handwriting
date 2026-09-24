"use client";

import Link from "next/link";

const STEPS = [
  { href: "/", label: "Voice" },
  { href: "/text", label: "Text" },
  { href: "/handwriting", label: "Handwriting" },
];

export function Frame({ step, children }: { step?: 1 | 2 | 3; children: React.ReactNode }) {
  return (
    <>
      <header className="nav">
        <Link className="logo" href="/">
          <svg viewBox="0 0 32 32" aria-hidden="true">
            <rect width="32" height="32" rx="8" fill="#1f4fd8"/>
            <path d="M8 11.5c2.2 1.2 4.4 8.2 7.2 10.2 2.6 1.8 5.2-6.4 8.8-8.4" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round"/>
          </svg>
          Voice to Handwriting
        </Link>
        <span className="domain">voicetohandwriting.online</span>
      </header>
      <nav className="steps">
        {STEPS.map((item, index) => (
          <Link key={item.href} href={item.href} aria-current={index + 1 === step ? "step" : undefined}>
            <span>{index + 1}</span>
            {item.label}
          </Link>
        ))}
      </nav>
      <main className="stage">{children}</main>
      <footer className="foot">
        <Link href="/faq">FAQ</Link>
        <Link href="/privacy">Privacy</Link>
        <Link href="/contact">Contact</Link>
      </footer>
    </>
  );
}
