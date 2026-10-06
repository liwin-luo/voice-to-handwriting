import Link from "next/link";
import { PenNib } from "@phosphor-icons/react/dist/ssr";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200/80 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 text-sm">
        <Link href="/" className="group flex items-center gap-2">
          <PenNib weight="duotone" className="size-5 text-accent transition-transform duration-300 group-hover:-rotate-12" />
          <span className="font-hand text-xl leading-none">声音转手写</span>
        </Link>
        <nav className="flex items-center gap-5 text-zinc-600">
          <Link href="/" className="transition-colors hover:text-zinc-950">工具</Link>
          <Link href="/blog" className="transition-colors hover:text-zinc-950">博客</Link>
          <Link href="/about" className="transition-colors hover:text-zinc-950">关于</Link>
        </nav>
      </div>
    </header>
  );
}
