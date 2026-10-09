"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowsCounterClockwise, DownloadSimple, Pause, Play } from "@phosphor-icons/react";
import { FONTS } from "@/stores/useEditorStore";
import { defaultFontId, fontOrder } from "@/lib/localeDefaults";
import { encodeGif, indexRgb332, palette332 } from "@/lib/gifEncode";
import { layoutRepeaterText, repeaterFrame, type RepeaterFrame, type RepeaterGlyph } from "@/engine/repeater";
import { useDebouncedImeSafe } from "./useDebouncedImeSafe";
import ColorSwatch from "./ColorSwatch";

function primaryFamily(css: string): string {
  return css.match(/'([^']+)'/)?.[1] ?? "cursive";
}

const STAGE_W = 900;
const FONT_SIZE = 68;
const LINE_HEIGHT = 148;
const START_X = 56;
const MAX_WIDTH = STAGE_W - START_X * 2;
const FIRST_BASELINE = 118;
/** 写完后的空白练习行 */
const BLANK_LINES = 2;
/** 写完后停住再重播,ms */
const HOLD_MS = 900;

function stageHeight(glyphs: RepeaterGlyph[]): number {
  const last = glyphs.length ? glyphs[glyphs.length - 1].baseline : FIRST_BASELINE;
  const lines = glyphs.length ? Math.round((last - FIRST_BASELINE) / LINE_HEIGHT) + 1 : 1;
  return FIRST_BASELINE + (lines - 1 + BLANK_LINES) * LINE_HEIGHT + 56;
}

function smoothstep(t: number): number {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
}

function drawGuides(ctx: CanvasRenderingContext2D, baseline: number) {
  const top = baseline - FONT_SIZE * 0.78;
  const mid = baseline - FONT_SIZE * 0.32;
  const x0 = 40;
  const x1 = STAGE_W - 40;
  ctx.save();
  ctx.lineWidth = 1.25;
  ctx.strokeStyle = "#d5deea";
  ctx.beginPath();
  ctx.moveTo(x0, top);
  ctx.lineTo(x1, top);
  ctx.stroke();
  ctx.strokeStyle = "#b7c6da";
  ctx.setLineDash([7, 6]);
  ctx.beginPath();
  ctx.moveTo(x0, mid);
  ctx.lineTo(x1, mid);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.strokeStyle = "#8ea6c4";
  ctx.beginPath();
  ctx.moveTo(x0, baseline);
  ctx.lineTo(x1, baseline);
  ctx.stroke();
  ctx.restore();
}

function paint(
  ctx: CanvasRenderingContext2D,
  glyphs: RepeaterGlyph[],
  frame: RepeaterFrame,
  family: string,
  ink: string,
  bg: string,
  trace: boolean,
  height: number,
) {
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, STAGE_W, height);

  const last = glyphs.length ? glyphs[glyphs.length - 1].baseline : FIRST_BASELINE;
  const lines = glyphs.length ? Math.round((last - FIRST_BASELINE) / LINE_HEIGHT) + 1 : 1;
  for (let i = 0; i < lines + BLANK_LINES; i++) {
    drawGuides(ctx, FIRST_BASELINE + i * LINE_HEIGHT);
  }

  ctx.font = `${FONT_SIZE}px "${family}"`;
  ctx.textBaseline = "alphabetic";
  ctx.lineJoin = "round";

  if (trace) {
    ctx.save();
    ctx.globalAlpha = 0.2;
    ctx.fillStyle = ink;
    for (const g of glyphs) ctx.fillText(g.char, g.x, g.baseline);
    ctx.restore();
  }

  const complete = frame.finished || frame.holding || frame.doneCount >= glyphs.length;
  ctx.fillStyle = ink;
  const solidCount = complete ? glyphs.length : frame.doneCount;
  for (let i = 0; i < solidCount; i++) {
    const g = glyphs[i];
    ctx.fillText(g.char, g.x, g.baseline);
  }
  if (!complete && frame.partial > 0 && glyphs[frame.doneCount]) {
    const g = glyphs[frame.doneCount];
    const shown = smoothstep(frame.partial);
    ctx.save();
    ctx.beginPath();
    ctx.rect(g.x - 2, g.baseline - FONT_SIZE * 1.2, Math.max(1, g.width * shown + 3), FONT_SIZE * 1.8);
    ctx.clip();
    ctx.fillText(g.char, g.x, g.baseline);
    ctx.restore();
  }

  if (!complete && glyphs[frame.doneCount]) {
    const g = glyphs[frame.doneCount];
    const shown = smoothstep(frame.partial);
    const px = g.x + g.width * shown;
    const py = g.baseline - FONT_SIZE * 0.34;
    ctx.beginPath();
    ctx.arc(px, py, 5.5, 0, Math.PI * 2);
    ctx.fillStyle = ink;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#fffdf8";
    ctx.stroke();
  }
}

function Switch({
  checked,
  label,
  onChange,
}: {
  checked: boolean;
  label: string;
  onChange: (next: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-2 text-sm">
      <span className="text-zinc-700">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 cursor-pointer rounded-full transition-colors duration-200 ${
          checked ? "bg-accent" : "bg-zinc-300"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow transition-transform duration-200 ${
            checked ? "translate-x-5" : ""
          }`}
        />
      </button>
    </label>
  );
}

/** 手写循环演示:横线纸上逐字揭开,写完可循环,并导出这一遍的 GIF */
export default function HandwritingRepeater() {
  const t = useTranslations("repeater");
  const tool = useTranslations("tool");
  const locale = useLocale();
  const [text, setText] = useState(() => t("sampleSentence"));
  const [fontId, setFontId] = useState<string>(() => defaultFontId(locale));
  const [ink, setInk] = useState("#1a1a1a");
  const [bg, setBg] = useState("#fffdf8");
  /** 0 最慢,100 最快 */
  const [speed, setSpeed] = useState(42);
  const [loop, setLoop] = useState(true);
  const [trace, setTrace] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [ready, setReady] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const elapsedRef = useRef(0);
  const playingRef = useRef(true);
  const reduceRef = useRef(false);
  const inkRef = useRef(ink);
  const bgRef = useRef(bg);
  const traceRef = useRef(trace);
  const loopRef = useRef(loop);
  const msRef = useRef(160);
  const snapshotRef = useRef({ glyphs: [] as RepeaterGlyph[], family: "Patrick Hand", height: 400 });

  const font = FONTS.find((f) => f.id === fontId) ?? FONTS[0];
  const family = primaryFamily(font.css);
  const fontOptions = fontOrder(locale).map((id) => FONTS.find((f) => f.id === id)!);
  const [debounced, compositionProps] = useDebouncedImeSafe(text);
  const msPerGlyph = Math.round(240 - (speed / 100) * 190);

  // 动画循环读这些值。放在重排版 effect 之前,这样「减少动态」里把 playingRef 关掉的写入不会被这里盖回去。
  useEffect(() => {
    inkRef.current = ink;
    bgRef.current = bg;
    traceRef.current = trace;
    loopRef.current = loop;
    msRef.current = msPerGlyph;
    playingRef.current = playing;
  }, [ink, bg, trace, loop, msPerGlyph, playing]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let cancelled = false;
    let raf = 0;
    elapsedRef.current = 0;
    setReady(false);
    reduceRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceRef.current) {
      playingRef.current = false;
      setPlaying(false);
    }

    const run = async () => {
      const sample = debounced.trim() || "A";
      await document.fonts.load(`${FONT_SIZE}px "${family}"`, sample).catch(() => {});
      if (cancelled) return;
      const measureCtx = document.createElement("canvas").getContext("2d");
      if (!measureCtx) return;
      measureCtx.font = `${FONT_SIZE}px "${family}"`;
      const glyphs = layoutRepeaterText({
        text: debounced,
        maxWidth: MAX_WIDTH,
        startX: START_X,
        firstBaseline: FIRST_BASELINE,
        lineHeight: LINE_HEIGHT,
        measure: (s) => measureCtx.measureText(s).width,
      });
      const height = stageHeight(glyphs);
      snapshotRef.current = { glyphs, family, height };
      if (!cancelled) setReady(glyphs.length > 0);
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      let last = performance.now();

      const tick = (now: number) => {
        if (cancelled) return;
        const delta = Math.min(50, now - last);
        last = now;
        if (playingRef.current) elapsedRef.current += delta;
        const showComplete = reduceRef.current && !playingRef.current && elapsedRef.current === 0;
        const frame = showComplete
          ? { doneCount: glyphs.length, partial: 1, holding: false, finished: true }
          : repeaterFrame(elapsedRef.current, glyphs.length, msRef.current, HOLD_MS, loopRef.current);
        if (canvas.width !== Math.round(STAGE_W * dpr) || canvas.height !== Math.round(height * dpr)) {
          canvas.width = Math.round(STAGE_W * dpr);
          canvas.height = Math.round(height * dpr);
        }
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        paint(ctx, glyphs, frame, family, inkRef.current, bgRef.current, traceRef.current, height);
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    void run();
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
    // 墨色、速度、循环走上面的 ref,不放进依赖:否则每次拨动都会重载字体并把进度清零
  }, [debounced, family]);

  const downloadGif = async () => {
    const { glyphs, family: fam, height } = snapshotRef.current;
    if (!glyphs.length || exporting) return;
    setExporting(true);
    await new Promise((resolve) => setTimeout(resolve, 0));
    try {
      const full = document.createElement("canvas");
      full.width = STAGE_W;
      full.height = height;
      const fullCtx = full.getContext("2d");
      const exportW = 640;
      const exportH = Math.max(1, Math.round(height * (exportW / STAGE_W)));
      const small = document.createElement("canvas");
      small.width = exportW;
      small.height = exportH;
      const smallCtx = small.getContext("2d", { willReadFrequently: true });
      if (!fullCtx || !smallCtx) return;

      const ms = msRef.current;
      const cycle = glyphs.length * ms + HOLD_MS;
      // 索引字节大约卡在 16MB。句子越高,帧越少,整段时长仍被这些帧均分。
      const frameCount = Math.max(8, Math.min(80, Math.floor(16_000_000 / (exportW * exportH))));
      const step = cycle / frameCount;
      const delayCs = Math.max(2, Math.round(step / 10));
      const frames: Uint8Array[] = [];
      for (let i = 0; i < frameCount; i++) {
        const frame = repeaterFrame(i * step, glyphs.length, ms, HOLD_MS, false);
        paint(fullCtx, glyphs, frame, fam, inkRef.current, bgRef.current, traceRef.current, height);
        smallCtx.drawImage(full, 0, 0, exportW, exportH);
        const img = smallCtx.getImageData(0, 0, exportW, exportH);
        const indices = new Uint8Array(exportW * exportH);
        const data = img.data;
        for (let p = 0, q = 0; p < data.length; p += 4, q++) {
          indices[q] = indexRgb332(data[p], data[p + 1], data[p + 2]);
        }
        frames.push(indices);
        if (i % 4 === 3) await new Promise((resolve) => setTimeout(resolve, 0));
      }
      const gif = encodeGif({ width: exportW, height: exportH, frames, palette: palette332(), delayCs });
      const blob = new Blob([gif], { type: "image/gif" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "handwriting-repeater.gif";
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1500);
    } finally {
      setExporting(false);
    }
  };

  const replay = () => {
    elapsedRef.current = 0;
    reduceRef.current = false;
    playingRef.current = true;
    setPlaying(true);
  };

  const presets = [
    { id: "sentence", label: t("presetSentence"), value: t("sampleSentence") },
    { id: "alphabet", label: t("presetAlphabet"), value: t("sampleAlphabet") },
    { id: "numbers", label: t("presetNumbers"), value: t("sampleNumbers") },
  ];

  return (
    <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[300px_auto]">
      <aside className="flex flex-col gap-4 lg:sticky lg:top-20">
        <div className="flex flex-col gap-1.5">
          <span className="field-label">{t("textLabel")}</span>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            {...compositionProps}
            rows={4}
            maxLength={240}
            placeholder={t("textPlaceholder")}
            className="surface-input resize-y p-3 text-sm leading-relaxed"
          />
          <p className="text-xs text-zinc-400">{t("hint")}</p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {presets.map((preset) => (
            <button
              key={preset.id}
              type="button"
              aria-pressed={text === preset.value}
              onClick={() => setText(preset.value)}
              className={`cursor-pointer rounded-lg border px-2.5 py-1.5 text-xs transition-colors ${
                text === preset.value
                  ? "border-accent bg-accent/5 text-accent"
                  : "border-zinc-200 bg-white text-zinc-500 hover:border-zinc-300"
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="field-label">{t("font")}</span>
          <select value={fontId} onChange={(e) => setFontId(e.target.value)} className="select-field">
            {fontOptions.map((f) => (
              <option key={f.id} value={f.id}>
                {primaryFamily(f.css)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="field-label">{t("speed")}</span>
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <span>{t("speedSlow")}</span>
            <input
              type="range"
              min={0}
              max={100}
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="accent-accent flex-1"
              aria-label={t("speed")}
            />
            <span>{t("speedFast")}</span>
          </div>
        </div>

        <ColorSwatch label={t("ink")} value={ink} onChange={setInk} />
        <ColorSwatch label={tool("paperCustom.bg")} value={bg} onChange={setBg} />

        <Switch checked={loop} label={t("loop")} onChange={setLoop} />
        <Switch checked={trace} label={t("trace")} onChange={setTrace} />

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setPlaying((v) => !v)}
            className="btn btn-ghost flex-1 px-4 py-2.5 text-sm"
          >
            {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
            {playing ? t("pause") : t("play")}
          </button>
          <button type="button" onClick={replay} className="btn btn-ghost flex-1 px-4 py-2.5 text-sm">
            <ArrowsCounterClockwise className="size-4" />
            {t("replay")}
          </button>
        </div>

        <button
          type="button"
          onClick={() => void downloadGif()}
          disabled={exporting || !ready}
          className="btn btn-primary w-full px-4 py-2.5 text-sm"
        >
          <DownloadSimple className="size-4" />
          {exporting ? t("downloadGifBusy") : t("downloadGif")}
        </button>
      </aside>

      <div className="overflow-hidden rounded-xl border border-zinc-200 shadow-paper">
        <canvas ref={canvasRef} role="img" aria-label={t("stageLabel")} className="block h-auto w-full" />
      </div>
    </div>
  );
}
