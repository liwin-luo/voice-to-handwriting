"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Image as ImageIcon } from "@phosphor-icons/react";
import { FONT_CATALOG } from "@/content/fontCatalog";
import { waitForFontFace } from "@/lib/fontFace";
import PracticeLayout from "./PracticeLayout";

const FONTS = FONT_CATALOG.filter((entry) => entry.stylesheet && (entry.style === "signature script" || entry.style === "formal script"));

function familyOf(css: string): string {
  return css.match(/'([^']+)'/)?.[1] ?? "cursive";
}

export default function TattooStencil() {
  const t = useTranslations("tattooStencil");
  const [phrase, setPhrase] = useState("");
  const [fontId, setFontId] = useState(FONTS[0]?.id ?? "greatvibes");
  const [mirror, setMirror] = useState(true);
  const text = (phrase.trim() || t("placeholder")).slice(0, 42);
  const font = FONTS.find((entry) => entry.id === fontId) ?? FONTS[0];

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      if (!font) return;
      const family = familyOf(font.css);
      await waitForFontFace(family);
      await document.fonts.load(`72px "${family}"`, text).catch(() => {});
      if (!cancelled) draw();
    };
    void run();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, fontId, mirror, font]);

  function draw(target?: CanvasRenderingContext2D) {
    const w = 900;
    const h = 280;
    let ctx = target ?? null;
    if (!ctx) {
      const canvas = document.getElementById("tattoo-stencil") as HTMLCanvasElement | null;
      if (!canvas) return;
      canvas.width = w;
      canvas.height = h;
      ctx = canvas.getContext("2d");
    }
    if (!ctx || !font) return;
    // 预览画布每次归零。导出传入的 ctx 已按分辨率缩放,这里不能清掉。
    if (!target) ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#000000";
    const family = familyOf(font.css);
    let size = 78;
    ctx.font = `${size}px "${family}"`;
    ctx.textBaseline = "middle";
    while (size > 28 && ctx.measureText(text).width > w - 80) {
      size -= 2;
      ctx.font = `${size}px "${family}"`;
    }
    const width = ctx.measureText(text).width;
    if (mirror) {
      ctx.translate(w / 2, h / 2);
      ctx.scale(-1, 1);
      ctx.fillText(text, -width / 2, 0);
    } else {
      ctx.fillText(text, (w - width) / 2, h / 2);
    }
  }

  const downloadPng = () => {
    const scale = 2;
    const off = document.createElement("canvas");
    off.width = 900 * scale;
    off.height = 280 * scale;
    const ctx = off.getContext("2d");
    if (!ctx) return;
    ctx.scale(scale, scale);
    draw(ctx);
    off.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "cursive-tattoo-stencil.png";
      a.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  };

  const chip = (on: boolean) =>
    `cursor-pointer rounded-lg border px-2.5 py-1.5 text-xs transition-colors ${
      on ? "border-accent bg-accent/5 text-accent" : "border-zinc-200 bg-white text-zinc-500 hover:border-zinc-300"
    }`;

  return (
    <PracticeLayout
      input={
        <>
          <div className="flex flex-col gap-1.5">
            <span className="field-label">{t("phraseLabel")}</span>
            <input
              value={phrase}
              onChange={(e) => setPhrase(e.target.value)}
              placeholder={t("placeholder")}
              className="surface-input px-3 py-2 text-sm"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="field-label">{t("styleLabel")}</span>
            <div className="flex flex-wrap gap-1.5">
              {FONTS.map((entry) => (
                <button key={entry.id} type="button" aria-pressed={entry.id === fontId} onClick={() => setFontId(entry.id)} className={chip(entry.id === fontId)}>
                  {entry.displayName}
                </button>
              ))}
            </div>
          </div>
        </>
      }
      download={
        <button type="button" onClick={downloadPng} className="btn btn-primary w-full px-4 py-2.5 text-sm">
          <ImageIcon className="size-4" />
          {t("downloadPng")}
        </button>
      }
      more={
        <label className="flex items-center justify-between gap-2 text-sm">
          <span className="text-zinc-700">{t("mirror")}</span>
          <button
            type="button"
            role="switch"
            aria-checked={mirror}
            onClick={() => setMirror(!mirror)}
            className={`relative h-6 w-11 cursor-pointer rounded-full transition-colors duration-200 ${mirror ? "bg-accent" : "bg-zinc-300"}`}
          >
            <span className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow transition-transform duration-200 ${mirror ? "translate-x-5" : ""}`} />
          </button>
        </label>
      }
      preview={
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-paper">
          <canvas id="tattoo-stencil" aria-label={t("sheetLabel")} className="block h-auto w-full" />
        </div>
      }
    />
  );
}
