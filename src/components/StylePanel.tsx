"use client";
import { useLocale, useTranslations } from "next-intl";
import { ArrowsClockwise } from "@phosphor-icons/react";
import { FONTS, INKS, useEditorStore } from "@/stores/useEditorStore";
import { PAPERS } from "@/engine/paper";

export default function StylePanel() {
  const t = useTranslations("tool");
  const s = useEditorStore();

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
          </select>
        </label>
        <div className="flex items-center justify-between">
          <span className="text-zinc-700">{t("watermark")}</span>
          <button
            role="switch"
            aria-checked={s.watermark}
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
          </div>
        </div>
      </div>
    </section>
  );
}
