"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { FilePdf, Image as ImageIcon } from "@phosphor-icons/react";
import { jsPDF } from "jspdf";
import { FONT_CATALOG, type FontCatalogEntry } from "@/content/fontCatalog";
import { fadeInk } from "@/lib/ink";
import { defaultPageFormat, PAGE_FORMATS, type PageFormat } from "@/lib/localeDefaults";
import { signatureForms } from "@/lib/signatureForms";
import { waitForFontFace } from "@/lib/fontFace";
import ColorSwatch from "./ColorSwatch";
import PageFormatToggle from "./PageFormatToggle";
import PracticeLayout from "./PracticeLayout";

const SIGNATURE_FONTS = FONT_CATALOG.filter((entry) => entry.style === "signature script");
const ROW_H = 78;

function familyOf(css: string): string {
  return css.match(/'([^']+)'/)?.[1] ?? "cursive";
}

type Row = { kind: "solid" | "dotted" | "blank"; text: string; font: FontCatalogEntry; caption: string };

function buildRows(
  form: string,
  fontId: string,
  compare: boolean,
  captions: { trace: string; copy: string },
): Row[] {
  const selected = SIGNATURE_FONTS.find((entry) => entry.id === fontId) ?? SIGNATURE_FONTS[0];
  const rows: Row[] = [];
  if (compare) {
    for (const font of SIGNATURE_FONTS) {
      rows.push({ kind: "solid", text: form, font, caption: font.displayName });
    }
  }
  if (!selected) return rows;
  rows.push({ kind: "solid", text: form, font: selected, caption: captions.trace });
  rows.push({ kind: "dotted", text: form, font: selected, caption: captions.trace });
  for (let i = 0; i < 4; i++) {
    rows.push({ kind: "blank", text: "", font: selected, caption: i === 0 ? captions.copy : "" });
  }
  return rows;
}

export default function SignaturePractice({ defaultFormat }: { defaultFormat?: PageFormat }) {
  const t = useTranslations("signaturePractice");
  const sheet = useTranslations("sheet");
  const tool = useTranslations("tool");
  const tracing = useTranslations("tracing");
  const [name, setName] = useState("");
  const [form, setForm] = useState("");
  const [fontId, setFontId] = useState(SIGNATURE_FONTS[0]?.id ?? "greatvibes");
  const [compare, setCompare] = useState(true);
  const [textColor, setTextColor] = useState("#1a1a1a");
  const [bg, setBg] = useState("#ffffff");
  const [format, setFormat] = useState<PageFormat>(defaultFormat ?? defaultPageFormat("en"));
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { w, h } = PAGE_FORMATS[format];

  const sample = name.trim() || t("namePlaceholder");
  const forms = useMemo(() => signatureForms(sample), [sample]);
  const activeForm = forms.includes(form) ? form : (forms[0] ?? sample);

  const rows = useMemo(
    () => buildRows(activeForm, fontId, compare, { trace: t("trace"), copy: t("copy") }),
    [activeForm, fontId, compare, t],
  );

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      const used = new Set(rows.map((row) => row.font));
      await Promise.all(
        [...used].map(async (font) => {
          const family = familyOf(font.css);
          await waitForFontFace(family);
          await document.fonts.load(`52px "${family}"`, activeForm).catch(() => {});
        }),
      );
      if (!cancelled) draw();
    };
    void run();
    return () => {
      cancelled = true;
    };
    // draw 读的就是这些状态
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, activeForm, textColor, bg, format, w, h]);

  function draw(target?: CanvasRenderingContext2D) {
    let ctx = target ?? null;
    if (!ctx) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = w;
      canvas.height = h;
      ctx = canvas.getContext("2d");
    }
    if (!ctx) return;
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#52525b";
    ctx.font = "18px sans-serif";
    ctx.textBaseline = "alphabetic";
    ctx.fillText(`${sheet("nameLine")}: ____________________`, 48, 40);
    ctx.fillText(`${sheet("dateLine")}: ____________`, w - 280, 40);

    let y = 64;
    for (const row of rows) {
      if (y + ROW_H > h - 24) break;
      const baseline = y + ROW_H - 16;
      ctx.strokeStyle = "#9db3cc";
      ctx.lineWidth = 1;
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(132, baseline);
      ctx.lineTo(w - 40, baseline);
      ctx.stroke();
      if (row.caption) {
        ctx.fillStyle = "#71717a";
        ctx.font = "13px sans-serif";
        ctx.fillText(row.caption, 40, baseline);
      }
      if (row.kind !== "blank" && row.text) {
        const family = familyOf(row.font.css);
        let size = 52;
        ctx.font = `${size}px "${family}"`;
        while (size > 28 && ctx.measureText(row.text).width > w - 180) {
          size -= 2;
          ctx.font = `${size}px "${family}"`;
        }
        ctx.textBaseline = "alphabetic";
        if (row.kind === "solid") {
          ctx.fillStyle = textColor;
          ctx.fillText(row.text, 140, baseline - 4);
        } else {
          ctx.strokeStyle = fadeInk(textColor);
          ctx.lineWidth = 1.15;
          ctx.setLineDash([2.5, 2.5]);
          ctx.strokeText(row.text, 140, baseline - 4);
          ctx.setLineDash([]);
        }
      }
      y += ROW_H;
    }
  }

  const downloadPdf = () => {
    const off = document.createElement("canvas");
    off.width = w;
    off.height = h;
    const ctx = off.getContext("2d");
    if (!ctx) return;
    draw(ctx);
    const pdf = new jsPDF({ unit: "px", format: [w, h], orientation: "portrait" });
    pdf.addImage(off.toDataURL("image/png"), "PNG", 0, 0, w, h);
    pdf.save("signature-practice-sheet.pdf");
  };

  const downloadPng = () => {
    const scale = 2;
    const off = document.createElement("canvas");
    off.width = w * scale;
    off.height = h * scale;
    const ctx = off.getContext("2d");
    if (!ctx) return;
    ctx.scale(scale, scale);
    draw(ctx);
    off.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "signature-practice-sheet.png";
      a.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  };

  const chip = (selected: boolean) =>
    `cursor-pointer rounded-lg border px-2.5 py-1.5 text-xs transition-colors ${
      selected ? "border-accent bg-accent/5 text-accent" : "border-zinc-200 bg-white text-zinc-500 hover:border-zinc-300"
    }`;

  return (
    <PracticeLayout
      input={
        <>
          <div className="flex flex-col gap-1.5">
            <span className="field-label">{t("nameLabel")}</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("namePlaceholder")}
              className="surface-input px-3 py-2 text-sm"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="field-label">{t("formLabel")}</span>
            <div className="flex flex-wrap gap-1.5">
              {forms.map((item) => (
                <button key={item} type="button" aria-pressed={item === activeForm} onClick={() => setForm(item)} className={chip(item === activeForm)}>
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="field-label">{t("styleLabel")}</span>
            <div className="flex flex-wrap gap-1.5">
              {SIGNATURE_FONTS.map((font) => (
                <button key={font.id} type="button" aria-pressed={font.id === fontId} onClick={() => setFontId(font.id)} className={chip(font.id === fontId)}>
                  {font.displayName}
                </button>
              ))}
            </div>
          </div>
        </>
      }
      download={
        <div className="flex gap-2">
          <button type="button" onClick={downloadPdf} className="btn btn-primary flex-1 px-4 py-2.5 text-sm">
            <FilePdf className="size-4" />
            {t("downloadPdf")}
          </button>
          <button type="button" onClick={downloadPng} className="btn btn-ghost flex-1 px-4 py-2.5 text-sm">
            <ImageIcon className="size-4 text-zinc-500" />
            {t("downloadPng")}
          </button>
        </div>
      }
      more={
        <>
          <label className="flex items-center justify-between gap-2 text-sm">
            <span className="text-zinc-700">{t("compare")}</span>
            <button
              type="button"
              role="switch"
              aria-checked={compare}
              onClick={() => setCompare(!compare)}
              className={`relative h-6 w-11 cursor-pointer rounded-full transition-colors duration-200 ${compare ? "bg-accent" : "bg-zinc-300"}`}
            >
              <span className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow transition-transform duration-200 ${compare ? "translate-x-5" : ""}`} />
            </button>
          </label>
          <ColorSwatch label={tracing("textColor")} value={textColor} onChange={setTextColor} />
          <ColorSwatch label={tool("paperCustom.bg")} value={bg} onChange={setBg} />
          <PageFormatToggle value={format} onChange={setFormat} />
        </>
      }
      preview={
        <div className="overflow-hidden rounded-xl border border-zinc-200 shadow-paper">
          <canvas ref={canvasRef} aria-label={t("sheetLabel")} className="block h-auto w-full" />
        </div>
      }
    />
  );
}
