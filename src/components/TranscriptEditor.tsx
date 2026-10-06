"use client";
import { useEditorStore } from "@/stores/useEditorStore";

export default function TranscriptEditor() {
  const text = useEditorStore((s) => s.text);
  const setText = useEditorStore((s) => s.setText);
  return (
    <section>
      <h2 className="mb-1 text-sm font-medium text-neutral-600">文字(可修改识别错字)</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="说话内容会出现在这里,也可以直接粘贴或输入"
        rows={6}
        className="w-full rounded border border-neutral-300 p-2 text-sm focus:border-blue-500 focus:outline-none"
      />
    </section>
  );
}
