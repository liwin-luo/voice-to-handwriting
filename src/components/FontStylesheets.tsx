"use client";

import { useEffect } from "react";
import { ASYNC_FONT_CSS } from "@/lib/fonts";

/** 非默认字体样式表:水合后注入,避免 11 个 CSS(共约 490K)阻塞首屏渲染 */
export default function FontStylesheets() {
  useEffect(() => {
    for (const href of ASYNC_FONT_CSS) {
      if (document.querySelector(`link[rel="stylesheet"][href="${href}"]`)) continue;
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      document.head.appendChild(link);
    }
  }, []);
  return null;
}
