"use client";
import { useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Waveform } from "@phosphor-icons/react";
import {
  cancelTranscribe,
  isAbortError,
  transcribeAudioFile,
  transcribeErrorKey,
  type TranscribeModelId,
  type TranscribeProgress,
} from "@/lib/transcribe";
import { useEditorStore } from "@/stores/useEditorStore";
import { snapshotEditor } from "@/stores/useHistoryStore";

/** 导入音频文件 → 浏览器本地转写(Whisper)→ 文字进编辑器 */
export default function AudioImportPanel() {
  const t = useTranslations("tool");
  const locale = useLocale();
  const appendText = useEditorStore((s) => s.appendText);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<File | null>(null);
  const runRef = useRef(0);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<TranscribeProgress | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [model, setModel] = useState<TranscribeModelId>("base");

  const onFile = async (file: File | undefined, modelId: TranscribeModelId = model) => {
    if (!file) return;
    fileRef.current = file;
    const run = ++runRef.current;
    cancelTranscribe();
    setBusy(true);
    setError(null);
    setProgress(null);
    try {
      const text = await transcribeAudioFile(
        file,
        modelId,
        (next) => {
          if (runRef.current === run) setProgress(next);
        },
        locale,
      );
      if (runRef.current !== run) return;
      if (text) {
        appendText(text);
        snapshotEditor("audio");
      } else setError(t("errorEmpty"));
    } catch (e) {
      if (runRef.current !== run || isAbortError(e)) return;
      console.error(e);
      setError(t(transcribeErrorKey(e) === "model" ? "errorModel" : "errorImport"));
    } finally {
      if (runRef.current !== run) return;
      setBusy(false);
      setProgress(null);
    }
  };

  const onModel = (next: TranscribeModelId) => {
    setModel(next);
    if (busy && fileRef.current) void onFile(fileRef.current, next);
  };

  const statusText = progress
    ? progress.phase === "model"
      ? t("statusModel", { p: progress.percent ?? 0 })
      : progress.phase === "decoding"
        ? t("statusDecode")
        : t("statusTranscribe")
    : null;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2">
        <button
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className="btn btn-ghost px-4 py-2.5"
        >
          <Waveform className="size-4 text-zinc-500" />
          {t("importAudio")}
        </button>
        <select
          value={model}
          onChange={(e) => onModel(e.target.value as TranscribeModelId)}
          title={t("modelNote")}
          className="select-field w-auto cursor-pointer py-2 pl-3 pr-8 text-xs"
        >
          <option value="base">{t("modelFast")}</option>
          <option value="small">{t("modelQuality")}</option>
        </select>
        <input
          ref={inputRef}
          type="file"
          accept="audio/*,.mp3,.wav,.m4a,.ogg,.webm,.flac"
          hidden
          onChange={(e) => {
            void onFile(e.target.files?.[0]);
            e.target.value = "";
          }}
        />
      </div>
      {statusText && (
        <div className="flex max-w-xs flex-col gap-1.5">
          <p className="text-xs text-zinc-500">{statusText}</p>
          <div
            role="progressbar"
            aria-label={statusText}
            aria-valuemin={progress?.phase === "model" ? 0 : undefined}
            aria-valuemax={progress?.phase === "model" ? 100 : undefined}
            aria-valuenow={progress?.phase === "model" ? progress.percent ?? 0 : undefined}
            aria-valuetext={progress?.phase === "model" ? undefined : statusText}
            className="h-1.5 overflow-hidden rounded-full bg-zinc-200"
          >
            {progress?.phase === "model" ? (
              <div
                className="h-full w-full origin-left rounded-full bg-accent transition-transform duration-300 ease-out"
                style={{ transform: `scaleX(${Math.min(100, Math.max(0, progress.percent ?? 0)) / 100})` }}
              />
            ) : (
              <div className="wait-slide h-full w-1/4 rounded-full bg-accent" />
            )}
          </div>
        </div>
      )}
      {error && <p className="max-w-xs text-xs leading-relaxed text-rose-700">{error}</p>}
    </div>
  );
}
