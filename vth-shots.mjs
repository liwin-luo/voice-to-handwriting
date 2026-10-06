import { chromium } from "@playwright/test";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const H = { "Accept-Language": "zh-CN" };

async function styledShot(url, path, prep) {
  await page.goto(url, { extraHTTPHeaders: H });
  await prep?.();
  await page.waitForTimeout(1200);
  const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  if (bg === "rgba(0, 0, 0, 0)") throw new Error("page unstyled! bg=" + bg);
  await page.screenshot({ path });
  console.log("saved", path);
}

await styledShot("http://localhost:3000/zh", "public/blog/workspace.png", async () => {
  await page.getByPlaceholder(/说话内容会出现在这里/).fill("亲爱的朋友:\n见字如面。这段文字是用声音写成的,选好字体和纸张,一键就能导出成图片或 PDF。");
});
await page.locator("aside").screenshot({ path: "public/blog/style-panel.png" });
await page.locator(".glass-bar").screenshot({ path: "public/blog/toolbar.png" });

await styledShot("http://localhost:3000/zh/templates", "public/blog/templates.png");
await styledShot("http://localhost:3000/zh/templates/love-letter", "public/blog/template-love.png");

await styledShot("http://localhost:3000/zh", "public/blog/pre-export.png", async () => {
  await page.getByPlaceholder(/说话内容会出现在这里/).fill("亲爱的朋友:\n见字如面。这一段会进入本地历史记录,随时可以恢复继续编辑。");
});
await page.getByRole("button", { name: "导出 PNG" }).click();
await page.waitForTimeout(2500);
await styledShot("http://localhost:3000/zh/history", "public/blog/history.png");

await browser.close();
console.log("all shots retaken");
