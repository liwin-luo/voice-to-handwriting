"use client";
import { Microphone, Stop } from "@phosphor-icons/react";
import { useEditorStore } from "@/stores/useEditorStore";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";

export default function RecorderPanel() {
  const appendText = useEditorStore((s) => s.appendText);
  const { supported, listening, interim, error, start, stop } = useSpeechRecognition({
    onFinal: appendText,
  });

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-3">
        <button
          onClick={listening ? stop : start}
          className={`${listening ? "btn btn-recording" : "btn btn-primary"} px-5 py-2.5`}
        >
          {listening ? (
            <Stop weight="fill" className="size-4" />
          ) : (
            <Microphone weight="fill" className="size-4" />
          )}
          {listening ? "停止说话" : "点击说话"}
        </button>
        {listening && (
          <span className="flex items-center gap-2 text-sm text-rose-700">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-500 opacity-60" />
              <span className="relative inline-flex size-2.5 rounded-full bg-rose-600" />
            </span>
            正在聆听
          </span>
        )}
      </div>
      {interim && <p className="text-sm text-zinc-400">{interim}…</p>}
      {!supported && (
        <p className="max-w-xs text-xs leading-relaxed text-amber-700">
          当前浏览器不支持语音识别,推荐 Chrome / Edge,或直接在右侧输入文字。
        </p>
      )}
      {error && <p className="max-w-xs text-xs leading-relaxed text-rose-700">{error}</p>}
    </div>
  );
}
