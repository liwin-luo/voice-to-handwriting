import Script from "next/script";

/**
 * Microsoft Clarity 会话回放与热图(官方代码原样内联,ID: yuugypfxtj)。
 * Clarity 不使用 Cookie、自动遮蔽页面输入内容,与 Vercel Analytics 同类,
 * 因此直接加载、不走 Cookie 同意;Cookie 类脚本(AdSense)才由 ConsentBanner 门控。
 * 披露见隐私政策 §4(src/content/pages/privacy.*.mdx)。
 */
export default function ClarityAnalytics() {
  return (
    <Script id="ms-clarity" strategy="afterInteractive">
      {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "yuugypfxtj");`}
    </Script>
  );
}
