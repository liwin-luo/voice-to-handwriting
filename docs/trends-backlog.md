# Google Trends 选题池

> 数据源与规则见 docs/personas/README.md「选题池」;本文件由 `scripts/trends-backlog.mjs` 每周自动维护,
> 只有 AUTO 注释对之间的表格是机器区,「人工评估」等其余部分归人工。

## 主源:种子词相关查询上升榜(Rising, 近 7 天, US)

以站内选题簇圆心词为种子,看周边词近 7 天涨幅——这就是"和 handwriting 相关的词在涨什么"。
**涨幅 Breakout 或 ≥100%** 的新词由定时任务写进「人工评估」,能挂上体验资产(角色卡「发布门槛」)才进排期。

<!-- AUTO:RISING START 由 scripts/trends-backlog.mjs 维护,勿手工编辑此区间 -->
| 首见 | 最近见 | 关键词 | 近7天增长 | 种子词 | 次数 |
|---|---|---|---|---|---|
<!-- AUTO:RISING END -->

## 参考源:大众每日热搜 RSS(全类别,仅供观察)

与站内主题无交集是常态;新闻热点默认不接,博客排名窗口追不上新闻生命周期。季节性选题提前 6–8 周发布。

<!-- AUTO:GENERAL START 由 scripts/trends-backlog.mjs 维护,勿手工编辑此区间 -->
| 首见 | 关键词 | 热度 | 次数 | 当日新闻语境 |
|---|---|---|---|---|
| 2026-10-08 | simon cowell | 200+ | 3 | Simon Cowell’s Fiancée Marks His 67th Birthday With a Message That Hits Differently This Y |
| 2026-10-08 | flow | 200+ | 5 | Generac (GNRC) Stock May Be 20% Undervalued On Cash Flow |
| 2026-10-08 | pekan antariksa dunia 2026 | 100+ | 4 | Pekan Antariksa Dunia 2026 Indonesia Digelar di TIM, Ini Jadwal dan Cara Masuk Pameran |
| 2026-10-08 | karolina muchova | 200+ | 3 | &apos;I was shaking!&apos; Muchova edges Osaka on ninth match point in Beijing thriller |
| 2026-10-08 | mariano navone | 2000+ | 3 | Sports News, Transfers, Scores / Watch Live Sport |
| 2026-10-08 | hamad medjedovic | 2000+ | 3 | Highlights: Altmaier earns valiant Rune win in Shanghai 2026 |
| 2026-10-08 | loans | 100+ | 3 | Here&apos;s the latest sticker shock: Borrowing for a mortgage — or a car |
| 2026-10-08 | connor hellebuyck | 100+ | 3 | 3-Way Trade Ideas for Connor Hellebuyck and Alexander Nikishin Amid NHL Rumors |
| 2026-10-08 | james duckworth | 100+ | 3 | Sports News, Transfers, Scores / Watch Live Sport |
| 2026-10-08 | 내일 날씨 | 100+ | 2 | [내일 날씨] 한글날 전국 구름 많아…낮 최고 26도까지 올라 |
| 2026-10-08 | what happened on october 7th | 5000+ | 1 | Israeli-Palestinian conflict live updates: Israel marks 3 years since Oct. 7 attack |
| 2026-10-08 | earthquake | 500+ | 4 | Earthquake Simulator Will Bring Magnitude 7.0 Shaking To LA |
| 2026-10-08 | openai | 500+ | 4 | Sharing AI progress in mathematics |
| 2026-10-08 | demacia cup | 100+ | 4 | Match NAVI vs JD 2026 Demacia Cup Global Invitational 8 October 2026 — 12:00 - League of L |
| 2026-10-08 | nifty 50 | 200+ | 4 | Indian shares extend losses as RBI rate hike, rising oil weigh |
| 2026-10-08 | 汇率 | 100+ | 4 | 受霍尔木兹海峡中断影响，伊拉克石油收入锐减，伊拉克第纳尔贬值13%。 |
| 2026-10-08 | nikola bartunkova | 200+ | 4 | Karolina Muchova v Nikola Bartunkova (08/10/2026) |
| 2026-10-08 | britney spears | 500+ | 4 | Britney Spears gushes over Dollywood in surprise Instagram posts |
| 2026-10-08 | antigravity | 100+ | 1 | Gemini 4 Argon: our next era of frontier intelligence |
| 2026-10-08 | latest news | 2000+ | 3 | Christa Pike’s attorneys believed she was brain-dead before she woke up ‘to the shock of e |
| 2026-10-08 | prime day october 2026 | 100+ | 3 | October Prime Day ends tonight: The best Amazon deals on Hanes, Carhartt, Apple and more |
| 2026-10-08 | barack obama | 200+ | 2 | Trump says he could have done ‘very bad things’ to Biden, Obama and Clinton |
<!-- AUTO:GENERAL END -->

## 人工评估

<!-- 每周扫描后追加:日期 | 关键词 | 增长 | 建议角色 | 体验资产点子 | 结论(排期/放弃/继续观察) -->
