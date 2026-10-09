# 项目结构与能力总览

> 供后续开发使用。最后更新:2026-10-09。
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
│   │                          # paperImage(上传图片压缩)、staticPage(静态页工厂)、
│   │                          # fancyText(花体 Unicode 映射+折行,有单测)、
│   │                          # tools(工具分组:nav 标记进页头下拉,全量给 /tools)
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
| `/` | 主工作台。字体和纸是样本按钮,不是下拉。窄屏顺序:文字、录音、字体纸样、纸、导出,字号和墨色在「更多」。宽屏左栏全开、右栏纸、底条占满下一行。`?font=` 套用字体(测验结果回跳);仿真度、重排笔迹、水印收在「更像手写」 | `ToolWorkspace`(无 preset)+ `StylePanel` + `ShareBar` + `ToolFaq(FAQ_ITEMS)` |
| `/tools` | 工具柜。Logo 落点。每组一张带纸样的主卡(写一张→`/`,练习纸→`/name-tracing`,趣味→测验),其余是名单：宽屏在名字右侧放一句说明，悬停整行淡底。页头下拉仍用 `navGroupsFor`,不跟这三张主卡走 | `ToolLane`,`FEATURED_HREF`,`toolGroupsFor` |
| `/cursive` | 连笔字工具(英文市场) | `ToolWorkspace` preset=cedarvillecursive,`CURSIVE_FAQS` |
| `/cursive-text-generator` | 可复制花体文本(Unicode 十三风格,含现成字母表和短语)。复制是主按钮,麦克风是次按钮;预览和 PNG 可改墨色与纸底 | `CursiveTextGenerator`,`fancyText.ts`(纯映射,有单测),`CURSIVE_TEXT_FAQS` |
| `/cursive-alphabet` | 交互式连笔字母表(**en-only**,非英文 404/sitemap 仅 en)。`?letter=z` 打开即选中该字母。页上挂可抓取的 `/printables/cursive-alphabet.pdf`(图表+描红两页)和同图 PNG。收在 /tools「练习纸与打印」,页头下拉不单列 | `CursiveAlphabetPanel`,`cursiveAlphabet.ts`,`alphabetSheet.mjs`,`isEnOnlyTool` |
| `/cursive-font-generator` | 手写字体预览 + 导出(13 款 OFL:4 签名体 + 4 正式花体 + 2 日常手写 + 3 印刷体。签名体只在本页,不进主工作台。PNG 透明底 / 内嵌字体 SVG / PDF) | `CursiveFontBrowser`,`fontCatalog.ts`,`cursiveSvg.ts`,`fontFace.ts`,FAQ 经 `CURSIVE_FONT_FAQS` |
| `/cursive-worksheets` | 连笔字描红工作表。行高用大行/普通/小行;`?words=` 预填练习词(一行一个)。字色改示例,描红用同色变浅,纸底可改 | `TracingGenerator`(sacramento,`rowLabels="lines"`),`CURSIVE_WORKSHEET_FAQS` |
| `/daily-cursive-handwriting-practice` | 每日连笔练习页。页脚站点水印默认开,下载按钮上方可关。墨色改练习字,描红同色变浅,纸底可改 | `DailyCursivePracticeGenerator`,`WatermarkSwitch`,`DAILY_CURSIVE_FAQS` |
| `/cursive/letter/[letter]` | 连笔单字母课(en-only,52 页)。标题句式 “Z in Cursive” / “Capital Z in Cursive”。顺序:范字、步骤、易错、上一课/下一课、练习词;练习纸链到 `/cursive-worksheets?words=`,图表链到 `/cursive-alphabet?letter=` | `cursiveLetters.ts` + `cursiveLettersRest.ts` |
| `/name-tracing` | 姓名描红(示例行 + 虚线/空心/空白;空白行不画落笔点)。可「每人一页」,PDF 含全部页,PNG 为当前页。窄屏预览在输入下方,字体与行高在「更多」。字色改示例,描红用同色变浅,纸底可改。`?letter=a` 预填单个小写字母(描红字母课跳入);`?words=` 仍优先 | `TracingGenerator`(`perName`,`tracingSheets`),`PracticeLayout`,`TRACING_FAQS` |
| `/letter-tracing` · `/letter-tracing/[letter]` | 印刷体单字母描红(**en-only**,a–z 共 26 页 + hub)。每页落笔、走笔、邻字母差别不同。首屏是实心示例行 + 虚线行(SVG 文本),PDF 在本页下载。改行高或写整词仍走 `/name-tracing?letter=`。收在 /tools「练习纸与打印」,非英文不显示,页头下拉不单列。Hub 用 `LETTER_HUB_FAQS`,单字母页用 `letterFaqs` | `letterTracing.ts`,`LetterTraceRows`,`LetterTracingDownload`,`ToolFaq` |
| `/printable-paper` · `/printable-paper/[kind]` | 横线/方格/点阵/图画框/康奈尔。图画框与康奈尔在纸面上标出分区。线条颜色和纸底可改。子页锁定当前纸型,其他纸型只在页底链接。Hub 用 `PAPER_FAQS`(窄行/宽行对比含三线格链接);子页用 `paperKindFaqs`,不把横线问答贴到点阵和康奈尔 | `PaperGenerator`(`lockType`),`paperKinds.ts`,`paperKindFaqs.ts` |
| `/handwriting-page-calculator` | 手写用纸页数(数字估算 + 贴正文预览)。「打印空白纸 / 带到手写工具」在预览上方,页数变多时按钮不下移 | `PageCalculator`,`pageEstimate.ts`,`PAGE_CALC_FAQS` |
| `/printable-handwritten-letters` | 可打印手写信。五类短笺可改正文。名单表头固定,可逐格填写或导入 Excel / CSV(最多 30 人,页面提供 xlsx 模板)。字体、墨色、纸样可选,信纸可铺图片。下载信件 PDF 与信封 PDF。英语区 US Letter + #10(实际尺寸),其余 A4 + DL。手写字体,用户自己贴邮票寄出 | `BulkLetterMailer`,`bulkLetters.ts`,`xlsxTable.ts`,`BULK_LETTER_FAQS` |
| `/handwriting-repeater` | 循环书写演示(笔尖跟随 + 循环 GIF)。墨色和纸底可改,GIF 跟着当前颜色 | `HandwritingRepeater`,`REPEATER_FAQS` |
| `/handwriting-workbook-generator` | 成人练习册(封面+字母/词/句页,整本 PDF,最多 100 词)。词表与拼写页共用 Dolch / Fry,Fry 前 100 整表可画。墨色改示例和封面标题,描红同色变浅,纸底可改 | `HandwritingWorkbookGenerator`,`spellingLists.ts`,`WORKBOOK_FAQS` |
| `/handwriting-personality-quiz` | 笔迹性格测验(娱乐向)。打开即第一题的三张笔迹。结果卡用该档案的手写字体写档案名,无 emoji。主按钮按性格档案打开 `/?font=` | `HandwritingQuiz`,`QUIZ_FAQS` |
| `/doctor-handwriting-generator` | Doctor 手写体(rx 处方笺纸张,gag)。仿真度在样式区最上方(预设 90%),字体、纸张、墨水收进折叠 | `ToolWorkspace` `layout="doctor"`,`DOCTOR_FAQS` |
| `/word-work` | 拼写练习。主按钮是 Dolch 与 Fry 前 25,Fry 前 100 在「更多词表」;选中的列表保持按下。墨色改单词,描红同色变浅,纸底可改 | `WordWorkGenerator`,`spellingLists.ts`,`WORDWORK_FAQS` |
| `/writing-practice` | CJK 练字表(田字格/原稿纸)。墨色改范字,描红用同色变浅,纸底可改 | `WritingPracticeGenerator`,defaultScript 按 locale,`WRITING_FAQS` |
| `/name-coloring` | 名字涂色页。空输入先画出占位符里的第一个名字。装饰可选星星、动物或机器。宽屏左栏控件不随预览页数下移。页脚站点水印默认开,下载按钮上方可关 | `NameColoringGenerator`,`WatermarkSwitch`,`COLORING_FAQS` |
| `/templates` · `/templates/[slug]` | 模板库/详情。索引 FAQ 是库的用法;详情 FAQ 带上该模板标题和范文首行,13 页不共用同一组问答 | 服务端映射 `TEMPLATES` → `TemplatesBrowser`;详情页真实样式预览,"使用"链到 `/?template=<slug>`。`TEMPLATE_FAQS`,`templateDetailFaqs` |
| `/blog` · `/blog/[slug]` | 博客索引/正文 | `POSTS` + `BLOG_CONTENT`;正文 `ProseShell` + Article JSON-LD + `RelatedLinks`;hreflang 用 `postLocales()` 只声明有正文的语言 |
| `/faq` | 工具目录。每条一句,链到拥有完整答案的页面。FAQPage 由 `ToolFaq` 输出,问法与首页 `FAQ_ITEMS` 不重复。语音排错仍在首页 | `FAQ_HUB`(`faqHub.ts`)+ `ToolFaq` |
| `/about` `/privacy` `/terms` `/contact` | 静态页 | `makeStaticPage(key)` 工厂(`src/lib/staticPage.tsx`)从 `PAGE_CONTENT` 取 MDX |
| `[...rest]` | 兜底 notFound | — |

### 4.3 手写渲染引擎(src/engine/,纯函数、有单测)

| 文件 | 职责 |
|---|---|
| `tokens.ts` | 文本 → Token[](cjk / word / space / newline),CJK 正则含全角标点 |
| `layout.ts` | `paginateLineTops`(按隐藏 DOM 测得的行 top 分页,跨页行整体下移)+ `expandPages`(把 newline token 插回所属页) |
| `jitter.ts` | `mulberry32`/`hash2` 伪随机;`styleFingerprint(seed)` 全局笔迹指纹;`charJitter(charIndex, seed, intensity)` → rotate/translateY/scale/letterSpacing/opacity |
| `paper.ts` | 纸张预设 blank/ruled/grid/letter(CSS background 画格线)+ `makeCustomPaper`(用户自定义,spacing 钳制 24–64px,支持背景图 cover/tile) |
| `pageEstimate.ts` | 手写页数估算:纸型行距、字号/字距、单双面张数、原稿纸按格分页、预览截断、带到首页的 sessionStorage 载荷。横线纸贴正文后的真实分页仍走 `layout.ts` |
| `bulkLetters.ts` | 可打印手写信:CSV 收件人、固定表头的行(`recipientsFromRows`)、`{name}`/`{from}` 套用、信封行、按字宽单位分页(约一页,超长硬切) |
| `xlsxTable.ts` | 手写信名单的最小 xlsx 读写:模板下载与导入。邮编列标成文本;数字格读回时没有前导 0 |

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
| `faqs.ts` | `FAQ_ITEMS`(首页支持问答)及各工具专属 FAQ。`getLocalizedFaqs` 只返回当前语言有翻译的条目;第一条 `id` 以 `-free` 结尾时挪到末尾。`FaqEntry.link` 是答案后的一条站内链接。题目在 `ToolFaq` 里是 H3 | 各工具页 `ToolFaq`;首页用 `FAQ_ITEMS` |
| `pageFaqs.ts` | 连笔描红 `CURSIVE_WORKSHEET_FAQS`、模板库 `TEMPLATE_FAQS`、详情页 `templateDetailFaqs`(按模板标题和范文首行生成) | `/cursive-worksheets`、`/templates`、`/templates/[slug]` |
| `faqHub.ts` | `/faq` 目录 `FAQ_HUB`,问法不复制首页 | `/faq` |
| `paperKindFaqs.ts` | 六种纸各自的 FAQ,按 `paperKinds` 里的行距写 | `/printable-paper/[kind]` |
| `related.ts` | 文章尾部内链规划(tools[]/posts[]) | `RelatedLinks`(SEO 集群) |
| `extra-locales.ts` | de/fr/pt 后补翻译,`mergeI18n` 就地合并进大常量,避免反复内联编辑 | posts.ts、templates.ts |

MDX 渲染链:MDX 文件 → registry 静态 import → `<Body />` 放进 `ProseShell`(max-w-3xl + prose 排版)。无 frontmatter、无运行时文件读取(仅 blog/[slug] 读源码统计阅读时长)。`mdx-components.tsx` 把 MDX 的 `a` 映射到 next-intl `Link`,站内链接自动补语言前缀(约定见 [DEVELOPMENT-STANDARDS.md](./DEVELOPMENT-STANDARDS.md) §3.3)。

### 4.9 SEO 基建

- `lib/seo.ts`:`localizedUrl`(en 无前缀、非根路径不带尾斜杠)+ `buildAlternates`(每语言自引用 canonical,x-default→en;`available` 参数给部分翻译页面用——**指向 404 的 hreflang 会导致整组声明被丢弃**)。
- `app/sitemap.ts`:静态路径 × 8 语言 + 全部模板页 + 连笔字母矩阵 + 印刷体描红矩阵(en-only)+ 博客(仅 postLocales);内容仅来自 localStorage 的本地工具页禁止进。
- `app/robots.ts`:全放行 + sitemap 指引。
- JSON-LD:主页 WebApplication、工具页与 /faq 的 FAQPage(`ToolFaq`)、博客 Article、OG 图(`opengraph-image.tsx`,locale 级 + 文章级)。
- IndexNow(`scripts/indexnow-submit.mjs`,`npm run indexnow`):无参提交 sitemap 全量,带参数提交指定 URL;密钥文件在 `public/fd1dfcff….txt`。**日常只提交有变化的 URL**,反复全量提交会被视为滥用。

### 4.10 监控 / 合规 / 广告

- Sentry:5 个配置文件(instrumentation* + sentry.{server,edge}.config),**未配置 DSN 时零开销跳过**;client 采样 0.1。
- AdSense 双保险:layout 只在 `NEXT_PUBLIC_ADSENSE_CLIENT` 存在时注入 script;`ConsentBanner`(`localStorage["vth-consent"]`)用户点"接受"后才真正生效注入。
- Vercel Analytics 挂在 locale layout。
- Microsoft Clarity(`ClarityAnalytics.tsx`,挂在 locale layout):无 Cookie 会话回放/热图,官方代码原样内联(ID 硬编码于组件);与 Vercel Analytics 同为无 Cookie 统计,不经 ConsentBanner 直接加载;隐私政策 §4(8 语言)已披露。

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
4. `src/lib/tools.ts` 的 `TOOL_GROUPS` 加卡片(进 /tools);要出现在页头下拉再标 `nav: true`。`sitemap.ts` 的 PATHS 加路径;
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
- `调研报告.md`、`docs/us-seo-content-plan.md`、`docs/seo-article-playbook.md`、`docs/plans/`:产品与 SEO 策划背景。写文章前读 playbook(要不要写、更新频率)
