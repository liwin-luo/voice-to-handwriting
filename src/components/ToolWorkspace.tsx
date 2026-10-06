"use client";
import ExportBar from "./ExportBar";
import PaperView from "./PaperView";
import RecorderPanel from "./RecorderPanel";
import StylePanel from "./StylePanel";
import TranscriptEditor from "./TranscriptEditor";

export default function ToolWorkspace() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[auto_300px]">
        <PaperView />
        <aside className="flex flex-col gap-4">
          <StylePanel />
          <TranscriptEditor />
        </aside>
      </div>
      <div className="flex flex-wrap items-center gap-6 border-t border-neutral-200 pt-4">
        <RecorderPanel />
        <ExportBar />
      </div>
    </div>
  );
}
