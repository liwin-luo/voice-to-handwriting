import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "关于",
  description:
    "声音转手写是一个把语音变成手写文稿的免费网页工具:说话实时转文字,渲染成逼真手写体,导出 PNG/PDF。所有处理在浏览器本地完成。",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <article className="prose prose-neutral max-w-none">
        <h1>关于「声音转手写」</h1>
        <p>
          「声音转手写」是一个免费网页工具:对着麦克风说一段话,语音实时转成文字,再以逼真的手写效果呈现在纸张上,可一键导出
          PNG 图片或 PDF 文档。
        </p>
        <h2>为什么做这个工具</h2>
        <p>
          想写一张手写贺卡、一段手账文字、一张朋友圈手写配图,却嫌打字再排版太麻烦?市面上所有手写体工具都要先打字,而「说」永远比「打」快。我们把语音输入和手写渲染做在了一起,这是同类工具中没有的入口。
        </p>
        <h2>隐私是我们的默认设计</h2>
        <ul>
          <li>你输入的文字、导出的文件都在你自己的浏览器里处理,不会上传到我们的服务器;</li>
          <li>
            语音识别由浏览器原生能力(Web Speech API)提供:桌面版 Chrome / Edge
            会把音频送至谷歌的识别服务,Apple 设备上的 Safari 使用苹果的识别服务——这一步不经过我们;
          </li>
          <li>字体、纸张等偏好仅保存在你本地的 localStorage。</li>
        </ul>
        <p>
          更多细节见 <a href="/privacy">隐私政策</a>。
        </p>
        <h2>联系我们</h2>
        <p>
          有建议或合作意向?请访问 <a href="/contact">联系我们</a> 页面。
        </p>
      </article>
      <div className="mt-10">
        <AdSlot />
      </div>
    </main>
  );
}
