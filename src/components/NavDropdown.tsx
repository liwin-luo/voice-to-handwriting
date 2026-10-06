"use client";
import { useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { usePathname } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";

export interface NavItem {
  href: string;
  label: string;
}

/** 页头下拉菜单:悬停/点击展开,移动端点击可用 */
export default function NavDropdown({
  label,
  items,
}: {
  label: string;
  items: NavItem[];
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = items.some((i) => pathname === i.href);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
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
          <div className="w-56 rounded-xl border border-zinc-200 bg-white p-1.5 shadow-[0_16px_40px_-16px_rgba(23,23,23,0.25)]">
            {items.map((i) => (
              <Link
                key={i.href}
                href={i.href}
                className="block rounded-lg px-3 py-2 text-sm text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-950"
              >
                {i.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
