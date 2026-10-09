# Google Trends 选题池

> 数据源与规则见 docs/personas/README.md「选题池」;本文件由 `scripts/trends-backlog.mjs` 每周自动维护,
> 只有 AUTO 注释对之间的表格是机器区,「人工评估」等其余部分归人工。

## 主源:种子词相关查询上升榜(Rising, 近 7 天, US/DE/FR)

以站点能力簇的圆心词为种子、按当地搜索语言选词(DE:schreibschrift/linienblatt 等德校体系;FR:écriture cursive/graphisme 等),
看周边词近 7 天涨幅——这就是"和 handwriting 相关的词在涨什么"。能力簇 → 种子词映射见 docs/personas/README.md「选题池」。
**涨幅 Breakout 或 ≥100%** 的新词由定时任务写进「人工评估」,能挂上体验资产(角色卡「发布门槛」)才进排期;
DE/FR 候选优先路由为补齐现有文章的 de/fr 正文,而非新开文章。

<!-- AUTO:RISING START 由 scripts/trends-backlog.mjs 维护,勿手工编辑此区间 -->
| 首见 | 最近见 | Geo | 关键词 | 近7天增长 | 种子词 | 次数 |
|---|---|---|---|---|---|---|
| 2026-10-09 | 2026-10-09 | US | angelina jolie handwriting viral note | Breakout | handwriting | 2 |
| 2026-10-09 | 2026-10-09 | US | angelina jolie handwriting | Breakout | handwriting | 2 |
| 2026-10-09 | 2026-10-09 | US | motto of a calligraphy enthusiast | Breakout | calligraphy | 2 |
| 2026-10-09 | 2026-10-09 | US | like samosas and wontons crossword | Breakout | calligraphy | 2 |
| 2026-10-09 | 2026-10-09 | US | series of setbacks in slang crossword clue | Breakout | calligraphy | 2 |
| 2026-10-09 | 2026-10-09 | US | classmate of beavis crossword clue | Breakout | calligraphy | 2 |
| 2026-10-09 | 2026-10-09 | US | resort near snowbird | Breakout | calligraphy | 2 |
| 2026-10-09 | 2026-10-09 | US | jacob elordi handwriting | Breakout | handwriting | 1 |
| 2026-10-09 | 2026-10-09 | DE | gebundene handschrift im mittelalter | Breakout | handschrift | 1 |
| 2026-10-09 | 2026-10-09 | DE | gebundene handschrift im mittelalter 5 buchstaben | Breakout | handschrift | 1 |
| 2026-10-09 | 2026-10-09 | DE | gebundene handschrift im ma | Breakout | handschrift | 1 |
| 2026-10-09 | 2026-10-09 | DE | lamy kalligraphie füller | Breakout | kalligraphie | 1 |
| 2026-10-09 | 2026-10-09 | FR | alphabet calligraphie moderne | Breakout | calligraphie | 1 |
| 2026-10-09 | 2026-10-09 | US | createprintables name tracing | +850% | name tracing | 2 |
| 2026-10-09 | 2026-10-09 | US | meghan markle handwriting | +450% | handwriting | 1 |
| 2026-10-09 | 2026-10-09 | DE | sütterlin alphabet schreibschrift | +350% | schreibschrift | 1 |
| 2026-10-09 | 2026-10-09 | FR | blog graphisme | +350% | graphisme | 1 |
| 2026-10-09 | 2026-10-09 | DE | schreibpilot schreibschrift | +300% | schreibschrift | 1 |
| 2026-10-09 | 2026-10-09 | US | devoted followers of painter o keeffe crossword | +170% | calligraphy | 2 |
| 2026-10-09 | 2026-10-09 | FR | graphisme boucles gs | +150% | graphisme | 1 |
| 2026-10-09 | 2026-10-09 | US | einstein handwriting | +140% | handwriting | 1 |
| 2026-10-09 | 2026-10-09 | FR | apprendre la calligraphie | +140% | calligraphie | 1 |
| 2026-10-09 | 2026-10-09 | FR | graphisme halloween | +130% | graphisme | 1 |
| 2026-10-09 | 2026-10-09 | US | create printables name tracing | +120% | name tracing | 2 |
| 2026-10-09 | 2026-10-09 | DE | kalligraphie feder | +120% | kalligraphie | 1 |
| 2026-10-09 | 2026-10-09 | DE | kyrillisch schreibschrift | +110% | schreibschrift | 1 |
| 2026-10-09 | 2026-10-09 | FR | lettre s calligraphie | +110% | calligraphie | 1 |
| 2026-10-09 | 2026-10-09 | US | albert einstein handwriting | +100% | handwriting | 2 |
| 2026-10-09 | 2026-10-09 | US | pandora handwriting necklace | +90% | handwriting | 2 |
| 2026-10-09 | 2026-10-09 | US | create name tracing worksheets | +90% | name tracing | 2 |
| 2026-10-09 | 2026-10-09 | DE | sütterlin schreibschrift | +90% | schreibschrift | 1 |
| 2026-10-09 | 2026-10-09 | DE | linienblatt zum ausdrucken pdf | +90% | linienblatt | 1 |
| 2026-10-09 | 2026-10-09 | FR | lettres calligraphie | +90% | calligraphie | 1 |
| 2026-10-09 | 2026-10-09 | FR | m majuscule calligraphie | +90% | calligraphie | 1 |
| 2026-10-09 | 2026-10-09 | FR | logiciel graphisme | +90% | graphisme | 1 |
| 2026-10-09 | 2026-10-09 | US | architect handwriting | +80% | handwriting | 2 |
| 2026-10-09 | 2026-10-09 | US | free printable cursive handwriting worksheets | +80% | handwriting | 4 |
| 2026-10-09 | 2026-10-09 | DE | russische schreibschrift | +80% | schreibschrift | 1 |
| 2026-10-09 | 2026-10-09 | DE | russisches alphabet schreibschrift | +80% | schreibschrift | 1 |
| 2026-10-09 | 2026-10-09 | FR | tableau calligraphie arabe | +80% | calligraphie | 1 |
| 2026-10-09 | 2026-10-09 | FR | graphisme ponts | +80% | graphisme | 1 |
| 2026-10-09 | 2026-10-09 | US | print script handwriting | +70% | handwriting | 2 |
| 2026-10-09 | 2026-10-09 | US | calligraphy pronunciation | +70% | calligraphy | 2 |
| 2026-10-09 | 2026-10-09 | DE | schreibschrift s groß | +70% | schreibschrift | 1 |
| 2026-10-09 | 2026-10-09 | DE | schreibschrift f groß | +70% | schreibschrift | 1 |
| 2026-10-09 | 2026-10-09 | DE | kalligraphie füller | +70% | kalligraphie | 1 |
| 2026-10-09 | 2026-10-09 | FR | graphisme en france | +70% | graphisme | 1 |
| 2026-10-09 | 2026-10-09 | DE | schreibschrift übungsblätter | +60% | schreibschrift | 1 |
| 2026-10-09 | 2026-10-09 | DE | jandorf schreibschrift | +60% | schreibschrift | 1 |
| 2026-10-09 | 2026-10-09 | FR | feutre calligraphie | +60% | calligraphie | 1 |
| 2026-10-09 | 2026-10-09 | FR | définition calligraphie | +60% | calligraphie | 1 |
| 2026-10-09 | 2026-10-09 | FR | h majuscule calligraphie | +60% | calligraphie | 1 |
| 2026-10-09 | 2026-10-09 | FR | graphisme maternelle à imprimer | +60% | graphisme | 1 |
| 2026-10-09 | 2026-10-09 | FR | citrouille graphisme | +60% | graphisme | 1 |
| 2026-10-09 | 2026-10-09 | FR | école de graphisme | +60% | graphisme | 1 |
| 2026-10-09 | 2026-10-09 | US | neat handwriting practice | +50% | handwriting practice | 1 |
| 2026-10-09 | 2026-10-09 | US | create handwriting worksheets | +50% | handwriting worksheets | 1 |
| 2026-10-09 | 2026-10-09 | US | name tracing with lines | +50% | name tracing | 1 |
| 2026-10-09 | 2026-10-09 | US | name tracing generator with lines | +50% | name tracing | 1 |
| 2026-10-09 | 2026-10-09 | DE | pandora gravur handschrift | +50% | handschrift | 1 |
| 2026-10-09 | 2026-10-09 | FR | e majuscule calligraphie | +50% | calligraphie | 1 |
| 2026-10-09 | 2026-10-09 | FR | t majuscule calligraphie | +50% | calligraphie | 1 |
| 2026-10-09 | 2026-10-09 | FR | j majuscule calligraphie | +50% | calligraphie | 1 |
| 2026-10-09 | 2026-10-09 | FR | kit calligraphie | +50% | calligraphie | 1 |
| 2026-10-09 | 2026-10-09 | US | free handwriting practice sheets for kids | +40% | handwriting | 1 |
| 2026-10-09 | 2026-10-09 | US | blackletter calligraphy | +40% | calligraphy | 1 |
| 2026-10-09 | 2026-10-09 | US | make handwriting worksheets | +40% | handwriting worksheets | 1 |
| 2026-10-09 | 2026-10-09 | US | editable name tracing worksheets | +40% | name tracing | 1 |
| 2026-10-09 | 2026-10-09 | US | create name tracing | +40% | name tracing | 1 |
| 2026-10-09 | 2026-10-09 | US | modern calligraphy alphabet | +40% | calligraphy | 1 |
| 2026-10-09 | 2026-10-09 | DE | schreibschrift kopieren | +40% | schreibschrift | 1 |
| 2026-10-09 | 2026-10-09 | DE | kalligraphie alphabet | +40% | kalligraphie | 1 |
| 2026-10-09 | 2026-10-09 | FR | calligraphie gothique | +40% | calligraphie | 1 |
| 2026-10-09 | 2026-10-09 | FR | graphisme octobre | +40% | graphisme | 1 |
| 2026-10-09 | 2026-10-09 | US | create printables name tracing with lines | Breakout | name tracing | 1 |
<!-- AUTO:RISING END -->

## 参考源:大众每日热搜 RSS(全类别,仅供观察)

与站内主题无交集是常态;新闻热点默认不接,博客排名窗口追不上新闻生命周期。季节性选题提前 6–8 周发布。

<!-- AUTO:GENERAL START 由 scripts/trends-backlog.mjs 维护,勿手工编辑此区间 -->
| 首见 | Geo | 关键词 | 热度 | 次数 | 当日新闻语境 |
|---|---|---|---|---|---|
| 2026-10-08 | US | nifty 50 | 200+ | 5 | Indian shares extend losses as RBI rate hike, rising oil weigh |
| 2026-10-09 | US | michael douglas age | 200+ | 2 | How Michael Douglas Began a Secret Affair on the Set of Basic Instinct — But Not with Shar |
| 2026-10-09 | US | arthur gea | 500+ | 2 | Arthur Gea claims first Masters 1000 win in Shanghai |
| 2026-10-09 | US | how old is michael douglas | 1000+ | 1 | Michael Douglas Shares the Secret of His Marriage to Catherine Zeta-Jones (Exclusive) |
| 2026-10-09 | US | daniel altmaier | 1000+ | 1 | ATP Shanghai Day 1 Predictions Including Holger Rune vs Daniel Altmaier |
| 2026-10-09 | US | gavin williams | 1000+ | 1 | Gavin Williams used out of bullpen in Game 4 |
| 2026-10-09 | US | ben shelton | 500+ | 1 | Shelton on Turin qualification: ‘It’s a massive motivation’ |
| 2026-10-09 | US | andrew benintendi | 500+ | 1 | Andrew Benintendi Hit Prop Strategy: High-Value Fade for the Postseason |
| 2026-10-09 | US | steffi graf | 200+ | 1 | Steffi Graf sends fans into overdrive with ultra rare appearance alongside Andre Agassi an |
| 2026-10-09 | US | luka doncic | 200+ | 1 | Luka Dončić says he &apos;definitely&apos; regrets playing through hamstring injury that e |
| 2026-10-09 | US | adou thiero | 200+ | 1 | Adou Thiero aims for bigger Lakers role after injury-marred rookie season |
| 2026-10-09 | US | sandro mamukelashvili | 500+ | 1 | Lakers&apos; need for a big man behind Walker Kessler is only growing |
| 2026-10-09 | US | rei sakamoto | 200+ | 1 | ATP Shanghai Day 3 Predictions Including Andrey Rublev vs Rei Sakamoto |
| 2026-10-09 | US | bam adebayo | 1000+ | 1 | Aces&apos; A&apos;ja Wilson wins 5th WNBA MVP, says no to pregame ceremony |
| 2026-10-09 | US | flavio cobolli | 1000+ | 1 | ATP Shanghai Day 1 Predictions Including Holger Rune vs Daniel Altmaier |
| 2026-10-09 | US | ben affleck jennifer garner co parenting | 200+ | 1 | Ben Affleck Shares Rare Comments About His Co-Parenting Relationship with Ex Jennifer Garn |
| 2026-10-09 | US | michael douglas | 20000+ | 1 | Michael Douglas claims Kobe Bryant would ‘stop by’ wife Catherine Zeta-Jones’ house ‘a lot |
| 2026-10-09 | US | ugo humbert | 200+ | 1 | Arthur Gea claims first Masters 1000 win in Shanghai |
| 2026-10-09 | DE | gta vi leaks | 200+ | 1 | GTA VI leaks continue with a lengthy (and very nude) gameplay video |
| 2026-10-09 | DE | shanghai open | 200+ | 1 | Hurkacz fires 19 aces to set Djokovic clash, Tsitsipas wins in Shanghai |
| 2026-10-09 | DE | vorname | 100+ | 1 | Klingt gut, aber passt er auch?: Warum die Namenswahl ihre Tücken hat |
| 2026-10-09 | DE | margrethe ii. | 100+ | 1 | Queen Margrethe of Denmark Makes First Public Appearance After Latest Hospitalization |
| 2026-10-09 | DE | außenminister der vereinigten staaten | 200+ | 1 | „Langer Dämmerschlaf“ – Rubio fordert Europa zum Erwachen auf und warnt vor „Niedergang“ |
| 2026-10-09 | DE | rentenreform | 500+ | 1 | Erste Lesung im Bundestag: Union stell Bedingungen für Steuerreform |
| 2026-10-09 | DE | verfilmung | 100+ | 1 | Vergesst alles über Sci-Fi: „Cyberpunk 2077“-Verfilmung gestartet – Keanu Reeves muss dabe |
| 2026-10-09 | DE | wer wird millionär gestern | 100+ | 1 | &quot;Wer wird Millionär?&quot;: Kandidatin verspielt ihren Gewinn und das Final-Ticket |
| 2026-10-09 | DE | unwetter | 100+ | 1 | Nass, nasser, Mallorca: An diesen Orten regnete es am Mittwoch am meisten |
| 2026-10-09 | DE | güstrow | 100+ | 1 | Kaninchen in Gewahrsamszelle bei der Polizei in Güstrow |
| 2026-10-09 | FR | perpignan | 200+ | 1 | Appel à témoins dans les Pyrénées-Orientales : hospitalisée à Perpignan, une femme de 47 a |
| 2026-10-09 | FR | paris saint-germain football club | 200+ | 1 | Gestion, fatigue et gros duel à venir contre Manchester City : pourquoi Dembélé et Nuno Me |
| 2026-10-09 | FR | canal+ | 2000+ | 1 | Canal+ lance Sport+, une offre gratuite de sport |
| 2026-10-09 | FR | l'amour est dans le pré | 200+ | 1 | L&apos;amour est dans le pré : Manon, candidate de Haute-Garonne, découvre après une chute |
| 2026-10-09 | FR | lot-et-garonne | 100+ | 1 | Une voiture percute un arbre en Lot-et-Garonne : un jeune d&apos;une vingtaine d&apos;anné |
| 2026-10-09 | FR | autobus scolaire | 1000+ | 1 | Isère. Une voiture percute un bus scolaire, aucun blessé n&apos;est à déplorer |
| 2026-10-09 | FR | élections de mi-mandat aux états-unis | 500+ | 1 | Donald Trump exclut d&apos;attaquer l&apos;Iran avant les élections de mi-mandat aux Etats |
| 2026-10-09 | FR | maine-et-loire | 200+ | 1 | Météo. La météo du jeudi 8 octobre 2026 à Angers et ses environs |
| 2026-10-09 | FR | transavia | 100+ | 1 | Marcel s’envole avec Transavia pour Octobre rose |
| 2026-10-09 | FR | movix | 100+ | 1 | 【松竹マルチプレックスシアターズ】音響透過型シネマ LEDスクリーン「トライコーンプレミアム LED」日本初！12月4日（金）MOVIXさいたまに導入 |
| 2026-10-08 | US | simon cowell | 200+ | 3 | Simon Cowell’s Fiancée Marks His 67th Birthday With a Message That Hits Differently This Y |
| 2026-10-08 | US | flow | 200+ | 5 | Generac (GNRC) Stock May Be 20% Undervalued On Cash Flow |
| 2026-10-08 | US | pekan antariksa dunia 2026 | 100+ | 4 | Pekan Antariksa Dunia 2026 Indonesia Digelar di TIM, Ini Jadwal dan Cara Masuk Pameran |
| 2026-10-08 | US | karolina muchova | 200+ | 3 | &apos;I was shaking!&apos; Muchova edges Osaka on ninth match point in Beijing thriller |
| 2026-10-08 | US | mariano navone | 2000+ | 3 | Sports News, Transfers, Scores / Watch Live Sport |
| 2026-10-08 | US | hamad medjedovic | 2000+ | 3 | Highlights: Altmaier earns valiant Rune win in Shanghai 2026 |
| 2026-10-08 | US | loans | 100+ | 3 | Here&apos;s the latest sticker shock: Borrowing for a mortgage — or a car |
| 2026-10-08 | US | connor hellebuyck | 100+ | 3 | 3-Way Trade Ideas for Connor Hellebuyck and Alexander Nikishin Amid NHL Rumors |
| 2026-10-08 | US | james duckworth | 100+ | 3 | Sports News, Transfers, Scores / Watch Live Sport |
| 2026-10-08 | US | 내일 날씨 | 100+ | 2 | [내일 날씨] 한글날 전국 구름 많아…낮 최고 26도까지 올라 |
| 2026-10-08 | US | what happened on october 7th | 5000+ | 1 | Israeli-Palestinian conflict live updates: Israel marks 3 years since Oct. 7 attack |
| 2026-10-08 | US | earthquake | 500+ | 4 | Earthquake Simulator Will Bring Magnitude 7.0 Shaking To LA |
| 2026-10-08 | US | openai | 500+ | 4 | Sharing AI progress in mathematics |
| 2026-10-08 | US | demacia cup | 100+ | 4 | Match NAVI vs JD 2026 Demacia Cup Global Invitational 8 October 2026 — 12:00 - League of L |
| 2026-10-08 | US | 汇率 | 100+ | 4 | 受霍尔木兹海峡中断影响，伊拉克石油收入锐减，伊拉克第纳尔贬值13%。 |
| 2026-10-08 | US | nikola bartunkova | 200+ | 4 | Karolina Muchova v Nikola Bartunkova (08/10/2026) |
| 2026-10-08 | US | britney spears | 500+ | 4 | Britney Spears gushes over Dollywood in surprise Instagram posts |
| 2026-10-08 | US | antigravity | 100+ | 1 | Gemini 4 Argon: our next era of frontier intelligence |
| 2026-10-08 | US | latest news | 2000+ | 3 | Christa Pike’s attorneys believed she was brain-dead before she woke up ‘to the shock of e |
| 2026-10-08 | US | prime day october 2026 | 100+ | 3 | October Prime Day ends tonight: The best Amazon deals on Hanes, Carhartt, Apple and more |
| 2026-10-08 | US | barack obama | 200+ | 2 | Trump says he could have done ‘very bad things’ to Biden, Obama and Clinton |
| 2026-10-08 | US | sophie cunningham | 2000+ | 1 | Fever should part with Sophie Cunningham. She’s too turbulent to be paired with Caitlin Cl |
| 2026-10-08 | US | sam elliott | 200+ | 1 | Taylor Sheridan’s Landman Confirms Big Season 3 Upgrade After Major Delay |
| 2026-10-08 | US | meghan markle | 200+ | 1 | Prince Harry and Meghan Markle Are Not Planning an Apology to Prince William and Kate Midd |
| 2026-10-08 | US | wral | 100+ | 1 | Several crews responding to large structure fire in Durham |
| 2026-10-08 | US | weather orlando | 100+ | 1 | Northern Florida beach towns facing a coastal flood threat as relentless rain soaks region |
| 2026-10-08 | US | boston celtics | 100+ | 1 | Five things to watch in Celtics’ preseason opener vs. Cavaliers |
| 2026-10-08 | US | congressional report us aircraft damage | 200+ | 1 | US has lost or sustained damage to 81 military aircraft worth up to $3.3 billion in Iran w |
| 2026-10-08 | US | tom holland | 200+ | 1 | Spider-Man: Brand New Day (2026) |
| 2026-10-08 | US | strands hint today | 200+ | 1 | NYT Strands Hints, Clues And Answer For Thursday, October 8 (A Star Is Born) |
| 2026-10-08 | US | martin landaluce | 100+ | 1 | Sports News, Transfers, Scores / Watch Live Sport |
<!-- AUTO:GENERAL END -->

## 人工评估

<!-- 每周扫描后追加:日期 | Geo | 关键词 | 增长 | 建议角色 | 体验资产点子 | 结论(排期/放弃/继续观察) -->

2026-10-08 | handwriting workbook | +50%(全球近 30 天相关查询,热度 1) | wes-morales | 十五行词表 + 14 天日程 | 排期,稿 `handwriting-workbook`

2026-10-08 | （种子词 Rising 全空） | 近 7 天六个种子均为 0 条;12 个月补查 429 | — | — | 继续观察。大众日榜无站内交集,不接。

2026-10-08 | sight word tracing worksheets | 非 Rising 数字;规划表 §2 未覆盖长尾 + 自动补全成簇 | clara-hartley | 分龄行高表 + 八词清单与生成器参数 | 排期,已写 `sight-word-tracing-worksheets`
| 2026-10-09 | angelina jolie handwriting viral note | Breakout | — | — | 放弃:名人新闻热点,排名窗口追不上 |
| 2026-10-09 | angelina jolie handwriting | +4,750% | — | — | 放弃:同一名人新闻波 |
| 2026-10-09 | meghan markle handwriting | +450% | — | — | 放弃:名人新闻波,留存差 |
| 2026-10-09 | einstein handwriting | +140% | Mara Voss(低优先) | 「名人笔迹分析靠谱吗」辟谣向,挂一手文献 | 继续观察 |
| 2026-10-09 | create printables name tracing with lines | Breakout | Clara Hartley | 带行线描红分步教程+分龄参数 | 排期,已写 `name-tracing-with-lines` |
| 2026-10-09 | createprintables name tracing | +600% | Clara Hartley | 并入 `name-tracing-with-lines` | 排期,已合并 |
| 2026-10-09 | motto of a calligraphy enthusiast | Breakout | Theo Lindgren | 书法金句卡实测教程 | 排期,已写 `calligraphy-motto-cards` |
| 2026-10-09 | US | jacob elordi handwriting | Breakout | — | — | 放弃:名人新闻波(与 Angelina Jolie 同类) |
| 2026-10-09 | DE | gebundene handschrift im mittelalter(×3 变体,填字解题) | Breakout | — | — | 放弃:填字游戏解题流量(„5 Buchstaben"),留存差 |
| 2026-10-09 | DE | sütterlin alphabet schreibschrift | +350% | Clara Hartley | 如做:Sütterlin 老德文手写科普+现代连笔对照;但工具字体不含 Sütterlin,产品契合弱 | 继续观察 |
| 2026-10-09 | DE | schreibpilot schreibschrift | +300% | Clara Hartley | de 正文已存在(2026-10-09 盘点),真实缺口是 title/description 回退英文 → 元数据对齐 schreibschrift 词簇 | ✅ 已完成:de/fr/es 标题核对,6 处标题已对齐趋势词(2026-10-09) |
| 2026-10-09 | DE | kyrillisch schreibschrift | +110% | — | — | 放弃:西里尔手写与站内字体/主题不符 |
| 2026-10-09 | DE | lamy kalligraphie füller / kalligraphie feder | Breakout / +120% | June Park | de 正文已存在且首段已含 Kalligraphie/Schreibschrift → 只需 title/description 元数据对齐(如 Kalligraphie Hochzeit) | ✅ 已完成:de/fr/es 标题核对,6 处标题已对齐趋势词(2026-10-09) |
| 2026-10-09 | FR | alphabet calligraphie moderne | Breakout | June Park | fr 正文已存在 → title/description 元数据对齐 calligraphie moderne | ✅ 已完成:de/fr/es 标题核对,6 处标题已对齐趋势词(2026-10-09) |
| 2026-10-09 | FR | apprendre la calligraphie | +140% | June Park | 同上:元数据对齐 | ✅ 已完成:de/fr/es 标题核对,6 处标题已对齐趋势词(2026-10-09) |
| 2026-10-09 | FR | lettre s calligraphie | +110% | Wes Morales | fr 正文已存在 → 元数据对齐即可 | ✅ 已完成:de/fr/es 标题核对,6 处标题已对齐趋势词(2026-10-09) |
| 2026-10-09 | FR | blog graphisme | +350% | Clara Hartley | graphisme(运笔训练)是法国幼儿园真实内容缺口:图样卡+可打印,用 /writing-practice、/printable-paper 实测参数 | 排期(新 FR 文章) |
| 2026-10-09 | FR | graphisme boucles gs | +150% | Clara Hartley | 并入 graphisme 文章:boucles 图样分龄(GS/MS) | 排期(同上合并) |
| 2026-10-09 | FR | graphisme halloween | +130% | Clara Hartley | 季节窗口在 10 月内;来不及则放弃今年,登记明年 9 月底发 | 排期(季节,窗口紧) |
