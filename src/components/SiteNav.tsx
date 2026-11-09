"use client";

import { useEffect, useState } from "react";
import { List, X } from "@phosphor-icons/react";
import Logo from "./Logo";
import NavDropdown, { type NavGroup } from "./NavDropdown";
import LocaleSwitch from "./LocaleSwitch";
import { Link, usePathname } from "@/i18n/navigation";

/** 宽屏横排导航；窄屏收成点击菜单。Logo 回首页（通用惯例），右侧「Open the tool」直达工作台。 */
export default function SiteNav({
  brand,
  groups,
  allToolsLabel,
  viewAll,
  activeHrefs,
  blogLabel,
  aboutLabel,
  menuLabel,
  openToolLabel,
}: {
  brand: string;
  groups: NavGroup[];
  allToolsLabel: string;
  viewAll: { href: string; label: string };
  activeHrefs: string[];
  blogLabel: string;
  aboutLabel: string;
  menuLabel: string;
  openToolLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  // 点链接时先别卸掉菜单，否则 Next 的导航会被掐断。等路径变了再收。
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-30 border-b border-stone-200 bg-background">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-2.5 text-sm">
        <Link href="/" className="group flex shrink-0 items-center gap-2 whitespace-nowrap">
          <Logo className="size-5 shrink-0 text-accent transition-transform duration-150 group-hover:-rotate-6" />
          <span className="font-hand text-lg leading-none">{brand}</span>
        </Link>

        <nav className="hidden items-center gap-x-5 text-stone-600 md:flex">
          <NavDropdown
            label={allToolsLabel}
            groups={groups}
            viewAll={viewAll}
            activeHrefs={activeHrefs}
          />
          <Link href="/blog" className="transition-colors hover:text-stone-950">
            {blogLabel}
          </Link>
          <Link href="/about" className="transition-colors hover:text-stone-950">
            {aboutLabel}
          </Link>
          <LocaleSwitch />
          <Link
            href="/"
            className="btn btn-primary px-3 py-1.5 text-[13px]"
          >
            {openToolLabel}
          </Link>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <LocaleSwitch />
          <button
            type="button"
            aria-expanded={open}
            aria-label={menuLabel}
            onClick={() => setOpen((v) => !v)}
            className="btn btn-ghost px-2.5 py-2"
          >
            {open ? <X className="size-4" /> : <List className="size-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-stone-100 bg-white px-4 py-3 md:hidden">
          <Link href="/" className="btn btn-primary mb-2 w-full">
            {openToolLabel}
          </Link>
          {groups.map((g) => (
            <div key={g.label} className="py-1">
              <p className="px-1 pb-1 text-[11px] font-semibold uppercase tracking-wide text-stone-400">
                {g.label}
              </p>
              {g.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-md px-1 py-2 text-sm text-stone-700"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
          <Link href={viewAll.href} className="block rounded-md px-1 py-2 text-sm font-medium text-stone-950">
            {viewAll.label}
          </Link>
          <div className="mt-1 flex gap-4 border-t border-stone-100 pt-2">
            <Link href="/blog" className="py-2 text-sm text-stone-700">
              {blogLabel}
            </Link>
            <Link href="/about" className="py-2 text-sm text-stone-700">
              {aboutLabel}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
