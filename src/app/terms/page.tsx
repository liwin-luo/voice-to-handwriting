import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "使用条款",
  description: `${SITE.name}的使用条款:工具的许可、使用边界与免责声明。`,
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <article className="prose prose-neutral max-w-none">
        <h1>使用条款</h1>
        <p>生效日期:2026-10-06 · 使用本站即表示你同意以下条款。</p>

        <h2>1. 服务说明</h2>
        <p>
          {SITE.name}提供免费的语音转手写文稿工具,按「现状」提供,不承诺服务不中断或识别结果完全准确。
        </p>

        <h2>2. 允许的使用</h2>
        <p>你可以将生成的图片与文档用于个人用途,包括但不限于:贺卡、书信、手账、社交媒体配图、笔记整理。</p>

        <h2>3. 禁止的使用</h2>
        <ul>
          <li>伪造他人笔迹、冒充他人书写,或用于任何欺诈、侵权场景;</li>
          <li>生成违反法律法规或他人合法权益的内容;</li>
          <li>以任何形式声称由真人手写而进行商业欺骗。</li>
        </ul>
        <p>工具生成的文稿为「手写风格渲染」,并非真迹。请在需要真实签名或真迹的场合(合同、法律文件等)使用真实书写。</p>

        <h2>4. 知识产权</h2>
        <ul>
          <li>你生成内容中所含的文字,权利归你;</li>
          <li>本站使用的字体为 SIL OFL 授权的开源字体(马善政、龙藏、柳建毛草、Caveat),授权文件见仓库 fonts-src 目录;</li>
          <li>本站的界面、代码与品牌归本站所有。</li>
        </ul>

        <h2>5. 免责声明</h2>
        <p>
          对于因使用或无法使用本服务造成的任何直接或间接损失,本站不承担责任。语音识别结果仅供参考,请核对后再使用。
        </p>

        <h2>6. 条款变更</h2>
        <p>我们可能更新本条款,更新后将在本页面公布。</p>

        <h2>7. 联系我们</h2>
        <p>
          有疑问请通过 <a href="/contact">联系我们</a> 页面沟通。
        </p>
      </article>
      <div className="mt-10">
        <AdSlot />
      </div>
    </main>
  );
}
