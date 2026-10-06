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
      <header className="mb-6">
        <h1 className="text-2xl font-bold">声音转手写</h1>
        <p className="mt-1 text-sm text-neutral-500">
          说一段话,一键变成手写文稿 —— 适合贺卡、书信、手账与文案配图
        </p>
      </header>
      <ToolWorkspace />
      <div className="mt-10">
        <AdSlot />
      </div>
      <footer className="mt-8 text-xs text-neutral-400">
        语音识别在浏览器本地调用(Web Speech
        API),推荐使用桌面版 Chrome / Edge;文字内容不会上传服务器。
        <a href="/blog" className="ml-1 underline hover:text-neutral-600">
          手写贺卡教程与灵感
        </a>
      </footer>
    </main>
  );
}
