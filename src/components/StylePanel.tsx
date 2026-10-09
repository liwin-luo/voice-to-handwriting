"use client";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowsClockwise, UploadSimple, X } from "@phosphor-icons/react";
import { FONTS, INKS, useEditorStore } from "@/stores/useEditorStore";
import { PAPERS } from "@/engine/paper";
import { fileToPaperImage } from "@/lib/paperImage";
import { fontOrder } from "@/lib/localeDefaults";
import PageFormatToggle from "./PageFormatToggle";

const LATIN_FONT = new Set([
  "caveat",
  "patrickhand",
  "kalam",
  "indieflower",
  "dancingscript",
  "cedarvillecursive",
  "sacramento",
]);

export default function StylePanel({ layout = "write" }: { layout?: "write" | "doctor" }) {
  const t = useTranslations("tool");
  const tSheet = useTranslations("sheet");
  const locale = useLocale();
  const s = useEditorStore();
  const fonts = fontOrder(locale).map((id) => FONTS.find((f) => f.id === id)!);
  const isCustomPaper = s.paperId === "custom";
  const [uploading, setUploading] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const specimen = (id: string) => {
    if (LATIN_FONT.has(id)) return t("sampleLatin");
    if (id === "kleeone") return t("sampleKana");
    if (id === "nanumpenscript") return t("sampleHangul");
    return t("sampleHan");
  };

  const onImageChange = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true);
    try {
      s.setCustomPaper({ image: await fileToPaperImage(file), imageFit: "cover" });
    } finally {
      setUploading(false);
    }
  };

  const fontSpecimens = (
    <div className="flex flex-col gap-1.5">
      <h2 className="field-label">{t("sectionHandwriting")}</h2>
      <span className="text-zinc-700">{t("font")}</span>
      <div className="grid grid-cols-3 gap-1.5">
        {fonts.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={s.fontId === f.id}
            aria-label={t(`fonts.${f.id}`)}
            onClick={() => s.setFontId(f.id)}
            className={`cursor-pointer truncate rounded-lg border px-1 py-2.5 text-lg leading-none ${
              s.fontId === f.id
                ? "border-accent bg-accent/5 text-accent"
                : "border-zinc-200 bg-white text-zinc-800 hover:border-zinc-300"
            }`}
            style={{ fontFamily: f.css }}
          >
            {specimen(f.id)}
          </button>
        ))}
      </div>
    </div>
  );

  const fontSize = (
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
  );

  const paperChoice = (
    <>
        <h2 className="field-label">{t("sectionPaper")}</h2>
        <PageFormatToggle value={s.pageFormat} onChange={s.setPageFormat} />
        <div className="flex flex-col gap-1.5">
          <span className="text-zinc-700">{t("paper")}</span>
          <div className="grid grid-cols-3 gap-1.5">
            {PAPERS.map((p) => (
              <button
                key={p.id}
                type="button"
                aria-pressed={s.paperId === p.id}
                aria-label={t(`papers.${p.id}`)}
                onClick={() => s.setPaperId(p.id)}
                className={`h-14 cursor-pointer overflow-hidden rounded-lg border ${
                  s.paperId === p.id ? "border-accent ring-2 ring-accent" : "border-zinc-200 hover:border-zinc-300"
                }`}
                style={{ background: p.background }}
              />
            ))}
          </div>
          <button
            type="button"
            aria-pressed={isCustomPaper}
            onClick={() => s.setPaperId("custom")}
            className={`cursor-pointer rounded-lg border px-2 py-1.5 text-xs ${
              isCustomPaper
                ? "border-accent bg-accent/5 text-accent"
                : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300"
            }`}
          >
            {t("papers.custom")}
          </button>
        </div>
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
            {/* 背景图片:铺在底色之上、格线之下 */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-zinc-700">{t("paperCustom.image")}</span>
              {s.customPaper.image ? (
                <span className="flex items-center gap-2">
                  <span className="relative inline-flex">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.customPaper.image} alt="" className="size-8 rounded-md border border-zinc-200 object-cover" />
                    <button
                      title={t("paperCustom.removeImage")}
                      aria-label={t("paperCustom.removeImage")}
                      onClick={() => s.setCustomPaper({ image: undefined, imageFit: undefined })}
                      className="absolute -top-1.5 -right-1.5 flex size-4 cursor-pointer items-center justify-center rounded-full bg-zinc-600 text-white hover:bg-zinc-800"
                    >
                      <X weight="bold" className="size-2.5" />
                    </button>
                  </span>
                  <span className="flex overflow-hidden rounded-lg border border-zinc-200">
                    {(["cover", "tile"] as const).map((f) => (
                      <button
                        key={f}
                        onClick={() => s.setCustomPaper({ imageFit: f })}
                        className={`cursor-pointer px-2 py-1 text-xs transition-colors ${
                          (s.customPaper.imageFit ?? "cover") === f
                            ? "bg-accent/10 text-accent"
                            : "bg-white text-zinc-500 hover:bg-zinc-50"
                        }`}
                      >
                        {t(`paperCustom.${f}`)}
                      </button>
                    ))}
                  </span>
                </span>
              ) : (
                <label
                  className={`flex cursor-pointer items-center gap-1 rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-xs text-zinc-600 transition-colors hover:border-zinc-300 ${
                    uploading ? "pointer-events-none opacity-50" : ""
                  }`}
                >
                  <UploadSimple className="size-3.5 text-zinc-500" />
                  {uploading ? t("paperCustom.uploading") : t("paperCustom.upload")}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      void onImageChange(e.target.files?.[0]);
                      e.target.value = "";
                    }}
                  />
                </label>
              )}
            </div>
          </div>
        )}
    </>
  );

  const inkPicker = (
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
  );

  const realism = (
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
  );

  const reseed = (
    <button type="button" onClick={s.reseed} className="btn btn-ghost self-start px-3.5 py-2 text-[13px]">
      <ArrowsClockwise className="size-3.5 text-zinc-500" />
      {t("reseed")}
    </button>
  );

  const watermark = (
    <div className="flex items-center justify-between pt-1">
      <span className="text-zinc-700">{t("watermark")}</span>
      <button
        type="button"
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
  );

  if (layout === "doctor") {
    return (
      <section className="flex flex-col gap-4 text-sm">
        {realism}
        <details className="border-t border-zinc-200">
          <summary className="cursor-pointer py-3 text-sm font-medium text-zinc-700">
            {t("doctorMore")}
          </summary>
          {/* 直接子元素不能带 display 类,否则会盖过浏览器对收起 details 的隐藏 */}
          <div>
          <div className="flex flex-col gap-4 py-4">
            {fontSpecimens}
            {fontSize}
            {reseed}
            {paperChoice}
            {inkPicker}
            {watermark}
          </div>
          </div>
        </details>
      </section>
    );
  }

  return (
    <>
      <div className="order-1 flex flex-col gap-4 lg:order-none">
        {fontSpecimens}
        {paperChoice}
      </div>
      <div className="order-4 flex flex-col gap-4 border-t border-zinc-200 pt-4 lg:order-none">
        <button
          type="button"
          className="btn btn-ghost w-full px-4 py-2.5 text-sm lg:hidden"
          aria-expanded={moreOpen}
          onClick={() => setMoreOpen((open) => !open)}
        >
          {tSheet("moreSettings")}
        </button>
        <div className={`${moreOpen ? "flex" : "hidden lg:flex"} flex-col gap-4`}>
          {fontSize}
          {inkPicker}
          <details className="border-t border-zinc-200">
            <summary className="cursor-pointer py-3 text-sm font-medium text-zinc-700">
              {t("moreLikeHandwriting")}
            </summary>
            <div>
            <div className="flex flex-col gap-4 py-4">
              {realism}
              {reseed}
              {watermark}
            </div>
            </div>
          </details>
        </div>
      </div>
    </>
  );
}
