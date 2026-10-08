"use client";
import { useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { usePathname } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";

export interface NavItem {
  href: string;
  label: string;
}

export interface NavGroup {
  /** 分组标签(已在父组件翻译好) */
  label: string;
  items: NavItem[];
}

/** 页头分组下拉菜单:悬停/点击展开,移动端点击可用 */
export default function NavDropdown({
  label,
  groups,
}: {
  label: string;
  groups: NavGroup[];
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = groups.some((g) => g.items.some((i) => pathname === i.href));

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="menu"
        className={`flex cursor-pointer items-center gap-1 transition-colors hover:text-zinc-950 ${
          isActive ? "text-zinc-950" : "text-zinc-600"
        }`}
      >
        {label}
        <CaretDown className="size-3" />
      </button>
      {open && (
        /* pt-2 是悬停桥:卡片与按钮间的空隙必须是本元素的一部分,否则移过空隙就触发 onMouseLeave 关菜单 */
        <div
          className="absolute left-0 top-full z-40 pt-2"
          onClick={() => setOpen(false)}
        >
          <div
            role="menu"
            className="w-64 rounded-xl border border-zinc-200 bg-white p-2 shadow-[0_16px_40px_-16px_rgba(23,23,23,0.25)]"
          >
            {groups.map((g, gi) => (
              <div key={g.label} className={gi > 0 ? "mt-1 border-t border-zinc-100 pt-1.5" : ""}>
                <p
                  aria-hidden
                  className="px-3 pb-1 pt-1.5 text-[11px] font-semibold uppercase tracking-wide text-zinc-400"
                >
                  {g.label}
                </p>
                {g.items.map((i) => (
                  <Link
                    key={i.href}
                    href={i.href}
                    role="menuitem"
                    className="block rounded-lg px-3 py-2 text-sm text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-950"
                  >
                    {i.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
