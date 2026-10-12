"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type PointerEvent } from "react";
import { useTranslations } from "next-intl";
import { INKS } from "@/stores/useEditorStore";
import {
  ERASER_WIDTH,
  GRID_COLOR,
  LINE_GAP,
  PAD_STORAGE_KEY,
  PEN_WIDTHS,
  RULED_COLOR,
  appendPoint,
  defaultSheet,
  fromRatio,
  parseSheet,
  serializeSheet,
  toRatio,
  type PadPaper,
  type PadSheet,
  type PadStroke,
  type PadTool,
} from "@/engine/pad";

const DPR_CAP = 2;

function paintGuides(ctx: CanvasRenderingContext2D, width: number, height: number, paper: PadPaper) {
  if (paper === "blank") return;
  ctx.save();
  ctx.beginPath();
  ctx.strokeStyle = paper === "grid" ? GRID_COLOR : RULED_COLOR;
  ctx.lineWidth = 1;
  for (let y = LINE_GAP; y < height; y += LINE_GAP) {
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
  }
  if (paper === "grid") {
    for (let x = LINE_GAP; x < width; x += LINE_GAP) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
  }
  ctx.stroke();
  ctx.restore();
}

function paintStroke(ctx: CanvasRenderingContext2D, stroke: PadStroke, width: number, height: number) {
  if (!stroke.points.length) return;
  const lineWidth = stroke.tool === "eraser" ? ERASER_WIDTH : stroke.width;
  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.lineWidth = lineWidth;
  if (stroke.tool === "eraser") {
    ctx.globalCompositeOperation = "destination-out";
    ctx.strokeStyle = "#000000";
    ctx.fillStyle = "#000000";
  } else {
    ctx.globalCompositeOperation = "source-over";
    ctx.strokeStyle = stroke.color;
    ctx.fillStyle = stroke.color;
  }
  const first = fromRatio(stroke.points[0], width, height);
  if (stroke.points.length === 1) {
    ctx.beginPath();
    ctx.arc(first.x, first.y, lineWidth / 2, 0, Math.PI * 2);
    ctx.fill();
  } else {
    ctx.beginPath();
    ctx.moveTo(first.x, first.y);
    for (let i = 1; i < stroke.points.length; i++) {
      const point = fromRatio(stroke.points[i], width, height);
      ctx.lineTo(point.x, point.y);
    }
    ctx.stroke();
  }
  ctx.restore();
}

/** 墨水画在单独一层,橡皮只擦墨,横线留在底下。 */
function paintPad(
  ctx: CanvasRenderingContext2D,
  ink: HTMLCanvasElement,
  cssW: number,
  cssH: number,
  dpr: number,
  strokes: PadStroke[],
  paper: PadPaper,
) {
  const pxW = Math.max(1, Math.floor(cssW * dpr));
  const pxH = Math.max(1, Math.floor(cssH * dpr));
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, cssW, cssH);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, cssW, cssH);
  paintGuides(ctx, cssW, cssH, paper);

  ink.width = pxW;
  ink.height = pxH;
  const inkCtx = ink.getContext("2d");
  if (!inkCtx) return;
  inkCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  inkCtx.clearRect(0, 0, cssW, cssH);
  for (const stroke of strokes) paintStroke(inkCtx, stroke, cssW, cssH);
  ctx.drawImage(ink, 0, 0, cssW, cssH);
}

function readStoredSheet(): PadSheet {
  try {
    return parseSheet(localStorage.getItem(PAD_STORAGE_KEY)) ?? defaultSheet();
  } catch {
    return defaultSheet();
  }
}

function storeSheet(sheet: PadSheet): boolean {
  try {
    localStorage.setItem(PAD_STORAGE_KEY, serializeSheet(sheet));
    return true;
  } catch {
    return false;
  }
}

export default function HandwritingPad() {
  const t = useTranslations("handwritingPad");
  const toolCopy = useTranslations("tool");
  const rootRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inkRef = useRef<HTMLCanvasElement | null>(null);
  const sizeRef = useRef<{ cssW: number; cssH: number; dpr: number } | null>(null);
  const sheetRef = useRef<PadSheet>(defaultSheet());
  const draftRef = useRef<PadStroke | null>(null);
  const pointerRef = useRef<number | null>(null);
  const clearArmedRef = useRef(false);

  const [sheet, setSheet] = useState<PadSheet>(defaultSheet);
  const [draft, setDraft] = useState<PadStroke | null>(null);
  const [tool, setTool] = useState<PadTool>("pen");
  const [penOpen, setPenOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [clearArmed, setClearArmed] = useState(false);
  const [ready, setReady] = useState(false);
  const [persistFailed, setPersistFailed] = useState(false);
  const [exportFailed, setExportFailed] = useState(false);

  sheetRef.current = sheet;
  draftRef.current = draft;
  clearArmedRef.current = clearArmed;

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    const size = sizeRef.current;
    if (!canvas || !size) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (!inkRef.current) inkRef.current = document.createElement("canvas");
    const strokes = draftRef.current
      ? [...sheetRef.current.strokes, draftRef.current]
      : sheetRef.current.strokes;
    paintPad(ctx, inkRef.current, size.cssW, size.cssH, size.dpr, strokes, sheetRef.current.paper);
  }, []);

  useLayoutEffect(() => {
    setSheet(readStoredSheet());
    setReady(true);
  }, []);

  useLayoutEffect(() => {
    const header = document.querySelector("header");
    const root = rootRef.current;
    if (!header || !root) return;
    const apply = () => {
      root.style.top = `${header.getBoundingClientRect().height}px`;
    };
    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const fit = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = wrap.getBoundingClientRect();
      const cssW = Math.max(1, Math.floor(rect.width));
      const cssH = Math.max(1, Math.floor(rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
      canvas.width = Math.floor(cssW * dpr);
      canvas.height = Math.floor(cssH * dpr);
      sizeRef.current = { cssW, cssH, dpr };
      redraw();
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(wrap);
    return () => observer.disconnect();
  }, [redraw]);

  useLayoutEffect(() => {
    redraw();
  }, [sheet, draft, redraw]);

  useEffect(() => {
    if (!ready) return;
    setPersistFailed(!storeSheet(sheet));
  }, [ready, sheet]);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  function pointFromEvent(event: PointerEvent<HTMLCanvasElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    return {
      point: toRatio(event.clientX - rect.left, event.clientY - rect.top, rect.width, rect.height),
      width: rect.width,
      height: rect.height,
    };
  }

  function onPointerDown(event: PointerEvent<HTMLCanvasElement>) {
    if (pointerRef.current !== null) {
      const finished = draftRef.current;
      draftRef.current = null;
      pointerRef.current = null;
      setDraft(null);
      if (finished && finished.points.length) {
        setSheet((current) => ({ ...current, strokes: [...current.strokes, finished] }));
      }
    }
    if (clearArmedRef.current) {
      setClearArmed(false);
      return;
    }
    setPenOpen(false);
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      // 指针尚未进入 active 时捕获会失败,纸面内的移动仍然能画
    }
    pointerRef.current = event.pointerId;
    const { point } = pointFromEvent(event);
    const stroke: PadStroke = {
      tool,
      color: sheetRef.current.ink,
      width: tool === "eraser" ? ERASER_WIDTH : sheetRef.current.width,
      points: [point],
    };
    draftRef.current = stroke;
    setDraft(stroke);
  }

  function onPointerMove(event: PointerEvent<HTMLCanvasElement>) {
    if (event.pointerId !== pointerRef.current) return;
    const current = draftRef.current;
    if (!current) return;
    const { point, width, height } = pointFromEvent(event);
    const points = appendPoint(current.points, point, width, height);
    if (points === current.points) return;
    const next = { ...current, points };
    draftRef.current = next;
    setDraft(next);
  }

  function endStroke(event: PointerEvent<HTMLCanvasElement>) {
    if (event.pointerId !== pointerRef.current) return;
    pointerRef.current = null;
    const finished = draftRef.current;
    draftRef.current = null;
    setDraft(null);
    if (!finished || !finished.points.length) return;
    setSheet((current) => ({ ...current, strokes: [...current.strokes, finished] }));
    setExportFailed(false);
  }

  function download() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) {
        setExportFailed(true);
        return;
      }
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "handwriting-pad.png";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      setExportFailed(false);
    }, "image/png");
  }

  function choosePen() {
    setTool("pen");
    setPenOpen((open) => !open);
  }

  const button = "btn btn-ghost px-2.5 py-1.5 text-xs";
  const pressed = "border-zinc-950";

  return (
    <div
      ref={rootRef}
      className="fixed inset-x-0 bottom-0 z-20 flex flex-col bg-white"
      style={{ top: "3.5rem", overscrollBehavior: "none" }}
    >
      <div className="flex flex-wrap items-center gap-1 border-b border-zinc-200 px-2 py-2">
        <h1 className="mr-auto max-w-full truncate text-sm font-semibold text-zinc-950">{t("title")}</h1>
        <button
          type="button"
          className={`${button} ${tool === "pen" ? pressed : ""}`}
          aria-pressed={tool === "pen"}
          aria-expanded={penOpen}
          onClick={choosePen}
        >
          {t("pen")}
        </button>
        <button
          type="button"
          className={`${button} ${tool === "eraser" ? pressed : ""}`}
          aria-pressed={tool === "eraser"}
          onClick={() => {
            setTool("eraser");
            setPenOpen(false);
          }}
        >
          {t("eraser")}
        </button>
        <button
          type="button"
          className={button}
          disabled={sheet.strokes.length === 0}
          onClick={() => setSheet((current) => ({ ...current, strokes: current.strokes.slice(0, -1) }))}
        >
          {t("undo")}
        </button>
        <button
          type="button"
          className={`${button} ${clearArmed ? pressed : ""}`}
          aria-pressed={clearArmed}
          onClick={() => {
            if (!clearArmed) {
              setClearArmed(true);
              return;
            }
            setClearArmed(false);
            setSheet((current) => ({ ...current, strokes: [] }));
          }}
        >
          {clearArmed ? t("clearConfirm") : t("clear")}
        </button>
        <button type="button" className="btn btn-primary px-2.5 py-1.5 text-xs" onClick={download}>
          {t("download")}
        </button>
        <button
          type="button"
          className={`${button} ${helpOpen ? pressed : ""}`}
          aria-expanded={helpOpen}
          aria-controls="pad-help"
          onClick={() => setHelpOpen((open) => !open)}
        >
          {t("help")}
        </button>
        {penOpen && (
          <div className="flex w-full flex-col gap-2 pt-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-zinc-500">{t("ink")}</span>
              {INKS.map((ink) => (
                <button
                  key={ink.id}
                  type="button"
                  title={toolCopy(`inks.${ink.id}`)}
                  aria-label={toolCopy(`inks.${ink.id}`)}
                  aria-pressed={sheet.ink === ink.value}
                  onClick={() => setSheet((current) => ({ ...current, ink: ink.value }))}
                  className={`size-6 rounded-full ${
                    sheet.ink === ink.value ? "ring-2 ring-accent ring-offset-2" : "ring-1 ring-zinc-200"
                  }`}
                  style={{ background: ink.value }}
                />
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-1">
              <span className="text-xs text-zinc-500">{t("width")}</span>
              {PEN_WIDTHS.map((width) => (
                <button
                  key={width}
                  type="button"
                  className={`${button} ${sheet.width === width ? pressed : ""}`}
                  aria-pressed={sheet.width === width}
                  onClick={() => setSheet((current) => ({ ...current, width }))}
                >
                  {t(width === 2 ? "fine" : width === 4 ? "medium" : "thick")}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-1">
              <span className="text-xs text-zinc-500">{t("paper")}</span>
              {(["blank", "ruled", "grid"] as const).map((paper) => (
                <button
                  key={paper}
                  type="button"
                  className={`${button} ${sheet.paper === paper ? pressed : ""}`}
                  aria-pressed={sheet.paper === paper}
                  onClick={() => setSheet((current) => ({ ...current, paper }))}
                >
                  {toolCopy(`papers.${paper}`)}
                </button>
              ))}
            </div>
          </div>
        )}
        <div id="pad-help" hidden={!helpOpen} className="w-full space-y-1 text-xs leading-relaxed text-zinc-600">
          <p>{t("helpLocal")}</p>
          <p>{t("helpRefresh")}</p>
        </div>
        {persistFailed && <p className="w-full text-xs text-rose-700">{t("persistFailed")}</p>}
        {exportFailed && <p className="w-full text-xs text-rose-700">{t("downloadFailed")}</p>}
      </div>
      <div ref={wrapRef} className="min-h-0 flex-1">
        <canvas
          ref={canvasRef}
          className="block h-full w-full touch-none"
          aria-label={t("sheetLabel")}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endStroke}
          onPointerCancel={endStroke}
        />
      </div>
    </div>
  );
}
