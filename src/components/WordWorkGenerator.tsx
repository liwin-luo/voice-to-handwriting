"use client";
import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { FilePdf } from "@phosphor-icons/react";
import { jsPDF } from "jspdf";
import { FONTS } from "@/stores/useEditorStore";
import { useDebouncedImeSafe } from "./useDebouncedImeSafe";

const LETTER: [number, number] = [816, 1056];
const WORDS_PER_PAGE_A1 = 8; // 写三遍:每页 8 词
const WORDS_PER_PAGE_A2 = 16; // 缺字母:每页 16 词

function primaryFamily(css: string): string {
  return css.match(/'([^']+)'/)?.[1] ?? "cursive";
}

/** 确定性地选缺失字母位置(同一单词永远同一位置) */
function missingIndex(word: string): number {
  const sum = [...word].reduce((a, c) => a + c.charCodeAt(0), 0);
  return word.length > 2 ? 1 + (sum % (word.length - 2)) : 0;
}

/** 拼写清单 Word Work 生成器:词表 → 写三遍 + 缺字母填空,确定性、可打印 */
export default function WordWorkGenerator() {
  const t = useTranslations("wordwork");
  const [wordsText, setWordsText] = useState("");
  const [fontId, setFontId] = useState("patrickhand");
  const [showTrace, setShowTrace] = useState(true);
  const [pageUrls, setPageUrls] = useState<string[]>([]);
  const font = FONTS.find((f) => f.id === fontId) ?? FONTS[0];
  const family = primaryFamily(font.css);
  const [w, h] = LETTER;

  // 多页 canvas + toDataURL 很重:输入防抖 + 组词期间暂停
  const [debouncedWordsText, compositionProps] = useDebouncedImeSafe(wordsText);
  // useMemo 稳定引用,避免每次按键都触发重绘 effect
  const words = useMemo(
    () => debouncedWordsText.split("\n").map((l) => l.trim()).filter(Boolean),
    [debouncedWordsText],
  );

  function splitPages(list: string[], per: number): string[][] {
    const out: string[][] = [];
    for (let i = 0; i < list.length; i += per) out.push(list.slice(i, i + per));
    return out.length ? out : [[]];
  }

  function drawNameDate(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#52525b";
    ctx.font = '20px sans-serif';
    ctx.fillText("Name: ______________________", 60, 56);
    ctx.fillText("Date: ____________", w - 300, 56);
  }

  function drawActivityTitle(ctx: CanvasRenderingContext2D, title: string, y: number) {
    ctx.fillStyle = "#18181b";
    ctx.font = '600 30px sans-serif';
    ctx.fillText(title, 60, y);
  }

  function drawWrite3Page(wordsPage: string[]): HTMLCanvasElement {
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);
    drawNameDate(ctx);
    drawActivityTitle(ctx, t("a1Title"), 120);

    let y = 170;
    for (const word of wordsPage) {
      // 词标(手写字体,深色)
      ctx.fillStyle = "#18181b";
      ctx.font = `30px "${family}"`;
      ctx.fillText(word, 60, y + 26);
      // 三条书写线;第一行可选拼写提示(浅灰)
      for (let i = 0; i < 3; i++) {
        const ly = y + 78 + i * 36;
        ctx.save();
        ctx.strokeStyle = "#c8d4e2";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(60, ly);
        ctx.lineTo(w - 60, ly);
        ctx.stroke();
        ctx.restore();
        if (i === 0 && showTrace) {
          ctx.fillStyle = "#c9c9c9";
          ctx.font = `26px "${family}"`;
          ctx.fillText(word, 70, ly - 6);
        }
      }
      y += 78 + 3 * 36 + 18;
    }
    return canvas;
  }

  function drawMissingPage(wordsPage: string[]): HTMLCanvasElement {
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);
    drawNameDate(ctx);
    drawActivityTitle(ctx, t("a2Title"), 120);

    ctx.font = `32px "${family}"`;
    let x = 60;
    let y = 200;
    for (const word of wordsPage) {
      const miss = missingIndex(word);
      // 换行控制:超宽则另起一行
      if (x + ctx.measureText(word).width + 60 > w - 60) {
        x = 60;
        y += 60;
      }
      let cx = x;
      for (let i = 0; i < word.length; i++) {
        const cw = ctx.measureText(word[i]).width;
        if (i === miss) {
          // 缺失字母:下划线空位
          ctx.save();
          ctx.strokeStyle = "#18181b";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(cx + 2, y + 6);
          ctx.lineTo(cx + cw - 2, y + 6);
          ctx.stroke();
          ctx.restore();
        } else {
          ctx.fillStyle = "#18181b";
          ctx.fillText(word[i], cx, y);
        }
        cx += cw;
      }
      x = cx + 48;
    }
    return canvas;
  }

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      if (!words.length) {
        setPageUrls([]);
        return;
      }
      // 传入实际文字,确保手写字体切片按需加载对应字形
      await document.fonts.load(`30px "${family}"`, words.join(" ")).catch(() => {});
      if (cancelled) return;
      const urls: string[] = [];
      for (const page of splitPages(words, WORDS_PER_PAGE_A1)) {
        urls.push(drawWrite3Page(page).toDataURL("image/png"));
        // 逐页让出主线程,多页时不至于一次长任务卡住交互
        await new Promise((r) => setTimeout(r, 0));
        if (cancelled) return;
      }
      for (const page of splitPages(words, WORDS_PER_PAGE_A2)) {
        urls.push(drawMissingPage(page).toDataURL("image/png"));
        await new Promise((r) => setTimeout(r, 0));
        if (cancelled) return;
      }
      if (!cancelled) setPageUrls(urls);
    };
    void run();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [words, fontId, showTrace]);

  const downloadPdf = () => {
    if (!pageUrls.length) return;
    const pdf = new jsPDF({ unit: "px", format: [w, h], orientation: "portrait" });
    pageUrls.forEach((u, i) => {
      if (i > 0) pdf.addPage([w, h], "portrait");
      pdf.addImage(u, "PNG", 0, 0, w, h);
    });
    pdf.save("word-work-worksheet.pdf");
  };

  return (
    <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[300px_auto]">
      <aside className="flex flex-col gap-4 lg:sticky lg:top-20">
        <div className="flex flex-col gap-1.5">
          <span className="field-label">{t("wordsLabel")}</span>
          <textarea
            value={wordsText}
            onChange={(e) => setWordsText(e.target.value)}
            {...compositionProps}
            rows={6}
            placeholder={t("wordsPlaceholder")}
            className="surface-input resize-y p-3 text-sm leading-relaxed"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="field-label">{t("font")}</span>
          <select value={fontId} onChange={(e) => setFontId(e.target.value)} className="select-field">
            {FONTS.map((f) => (
              <option key={f.id} value={f.id}>
                {primaryFamily(f.css)}
              </option>
            ))}
          </select>
        </div>

        <label className="flex items-center justify-between gap-2 text-sm">
          <span className="text-zinc-700">{t("showTrace")}</span>
          <button
            role="switch"
            aria-checked={showTrace}
            onClick={() => setShowTrace(!showTrace)}
            className={`relative h-6 w-11 cursor-pointer rounded-full transition-colors duration-200 ${
              showTrace ? "bg-accent" : "bg-zinc-300"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow transition-transform duration-200 ${
                showTrace ? "translate-x-5" : ""
              }`}
            />
          </button>
        </label>

        <button onClick={downloadPdf} disabled={!pageUrls.length} className="btn btn-primary px-4 py-2.5 text-sm disabled:opacity-40">
          <FilePdf className="size-4" />
          {t("downloadPdf")}
        </button>
      </aside>

      <div className="flex flex-col gap-6">
        {pageUrls.map((u, i) => (
          <div key={i} className="overflow-hidden rounded-xl border border-zinc-200 shadow-paper">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={u} alt={`page ${i + 1}`} className="block h-auto w-full" />
          </div>
        ))}
        {pageUrls.length === 0 && (
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-zinc-300 py-24">
            <p className="font-hand text-3xl text-zinc-300">{t("emptyTitle")}</p>
            <p className="text-sm text-zinc-400">{t("emptyHint")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
