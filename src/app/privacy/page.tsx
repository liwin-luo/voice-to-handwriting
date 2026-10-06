import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "隐私政策",
  description: `${SITE.name}的隐私政策:说明语音与文字数据的处理方式、Cookie 与第三方广告的使用。`,
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <article className="prose prose-neutral max-w-none">
        <h1>隐私政策</h1>
        <p>
          生效日期:2026-10-06 · 本政策说明你使用 {SITE.name}({SITE.url})时,数据如何被处理。
        </p>

        <h2>1. 我们不收集的数据</h2>
        <ul>
          <li><strong>文字内容:</strong>你在页面中输入或语音转写出的文字,仅存在于你的浏览器内存与本地存储(localStorage)中,不会发送到我们的服务器。</li>
          <li><strong>导出文件:</strong>PNG / PDF 由你的浏览器在本地生成,不经过我们。</li>
          <li><strong>账号:</strong>本站没有账号系统,不要求注册。</li>
        </ul>

        <h2>2. 语音数据的第三方处理</h2>
        <p>
          语音识别使用浏览器原生的 Web Speech API,由浏览器厂商提供:
        </p>
        <ul>
          <li>桌面版 Chrome / Edge:音频会发送至 Google 的语音识别服务进行处理,受 <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google 隐私政策</a> 约束;</li>
          <li>Apple 设备上的 Safari:音频由 Apple 的语音识别服务处理。</li>
        </ul>
        <p>这一步的数据不经过本站服务器;如需完全本地处理,可断开网络使用文字输入功能。</p>

        <h2>3. 本地存储(localStorage)</h2>
        <p>我们在你的浏览器中保存字体、纸张等样式偏好(<code>vth-prefs</code>)。你可以随时通过浏览器设置清除。</p>

        <h2>4. Cookie 与第三方广告</h2>
        <p>
          本站通过 Google AdSense 等第三方广告网络展示广告以维持免费运营。这些供应商可能使用
          Cookie 展示个性化广告。你可以访问{" "}
          <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer">
            Google 广告设置
          </a>{" "}
          管理个性化广告,或通过浏览器设置禁用第三方 Cookie。
        </p>

        <h2>5. 未成年人</h2>
        <p>本站面向一般用户,不针对 14 周岁以下儿童收集任何信息。</p>

        <h2>6. 政策更新</h2>
        <p>本政策如有重大变更,将在本页面更新并修改生效日期。</p>

        <h2>7. 联系我们</h2>
        <p>
          对本政策有疑问,请通过 <a href="/contact">联系我们</a> 页面告知。
        </p>
      </article>
      <div className="mt-10">
        <AdSlot />
      </div>
    </main>
  );
}
