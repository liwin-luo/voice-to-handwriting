import { chromium } from "@playwright/test";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
const errors = [];
page.on("pageerror", (e) => errors.push("PAGEERROR: " + e.message.slice(0, 200)));
await page.goto("http://localhost:3000/", { extraHTTPHeaders: { "Accept-Language": "zh-CN" } });
const ta = page.getByPlaceholder(/说话内容会出现在这里/);
await ta.click();
// 模拟逐键输入,含多次换行
await ta.pressSequentially("计划;h\njhl'\nytt'vhvkkhk\n", { delay: 40 });
await page.waitForTimeout(1200);
const text = await page.locator(".paper").first().innerText();
console.log("after typing, paper:", JSON.stringify(text));
// 再测试:删掉一半文字后是否仍然正确(编辑已分页文本的场景)
await ta.fill("第一段内容换行\n第二段\n\n第四段");
await page.waitForTimeout(1000);
const text2 = await page.locator(".paper").first().innerText();
console.log("multi-paragraph:", JSON.stringify(text2));
console.log(errors.join("\n") || "no page errors");
await browser.close();
