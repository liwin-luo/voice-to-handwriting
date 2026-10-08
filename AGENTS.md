<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# 博客内容规范(写作/新增文章必读)

本站博客采用 5 个写作角色(笔名署名)体系。**为博客写新文章或改稿前,必须先读**:

1. `docs/personas/README.md` — 角色总览、选题簇 → 角色的分配规则、诚信红线;
2. 该文选定角色的角色卡 `docs/personas/<id>.md` — 文风必须项/禁止项/结构习惯,写作时严格遵守。

角色在 `src/content/authors.ts` 注册,文章在 `src/content/posts.ts` 登记时 `author` 字段必填;新文章接线四步与验收命令见 `docs/DEVELOPMENT-STANDARDS.md` §3.4–§3.5。改角色人设时 `authors.ts` 与角色卡两处必须同步。
