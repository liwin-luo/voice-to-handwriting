import { ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import ToolWorkspace from "@/components/ToolWorkspace";
import AdSlot from "@/components/AdSlot";
import { SITE } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "CNY" },
};

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="rise mb-7 flex flex-col gap-3">
        <h1 className="font-hand text-4xl leading-none md:text-5xl">声音转手写</h1>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="text-[15px] text-zinc-600">
            说一段话,一键变成手写文稿 —— 贺卡、书信、手账与文案配图
          </p>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-xs text-zinc-500">
            <ShieldCheck weight="duotone" className="size-3.5 text-accent" />
            浏览器本地处理,文字不上传
          </span>
        </div>
      </header>
      <div className="rise" style={{ animationDelay: "80ms" }}>
        <ToolWorkspace />
      </div>
      <div className="rise mt-10" style={{ animationDelay: "160ms" }}>
        <AdSlot />
      </div>
      <footer className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-400">
        <span>
          语音识别由浏览器提供(Web Speech API),推荐桌面版 Chrome / Edge;文字内容不会上传服务器。
        </span>
        <a href="/blog" className="text-accent underline underline-offset-2 hover:text-accent-strong">
          手写贺卡教程与灵感
        </a>
      </footer>
    </main>
  );
}
