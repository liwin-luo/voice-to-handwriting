"use client";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { Link } from "@/i18n/navigation";

export interface TemplateCard {
  slug: string;
  title: string;
  description: string;
}

/** 模板搜索 + 卡片网格:按当前语言的标题/描述/正文关键词过滤 */
export default function TemplatesBrowser({ templates }: { templates: TemplateCard[] }) {
  const t = useTranslations("templates");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return templates;
    return templates.filter((t2) =>
      `${t2.title} ${t2.description}`.toLowerCase().includes(q),
    );
  }, [query, templates]);

  return (
    <div className="flex flex-col gap-5">
      <label className="relative block">
        <MagnifyingGlass className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("searchPlaceholder")}
          className="surface-input w-full py-2.5 pl-10 pr-3"
        />
      </label>

      <p className="font-mono text-[11px] text-zinc-400">
        {filtered.length} / {templates.length}
      </p>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-zinc-300 py-16">
          <p className="font-hand text-3xl text-zinc-300">{t("noResult")}</p>
          <p className="text-sm text-zinc-400">{t("noResultHint")}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {filtered.map((tpl, i) => (
            <Link
              key={tpl.slug}
              href={`/templates/${tpl.slug}`}
              className="group flex flex-col gap-2 rounded-2xl border border-zinc-200 bg-white p-5 transition-all duration-300 hover:border-zinc-300 hover:shadow-[0_16px_32px_-20px_rgba(23,23,23,0.2)]"
              style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }}
            >
              <span className="flex items-center justify-between gap-3">
                <span className="text-[17px] font-semibold text-zinc-900 transition-colors group-hover:text-accent">
                  {tpl.title}
                </span>
                <ArrowRight />
              </span>
              <span className="text-sm leading-relaxed text-zinc-500">{tpl.description}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function ArrowRight() {
  // 内联箭头,避免额外依赖路径
  return (
    <svg viewBox="0 0 256 256" className="size-4 shrink-0 text-zinc-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent" fill="currentColor" aria-hidden>
      <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L187.06,140H40a8,8,0,0,1,0-16H187.06L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72Z" />
    </svg>
  );
}
