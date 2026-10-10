"use client";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ClockCounterClockwise } from "@phosphor-icons/react";
import AudioImportPanel from "./AudioImportPanel";
import ExportBar from "./ExportBar";
import HistoryDrawer from "./HistoryDrawer";
import PaperView from "./PaperView";
import RecorderPanel from "./RecorderPanel";
import StylePanel from "./StylePanel";
import TranscriptEditor from "./TranscriptEditor";
import { useRef } from "react";
import { getTemplate, getTemplateMeta } from "@/content/templates";
import { FONTS, useEditorStore, type FontId } from "@/stores/useEditorStore";
import type { Locale } from "@/i18n/routing";
import { parseHandoff } from "@/engine/pageEstimate";
import { defaultFontId, defaultPageFormat, templateFontId } from "@/lib/localeDefaults";

export interface ToolPreset {
  fontId?: string;
  paperId?: string;
  ink?: string;
  fontSize?: number;
  intensity?: number;
}

/**
 * 布局 v2:左栏(文字编辑 → 样式)吸顶可滚动,右侧纸张预览自适应缩放。
 * 移动端单列:编辑器、录音与导入、样式,然后纸张。
 * 底部条在宽屏粘住;窄屏留在文档流里,避免盖住滑杆。录音和导入音频贴着文字框,底栏只留历史和导出。
 */
export default function ToolWorkspace({
  preset,
  layout = "write",
}: {
  preset?: ToolPreset;
  layout?: "write" | "doctor";
}) {
  const locale = useLocale();
  const tHistory = useTranslations("history");
  const booted = useRef(false);
  const [historyOpen, setHistoryOpen] = useState(false);

  // 等偏好从 localStorage 恢复后再决定字体和纸张,避免被旧默认值盖掉。
  // 用户没手动选过时,按页面语言给默认字体和 Letter/A4。
  useEffect(() => {
    const apply = () => {
      if (booted.current) return;
      booted.current = true;
      const s = useEditorStore.getState();
      const handRaw = sessionStorage.getItem("vth-page-calc");
      if (handRaw) sessionStorage.removeItem("vth-page-calc");
      const hand = handRaw ? parseHandoff(handRaw) : null;
      if (hand) {
        s.setText(hand.text);
        if (FONTS.some((f) => f.id === hand.fontId)) s.applyFontId(hand.fontId as FontId);
        s.setFontSize(hand.fontSize);
        s.setPageFormat(hand.pageFormat);
        s.setPaperId("custom");
        s.setCustomPaper({ spacing: hand.spacing, mode: hand.mode });
        return;
      }
      const params = new URLSearchParams(window.location.search);
      const slug = params.get("template");
      const fontQ = params.get("font");
      const tpl = slug ? getTemplate(slug) : undefined;
      if (tpl) {
        s.setText(getTemplateMeta(tpl, locale as Locale).text);
        s.setFontId(templateFontId(tpl.style.fontId, locale));
        s.setPaperId(tpl.style.paperId);
        s.setInk(tpl.style.ink);
        s.setFontSize(tpl.style.fontSize);
        s.setIntensity(tpl.style.intensity);
        s.setAlign(tpl.style.align);
        s.setIndent(tpl.style.indent);
        window.history.replaceState(null, "", window.location.pathname);
      } else if (fontQ && FONTS.some((f) => f.id === fontQ)) {
        s.applyFontId(fontQ as FontId);
        window.history.replaceState(null, "", window.location.pathname);
      } else if (preset) {
        if (preset.fontId) s.applyFontId(preset.fontId as FontId);
        if (preset.paperId) s.setPaperId(preset.paperId);
        if (preset.ink) s.setInk(preset.ink);
        if (preset.fontSize) s.setFontSize(preset.fontSize);
        if (preset.intensity !== undefined) s.setIntensity(preset.intensity);
      } else if (!s.fontChosen) {
        s.applyFontId(defaultFontId(locale));
      }
      if (!s.pageFormatChosen) s.applyPageFormat(defaultPageFormat(locale));
    };
    if (useEditorStore.persist.hasHydrated()) apply();
    return useEditorStore.persist.onFinishHydration(apply);
  }, [locale, preset]);

  const capture = (
    <div className="flex flex-wrap items-start gap-x-6 gap-y-3">
      <RecorderPanel />
      <AudioImportPanel />
    </div>
  );

  const bar = (
    <div className="glass-bar z-30 flex flex-wrap items-center justify-between gap-4 px-5 py-3.5 lg:sticky lg:bottom-4">
      <button type="button" onClick={() => setHistoryOpen(true)} className="btn btn-ghost px-4 py-2.5">
        <ClockCounterClockwise className="size-4 text-zinc-500" />
        {tHistory("open")}
      </button>
      <ExportBar />
    </div>
  );

  const drawer = historyOpen ? <HistoryDrawer onClose={() => setHistoryOpen(false)} /> : null;

  if (layout === "doctor") {
    return (
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="flex flex-col gap-5 lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto lg:pr-1">
            <TranscriptEditor />
            {capture}
            <StylePanel layout="doctor" />
          </aside>
          <PaperView />
        </div>
        {bar}
        {drawer}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 lg:grid lg:grid-cols-[320px_minmax(0,1fr)] lg:items-start lg:gap-x-6">
      {/* 窄屏 contents:字体和纸样跟在录音后,字号墨色排到纸和导出条后面。宽屏收成左栏 */}
      <div className="contents lg:sticky lg:top-20 lg:flex lg:max-h-[calc(100vh-6rem)] lg:flex-col lg:gap-5 lg:overflow-y-auto lg:pr-1 lg:col-start-1 lg:row-start-1">
        <div className="order-1 flex flex-col gap-5 lg:order-none">
          <TranscriptEditor />
          {capture}
        </div>
        <StylePanel layout="write" />
      </div>
      <div className="order-2 min-w-0 lg:col-start-2 lg:row-start-1">
        <PaperView />
      </div>
      <div className="order-3 lg:col-span-2 lg:row-start-2">{bar}</div>
      {drawer}
    </div>
  );
}
