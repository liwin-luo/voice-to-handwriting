import Link from "next/link";
import { SITE } from "@/lib/site";

export default function SiteFooter() {
  const icp = process.env.NEXT_PUBLIC_ICP;
  return (
    <footer className="mt-14 border-t border-zinc-200 py-7 text-[13px] text-zinc-500">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4">
        <nav className="flex flex-wrap gap-x-5 gap-y-2">
          <Link href="/" className="transition-colors hover:text-zinc-900">工具</Link>
          <Link href="/blog" className="transition-colors hover:text-zinc-900">博客</Link>
          <Link href="/about" className="transition-colors hover:text-zinc-900">关于</Link>
          <Link href="/privacy" className="transition-colors hover:text-zinc-900">隐私政策</Link>
          <Link href="/terms" className="transition-colors hover:text-zinc-900">使用条款</Link>
          <Link href="/contact" className="transition-colors hover:text-zinc-900">联系我们</Link>
        </nav>
        <p className="text-zinc-400">
          © {new Date().getFullYear()} {SITE.name}
        </p>
        {icp && (
          <p>
            <a
              href="https://beian.miit.gov.cn/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-zinc-900"
            >
              {icp}
            </a>
          </p>
        )}
      </div>
    </footer>
  );
}
