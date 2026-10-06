"use client";
import { useEditorStore } from "@/stores/useEditorStore";

export default function TranscriptEditor() {
  const text = useEditorStore((s) => s.text);
  const setText = useEditorStore((s) => s.setText);
  return (
    <section className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between">
        <h2 className="field-label">文字(可修改识别错字)</h2>
        <span className="font-mono text-[11px] text-zinc-400">{text.length} 字</span>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="说话内容会出现在这里,也可以直接粘贴或输入"
        rows={6}
        className="surface-input resize-y p-3 leading-relaxed"
      />
    </section>
  );
}
