# 受众界面三条修正 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 让打印练习纸的家长/教师、以及手机上的配图用户，能按自己的习惯做完一件事，而不被语音工具的布局挡住。

**Architecture:** 不换视觉，不改 `/` 这个语音工具的 URL。三处独立改动：描红的「空输入画什么、行高按什么选」抽成纯函数；录音按钮挪到文字框下面，手机上取消会盖住控件的粘性条；页头在窄屏收成菜单，Logo 去工具柜而不是麦克风页。

**Tech Stack:** Next.js、next-intl（8 个 `messages/*.json`）、Tailwind、Vitest。布局改动用浏览器走查，不写组件测试。

---

## 已定决策

1. **Logo 指向 `/tools`。** `/` 仍是语音工具，搜索和直链不变。点品牌名回到「所有工具」，不再把描红用户送进麦克风。桌面导航去掉单独的「工具 / Tool」链接（它和 Logo 一样指向 `/`，文案又像工具总入口）。语音工具留在「全部工具」下拉的第一项，标题用品牌名。
2. **录音只挂一处，紧挨文字框**（宽屏和手机都是）。底部条只留导入音频、历史、导出。手机（`< lg`）底部条不 `sticky`，避免盖住字号滑杆。`lg` 及以上保持粘性，左栏自己滚动，滑杆不在条下面。
3. **描红空输入时，预览和导出都画 `namesPlaceholder`。** 所见即所得。用户一打字就换成自己的名字。不另做「示例水印」状态。
4. **行高用三个年龄档，滑杆保留。** 学前大行 120、幼儿园 90、小学低年级 68。滑杆拖离档位后，没有按钮呈选中。行高数字改用已有的 `formatLength`（英语英寸，其余毫米），不再显示 `px`。
5. **打印纸生成器不动。** 默认 college ruled 对「横线纸」搜索是对的；幼儿园纸型已有 `/printable-paper/[kind]`。

## 非目标

不改测验、不改字母矩阵、不加新手引导、不把 13 个工具重做成「我是老师」分叉、不改配色和手写标题。

## 年龄档文案（8 语，键放在 `tracing`）

| locale | `gradeYoung` | `gradeMid` | `gradeOlder` |
| --- | --- | --- | --- |
| en | Pre-K | Kindergarten | Grade 2 |
| zh | 4–5 岁 | 5–6 岁 | 7–8 岁 |
| ja | 4–5歳 | 5–6歳 | 7–8歳 |
| ko | 4–5세 | 5–6세 | 7–8세 |
| es | 4–5 años | 5–6 años | 7–8 años |
| fr | 4–5 ans | 5–6 ans | 7–8 ans |
| de | 4–5 Jahre | 5–6 Jahre | 7–8 Jahre |
| pt | 4–5 anos | 5–6 anos | 7–8 anos |

英语用美国老师的说法。其余用年龄，避免把 “2nd grade” 硬翻进德日学制。

另加 `nav.menu`：en `Menu`，zh `菜单`，ja `メニュー`，ko `메뉴`，es `Menú`，fr `Menu`，de `Menü`，pt `Menu`。

---

### Task 1: 描红行与年龄档的纯函数

**Files:**

- Create: `src/lib/traceGrades.ts`
- Test: `src/lib/traceGrades.test.ts`

**Step 1: 写失败测试**

```ts
import { describe, expect, it } from "vitest";
import { gradeForBand, tracingLines, TRACE_GRADES } from "./traceGrades";

describe("tracingLines", () => {
  it("空输入用示例名", () => {
    expect(tracingLines("", "Emma\nLiam")).toEqual(["Emma", "Liam"]);
    expect(tracingLines("  \n  ", "小明")).toEqual(["小明"]);
  });

  it("有输入就丢掉示例", () => {
    expect(tracingLines("Noah\n\nOlivia", "Emma")).toEqual(["Noah", "Olivia"]);
  });
});

describe("gradeForBand", () => {
  it("正好落在档位上才算选中", () => {
    expect(gradeForBand(TRACE_GRADES[1].bandH)).toBe(TRACE_GRADES[1].id);
    expect(gradeForBand(100)).toBeNull();
  });
});
```

**Step 2: 跑测试，确认失败**

Run: `npx vitest run src/lib/traceGrades.test.ts`

Expected: FAIL，模块不存在。

**Step 3: 实现**

```ts
export const TRACE_GRADES = [
  { id: "young", bandH: 120 },
  { id: "mid", bandH: 90 },
  { id: "older", bandH: 68 },
] as const;

export type TraceGradeId = (typeof TRACE_GRADES)[number]["id"];

export function gradeForBand(bandH: number): TraceGradeId | null {
  return TRACE_GRADES.find((g) => g.bandH === bandH)?.id ?? null;
}

/** 空输入（含纯空白行）时用示例名，让预览和导出都有字。 */
export function tracingLines(input: string, sample: string): string[] {
  const lines = input.split("\n").map((l) => l.trim()).filter(Boolean);
  if (lines.length) return lines;
  return sample.split("\n").map((l) => l.trim()).filter(Boolean);
}
```

**Step 4: 再跑，确认通过**

Run: `npx vitest run src/lib/traceGrades.test.ts`

Expected: PASS。

**Step 5: Commit**（仅当用户要求提交时）

```bash
git add src/lib/traceGrades.ts src/lib/traceGrades.test.ts
git commit -m "feat: resolve tracing sample lines and grade row heights"
```

---

### Task 2: 描红页接上样张和年龄档

**Files:**

- Modify: `src/components/TracingGenerator.tsx`（`draw` 里组行的那段，约 76–79 行；行高控件约 205–211 行）
- Modify: `messages/en.json`、`zh.json`、`ja.json`、`ko.json`、`es.json`、`fr.json`、`de.json`、`pt.json` 的 `tracing` 对象

`/name-tracing` 和 `/cursive-worksheets` 都用这个组件。连笔页的 `defaultBandH={100}` 保持：初始没有年龄档呈选中，点档位才改行高。

**Step 1: 八个语言文件加上面的三个键。**

**Step 2: 绘制改用 `tracingLines`**

把：

```ts
const inputLines = drawNames.split("\n").map((l) => l.trim()).filter(Boolean);
const rows = inputLines.length ? inputLines : [""];
```

换成：

```ts
const rows = tracingLines(drawNames, t("namesPlaceholder"));
```

`if (!text) continue` 可以留着。示例名非空时每行都有字。

**Step 3: 行高控件**

在滑杆上面放三个按钮，样式抄 `PaperGenerator` 的纸型按钮（`rounded-lg border px-2.5 py-1.5 text-xs`，选中 `border-accent bg-accent/5 text-accent`）。

```tsx
const gradeLabels = { young: t("gradeYoung"), mid: t("gradeMid"), older: t("gradeOlder") };
const activeGrade = gradeForBand(bandH);

<div className="flex flex-wrap gap-1.5">
  {TRACE_GRADES.map((g) => (
    <button
      key={g.id}
      type="button"
      onClick={() => setBandH(g.bandH)}
      className={/* 选中 / 未选中，同纸型按钮 */}
    >
      {gradeLabels[g.id]}
    </button>
  ))}
</div>
```

滑杆旁的 `{bandH}px` 改成 `{formatLength(bandH, locale)}`。`locale` 组件里已经有。

**Step 4: 浏览器**

`/name-tracing`：打开即看到示例名描红，不是空横线。输入一个名字后示例消失。点「4–5 岁 / Pre-K」行变高，再拖滑杆后三个按钮都不再高亮。`/cursive-worksheets` 打开时三个按钮都不高亮（行高 100）。

**Step 5: Commit**（仅当用户要求提交时）

```bash
git add src/components/TracingGenerator.tsx messages/*.json
git commit -m "feat: show a tracing sample and age-based row heights"
```

---

### Task 3: 录音贴着文字框，手机操作条不再盖住控件

**Files:**

- Modify: `src/components/ToolWorkspace.tsx`

**Step 1: 挪录音**

`RecorderPanel` 从底部条剪下，放进左栏，紧跟 `TranscriptEditor`：

```tsx
<aside className="flex flex-col gap-5 lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto lg:pr-1">
  <TranscriptEditor />
  <RecorderPanel />
  <StylePanel />
</aside>
```

底部条只留 `AudioImportPanel`、历史按钮、`ExportBar`。只保留这一份 `RecorderPanel`，不要两处各挂一个。

**Step 2: 粘性只在宽屏**

底部条的 class 从 `sticky bottom-4` 改为 `lg:sticky lg:bottom-4`。`z-30`、`glass-bar`、内边距不动。

**Step 3: 浏览器**

桌面 `/`：文字框下面就是「点击说话」，底部条仍是导入 / 历史 / 导出。把视口缩到 390 宽：往下滚过字号滑杆时，底部条停在文档流里，不浮在滑杆上。说话按钮在滑杆上方、文字框下方，不用滚到底才能说。

**Step 4: Commit**（仅当用户要求提交时）

```bash
git add src/components/ToolWorkspace.tsx
git commit -m "fix: keep the mic next to the text and stop the mobile bar covering controls"
```

---

### Task 4: 窄屏页头菜单，Logo 去工具柜

**Files:**

- Create: `src/components/SiteNav.tsx`（client）
- Modify: `src/components/SiteHeader.tsx`
- Modify: 8 个 `messages/*.json` 的 `nav.menu`

`SiteHeader` 继续做服务端翻译。它把译好的分组传给 `SiteNav`。

**Step 1: `SiteNav`**

Props：`brand`、`groups`（现有 `NavDropdown` 的结构）、`blogLabel`、`aboutLabel`、`menuLabel`。

- Logo 链接 `href="/tools"`。品牌名加 `whitespace-nowrap`。
- `md` 及以上：现在的「全部工具」下拉、博客、关于、`LocaleSwitch`。不要再放指向 `/` 的「工具」链接。
- `md` 以下：只显示 `LocaleSwitch` 和一个按钮（`aria-expanded`，文案 `menuLabel`）。点开后在顶栏下面展开一块白底面板：分组标题 + 工具链接，然后博客、关于。点链接或再点按钮都关上。不要用悬停展开（手指没有悬停）。

桌面下拉继续用 `NavDropdown`。窄屏面板不要复用它的 `onMouseEnter`。

**Step 2: `SiteHeader` 换成渲染 `SiteNav`，Logo 从 header 里移进 `SiteNav`，避免两个 Logo。**

**Step 3: 浏览器**

390 宽：顶栏一行放得下 Logo、语言、菜单，品牌名不断成两行。打开菜单能进描红和语音工具。点 Logo 到 `/tools`，不是 `/`。1440 宽：没有汉堡按钮；导航是「全部工具」、博客、关于；下拉里第一项仍是语音工具。

**Step 4: Commit**（仅当用户要求提交时）

```bash
git add src/components/SiteNav.tsx src/components/SiteHeader.tsx messages/*.json
git commit -m "fix: send the logo to the tool hub and collapse nav on small screens"
```

---

### Task 5: 走查

桌面 1440 与手机 390，各做一遍：

1. `/` 或 `/zh`：说话在文字框下；手机滚到字号时操作条不盖住滑杆；导出仍可点。
2. `/name-tracing`：一打开纸上有示例名；改一个名字后示例没了；年龄档和滑杆互相让位；PDF 按钮还在。
3. `/cursive-worksheets`：打开时年龄档都不高亮。
4. `/tools`：Logo 进来的就是这一页。从描红点 Logo 也到这里。
5. `/printable-paper`：默认仍是 college / 横线，确认没被捎带改掉。

Run: `npx vitest run src/lib/traceGrades.test.ts`

Expected: PASS。
