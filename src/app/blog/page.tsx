import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import AdSlot from "@/components/AdSlot";
import { POSTS } from "@/content/posts";

export const metadata: Metadata = {
  title: "博客",
  description:
    "手写贺卡教程、手写体图片生成技巧、手写文案配图灵感 —— 用声音写手写的实践指南。",
};

export default function BlogIndex() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <header className="rise">
        <h1 className="font-hand text-4xl leading-none">博客</h1>
        <p className="mt-3 text-sm text-zinc-500">
          手写贺卡、手写配图的教程与灵感;所有教程都可以用首页工具直接跟着做。
        </p>
      </header>
      <ul className="mt-9 flex flex-col gap-4">
        {POSTS.map((p, i) => (
          <li key={p.slug} className="rise" style={{ animationDelay: `${80 + i * 60}ms` }}>
            <Link
              href={`/blog/${p.slug}`}
              className="group flex flex-col gap-1.5 rounded-2xl border border-zinc-200 bg-white p-5 transition-all duration-300 hover:border-zinc-300 hover:shadow-[0_16px_32px_-20px_rgba(23,23,23,0.2)]"
            >
              <span className="flex items-center justify-between gap-3">
                <span className="text-[17px] font-semibold text-zinc-900 transition-colors group-hover:text-accent">
                  {p.title}
                </span>
                <ArrowRight className="size-4 shrink-0 text-zinc-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent" />
              </span>
              <span className="text-sm leading-relaxed text-zinc-500">{p.description}</span>
              <time className="font-mono text-[11px] text-zinc-400">{p.date}</time>
            </Link>
          </li>
        ))}
      </ul>
      <div className="rise mt-10" style={{ animationDelay: "260ms" }}>
        <AdSlot />
      </div>
    </main>
  );
}
