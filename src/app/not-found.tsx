import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col items-center gap-5 px-4 py-28 text-center">
      <p className="font-hand text-7xl text-zinc-200">404</p>
      <h1 className="text-xl font-semibold">这个页面被风吹走了</h1>
      <p className="text-sm text-zinc-500">不过手写工具一直都在。</p>
      <Link href="/" className="btn btn-primary mt-2 px-5 py-2.5">
        <ArrowLeft className="size-4" />
        回去写手写
      </Link>
    </main>
  );
}
