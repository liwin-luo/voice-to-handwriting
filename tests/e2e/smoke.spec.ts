import { test, expect } from "@playwright/test";

test("输入文字后渲染手写页并可导出", async ({ page }) => {
  await page.goto("/");
  await page
    .getByPlaceholder(/Your speech appears here/)
    .fill("Hello world, this is a test line.\nSecond line with 123.");
  await expect(page.locator(".paper").first()).toBeVisible();
  await expect(page.locator(".paper [data-idx]").first()).toBeVisible();
  await expect(page.getByRole("button", { name: "Export PNG" })).toBeEnabled();
});

test("旧语言前缀 308 回英文版", async ({ page }) => {
  // 2026-11-08 语种收缩为 en-only,next.config redirects 把 /zh /es 等整体 308 回英文路径
  const response = await page.goto("/zh");
  expect(response?.status()).toBe(200); // 跟随重定向后的最终页
  expect(page.url()).not.toContain("/zh");
  await expect(page.getByRole("heading", { name: "Speak or type, and get a handwritten page" })).toBeVisible();
});
