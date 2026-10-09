"use client";

import { useEffect, useRef, useState } from "react";
import { DownloadSimple, Microphone, Stop } from "@phosphor-icons/react";
import { useLocale, useTranslations } from "next-intl";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { speechLang } from "@/lib/localeDefaults";
import { FANCY_PHRASES, FANCY_STYLES, toFancyText, wrapLines, type FancyStyleId } from "@/lib/fancyText";
import ColorSwatch from "./ColorSwatch";

/** 花体文本工具的交互层:输入/语音 → Unicode 风格实时转换 → 一键复制 / 导出 PNG,
 *  以及不用输入就能复制的字母表和短语。映射逻辑在 lib/fancyText.ts。 */

// PNG 导出参数:2x 缩放保证清晰;行数封顶 100,防止超长粘贴撑爆浏览器画布高度上限
const PNG_SCALE = 2;
const PNG_WIDTH = 1000;
const PNG_PAD = 56;
const PNG_FONT_SIZE = 52;
const PNG_LINE_HEIGHT = 76;
const PNG_MAX_LINES = 100;

// 花体字形不在常规字体里,靠浏览器回退链命中系统符号字体(与页面 DOM 渲染同一条链)
const PNG_FONT = `${PNG_FONT_SIZE}px system-ui, "Apple Symbols", "Segoe UI Symbol", "Noto Sans Math", serif`;

/** 把一种风格的转换结果画成 PNG 并触发下载 */
async function downloadRowPng(styleId: FancyStyleId, value: string, ink: string, bg: string) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.font = PNG_FONT;
  const lines = wrapLines(value, PNG_WIDTH - PNG_PAD * 2, (s) => ctx.measureText(s).width).slice(
    0,
    PNG_MAX_LINES,
  );
  const logicalHeight = PNG_PAD * 2 + lines.length * PNG_LINE_HEIGHT;
  canvas.width = PNG_WIDTH * PNG_SCALE;
  canvas.height = logicalHeight * PNG_SCALE;
  ctx.scale(PNG_SCALE, PNG_SCALE);
  ctx.font = PNG_FONT;
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, PNG_WIDTH, logicalHeight);
  ctx.fillStyle = ink;
  ctx.textBaseline = "top";
  lines.forEach((ln, i) => ctx.fillText(ln, PNG_PAD, PNG_PAD + i * PNG_LINE_HEIGHT));

  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
  if (!blob) return;
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `cursive-text-${styleId}.png`;
  a.click();
  URL.revokeObjectURL(url);
}

// 剪贴板写入失败(旧 Safari / 非安全上下文)时的兜底:选中输出文本让用户手动 Ctrl+C
function selectOutput(id: string) {
  const el = document.getElementById(`fancy-out-${id}`);
  if (!el) return;
  const range = document.createRange();
  range.selectNodeContents(el);
  const sel = window.getSelection();
  sel?.removeAllRanges();
  sel?.addRange(range);
}

export default function CursiveTextGenerator() {
  const t = useTranslations("cursiveText");
  const tool = useTranslations("tool");
  const [ink, setInk] = useState("#1a1a1a");
  const [bg, setBg] = useState("#ffffff");
  const locale = useLocale();
  const [text, setText] = useState(() => t("sample"));
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const copiedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (copiedTimer.current) clearTimeout(copiedTimer.current);
  }, []);

  const { supported, listening, interim, error, start, stop } = useSpeechRecognition({
    lang: speechLang(locale),
    onFinal: (chunk) => setText((prev) => (prev.trim() ? `${prev} ${chunk}` : chunk)),
  });

  const errorText =
    error === "denied"
      ? t("errorDenied")
      : error === "network"
        ? t("errorNetwork")
        : error === "stopped"
          ? t("errorStopped")
          : null;

  const handleCopy = async (id: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      selectOutput(id);
      return;
    }
    setCopiedId(id);
    if (copiedTimer.current) clearTimeout(copiedTimer.current);
    copiedTimer.current = setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div>
      <div className="rounded-2xl border border-zinc-200 bg-white p-5">
        <label htmlFor="ct-input" className="text-sm font-semibold text-zinc-900">
          {t("inputLabel")}
        </label>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row">
          <textarea
            id="ct-input"
            rows={2}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t("placeholder")}
            className="w-full resize-y rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 outline-none focus:border-accent"
          />
          {supported && (
            <button
              type="button"
              onClick={listening ? stop : start}
              className={`${listening ? "btn btn-recording" : "btn btn-ghost"} shrink-0 px-5 py-2.5`}
            >
              {listening ? <Stop weight="fill" className="size-4" /> : <Microphone weight="fill" className="size-4" />}
              {listening ? t("listening") : t("speak")}
            </button>
          )}
        </div>
        {listening && <p className="mt-2 text-sm text-zinc-400">{interim}…</p>}
        {!supported && <p className="mt-2 max-w-md text-xs leading-relaxed text-amber-700">{t("speakUnsupported")}</p>}
        {errorText && <p className="mt-2 max-w-md text-xs leading-relaxed text-rose-700">{errorText}</p>}
        <div className="mt-3 flex flex-col gap-2">
          <ColorSwatch label={tool("ink")} value={ink} onChange={setInk} />
          <ColorSwatch label={tool("paperCustom.bg")} value={bg} onChange={setBg} />
        </div>
      </div>

      <div className="mt-4 grid gap-3">
        {FANCY_STYLES.map((style, i) => {
          const value = toFancyText(text, style.id);
          return (
            <div
              key={style.id}
              className="rise rounded-2xl border border-zinc-200 bg-white p-4"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  {t(`styles.${style.id}`)}
                </p>
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopy(style.id, value)}
                    disabled={!value}
                    className="btn btn-primary rounded-full px-3 py-1 text-xs disabled:opacity-40"
                  >
                    {copiedId === style.id ? t("copied") : t("copy")}
                  </button>
                  <button
                    type="button"
                    onClick={() => downloadRowPng(style.id, value, ink, bg)}
                    disabled={!value}
                    aria-label={`${t("download")} — ${t(`styles.${style.id}`)}`}
                    className="flex items-center gap-1 rounded-full border border-zinc-200 px-3 py-1 text-xs font-medium text-zinc-700 transition-colors hover:border-accent hover:text-accent disabled:opacity-40"
                  >
                    <DownloadSimple weight="regular" className="size-3.5" />
                    {t("download")}
                  </button>
                </div>
              </div>
              <p
                id={`fancy-out-${style.id}`}
                className="mt-1.5 break-words rounded-lg px-2 py-1 text-lg leading-relaxed"
                style={value ? { color: ink, backgroundColor: bg } : undefined}
              >
                {value || <span className="text-sm text-zinc-400">{t("empty")}</span>}
              </p>
            </div>
          );
        })}
      </div>
      <section className="mt-8">
        <h2 className="text-base font-semibold text-zinc-900">{t("alphabetTitle")}</h2>
        <p className="mt-1 text-xs leading-relaxed text-zinc-500">{t("alphabetHint")}</p>
        <h3 className="mt-4 text-xs font-semibold uppercase tracking-wide text-zinc-500">{t("phrasesTitle")}</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {FANCY_PHRASES.map((phrase) => {
            const value = toFancyText(phrase, "script");
            const key = `phrase:${phrase}`;
            return (
              <button
                key={phrase}
                type="button"
                onClick={() => handleCopy(key, value)}
                className="rounded-full border border-zinc-200 px-3 py-1 text-lg leading-none text-zinc-800 transition-colors hover:border-accent hover:text-accent"
              >
                {copiedId === key ? t("copied") : value}
              </button>
            );
          })}
        </div>
        <div className="mt-4 grid gap-3">
          {FANCY_STYLES.map((style) => {
            const upper = toFancyText("ABCDEFGHIJKLMNOPQRSTUVWXYZ", style.id);
            const lower = toFancyText("abcdefghijklmnopqrstuvwxyz", style.id);
            const key = `alpha:${style.id}`;
            return (
              <div key={style.id} className="rounded-2xl border border-zinc-200 bg-white p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                    {t(`styles.${style.id}`)}
                  </p>
                  <button
                    type="button"
                    onClick={() => handleCopy(key, `${upper}\n${lower}`)}
                    className="btn btn-primary rounded-full px-3 py-1 text-xs"
                  >
                    {copiedId === key ? t("copied") : t("copy")}
                  </button>
                </div>
                <p className="mt-1.5 break-words text-lg leading-relaxed">{upper}</p>
                <p className="break-words text-lg leading-relaxed">{lower}</p>
              </div>
            );
          })}
        </div>
      </section>
      <p className="mt-3 text-xs leading-relaxed text-zinc-500">{t("unicodeNote")}</p>
    </div>
  );
}
