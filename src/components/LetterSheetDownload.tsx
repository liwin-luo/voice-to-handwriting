"use client";
import { FilePdf } from "@phosphor-icons/react";
import { jsPDF } from "jspdf";
import { waitForFontFace } from "@/lib/fontFace";
import { PAGE_FORMATS } from "@/lib/localeDefaults";
import { LETTER_STRIP, paintLetterStrip } from "@/lib/alphabetSheet.mjs";
import { glyphGuideData } from "@/lib/glyphGuides";
import { FONTS } from "@/stores/useEditorStore";

/** 单字母课页的练习条 PDF:离屏画布出 US Letter 单页(实心范字 + 虚线描红各一行,带笔顺标记)。
 *  文案由服务端传入(en-only 页面,文案层在 cursiveLetters.ts),本组件只管画与导出。 */
export default function LetterSheetDownload({
  fontId,
  letter,
  title,
  label,
  fileStem,
}: {
  /** 用哪款字体画范字(课页固定 cedarvillecursive) */
  fontId: string;
  /** 展示字形(单字符,小写或大写) */
  letter: string;
  /** 画在纸面顶部的标题 */
  title: string;
  /** 按钮文字 */
  label: string;
  /** 下载文件名主干(用课页 slug,如 cursive-f.pdf / cursive-capital-g.pdf) */
  fileStem: string;
}) {
  const font = FONTS.find((f) => f.id === fontId) ?? FONTS[0];
  const family = font.css.match(/'([^']+)'/)?.[1] ?? "cursive";

  async function downloadPdf() {
    await waitForFontFace(family);
    // 切片字体:带样本字符触发对应子集真正加载,否则画布可能回退衬线体
    await document.fonts.load(`108px "${family}"`, letter).catch(() => {});
    const { w, h } = PAGE_FORMATS.letter;
    const strip = document.createElement("canvas");
    strip.width = LETTER_STRIP.w;
    strip.height = LETTER_STRIP.h;
    const stripCtx = strip.getContext("2d");
    if (!stripCtx) return;
    paintLetterStrip(stripCtx, { family, guide: glyphGuideData(fontId), guides: true, pair: letter });

    const sheet = document.createElement("canvas");
    sheet.width = w;
    sheet.height = h;
    const ctx = sheet.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#1a1a1a";
    ctx.font = `30px "${family}"`;
    ctx.textBaseline = "alphabetic";
    ctx.fillText(title, 68, 110);
    // 练习条水平居中,标题带下留出裁切/装订边距(条高含 48px 降部余量)
    ctx.drawImage(strip, Math.round((w - LETTER_STRIP.w) / 2), 260);

    const pdf = new jsPDF({ unit: "px", format: [w, h], orientation: "portrait" });
    pdf.addImage(sheet.toDataURL("image/png"), "PNG", 0, 0, w, h);
    pdf.save(`cursive-${fileStem}.pdf`);
  }

  return (
    <button type="button" onClick={downloadPdf} className="btn btn-ghost px-6 py-3">
      <FilePdf className="size-4" aria-hidden />
      {label}
    </button>
  );
}
