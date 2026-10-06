"use client";
import { useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Waveform } from "@phosphor-icons/react";
import {
  transcribeAudioFile,
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
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<TranscribeProgress | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [model, setModel] = useState<TranscribeModelId>("base");

  const onFile = async (file: File | undefined) => {
    if (!file || busy) return;
    setBusy(true);
    setError(null);
    setProgress(null);
    try {
      const text = await transcribeAudioFile(file, model, setProgress, locale);
      if (text) {
        appendText(text);
        snapshotEditor("audio");
      }
      else setError(t("errorEmpty"));
    } catch (e) {
      console.error(e);
      setError(t("errorImport"));
    } finally {
      setBusy(false);
      setProgress(null);
    }
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
          onChange={(e) => setModel(e.target.value as TranscribeModelId)}
          disabled={busy}
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
      {statusText && <p className="text-xs text-zinc-500">{statusText}</p>}
      {error && <p className="max-w-xs text-xs leading-relaxed text-rose-700">{error}</p>}
    </div>
  );
}
