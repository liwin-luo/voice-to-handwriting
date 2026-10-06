"use client";
import { useLocale, useTranslations } from "next-intl";
import { ArrowsClockwise } from "@phosphor-icons/react";
import { FONTS, INKS, useEditorStore } from "@/stores/useEditorStore";
import { PAPERS } from "@/engine/paper";

export default function StylePanel() {
  const t = useTranslations("tool");
  const s = useEditorStore();
  const isCustomPaper = s.paperId === "custom";

  return (
    <section className="flex flex-col divide-y divide-zinc-200 text-sm">
      {/* 笔迹 */}
      <div className="flex flex-col gap-4 pb-5">
        <h2 className="field-label">{t("sectionHandwriting")}</h2>
        <label className="flex flex-col gap-1.5">
          <span className="text-zinc-700">{t("font")}</span>
          <select
            value={s.fontId}
            onChange={(e) => s.setFontId(e.target.value as typeof s.fontId)}
            className="select-field"
          >
            {FONTS.map((f) => (
              <option key={f.id} value={f.id}>
                {t(`fonts.${f.id}`)}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="flex justify-between text-zinc-700">
            {t("fontSize")} <span className="font-mono text-xs text-zinc-400">{s.fontSize}px</span>
          </span>
          <input
            type="range"
            min={20}
            max={56}
            value={s.fontSize}
            onChange={(e) => s.setFontSize(Number(e.target.value))}
            className="accent-accent"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="flex justify-between text-zinc-700">
            {t("realism")}{" "}
            <span className="font-mono text-xs text-zinc-400">{Math.round(s.intensity * 100)}%</span>
          </span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.1}
            value={s.intensity}
            onChange={(e) => s.setIntensity(Number(e.target.value))}
            className="accent-accent"
          />
        </label>
        <button onClick={s.reseed} className="btn btn-ghost self-start px-3.5 py-2 text-[13px]">
          <ArrowsClockwise className="size-3.5 text-zinc-500" />
          {t("reseed")}
        </button>
      </div>

      {/* 纸面 */}
      <div className="flex flex-col gap-4 py-5">
        <h2 className="field-label">{t("sectionPaper")}</h2>
        <label className="flex flex-col gap-1.5">
          <span className="text-zinc-700">{t("paper")}</span>
          <select
            value={s.paperId}
            onChange={(e) => s.setPaperId(e.target.value)}
            className="select-field"
          >
            {PAPERS.map((p) => (
              <option key={p.id} value={p.id}>
                {t(`papers.${p.id}`)}
              </option>
            ))}
            <option value="custom">{t("papers.custom")}</option>
          </select>
        </label>
          {isCustomPaper && (
          <div className="mt-1 flex flex-col gap-3 rounded-lg border border-zinc-200 bg-zinc-50 p-3">
            <span className="field-label">{t("paperCustom.style")}</span>
            <div className="flex gap-1.5">
              {(["blank", "ruled", "grid"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => s.setCustomPaper({ mode: m })}
                  className={`flex-1 cursor-pointer rounded-lg border px-1 py-1.5 text-xs transition-colors ${
                    s.customPaper.mode === m
                      ? "border-accent bg-accent/5 text-accent"
                      : "border-zinc-200 bg-white text-zinc-500 hover:border-zinc-300"
                  }`}
                >
                  {t(`papers.${m}`)}
                </button>
              ))}
            </div>
            <label className="flex items-center justify-between gap-2">
              <span className="text-zinc-700">{t("paperCustom.bg")}</span>
              <input type="color" value={s.customPaper.bg} onChange={(e) => s.setCustomPaper({ bg: e.target.value })} className="color-swatch" />
            </label>
            <label className="flex items-center justify-between gap-2">
              <span className="text-zinc-700">{t("paperCustom.line")}</span>
              <input type="color" value={s.customPaper.line} onChange={(e) => s.setCustomPaper({ line: e.target.value })} className="color-swatch" />
            </label>
            <label className="flex items-center justify-between gap-2">
              <span className="text-zinc-700">{t("paperCustom.spacing")}</span>
              <span className="flex flex-1 items-center gap-2">
                <input type="range" min={24} max={64} value={s.customPaper.spacing} onChange={(e) => s.setCustomPaper({ spacing: Number(e.target.value) })} className="accent-accent" />
                <span className="font-mono text-xs text-zinc-400">{s.customPaper.spacing}px</span>
              </span>
            </label>
          </div>
        )}
      <div className="flex flex-col gap-1.5">
          <span className="text-zinc-700">{t("ink")}</span>
          <div className="flex gap-2.5 pt-0.5">
            {INKS.map((ink) => (
              <button
                key={ink.id}
                title={t(`inks.${ink.id}`)}
                aria-label={t(`inks.${ink.id}`)}
                onClick={() => s.setInk(ink.value)}
                className={`size-7 cursor-pointer rounded-full transition-all duration-200 active:scale-90 ${
                  s.ink === ink.value
                    ? "ring-2 ring-accent ring-offset-2 ring-offset-white"
                    : "ring-1 ring-zinc-200 hover:ring-zinc-300"
                }`}
                style={{ background: ink.value }}
              />
            ))}
            <label
              title={t("customColor")}
              aria-label={t("customColor")}
              className={`relative inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-full transition-all duration-200 active:scale-90 ${
                INKS.some((ink) => ink.value === s.ink)
                  ? "ring-1 ring-zinc-200 hover:ring-zinc-300"
                  : "ring-2 ring-accent ring-offset-2 ring-offset-white"
              }`}
              style={{
                background:
                  "conic-gradient(#ef4444,#f59e0b,#22c55e,#3b82f6,#8b5cf6,#ef4444)",
              }}
            >
              {!INKS.some((ink) => ink.value === s.ink) && (
                <span
                  className="size-4 rounded-full border border-white/80 shadow-sm"
                  style={{ background: s.ink }}
                />
              )}
              <input
                type="color"
                value={INKS.some((ink) => ink.value === s.ink) ? "#ffffff" : s.ink}
                onChange={(e) => s.setInk(e.target.value)}
                className="absolute inset-0 cursor-pointer opacity-0"
              />
            </label>
          </div>
        </div>

        {/* 导出水印:放区块最底部 */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-zinc-700">{t("watermark")}</span>
          <button
            role="switch"
            aria-checked={s.watermark}
            aria-label={t("watermark")}
            onClick={() => s.setWatermark(!s.watermark)}
            className={`relative h-6 w-11 cursor-pointer rounded-full transition-colors duration-200 ${
              s.watermark ? "bg-accent" : "bg-zinc-300"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow transition-transform duration-200 ${
                s.watermark ? "translate-x-5" : ""
              }`}
            />
          </button>
        </div>
      </div>
    </section>
  );
}
