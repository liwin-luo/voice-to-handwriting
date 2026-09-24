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
        <Link className="logo" href="/">Voice to Handwriting</Link>
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
