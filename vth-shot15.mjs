import { chromium } from "@playwright/test";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const H = { "Accept-Language": "zh-CN" };
await page.goto("http://localhost:3000/zh", { extraHTTPHeaders: H });
await page.waitForTimeout(600);
await page.selectOption("aside select >> nth=0", "zcoolkuaile"); // 新字体:站酷快乐体
await page.getByPlaceholder(/说话内容会出现在这里/).fill("站酷快乐体,新字体上场!");
await page.waitForTimeout(1000);
await page.locator("aside").screenshot({ path: "/tmp/vth-fonts-panel.png" });
await page.screenshot({ path: "/tmp/vth-newfont.png" });
await browser.close();
console.log("done");
