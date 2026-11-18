import { test as base, expect } from "@playwright/test";

/**
 * E2E 统一以"已拒绝 Cookie"的回访用户身份跑:
 * 2026-11 广告接入后 ConsentBanner 对所有首访访客常显(fixed 悬浮),
 * 不处理会盖住页面底部交互目标(quiz / tools / 博客列表)。
 * 种 rejected 而非 accepted:横幅消失且不注入任何广告脚本,测试保持封闭、不请求联盟域名。
 */
export const test = base.extend({
  page: async ({ page }, use) => {
    await page.addInitScript(() => localStorage.setItem("vth-consent", "rejected"));
    await use(page);
  },
});
export { expect };
