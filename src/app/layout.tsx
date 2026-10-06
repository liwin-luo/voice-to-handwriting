import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "声音转手写 - 说话即手写",
  description:
    "对着网页说一段话,实时转成文字并渲染成逼真手写体,一键导出 PNG / PDF。免费在线手写体生成工具,适合贺卡、书信、手账与文案配图。",
  keywords: ["声音转手写", "手写体生成", "语音转文字", "手写字体", "贺卡生成"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <head>
        {/* 自托管 OFL 手写字体(cn-font-split 切片,按需加载) */}
        <link rel="stylesheet" href="/fonts/mashanzheng/result.css" />
        <link rel="stylesheet" href="/fonts/longcang/result.css" />
        <link rel="stylesheet" href="/fonts/liujianmaocao/result.css" />
        <link rel="stylesheet" href="/fonts/caveat/result.css" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
