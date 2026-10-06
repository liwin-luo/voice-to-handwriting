"use client";
import { FONTS, INKS, useEditorStore } from "@/stores/useEditorStore";
import { PAPERS } from "@/engine/paper";

export default function StylePanel() {
  const s = useEditorStore();
  return (
    <section className="flex flex-col gap-3 text-sm">
      <h2 className="font-medium text-neutral-600">样式</h2>
      <label className="flex flex-col gap-1">
        字体
        <select
          value={s.fontId}
          onChange={(e) => s.setFontId(e.target.value as typeof s.fontId)}
          className="rounded border border-neutral-300 p-1.5"
        >
          {FONTS.map((f) => (
            <option key={f.id} value={f.id}>
              {f.name}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1">
        纸张
        <select
          value={s.paperId}
          onChange={(e) => s.setPaperId(e.target.value)}
          className="rounded border border-neutral-300 p-1.5"
        >
          {PAPERS.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </label>
      <div className="flex flex-col gap-1">
        墨色
        <div className="flex gap-2">
          {INKS.map((ink) => (
            <button
              key={ink.id}
              title={ink.name}
              onClick={() => s.setInk(ink.value)}
              className={`h-7 w-7 rounded-full border-2 ${
                s.ink === ink.value ? "border-blue-600" : "border-transparent"
              }`}
              style={{ background: ink.value }}
            />
          ))}
        </div>
      </div>
      <label className="flex flex-col gap-1">
        字号 {s.fontSize}px
        <input
          type="range"
          min={20}
          max={56}
          value={s.fontSize}
          onChange={(e) => s.setFontSize(Number(e.target.value))}
        />
      </label>
      <label className="flex flex-col gap-1">
        仿真度 {Math.round(s.intensity * 100)}%
        <input
          type="range"
          min={0}
          max={1}
          step={0.1}
          value={s.intensity}
          onChange={(e) => s.setIntensity(Number(e.target.value))}
        />
      </label>
      <button
        onClick={s.reseed}
        className="rounded border border-neutral-300 px-2 py-1 hover:bg-neutral-50"
      >
        🎲 换一种笔迹
      </button>
    </section>
  );
}
