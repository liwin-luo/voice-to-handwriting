import { test, expect } from "@playwright/test";

// 站点 en-only(2026-11-08),locale 固定 en-US 避免中间件按 Accept-Language 协商。
test.describe("en-only", () => {
  test.use({ locale: "en-US" });

  test("quiz 全流程:开始 → 12 题作答 → 结果卡与练字链接", async ({ page }) => {
    await page.goto("/handwriting-personality-quiz");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Handwriting Personality Test");

    // 服务端 HTML 即含科普与免责(规范 §2.2)
    await expect(page.getByRole("heading", { name: "Is handwriting analysis real?" })).toBeVisible();
    await expect(page.getByText(/For fun only/i).first()).toBeVisible();

    await expect(page.getByText("Question 1 of 12").first()).toBeVisible();

    // 视觉题:样张按钮 + 文字标签;自述题:纯文字按钮。一律点第一个选项走完全程
    for (let i = 0; i < 12; i++) {
      await expect(page.getByTestId("quiz-option")).toHaveCount(3);
      await page.getByTestId("quiz-option").first().click();
    }

    // 结果页:档案卡 + 5 个维度条 + 结果卡下载 + 练字内链
    await expect(page.getByRole("heading", { name: "Your handwriting profile" })).toBeVisible();
    await expect(page.getByTestId("quiz-option")).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Download my result" })).toBeEnabled();
    await expect(
      page.getByRole("main").getByRole("link").filter({ hasText: /practice|generator|paper|Word Work/i }).first(),
    ).toBeVisible();

    // 重测:回到第一题
    await page.getByRole("button", { name: "Retake the quiz" }).click();
    await expect(page.getByText("Question 1 of 12").first()).toBeVisible();
  });

  test("quiz 回退按钮可回到上一题", async ({ page }) => {
    await page.goto("/handwriting-personality-quiz");
    await expect(page.getByText("Question 1 of 12").first()).toBeVisible();
    await page.getByTestId("quiz-option").first().click();
    await expect(page.getByText("Question 2 of 12").first()).toBeVisible();
    await page.getByRole("button", { name: /Back/ }).click();
    await expect(page.getByText("Question 1 of 12").first()).toBeVisible();
  });
});
