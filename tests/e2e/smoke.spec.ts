import { test, expect } from "@playwright/test";

test("输入文字后渲染手写页并可导出", async ({ page }) => {
  await page.goto("/");
  await page
    .getByPlaceholder(/说话内容会出现在这里/)
    .fill("你好世界,这是一段测试文字。\n第二行内容 hello world 123。");
  await expect(page.locator(".paper").first()).toBeVisible();
  await expect(page.locator(".paper [data-idx]").first()).toBeVisible();
  await expect(page.getByRole("button", { name: "导出 PNG" })).toBeEnabled();
});
