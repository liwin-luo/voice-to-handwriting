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
import { useEditorStore, type FontId } from "@/stores/useEditorStore";
import type { Locale } from "@/i18n/routing";
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
 * 移动端单列:编辑器、录音、样式,然后纸张。
 * 底部条在宽屏粘住;窄屏留在文档流里,避免盖住滑杆。录音贴着文字框。
 */
export default function ToolWorkspace({ preset }: { preset?: ToolPreset }) {
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
      const slug = new URLSearchParams(window.location.search).get("template");
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

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[320px_auto]">
        <aside className="flex flex-col gap-5 lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto lg:pr-1">
          <TranscriptEditor />
          <RecorderPanel />
          <StylePanel />
        </aside>
        <PaperView />
      </div>
      {/* 宽屏粘住导出条;窄屏留在文档流里,避免盖住滑杆 */}
      <div className="glass-bar z-30 flex flex-wrap items-center justify-between gap-4 px-5 py-3.5 lg:sticky lg:bottom-4">
        <div className="flex flex-wrap items-start gap-6">
          <AudioImportPanel />
          <button onClick={() => setHistoryOpen(true)} className="btn btn-ghost px-4 py-2.5">
            <ClockCounterClockwise className="size-4 text-zinc-500" />
            {tHistory("open")}
          </button>
        </div>
        <ExportBar />
      </div>
      {/* 打开时才挂载:抽屉内部状态(persist 水合/两段确认)随挂载自然重置 */}
      {historyOpen && <HistoryDrawer onClose={() => setHistoryOpen(false)} />}
    </div>
  );
}
