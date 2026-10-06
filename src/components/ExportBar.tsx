"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { DownloadSimple, FilePdf } from "@phosphor-icons/react";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import { useEditorStore } from "@/stores/useEditorStore";
import { snapshotEditor } from "@/stores/useHistoryStore";
import { PAGE_H, PAGE_W } from "./PaperView";

export default function ExportBar() {
  const t = useTranslations("tool");
  const text = useEditorStore((s) => s.text);
  const [busy, setBusy] = useState(false);

  const pageEls = () => Array.from(document.querySelectorAll<HTMLElement>(".paper"));

  const toPngPages = async () =>
    Promise.all(pageEls().map((el) => toPng(el, { pixelRatio: 2, backgroundColor: "#ffffff" })));

  const download = (dataUrl: string, name: string) => {
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = name;
    a.click();
  };

  const exportPng = async () => {
    setBusy(true);
    try {
      const urls = await toPngPages();
      urls.forEach((u, i) => download(u, `handwriting-${i + 1}.png`));
      snapshotEditor("export");
    } finally {
      setBusy(false);
    }
  };

  const exportPdf = async () => {
    setBusy(true);
    try {
      const urls = await toPngPages();
      const pdf = new jsPDF({ unit: "px", format: [PAGE_W, PAGE_H], orientation: "portrait" });
      urls.forEach((u, i) => {
        if (i > 0) pdf.addPage([PAGE_W, PAGE_H], "portrait");
        pdf.addImage(u, "PNG", 0, 0, PAGE_W, PAGE_H);
      });
      pdf.save("handwriting.pdf");
      snapshotEditor("export");
    } finally {
      setBusy(false);
    }
  };

  const disabled = !text.trim() || busy;
  return (
    <div className="flex gap-2">
      <button onClick={exportPng} disabled={disabled} className="btn btn-ghost px-4 py-2.5">
        <DownloadSimple className="size-4 text-zinc-500" />
        {busy ? t("exporting") : t("exportPng")}
      </button>
      <button onClick={exportPdf} disabled={disabled} className="btn btn-ghost px-4 py-2.5">
        <FilePdf className="size-4 text-zinc-500" />
        {t("exportPdf")}
      </button>
    </div>
  );
}
