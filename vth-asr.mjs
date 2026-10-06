import { chromium } from "@playwright/test";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
const errors = [];
page.on("pageerror", (e) => errors.push("PAGEERROR: " + e.message.slice(0, 300)));
await page.goto("http://localhost:3000/", { extraHTTPHeaders: { "Accept-Language": "zh-CN" } });
// 选择快速模型并上传 wav
await page.selectOption("select[title*='80MB']", "base").catch(() => {});
await page.locator("input[type=file]").setInputFiles("/tmp/vth-tts.wav");
console.log("uploaded, waiting for transcription (model download may take a while)...");
await page.waitForTimeout(10000);
// 打印进度状态
for (let i = 0; i < 30; i++) {
  const status = await page.locator(".glass-bar p.text-xs").allInnerTexts().catch(() => []);
  console.log(new Date().toISOString().slice(11, 19), status.join(" | ") || "(no status)");
  const ta = await page.getByPlaceholder(/说话内容会出现在这里/).inputValue();
  if (ta.trim()) { console.log("RESULT:", ta); break; }
  if (i === 29) console.log("TIMEOUT: no text after 5min");
  await page.waitForTimeout(10000);
}
console.log(errors.join("\n") || "no page errors");
await browser.close();
