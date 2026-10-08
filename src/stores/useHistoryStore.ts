import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useEditorStore } from "./useEditorStore";

export type HistorySource = "speech" | "audio" | "export";

export interface HistoryStyle {
  fontId: string;
  paperId: string;
  ink: string;
  fontSize: number;
  intensity: number;
  align: "left" | "center";
  indent: boolean;
}

export interface HistoryEntry {
  id: string;
  text: string;
  savedAt: number; // 时间戳 ms
  source: HistorySource;
  style: HistoryStyle;
}

const MAX_ENTRIES = 50;

interface HistoryState {
  entries: HistoryEntry[];
  add: (entry: Omit<HistoryEntry, "id" | "savedAt">) => void;
  remove: (id: string) => void;
  clear: () => void;
}

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set) => ({
      entries: [],
      add: (entry) =>
        set((s) => ({
          // 最新在前;同文本跨来源去重(导出快照会覆盖早先的录音快照,保留最终样式),超出上限裁剪
          entries: [
            { ...entry, id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, savedAt: Date.now() },
            ...s.entries.filter((e) => e.text !== entry.text),
          ].slice(0, MAX_ENTRIES),
        })),
      remove: (id) => set((s) => ({ entries: s.entries.filter((e) => e.id !== id) })),
      clear: () => set({ entries: [] }),
    }),
    { name: "vth-history" },
  ),
);

/** 快照当前编辑器(文本 + 样式)写入历史;空文本忽略 */
export function snapshotEditor(source: HistorySource) {
  const s = useEditorStore.getState();
  if (!s.text.trim()) return;
  useHistoryStore.getState().add({
    text: s.text,
    source,
    style: {
      fontId: s.fontId,
      paperId: s.paperId,
      ink: s.ink,
      fontSize: s.fontSize,
      intensity: s.intensity,
      align: s.align,
      indent: s.indent,
    },
  });
}
