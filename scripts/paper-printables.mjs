// 生成可抓取的 US Letter PDF：public/printables/<slug>.pdf
// 画法与页内预览同一套（src/lib/paperSheet.mjs）。改行距或画法后重跑：
// node scripts/paper-printables.mjs
import fs from "node:fs";
import path from "node:path";
import { jsPDF } from "jspdf";
import { LINE_COLOR, LABEL_COLOR, MARGIN_COLOR, paperOps, spacingFor } from "../src/lib/paperSheet.mjs";

const root = path.resolve(import.meta.dirname, "..");
const outDir = path.join(root, "public/printables");
const w = 816;
const h = 1056;

const SHEETS = [
  { slug: "college-ruled", type: "college" },
  { slug: "narrow-ruled", type: "narrow" },
  { slug: "wide-ruled", type: "wide" },
  { slug: "large-print", type: "large" },
  { slug: "kindergarten", type: "handwriting" },
  { slug: "graph-paper", type: "graph" },
  { slug: "dot-grid", type: "dots" },
  { slug: "story-paper", type: "story" },
  { slug: "cornell-notes", type: "cornell" },
];

const LABELS = { picture: "Picture", cues: "Cues", notes: "Notes", summary: "Summary" };

function rgb(hex) {
  const n = Number.parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function blend(hex, alpha) {
  return rgb(hex).map((c) => Math.round(c * alpha + 255 * (1 - alpha)));
}

function writeSheet(slug, type) {
  const doc = new jsPDF({ unit: "px", format: [w, h], orientation: "portrait" });
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, w, h, "F");
  const ops = paperOps({
    type,
    w,
    h,
    spacing: spacingFor(type),
    showMargin: true,
    labels: LABELS,
  });
  for (const op of ops) {
    if (op.op === "line" || op.op === "rect") {
      const hex = op.color === "margin" ? MARGIN_COLOR : LINE_COLOR;
      const [r, g, b] = blend(hex, op.alpha ?? 1);
      doc.setDrawColor(r, g, b);
      doc.setLineWidth(op.width ?? 1);
      doc.setLineDashPattern(op.dashed ? [9, 7] : [], 0);
      if (op.op === "line") doc.line(op.x1, op.y1, op.x2, op.y2);
      else doc.rect(op.x, op.y, op.w, op.h);
    } else if (op.op === "dot") {
      const [r, g, b] = rgb(LINE_COLOR);
      doc.setFillColor(r, g, b);
      doc.circle(op.x, op.y, op.r, "F");
    } else if (op.op === "text") {
      const [r, g, b] = rgb(LABEL_COLOR);
      doc.setTextColor(r, g, b);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(16);
      doc.text(op.text, op.x, op.y);
    }
  }
  fs.writeFileSync(path.join(outDir, `${slug}.pdf`), Buffer.from(doc.output("arraybuffer")));
}

fs.mkdirSync(outDir, { recursive: true });
for (const sheet of SHEETS) writeSheet(sheet.slug, sheet.type);
console.log(`wrote ${SHEETS.length} pdfs to ${outDir}`);
