# 描红生成器:教学字体 + 笔画引导 设计文档

日期:2026-10-09。背景:竞品调研("cursive worksheet generator" 等词)显示两个稀缺功能——
D'Nealian 类教学字体与笔画引导(起点标记/箭头),全市场各仅 1-2 家支持。

## 决策

### 1. 教学字体 → Sacramento(OFL 1.1)

- **Learning Curve(Blue Vinyl)被否决**:README 明确"商用需联系作者授权",与本站
  全 OFL 字体库的标准冲突(站点含 AdSense,属商用)。dafont 下载包已验证该条款。
- **选定 Sacramento**(Astigmatic, SIL OFL 1.1,Google Fonts 仓库直出):单线(monoline)、
  倾斜、字母连续 Entry/Exit 笔画相连——形态上最接近 D'Nealian cursive 的教学连续笔画,
  且单线字形比装饰性 script 更适合描红。
- 接线:`fonts-src/Sacramento-Regular.ttf` + `OFL-sacramento.txt`;`scripts/fonts.mjs` 新增 job
  (支持 argv 过滤,避免全量重切);`useEditorStore.FONTS`、`localeDefaults` 的
  ALL_FONT_IDS/LATIN_FONT_IDS、`fonts.ts` ASYNC_FONT_CSS 各加一条;`/cursive-worksheets`
  默认字体 cedarvillecursive → sacramento。

### 2. 笔画引导(起点点 + 初始方向箭头)

- **构建期提取,运行时零依赖**:站点字体只有切片 woff2,运行时拿不到字形路径;引入
  opentype.js 运行时解析(WASM woff2 解码)过重。改为 `scripts/glyph-starts.mjs`
  (devDependency: opentype.js)解析 fonts-src 里的 7 个拉丁字体 TTF,对 A-Za-z 提取:
  - 第一条轮廓的首点(≈ 落笔点),字体单位坐标;
  - 初始切线方向角(度,字体坐标系 y 向上);
  - upm(含 `Caveat[wght]`/`DancingScript[wght]` 可变字体,取默认实例轮廓)。
  输出 `src/lib/glyphStarts.generated.ts`(~10KB),静态导入。
- **画布渲染**(`TracingGenerator`):开关开启时,逐字符累计 `measureText(ch).width` 定位
  (忽略 kerning,对连笔字体误差可忽略),`scale = fontSize / upm`,画:
  绿色落笔点(白描边,压在三线格基线上仍可见)+ 红色短箭头(长度 ≈ 0.18×字号,
  canvas y 翻转角度)。CJK 字体无数据 → 开关禁用并提示。
- 两处共用页面自动生效:`/name-tracing`、`/cursive-worksheets`。默认开启。
- 后续可扩展(本次不做):沿轮廓多点箭头、workbook/word-work 生成器复用。

### 3. 文案与 SEO

- `tracing.strokeGuides`(+不可用提示)× 8 语言。
- `cursiveWorks` intro/seoText/meta:写入 stroke guides 卖点与连续笔画(D'Nealian 类)
  字体指引,替换 Cedarville/Dancing 的旧指引;其余 7 语言同步改写。

## 验收

1. `npm run build` 通过(lint + tsc)。
2. dev server 打开 `/cursive-worksheets`:Sacramento 在字体下拉中且为默认;
   笔画引导开启时描红行可见起点绿点与箭头;切 CJK 字体开关禁用。
3. `/name-tracing` 同功能;导出 PDF/PNG 包含引导标记(画布统一渲染,导出走同一 draw)。
