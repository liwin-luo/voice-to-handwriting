"use client";
import { Printer, PencilSimpleLine, PenNib } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

/** 首页「更多免费工具」卡片区:周边工具的显性入口 + SEO 内链 */
export default function HomeToolsSection() {
  const t = useTranslations("home.moreTools");

  const cards = [
    {
      href: "/printable-paper",
      icon: Printer,
      title: t("printablePaperTitle"),
      desc: t("printablePaperDesc"),
    },
    {
      href: "/name-tracing",
      icon: PencilSimpleLine,
      title: t("nameTracingTitle"),
      desc: t("nameTracingDesc"),
    },
    {
      href: "/cursive",
      icon: PenNib,
      title: t("cursiveTitle"),
      desc: t("cursiveDesc"),
    },
  ];

  return (
    <section className="mt-12">
      <h2 className="text-base font-semibold text-zinc-900">{t("title")}</h2>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group flex flex-col gap-1.5 rounded-2xl border border-zinc-200 bg-white p-5 transition-all duration-300 hover:border-zinc-300 hover:shadow-[0_16px_32px_-20px_rgba(23,23,23,0.2)]"
          >
            <c.icon weight="duotone" className="size-6 text-accent" />
            <span className="mt-2 text-[15px] font-semibold text-zinc-900 transition-colors group-hover:text-accent">
              {c.title}
            </span>
            <span className="text-sm leading-relaxed text-zinc-500">{c.desc}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
