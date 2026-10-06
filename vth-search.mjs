import { chromium } from "@playwright/test";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
await page.goto("http://localhost:3000/templates", { extraHTTPHeaders: { "Accept-Language": "zh-CN" } });
await page.waitForTimeout(800);
console.log("全部模板卡片数:", await page.locator("a[href^='/templates/']").count());
await page.getByPlaceholder(/搜索场景/).fill("道歉");
await page.waitForTimeout(400);
console.log("搜「道歉」后卡片数:", await page.locator("a[href^='/templates/']").count());
console.log("可见标题:", await page.locator("a[href^='/templates/'] span.text-\\[17px\\]").allInnerTexts());
await page.screenshot({ path: "/tmp/vth-search.png" });
// 空结果
await page.getByPlaceholder(/搜索场景/).fill("xyz不存在");
await page.waitForTimeout(300);
console.log("空结果提示:", await page.locator(".font-hand.text-3xl").innerText());
await page.screenshot({ path: "/tmp/vth-search-empty.png" });
await browser.close();
