# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke.spec.ts >> 输入文字后渲染手写页并可导出
- Location: tests/e2e/smoke.spec.ts:3:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('.paper').first()
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" locator('.paper').first() with timeout 5000ms
  - waiting for locator('.paper').first()

```

```yaml
- banner:
  - link "声音转手写":
    - /url: /zh
  - navigation:
    - link "工具":
      - /url: /zh
    - link "模板":
      - /url: /zh/templates
    - link "历史":
      - /url: /zh/history
    - link "博客":
      - /url: /zh/blog
    - link "关于":
      - /url: /zh/about
    - combobox "Language":
      - option "中文" [selected]
      - option "EN"
      - option "日本語"
      - option "한국어"
      - option "Español"
- main:
  - heading "声音转手写" [level=1]
  - paragraph: 说一段话,一键变成手写文稿 —— 贺卡、书信、手账与文案配图
  - img
  - text: 浏览器本地处理,文字不上传
  - complementary:
    - heading "文字(可修改识别错字)" [level=2]
    - text: 0 字
    - textbox "说话内容会出现在这里,也可以直接粘贴或输入": 你好世界,这是一段测试文字。 第二行内容 hello world 123。
    - button "左对齐":
      - img
    - button "居中":
      - img
    - button "段落首行缩进":
      - img
    - heading "笔迹" [level=2]
    - text: 字体
    - combobox "字体":
      - option "马善政 · 楷" [selected]
      - option "龙藏 · 行"
      - option "柳建毛草 · 草"
      - option "Caveat · 英文"
    - text: 字号 28px
    - slider "字号 28px": "28"
    - text: 仿真度 60%
    - slider "仿真度 60%": "0.6"
    - button "换一种笔迹":
      - img
      - text: 换一种笔迹
    - heading "纸面" [level=2]
    - text: 纸张
    - combobox "纸张":
      - option "白纸"
      - option "横线" [selected]
      - option "方格"
      - option "信纸"
    - text: 导出水印
    - switch [checked]
    - text: 墨色
    - button "蓝黑"
    - button "纯黑"
    - button "朱红"
  - paragraph: 说一段话,落笔成字
  - paragraph: 点击下方「点击说话」,或直接在左侧文字框输入
  - button "试试示例"
  - img
  - button "点击说话":
    - img
    - text: 点击说话
  - paragraph: 当前浏览器不支持语音识别,推荐 Chrome / Edge,或直接在右侧输入文字。
  - button "导入音频文件":
    - img
    - text: 导入音频文件
  - combobox "快速:下载约 80MB;高质量:约 250MB,中文更准。模型仅下载一次,音频不离开设备":
    - option "快速" [selected]
    - option "高质量"
  - button "导出 PNG" [disabled]:
    - img
    - text: 导出 PNG
  - button "导出 PDF" [disabled]:
    - img
    - text: 导出 PDF
  - text: 广告位 · 配置 NEXT_PUBLIC_ADSENSE_CLIENT 后生效 语音识别由浏览器提供(Web Speech API),推荐桌面版 Chrome / Edge;文字内容不会上传服务器。
  - link "手写贺卡教程与灵感":
    - /url: /zh/blog
- contentinfo:
  - navigation:
    - link "工具":
      - /url: /zh
    - link "博客":
      - /url: /zh/blog
    - link "关于":
      - /url: /zh/about
    - link "隐私政策":
      - /url: /zh/privacy
    - link "使用条款":
      - /url: /zh/terms
    - link "联系我们":
      - /url: /zh/contact
  - paragraph: © 2026 声音转手写
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test("输入文字后渲染手写页并可导出", async ({ page }) => {
  4  |   await page.goto("/zh");
  5  |   await page
  6  |     .getByPlaceholder(/说话内容会出现在这里/)
  7  |     .fill("你好世界,这是一段测试文字。\n第二行内容 hello world 123。");
> 8  |   await expect(page.locator(".paper").first()).toBeVisible();
     |                                                ^ Error: expect(locator).toBeVisible() failed
  9  |   await expect(page.locator(".paper [data-idx]").first()).toBeVisible();
  10 |   await expect(page.getByRole("button", { name: "导出 PNG" })).toBeEnabled();
  11 | });
  12 | 
  13 | test("英文版首页可用", async ({ page }) => {
  14 |   await page.goto("/en"); // en 为默认语言,归一到 /
  15 |   await expect(page.getByRole("heading", { name: "Voice to Handwriting" })).toBeVisible();
  16 |   await expect(page.getByRole("button", { name: "Export PNG" })).toBeDisabled(); // 无文字时禁用
  17 | });
  18 | 
```