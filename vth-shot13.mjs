import { chromium } from "@playwright/test";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const H = { "Accept-Language": "zh-CN" };
await page.goto("http://localhost:3000/zh", { extraHTTPHeaders: H });
await page.waitForTimeout(600);
await page.selectOption("aside select >> nth=1", "custom");
// fill 会正确触发 React onChange
await page.locator("label:has-text('纸张底色') input[type=color]").fill("#fff7ed");
await page.locator("label:has-text('格线颜色') input[type=color]").fill("#e879f9");
await page.locator("label:has-text('行距') input[type=range]").fill("52");
await page.getByPlaceholder(/说话内容会出现在这里/).fill("自定义纸张测试");
await page.waitForTimeout(1000);
// 滚动左栏到自定义控件区
await page.locator("label:has-text('纸张底色')").scrollIntoViewIfNeeded();
await page.waitForTimeout(400);
await page.screenshot({ path: "/tmp/vth-custom2.png" });
const bg = await page.locator(".paper").first().evaluate((el) => el.style.background.slice(0, 120));
console.log("paper bg:", bg);
await browser.close();
