import { expect, test, type Page } from "./fixtures";

// 2026-11-18 en-only 页切语言不再送 404:LocaleSwitch 对目标语言做 HEAD 探测,
// 页面不存在(或被 308 带走)则落回该语言首页(plan §三十五)。

/** 全量跑时 dev 按需编译会拖慢水合:onChange 挂上之前 select 不生效,轮询到 URL 符合预期为止 */
async function switchLocale(page: Page, target: string, urlPattern: RegExp) {
  await expect(async () => {
    await page.getByRole("banner").getByRole("combobox").selectOption(target);
    await expect(page).toHaveURL(urlPattern);
  }).toPass({ timeout: 15_000 });
}

test("en-only 文章切中文落回 /zh 首页,不进 404", async ({ page }) => {
  await page.goto("/blog/handwriting-personality-test");
  await switchLocale(page, "zh", /\/zh\/?$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("en-only 工具页(cursive-alphabet)切中文落回 /zh 首页", async ({ page }) => {
  await page.goto("/cursive-alphabet");
  await switchLocale(page, "zh", /\/zh\/?$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("双语工具页切中文留在原页", async ({ page }) => {
  await page.goto("/handwriting-worksheet-generator");
  await switchLocale(page, "zh", /\/zh\/handwriting-worksheet-generator$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("切回英文从 zh 版回到原页", async ({ page }) => {
  await page.goto("/zh/name-tracing");
  await switchLocale(page, "en", /\/name-tracing$/);
});

test("es 门控区(blog)沿用落首页规则", async ({ page }) => {
  await page.goto("/blog");
  await switchLocale(page, "es", /\/es\/?$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});
