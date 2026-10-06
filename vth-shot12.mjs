import { chromium } from "@playwright/test";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const H = { "Accept-Language": "zh-CN" };
await page.goto("http://localhost:3000/zh", { extraHTTPHeaders: H });
await page.waitForTimeout(800);
// 选自定义纸张,调底色和行距
await page.selectOption("aside select >> nth=1", "custom");
await page.locator("label:has-text('纸张底色') input[type=color]").evaluate((el) => { el.value = "#fff7ed"; el.dispatchEvent(new Event("change")); });
await page.locator("label:has-text('格线颜色') input[type=color]").evaluate((el) => { el.value = "#f0abfc"; el.dispatchEvent(new Event("change")); });
await page.waitForTimeout(600);
await page.screenshot({ path: "/tmp/vth-custom-paper.png" });
await browser.close();
console.log("done");
