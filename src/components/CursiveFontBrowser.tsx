"use client";
import { useState } from "react";
import { FilePdf, FileSvg, Image as ImageIcon } from "@phosphor-icons/react";
import { jsPDF } from "jspdf";
import { useTranslations } from "next-intl";
import { INKS } from "@/stores/useEditorStore";
import { useDebouncedImeSafe } from "./useDebouncedImeSafe";
import { waitForFontFace } from "@/lib/fontFace";
import { FONT_CATALOG } from "@/content/fontCatalog";
import { buildCursiveSvg, latinSubsetUrl } from "@/lib/cursiveSvg";

function primaryFamily(css: string): string {
  return css.match(/'([^']+)'/)?.[1] ?? "cursive";
}

function bytesToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.length; i += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }
  return btoa(binary);
}

// 导出参数:2x 保证清晰;宽度按最长行自适应,行数封顶防超长粘贴撑爆画布
const PNG_SCALE = 2;
const PNG_PAD = 48;
const PNG_MAX_LINES = 40;
const PNG_LINE_GAP = 0.42; // 行距 = 字号 × 该系数

// 透明底的棋盘格预览底纹(仅屏幕展示,PNG 导出真透明)
const CHECKER =
  "repeating-conic-gradient(#f4f4f5 0% 25%, #ffffff 0% 50%) 50% / 16px 16px";

const BGS = [
  { id: "white", value: "#ffffff" },
  { id: "paper", value: "#faf6ee" },
  { id: "transparent", value: "transparent" },
] as const;

type BgId = (typeof BGS)[number]["id"];

/** 手写字体预览 + 导出:一段文字在全部捆绑字体下逐行实时预览,
 *  单款免安装导出高分辨率透明 PNG / PDF。预览是纯 DOM(自动跟随字体加载),
 *  只有导出走 canvas。 */
export default function CursiveFontBrowser() {
  const t = useTranslations("cursiveFont");
  const inkLabel = useTranslations("tool.inks");
  const [text, setText] = useState(t("sample"));
  const [size, setSize] = useState(44);
  const [inkId, setInkId] = useState<string>("black");
  const [bgId, setBgId] = useState<BgId>("white");
  const [svgError, setSvgError] = useState(false);
  const [drawText, compositionProps] = useDebouncedImeSafe(text);

  const ink = INKS.find((c) => c.id === inkId) ?? INKS[1];
  const bg = BGS.find((b) => b.id === bgId) ?? BGS[0];
  const lines = drawText.split("\n").filter((l) => l.trim().length > 0).slice(0, PNG_MAX_LINES);

  /** 单款字体导出:canvas 逐行绘制,行宽自适应。PNG 可透明底,PDF 白底,SVG 内嵌拉丁子集。 */
  async function downloadFont(entryId: string, kind: "png" | "pdf" | "svg") {
    const entry = FONT_CATALOG.find((f) => f.id === entryId);
    if (!entry || lines.length === 0) return;
    const family = primaryFamily(entry.css);
    await waitForFontFace(family);

    const probe = document.createElement("canvas").getContext("2d");
    if (!probe) return;
    const fontSpec = `${size}px "${family}"`;
    probe.font = fontSpec;
    const longest = Math.max(...lines.map((l) => probe.measureText(l).width));
    const lineH = size * (1 + PNG_LINE_GAP);
    const logicalW = Math.ceil(longest + PNG_PAD * 2);
    const logicalH = Math.ceil(PNG_PAD * 2 + lines.length * lineH);

    const off = document.createElement("canvas");
    off.width = logicalW * PNG_SCALE;
    off.height = logicalH * PNG_SCALE;
    const ctx = off.getContext("2d");
    if (!ctx) return;
    ctx.scale(PNG_SCALE, PNG_SCALE);
    if (kind === "pdf" || bgId !== "transparent") {
      ctx.fillStyle = bg.value === "transparent" ? "#ffffff" : bg.value;
      ctx.fillRect(0, 0, logicalW, logicalH);
    }
    ctx.font = fontSpec;
    ctx.fillStyle = ink.value;
    ctx.textBaseline = "alphabetic";
    lines.forEach((line, i) => {
      ctx.fillText(line, PNG_PAD, PNG_PAD + size + i * lineH);
    });

    if (kind === "svg") {
      try {
        const cssUrl = `/fonts/${entry.id}/result.css`;
        const css = await fetch(cssUrl).then((res) => {
          if (!res.ok) throw new Error("css");
          return res.text();
        });
        const rel = latinSubsetUrl(css);
        if (!rel) throw new Error("subset");
        const fontUrl = new URL(rel, new URL(cssUrl, window.location.origin)).href;
        const buf = await fetch(fontUrl).then((res) => {
          if (!res.ok) throw new Error("woff");
          return res.arrayBuffer();
        });
        const svg = buildCursiveSvg({
          lines,
          family,
          size,
          ink: ink.value,
          bg: bgId === "transparent" ? null : bg.value,
          width: logicalW,
          height: logicalH,
          pad: PNG_PAD,
          lineH,
          fontBase64: bytesToBase64(buf),
        });
        const blob = new Blob([svg], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${entryId}-font.svg`;
        a.click();
        URL.revokeObjectURL(url);
        setSvgError(false);
      } catch {
        setSvgError(true);
      }
      return;
    }

    if (kind === "png") {
      off.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${entryId}-font.png`;
        a.click();
        URL.revokeObjectURL(url);
      }, "image/png");
    } else {
      const pdf = new jsPDF({ unit: "px", format: [logicalW, logicalH], orientation: logicalW > logicalH ? "landscape" : "portrait" });
      pdf.addImage(off.toDataURL("image/png"), "PNG", 0, 0, logicalW, logicalH);
      pdf.save(`${entryId}-font.pdf`);
    }
  }

  return (
    <div>
      <div className="rounded-2xl border border-zinc-200 bg-white p-5">
        <label htmlFor="font-preview-input" className="text-sm font-semibold text-zinc-900">
          {t("inputLabel")}
        </label>
        <textarea
          id="font-preview-input"
          rows={2}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t("placeholder")}
          className="mt-2 w-full resize-y rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-accent"
          {...compositionProps}
        />
        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-zinc-700">
          <label className="flex items-center gap-2">
            <span>{t("sizeLabel")}</span>
            <input
              type="range"
              min={24}
              max={88}
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              aria-label={t("sizeLabel")}
            />
            <span className="w-8 tabular-nums text-zinc-500">{size}</span>
          </label>
          <div className="flex items-center gap-2">
            <span>{t("inkLabel")}</span>
            <div className="flex gap-1.5">
              {INKS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setInkId(c.id)}
                  aria-label={inkLabel(c.id)}
                  aria-pressed={inkId === c.id}
                  title={inkLabel(c.id)}
                  className={`size-6 rounded-full border-2 transition-transform ${
                    inkId === c.id ? "scale-110 border-accent" : "border-zinc-200"
                  }`}
                  style={{ backgroundColor: c.value }}
                />
              ))}
            </div>
          </div>
          <label className="flex items-center gap-2">
            <span>{t("bgLabel")}</span>
            <select
              value={bgId}
              onChange={(e) => setBgId(e.target.value as BgId)}
              className="rounded-lg border border-zinc-200 bg-white px-2 py-1.5"
            >
              <option value="white">{t("bgWhite")}</option>
              <option value="paper">{t("bgPaper")}</option>
              <option value="transparent">{t("bgTransparent")}</option>
            </select>
          </label>
        </div>
        {svgError && <p className="mt-2 text-xs leading-relaxed text-rose-700">{t("exportFailed")}</p>}
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {FONT_CATALOG.map((entry) => {
          return (
            <div key={entry.id} className="rounded-2xl border border-zinc-200 bg-white p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold text-zinc-900">
                  {entry.displayName}
                  <span className="ml-2 rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-normal text-zinc-500">
                    {entry.style}
                  </span>
                  <a
                    href={entry.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-xs font-normal text-zinc-400 underline-offset-2 hover:text-accent hover:underline"
                  >
                    {entry.author} · {entry.license}
                  </a>
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => void downloadFont(entry.id, "png")}
                    disabled={lines.length === 0}
                    className="btn btn-ghost px-3 py-1.5 text-xs"
                  >
                    <ImageIcon className="size-3.5" aria-hidden />
                    PNG
                  </button>
                  <button
                    onClick={() => void downloadFont(entry.id, "svg")}
                    disabled={lines.length === 0}
                    className="btn btn-ghost px-3 py-1.5 text-xs"
                  >
                    <FileSvg className="size-3.5" aria-hidden />
                    SVG
                  </button>
                  <button
                    onClick={() => void downloadFont(entry.id, "pdf")}
                    disabled={lines.length === 0}
                    className="btn btn-ghost px-3 py-1.5 text-xs"
                  >
                    <FilePdf className="size-3.5" aria-hidden />
                    PDF
                  </button>
                </div>
              </div>
              <div
                className="mt-3 overflow-hidden rounded-xl border border-zinc-100 px-4 py-3"
                style={{
                  fontFamily: entry.css,
                  fontSize: size,
                  lineHeight: 1 + PNG_LINE_GAP,
                  color: ink.value,
                  background: bg.value === "transparent" ? CHECKER : bg.value,
                  overflowWrap: "anywhere",
                }}
              >
                {lines.length > 0 ? drawText : <span className="text-base text-zinc-400">{t("empty")}</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
