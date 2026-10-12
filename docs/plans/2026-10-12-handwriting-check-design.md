# 手写照片评分

- 日期:2026-10-12
- 状态:已落地
- 登记:`docs/us-seo-content-plan.md` §二十一

用户上传一张拉丁字母手写照片。服务端把照片交给多模态模型,按五项给出 1–5 分。能给出观感分时,浏览器把已有的分数接在原图下方,做成一张 4:5 卡片,用户分享到社媒。缺的项留空。

这是全站第一条按次付费的接口。照片与卡片都不入库。

## 谁在用

写拉丁字母、想知道字好不好认的人。评分用语沿用成人练习的四个杠杆:大小、贴线、间距、斜度。好认是结果,四项是原因。

中日韩手写不套这五项。模型判定主体不是拉丁字母时,不给分。

## 页面

路由 `/handwriting-check`。8 语言界面。收在 `/tools` 练习纸分组,页头下拉不单列。

打开先看到三句说明:拍两行以上、纸放平、字不要被裁掉;这是观感分,不是临床评估;照片送给模型看完即丢。

上传或拍照后,浏览器把图压成长边 1600、质量 0.85 的 JPEG,再 `POST /api/handwriting-check`。体积上限 2MB。限度与 `paperImage` 相同,这一页不调用 `fileToPaperImage`,图不进 localStorage。等待时收起上传按钮,显示刚选的照片,并写明「正在看这张照片」和请留在这一页。

结果最上面是好认,1–5 分,旁边是界面里固定的那句锚点。下面四项原因各一行:分数,加上模型指出的一个看得见的例子。四项里最低的标成「下次先练这个」,链到 `how-to-improve-handwriting-adults`。单句练习纸若要承接这一项,另改,本文件不改那一页。页面上没有总分。

证语留在页面上。某一项没有证语就留空,不补数字。

### 何时不给五项分

- 照片模糊、切掉半行或反光严重:请重拍。
- 主体不是拉丁字母:说明这一版只评拉丁字母。
- 不足两行完整的字:只显示好认,四项写成「看不稳」。
- 模型两次都没返回能用的 JSON,或请求超时、供应商报错:「这次没看成,可以再试」。不把供应商原文给用户。

不谈性格、不诊断、不和某款字体比较,也不判拼写对错。

## 评分

每项 1–5,5 最好。四项原因不与好认相加,也不合成总分。这是消费级观感,不是 Handwriting Legibility Scale 或 Minnesota Handwriting Assessment 的临床计分。

锚点写在提示词里,也写在 `messages/*.json`,两处用同一套意思。页面上的锚点句子只从文案取,不采用模型写的句子。

| 项 | 5 | 3 | 1 |
| --- | --- | --- | --- |
| 好认 | 每个词第一眼都能读出 | 大约一半要靠前后文猜 | 几乎读不出来 |
| 大小 | 同一行高度稳定;全大写只要一致即可 | 忽大忽小,字母种类还分得开 | 高低混成一条 |
| 贴线 | 字脚落在同一条线上;有格线看格线,没格线看字自己排成的行 | 有几个词整词浮起或陷下 | 一行里没有稳定落点 |
| 间距 | 词内紧、词间开,前后差不多 | 有的词黏在一起,或词间空得像断句 | 分不清词在哪里结束 |
| 斜度 | 整段朝向一致;竖直、向左斜都可以 | 有的词往右、有的往左 | 没有稳定朝向 |

模型读不出的词算不好认,不许先补全再当读对。间距对外一个分,证语里点明是字距还是词距。

四项里最低的由页面计算。并列时按贴线、大小、间距、斜度取第一个。

字形、涂改只出现在证语里,且只有反复混淆已经拉低好认、或涂改很明显时才提。页边、行距、力度、速度、笔顺不评。

## 模型

接法对齐 `/Users/luogangming/projects-b/pet/src/lib/engine/glm.ts`。该项目线上文字模型是智谱: `TEXT_PROVIDER=glm`, `TEXT_BASE_URL=https://open.bigmodel.cn/api/coding/paas/v4`, `TEXT_MODEL=glm-5.3-flash`。`glm-5.3-flash` 能看图。pet 现有的 `chat()` 只把一段字符串放进 `content`,评分要把同一条请求的 `content` 改成两块:一段文字,一块图片。

- `POST ${TEXT_BASE_URL}/chat/completions`,缺省 base 与 pet 相同。
- 密钥 `TEXT_API_KEY`。请求头只有 `Authorization: Bearer` 和 `Content-Type: application/json`。
- 模型名 `TEXT_MODEL`,缺省 `glm-5.3-flash`。若带 `custom/` 前缀,先去掉,与 pet 的 `glmModelId` 相同。
- 消息: `{ role: "user", content: [{ type: "text", text: prompt }, { type: "image_url", image_url: { url } }] }`。`url` 用本次 JPEG 的 data URL,看完即丢。
- 超时 `AbortSignal.timeout(60_000)`。不额外设置 `temperature`、`reasoning_effort`。返回只读 `choices[0].message.content`,与 pet 的 `glm.ts` 相同。

不接 pet 的出图(`IMAGE_PROVIDER`、Seedream、OpenRouter 的 `gemini-2.5-flash-image`)。不把生成图写入 pet 那种 `/api/media` 存储。

提示词由 `buildCheckPrompt(locale)` 生成。要求只回 JSON,证语用 `locale` 对应的语言。JSON 从返回文本里取第一个 `{` 到最后一个 `}`,与 pet 的 `src/lib/moderation.ts` 里语义门控的取法相同。解析失败再请求一次。第二次仍不行,按「这次没看成」返回。

环境变量记在部署配置里。本仓库目前没有 `.env.example`,落地时补上这三行,不要把密钥写入仓库:

```
TEXT_API_KEY=
TEXT_BASE_URL=https://open.bigmodel.cn/api/coding/paas/v4
TEXT_MODEL=glm-5.3-flash
```

## 接口

`POST /api/handwriting-check`。路由是全站唯一知道智谱密钥的地方。请求体是 JPEG,超过 2MB 拒绝。响应不带回图片。服务器日志不写图片;Sentry 若打开,请求体不入报。

同一 IP 每天 3 次。计数钥匙带 UTC 日期,第二天 0 点(UTC)换一把,当天次数作废。页面打开就写明每天 3 次,并显示今天还剩几次。用完后上传和拍照停用,文案是明天再来。一次请求计一次,模型没看成也算。pet 用设备 cookie 加自己的存储计每天免费次数,本站没有那套存储。计数放在 Upstash,不用函数内存。没有 `UPSTASH_REDIS_REST_URL` 与 `UPSTASH_REDIS_REST_TOKEN` 时,这条路由在生产环境直接拒绝。本地开发没有这两项时,用本进程内存计数,重启后清零。

校验后的状态:

| status | 页面 |
| --- | --- |
| `scored` | 五项都有分和证语。出卡片 |
| `partial` | 好认有效,四项里有的被丢掉。缺的项留空,仍出卡片 |
| `too_short` | 只留好认。仍出卡片 |
| `retake` | 请重拍 |
| `unsupported_script` | 只评拉丁字母 |
| 失败 | 「这次没看成,可以再试」 |

`parseCheckResponse` 放在 `src/lib/handwritingCheck.ts`。路由拿到模型文本后只调用它,不在路由里重写规则。

## 分享卡片

能给出观感分就生成:五项齐全、缺了某项,或不足两行只留好认。重拍、不是拉丁字母、这次没看成,不出卡片。在浏览器里用已有的 `html-to-image` 导出 PNG,照片仍是用户内存里的那张,服务器不接收卡片。缺的项在卡片上印「—」。

画布 1080×1350。上半是暖纸色,照片整张缩在里面,不裁字、不盖住笔迹。下半是墨蓝 `#15317e`,数字用浅色,最低项换成浅底块。好认是大号数字,旁边是锚点;四项小数字;底下一行「下次先练这一项」,右下角 `voicetohandwriting.online`。证语和解析都不印上卡片。

模型另给 `summary`:3 到 5 句,只写照片里看得见的,点明最影响好认的那一项和下次怎么练。写在卡片下面。没有这段也不挡分数。

主按钮「分享这张卡片」。`navigator.canShare` 能带文件时,`navigator.share` 交出 PNG。不能时改为下载。现有 `useShareActions` 只发网页链接,结果页不用它。

能分析出分数时,页面换成这张卡片:标题和上传区收起,第一屏是卡片,下面是「分享这张卡片」和「再传一张」。证语仍留在卡片下方。

五项 1–5 的锚点写在工具页上,5 最好。没有一篇专门解释这套打分的文章。练法链到已有的 `how-to-improve-handwriting-adults`,那是四周练习,不改它的主词,也不另开一篇来抢。

## 文案

用户可见字符串进 `messages/*.json`,8 个语言同一个 PR。命名空间 `handwritingCheck`。FAQ 走 `ToolFaq`,三条:

1. 这是临床评估吗?不是。这是看一张照片得到的观感分。
2. 照片会留下吗?不会。模型看完即丢,卡片在你自己的浏览器里生成。
3. 为什么有时没有卡片?照片需要重拍,或不是拉丁字母。

## 文件

- `src/app/[locale]/handwriting-check/page.tsx`
- `src/components/HandwritingCheck.tsx`
- `src/lib/handwritingCheck.ts` — `buildCheckPrompt`、`parseCheckResponse`、最低项、能否出卡片
- `src/lib/handwritingCheck.test.ts`
- `src/app/api/handwriting-check/route.ts` — 智谱调用、体积、每日 3 次

落地时同步 `docs/ARCHITECTURE.md` 页面地图、`src/app/sitemap.ts`、`src/lib/tools.ts`。

## 测试

`npm test` 里的 `handwritingCheck.test.ts` 不访问网络。覆盖:

- 五项齐全且都有证语:收下,可以出卡片。
- 某一项没有证语:丢掉该项,仍出卡片。
- 不足两行:只留好认,仍出卡片。
- 要重拍,或不是拉丁字母:不给分,不出卡片。
- 文本里没有 JSON:失败。
- 四项并列时按贴线、大小、间距、斜度取第一个。
- 提示词含五项锚点,并要求证语用传入的语言。

## 不做

- 中日韩的另一套维度
- 总分、临床报告、性格、诊断
- 把图片或卡片存到服务器,或做成可公开访问的链接
- 用现有分享按钮发一条不带图的链接
- 搬 pet 的出图、登录、设备点数和作品存储
- 改单句练习纸、首页语音工作台
