# 通用手写练习纸生成器 `/handwriting-worksheet-generator` 设计(2026-10-14)

## 为什么做

2026-10-14 的 Google Keyword Planner 关键词研究(72 词)盘点出:站内 worksheet 类工具全是细分场景,而通用簇没有落地页——

| 簇 | 月量合计 | 现状 |
|---|---|---|
| cursive worksheets | ~36.7 万 | 11 个页面,覆盖充分 |
| **handwriting worksheets** | **~7.8 万** | **零落地页(本设计补的洞)** |
| numbers in cursive | ~1 万 | 零覆盖,另行待排期(内容规划 §二十四) |

搜 "handwriting worksheets / handwriting practice sheets" 的人要的是:任意单词或句子 → 印刷体描红练习纸。现有页面意图错配:name-tracing 只管姓名,word-work 绑定拼写活动,sentence-practice 是成人单句五行纸,cursive-worksheets 是连笔体。

## 同簇分工(§2.5 防互搏)

- `/name-tracing`:姓名,name tracing generator;
- `/cursive-worksheets`:连笔词表,cursive worksheets;
- `/word-work`:拼写词表 + 缺字母活动,word work worksheet generator;
- `/handwriting-sentence-practice`:成人单句,五行纸;
- **本页**:通用印刷体练习纸,handwriting worksheet generator / printable handwriting worksheets。页内互链上述邻居。

## 形态(复用为主,新代码最小化)

复用 `TracingGenerator`(与 name-tracing / cursive-worksheets / number-tracing 同一组件):

- `defaultFontId(locale)`:随语言给默认字体(CJK 用户可练本国文字),印刷体默认 Patrick Hand;
- `rowLabels="grades"`(默认):三线格 + Pre-K / Kindergarten / Grade 2 三档行高——美国 "handwriting worksheet" 的经典形态,与 cursive-worksheets 的大/中/小行区分开;
- `defaultBandH={90}`(Kindergarten 档起步);
- `initialText`:各语言的星期词表(新 lib 函数 `worksheetStarterLines`,服务端按 locale 决定,沿 name-tracing / sentence-practice 先例);
- `sampleText` 同 starter:清空输入时纸上画星期词表,占位符也有内容提示;
- `inputLabel`(新增可选 prop):输入框标签从 "Names (one per line)" 换成 "Words or sentences (one per line)";
- `fileStem="handwriting-worksheet"`;`?words=` 预填沿用 tracingPrefill;
- 不做 presets(YAGNI:词表本身可编辑,number-tracing 的 1–10/1–20 之外的第三处预设没有增量价值)。

## 页面结构

照抄工具页模式:`generateStaticParams` ×8 + `pageMetadata` + H1/intro + 生成器 + ShareBar + seoText(诚实口径:开源字体非教材体、浏览器本地、无水印)+ 相关工具链接段(relatedLead + nav 复用标签:姓名描红/连笔描红/可打印纸)+ `ToolFaq`。

FAQ(`HANDWRITING_WORKSHEET_FAQS`,en+zh):怎么做、用的什么字体、能练名字吗(→/name-tracing)、免费吗。**zh 不链 /letter-tracing**(en-only 路由,ToolFaq 不过滤 enOnly)。

## 接线清单

1. `src/lib/practicePresets.ts`:`worksheetStarterLines(locale)`;
2. `src/components/TracingGenerator.tsx`:加 `inputLabel?: string` 可选 prop;
3. `src/app/[locale]/handwriting-worksheet-generator/page.tsx`:新路由;
4. `src/lib/tools.ts`:练习纸分组加卡片(navKey/metaKey 均为 `worksheet`,不进页头下拉);
5. `src/content/related.ts`:`TOOL_LABEL_KEY` 加路径;
6. `src/content/pageFaqs.ts`:FAQ;
7. `src/app/sitemap.ts`:PATHS 加路径;
8. `messages/*.json` ×8:`nav.worksheet`、`meta.worksheet.{title,description}`、`worksheet.{title,intro,inputLabel,seoTitle,seoText,faqTitle,relatedLead}`。

## 配套文章(下一内容周期,§3.1)

`handwriting-worksheets`(en,工作标题):how-to 意图「怎么用生成器排一周的练习纸」,不抢工具页主词;角色动笔前定。已登记 `us-seo-content-plan.md` §二十四。

## 红线

字体写明开源手写体、不是教材规范体;不碰 HWT / D'Nealian / Zaner-Bloser 商标;不碰「作业伪装」话术。

## 验收

`npm run lint` + `npx tsc --noEmit` + `npm run test` 三绿;en 与 zh 目检(预填、导出、FAQ 链接不 404);view-source 查 canonical/hreflang。
