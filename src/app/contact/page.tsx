import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "联系我们",
  description: `联系${SITE.name}:产品建议、bug 反馈、商务合作。`,
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <article className="prose prose-neutral max-w-none">
        <h1>联系我们</h1>
        <p>欢迎通过邮件联系,我们通常在 3 个工作日内回复:</p>
        <p>
          📧{" "}
          <a href={`mailto:${SITE.email}`}>
            {SITE.email}
          </a>
        </p>
        <h2>常见问题</h2>
        <h3>语音识别没有反应?</h3>
        <p>
          请使用桌面版 Chrome / Edge,允许麦克风权限(地址栏左侧图标),并确认系统麦克风可用。其他浏览器请直接在文本框输入。
        </p>
        <h3>识别出来的文字有错?</h3>
        <p>直接在右侧文本框修改即可,纸张上的手写效果会实时更新。</p>
        <h3>导出的 PDF 打不开?</h3>
        <p>请更新浏览器到最新版本后重试;多页导出时请耐心等待所有页面生成完成。</p>
        <h3>商务合作</h3>
        <p>广告投放、品牌合作、API 接入等,请邮件注明「商务合作」。</p>
      </article>
    </main>
  );
}
