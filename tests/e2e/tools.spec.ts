import { test, expect } from "@playwright/test";

test.describe("英文版", () => {
  test.use({ locale: "en" });

  test("/tools 聚合页:三组分类 + 全部工具卡片", async ({ page }) => {
    await page.goto("/tools");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("All free handwriting tools");
    await expect(page.getByRole("heading", { name: "Write & generate" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Practice sheets & printing" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Just for fun" })).toBeVisible();
    // 14 个工具卡都在(3 写字 + 9 练习 + 2 趣味)
    await expect(page.getByRole("main").getByRole("link")).toHaveCount(14);
    await expect(page.getByRole("main").getByRole("link", { name: "Handwriting Quiz" })).toBeVisible();
  });

  test("导航分组下拉:三组标签 + 可跳转", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "All tools" }).click();
    await expect(page.getByText("Write & generate")).toBeVisible();
    await expect(page.getByText("Just for fun")).toBeVisible();
    await page.getByRole("menuitem", { name: "Handwriting Quiz" }).click();
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Handwriting Personality Test");
  });

  test("首页含全部工具入口", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Browse all free tools" }).click();
    await expect(page.getByRole("heading", { level: 1 })).toContainText("All free handwriting tools");
  });
});

test.describe("中文版", () => {
  test.use({ locale: "zh-CN" });

  test("/zh/tools 中文渲染", async ({ page }) => {
    await page.goto("/zh/tools");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("全部免费手写工具");
    await expect(page.getByRole("heading", { name: "写字与生成" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "趣味" })).toBeVisible();
    await expect(page.getByRole("main").getByRole("link", { name: "笔迹测验" })).toBeVisible();
  });
});
