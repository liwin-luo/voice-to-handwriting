import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 py-24 text-center">
      <p className="text-6xl">404</p>
      <h1 className="text-xl font-semibold">这个页面被风吹走了</h1>
      <p className="text-neutral-500">不过手写工具一直都在。</p>
      <Link
        href="/"
        className="rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        回去写手写
      </Link>
    </main>
  );
}
