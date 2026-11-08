import { test, expect } from "@playwright/test";

test.describe("en-only", () => {
  test.use({ locale: "en-US" });

  test("/tools 聚合页:三组分类 + 全部工具卡片", async ({ page }) => {
    await page.goto("/tools");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("All free handwriting tools");
    await expect(page.getByRole("heading", { name: "Write & generate" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Practice sheets & printing" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Just for fun" })).toBeVisible();
    // 2026-11 三轮收缩后:17 个存活工具
    await expect(page.getByRole("main").getByRole("link")).toHaveCount(17);
    for (const cut of ["/handwriting-check", "/handwriting-count", "/handwriting-pad", "/handwriting-repeater", "/letter-tracing", "/daily-cursive-handwriting-practice", "/word-work", "/handwriting-sentence-practice", "/doctor-handwriting-generator"]) {
      await expect(page.getByRole("main").locator(`a[href="${cut}"]`)).toHaveCount(0);
    }
    await expect(page.getByRole("main").getByRole("link", { name: "Printable Letters" })).toBeVisible();
    await expect(page.getByRole("main").getByRole("link", { name: "Handwriting Quiz" })).toBeVisible();
  });

  test("导航分组下拉:常用入口 + 查看全部", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "All tools" }).click();
    await expect(page.getByText("Write & generate")).toBeVisible();
    await expect(page.getByText("Just for fun")).toBeVisible();
    await expect(page.getByRole("menuitem", { name: "Page Calculator" })).toHaveCount(0);
    await expect(page.getByRole("menuitem", { name: "View all tools" })).toHaveAttribute("href", "/tools");
    await page.getByRole("menuitem", { name: "Handwriting Quiz" }).click();
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Handwriting Personality Test");
  });

  test("首页含全部工具入口", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Browse all free tools" }).click();
    await expect(page.getByRole("heading", { level: 1 })).toContainText("All free handwriting tools");
  });
});
