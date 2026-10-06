import { chromium } from "@playwright/test";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
await page.goto("http://localhost:3000/word-work", { extraHTTPHeaders: { "Accept-Language": "en-US" } });
await page.getByPlaceholder(/cat/).fill("apple\nbanana\ncherry\nschool\nfriend");
await page.waitForTimeout(1500);
const pages = await page.locator("img[alt^='page']").count();
console.log("preview pages:", pages);
await page.locator("img[alt='page 1']").scrollIntoViewIfNeeded();
await page.waitForTimeout(400);
await page.screenshot({ path: "/tmp/vth-ww.png" });
// 验证 PDF 下载
const dl = page.waitForEvent("download");
await page.getByRole("button", { name: /Download PDF/ }).click();
console.log("pdf downloaded:", (await dl).suggestedFilename());
await browser.close();
