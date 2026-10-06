"use client";
import { TextAlignCenter, TextAlignLeft, TextIndent } from "@phosphor-icons/react";
import { useEditorStore } from "@/stores/useEditorStore";

export default function TranscriptEditor() {
  const text = useEditorStore((s) => s.text);
  const setText = useEditorStore((s) => s.setText);
  const align = useEditorStore((s) => s.align);
  const setAlign = useEditorStore((s) => s.setAlign);
  const indent = useEditorStore((s) => s.indent);
  const setIndent = useEditorStore((s) => s.setIndent);

  const toggleCls = (active: boolean) =>
    `flex size-8 cursor-pointer items-center justify-center rounded-lg border transition-all duration-200 active:scale-90 ${
      active
        ? "border-accent bg-accent/5 text-accent"
        : "border-zinc-200 bg-white text-zinc-400 hover:border-zinc-300 hover:text-zinc-600"
    }`;

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
      {/* 文字排列:对齐 / 段落首行缩进 */}
      <div className="flex items-center gap-1.5">
        <button
          title="左对齐"
          aria-label="左对齐"
          onClick={() => setAlign("left")}
          className={toggleCls(align === "left")}
        >
          <TextAlignLeft className="size-4" />
        </button>
        <button
          title="居中"
          aria-label="居中"
          onClick={() => setAlign("center")}
          className={toggleCls(align === "center")}
        >
          <TextAlignCenter className="size-4" />
        </button>
        <span className="mx-1 h-4 w-px bg-zinc-200" />
        <button
          title="段落首行缩进"
          aria-label="段落首行缩进"
          onClick={() => setIndent(!indent)}
          className={toggleCls(indent)}
        >
          <TextIndent className="size-4" />
        </button>
      </div>
    </section>
  );
}
