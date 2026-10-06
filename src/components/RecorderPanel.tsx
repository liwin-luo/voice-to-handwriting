"use client";
import { useEditorStore } from "@/stores/useEditorStore";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";

export default function RecorderPanel() {
  const appendText = useEditorStore((s) => s.appendText);
  const { supported, listening, interim, error, start, stop } = useSpeechRecognition({
    onFinal: appendText,
  });

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-3">
        <button
          onClick={listening ? stop : start}
          className={`rounded-full px-5 py-2 font-medium text-white shadow ${
            listening ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {listening ? "⏹ 停止说话" : "🎙 点击说话"}
        </button>
        {listening && <span className="animate-pulse text-sm text-red-600">正在聆听…</span>}
      </div>
      {interim && <p className="text-sm text-neutral-500">{interim}…</p>}
      {!supported && (
        <p className="text-sm text-amber-600">
          当前浏览器不支持语音识别,推荐使用 Chrome / Edge,或直接在右侧输入文字。
        </p>
      )}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
