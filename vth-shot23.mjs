import { chromium } from "@playwright/test";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.goto("http://localhost:3000/zh", { extraHTTPHeaders: { "Accept-Language": "zh-CN" } });
await page.waitForTimeout(800);
// 悬停展开下拉
await page.hover("text=打印工具");
await page.waitForTimeout(400);
await page.screenshot({ path: "/tmp/vth-nav-dropdown.png", clip: { x: 700, y: 0, width: 740, height: 220 } });
// 首页卡片区
await page.locator("section.mt-12").scrollIntoViewIfNeeded();
await page.waitForTimeout(600);
await page.screenshot({ path: "/tmp/vth-home-tools.png" });
await browser.close();
