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

test("旧语言前缀仍 308 回英文版(/zh 除外,已恢复双语)", async ({ page }) => {
  // 2026-11-08 语种收缩后旧语言前缀整体 308 回英文路径;2026-11-09 恢复 zh,负向断言把它排除在重定向外
  const response = await page.goto("/ja");
  expect(response?.status()).toBe(200); // 跟随重定向后的最终页
  expect(page.url()).not.toContain("/ja");
  await expect(page.getByRole("heading", { name: "Speak or type, and get a handwritten page" })).toBeVisible();
});

test("/zh 首页渲染中文且工具可用", async ({ page }) => {
  const response = await page.goto("/zh");
  expect(response?.status()).toBe(200);
  await expect(page.getByRole("heading", { name: /手写|说话/ }).first()).toBeVisible();
  // 切换器在,切到 en 后路径不带 /zh
  await page.getByRole("combobox", { name: "Language" }).selectOption("en");
  await expect(page).toHaveURL((u) => !u.pathname.startsWith("/zh"));
});

test("/zh/blog 列出有中文正文的文章且语言保持", async ({ page }) => {
  await page.goto("/zh/blog");
  // 28 篇存档文章之一(how-to-write-in-cursive 有 zh 正文)
  await page.getByRole("link", { name: /连笔字|手写/ }).first().click();
  await expect(page).toHaveURL(/\/zh\//); // 点进文章后语言前缀保持
});
