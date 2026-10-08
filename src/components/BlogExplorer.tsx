"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, CaretDown, CaretLeft, CaretRight, CaretUp, Funnel } from "@phosphor-icons/react";
import { Link } from "@/i18n/navigation";
import { hiddenChipCount } from "@/components/chipOverflow";

export interface BlogCardData {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated: string;
  image?: string;
  author: string;
  minutes: number;
  tools: string[];
}

export interface ToolOption {
  href: string;
  label: string;
}

type SortKey = "newest" | "oldest" | "updated";

const PAGE_SIZE = 12;

/** 无题图时的封面:横线纸 + 装订线,标题写在纸面中央 */
function TitleCover({ title, featured }: { title: string; featured: boolean }) {
  return (
    <span aria-hidden className="absolute inset-0 flex items-center overflow-hidden bg-[#f6f3ec] pr-5 pl-4">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(to_bottom,transparent_0_27px,rgba(21,49,126,0.08)_27px_28px)]"
      />
      <span aria-hidden className="pointer-events-none absolute inset-y-3 left-6 w-px bg-[#e7b4b4]" />
      <span
        className={`relative w-full min-w-0 pl-5 font-semibold tracking-tight text-accent ${
          featured
            ? "text-[1.7rem] leading-[1.22] md:pl-6 md:text-[2.45rem] md:leading-[1.15]"
            : "line-clamp-4 text-[1.5rem] leading-[1.28]"
        }`}
      >
        {title}
      </span>
    </span>
  );
}

/** 分页页码窗口:总数少时全部展示,多时以当前页为中心收拢 */
function pageWindow(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = new Set<number>([1, total, current - 1, current, current + 1]);
  const sorted = [...pages].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);
  const out: (number | "…")[] = [];
  let prev = 0;
  for (const n of sorted) {
    if (n - prev > 1) out.push("…");
    out.push(n);
    prev = n;
  }
  return out;
}

export default function BlogExplorer({ posts, toolOptions }: { posts: BlogCardData[]; toolOptions: ToolOption[] }) {
  const t = useTranslations("blog");
  const tPost = useTranslations("post");
  const [tool, setTool] = useState<string | null>(null);
  const [sort, setSort] = useState<SortKey>("newest");
  const [page, setPage] = useState(1);
  // 筛选行默认单行:放不下时收进「+N」展开按钮,点击展开为多行
  const clusterRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLButtonElement>(null);
  const [overflowing, setOverflowing] = useState(false);
  const [hiddenCount, setHiddenCount] = useState(0);
  const [visibleCount, setVisibleCount] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);

  const filtered = useMemo(() => {
    const list = tool ? posts.filter((p) => p.tools.includes(tool)) : posts.slice();
    const byNewest = (a: BlogCardData, b: BlogCardData) =>
      b.date.localeCompare(a.date) || b.updated.localeCompare(a.updated) || a.slug.localeCompare(b.slug);
    list.sort(
      sort === "oldest"
        ? (a, b) => -byNewest(a, b)
        : sort === "updated"
          ? (a, b) => b.updated.localeCompare(a.updated) || byNewest(a, b)
          : byNewest,
    );
    return list;
  }, [posts, tool, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pagePosts = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const pickTool = (href: string | null) => {
    setTool(href);
    setPage(1);
  };

  const optionKey = toolOptions.map((o) => o.label).join("\0");
  const showToggle = overflowing;

  // 按整行可用宽度计隐藏数,不读 clip 自身宽度(藏起的 chip 会离开文档流,clip 会变窄)。
  // 展开按钮始终占「+N」的宽度,避免换成箭头后第一行再挤进一颗。
  useLayoutEffect(() => {
    const measure = () => {
      const cluster = clusterRef.current;
      const clip = clipRef.current;
      const more = moreRef.current;
      if (!cluster || !clip || !more) return;
      const chipGap = Number.parseFloat(getComputedStyle(clip).columnGap) || 0;
      const rowGap = Number.parseFloat(getComputedStyle(cluster).columnGap) || 0;
      const buttons = [...clip.querySelectorAll(":scope > button")] as HTMLElement[];
      const widths = buttons.map((b) => b.offsetWidth);
      const funnel = cluster.querySelector("svg");
      const funnelW = funnel ? funnel.getBoundingClientRect().width : 0;
      let avail = cluster.clientWidth - funnelW - rowGap;
      const moreInFlow = getComputedStyle(more).position !== "absolute";
      if (moreInFlow) avail -= more.offsetWidth + rowGap;
      let hidden = hiddenChipCount(widths, chipGap, avail);
      if (hidden > 0 && !moreInFlow) {
        hidden = hiddenChipCount(widths, chipGap, avail - more.offsetWidth - rowGap);
      }
      const visible = widths.length - hidden;
      setVisibleCount((v) => (v === visible ? v : visible));
      setHiddenCount((n) => (n === hidden ? n : hidden));
      setOverflowing((flag) => (flag === hidden > 0 ? flag : hidden > 0));
    };
    measure();
    const node = clusterRef.current;
    if (!node) return;
    const ro = new ResizeObserver(measure);
    ro.observe(node);
    return () => ro.disconnect();
  }, [optionKey, overflowing, hiddenCount]);

  const chip = (active: boolean) =>
    `btn h-8 whitespace-nowrap rounded-full border px-3.5 text-[13px] ${
      active ? "border-accent bg-accent text-white" : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:text-zinc-900"
    }`;

  // 放不下的 chip 始终离开第一行,展开时原样排到下一行,第一行不重排
  const concealed = (index: number) => visibleCount != null && index >= visibleCount;
  const activeIndex = tool == null ? 0 : toolOptions.findIndex((o) => o.href === tool) + 1;
  const topics: { key: string; href: string | null; label: string }[] = [
    { key: "all", href: null, label: t("filterAll") },
    ...toolOptions.map((o) => ({ key: o.href, href: o.href, label: o.label })),
  ];
  const topicButton = (topic: (typeof topics)[number], hidden: boolean) => {
    const active = topic.href === null ? tool === null : tool === topic.href;
    return (
      <button
        key={topic.key}
        type="button"
        onClick={() => pickTool(topic.href)}
        className={`${chip(active)} ${hidden ? "pointer-events-none invisible absolute" : ""}`}
        aria-pressed={active}
        aria-hidden={hidden || undefined}
        tabIndex={hidden ? -1 : 0}
      >
        {topic.label}
      </button>
    );
  };

  return (
    <section>
      {/* 筛选 + 排序:第一行固定,+N 展开后多出来的主题排到下一行 */}
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="flex w-full min-w-0 flex-col gap-2 md:w-auto md:flex-1">
          <div ref={clusterRef} className="relative flex min-w-0 items-center gap-2">
            <Funnel className="size-4 shrink-0 text-zinc-400" aria-hidden />
            <div ref={clipRef} className="flex min-w-0 flex-nowrap gap-2 overflow-hidden">
              {topics.map((topic, index) => topicButton(topic, concealed(index)))}
            </div>
            <button
              ref={moreRef}
              type="button"
              onClick={() => setExpanded((open) => !open)}
              className={`${chip(!expanded && concealed(activeIndex))} shrink-0 ${showToggle ? "relative" : "pointer-events-none absolute opacity-0"}`}
              aria-hidden={showToggle ? undefined : true}
              aria-expanded={showToggle ? expanded : undefined}
              aria-label={expanded ? t("fewerFilters") : t("moreFilters", { n: Math.max(hiddenCount, 1) })}
              tabIndex={showToggle ? 0 : -1}
            >
              <span aria-hidden className={`inline-flex items-center gap-1 ${expanded ? "invisible" : ""}`}>
                +{Math.max(hiddenCount, 1)}
                <CaretDown className="size-3.5" />
              </span>
              {expanded && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <CaretUp className="size-3.5" aria-hidden />
                </span>
              )}
            </button>
          </div>
          {expanded && visibleCount != null && visibleCount < topics.length && (
            <div className="flex flex-wrap gap-2 pl-6">
              {topics.slice(visibleCount).map((topic) => topicButton(topic, false))}
            </div>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <label htmlFor="blog-sort" className="field-label whitespace-nowrap">
            {t("sortLabel")}
          </label>
          <select
            id="blog-sort"
            value={sort}
            onChange={(e) => {
              setSort(e.target.value as SortKey);
              setPage(1);
            }}
            className="select-field w-auto"
          >
            <option value="newest">{t("sortNewest")}</option>
            <option value="oldest">{t("sortOldest")}</option>
            <option value="updated">{t("sortUpdated")}</option>
          </select>
        </div>
      </div>

      <p className="mt-4 text-xs text-zinc-400">
        {t("count", { n: filtered.length })}
      </p>

      {pagePosts.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-zinc-300 p-10 text-center text-sm text-zinc-500">
          {t("noPosts")}
        </div>
      ) : (
        <ul className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pagePosts.map((p, i) => {
            const featured = safePage === 1 && i === 0;
            return (
              <li
                key={`${tool}-${sort}-${safePage}-${p.slug}`}
                className={`rise ${featured ? "sm:col-span-2 lg:col-span-3" : ""}`}
                style={{ animationDelay: `${Math.min(i, 8) * 45}ms` }}
              >
                <Link
                  href={`/blog/${p.slug}`}
                  className={`group flex h-full overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-all duration-300 hover:border-zinc-300 hover:shadow-[0_16px_32px_-20px_rgba(23,23,23,0.2)] ${
                    featured ? "flex-col md:flex-row" : "flex-col"
                  }`}
                >
                  <span
                    className={`relative block shrink-0 overflow-hidden bg-zinc-100 ${
                      featured ? "aspect-[16/9] md:aspect-auto md:w-1/2" : "aspect-[16/10] w-full"
                    }`}
                  >
                    {p.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.image}
                        alt=""
                        width={1440}
                        height={900}
                        loading={featured ? "eager" : "lazy"}
                        decoding="async"
                        className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <TitleCover title={p.title} featured={featured} />
                    )}
                  </span>
                  <span
                    className={`flex flex-1 flex-col ${featured ? "justify-center gap-3 p-6 md:p-8" : "gap-2 p-5"}`}
                  >
                    <span
                      className={`font-semibold text-zinc-900 transition-colors group-hover:text-accent ${
                        featured ? "text-xl md:text-2xl" : "text-[17px]"
                      }`}
                    >
                      {p.title}
                    </span>
                    <span
                      className={`text-sm leading-relaxed text-zinc-500 ${featured ? "" : "line-clamp-3"}`}
                    >
                      {p.description}
                    </span>
                    <span className="mt-auto flex flex-wrap items-center gap-x-2 pt-2 text-[11px] text-zinc-400">
                      <span className="font-medium">{p.author}</span>
                      <span className="text-zinc-300">·</span>
                      <time dateTime={p.date} className="font-mono">
                        {p.date}
                      </time>
                      <span className="text-zinc-300">·</span>
                      <span>{tPost("reading", { m: p.minutes })}</span>
                      {featured && (
                        <span className="ml-auto inline-flex items-center gap-1 text-accent">
                          {tPost("tryTools")}
                          <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                        </span>
                      )}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      {totalPages > 1 && (
        <nav className="mt-9 flex items-center justify-center gap-1.5" aria-label="Pagination">
          <button
            type="button"
            onClick={() => setPage(safePage - 1)}
            disabled={safePage === 1}
            aria-label={t("pagePrev")}
            className="btn btn-ghost size-9 rounded-full p-0"
          >
            <CaretLeft className="size-4" aria-hidden />
          </button>
          {pageWindow(safePage, totalPages).map((n, idx) =>
            n === "…" ? (
              <span key={`gap-${idx}`} className="px-1 text-sm text-zinc-400">
                …
              </span>
            ) : (
              <button
                key={n}
                type="button"
                onClick={() => setPage(n)}
                aria-current={n === safePage ? "page" : undefined}
                aria-label={t("pageAria", { current: n, total: totalPages })}
                className={`btn size-9 rounded-full p-0 font-mono text-[13px] ${
                  n === safePage ? "btn-primary" : "btn-ghost"
                }`}
              >
                {n}
              </button>
            ),
          )}
          <button
            type="button"
            onClick={() => setPage(safePage + 1)}
            disabled={safePage === totalPages}
            aria-label={t("pageNext")}
            className="btn btn-ghost size-9 rounded-full p-0"
          >
            <CaretRight className="size-4" aria-hidden />
          </button>
        </nav>
      )}
    </section>
  );
}
