import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "声音转手写 - 说话即手写",
    template: "%s | 声音转手写",
  },
  description: SITE.description,
  keywords: ["声音转手写", "手写体生成", "语音转文字", "手写字体", "贺卡生成"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <head>
        {/* 自托管 OFL 手写字体(cn-font-split 切片,按需加载) */}
        <link rel="stylesheet" href="/fonts/mashanzheng/result.css" />
        <link rel="stylesheet" href="/fonts/longcang/result.css" />
        <link rel="stylesheet" href="/fonts/liujianmaocao/result.css" />
        <link rel="stylesheet" href="/fonts/caveat/result.css" />
        {/* AdSense:配置环境变量后自动注入 */}
        {adsenseClient && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
