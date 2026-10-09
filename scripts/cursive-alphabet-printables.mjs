// 生成可抓取的默认字母表:public/printables/cursive-alphabet.png + .pdf
// 画法和页内「下载 PDF」同一套(src/lib/alphabetSheet.mjs)。默认 Sacramento、笔顺开。
// 改图表标题或画法后重跑:node scripts/cursive-alphabet-printables.mjs
import { createServer } from "node:http";
import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";

// 与 ALPHABET_UI 的 chartTitle / traceTitle / traceNote 保持一致,改文案后重跑本脚本。
const COPY = {
  chartTitle: "Alphabet in Cursive",
  traceTitle: "Trace the cursive alphabet",
  traceNote: "Solid letter, then a dashed copy on the same line.",
};

const root = path.resolve(import.meta.dirname, "..");
const outDir = path.join(root, "public/printables");
const sheetPath = path.join(root, "src/lib/alphabetSheet.mjs");
const fontPath = path.join(root, "fonts-src/Sacramento-Regular.ttf");
const glyphsPath = path.join(root, "src/lib/glyphStarts.generated.ts");

function sacramentoGuide() {
  const src = fs.readFileSync(glyphsPath, "utf8");
  const key = '"sacramento":';
  const start = src.indexOf(key);
  if (start < 0) throw new Error("sacramento glyph data missing");
  let i = start + key.length;
  let depth = 0;
  const from = i;
  for (; i < src.length; i++) {
    if (src[i] === "{") depth++;
    else if (src[i] === "}") {
      depth--;
      if (depth === 0) return JSON.parse(src.slice(from, i + 1));
    }
  }
  throw new Error("sacramento glyph data unclosed");
}

const letters = "abcdefghijklmnopqrstuvwxyz".split("").map((lower) => ({
  capital: lower.toUpperCase(),
  lower,
}));

const payload = {
  w: 816,
  h: 1056,
  family: "Sacramento",
  guides: true,
  letters,
  guide: sacramentoGuide(),
  title: COPY.chartTitle,
  subtitle: "Sacramento · teaching cursive",
  note: COPY.traceNote,
  traceTitle: COPY.traceTitle,
};

const html = `<!doctype html>
<meta charset="utf-8">
<style>
  @page { size: 816px 1056px; margin: 0; }
  html, body { margin: 0; background: #fff; }
  canvas { display: block; page-break-after: always; }
</style>
<canvas id="chart" width="816" height="1056"></canvas>
<canvas id="trace" width="816" height="1056"></canvas>
<script type="module">
  import { paintChart, paintTrace } from "/sheet.mjs";
  const opts = JSON.parse(document.getElementById("data").textContent);
  const face = new FontFace("Sacramento", "url(/font.ttf)");
  await face.load();
  document.fonts.add(face);
  paintChart(document.getElementById("chart").getContext("2d"), opts);
  paintTrace(document.getElementById("trace").getContext("2d"), { ...opts, title: opts.traceTitle });
  document.body.dataset.ready = "1";
</script>
<script type="application/json" id="data">${JSON.stringify(payload)}</script>`;

function startServer() {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      if (req.url === "/sheet.mjs") {
        res.setHeader("content-type", "text/javascript");
        res.end(fs.readFileSync(sheetPath));
        return;
      }
      if (req.url === "/font.ttf") {
        res.setHeader("content-type", "font/ttf");
        res.end(fs.readFileSync(fontPath));
        return;
      }
      res.setHeader("content-type", "text/html");
      res.end(html);
    });
    server.listen(0, "127.0.0.1", () => resolve(server));
  });
}

const server = await startServer();
const { port } = server.address();
fs.mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch({ channel: "chrome" });
try {
  const page = await browser.newPage({ viewport: { width: 816, height: 1056 } });
  await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: "networkidle" });
  await page.waitForSelector("body[data-ready]");
  await page.locator("#chart").screenshot({ path: path.join(outDir, "cursive-alphabet.png") });
  await page.pdf({
    path: path.join(outDir, "cursive-alphabet.pdf"),
    width: "816px",
    height: "1056px",
    printBackground: true,
    preferCSSPageSize: true,
  });
} finally {
  await browser.close();
  server.close();
}
console.log("wrote public/printables/cursive-alphabet.png and .pdf");
