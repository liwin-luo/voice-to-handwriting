"use client";
import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { FilePdf, DownloadSimple } from "@phosphor-icons/react";
import { jsPDF } from "jspdf";
import { FONTS } from "@/stores/useEditorStore";
import { useDebouncedImeSafe } from "./useDebouncedImeSafe";
import { coloringFontId, fontOrder, PAGE_FORMATS, type PageFormat } from "@/lib/localeDefaults";
import PageFormatToggle from "./PageFormatToggle";
import PracticeLayout from "./PracticeLayout";
import WatermarkSwitch from "./WatermarkSwitch";

function primaryFamily(css: string): string {
  return css.match(/'([^']+)'/)?.[1] ?? "cursive";
}

function drawStar(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) {
  ctx.save();
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    const angle = (Math.PI / 2) * -1 + (i * 2 * Math.PI) / 5;
    const inner = angle + Math.PI / 5;
    ctx.lineTo(cx + r * Math.cos(angle), cy - r * Math.sin(angle));
    ctx.lineTo(cx + (r * 0.45) * Math.cos(inner), cy - (r * 0.45) * Math.sin(inner));
  }
  ctx.closePath();
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#18181b";
  ctx.stroke();
  ctx.restore();
}

function drawHeart(ctx: CanvasRenderingContext2D, cx: number, cy: number, s: number) {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(cx, cy + s * 0.35);
  ctx.bezierCurveTo(cx - s, cy - s * 0.45, cx - s * 0.4, cy - s, cx, cy - s * 0.3);
  ctx.bezierCurveTo(cx + s * 0.4, cy - s, cx + s, cy - s * 0.45, cx, cy + s * 0.35);
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#18181b";
  ctx.stroke();
  ctx.restore();
}

function drawSparkle(ctx: CanvasRenderingContext2D, cx: number, cy: number, s: number) {
  outline(ctx, () => {
    ctx.moveTo(cx, cy - s);
    ctx.quadraticCurveTo(cx, cy, cx + s, cy);
    ctx.quadraticCurveTo(cx, cy, cx, cy + s);
    ctx.quadraticCurveTo(cx, cy, cx - s, cy);
    ctx.quadraticCurveTo(cx, cy, cx, cy - s);
    ctx.closePath();
  });
}

type Shape = (ctx: CanvasRenderingContext2D, cx: number, cy: number, s: number) => void;

function pen(ctx: CanvasRenderingContext2D) {
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#18181b";
  ctx.fillStyle = "#18181b";
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
}

function outline(ctx: CanvasRenderingContext2D, run: () => void) {
  ctx.beginPath();
  run();
  ctx.stroke();
}

function dot(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}

function drawCat(ctx: CanvasRenderingContext2D, cx: number, cy: number, s: number) {
  ctx.save();
  pen(ctx);
  outline(ctx, () => ctx.arc(cx, cy + s * 0.08, s * 0.62, 0, Math.PI * 2));
  outline(ctx, () => {
    ctx.moveTo(cx - s * 0.42, cy - s * 0.38);
    ctx.lineTo(cx - s * 0.72, cy - s * 1.05);
    ctx.lineTo(cx - s * 0.08, cy - s * 0.48);
    ctx.moveTo(cx + s * 0.42, cy - s * 0.38);
    ctx.lineTo(cx + s * 0.72, cy - s * 1.05);
    ctx.lineTo(cx + s * 0.08, cy - s * 0.48);
  });
  dot(ctx, cx - s * 0.22, cy - s * 0.02, s * 0.06);
  dot(ctx, cx + s * 0.22, cy - s * 0.02, s * 0.06);
  outline(ctx, () => {
    ctx.moveTo(cx, cy + s * 0.12);
    ctx.lineTo(cx - s * 0.08, cy + s * 0.24);
    ctx.lineTo(cx + s * 0.08, cy + s * 0.24);
    ctx.closePath();
    ctx.moveTo(cx, cy + s * 0.24);
    ctx.quadraticCurveTo(cx - s * 0.14, cy + s * 0.4, cx - s * 0.24, cy + s * 0.3);
    ctx.moveTo(cx, cy + s * 0.24);
    ctx.quadraticCurveTo(cx + s * 0.14, cy + s * 0.4, cx + s * 0.24, cy + s * 0.3);
    ctx.moveTo(cx - s * 0.18, cy + s * 0.22);
    ctx.lineTo(cx - s * 0.62, cy + s * 0.1);
    ctx.moveTo(cx - s * 0.18, cy + s * 0.32);
    ctx.lineTo(cx - s * 0.62, cy + s * 0.36);
    ctx.moveTo(cx + s * 0.18, cy + s * 0.22);
    ctx.lineTo(cx + s * 0.62, cy + s * 0.1);
    ctx.moveTo(cx + s * 0.18, cy + s * 0.32);
    ctx.lineTo(cx + s * 0.62, cy + s * 0.36);
  });
  ctx.restore();
}

function drawFish(ctx: CanvasRenderingContext2D, cx: number, cy: number, s: number) {
  ctx.save();
  pen(ctx);
  outline(ctx, () => ctx.ellipse(cx - s * 0.08, cy, s * 0.62, s * 0.38, 0, 0, Math.PI * 2));
  outline(ctx, () => {
    ctx.moveTo(cx + s * 0.42, cy);
    ctx.lineTo(cx + s * 0.98, cy - s * 0.4);
    ctx.lineTo(cx + s * 0.98, cy + s * 0.4);
    ctx.closePath();
  });
  outline(ctx, () => {
    ctx.moveTo(cx - s * 0.2, cy - s * 0.28);
    ctx.quadraticCurveTo(cx, cy - s * 0.68, cx + s * 0.22, cy - s * 0.22);
  });
  dot(ctx, cx - s * 0.34, cy - s * 0.04, s * 0.055);
  ctx.restore();
}

function drawBird(ctx: CanvasRenderingContext2D, cx: number, cy: number, s: number) {
  ctx.save();
  pen(ctx);
  outline(ctx, () => ctx.ellipse(cx - s * 0.12, cy + s * 0.08, s * 0.52, s * 0.4, 0, 0, Math.PI * 2));
  outline(ctx, () => ctx.arc(cx + s * 0.36, cy - s * 0.28, s * 0.3, 0, Math.PI * 2));
  outline(ctx, () => {
    ctx.moveTo(cx + s * 0.62, cy - s * 0.32);
    ctx.lineTo(cx + s * 0.98, cy - s * 0.16);
    ctx.lineTo(cx + s * 0.62, cy - s * 0.06);
    ctx.closePath();
  });
  outline(ctx, () => ctx.ellipse(cx - s * 0.14, cy + s * 0.05, s * 0.26, s * 0.15, -0.5, 0, Math.PI * 2));
  dot(ctx, cx + s * 0.44, cy - s * 0.34, s * 0.045);
  outline(ctx, () => {
    ctx.moveTo(cx - s * 0.18, cy + s * 0.46);
    ctx.lineTo(cx - s * 0.24, cy + s * 0.7);
    ctx.moveTo(cx - s * 0.36, cy + s * 0.7);
    ctx.lineTo(cx - s * 0.08, cy + s * 0.7);
    ctx.moveTo(cx + s * 0.1, cy + s * 0.44);
    ctx.lineTo(cx + s * 0.14, cy + s * 0.7);
    ctx.moveTo(cx, cy + s * 0.7);
    ctx.lineTo(cx + s * 0.28, cy + s * 0.7);
  });
  ctx.restore();
}

function drawButterfly(ctx: CanvasRenderingContext2D, cx: number, cy: number, s: number) {
  ctx.save();
  pen(ctx);
  outline(ctx, () => ctx.ellipse(cx - s * 0.4, cy - s * 0.26, s * 0.38, s * 0.3, -0.45, 0, Math.PI * 2));
  outline(ctx, () => ctx.ellipse(cx + s * 0.4, cy - s * 0.26, s * 0.38, s * 0.3, 0.45, 0, Math.PI * 2));
  outline(ctx, () => ctx.ellipse(cx - s * 0.36, cy + s * 0.3, s * 0.3, s * 0.26, 0.4, 0, Math.PI * 2));
  outline(ctx, () => ctx.ellipse(cx + s * 0.36, cy + s * 0.3, s * 0.3, s * 0.26, -0.4, 0, Math.PI * 2));
  outline(ctx, () => ctx.ellipse(cx, cy + s * 0.05, s * 0.09, s * 0.46, 0, 0, Math.PI * 2));
  outline(ctx, () => {
    ctx.moveTo(cx - s * 0.03, cy - s * 0.38);
    ctx.quadraticCurveTo(cx - s * 0.18, cy - s * 0.72, cx - s * 0.36, cy - s * 0.66);
    ctx.moveTo(cx + s * 0.03, cy - s * 0.38);
    ctx.quadraticCurveTo(cx + s * 0.18, cy - s * 0.72, cx + s * 0.36, cy - s * 0.66);
  });
  dot(ctx, cx - s * 0.36, cy - s * 0.66, s * 0.045);
  dot(ctx, cx + s * 0.36, cy - s * 0.66, s * 0.045);
  ctx.restore();
}

function drawCar(ctx: CanvasRenderingContext2D, cx: number, cy: number, s: number) {
  ctx.save();
  pen(ctx);
  outline(ctx, () => {
    ctx.moveTo(cx - s, cy + s * 0.42);
    ctx.lineTo(cx - s, cy - s * 0.05);
    ctx.quadraticCurveTo(cx - s, cy - s * 0.22, cx - s * 0.78, cy - s * 0.22);
    ctx.lineTo(cx - s * 0.32, cy - s * 0.22);
    ctx.lineTo(cx - s * 0.12, cy - s * 0.58);
    ctx.lineTo(cx + s * 0.42, cy - s * 0.58);
    ctx.lineTo(cx + s * 0.64, cy - s * 0.22);
    ctx.lineTo(cx + s * 0.82, cy - s * 0.22);
    ctx.quadraticCurveTo(cx + s, cy - s * 0.22, cx + s, cy - s * 0.05);
    ctx.lineTo(cx + s, cy + s * 0.42);
    ctx.closePath();
  });
  outline(ctx, () => {
    ctx.moveTo(cx - s * 0.08, cy - s * 0.46);
    ctx.lineTo(cx - s * 0.22, cy - s * 0.22);
    ctx.lineTo(cx + s * 0.36, cy - s * 0.22);
    ctx.lineTo(cx + s * 0.2, cy - s * 0.46);
    ctx.closePath();
  });
  outline(ctx, () => ctx.arc(cx - s * 0.52, cy + s * 0.42, s * 0.2, 0, Math.PI * 2));
  outline(ctx, () => ctx.arc(cx + s * 0.55, cy + s * 0.42, s * 0.2, 0, Math.PI * 2));
  ctx.restore();
}

function drawRocket(ctx: CanvasRenderingContext2D, cx: number, cy: number, s: number) {
  ctx.save();
  pen(ctx);
  outline(ctx, () => {
    ctx.moveTo(cx - s * 0.3, cy + s * 0.38);
    ctx.lineTo(cx - s * 0.3, cy - s * 0.15);
    ctx.lineTo(cx, cy - s * 0.92);
    ctx.lineTo(cx + s * 0.3, cy - s * 0.15);
    ctx.lineTo(cx + s * 0.3, cy + s * 0.38);
    ctx.closePath();
  });
  outline(ctx, () => ctx.arc(cx, cy - s * 0.05, s * 0.13, 0, Math.PI * 2));
  outline(ctx, () => {
    ctx.moveTo(cx - s * 0.3, cy + s * 0.08);
    ctx.lineTo(cx - s * 0.58, cy + s * 0.5);
    ctx.lineTo(cx - s * 0.3, cy + s * 0.38);
    ctx.moveTo(cx + s * 0.3, cy + s * 0.08);
    ctx.lineTo(cx + s * 0.58, cy + s * 0.5);
    ctx.lineTo(cx + s * 0.3, cy + s * 0.38);
  });
  outline(ctx, () => {
    ctx.moveTo(cx - s * 0.14, cy + s * 0.38);
    ctx.lineTo(cx, cy + s * 0.78);
    ctx.lineTo(cx + s * 0.14, cy + s * 0.38);
  });
  ctx.restore();
}

function drawPlane(ctx: CanvasRenderingContext2D, cx: number, cy: number, s: number) {
  ctx.save();
  pen(ctx);
  outline(ctx, () => {
    ctx.moveTo(cx + s * 0.95, cy);
    ctx.lineTo(cx - s * 0.15, cy - s * 0.16);
    ctx.lineTo(cx - s * 0.72, cy - s * 0.12);
    ctx.lineTo(cx - s * 0.95, cy - s * 0.42);
    ctx.lineTo(cx - s * 0.72, cy);
    ctx.lineTo(cx - s * 0.95, cy + s * 0.42);
    ctx.lineTo(cx - s * 0.72, cy + s * 0.12);
    ctx.lineTo(cx - s * 0.15, cy + s * 0.16);
    ctx.closePath();
  });
  outline(ctx, () => {
    ctx.moveTo(cx + s * 0.05, cy - s * 0.1);
    ctx.lineTo(cx - s * 0.15, cy - s * 0.72);
    ctx.lineTo(cx + s * 0.28, cy - s * 0.62);
    ctx.lineTo(cx + s * 0.22, cy - s * 0.08);
    ctx.moveTo(cx + s * 0.05, cy + s * 0.1);
    ctx.lineTo(cx - s * 0.15, cy + s * 0.72);
    ctx.lineTo(cx + s * 0.28, cy + s * 0.62);
    ctx.lineTo(cx + s * 0.22, cy + s * 0.08);
  });
  dot(ctx, cx + s * 0.48, cy, s * 0.045);
  ctx.restore();
}

function drawRobot(ctx: CanvasRenderingContext2D, cx: number, cy: number, s: number) {
  ctx.save();
  pen(ctx);
  outline(ctx, () => {
    ctx.moveTo(cx, cy - s * 0.52);
    ctx.lineTo(cx, cy - s * 0.78);
  });
  dot(ctx, cx, cy - s * 0.84, s * 0.06);
  outline(ctx, () => ctx.roundRect(cx - s * 0.4, cy - s * 0.52, s * 0.8, s * 0.48, s * 0.08));
  outline(ctx, () => ctx.arc(cx - s * 0.15, cy - s * 0.3, s * 0.07, 0, Math.PI * 2));
  outline(ctx, () => ctx.arc(cx + s * 0.15, cy - s * 0.3, s * 0.07, 0, Math.PI * 2));
  outline(ctx, () => {
    ctx.moveTo(cx - s * 0.14, cy - s * 0.16);
    ctx.quadraticCurveTo(cx, cy - s * 0.04, cx + s * 0.14, cy - s * 0.16);
  });
  outline(ctx, () => ctx.roundRect(cx - s * 0.34, cy + s * 0.02, s * 0.68, s * 0.46, s * 0.06));
  outline(ctx, () => ctx.roundRect(cx - s * 0.58, cy + s * 0.08, s * 0.18, s * 0.34, s * 0.06));
  outline(ctx, () => ctx.roundRect(cx + s * 0.4, cy + s * 0.08, s * 0.18, s * 0.34, s * 0.06));
  outline(ctx, () => ctx.roundRect(cx - s * 0.24, cy + s * 0.48, s * 0.16, s * 0.28, s * 0.05));
  outline(ctx, () => ctx.roundRect(cx + s * 0.08, cy + s * 0.48, s * 0.16, s * 0.28, s * 0.05));
  ctx.restore();
}

const MOTIFS = ["stars", "animals", "machines", "none"] as const;
type Motif = (typeof MOTIFS)[number];
const MOTIF_LABEL: Record<Motif, "templateStars" | "templateAnimals" | "templateMachines" | "templateNone"> = {
  stars: "templateStars",
  animals: "templateAnimals",
  machines: "templateMachines",
  none: "templateNone",
};

const MOTIF_SHAPES: Record<Exclude<Motif, "none">, Shape[]> = {
  stars: [drawStar, drawHeart, drawSparkle],
  animals: [drawCat, drawFish, drawBird, drawButterfly],
  machines: [drawCar, drawRocket, drawPlane, drawRobot],
};

/** 名字涂色页生成器:轮廓大字 + 装饰图案,打印给娃涂色 */
export default function NameColoringGenerator({
  defaultFormat,
  defaultFontId,
}: {
  defaultFormat: PageFormat;
  defaultFontId?: string;
}) {
  const t = useTranslations("coloring");
  const fontNames = useTranslations("tool");
  const watermarkLabel = useTranslations("home")("watermarkLabel");
  const locale = useLocale();
  const [namesText, setNamesText] = useState("");
  const [fontId, setFontId] = useState(defaultFontId ?? coloringFontId(locale));
  const [format, setFormat] = useState<PageFormat>(defaultFormat);
  const fontOptions = fontOrder(locale).map((id) => FONTS.find((f) => f.id === id)!);
  const [outline, setOutline] = useState(10); // 描边宽度
  const [motif, setMotif] = useState<Motif>("stars");
  const [watermark, setWatermark] = useState(true);
  const [pageUrls, setPageUrls] = useState<string[]>([]);
  const font = FONTS.find((f) => f.id === fontId) ?? FONTS[0];
  const family = primaryFamily(font.css);
  const { w, h } = PAGE_FORMATS[format];

  const [debouncedText, compositionProps] = useDebouncedImeSafe(namesText);

  // useMemo 稳定引用,避免每次按键都触发重绘 effect
  const sampleName = t("namesPlaceholder").split("\n").map((l) => l.trim()).filter(Boolean)[0] ?? "";
  const names = useMemo(() => {
    const lines = debouncedText.split("\n").map((l) => l.trim()).filter(Boolean);
    return lines.length ? lines : sampleName ? [sampleName] : [];
  }, [debouncedText, sampleName]);

  function drawDecorations(ctx: CanvasRenderingContext2D) {
    if (motif === "none") return;
    const shapes = MOTIF_SHAPES[motif];
    // 星星小,可以铺 6 处;动物和机器更大,只放四角,避免互相叠住
    const spots: Array<[number, number, number]> =
      motif === "stars"
        ? [
            [110, 150, 34],
            [w - 110, 130, 28],
            [90, h - 200, 26],
            [w - 90, h - 170, 32],
            [w / 2 - 260, h - 140, 24],
            [w / 2 + 240, h - 150, 26],
          ]
        : [
            [130, 175, 40],
            [w - 140, 165, 36],
            [130, h - 200, 36],
            [w - 140, h - 190, 40],
          ];
    spots.forEach(([x, y, s], i) => shapes[i % shapes.length](ctx, x, y, s));
  }

  function drawPage(name: string): string {
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);
    drawDecorations(ctx);

    // 字号自适应:名字缩放到页宽 82% 以内
    let fontSize = 300;
    ctx.font = `${fontSize}px "${family}"`;
    const measured = ctx.measureText(name).width;
    if (measured > w * 0.82) fontSize = Math.floor(fontSize * ((w * 0.82) / measured));
    ctx.font = `${fontSize}px "${family}"`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const cx = w / 2;
    const cy = h / 2;
    // 白色填充(遮挡装饰)+ 深色粗描边 = 可涂色的气泡字
    ctx.lineWidth = outline;
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#18181b";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(name, cx, cy);
    ctx.strokeText(name, cx, cy);
    // 内侧虚线:涂色边界引导
    ctx.save();
    ctx.lineWidth = 2;
    ctx.setLineDash([10, 8]);
    ctx.strokeStyle = "#b8b8b8";
    ctx.fillText(name, cx, cy);
    ctx.restore();

    if (watermark) {
      ctx.fillStyle = "#a1a1aa";
      ctx.font = "20px sans-serif";
      ctx.fillText(watermarkLabel, w / 2, h - 50);
    }
    return canvas.toDataURL("image/png");
  }

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      if (!names.length) {
        setPageUrls([]);
        return;
      }
      const urls: string[] = [];
      for (const name of names) {
        // 传入实际文字,确保 cn-font-split 切片按需加载对应字符的字形
        await document.fonts.load(`200px "${family}"`, name).catch(() => {});
        if (cancelled) return;
        urls.push(drawPage(name));
        // 逐页让出主线程,多页时不至于一次长任务卡住交互
        await new Promise((r) => setTimeout(r, 0));
        if (cancelled) return;
      }
      if (!cancelled) setPageUrls(urls);
    };
    void run();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [names, fontId, outline, motif, format, watermark, watermarkLabel]);

  const downloadPng = () => {
    pageUrls.forEach((u, i) => {
      const a = document.createElement("a");
      a.href = u;
      a.download = `coloring-${i + 1}.png`;
      a.click();
    });
  };

  const downloadPdf = () => {
    if (!pageUrls.length) return;
    const pdf = new jsPDF({ unit: "px", format: [w, h], orientation: "portrait" });
    pageUrls.forEach((u, i) => {
      if (i > 0) pdf.addPage([w, h], "portrait");
      pdf.addImage(u, "PNG", 0, 0, w, h);
    });
    pdf.save("name-coloring-pages.pdf");
  };

  return (
    <PracticeLayout
      input={
        <div className="flex flex-col gap-1.5">
          <span className="field-label">{t("namesLabel")}</span>
          <textarea
            value={namesText}
            onChange={(e) => setNamesText(e.target.value)}
            {...compositionProps}
            rows={4}
            placeholder={t("namesPlaceholder")}
            className="surface-input resize-y p-3 text-sm leading-relaxed"
          />
        </div>
      }
      download={
        <div className="flex flex-col gap-1.5">
          <WatermarkSwitch on={watermark} onChange={setWatermark} />
          <button onClick={downloadPng} disabled={!pageUrls.length} className="btn btn-primary px-4 py-2.5 text-sm disabled:opacity-40">
            <DownloadSimple className="size-4" />
            {t("downloadPng")}
          </button>
          <button onClick={downloadPdf} disabled={!pageUrls.length} className="btn btn-ghost px-4 py-2.5 text-sm disabled:opacity-40">
            <FilePdf className="size-4 text-zinc-500" />
            {t("downloadPdf")}
          </button>
        </div>
      }
      more={
        <>
          <div className="flex flex-col gap-1.5">
            <span className="field-label">{t("font")}</span>
            <select value={fontId} onChange={(e) => setFontId(e.target.value)} className="select-field">
              {fontOptions.map((f) => (
                <option key={f.id} value={f.id}>
                  {fontNames(`fonts.${f.id}`)}
                </option>
              ))}
            </select>
          </div>
          <label className="flex items-center justify-between gap-2 text-sm">
            <span className="text-zinc-700">{t("outlineWidth")}</span>
            <span className="flex flex-1 items-center gap-2">
              <input type="range" min={4} max={22} value={outline} onChange={(e) => setOutline(Number(e.target.value))} className="accent-accent" />
              <span className="font-mono text-xs text-zinc-400">{outline}px</span>
            </span>
          </label>
          <div className="flex flex-col gap-1.5">
            <span className="field-label">{t("template")}</span>
            <div className="grid grid-cols-2 gap-1.5">
              {MOTIFS.map((id) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={motif === id}
                  onClick={() => setMotif(id)}
                  className={`cursor-pointer rounded-lg border px-2.5 py-1.5 text-xs transition-colors ${
                    motif === id
                      ? "border-accent bg-accent/5 text-accent"
                      : "border-zinc-200 bg-white text-zinc-500 hover:border-zinc-300"
                  }`}
                >
                  {t(MOTIF_LABEL[id])}
                </button>
              ))}
            </div>
          </div>
          <PageFormatToggle value={format} onChange={setFormat} />
        </>
      }
      preview={
        <div className="flex flex-col gap-6">
          {pageUrls.map((u, i) => (
            <div key={i} className="overflow-hidden rounded-xl border border-zinc-200 shadow-paper">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={u} alt={`coloring page ${i + 1}`} className="block h-auto w-full" />
            </div>
          ))}
          {pageUrls.length === 0 && (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-zinc-300 py-24">
              <p className="font-hand text-3xl text-zinc-300">{t("emptyTitle")}</p>
              <p className="text-sm text-zinc-400">{t("emptyHint")}</p>
            </div>
          )}
        </div>
      }
    />
  );
}
