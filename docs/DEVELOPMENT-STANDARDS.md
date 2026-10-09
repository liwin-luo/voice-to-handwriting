# 开发规范

> 所有新增页面、文章、组件、功能必须满足本文。配套 [ARCHITECTURE.md](./ARCHITECTURE.md) 讲"怎么接线",本文讲"什么算合格"。
> 覆盖范围:多语言(§1)· SEO(§2)· 文章闭环(§3)· 编码(§4);§5 为自动化校验,§6 为存量整改。
> 最后更新:2026-10-08。发布时盘点出的现存偏差见 §6,限期整改。

关键词约定(参考 RFC 2119):

- **必须 / 禁止(MUST / MUST NOT)**:硬性要求。可机械检查的项已纳入 `npm test` 自动校验(§5),违反则测试失败、不得合并。
- **应当(SHOULD)**:默认遵守;确有理由偏离时在 PR 描述中说明。

## 1. 多语言规范

### 1.1 语言清单与路由

- 支持 8 语言:`en`(默认,URL 无前缀)、`es fr de pt zh ja ko`(URL 带前缀)。清单只允许改 `src/i18n/routing.ts`(`locales` 数组顺序 = 切换器顺序),其他地方**禁止**散落语言列表。
- 新页面**必须**建在 `src/app/[locale]/` 下,并**必须**实现 `generateStaticParams` 展开 8 语言 + `setRequestLocale`(复制现有页面模式)。**禁止**在 `[locale]` 之外创建面向用户的路由(那等于只做了一个语言版本)。
- 页面内部链接**必须**用 `@/i18n/navigation` 导出的 `Link` / `useRouter` / `usePathname`,**禁止**直接用 `next/link`(会丢语言前缀,把用户扔回英文版)。
- 生成绝对 URL(sitemap、JSON-LD、og:url、分享)**必须**用 `localizedUrl()`(src/lib/seo.ts),**禁止**手拼 `/zh/...` 字符串。
- MDX 正文(blogs、静态页)里的站内链接**必须**用以 `/` 开头的站内路径(不带语言前缀、不带尾斜杠),由 `mdx-components.tsx` 统一映射到 next-intl `Link` 自动补当前语言前缀;外链和 `mailto:` 写完整 URL 原样放行。

### 1.2 文案(用户可见字符串)

- **禁止**在组件里硬编码任何用户可见文案(包括按钮、aria-label、placeholder、title 属性、错误提示)。一律进 `messages/*.json`,server 组件用 `getTranslations`,client 组件用 `useTranslations`。
- 8 个语言文件**必须同步**加 key:先写 `en.json`(源语言),其余 7 语**同一个 PR** 补齐。key 一致性由自动校验拦截(§5)——历史上漏加过 8 次,不要再犯。
- key 按页面/功能区组织命名空间(`nav`、`footer`、`meta`、`<pageName>`…);新加 key 前先搜现有 key,能复用就复用。
- 插值用 ICU 占位符 `{name}`;各语言译文**必须保留全部占位符**,不得删改。
- 翻译质量底线:非英语条目至少人工通读一遍再上线,**禁止**纯机翻直出;日/韩用敬体,西/葡用中性称谓,与现有文案风格一致。

### 1.3 内容数据(文章 / 模板 / FAQ / 静态页)

- 内容统一用 `Partial<Record<Locale, {...}>>` 模式,`en` 必填(回退兜底),其余语言缺省回退 en。
- FAQ**必须**经 `getLocalizedFaqs` 渲染(只显示当前语言有翻译的条目),**禁止**把未翻译的 FAQ 以英文硬塞进非英文页面。
- 文章正文:只有提供了正文的语言才生成该语言 URL;sitemap、hreflang、静态参数全部由 `postLocales()` 过滤,**禁止**让未翻译语言出现可被抓取的 404。
- locale 敏感默认值(如 writing-practice 的 `defaultScript` 按 locale 区分日/韩/中文)**必须**在服务端按路由 locale 决定,**禁止**再读浏览器语言二次覆盖(两套逻辑会打架)。

### 1.4 切换器与降级

- 语言切换器名称**必须**用 `LOCALE_LABELS` 的 endonym(语言自称),新增语言同步补该表。
- 功能降级提示(如浏览器不支持 Web Speech API)**必须**有全部 8 语文案,与功能本身同一个 PR 交付。

### 1.5 多语言验收清单

- [ ] `npm test` 通过(含 messages key 一致性,§5)
- [ ] 用 `/zh`(或任一前缀语言)打开新页面:无英文残留文案;语言切换后停留在同一页面
- [ ] 页面里所有链接跳转后语言保持不变(不被扔回 `/`)

## 2. SEO 规范

### 2.1 元数据与 hreflang

- 每个页面**必须**导出 `generateMetadata`,title 与 description **必须逐语言提供**(取 messages `meta` 命名空间或内容数据 i18n),**禁止** 8 个语言共用一份英文 description。
- canonical / hreflang **必须**通过 `buildAlternates(path, locale, available?)` 生成,不得手写:
  - 每个语言版本自引用 canonical(多语言站 canonical **禁止**跨语言指向);
  - `x-default` 自动指向 en;
  - 部分翻译的页面(如仅 en 有正文的文章)**必须**传 `available` 参数,只声明真实存在的语言变体——**指向 404 的 hreflang 会让 Google 丢弃整组声明**(已踩过的坑)。
- 重要落地页**应当**配 locale 级 `opengraph-image.tsx`。

### 2.2 渲染与可抓取性

- 全站 SSG。标题、正文、FAQ 等关键词内容**必须**出现在服务端 HTML 里(view-source 可见),**禁止**只在 client 水合后才渲染;仅交互逻辑用 `"use client"`。
- `generateStaticParams` **必须**覆盖该页会出现在 sitemap 里的全部 (路由 × locale) 组合,否则线上是动态 500/404 而不是静态页。

### 2.3 sitemap / robots / 收录

- 新增路由**必须**同步加进 `src/app/sitemap.ts` 的 `PATHS`(文章与模板页自动纳入,无需手动);内容仅来自 localStorage 的本地工具页(无公开内容)**禁止**进 sitemap。
- `lastmod` **必须**用真实日期(文章用其 date/updated),**禁止**全站统一刷成构建时间——会被 Google 判为不可信信号。
- 部署后**应当**对新增/有变化的 URL 执行 `npm run indexnow <url>`;**禁止**日常反复全量提交(会被 IndexNow 视为滥用)。

### 2.4 结构化数据(JSON-LD)

- 按页面类型**必须**挂载:主页 `WebApplication`;工具页与 /faq 的 `FAQPage`(经 `ToolFaq` 组件);博客文章 `Article`(含 author/publisher/datePublished/dateModified/inLanguage)。
- FAQ 的 JSON-LD **必须**与页面可见 FAQ 一致,**禁止**堆砌页面上不存在的问题(人工惩罚红线)。

### 2.5 URL 与关键词

- slug 一律小写 kebab-case、英文语义化、**跨语言不变**(各语言只换前缀),**禁止**非 ASCII slug。
- 每个工具页只打一个主关键词:title 前置该词、H1 与其语义一致、description 承接;同簇关键词拆给不同页面,避免站内互搏(cannibalization)。
- 新工具页立项时**必须**先在 `docs/us-seo-content-plan.md` 登记目标关键词与配套文章规划(§3.1),再动工。
- 每页一个 H1;文章 MDX**必须**恰好含一个 `# ` 一级标题(自动校验,§5),其余层级从 `##` 起。

### 2.6 内链

- 新页面**必须**至少有 2 个站内入口(导航/页脚其一 + 至少一篇相关文章、模板或相关链接),**禁止**孤儿页。
- 文章 ↔ 工具的互链闭环是本站 SEO 的核心机制,见 §3。

## 3. 文章规范(工具 ↔ 文章闭环)

站内 SEO 策略:**工具页承接搜索转化,文章页承接长尾流量并导流回工具**。因此文章不是可选项,是工具页的配套基建。

### 3.1 覆盖:每个工具必须有配套文章

- 新工具页上线时,**必须**同时(最迟一个内容周期内)发布 ≥1 篇瞄准该工具关键词的支柱文章(en 起步),并在 `docs/us-seo-content-plan.md` 登记该集群的后续选题。
- 文章 slug 不要求与工具一致,但必须围绕同一关键词簇(如 `/cursive-worksheets` ↔ cursive-practice-worksheets)。

### 3.2 文章多语言

- 语言优先级:**en 必须**;`zh ja ko es` 应当跟进;`de fr pt` 按内容计划逐步补齐。
- 每补一个语言 = 三件事**同一次提交**完成:
  1. `src/content/blog/<slug>.<locale>.mdx` 正文;
  2. `src/content/blog/registry.ts` 静态 import 注册;
  3. `src/content/posts.ts` 补该语言的 title/description(缺省会回退英文标题,展示层允许但应当补)。
- hreflang、sitemap、静态参数由 `postLocales()` 自动跟随,**禁止**在任何页面或 sitemap 里手写某语言文章 URL。
- 正文质量:同一篇文章各语言**语义等价**(结构、步骤、工具入口一致),不要求逐句直译;数字、示例可本地化。

### 3.3 文章 → 工具跳转(硬性要求)

每篇文章必须让读者一步到达对应工具,以下两条通道**必须同时具备**:

1. **尾部 RelatedLinks 区块**:`src/content/related.ts` 的 `RELATED[slug]` **必须**登记:
   - `tools`:≥1 个(通常是文章教的那个工具,补 `TOOL_LABEL_KEY` 中已有的路径才能渲染本地化名称);
   - `posts`:2–3 篇同集群文章。
   没登记 = 文章尾部没有内链区块 = 不合格(自动校验拦截,§5)。相关文章链接只显示当前语言有正文的语言(`relatedPostAvailable`),不会 404。
2. **正文上下文内链**:正文至少 1 处自然引导到工具(如 `[cursive writing generator](/cursive)`),写在教学步骤里而不是文末凑数。链接格式遵守 §1.1(站内路径不带前缀,组件层自动本地化)。

补充要求:

- **禁止**文章里出现指向不存在路由的内链;新增工具路径先补 `TOOL_LABEL_KEY`,再在文章中引用。
- 工具页 → 文章回链为**应当**级:工具页相关区域应给 1–2 篇教程入口(现存缺口见 §6)。

### 3.4 新文章接线四步(缺一不可)

1. `src/content/blog/<slug>.<locale>.mdx` 写正文(en 必有,恰好一个 H1);动笔前先按选题簇选定写作角色,通读 `docs/personas/` 对应角色卡,按其文风规则写作;
2. `registry.ts` 注册组件;
3. `posts.ts` 登记元数据:`slug / author / date / updated / image` + i18n title/description;`author` **必填**(TS 类型限定只能取 `src/content/authors.ts` 已注册的角色,角色体系见 `docs/personas/README.md`);题图可选,有则放 `public/blog/`(约 1440×900 横图,**必须**提交),没有时列表卡片用标题占位;
4. `related.ts` 登记 `RELATED[slug]`(§3.3)。

漏 1–3 任一步会导致页面 404 或不进 sitemap;漏第 4 步会被自动校验拦截。

### 3.5 文章验收清单

- [ ] `npm test` 通过(RELATED 覆盖、注册表一致性、H1 校验)
- [ ] 任一有正文的语言打开文章:尾部有工具 + 相关文章区块,工具链接带正确语言前缀且可达
- [ ] 该语言 URL 出现在 `/sitemap.xml`;未翻译语言确实 404 且不在 sitemap
- [ ] 内容级审核通过:按 [seo-audit-standards.md](./seo-audit-standards.md) 五维打分 ≥85 且红线清零(E-E-A-T、长尾词命中、Bing、AI 痕迹、多语言质量)

## 4. 编码规范

写 Next.js 代码前先读 `node_modules/next/dist/docs/` 对应文档(本版本有破坏性变更,如 middleware→proxy),**禁止**凭记忆写 Next API。

### 4.1 语言与格式

- 代码、标识符、git 提交主题行用英文;**注释、文档、commit body 用中文**(仓库既有约定)。
- 格式化靠 ESLint(`eslint-config-next`,含 TS 规则),无 Prettier;缩进 2 空格、双引号、分号,沿现有风格。提交前 `npm run lint` 与 `npx tsc --noEmit` **必须**零错误。

### 4.2 注释(重点)

原则:注释解释**代码本身说不出来的事**——意图、约束、单位、坑;不复述代码。

**必须写**:

- 文件头 / 导出模块的一行用途说明:`/** 姓名描红工作表生成器:美国教师/家长市场(姓名描红 + 三线格) */`;
- 魔法数与阈值的含义和单位(如纸张 spacing 钳制 24–64px)、非显然正则的用途;
- 跨模块约束与踩过的坑(如"指向 404 的 hreflang 会导致整组声明被丢弃"必须写在 `buildAlternates` 旁);
- workaround/hack 说明为什么存在、何时可删(如 `// rAF fallback hack,防后台标签页下截图卡死`);
- 反直觉的设计决策(如"persist 只存样式不存正文"的原因)。

**禁止**:

- 复述代码(`// 设置状态`)、日志式流水账注释;
- 注释掉的死代码——直接删,git 有历史;
- 把 PR 说明写进代码注释("本次改动…"),那是 commit message 的事。

格式约定:

- 导出函数/工具用 JSDoc `/** */` 写清参数含义与单位;TODO/FIXME 必须**带责任人与事项**:`// TODO(luo): xxx`,无主 TODO 不许进 main;
- 注释密度与周围代码保持一致,不在一个文件里一半详注一半零注。

### 4.3 命名与文件组织

| 对象 | 约定 | 示例 |
|---|---|---|
| 组件文件 | PascalCase,默认导出 | `ToolFaq.tsx` |
| hooks / 工具库 | camelCase | `useDebouncedImeSafe.ts`、`lib/seo.ts` |
| 路由目录 | kebab-case | `daily-cursive-handwriting-practice/` |
| 测试 | `*.test.ts` 与被测代码同目录 | `engine/layout.test.ts` |
| MDX | `<slug>.<locale>.mdx` | `audio-to-handwriting.zh.mdx` |
| 常量 | SCREAMING_SNAKE | `TOOL_LABEL_KEY`、`FONTS` |

- 布尔值用 is/has/should/can 前缀;事件处理 `handleXxx`;**禁止** `data2`、`handleClick1` 式命名。
- 新目录先看有没有同类:工具生成器进 `src/components/XxxGenerator.tsx`,纯逻辑进 `engine`/`lib`,不另起炉灶。

### 4.4 TypeScript

- `strict: true`;**禁止** `any`(不确定类型用 `unknown` 再收窄);**禁止**裸 `@ts-ignore`——确需压制用 `@ts-expect-error` 并注明原因。
- 类型从数据源 import 单一来源(`type Locale` 只从 `@/i18n/routing`),**禁止**复制粘贴重复定义。
- 多语言数据结构统一 `Partial<Record<Locale, {...}>>`,`en` 必填(§1.3)。
- 纯类型导入用 `import type`;import 顺序:第三方 → `@/` 别名 → 相对路径。

### 4.5 React / Next 约定

- **服务端组件是默认**;只有需要交互、浏览器 API、局部状态的组件才加 `"use client"`(文件首行)。客户端组件尽量做"叶子",翻译与数据获取留在服务端、结果作 props 传入。
- 页面统一模式:`setRequestLocale` + `getTranslations` + `buildAlternates` + `generateStaticParams`(照抄现有页面,见 ARCHITECTURE §4.2)。
- 防抖一律 `useDebouncedImeSafe`(300ms + IME 组词暂停),**禁止**自己写 setTimeout 防抖;异步副作用必须有清理(cancelled 标志 / clearTimeout / AbortController)。
- 全局样式进 `useEditorStore`,局部 UI 状态用 `useState`;localStorage key **必须** `vth-` 前缀,正文**禁止**入库;用户上传图片必须先过 `lib/paperImage` 压缩。
- 样式用 Tailwind utility,**禁止**裸 CSS/内联 style(引擎纸张背景这类动态值除外);颜色用语义 token(`accent` 等),不散落硬编码色值。
- 通用逻辑抽成 hooks(参照 `useShareActions` 被两个分享组件共用),**禁止**复制粘贴同一逻辑到第三个组件。

### 4.6 数据与测试

- 内容 = 纯 TS 常量注册表(§3.4 四处接线),**禁止**运行时文件 IO(唯一现存例外:blog/[slug] 读 MDX 源码统计阅读时长)。
- 可单测的纯逻辑**必须**放 `src/engine` / `src/lib` 并配 Vitest 单测,不埋在组件里;改引擎/layout/jitter/store 后 `npm run test` 必须过,行为变更要同步改断言。
- UI 改动验收:Playwright 冒烟 + 本地目检 en 与 zh 两语言。

### 4.7 依赖与提交

- 新增依赖须在 PR 说明用途与体积理由;能用现有依赖实现的**禁止**引入新包。全站约束:**禁止**引入后端/服务端函数(零后端是产品红线)。
- 提交信息遵循 Conventional Commits:`feat:` `fix:` `perf:` `docs:` `chore:`,主题行英文小写 ≤50 字符(如 `perf: debounce + IME-safe redraws on all generator pages`),body 中文补充"为什么"。
- 一个 PR 只做一件事,提交前自查:`npm run lint` + `npx tsc --noEmit` + `npm run test` 三绿(§5)。

## 5. 自动化校验

提交前三个命令必须零错误零失败:`npm run lint`、`npx tsc --noEmit`(§4)、`npm run test`。

`src/content/standards.test.ts` 把 §1–§3 的硬性要求固化为单测,`npm test` 自动执行:

| 校验项 | 对应规范 |
|---|---|
| 8 个 `messages/*.json` 扁平 key 集合与 en 完全一致 | §1.2 |
| 每篇 POSTS 有非空 en title/description,slug 合法,date/updated 合法,author 已注册(类型级校验,`tsc` 拦截) | §2.5、§3.4 |
| `BLOG_CONTENT` 与 `POSTS` 双向一致(不出现幽灵 slug) | §3.4 |
| 每篇 POSTS 都有 `RELATED[slug]`,且 tools ≥ 1、路径都在 `TOOL_LABEL_KEY`、posts 都存在且非自身 | §3.3 |
| 每个有正文的 (slug, locale) 都存在对应 MDX 源文件且恰好一个 H1 | §2.5、§3.4 |
| 文章题图若填写,文件真实存在于 `public/`;允许无题图 | §3.4 |

人工抽查(改了页面级代码时):`npm run dev` 后抽查 en + 一个前缀语言的 view-source,确认 canonical/hreflang/JSON-LD 齐全;部署后抽查 `/sitemap.xml` 与 `npm run indexnow <url>`。

## 6. 现存偏差与整改项(2026-10-08 盘点)

按 §1–§3 标准盘点存量,以下项不符合规范,限期整改(标 ✅ 的为发布本规范时已修复):

1. ✅ MDX 正文站内链接不保留语言前缀(zh 文章点工具链接会跳英文版)→ 已在 `mdx-components.tsx` 将 MDX `a` 映射到 next-intl `Link`。
2. cursive 集群 16 篇文章仅 en 正文 → 按 §3.2 优先级补 zh/ja/ko/es。
3. 5 篇 8 语文章的 de/fr/pt 缺本地化 title/description(当前回退英文标题)。
4. `/word-work`、`/writing-practice`、`/name-coloring` 三个工具暂无配套文章(违反 §3.1)。
5. 工具页无文章回链入口(§3.3 应当级)。
6. 4 处 `as any`(`src/lib/transcribe.ts` ×2、`src/hooks/useSpeechRecognition.ts` ×2,Web Speech API / WebGPU 缺 lib 类型)→ 按 §4.4 改为最小接口声明或 `unknown` 收窄。
