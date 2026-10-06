import { chromium } from "@playwright/test";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
// 1. 首页输入文字并导出 → 触发快照
await page.goto("http://localhost:3000/", { extraHTTPHeaders: { "Accept-Language": "zh-CN" } });
await page.getByPlaceholder(/说话内容会出现在这里/).fill("亲爱的朋友:\n见字如面。这一段会进入本地历史记录。");
await page.waitForTimeout(1200);
await page.getByRole("button", { name: "导出 PNG" }).click();
await page.waitForTimeout(2500);
// 2. 进历史页
await page.goto("http://localhost:3000/history");
await page.waitForTimeout(1000);
await page.screenshot({ path: "/tmp/vth-history.png" });
// 3. 点恢复 → 回首页且文字还原
await page.getByRole("button", { name: "恢复编辑" }).first().click();
await page.waitForTimeout(1000);
console.log("url after restore:", page.url());
console.log("restored text:", JSON.stringify(await page.getByPlaceholder(/说话内容会出现在这里/).inputValue()));
await browser.close();
