"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Frame } from "../frame";
import type { Copy, LocaleId } from "@/lib/copy";
import { localizedPath } from "@/lib/locales.mjs";
import { HANDS, INKS, SIZES, TEMPLATES } from "@/lib/looks";
import { paginate } from "@/lib/paginate.mjs";
import { pdfFromJpegs } from "@/lib/pdf.mjs";
import { loadText } from "@/lib/session";

type TemplateId = keyof typeof TEMPLATES;
type HandId = keyof typeof HANDS;
type InkId = keyof typeof INKS;

function download(bytes: BlobPart, name: string, type: string) {
  const url = URL.createObjectURL(new Blob([bytes], { type }));
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  link.click();
  URL.revokeObjectURL(url);
}

type SizeId = keyof typeof SIZES;

async function drawSheet(lines: string[], templateId: TemplateId, handId: HandId, inkId: InkId, sizeId: SizeId) {
  const template = TEMPLATES[templateId];
  const hand = HANDS[handId];
  const ink = INKS[inkId];
  const size = Math.round(hand.size * SIZES[sizeId].scale);
  await document.fonts.load(`${size}px "${hand.font}"`);
  const canvas = document.createElement("canvas");
  canvas.width = template.width;
  canvas.height = template.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("draw");
  ctx.fillStyle = template.paper;
  ctx.fillRect(0, 0, template.width, template.height);
  if (template.ruled) {
    ctx.strokeStyle = "rgba(70, 110, 170, 0.28)";
    for (let y = template.margin; y < template.height - 36; y += 36) {
      ctx.beginPath();
      ctx.moveTo(40, y);
      ctx.lineTo(template.width - 40, y);
      ctx.stroke();
    }
  }
  if (template.grid) {
    ctx.strokeStyle = "rgba(90, 140, 190, 0.22)";
    for (let x = 48; x < template.width; x += 32) {
      ctx.beginPath();
      ctx.moveTo(x, 40);
      ctx.lineTo(x, template.height - 40);
      ctx.stroke();
    }
    for (let y = 40; y < template.height; y += 32) {
      ctx.beginPath();
      ctx.moveTo(40, y);
      ctx.lineTo(template.width - 40, y);
      ctx.stroke();
    }
  }
  ctx.fillStyle = ink.color;
  ctx.font = `${size}px "${hand.font}"`;
  const lineHeight = Math.floor((template.height - template.margin * 2) / template.lines);
  lines.forEach((line, index) => {
    ctx.fillText(line, template.margin, template.margin + size + index * lineHeight);
  });
  return canvas;
}

async function canvasJpeg(canvas: HTMLCanvasElement) {
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.92));
  if (!blob) throw new Error("export");
  return new Uint8Array(await blob.arrayBuffer());
}

export function Studio({ locale, copy }: { locale: LocaleId; copy: Copy }) {
  const ui = copy.studio;
  const [text, setText] = useState("");
  const [templateId, setTemplateId] = useState<TemplateId>("letter");
  const [handId, setHandId] = useState<HandId>("casual");
  const [sizeId, setSizeId] = useState<SizeId>("medium");
  const [inkId, setInkId] = useState<InkId>("blue");
  const [page, setPage] = useState(0);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setText(loadText());
  }, []);

  const template = TEMPLATES[templateId];
  const fitted = { ...template, maxChars: Math.max(12, Math.floor(template.maxChars / SIZES[sizeId].scale)) };
  const pages = useMemo(() => paginate(text, fitted), [text, templateId, sizeId]);
  const safePage = Math.min(page, Math.max(pages.length - 1, 0));

  useEffect(() => {
    let gone = false;
    drawSheet(pages[safePage] || [], templateId, handId, inkId, sizeId)
      .then((canvas) => {
        if (!gone) setPreview(canvas.toDataURL("image/jpeg", 0.92));
      })
      .catch((err: unknown) => {
        if (!gone) setError(ui.drawError);
      });
    return () => {
      gone = true;
    };
  }, [pages, safePage, templateId, handId, inkId, sizeId]);

  async function exportPages() {
    const drawn = [];
    for (const lines of pages) {
      const canvas = await drawSheet(lines, templateId, handId, inkId, sizeId);
      drawn.push({ canvas, jpeg: await canvasJpeg(canvas), width: canvas.width, height: canvas.height });
    }
    return drawn;
  }

  async function savePng() {
    setBusy(true);
    setError("");
    try {
      const canvas = await drawSheet(pages[safePage] || [], templateId, handId, inkId, sizeId);
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
      if (!blob) throw new Error(ui.pngError);
      download(await blob.arrayBuffer(), `handwriting-${safePage + 1}.png`, "image/png");
    } catch {
      setError(ui.pngError);
    } finally {
      setBusy(false);
    }
  }

  async function savePdf() {
    setBusy(true);
    setError("");
    try {
      const drawn = await exportPages();
      const pdf = pdfFromJpegs(drawn.map(({ jpeg, width, height }) => ({ jpeg, width, height })));
      download(pdf, "handwriting.pdf", "application/pdf");
    } catch {
      setError(ui.pdfError);
    } finally {
      setBusy(false);
    }
  }

  return (
    <Frame locale={locale} copy={copy} step={3}>
      <p className="kicker">{ui.kicker}</p>
      <h1>{ui.h1}</h1>
      <p className="lede">{ui.lede}</p>
      {!text.trim() && (
        <p className="note">
          {ui.emptyBefore} <Link href={localizedPath(locale, "/text")}>{ui.emptyLink}</Link>
        </p>
      )}
      <div className="panel">
        <div className="chips">
          {Object.values(TEMPLATES).map((item) => (
            <button key={item.id} className="chip" type="button" aria-pressed={templateId === item.id} onClick={() => { setTemplateId(item.id); setPage(0); }}>{ui[item.id]}</button>
          ))}
        </div>
        <div className="chips">
          {Object.values(HANDS).map((item) => (
            <button key={item.id} className="chip" type="button" aria-pressed={handId === item.id} onClick={() => setHandId(item.id)}>{ui[item.id]}</button>
          ))}
          {Object.values(SIZES).map((item) => (
            <button key={item.id} className="chip" type="button" aria-pressed={sizeId === item.id} onClick={() => setSizeId(item.id)}>{ui[item.id]}</button>
          ))}
          {Object.values(INKS).map((item) => (
            <button key={item.id} className="chip" type="button" aria-pressed={inkId === item.id} onClick={() => setInkId(item.id)}>{ui[item.id]}</button>
          ))}
        </div>
        {preview && <img className="sheet-preview" src={preview} alt={ui.alt.replace("{current}", String(safePage + 1))} />}
        <div className="actions">
          <button className="back" type="button" disabled={safePage === 0} onClick={() => setPage(safePage - 1)}>{ui.previous}</button>
          <span className="note">{ui.page.replace("{current}", String(safePage + 1)).replace("{total}", String(pages.length))}</span>
          <button className="back" type="button" disabled={safePage >= pages.length - 1} onClick={() => setPage(safePage + 1)}>{ui.nextPage}</button>
        </div>
        <div className="actions">
          <Link className="back link" href={localizedPath(locale, "/text")}>{ui.edit}</Link>
          <button className="back" type="button" disabled={busy || !text.trim()} onClick={() => void savePng()}>{ui.png}</button>
          <button className="primary" type="button" disabled={busy || !text.trim()} onClick={() => void savePdf()}>{ui.pdf}</button>
        </div>
        {error && <p className="error">{error}</p>}
      </div>
    </Frame>
  );
}
