"use client";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { FilePdf } from "@phosphor-icons/react";
import { jsPDF } from "jspdf";
import { FONTS } from "@/stores/useEditorStore";
import { useDebouncedImeSafe } from "./useDebouncedImeSafe";
import { fadeInk } from "@/lib/ink";
import ColorSwatch from "./ColorSwatch";
import PracticeLayout from "./PracticeLayout";

const A4: [number, number] = [794, 1123];

type ScriptKind = "zh" | "ja" | "ko";
type GuideStyle = "cross" | "innerbox" | "dot";
type FillMode = "trace" | "dark" | "blank";

function primaryFamily(css: string): string {
  return css.match(/'([^']+)'/)?.[1] ?? "serif";
}

/** CJK 练字表生成器:田字格(中)/ 原稿纸风(日)/ 원고지风(韩),描红模式,导出打印级 PDF */
export default function WritingPracticeGenerator({
  defaultScript = "zh",
}: {
  defaultScript?: ScriptKind;
}) {
  const t = useTranslations("writing");
  const fontNames = useTranslations("tool");
  const [script, setScript] = useState<ScriptKind>(defaultScript);
  const [text, setText] = useState("");
  const [cell, setCell] = useState(84);
  const [ink, setInk] = useState("#2f2f2f");
  const [bg, setBg] = useState("#ffffff");
  const [guide, setGuide] = useState<GuideStyle>("cross");
  const [fillMode, setFillMode] = useState<FillMode>("trace");
  const [fontId, setFontId] = useState("lxgwwenkai");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [w, h] = A4;

  const font = FONTS.find((f) => f.id === fontId) ?? FONTS[0];
  const family = primaryFamily(font.css);
  // 整页 canvas 重绘很重:输入防抖 + 组词期间暂停
  const [drawText, compositionProps] = useDebouncedImeSafe(text);

  // 切脚本时联动默认字体与格线(渲染期调整状态,避免 effect 级联渲染)
  const [prevScript, setPrevScript] = useState(script);
  if (prevScript !== script) {
    setPrevScript(script);
    if (script === "ja") {
      setFontId("kleeone");
      setGuide("innerbox");
    } else if (script === "ko") {
      setFontId("nanumpenscript");
      setGuide("dot");
    } else {
      setFontId("lxgwwenkai");
      setGuide("cross");
    }
  }

  function draw() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    const margin = 40;
    const cols = Math.floor((w - margin * 2) / cell);
    const rows = Math.floor((h - margin * 2) / cell);

    const family = primaryFamily(font.css);
    const fontSize = Math.round(cell * 0.62);
    ctx.font = `${fontSize}px "${family}"`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const chars = [...drawText.replace(/\s/g, "")];
    const fillAll = fillMode !== "blank";
    // 循环铺满整页(练字场景:反复书写)
    let charIdx = 0;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = margin + c * cell;
        const y = margin + r * cell;

        // 外框
        ctx.save();
        ctx.strokeStyle = "#c8d4e2";
        ctx.lineWidth = 1;
        ctx.strokeRect(x + 0.5, y + 0.5, cell - 1, cell - 1);
        ctx.restore();

        // 辅助格线
        ctx.save();
        ctx.strokeStyle = "#d9e2ec";
        ctx.lineWidth = 1;
        if (guide === "cross" && fillMode !== "blank") {
          ctx.setLineDash([4, 4]);
          ctx.beginPath();
          ctx.moveTo(x + cell / 2, y);
          ctx.lineTo(x + cell / 2, y + cell);
          ctx.moveTo(x, y + cell / 2);
          ctx.lineTo(x + cell, y + cell / 2);
          ctx.stroke();
        } else if (guide === "innerbox") {
          const inset = cell * 0.08;
          ctx.strokeRect(x + inset, y + inset, cell - inset * 2, cell - inset * 2);
        } else if (guide === "dot") {
          ctx.beginPath();
          ctx.arc(x + cell / 2, y + cell / 2, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = "#d9e2ec";
          ctx.fill();
        }
        ctx.restore();

        // 字符
        if (fillAll && chars.length) {
          const ch = chars[charIdx % chars.length];
          const isExampleRow = fillMode === "trace" && r === 0;
          if (fillMode === "dark" || isExampleRow) {
            ctx.fillStyle = ink;
          } else {
            ctx.fillStyle = fadeInk(ink, 0.72);
          }
          ctx.fillText(ch, x + cell / 2, y + cell / 2 + fontSize * 0.06);
          charIdx++;
        }
      }
    }
  }

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      // 传入实际文字,确保字体切片按需加载对应字形后再绘制
      await document.fonts.load(`52px "${family}"`, drawText).catch(() => {});
      if (!cancelled) draw();
    };
    void run();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawText, cell, guide, fillMode, fontId, script, ink, bg]);

  const downloadPdf = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const pdf = new jsPDF({ unit: "px", format: [w, h], orientation: "portrait" });
    pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, w, h);
    pdf.save(`writing-practice-${script}.pdf`);
  };

  const scripts: Array<{ id: ScriptKind; label: string }> = [
    { id: "zh", label: t("scriptZh") },
    { id: "ja", label: t("scriptJa") },
    { id: "ko", label: t("scriptKo") },
  ];
  const guides: Array<{ id: GuideStyle; label: string }> = [
    { id: "cross", label: t("guideCross") },
    { id: "innerbox", label: t("guideInnerbox") },
    { id: "dot", label: t("guideDot") },
  ];
  const fills: Array<{ id: FillMode; label: string }> = [
    { id: "trace", label: t("modeTrace") },
    { id: "dark", label: t("modeDark") },
    { id: "blank", label: t("modeBlank") },
  ];

  return (
    <PracticeLayout
      input={
        <>
          <div className="flex flex-col gap-1.5">
            <span className="field-label">{t("scriptLabel")}</span>
            <div className="flex flex-wrap gap-1.5">
              {scripts.map((sc) => (
                <button
                  key={sc.id}
                  onClick={() => setScript(sc.id)}
                  className={`cursor-pointer rounded-lg border px-2.5 py-1.5 text-xs transition-colors ${
                    script === sc.id
                      ? "border-accent bg-accent/5 text-accent"
                      : "border-zinc-200 bg-white text-zinc-500 hover:border-zinc-300"
                  }`}
                >
                  {sc.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="field-label">{t("textLabel")}</span>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              {...compositionProps}
              rows={3}
              placeholder={t("textPlaceholder")}
              className="surface-input resize-y p-3 text-sm leading-relaxed"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="field-label">{t("guideStyle")}</span>
            <div className="flex flex-wrap gap-1.5">
              {guides.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setGuide(g.id)}
                  className={`cursor-pointer rounded-lg border px-2.5 py-1.5 text-xs transition-colors ${
                    guide === g.id
                      ? "border-accent bg-accent/5 text-accent"
                      : "border-zinc-200 bg-white text-zinc-500 hover:border-zinc-300"
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="field-label">{t("fillMode")}</span>
            <div className="flex flex-wrap gap-1.5">
              {fills.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFillMode(f.id)}
                  className={`cursor-pointer rounded-lg border px-2.5 py-1.5 text-xs transition-colors ${
                    fillMode === f.id
                      ? "border-accent bg-accent/5 text-accent"
                      : "border-zinc-200 bg-white text-zinc-500 hover:border-zinc-300"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </>
      }
      download={
        <button onClick={downloadPdf} className="btn btn-primary px-4 py-2.5 text-sm">
          <FilePdf className="size-4" />
          {t("downloadPdf")}
        </button>
      }
      more={
        <>
          <div className="flex flex-col gap-1.5">
            <span className="field-label">{t("font")}</span>
            <select value={fontId} onChange={(e) => setFontId(e.target.value)} className="select-field">
              {FONTS.map((f) => (
                <option key={f.id} value={f.id}>
                  {fontNames(`fonts.${f.id}`)}
                </option>
              ))}
            </select>
          </div>
          <ColorSwatch label={fontNames("ink")} value={ink} onChange={setInk} />
          <ColorSwatch label={fontNames("paperCustom.bg")} value={bg} onChange={setBg} />
          <label className="flex items-center justify-between gap-2 text-sm">
            <span className="text-zinc-700">{t("cellSize")}</span>
            <span className="flex flex-1 items-center gap-2">
              <input type="range" min={64} max={110} value={cell} onChange={(e) => setCell(Number(e.target.value))} className="accent-accent" />
              <span className="font-mono text-xs text-zinc-400">{cell}px</span>
            </span>
          </label>
        </>
      }
      preview={
        <div className="overflow-hidden rounded-xl border border-zinc-200 shadow-paper">
          <canvas ref={canvasRef} className="block h-auto w-full" />
        </div>
      }
    />
  );
}
