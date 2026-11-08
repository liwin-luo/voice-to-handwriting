import { defineConfig } from "@playwright/test";

// 端口可用 E2E_PORT 覆盖:默认 3000,被其他项目的 dev server 占用时换端口跑
const port = Number(process.env.E2E_PORT ?? 3000);

export default defineConfig({
  testDir: "tests/e2e",
  use: { baseURL: `http://localhost:${port}`, locale: "en-US" }, // en-only(2026-11-08);固定 locale 避免中间件按 Accept-Language 协商
  webServer: {
    command: "npm run dev",
    url: `http://localhost:${port}`,
    reuseExistingServer: true,
    timeout: 120_000,
    env: { PORT: String(port) },
  },
});
