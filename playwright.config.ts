import { defineConfig } from "@playwright/test";

// 端口可用 E2E_PORT 覆盖:默认 3000,被其他项目的 dev server 占用时换端口跑
const port = Number(process.env.E2E_PORT ?? 3000);

export default defineConfig({
  testDir: "tests/e2e",
  use: { baseURL: `http://localhost:${port}`, locale: "en-US" }, // 固定 locale:路由由 URL 驱动,不受 Accept-Language 影响(2026-11-09 恢复双语后仍保持)
  webServer: {
    command: "npm run dev",
    url: `http://localhost:${port}`,
    reuseExistingServer: true,
    timeout: 120_000,
    env: { PORT: String(port) },
  },
});
