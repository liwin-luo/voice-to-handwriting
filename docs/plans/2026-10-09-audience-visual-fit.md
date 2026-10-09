# 受众视觉四块修正 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 让家长在工具柜里认得出「给孩子印」，让配图用户看得见字体和纸，让工具名能扫读，让测验结果是一张手写卡。

**Architecture:** 不改任何工具 URL，不改页头下拉的分组和条目，不改配色、不装动画库。四块独立改动：`/tools` 每组一个带纸样的主入口、其余收成名单；语音工作台的字体和纸改成样本按钮，窄屏把纸放到录音下面；工具页 H1 改无衬线；测验去掉封面空按钮和 emoji，结果用性格字体写档案名。

**Tech Stack:** Next.js、next-intl（8 个 `messages/*.json`）、Tailwind、Vitest。布局用浏览器走查，不写组件测试。

---

## 执行修正（2026-10-09）

1. 字体按钮不能共用一个短词。西文字体在中文页上没有汉字，会全部落到楷体，看起来一模一样。按钮按字体的文字系统取词：西文 `tool.sampleLatin`，汉字 `tool.sampleHan`（你好），假名 `tool.sampleKana`（あい），谚文 `tool.sampleHangul`（안녕）。工具柜缩略图仍用 `tools.sampleWord`，因为那张纸用的是该语言的默认字体。
2. 宽屏导出条单独占网格的下一整行，不进左侧 320px 栏。窄屏仍排在纸和「更多」之间。
3. 测验从第一题开始时，不要在首屏把焦点抢到题干上（只在之后换题时移动焦点）。`tests/e2e/quiz.spec.ts` 去掉「开始」点击；重做后断言第一题，而不是开始按钮。

## 已定决策

1. **分组和 URL 不动。** `TOOL_GROUPS` 仍是「写一张 / 练习纸 / 玩玩」。页头下拉仍用 `navGroupsFor`。只改 `/tools` 的呈现。
2. **每组一个主入口。** 写一张 → `/`；练习纸 → `/name-tracing`；玩玩 → `/handwriting-personality-quiz`。主入口是一张横卡：左边纸样缩略，右边名称加现有的一句描述。同组其余工具是一行一个名字的链接，不再用三列等大卡片，也不再重复那段 meta 描述。
3. **纸样是 CSS，不是图片。** 缩略图用 `PAPERS` 里已有的横线/信纸背景，上面用该语言的默认手写字体写一个短词。装饰性，`aria-hidden`，链接文字才是无障碍名称。
4. **字体和纸在语音页用样本选，不下拉。** 字体按钮里的字就是该字体写的短词（沿用字体在语言里的排序，15 个都露出来，不再藏进「更多」）。纸是 6 个预设的小纸样；「自定义」仍是选中后展开的那一块，不做成第七张缩略图。医生字页的折叠结构不动：仿真度仍在最上面，字体和纸仍在折叠里，但折叠打开后同样是样本而不是 `<select>`。
5. **窄屏语音页的顺序对齐练习纸。** `< lg`：文字框、录音、字体样本、纸样 → 纸预览 → 导出条 → 字号/墨色/「更像手写」收在「更多」。`lg` 及以上保持现在的左栏全开、右栏纸、底条粘住。医生字页不套这套顺序。
6. **任务标题不用手写体。** 工具页、首页、工具柜、测验、FAQ、模板库的 H1 改为 `text-3xl font-semibold tracking-tight text-zinc-950 md:text-4xl`。H1 的文字不变。Logo、纸面上的字、博客索引标题保持手写体。
7. **测验打开就是第一题。** 删掉居中的「开始」空卡片。重做回到第一题。三列笔迹选项保持对称。结果卡左对齐：档案名用 `PROFILE_FONT` 大字写出来，下面是副题和维度条。下载 PNG 仍截这块卡。`emoji` 字段从类型、8 语内容和测试里删除。

## 非目标

不换字体族、不装 Framer Motion、不加磁吸按钮或渐变背景、不改字母表网格、不改博客三列、不改页头、不改练习纸 `PracticeLayout`、不改配色、不改 SEO 文案和 URL。

## 短词文案（8 语，键放在 `tools`）

缩略图和字体样本共用。纸样上只显示第一个词。

| locale | `sampleWord` |
| --- | --- |
| en | Hello |
| zh | 你好 |
| ja | こんにちは |
| ko | 안녕하세요 |
| es | Hola |
| fr | Bonjour |
| de | Hallo |
| pt | Olá |

另加 `sheet.moreSettings` 已有，语音页窄屏折叠沿用这一句，不新造键。

---

### Task 1: 主入口是数据，不是页面里写死

**Files:**

- Modify: `src/lib/tools.ts`
- Test: `src/lib/tools.test.ts`

**Step 1: 写失败测试**

在 `tools.test.ts` 增加：

```ts
import { FEATURED_HREF, toolGroupsFor } from "./tools";

it("每组的主入口都在该组、且中英都在", () => {
  for (const locale of ["en", "zh"]) {
    for (const group of toolGroupsFor(locale)) {
      const featured = FEATURED_HREF[group.labelKey];
      expect(group.tools.some((t) => t.href === featured)).toBe(true);
    }
  }
});
```

**Step 2: 跑测试，确认失败**

Run: `npx vitest run src/lib/tools.test.ts`

Expected: FAIL，`FEATURED_HREF` 未导出。

**Step 3: 实现**

在 `TOOL_GROUPS` 上方：

```ts
/** /tools 每组的大卡。必须是该组 tools 里的 href。页头下拉不使用。 */
export const FEATURED_HREF: Record<string, string> = {
  groupWrite: "/",
  groupPractice: "/name-tracing",
  groupFun: "/handwriting-personality-quiz",
};
```

**Step 4: 再跑，确认通过**

Run: `npx vitest run src/lib/tools.test.ts`

Expected: PASS。原有「页头只留常用入口」断言不变。

---

### Task 2: `/tools` 改成主卡 + 名单

**Files:**

- Create: `src/components/ToolLane.tsx`（服务端组件，无 `"use client"`）
- Modify: `src/app/[locale]/tools/page.tsx`
- Modify: `messages/en.json` 以及 `zh.json` `ja.json` `ko.json` `es.json` `fr.json` `de.json` `pt.json` 的 `tools` 对象
- Modify: `docs/ARCHITECTURE.md` 页面地图 `/tools` 那一行

`ToolLane` 接收一组工具、主入口 href、组标题、样词、样词用的 `font-family`。

主卡：`grid grid-cols-1 sm:grid-cols-[148px_minmax(0,1fr)]`，白底、`rounded-2xl`、`border-zinc-200`。左侧纸样高约 112px，背景用 `getPaper("ruled").background`（玩玩组用 `letter`），内写 `sampleWord`，`aria-hidden`。右侧是工具名（无衬线、`text-lg font-semibold`）和现有 `meta.*.description` 一句。整张卡是一个 `Link`。

名单：主入口以外的工具，`divide-y border-t`，每行一个 `Link`，只有名称，没有描述，没有卡片阴影。`enOnly` 继续由 `toolGroupsFor` 滤掉，本组件不再滤。

`/tools` 的 H1 在 Task 4 一起改。这一步只换列表。

**浏览器**

1440：三组各一张横卡，下面是名字列表，没有三列等大卡片。390：纸样在上、文字在下，不横滚。点 Logo 仍到 `/tools`。非英文不出现 `/letter-tracing`。点主卡进描红、语音、测验。

---

### Task 3: 语音页字体和纸改成样本，窄屏先看见纸

**Files:**

- Modify: `src/components/StylePanel.tsx`（字体 `<select>` 与纸张 `<select>` 两处，约 32–79 行）
- Modify: `src/components/ToolWorkspace.tsx`（约 95–114 行的栅格）

**字体样本**

`fontOrder(locale)` 的每个 id 一个 `button`，`type="button"`。按钮文字是 `t("sampleWord")` 所在命名空间——短词放在 `tool.sampleWord`，8 语与 Task 2 的 `tools.sampleWord` 用同一组词（两处都写，避免 client 组件去读 `tools` 命名空间时和页面耦合）。选中：`border-accent bg-accent/5`。未选中：`border-zinc-200`。`aria-pressed`。可见文字就是样本，`aria-label` 用已有的 `t(\`fonts.${id}\`)`。

格子：`grid grid-cols-3 gap-1.5`。字号 `text-lg leading-none`，字用该项 `FONTS` 的 `css`。

**纸样**

`PAPERS` 每项一个按钮，`h-14`，`background` 直接用预设的 `background`（缩到背景尺寸会密，用 `backgroundSize` 不必改数据）。选中加 `ring-2 ring-accent`。`aria-label` 用已有的 `t(\`papers.${id}\`)`。自定义仍是现在的展开块，按钮文案用已有的 `t("papers.custom")`，不画假纸。

医生字布局：把这两块样本放进现有的 `fontFields` / `paperFields`，折叠行为不变。

**窄屏顺序（仅 `layout === "write"`）**

仿 `PracticeLayout` 的 `contents` + `order`：

- `order-1`：`TranscriptEditor`、`RecorderPanel`、字体样本、纸样
- `order-2`：`PaperView`
- `order-3`：底栏（导入、历史、导出），窄屏不 sticky（现状已是 `lg:sticky`）
- `order-4`：字号滑杆、墨色、`<details>`「更像手写」。窄屏默认收起，用一个 `btn-ghost` 切换，文案 `useTranslations("sheet")("moreSettings")`。`lg` 上这个按钮 `hidden`，控件始终展开，并回到左栏。

`lg` 栅格仍是 `lg:grid-cols-[320px_auto]`，左栏 `lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto`。

`layout === "doctor"` 保持现在的单列左栏顺序，不套 order。

**浏览器**

桌面 `/`：字体是三列手写词，纸是一排小纸，选中态明显；右栏仍是纸；底条粘住。390：不用滚过字号就能看见纸；「更多」打开后才有字号和墨色；说话仍在文字框下。`/doctor-handwriting-generator`：仿真度仍在折叠外，字体纸张仍在折叠内。`/cursive` 跟着语音页的新选择器，因为它共用 `ToolWorkspace`。

---

### Task 4: 任务标题改无衬线

**Files:**

- Modify: 下面这些页面里 H1 的 `className`，只改这一处，标题字符串不动

`src/app/[locale]/page.tsx`
`src/app/[locale]/tools/page.tsx`
`src/app/[locale]/faq/page.tsx`
`src/app/[locale]/templates/page.tsx`
`src/app/[locale]/cursive/page.tsx`
`src/app/[locale]/cursive-text-generator/page.tsx`
`src/app/[locale]/cursive-font-generator/page.tsx`
`src/app/[locale]/cursive-worksheets/page.tsx`
`src/app/[locale]/cursive-alphabet/page.tsx`
`src/app/[locale]/name-tracing/page.tsx`
`src/app/[locale]/printable-paper/page.tsx`
`src/app/[locale]/printable-paper/[kind]/page.tsx`
`src/app/[locale]/printable-handwritten-letters/page.tsx`
`src/app/[locale]/handwriting-page-calculator/page.tsx`
`src/app/[locale]/handwriting-repeater/page.tsx`
`src/app/[locale]/daily-cursive-handwriting-practice/page.tsx`
`src/app/[locale]/name-coloring/page.tsx`
`src/app/[locale]/handwriting-workbook-generator/page.tsx`
`src/app/[locale]/word-work/page.tsx`
`src/app/[locale]/writing-practice/page.tsx`
`src/app/[locale]/handwriting-personality-quiz/page.tsx`
`src/app/[locale]/doctor-handwriting-generator/page.tsx`

把 `font-hand text-4xl leading-none md:text-5xl`（个别页没有 `md:text-5xl`）换成：

```tsx
className="text-3xl font-semibold tracking-tight text-zinc-950 md:text-4xl"
```

不改：`src/app/[locale]/blog/page.tsx` 的 H1、`SiteNav` 里的品牌名、`PaperView` 空状态。

不抽公共组件。这些 H1 旁边的 intro 结构不一样，抽一层只会多一个只包 class 的文件。

**浏览器**

`/name-tracing` 与 `/`：标题是界面无衬线，Logo 仍是手写。`/blog`：标题仍是手写。

---

### Task 5: 测验打开即选题，结果是手写档案名

**Files:**

- Modify: `src/components/HandwritingQuiz.tsx`（`useState(-1)`、`retake`、`step === -1` 分支、结果卡约 169–184 行）
- Modify: `src/content/quiz.ts`（`ProfileContent.emoji` 与 8 语共 48 处 `emoji`）
- Modify: `src/lib/quiz.test.ts`（删掉 `expect(p.emoji.length)` 那一行）
- Modify: `docs/ARCHITECTURE.md` 测验那一行

**封面**

`useState(0)`。删除 `step === -1` 的卡片。`retake` 改为 `setStep(0)`。`start` 文案不再使用，留在 `quiz.ts` 里，避免 8 语内容大删。页上科学段已有免责声明，题目卡不再居中。

三列选项的 DOM 和 `md:grid-cols-3` 不动。

**结果卡**

删掉 emoji 的 `<span>`。档案名：

```tsx
<p
  className="text-4xl leading-none text-zinc-900 md:text-5xl"
  style={{ fontFamily: FONT_STACKS[fontKey(PROFILE_FONT[result.profile])] }}
>
  {profile.name}
</p>
```

`fontKey` 只是把 `FontId` 映射到现有 `FONT_STACKS` 的键：`patrickhand→print`、`indieflower→messy`、`kalam→neat`、`caveat→caveat`、`cedarvillecursive→everyday`、`dancingscript→fancy`。不新加字体。副题、维度条、免责、站点一行保持左对齐。`cardRef` 仍包着这块，下载图里是手写档案名。

**数据**

`ProfileContent` 去掉 `emoji`。8 个语言对象里的 `emoji` 行全部删除。测试改为只断言 `name`、`points`、`growth`。

**Step: 跑测试**

Run: `npx vitest run src/lib/quiz.test.ts`

Expected: PASS。

**浏览器**

`/handwriting-personality-quiz`：打开就是三张笔迹，没有单独的开始按钮。选完得到左对齐的手写档案名，没有 emoji。下载仍弹出一张图。重做回到第一题。三列在 1440 上仍是横排，390 上仍是竖排。

---

### Task 6: 走查

桌面 1440 与手机 390：

1. `/tools`：三张主卡 + 名单；Logo 进来就是这页。
2. `/`：样本选字体和纸；390 上纸在导出条上面，字号在「更多」里。
3. `/name-tracing`：标题无衬线；年龄档和预览顺序与改前一致。
4. `/blog`：标题仍是手写体。
5. `/handwriting-personality-quiz`：第一题即三张笔迹；结果无 emoji。
6. `/doctor-handwriting-generator`：仿真度仍在折叠外面。

Run: `npx vitest run src/lib/tools.test.ts src/lib/quiz.test.ts`

Expected: PASS。
