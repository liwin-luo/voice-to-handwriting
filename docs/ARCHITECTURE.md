# 项目结构与能力总览

> 供后续开发使用。最后更新:2026-10-08。
> 快速上手先读 [README.md](../README.md)(运行指南),本文侧重架构、接线方式与开发约定。

## 1. 项目概览

**voicetohandwriting.online** —— 对着网页说话(或输入/导入音频)→ 实时转文字 → 渲染成逼真手写体 → 导出 PNG / PDF。另有一族围绕"手写"的 SEO 工具页(纸张生成、描红字帖、连笔字、练字表、涂色页等)与内容页(模板库、博客、FAQ)。

核心设计约束:**无后端、零 API 成本**。语音识别用 Web Speech API(浏览器自带),音频转写用 transformers.js 在用户浏览器本地跑 Whisper,手写渲染是纯 DOM + 确定性抖动,全部计算发生在客户端。全站 SSG,部署在 Vercel。

| 层 | 技术 |
|---|---|
| 框架 | Next.js 16(App Router,注意版本有破坏性变更,见 §9)· React 19 |
| i18n | next-intl 4,8 语言:`en`(默认,无前缀)`es fr de pt zh ja ko`(前缀路由) |
| 样式 | Tailwind CSS 4 |
| 状态 | Zustand 5 + persist(localStorage) |
| 内容 | @next/mdx + remark-gfm,静态 import 注册表模式 |
| 语音 | Web Speech API;@huggingface/transformers(Whisper ONNX,自托管模型) |
| 导出 | html-to-image(截图)+ jspdf(PDF) |
| 监控 | Sentry(可选)、@vercel/analytics |
| 测试 | Vitest(单元)+ Playwright(E2E 冒烟) |

## 2. 目录结构

```
├── messages/                  # next-intl 文案,每语言一个 JSON(en/zh/ja/ko/es/de/fr/pt)
├── public/
│   ├── fonts/<fontId>/        # cn-font-split 切片产物:result.css + *.woff2(勿手改)
│   ├── models/onnx-community/ # Whisper ONNX 模型(npm run models 下载,已入库)
│   ├── blog/                  # 博客题图
│   └── fd1dfcff….txt          # IndexNow 密钥文件(Bing 站点验证)
├── scripts/
│   ├── fonts.mjs              # fonts-src/*.ttf → public/fonts/ 切片(npm run fonts)
│   ├── models.sh              # 从 hf-mirror 下载 Whisper 模型(npm run models)
│   └── indexnow-submit.mjs    # 提交 URL 到 IndexNow(npm run indexnow)
├── src/
│   ├── proxy.ts               # Next 16 的 middleware:next-intl 语言协商/前缀
│   ├── i18n/                  # routing(locales 顺序即切换器顺序)、navigation(Link)、request
│   ├── lib/                   # site(SITE 常量)、seo(localizedUrl/buildAlternates)、
│   │                          # fonts(CSS 加载清单)、transcribe(Whisper)、
│   │                          # paperImage(上传图片压缩)、staticPage(静态页工厂)
│   ├── engine/                # 手写渲染引擎:tokens / layout / jitter / paper(纯函数+单测)
│   ├── hooks/                 # useSpeechRecognition(Web Speech API 封装)
│   ├── stores/                # useEditorStore(编辑器+样式)、useHistoryStore(本地历史)
│   ├── components/            # 见 §4.5–4.7
│   ├── content/               # 数据层:posts/templates/faqs/related + MDX 注册表(§4.8)
│   └── app/
│       ├── sitemap.ts robots.ts icon.svg
│       └── [locale]/          # 所有页面(§4.2),layout.tsx 挂全站壳
├── fonts-src/                 # 字体原始 TTF + OFL 授权
├── tests/e2e/                 # Playwright 冒烟
└── docs/                      # 本文档、plans/、us-seo-content-plan.md
```

## 3. 核心链路:主工作台

数据中枢是 `useEditorStore`,渲染链是本文档最需要理解的部分:

```
RecorderPanel(按住说话,Web Speech API)──┐
TranscriptEditor(手动输入/编辑)─────────┼─→ useEditorStore.text ─→ PaperView
AudioImportPanel(音频文件,本地 Whisper)──┘         │
                              StylePanel(字体/纸张/墨色/仿真度…)
                                                    ↓
        tokenize(engine/tokens)→ 隐藏 DOM 测量行高 → paginate(engine/layout)
        → 逐字符抖动(engine/jitter,种子驱动)→ 分页 .paper DOM(A4 794×1123 @96dpi)
                                                    ↓
        ExportBar:html-to-image 截图 → SharePreviewModal 预览 → PNG 下载 / jspdf 多页 PDF
```

关键行为:

- **PaperView 防抖**:输入 300ms 防抖重排版;IME 组词期间(`editorStore.composing`)完全暂停,防止拼音过程疯狂重排。通用版封装在 `useDebouncedImeSafe`(4 个 Canvas 生成器也在用)。
- **确定性抖动**(`engine/jitter.ts`):同一 `(seed, charIndex)` 永远得到同一抖动参数——编辑文字不扰动其他字符、导出可复现。种子还派生一套"全局书写习惯"(倾斜/字号波动/基线波浪/墨色深浅),换种子=换一个人的字。`intensity`(仿真度)是全局系数,0 = 工整。
- **分词规则**(`engine/tokens.ts`):CJK 逐字抖动,拉丁文整词抖动(避免单词散架)。
- **快照**:录音结束(`speech`)、音频转写成功(`audio`)、导出(`export`)时 `snapshotEditor()` 写入 `useHistoryStore`。

## 4. 分模块说明

### 4.1 i18n 与路由

- `src/i18n/routing.ts`:`locales` 数组顺序 = 语言切换器显示顺序(当前 en→es→fr→de→pt→zh→ja→ko);`localePrefix: "as-needed"` 即 en 无前缀。`LOCALE_LABELS` 用语言全名(endonym)。
- `src/proxy.ts`:Next 16 中 middleware 更名为 proxy,内容就是 `createMiddleware(routing)`。
- `src/i18n/navigation.ts` 导出带语言前缀的 `Link`/`usePathname`/`useRouter`,页面内链接**必须**用它而非 `next/link`。
- 页面文案全部在 `messages/*.json`;注意 8 个文件要同步加 key(历史上漏过,见 git log "fix missing wordwork i18n x8")。

### 4.2 页面地图(src/app/[locale]/)

所有页面同一模式:`setRequestLocale` + `getTranslations` + `buildAlternates(path, locale)` 生成 canonical/hreflang + `generateStaticParams` 展开 8 语言,全站 SSG。

| 路由 | 内容 | 核心组件 / 数据 |
|---|---|---|
| `/` | 主工作台 | `ToolWorkspace`(无 preset)+ `ShareBar` + `ToolFaq(FAQ_ITEMS)` |
| `/cursive` | 连笔字工具(英文市场) | `ToolWorkspace` preset=cedarvillecursive,`CURSIVE_FAQS` |
| `/cursive-worksheets` | 连笔字描红工作表 | `TracingGenerator`(cedarvillecursive) |
| `/name-tracing` | 姓名描红字帖 | `TracingGenerator`(patrickhand),`TRACING_FAQS` |
| `/printable-paper` | 横线/方格纸生成 | `PaperGenerator`,`PAPER_FAQS` |
| `/word-work` | 拼写练习(写三遍+缺字母) | `WordWorkGenerator`,`WORDWORK_FAQS` |
| `/writing-practice` | CJK 练字表(田字格/原稿纸) | `WritingPracticeGenerator`,defaultScript 按 locale,`WRITING_FAQS` |
| `/name-coloring` | 名字涂色页 | `NameColoringGenerator`,`COLORING_FAQS` |
| `/templates` · `/templates/[slug]` | 模板库/详情 | 服务端映射 `TEMPLATES` → `TemplatesBrowser`;详情页真实样式预览,"使用"链到 `/?template=<slug>` |
| `/blog` · `/blog/[slug]` | 博客索引/正文 | `POSTS` + `BLOG_CONTENT`;正文 `ProseShell` + Article JSON-LD + `RelatedLinks`;hreflang 用 `postLocales()` 只声明有正文的语言 |
| `/faq` | FAQ 聚合页 + FAQPage JSON-LD | `FAQ_ITEMS` + `getFaq` |
| `/about` `/privacy` `/terms` `/contact` | 静态页 | `makeStaticPage(key)` 工厂(`src/lib/staticPage.tsx`)从 `PAGE_CONTENT` 取 MDX |
| `[...rest]` | 兜底 notFound | — |

### 4.3 手写渲染引擎(src/engine/,纯函数、有单测)

| 文件 | 职责 |
|---|---|
| `tokens.ts` | 文本 → Token[](cjk / word / space / newline),CJK 正则含全角标点 |
| `layout.ts` | `paginateLineTops`(按隐藏 DOM 测得的行 top 分页,跨页行整体下移)+ `expandPages`(把 newline token 插回所属页) |
| `jitter.ts` | `mulberry32`/`hash2` 伪随机;`styleFingerprint(seed)` 全局笔迹指纹;`charJitter(charIndex, seed, intensity)` → rotate/translateY/scale/letterSpacing/opacity |
| `paper.ts` | 纸张预设 blank/ruled/grid/letter(CSS background 画格线)+ `makeCustomPaper`(用户自定义,spacing 钳制 24–64px,支持背景图 cover/tile) |

引擎与 UI 解耦,改渲染算法只需动这里并跑 `npm run test`。

### 4.4 状态与持久化(src/stores/)

| store | 内容 | persist key | 说明 |
|---|---|---|---|
| `useEditorStore` | text + 全部样式(fontId/paperId/ink/fontSize/intensity/seed/align/indent/watermark/customPaper) | `vth-prefs` | **只持久化样式,不持久化正文**;`FONTS`(14 款)与 `INKS`(7 色)常量也定义在此文件 |
| `useHistoryStore` | 快照数组(text + style + source) | `vth-history` | 上限 50 条,最新在前,同文本跨来源去重;经工具内 `HistoryDrawer` 查看/恢复(独立 /history 页已移除,308 回首页) |

自定义约定:所有 localStorage key 用 `vth-` 前缀;用户上传纸张背景图必须先过 `lib/paperImage.ts` 的 `fileToPaperImage` 压缩(长边 1600 JPEG),否则会撑爆 localStorage 配额导致**全部样式偏好丢失**。

### 4.5 语音能力

- `src/hooks/useSpeechRecognition.ts`:Web Speech API 封装。要点:Chrome ~60s 强制断开 → onend 自动重启(上限 50 次);`lang` 跟随页面 locale;错误分 denied/network/stopped;SSR 水合安全。**需要 HTTPS 或 localhost**,Firefox/移动 Safari 不支持,UI 层做降级。
- `src/lib/transcribe.ts`:transformers.js 跑 `onnx-community/whisper-base`(可选 small)。模型自托管在同源 `/models/`(国内可达,`env.allowRemoteModels = false`);WebGPU 探测可用才用,否则 WASM q8;音频解码为 16k 单声道 PCM;中文加 `initial_prompt` 推向简体;管线按模型单例缓存,失败可重试。

### 4.6 字体体系

- 14 款手写字体定义在 `useEditorStore.ts` 的 `FONTS`(中文 6、英文 6、日 1、韩 1),每款含 fallback 栈。
- 原始 TTF 在 `fonts-src/`(OFL 授权),`npm run fonts` 用 cn-font-split 切片到 `public/fonts/<id>/result.css`。
- 加载策略(`lib/fonts.ts` + `layout.tsx` + `FontStylesheets.tsx`):默认字体 mashanzheng **阻塞**加载(首屏字形正确),其余 11 款 preload + 水合后注入,不阻塞首屏。
- Canvas 生成器里用字体前需 `document.fonts.load` 等待切片就绪(参考 `TracingGenerator`)。

### 4.7 导出与分享

- `ExportBar`:html-to-image 截所有 `.paper` 节点(带 rAF fallback hack,防后台标签页下截图卡死)→ `SharePreviewModal`(翻页/下载/复制/逐平台分享/水印开关,水印切换用 `flushSync` 重渲染后再截)→ PNG;jspdf 合多页 PDF。
- 分享族:`useShareActions`(共享 hook,运行时读 location,水合后探测 `navigator.share`)被 `ShareBar`(工具页横条,`id="share-bar"`)与 `FloatingShare`(桌侧浮标,IntersectionObserver 观察 #share-bar,滚出视口才出现)共用。

### 4.8 内容管线(src/content/,纯 TS 常量,非 CMS)

统一模式:`slug + i18n: Partial<Record<Locale, {...}>>`,缺翻译回退 en。

| 文件 | 数据 | 消费方 |
|---|---|---|
| `blog/registry.ts` | `BLOG_CONTENT`:slug → locale → MDX 组件(静态 import,**这是 MDX 的实际加载方式**) | blog 页;`postLocales(slug)` 供索引/sitemap/hreflang/静态参数四处过滤防 404 |
| `posts.ts` | `POSTS` 元数据(slug/date/题图/i18n 标题描述) | blog 页、sitemap(lastmod 用文章真实日期) |
| `pages/registry.ts` | `PAGE_CONTENT`:about/privacy/terms/contact × 8 语言 MDX | `makeStaticPage` 工厂 |
| `templates.ts` | `TEMPLATES`:slug + TemplateStyle(font/paper/ink/size/intensity/align/indent)+ i18n 范文 text | 模板列表/详情、`ToolWorkspace` 的 `?template=` 接线、sitemap |
| `faqs.ts` | `FAQ_ITEMS` 及各工具专属 FAQ;`getLocalizedFaqs` **只返回当前语言有翻译的条目** | 各工具页 `ToolFaq`、/faq 页 |
| `related.ts` | 文章尾部内链规划(tools[]/posts[]) | `RelatedLinks`(SEO 集群) |
| `extra-locales.ts` | de/fr/pt 后补翻译,`mergeI18n` 就地合并进大常量,避免反复内联编辑 | posts.ts、templates.ts |

MDX 渲染链:MDX 文件 → registry 静态 import → `<Body />` 放进 `ProseShell`(max-w-3xl + prose 排版)。无 frontmatter、无运行时文件读取(仅 blog/[slug] 读源码统计阅读时长)。`mdx-components.tsx` 把 MDX 的 `a` 映射到 next-intl `Link`,站内链接自动补语言前缀(约定见 [DEVELOPMENT-STANDARDS.md](./DEVELOPMENT-STANDARDS.md) §3.3)。

### 4.9 SEO 基建

- `lib/seo.ts`:`localizedUrl`(en 无前缀、非根路径不带尾斜杠)+ `buildAlternates`(每语言自引用 canonical,x-default→en;`available` 参数给部分翻译页面用——**指向 404 的 hreflang 会导致整组声明被丢弃**)。
- `app/sitemap.ts`:静态路径 × 8 语言 + 全部模板页 + 字母矩阵页 + 博客(仅 postLocales);内容仅来自 localStorage 的本地工具页禁止进。
- `app/robots.ts`:全放行 + sitemap 指引。
- JSON-LD:主页 WebApplication、工具页与 /faq 的 FAQPage(`ToolFaq`)、博客 Article、OG 图(`opengraph-image.tsx`,locale 级 + 文章级)。
- IndexNow(`scripts/indexnow-submit.mjs`,`npm run indexnow`):无参提交 sitemap 全量,带参数提交指定 URL;密钥文件在 `public/fd1dfcff….txt`。**日常只提交有变化的 URL**,反复全量提交会被视为滥用。

### 4.10 监控 / 合规 / 广告

- Sentry:5 个配置文件(instrumentation* + sentry.{server,edge}.config),**未配置 DSN 时零开销跳过**;client 采样 0.1。
- AdSense 双保险:layout 只在 `NEXT_PUBLIC_ADSENSE_CLIENT` 存在时注入 script;`ConsentBanner`(`localStorage["vth-consent"]`)用户点"接受"后才真正生效注入。
- Vercel Analytics 挂在 locale layout。

## 5. 环境变量(均有缺省/降级,本地可不配)

| 变量 | 用途 |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | 站点绝对 URL,默认 `https://voicetohandwriting.online`;进 metadataBase/sitemap/JSON-LD |
| `NEXT_PUBLIC_CONTACT_EMAIL` | 联系邮箱,默认 `hello@voicetohandwriting.online` |
| `NEXT_PUBLIC_ICP` | 配置后页脚渲染备案链接 |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | AdSense client id,同时控制 ConsentBanner 显示 |
| `NEXT_PUBLIC_SENTRY_DSN` | Sentry,不配则关闭 |

## 6. 本地开发

```bash
npm i
npm run dev        # http://localhost:3000(语音识别要求 localhost/HTTPS)
npm run fonts      # 首次:切片字体到 public/fonts/(需先放 TTF 到 fonts-src/)
npm run models     # 首次:下载 Whisper 模型(whisper-base 已入库,可跳过)
npm run test       # Vitest 单测(engine/hooks/stores)
npx playwright test  # E2E 冒烟(tests/e2e/smoke.spec.ts,自动起 dev server,固定 zh-CN)
```

## 7. 部署

推送 main → Vercel 自动部署(全 SSG,无服务端函数依赖)。生产域名 `https://voicetohandwriting.online`。部署新页面后如需加速收录,跑 `npm run indexnow <url>`(等密钥文件已在线上时;全量提交见 §4.9 注意)。

## 8. 常见任务接线指南

**新增工具页**(参考最接近的现有页):
1. 建组件 `src/components/XxxGenerator.tsx`(Canvas 类生成器参考 `useDebouncedImeSafe` + jsPDF 模式);
2. 建 `src/app/[locale]/xxx/page.tsx`,复制现有模式(`generateStaticParams` + `buildAlternates` + ShareBar + ToolFaq);
3. 8 个 `messages/*.json` 加 nav/meta/footer 文案;
4. `SiteHeader`/`NavDropdown` 加入口,`sitemap.ts` 的 PATHS 加路径;
5. `faqs.ts` 加该工具 FAQ(没翻译的语言不会渲染,无需 8 语全翻)。

**新增博客文章**:① `src/content/blog/<slug>.<locale>.mdx`;② `blog/registry.ts` 注册;③ `posts.ts` 登记元数据;④ 需要内链则 `related.ts` 登记。只有写了正文的语言会出现对应 URL(其余语言自动不生成)。

**新增手写模板**:`templates.ts` 加一项(样式 + en 范文必填,其他语言进 `extra-locales.ts`),页面/sitemap 自动覆盖。

**新增语言**:`i18n/routing.ts` locales + `LOCALE_LABELS`;新增 `messages/<lc>.json`;补齐 content 各处该语言条目(可缺省回退 en);Playwright 的 locale 固定值如受影响需同步。

**新增字体**:TTF 放 `fonts-src/` → `npm run fonts` → `FONTS` 加项(css 栈)→ `lib/fonts.ts` 的 ASYNC_FONT_CSS 加 `/fonts/<id>/result.css`。**两处都要加**,只加 FONTS 会导致 @font-face 不加载(见 §9 已知问题)。

## 9. 约定与已知问题

- **Next.js 版本有破坏性变更**:workspace 的 AGENTS.md 要求写代码前先读 `node_modules/next/dist/docs/` 对应文档(如 middleware→proxy 改名),不要凭记忆写 Next 代码。
- 注释与文档用中文;组件命名、目录组织沿现有模式;服务端组件默认,交互组件才加 `"use client"`。
- localStorage key 一律 `vth-` 前缀;正文不入库,样式快照才入库。
- 排版防抖一律走 `useDebouncedImeSafe`(300ms + IME 组词暂停),不要自己写 setTimeout 防抖。
- **已知问题**:`FONTS` 里的 `kleeone`、`nanumpenscript`(writing-practice 页的日/韩默认字体)未加入 `lib/fonts.ts` 的加载清单,其 @font-face 从未注入,当前依赖系统字体兜底——修复方式见 §8"新增字体"。
- 分页/抖动等纯逻辑改动的验收标准是 `npm run test`;UI 改动用 Playwright 冒烟 + 本地目检。

## 10. 相关资料

- [README.md](../README.md):运行/字体/模型/部署操作指南
- [DEVELOPMENT-STANDARDS.md](./DEVELOPMENT-STANDARDS.md):开发规范(多语言 / SEO / 文章闭环 / 编码约定 + 自动化校验)
- `调研报告.md`、`docs/us-seo-content-plan.md`、`docs/plans/`:产品与 SEO 策划背景
