"use client";
import { useEffect } from "react";
import { useLocale } from "next-intl";
import AudioImportPanel from "./AudioImportPanel";
import ExportBar from "./ExportBar";
import PaperView from "./PaperView";
import RecorderPanel from "./RecorderPanel";
import StylePanel from "./StylePanel";
import TranscriptEditor from "./TranscriptEditor";
import { getTemplate } from "@/content/templates";
import { useEditorStore, type FontId } from "@/stores/useEditorStore";
import type { Locale } from "@/i18n/routing";

/**
 * 布局 v2:左栏(文字编辑 → 样式)吸顶可滚动,右侧纸张预览自适应缩放。
 * 移动端单列:编辑器在最前,纸张其后。
 * 底部粘性工具栏:左侧录音+音频导入,右侧导出。
 */
export default function ToolWorkspace() {
  const locale = useLocale();

  // 模板落地页跳转:/?template=<slug> → 一键套用文案与样式
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("template");
    if (!slug) return;
    const tpl = getTemplate(slug);
    if (!tpl) return;
    const s = useEditorStore.getState();
    s.setText(tpl.i18n[locale as Locale].text);
    s.setFontId(tpl.style.fontId as FontId);
    s.setPaperId(tpl.style.paperId);
    s.setInk(tpl.style.ink);
    s.setFontSize(tpl.style.fontSize);
    s.setIntensity(tpl.style.intensity);
    s.setAlign(tpl.style.align);
    s.setIndent(tpl.style.indent);
    window.history.replaceState(null, "", window.location.pathname);
  }, [locale]);

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[320px_auto]">
        <aside className="flex flex-col gap-5 lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto lg:pr-1">
          <TranscriptEditor />
          <StylePanel />
        </aside>
        <PaperView />
      </div>
      {/* 粘性玻璃操作栏:滚动阅读长文时输入/导出始终可达 */}
      <div className="glass-bar sticky bottom-4 z-30 flex flex-wrap items-center justify-between gap-4 px-5 py-3.5">
        <div className="flex flex-wrap items-start gap-6">
          <RecorderPanel />
          <AudioImportPanel />
        </div>
        <ExportBar />
      </div>
    </div>
  );
}
