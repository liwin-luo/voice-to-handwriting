# Handwriting Personality Quiz 设计文档

> 日期:2026-10-08
> 前置调研:见 `2026-10-08-handwriting-analysis-quiz-research.md`(用户已确认定位:娱乐向视觉 quiz + 练字转化闭环)

## 1. 目标与非目标

**目标**:一个 2 分钟完成的看图选择题 quiz("哪张最像你写的 m?"),结果页输出娱乐向人格档案 + 可分享结果卡,并把每个维度转化为练字建议、直链站内生成器(/writing-practice、/cursive-worksheets、/name-tracing、/printable-paper、/word-work)。承接 "handwriting personality quiz"(估算 2K–5K/月)与 "what does your handwriting say about you quiz"(1K–3K/月)词簇。

**非目标(YAGNI)**:不做 AI 上传分析;不做儿童发育评估/任何医疗暗示;不做严肃 graphology 断言;MVP 不做账号、后端、付费。

## 2. 合规口径(红线,不可妥协)

- 结果与文案全程 for-entertainment 定位;页脚固定免责:"This quiz is for fun and is not a scientific or psychological assessment."
- 页内一节 "Is handwriting analysis real?":明确科学共识(graphology 无预测效度,引 Neter & Ben-Shakhar 1989 meta 分析;区分 forensic document examination),落点是"但我们能帮你把字练好"。
- 全文限定词(could suggest / might / for fun),不出现招聘、情感兼容、诊断类表述。

## 3. 内容体系

### 3.1 维度与计分(5 维度 × 12 题)

每题三选一,每答案对其维度计 0/1/2 分;维度分 = 累计 0–6,映射三档(低/中/高)。

| 维度 | 题数 | 特征 | 结果档示意 |
| --- | --- | --- | --- |
| Social Energy | 3 | slant(右倾/直立/左倾)、字尾开放度 | 外向 expressive ↔ 内省 private |
| Expressiveness | 2 | 字号大小、笔画装饰性 | 大胆醒目 ↔ 低调务实 |
| Personal Space | 2 | 词间距、行距 | 独立需要空间 ↔ 亲近连接 |
| Focus & Structure | 3 | 基线走向、整齐度、i 点位置 | 专注有条理 ↔ 灵活随性 |
| Pen Pressure & Pace | 2 | 自述题(用力程度、书写速度) | 强投入快节奏 ↔ 轻松从容 |

前 10 题为看图题(CSS 渲染字母样张),最后 2 题为自述题(覆盖无法视觉化的 pressure/pace,ProProfs 已验证该混合形态)。

### 3.2 人格档案(6 种)

由"最高维度组合"确定档案(确定性映射,同答案同结果):

| 档案 | 主导维度 | 一句话 |
| --- | --- | --- |
| The Balanced Writer | 无突出项 | 均衡可靠,Most common |
| The Bold Expressive | Expressiveness + Social Energy | 字如其人,存在感强 |
| The Precision Planner | Focus + Personal Space | 细节控,秩序感 |
| The Free Spirit | Social Energy 低 + Focus 低 | 随性创意派 |
| The Quiet Steady | 内省 + 从容 pace | 沉稳耐心的倾听者 |
| The Quick Spark | 快 pace + 高 energy | 点子多、节奏快 |

每个档案输出:称号 + emoji + 3 条 "what this suggests"(限定词语气)+ 1 条 "growth edge" + 2–3 条练字 CTA。

### 3.3 练字转化映射(差异化闭环)

维度档位 → 练字建议 → 直链:

- Focus 低(基线歪)→ 三线格练习 → /printable-paper
- Expressiveness 失控(忽大忽小)→ 行高可调描红 → /name-tracing 或 /writing-practice
- 词距过密/过疏 → 间距练习(Word Work 分词卡)→ /word-work
- 想让 slant 更连贯通顺 → cursive 课程表 → /cursive-worksheets、/cursive
- 通用 "neater handwriting" → /writing-practice

### 3.4 字母样张渲染

不用图片素材:用站内已有 Google 字体(FontStylesheets 已加载的 print/cursive 字体)+ CSS 变换生成选项样张(skew 模拟 slant、letter-spacing、font-size、Cedarville Cursive vs print 字体对比、line-height/position 模拟基线)。清晰、可主题化、零资源生产、天然适配深浅色。仅覆盖拉丁字母(ja/ko 不做本页,见 §5)。

## 4. UX 与交互

- **形态**:分步向导(一步一题),顶部进度条,可回退;键盘可达(方向键/数字键),step 切换用 aria-live;移动优先;完成后结果页替换题目区。
- **结果页**:档案卡(称号+emoji+5 维度条形图)+ 两个按钮(Download image / Share)+ 分维度建议卡(每卡带 CTA 链接)+ retake。分享卡用 `html-to-image`(已有依赖)导出 PNG,卡内带站名水印(传播闭环)。
- **状态**:纯组件 state,无网络请求、无存储(与站点隐私姿态一致);MVP 不接 /history。
- 复用现有 `ShareBar`、`FloatingShare`、`rise` 动画风格;respects prefers-reduced-motion。

## 5. i18n 与 SEO

- **语言**:launch 仅英文(en),采用博客已验证的 registry 模式——`src/content/quiz.ts` 内容类型为 `Partial<Record<Locale, QuizContent>>`,sitemap/静态参数/hreflang 只输出有内容的语言(与博客一致)。理由:内容为拉丁字母视觉题,对 ja/ko 语义不成立;先验证流量再扩。**页面 chrome(title/intro/disclaimer)也随 en-only,避免混合语言。**
- **URL**:`/handwriting-personality-quiz`(主攻意图最纯、竞品最弱的词)。
- **页面骨架**:沿用工具页约定——`src/app/[locale]/handwriting-personality-quiz/page.tsx`(generateStaticParams 仅 en、`meta.quiz` 命名空间、`buildAlternates`)+ `src/components/HandwritingQuiz.tsx`(client)。
- **On-page**:title "Free Handwriting Personality Quiz – What Does Your Handwriting Say About You?";H1 + 首屏 CTA;FAQ 区对齐 PAA(8–10 条,含 "Is handwriting analysis accurate?" 承接怀疑论词);JSON-LD: FAQPage + WebApplication(照抄现有 word-work 的 FAQ JSON-LD 做法);进 sitemap 与导航工具下拉。
- **内链**:从 how-to-improve-handwriting-adults、cursive 系列文章互链;结果页 CTA 反向打通工具页。

## 6. 技术要点与错误处理

- 计分与档案解析为纯函数(`scoreQuiz(answers): QuizResult`),组件只做渲染;字体加载失败时选项样张退化为系统字体仍可读(选项带文字标签,如 "Rounded & open",不依赖纯视觉)。
- 动画仅 transform/opacity(遵循站内现有做法);无布局抖动(遵守 perf 红线)。
- Sentry/Vercel Analytics 沿用现有全局配置,无页面级埋点(MVP)。

## 7. 测试

- **vitest 单测**:scoreQuiz 的计分边界(全 0、全满、并列最高维度)、档案映射确定性、练字 CTA 映射完整性(每个维度档位都有非空建议+合法内链)。
- **Playwright**:12 题走通 → 结果档案渲染;回退按钮;免责声明与 "Is handwriting analysis real?" 段落可见;分享卡按钮触发。
- **a11y**:键盘走查 + aria(合并进 Playwright 断言)。

## 8. 范围与里程碑

- **MVP(一次交付)**:12 题 + 6 档案 + 结果卡下载/分享 + 练字 CTA 闭环 + 免责/科学段落 + FAQ(JSON-LD)+ sitemap/nav/hreflang + 单测/E2E。
- **后续候选**(不在本次):signature analysis 独立页(另一词簇)、知识型 myth-vs-science quiz(博客形态)、多语言版、/history 存档、Pinterest 专属结果卡尺寸。

## 9. 遗留决策(默认按推荐执行,可改)

| # | 决策 | 推荐 |
| --- | --- | --- |
| 1 | en-only 还是 ×8 语言 | en-only(registry 模式,内容语义决定) |
| 2 | 结果是否入 /history | MVP 不做 |
| 3 | 档案命名/emoji 终稿 | 实现时按 §3.2 草案微调 |
| 4 | 分享卡是否带水印 | 带(品牌传播) |
