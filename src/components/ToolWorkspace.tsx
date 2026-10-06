"use client";
import ExportBar from "./ExportBar";
import PaperView from "./PaperView";
import RecorderPanel from "./RecorderPanel";
import StylePanel from "./StylePanel";
import TranscriptEditor from "./TranscriptEditor";

export default function ToolWorkspace() {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[auto_300px]">
        <PaperView />
        <aside className="flex flex-col gap-6 lg:sticky lg:top-20">
          <StylePanel />
          <TranscriptEditor />
        </aside>
      </div>
      {/* 粘性玻璃操作栏:滚动阅读长文时录音/导出始终可达 */}
      <div className="glass-bar sticky bottom-4 z-20 flex flex-wrap items-center justify-between gap-4 px-5 py-3.5">
        <RecorderPanel />
        <ExportBar />
      </div>
    </div>
  );
}
