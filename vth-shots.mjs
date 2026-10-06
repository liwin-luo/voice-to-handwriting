import { chromium } from "@playwright/test";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const H = { "Accept-Language": "zh-CN" };

// 1. 工作台(有内容 + 手写渲染)
await page.goto("http://localhost:3000/", { extraHTTPHeaders: H });
await page.getByPlaceholder(/说话内容会出现在这里/).fill("亲爱的朋友:\n见字如面。这段文字是用声音写成的,选好字体和纸张,一键就能导出成图片或 PDF。");
await page.waitForTimeout(1500);
await page.screenshot({ path: "public/blog/workspace.png" });

// 2. 样式面板细节(仿真度/纸张区域裁剪)
await page.locator("aside").screenshot({ path: "public/blog/style-panel.png" });

// 3. 底部工具栏(说话 + 导入音频 + 导出)
await page.locator(".glass-bar").screenshot({ path: "public/blog/toolbar.png" });

// 4. 模板索引
await page.goto("http://localhost:3000/templates", { extraHTTPHeaders: H });
await page.waitForTimeout(900);
await page.screenshot({ path: "public/blog/templates.png" });

// 5. 模板详情(情书)
await page.goto("http://localhost:3000/templates/love-letter", { extraHTTPHeaders: H });
await page.waitForTimeout(900);
await page.screenshot({ path: "public/blog/template-love.png" });

// 6. 历史页(先造一条记录)
await page.goto("http://localhost:3000/", { extraHTTPHeaders: H });
await page.getByRole("button", { name: "导出 PNG" }).click();
await page.waitForTimeout(2000);
await page.goto("http://localhost:3000/history", { extraHTTPHeaders: H });
await page.waitForTimeout(900);
await page.screenshot({ path: "public/blog/history.png" });

await browser.close();
console.log("shots done");
