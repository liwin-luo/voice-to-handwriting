"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowsCounterClockwise, NoteBlank, Trash, TrashSimple } from "@phosphor-icons/react";
import { Link, useRouter } from "@/i18n/navigation";
import { useHistoryStore, type HistoryEntry, type HistorySource } from "@/stores/useHistoryStore";
import { useEditorStore } from "@/stores/useEditorStore";

const SOURCE_KEY: Record<HistorySource, string> = {
  speech: "sourceSpeech",
  audio: "sourceAudio",
  export: "sourceExport",
};

export default function HistoryPanel() {
  const t = useTranslations("history");
  const router = useRouter();
  const entries = useHistoryStore((s) => s.entries);
  const remove = useHistoryStore((s) => s.remove);
  const clear = useHistoryStore((s) => s.clear);
  // persist 存储挂载后才渲染列表,避免 SSR 水合不一致
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const restore = (e: HistoryEntry) => {
    const s = useEditorStore.getState();
    s.setText(e.text);
    s.setFontId(e.style.fontId as typeof s.fontId);
    s.setPaperId(e.style.paperId);
    s.setInk(e.style.ink);
    s.setFontSize(e.style.fontSize);
    s.setIntensity(e.style.intensity);
    s.setAlign(e.style.align);
    s.setIndent(e.style.indent);
    router.push("/");
  };

  return (
    <div className="flex flex-col gap-4">
      {mounted && entries.length > 0 && (
        <div className="flex justify-end">
          <button
            onClick={() => {
              if (window.confirm(t("confirmClear"))) clear();
            }}
            className="btn btn-ghost px-3 py-1.5 text-xs text-zinc-500"
          >
            <TrashSimple className="size-3.5" />
            {t("clearAll")}
          </button>
        </div>
      )}

      {mounted && entries.length === 0 && (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-zinc-300 py-20">
          <NoteBlank className="size-10 text-zinc-300" />
          <p className="font-hand text-3xl text-zinc-300">{t("emptyTitle")}</p>
          <p className="text-sm text-zinc-400">{t("emptyHint")}</p>
          <Link href="/" className="btn btn-primary mt-1 px-5 py-2.5">
            {t("goTool")}
          </Link>
        </div>
      )}

      <ul className="flex flex-col gap-3">
        {entries.map((e, i) => (
          <li
            key={e.id}
            className="rise flex items-start justify-between gap-4 rounded-2xl border border-zinc-200 bg-white p-5"
            style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }}
          >
            <div className="min-w-0 flex-1">
              <p className="line-clamp-2 whitespace-pre-wrap text-sm leading-relaxed text-zinc-800">
                {e.text}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-zinc-400">
                <time className="font-mono">
                  {new Date(e.savedAt).toLocaleString(undefined, {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </time>
                <span className="rounded-full bg-zinc-100 px-2 py-0.5">{t(SOURCE_KEY[e.source])}</span>
                <span className="font-mono">{e.text.length} {t("charUnit")}</span>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button
                onClick={() => restore(e)}
                title={t("restore")}
                className="btn btn-primary px-3.5 py-2 text-xs"
              >
                <ArrowsCounterClockwise className="size-3.5" />
                {t("restore")}
              </button>
              <button
                onClick={() => remove(e.id)}
                title={t("delete")}
                aria-label={t("delete")}
                className="flex size-8 cursor-pointer items-center justify-center rounded-lg border border-zinc-200 text-zinc-400 transition-colors hover:border-rose-200 hover:text-rose-600"
              >
                <Trash className="size-4" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
