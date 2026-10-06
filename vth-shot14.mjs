import { chromium } from "@playwright/test";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const H = { "Accept-Language": "zh-CN" };
await page.goto("http://localhost:3000/zh", { extraHTTPHeaders: H });
await page.waitForTimeout(600);
await page.selectOption("aside select >> nth=1", "custom");
await page.getByPlaceholder(/说话内容会出现在这里/).fill("自定义纸张测试");

// React 受控输入:原生 setter + input/change 事件
const setColor = (label, value) => page.locator(`label:has-text('${label}') input[type=color]`).evaluate((el, v) => {
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set;
  setter.call(el, v);
  el.dispatchEvent(new Event("input", { bubbles: true }));
  el.dispatchEvent(new Event("change", { bubbles: true }));
}, value);
await setColor("纸张底色", "#fff7ed");
await setColor("格线颜色", "#e879f9");
await page.locator("label:has-text('行距') input[type=range]").evaluate((el) => {
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set;
  setter.call(el, "52");
  el.dispatchEvent(new Event("input", { bubbles: true }));
});
await page.waitForTimeout(800);
await page.locator("label:has-text('纸张底色')").scrollIntoViewIfNeeded();
await page.screenshot({ path: "/tmp/vth-custom2.png" });
const bg = await page.locator(".paper").first().evaluate((el) => el.style.background.slice(0, 150));
console.log("paper bg:", bg);
await browser.close();
