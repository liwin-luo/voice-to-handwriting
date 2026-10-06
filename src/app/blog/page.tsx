import type { Metadata } from "next";
import Link from "next/link";
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
      <h1 className="text-2xl font-bold">博客</h1>
      <p className="mt-1 text-sm text-neutral-500">
        手写贺卡、手写配图的教程与灵感;所有教程都可以用首页工具直接跟着做。
      </p>
      <ul className="mt-8 flex flex-col gap-6">
        {POSTS.map((p) => (
          <li key={p.slug} className="rounded-lg border border-neutral-200 p-5 hover:border-neutral-300">
            <Link href={`/blog/${p.slug}`} className="text-lg font-semibold hover:underline">
              {p.title}
            </Link>
            <p className="mt-1 text-sm text-neutral-500">{p.description}</p>
            <time className="mt-2 block text-xs text-neutral-400">{p.date}</time>
          </li>
        ))}
      </ul>
      <div className="mt-10">
        <AdSlot />
      </div>
    </main>
  );
}
