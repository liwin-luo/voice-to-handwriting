import { chromium } from "@playwright/test";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const H = { "Accept-Language": "zh-CN" };
await page.goto("http://localhost:3000/zh", { extraHTTPHeaders: H });
await page.getByPlaceholder(/说话内容会出现在这里/).fill("换一种笔迹,就是换一种人的字。");
await page.waitForTimeout(1000);
// 笔迹 A(当前种子)
await page.locator(".paper").first().screenshot({ path: "/tmp/vth-seed-a.png" });
// 点 3 次换一种笔迹 → 笔迹 B
await page.getByRole("button", { name: "换一种笔迹" }).click();
await page.getByRole("button", { name: "换一种笔迹" }).click();
await page.getByRole("button", { name: "换一种笔迹" }).click();
await page.waitForTimeout(800);
await page.locator(".paper").first().screenshot({ path: "/tmp/vth-seed-b.png" });
await browser.close();
console.log("done");
