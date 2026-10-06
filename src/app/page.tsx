import ToolWorkspace from "@/components/ToolWorkspace";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">声音转手写</h1>
        <p className="mt-1 text-sm text-neutral-500">
          说一段话,一键变成手写文稿 —— 适合贺卡、书信、手账与文案配图
        </p>
      </header>
      <ToolWorkspace />
      <footer className="mt-8 text-xs text-neutral-400">
        语音识别在浏览器本地调用(Web Speech
        API),推荐使用桌面版 Chrome / Edge;文字内容不会上传服务器。
      </footer>
    </main>
  );
}
