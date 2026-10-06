import { chromium } from "@playwright/test";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
// 1. /cursive 落地页
await page.goto("http://localhost:3000/cursive", { extraHTTPHeaders: { "Accept-Language": "en-US" } });
await page.waitForTimeout(1500);
await page.screenshot({ path: "/tmp/vth-cursive.png" });
// 2. 预览弹窗 + Pinterest 按钮与导出验证
await page.getByPlaceholder(/Your speech appears here/).fill("Cursive practice, made in the browser.");
await page.waitForTimeout(800);
await page.getByRole("button", { name: "Preview" }).click();
await page.waitForTimeout(2500);
const pinBtn = page.getByRole("button", { name: /Pinterest pin/i });
console.log("pin button visible:", await pinBtn.isVisible());
const downloadPromise = page.waitForEvent("download");
await pinBtn.click();
const dl = await downloadPromise;
console.log("pin downloaded:", dl.suggestedFilename());
await browser.close();
