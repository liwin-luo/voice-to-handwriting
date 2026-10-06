# 声音转手写(voice-to-handwriting)

对着网页说一段话 → 实时转成文字 → 渲染成逼真手写体 → 一键导出 PNG / PDF。
适合贺卡、书信、手账与自媒体文案配图。

核心能力全部在浏览器本地完成:语音识别用 Web Speech API(免费、流式、自带标点),手写渲染用自托管 OFL 开源字体 + 逐字确定性抖动,**无后端、零 API 成本**。

## 快速开始

```bash
npm i            # 安装依赖
npm run dev      # 启动开发服务器 http://localhost:3000
```

> 语音识别需要 **HTTPS 或 localhost**,推荐桌面版 Chrome / Edge;Firefox 与移动端 Safari 会显示降级提示,可直接输入文字。

## 字体准备(首次必做)

手写字体为自托管 OFL 字体(马善政/龙藏/柳建毛草/Caveat,授权文件在 `fonts-src/`):

```bash
# 1. 下载原始 TTF 到 fonts-src/(URL 见 scripts/fonts.mjs 注释或设计文档 Task 6)
# 2. 切片为按需加载的 woff2 到 public/fonts/
npm i -D cn-font-split
node scripts/fonts.mjs
```

## 音频文件转写(免费)

支持上传 mp3 / wav / m4a 等音频文件,在**用户浏览器本地**用 Whisper 转写成文字再排版——零 API 成本,音频不离开设备。

- 模型自托管在 `public/models/`(同源加载,无 CORS、国内可达),用 `npm run models` 下载(whisper-base 约 78MB,已提交进仓库);
- WebGPU 可用时硬件加速,否则回退 WASM;
- 转写语言跟随页面语言;中文易输出繁体,可用「高质量」模型(取消 `scripts/models.sh` 中 small 的注释并重跑)改善。

## 本地历史记录

导出、录音结束、音频转写成功时自动保存快照(文本 + 样式),「历史」页可一键恢复继续编辑、单条删除或清空。数据仅存于浏览器 localStorage(上限 50 条),不经服务器。

## 测试

```bash
npm run test             # Vitest 单元测试(引擎:抖动/分词/分页/纸张)
npx playwright test      # E2E 冒烟(需先 npm run dev 或交给 webServer 自动起)
```

## 部署(Vercel)

1. 推送到 GitHub,在 Vercel 导入仓库(Hobby 免费档,自动 HTTPS);
2. Framework 自动识别 Next.js,直接 Deploy;
3. 建议绑定自定义域名(`vercel.app` 默认域名在国内不可达)。

## 项目结构

```
src/engine/     纯函数渲染引擎:jitter(确定性抖动)/ tokens(分词)/ layout(分页)/ paper(纸张)
src/hooks/      useSpeechRecognition(Web Speech API 封装,处理 Chrome 60s 断开自动重启)
src/stores/     Zustand 全局状态(样式偏好持久化到 localStorage)
src/components/ RecorderPanel / TranscriptEditor / StylePanel / PaperView / ExportBar
scripts/        fonts.mjs 字体切片脚本
docs/plans/     设计文档与实施计划
```

## 路线图

- **一期(已完成)**:说→渲→导闭环、文字排列控制(对齐/首行缩进)、5 语言国际化、合规页 + SEO 基建 + 广告位、纸张自适应缩放布局
- **二期**:Hanzi Writer 逐笔书写动画、照片合成模式、云端 ASR(/api/transcribe)
- **三期**:个人笔迹预设、端侧 Whisper/sherpa-onnx、书写动画视频导出

国际化说明:支持 **中文(默认)/ 英文 / 日语 / 韩语 / 西语** 共 5 种语言(`/` `/en` `/ja` `/ko` `/es`),由 src/proxy.ts 按 Accept-Language 自动协商;界面文案在 `messages/*.json`,长文内容在 `src/content/**/*.{zh,en,ja,ko,es}.mdx`。

详见 `docs/plans/2026-10-06-voicetohandwriting-design.md`。
