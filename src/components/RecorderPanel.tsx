"use client";
import { Microphone, Stop } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { useEditorStore } from "@/stores/useEditorStore";
import { snapshotEditor } from "@/stores/useHistoryStore";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";

export default function RecorderPanel() {
  const t = useTranslations("tool");
  const appendText = useEditorStore((s) => s.appendText);
  const text = useEditorStore((s) => s.text);
  const { supported, listening, interim, error, start, stop } = useSpeechRecognition({
    onFinal: appendText,
  });

  const errorText =
    error === "denied"
      ? t("errorDenied")
      : error === "network"
        ? t("errorNetwork")
        : error === "stopped"
          ? t("errorStopped")
          : null;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-3">
        <button
          onClick={
            listening
              ? () => {
                  stop();
                  snapshotEditor("speech"); // 录音结束,存历史快照
                }
              : start
          }
          className={`${listening ? "btn btn-recording" : "btn btn-primary"} px-5 py-2.5`}
        >
          {listening ? (
            <Stop weight="fill" className="size-4" />
          ) : (
            <Microphone weight="fill" className="size-4" />
          )}
          {listening ? t("stop") : t("speak")}
        </button>
        {listening && (
          <span className="flex items-center gap-2 text-sm text-rose-700">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-500 opacity-60" />
              <span className="relative inline-flex size-2.5 rounded-full bg-rose-600" />
            </span>
            {t("listening")}
          </span>
        )}
      </div>
      {interim && <p className="text-sm text-zinc-400">{interim}…</p>}
      {!supported && <p className="max-w-xs text-xs leading-relaxed text-amber-700">{t("unsupported")}</p>}
      {errorText && <p className="max-w-xs text-xs leading-relaxed text-rose-700">{errorText}</p>}
    </div>
  );
}
