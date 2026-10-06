import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="border-b border-neutral-200">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 text-sm">
        <Link href="/" className="font-semibold text-neutral-900">
          ✍️ 声音转手写
        </Link>
        <nav className="flex gap-4 text-neutral-600">
          <Link href="/" className="hover:text-neutral-900">工具</Link>
          <Link href="/blog" className="hover:text-neutral-900">博客</Link>
          <Link href="/about" className="hover:text-neutral-900">关于</Link>
        </nav>
      </div>
    </header>
  );
}
