import Link from "next/link";
import { SITE } from "@/lib/site";

export default function SiteFooter() {
  const icp = process.env.NEXT_PUBLIC_ICP;
  return (
    <footer className="mt-12 border-t border-neutral-200 py-6 text-sm text-neutral-500">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4">
        <nav className="flex flex-wrap gap-4">
          <Link href="/" className="hover:text-neutral-800">工具</Link>
          <Link href="/blog" className="hover:text-neutral-800">博客</Link>
          <Link href="/about" className="hover:text-neutral-800">关于</Link>
          <Link href="/privacy" className="hover:text-neutral-800">隐私政策</Link>
          <Link href="/terms" className="hover:text-neutral-800">使用条款</Link>
          <Link href="/contact" className="hover:text-neutral-800">联系我们</Link>
        </nav>
        <p>
          © {new Date().getFullYear()} {SITE.name} · {SITE.description}
        </p>
        {icp && (
          <p>
            <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">
              {icp}
            </a>
          </p>
        )}
      </div>
    </footer>
  );
}
