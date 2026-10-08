import { defineConfig } from "vitest/config";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import path from "node:path";

export default defineConfig({
  // MDX 插件与 next.config.ts 保持同一选项(remark-gfm),
  // 让 content 测试能静态 import blog/registry 等注册表
  plugins: [mdx({ remarkPlugins: [remarkGfm] }) as never],
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
  test: { environment: "node", include: ["src/**/*.test.ts"] },
});
