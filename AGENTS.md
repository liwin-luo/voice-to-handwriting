<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# 博客内容规范(写作/新增文章必读)

本站博客采用 5 个写作角色(笔名署名)体系。**为博客写新文章或改稿前,必须先读**:

1. `docs/personas/README.md` — 角色总览、选题簇 → 角色的分配规则、诚信红线;
2. 该文选定角色的角色卡 `docs/personas/<id>.md` — 文风必须项/禁止项/结构习惯,写作时严格遵守;
3. `docs/seo-article-playbook.md` — 这篇要不要写、第一屏写什么、`updated` 何时前进。不替代内容规划里的关键词登记。

角色在 `src/content/authors.ts` 注册,文章在 `src/content/posts.ts` 登记时 `author` 字段必填;新文章接线四步与验收命令见 `docs/DEVELOPMENT-STANDARDS.md` §3.4–§3.5。改角色人设时 `authors.ts` 与角色卡两处必须同步。

# 工作流约定(硬性,先查文档、后记文档)

**动工前必查文档**(不读不动工):

- 开发新功能:先读 `docs/DEVELOPMENT-STANDARDS.md`(硬性规范与验收)和 `docs/ARCHITECTURE.md`(接线模式与页面地图);涉及代码前另读 `node_modules/next/dist/docs/` 对应条目(见上方 Next.js 块);
- 新工具页/新文章立项:先在 `docs/us-seo-content-plan.md` 登记目标关键词与配套规划(§2.5 前置要求),选题来源与红线见该文件及 `docs/trends-backlog.md`;
- 写博客:按上方「博客内容规范」先读 `docs/personas/README.md`、所选角色卡,以及 `docs/seo-article-playbook.md`。

**完工后必记文档**(不记不算完成):

- 新增/变更路由、组件、lib 模块 → 同步 `docs/ARCHITECTURE.md` 页面地图与目录树注释;
- 工具/文章上线 → 在 `docs/us-seo-content-plan.md` 补登记落地结果(角色、内链、拆簇),Trends 来源的选题同步 `docs/trends-backlog.md`「人工评估」;
- 文档更新与代码改动**同一个 PR 提交**,不留"代码先行、文档欠账"。

