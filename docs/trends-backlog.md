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
| 2026-11-09 | 2026-11-09 | US | half cursive half print handwriting meaning | Breakout | handwriting | 1 |
| 2026-11-09 | 2026-11-09 | US | half print half cursive writing | Breakout | cursive | 1 |
| 2026-11-09 | 2026-11-09 | US | thanksgiving handwriting practice | Breakout | handwriting practice | 1 |
| 2026-11-09 | 2026-11-09 | US | thanksgiving handwriting worksheets | Breakout | handwriting worksheets | 1 |
| 2026-10-20 | 2026-11-09 | DE | linienblatt 3. klasse | Breakout | linienblatt | 2 |
| 2026-11-09 | 2026-11-09 | DE | eigenart der handschrift | Breakout | handschrift | 1 |
| 2026-11-09 | 2026-11-09 | DE | eigene handschrift als font | Breakout | handschrift | 1 |
| 2026-11-09 | 2026-11-09 | DE | schlechte handschrift scherzhaft 5 buchstaben | Breakout | handschrift | 1 |
| 2026-11-09 | 2026-11-09 | DE | handschriftliches testament vorlage | Breakout | handschrift | 1 |
| 2026-10-09 | 2026-11-09 | FR | alphabet calligraphie moderne | Breakout | calligraphie | 2 |
| 2026-11-09 | 2026-11-09 | FR | calligraphie arabe prenom | Breakout | calligraphie | 1 |
| 2026-10-12 | 2026-10-12 | US | audrey van der meer handwriting | +950% | handwriting | 1 |
| 2026-10-09 | 2026-10-12 | US | createprintables name tracing | +850% | name tracing | 3 |
| 2026-11-09 | 2026-11-09 | US | half print half cursive handwriting | +700% | handwriting | 1 |
| 2026-11-02 | 2026-11-02 | US | november calligraphy | +700% | calligraphy | 1 |
| 2026-11-02 | 2026-11-09 | DE | schlechte handschrift scherzhaft | +650% | handschrift | 2 |
| 2026-10-12 | 2026-11-02 | US | daily cursive handwriting practice pdf | +650% | handwriting practice | 2 |
| 2026-10-12 | 2026-10-12 | US | beware the man whose handwriting sways like a reed in the wind | +3,650% | handwriting | 1 |
| 2026-11-02 | 2026-11-02 | US | handwriting analysis quiz | +600% | handwriting | 1 |
| 2026-10-12 | 2026-11-02 | FR | i majuscule calligraphie | +550% | calligraphie | 3 |
| 2026-11-02 | 2026-11-09 | US | november cursive | +450% | cursive | 2 |
| 2026-11-02 | 2026-11-09 | US | november in cursive | +450% | cursive | 2 |
| 2026-11-02 | 2026-11-02 | US | november in calligraphy | +450% | calligraphy | 1 |
| 2026-10-09 | 2026-10-09 | US | meghan markle handwriting | +450% | handwriting | 1 |
| 2026-10-12 | 2026-10-20 | FR | r majuscule calligraphie | +400% | calligraphie | 2 |
| 2026-10-09 | 2026-10-12 | DE | sütterlin alphabet schreibschrift | +350% | schreibschrift | 2 |
| 2026-10-09 | 2026-10-09 | FR | blog graphisme | +350% | graphisme | 1 |
| 2026-11-09 | 2026-11-09 | US | italics beautiful handwriting for children | +300% | handwriting | 1 |
| 2026-11-09 | 2026-11-09 | US | patsy ramsey handwriting | +300% | handwriting | 1 |
| 2026-11-09 | 2026-11-09 | DE | schlechte handschrift | +250% | handschrift | 1 |
| 2026-10-09 | 2026-11-02 | FR | j majuscule calligraphie | +250% | calligraphie | 2 |
| 2026-11-02 | 2026-11-02 | FR | graphisme novembre | +250% | graphisme | 1 |
| 2026-10-20 | 2026-10-20 | US | editable handwriting worksheets | +250% | handwriting worksheets | 1 |
| 2026-10-09 | 2026-10-20 | DE | pandora gravur handschrift | +250% | handschrift | 2 |
| 2026-10-20 | 2026-10-20 | FR | calligraphie latine | +250% | calligraphie | 1 |
| 2026-10-12 | 2026-10-12 | US | www.createprintables.com name tracing | +250% | name tracing | 1 |
| 2026-11-09 | 2026-11-09 | DE | schöne handschrift vorlagen | +200% | handschrift | 1 |
| 2026-11-09 | 2026-11-09 | DE | schreibschrift übungen | +200% | schreibschrift | 1 |
| 2026-10-20 | 2026-10-20 | US | handwriting practice sheets pdf free download | +200% | handwriting practice | 1 |
| 2026-10-12 | 2026-10-12 | US | how can i improve my handwriting | +200% | handwriting | 1 |
| 2026-10-12 | 2026-10-12 | FR | a majuscule calligraphie | +190% | calligraphie | 1 |
| 2026-10-12 | 2026-11-02 | FR | lettre e calligraphie | +180% | calligraphie | 2 |
| 2026-11-09 | 2026-11-09 | DE | handschrift generator | +170% | handschrift | 1 |
| 2026-11-02 | 2026-11-02 | US | free calligraphy fonts copy and paste | +170% | calligraphy | 1 |
| 2026-11-02 | 2026-11-02 | DE | schreibschrift arten | +170% | schreibschrift | 1 |
| 2026-10-20 | 2026-10-20 | DE | dafont handschrift | +170% | handschrift | 1 |
| 2026-10-09 | 2026-10-09 | US | devoted followers of painter o keeffe crossword | +170% | calligraphy | 2 |
| 2026-11-09 | 2026-11-09 | US | christmas in cursive | +160% | cursive | 1 |
| 2026-10-09 | 2026-11-02 | DE | jandorf schreibschrift | +160% | schreibschrift | 2 |
| 2026-10-12 | 2026-11-02 | FR | graphisme halloween gs | +160% | graphisme | 2 |
| 2026-10-20 | 2026-10-20 | US | personality test | +160% | handwriting | 1 |
| 2026-10-12 | 2026-10-12 | FR | f majuscule calligraphie | +160% | calligraphie | 1 |
| 2026-10-09 | 2026-11-09 | US | print script handwriting | +1,150% | handwriting | 4 |
| 2026-11-02 | 2026-11-02 | US | happy halloween calligraphy | +150% | calligraphy | 1 |
| 2026-11-02 | 2026-11-02 | FR | calligraphie def | +150% | calligraphie | 1 |
| 2026-11-02 | 2026-11-02 | FR | graphisme citrouille | +150% | graphisme | 1 |
| 2026-10-20 | 2026-10-20 | US | handwriting personality test | +150% | handwriting | 2 |
| 2026-10-20 | 2026-10-20 | US | createprintables.com name tracing | +150% | name tracing | 1 |
| 2026-10-20 | 2026-10-20 | DE | schreibschrift h groß | +150% | schreibschrift | 1 |
| 2026-10-09 | 2026-10-09 | FR | graphisme boucles gs | +150% | graphisme | 1 |
| 2026-10-12 | 2026-11-09 | US | grooved handwriting books | +140% | handwriting | 2 |
| 2026-10-20 | 2026-11-09 | FR | l majuscule calligraphie | +140% | calligraphie | 2 |
| 2026-10-09 | 2026-11-02 | US | einstein handwriting | +140% | handwriting | 2 |
| 2026-11-02 | 2026-11-02 | FR | fiche graphisme gs | +140% | graphisme | 1 |
| 2026-10-20 | 2026-10-20 | US | handwriting test | +140% | handwriting | 1 |
| 2026-10-20 | 2026-10-20 | FR | lettre l calligraphie | +140% | calligraphie | 1 |
| 2026-10-20 | 2026-10-20 | FR | progression graphisme ps | +140% | graphisme | 1 |
| 2026-10-09 | 2026-10-12 | FR | m majuscule calligraphie | +140% | calligraphie | 2 |
| 2026-10-09 | 2026-10-09 | FR | apprendre la calligraphie | +140% | calligraphie | 1 |
| 2026-11-02 | 2026-11-02 | DE | persönliche handschrift 4 buchstaben | +130% | handschrift | 1 |
| 2026-11-02 | 2026-11-02 | FR | fiche de graphisme gs | +130% | graphisme | 1 |
| 2026-11-02 | 2026-11-02 | FR | dnmade graphisme | +130% | graphisme | 1 |
| 2026-10-20 | 2026-10-20 | US | handwriting personality | +130% | handwriting | 1 |
| 2026-10-20 | 2026-10-20 | DE | v in schreibschrift | +130% | schreibschrift | 1 |
| 2026-10-20 | 2026-10-20 | FR | g majuscule calligraphie | +130% | calligraphie | 1 |
| 2026-10-09 | 2026-10-09 | FR | graphisme halloween | +130% | graphisme | 1 |
| 2026-10-20 | 2026-11-09 | US | cursive name tracing generator | +120% | name tracing | 2 |
| 2026-10-09 | 2026-11-09 | DE | kalligraphie feder | +120% | kalligraphie | 2 |
| 2026-11-02 | 2026-11-02 | US | spooky handwriting | +120% | handwriting | 1 |
| 2026-11-02 | 2026-11-02 | US | happy halloween in cursive | +120% | cursive | 1 |
| 2026-10-09 | 2026-10-12 | DE | russische schreibschrift | +120% | schreibschrift | 2 |
| 2026-10-12 | 2026-10-12 | DE | kalligraphie haarschnitt | +120% | kalligraphie | 1 |
| 2026-10-09 | 2026-10-09 | US | create printables name tracing | +120% | name tracing | 2 |
| 2026-11-09 | 2026-11-09 | US | pinterest handwriting | +110% | handwriting | 1 |
| 2026-11-09 | 2026-11-09 | US | script handwriting | +110% | handwriting | 1 |
| 2026-11-09 | 2026-11-09 | US | merry christmas in cursive | +110% | cursive | 1 |
| 2026-11-02 | 2026-11-02 | US | adult handwriting practice | +110% | handwriting | 2 |
| 2026-11-02 | 2026-11-02 | FR | écriture cursive gs | +110% | écriture cursive | 1 |
| 2026-11-02 | 2026-11-02 | FR | fiche graphisme ms | +110% | graphisme | 1 |
| 2026-10-20 | 2026-10-20 | US | handwriting personality test game | +110% | handwriting | 1 |
| 2026-10-20 | 2026-10-20 | DE | kalligraphie pinsel | +110% | kalligraphie | 1 |
| 2026-10-20 | 2026-10-20 | DE | islamische kalligraphie | +110% | kalligraphie | 1 |
| 2026-10-09 | 2026-10-12 | DE | kyrillisch schreibschrift | +110% | schreibschrift | 2 |
| 2026-10-12 | 2026-10-12 | DE | abc in schreibschrift | +110% | schreibschrift | 1 |
| 2026-10-09 | 2026-10-09 | FR | lettre s calligraphie | +110% | calligraphie | 1 |
| 2026-11-09 | 2026-11-09 | US | first grade handwriting worksheets | +100% | handwriting worksheets | 1 |
| 2026-11-09 | 2026-11-09 | DE | schreibschrift p klein | +100% | schreibschrift | 1 |
| 2026-11-09 | 2026-11-09 | FR | feuille d'écriture cp | +100% | feuille d'écriture | 1 |
| 2026-10-09 | 2026-11-02 | US | albert einstein handwriting | +100% | handwriting | 4 |
| 2026-11-02 | 2026-11-02 | US | handwriting worksheets for kids | +100% | handwriting worksheets | 1 |
| 2026-11-02 | 2026-11-02 | FR | graphisme automne gs | +100% | graphisme | 1 |
| 2026-11-02 | 2026-11-02 | FR | graphisme automne | +100% | graphisme | 1 |
| 2026-10-20 | 2026-10-20 | FR | gta 6 graphisme | +100% | graphisme | 1 |
| 2026-10-12 | 2026-10-12 | US | handwriting worksheet generator | +100% | handwriting worksheets | 1 |
| 2026-10-12 | 2026-10-12 | US | yu shinan calligraphy hk auction | +4,100% | calligraphy | 1 |
| 2026-10-09 | 2026-11-09 | US | free printable cursive handwriting worksheets | +90% | handwriting | 7 |
| 2026-10-09 | 2026-11-09 | US | free handwriting practice sheets for kids | +90% | handwriting | 3 |
| 2026-10-20 | 2026-11-09 | US | handwriting repeater | +90% | handwriting | 2 |
| 2026-11-09 | 2026-11-09 | US | serial killer handwriting | +90% | handwriting | 1 |
| 2026-11-09 | 2026-11-09 | US | custom name tracing | +90% | name tracing | 1 |
| 2026-11-09 | 2026-11-09 | US | merry christmas calligraphy | +90% | calligraphy | 1 |
| 2026-10-09 | 2026-11-09 | DE | sütterlin schreibschrift | +90% | schreibschrift | 3 |
| 2026-10-09 | 2026-11-09 | DE | linienblatt zum ausdrucken pdf | +90% | linienblatt | 2 |
| 2026-11-09 | 2026-11-09 | DE | schreibschrift alphabet zum ausdrucken pdf | +90% | schreibschrift | 1 |
| 2026-10-20 | 2026-11-09 | FR | cahier calligraphie | +90% | calligraphie | 2 |
| 2026-11-02 | 2026-11-02 | DE | schwungübungen schreibschrift | +90% | schreibschrift | 1 |
| 2026-10-09 | 2026-11-02 | FR | lettres calligraphie | +90% | calligraphie | 2 |
| 2026-10-20 | 2026-10-20 | US | personality test based on handwriting | +90% | handwriting | 1 |
| 2026-10-20 | 2026-10-20 | US | r74n handwriting | +90% | handwriting | 1 |
| 2026-10-20 | 2026-10-20 | DE | kalligraphie adventskalender | +90% | kalligraphie | 1 |
| 2026-10-20 | 2026-10-20 | FR | cahier de graphisme gs | +90% | graphisme | 1 |
| 2026-10-09 | 2026-10-12 | US | pandora handwriting necklace | +90% | handwriting | 3 |
| 2026-10-09 | 2026-10-12 | DE | russisches alphabet schreibschrift | +90% | schreibschrift | 2 |
| 2026-10-09 | 2026-10-12 | FR | t majuscule calligraphie | +90% | calligraphie | 2 |
| 2026-10-09 | 2026-10-12 | FR | citrouille graphisme | +90% | graphisme | 2 |
| 2026-10-09 | 2026-10-09 | US | create name tracing worksheets | +90% | name tracing | 2 |
| 2026-10-09 | 2026-10-09 | FR | logiciel graphisme | +90% | graphisme | 1 |
| 2026-11-02 | 2026-11-09 | US | handwriting practice worksheets pdf for adults | +80% | handwriting practice | 3 |
| 2026-11-02 | 2026-11-02 | US | dafont | +80% | handwriting | 1 |
| 2026-11-02 | 2026-11-02 | DE | sütterlin handschrift | +80% | handschrift | 1 |
| 2026-10-09 | 2026-11-02 | FR | feutre calligraphie | +80% | calligraphie | 2 |
| 2026-11-02 | 2026-11-02 | FR | s majuscule calligraphie | +80% | calligraphie | 1 |
| 2026-11-02 | 2026-11-02 | FR | fiche graphisme | +80% | graphisme | 1 |
| 2026-10-20 | 2026-10-20 | US | handwriting personality quiz | +80% | handwriting | 1 |
| 2026-10-09 | 2026-10-20 | FR | calligraphie gothique | +80% | calligraphie | 2 |
| 2026-10-12 | 2026-10-12 | DE | schriftgenerator schreibschrift | +80% | schreibschrift | 1 |
| 2026-10-12 | 2026-10-12 | DE | kalligraphie schrift generator | +80% | kalligraphie | 1 |
| 2026-10-09 | 2026-10-12 | FR | graphisme ponts | +80% | graphisme | 2 |
| 2026-10-12 | 2026-10-12 | FR | calligraphie définition | +80% | calligraphie | 1 |
| 2026-10-09 | 2026-10-09 | US | architect handwriting | +80% | handwriting | 2 |
| 2026-10-09 | 2026-10-09 | FR | tableau calligraphie arabe | +80% | calligraphie | 1 |
| 2026-11-09 | 2026-11-09 | US | chicken scratch handwriting | +70% | handwriting | 1 |
| 2026-11-09 | 2026-11-09 | US | creative printables name tracing | +70% | name tracing | 1 |
| 2026-10-09 | 2026-11-09 | DE | schreibschrift f groß | +70% | schreibschrift | 3 |
| 2026-11-02 | 2026-11-02 | US | handwriting without tears screener | +70% | handwriting | 1 |
| 2026-10-09 | 2026-11-02 | DE | schreibschrift s groß | +70% | schreibschrift | 3 |
| 2026-11-02 | 2026-11-02 | DE | persönliche handschrift | +70% | handschrift | 1 |
| 2026-11-02 | 2026-11-02 | DE | kalligraphie abc | +70% | kalligraphie | 1 |
| 2026-11-02 | 2026-11-02 | FR | écriture cursive russe | +70% | écriture cursive | 1 |
| 2026-11-02 | 2026-11-02 | FR | police écriture cursive | +70% | écriture cursive | 1 |
| 2026-11-02 | 2026-11-02 | FR | graphisme ms | +70% | graphisme | 1 |
| 2026-10-20 | 2026-10-20 | US | handwriting without tears letter order | +70% | handwriting | 1 |
| 2026-10-20 | 2026-10-20 | DE | f in schreibschrift | +70% | schreibschrift | 1 |
| 2026-10-20 | 2026-10-20 | FR | b majuscule calligraphie | +70% | calligraphie | 1 |
| 2026-10-20 | 2026-10-20 | FR | agence de graphisme paris | +70% | graphisme | 1 |
| 2026-10-09 | 2026-10-12 | US | create printables name tracing with lines | +70% | name tracing | 2 |
| 2026-10-09 | 2026-10-12 | US | calligraphy pronunciation | +70% | calligraphy | 3 |
| 2026-10-09 | 2026-10-12 | DE | kalligraphie füller | +70% | kalligraphie | 2 |
| 2026-10-09 | 2026-10-12 | FR | graphisme maternelle à imprimer | +70% | graphisme | 2 |
| 2026-10-09 | 2026-10-09 | FR | graphisme en france | +70% | graphisme | 1 |
| 2026-11-09 | 2026-11-09 | US | handwriting without tears pdf | +60% | handwriting | 1 |
| 2026-11-09 | 2026-11-09 | FR | police calligraphie en ligne | +60% | calligraphie | 1 |
| 2026-11-09 | 2026-11-09 | FR | graphisme rond | +60% | graphisme | 1 |
| 2026-11-09 | 2026-11-09 | FR | graphisme cp | +60% | graphisme | 1 |
| 2026-11-02 | 2026-11-02 | US | halloween handwriting | +60% | handwriting | 1 |
| 2026-11-02 | 2026-11-02 | DE | c in schreibschrift | +60% | schreibschrift | 1 |
| 2026-10-09 | 2026-11-02 | FR | h majuscule calligraphie | +60% | calligraphie | 2 |
| 2026-10-20 | 2026-10-20 | US | handwriting heroes | +60% | handwriting | 1 |
| 2026-10-20 | 2026-10-20 | US | name tracing template | +60% | name tracing | 1 |
| 2026-10-20 | 2026-10-20 | US | tpt | +60% | name tracing | 1 |
| 2026-10-20 | 2026-10-20 | US | calligraphy practice sheets | +60% | calligraphy | 1 |
| 2026-10-20 | 2026-10-20 | US | lucida calligraphy | +60% | calligraphy | 1 |
| 2026-10-20 | 2026-10-20 | DE | schriftarten schreibschrift | +60% | schreibschrift | 1 |
| 2026-10-20 | 2026-10-20 | FR | cahier de calligraphie | +60% | calligraphie | 1 |
| 2026-10-20 | 2026-10-20 | FR | ia graphisme | +60% | graphisme | 1 |
| 2026-10-12 | 2026-10-12 | DE | k in schreibschrift | +60% | schreibschrift | 1 |
| 2026-10-12 | 2026-10-12 | DE | chinesische kalligraphie | +60% | kalligraphie | 1 |
| 2026-10-12 | 2026-10-12 | FR | fiches graphisme ms | +60% | graphisme | 1 |
| 2026-10-09 | 2026-10-09 | DE | schreibschrift übungsblätter | +60% | schreibschrift | 1 |
| 2026-10-09 | 2026-10-09 | FR | définition calligraphie | +60% | calligraphie | 1 |
| 2026-10-09 | 2026-10-09 | FR | école de graphisme | +60% | graphisme | 1 |
| 2026-10-20 | 2026-11-09 | US | lucida calligraphy font | +50% | calligraphy | 2 |
| 2026-11-09 | 2026-11-09 | US | cute handwriting fonts | +50% | handwriting | 1 |
| 2026-11-09 | 2026-11-09 | US | different handwriting styles | +50% | handwriting | 1 |
| 2026-11-09 | 2026-11-09 | US | doodles help handwriting | +50% | handwriting | 1 |
| 2026-11-09 | 2026-11-09 | FR | calligraphie moderne | +50% | calligraphie | 1 |
| 2026-11-09 | 2026-11-09 | FR | graphisme ce1 | +50% | graphisme | 1 |
| 2026-11-02 | 2026-11-02 | US | best handwriting fonts | +50% | handwriting | 1 |
| 2026-11-02 | 2026-11-02 | US | a reason for handwriting | +50% | handwriting | 1 |
| 2026-11-02 | 2026-11-02 | US | faux calligraphy | +50% | calligraphy | 1 |
| 2026-11-02 | 2026-11-02 | DE | happy birthday kalligraphie | +50% | kalligraphie | 1 |
| 2026-11-02 | 2026-11-02 | FR | n majuscule calligraphie | +50% | calligraphie | 1 |
| 2026-11-02 | 2026-11-02 | FR | calligraphie chiffre | +50% | calligraphie | 1 |
| 2026-11-02 | 2026-11-02 | FR | graphisme gs | +50% | graphisme | 1 |
| 2026-10-20 | 2026-10-20 | US | handwriting practice sheet | +50% | handwriting practice | 1 |
| 2026-10-20 | 2026-10-20 | US | 1st grade handwriting worksheets | +50% | handwriting worksheets | 1 |
| 2026-10-20 | 2026-10-20 | US | calligraphy tattoo fonts | +50% | calligraphy | 1 |
| 2026-10-20 | 2026-10-20 | DE | schreibschrift zum kopieren | +50% | schreibschrift | 1 |
| 2026-10-20 | 2026-10-20 | FR | alphabet calligraphie facile | +50% | calligraphie | 1 |
| 2026-10-09 | 2026-10-12 | US | create handwriting worksheets | +50% | handwriting worksheets | 2 |
| 2026-10-12 | 2026-10-12 | US | cursive handwriting name generator | +50% | handwriting | 1 |
| 2026-10-12 | 2026-10-12 | US | calligraphy cat | +50% | calligraphy | 1 |
| 2026-10-12 | 2026-10-12 | DE | schreibschrift i groß | +50% | schreibschrift | 1 |
| 2026-10-12 | 2026-10-12 | DE | kalligraphie stift | +50% | kalligraphie | 1 |
| 2026-10-09 | 2026-10-12 | FR | e majuscule calligraphie | +50% | calligraphie | 2 |
| 2026-10-12 | 2026-10-12 | FR | calligraphie anglaise | +50% | calligraphie | 1 |
| 2026-10-12 | 2026-10-12 | FR | coffret calligraphie | +50% | calligraphie | 1 |
| 2026-10-12 | 2026-10-12 | FR | calligraphie tatouage | +50% | calligraphie | 1 |
| 2026-10-09 | 2026-10-09 | US | neat handwriting practice | +50% | handwriting practice | 1 |
| 2026-10-09 | 2026-10-09 | US | name tracing with lines | +50% | name tracing | 1 |
| 2026-10-09 | 2026-10-09 | US | name tracing generator with lines | +50% | name tracing | 1 |
| 2026-10-09 | 2026-10-09 | FR | kit calligraphie | +50% | calligraphie | 1 |
| 2026-11-09 | 2026-11-09 | US | how to improve my handwriting | +40% | handwriting | 1 |
| 2026-11-09 | 2026-11-09 | US | perfect handwriting | +40% | handwriting | 1 |
| 2026-11-09 | 2026-11-09 | US | 3rd grade handwriting worksheets | +40% | handwriting worksheets | 1 |
| 2026-11-09 | 2026-11-09 | US | print handwriting worksheets pdf free | +40% | handwriting worksheets | 1 |
| 2026-11-09 | 2026-11-09 | US | calligraphy markers | +40% | calligraphy | 1 |
| 2026-11-09 | 2026-11-09 | DE | j in schreibschrift | +40% | schreibschrift | 1 |
| 2026-11-09 | 2026-11-09 | DE | kyrillische schreibschrift | +40% | schreibschrift | 1 |
| 2026-11-02 | 2026-11-02 | US | what your handwriting says about you | +40% | handwriting | 1 |
| 2026-11-02 | 2026-11-02 | US | 2nd grade handwriting worksheets | +40% | handwriting worksheets | 1 |
| 2026-11-02 | 2026-11-02 | US | what does calligraphy mean | +40% | calligraphy | 1 |
| 2026-11-02 | 2026-11-02 | DE | g in schreibschrift | +40% | schreibschrift | 1 |
| 2026-10-20 | 2026-10-20 | US | how to turn handwriting into a font | +40% | handwriting | 1 |
| 2026-10-20 | 2026-10-20 | US | calligraphy generator free | +40% | calligraphy | 1 |
| 2026-10-09 | 2026-10-20 | DE | schreibschrift kopieren | +40% | schreibschrift | 2 |
| 2026-10-20 | 2026-10-20 | DE | handschrift font | +40% | handschrift | 1 |
| 2026-10-20 | 2026-10-20 | DE | b in schreibschrift | +40% | schreibschrift | 1 |
| 2026-10-20 | 2026-10-20 | FR | dafont calligraphie | +40% | calligraphie | 1 |
| 2026-10-20 | 2026-10-20 | FR | stage graphisme | +40% | graphisme | 1 |
| 2026-10-20 | 2026-10-20 | FR | alternance graphisme | +40% | graphisme | 1 |
| 2026-10-12 | 2026-10-12 | US | handwriting practice for kindergarten | +40% | handwriting practice | 1 |
| 2026-10-12 | 2026-10-12 | DE | handschrift englisch | +40% | handschrift | 1 |
| 2026-10-12 | 2026-10-12 | DE | was ist kalligraphie | +40% | kalligraphie | 1 |
| 2026-10-09 | 2026-10-09 | US | blackletter calligraphy | +40% | calligraphy | 1 |
| 2026-10-09 | 2026-10-09 | US | make handwriting worksheets | +40% | handwriting worksheets | 1 |
| 2026-10-09 | 2026-10-09 | US | editable name tracing worksheets | +40% | name tracing | 1 |
| 2026-10-09 | 2026-10-09 | US | create name tracing | +40% | name tracing | 1 |
| 2026-10-09 | 2026-10-09 | US | modern calligraphy alphabet | +40% | calligraphy | 1 |
| 2026-10-09 | 2026-10-09 | DE | kalligraphie alphabet | +40% | kalligraphie | 1 |
| 2026-10-09 | 2026-10-09 | FR | graphisme octobre | +40% | graphisme | 1 |
| 2026-10-09 | 2026-11-02 | DE | schreibpilot schreibschrift | Breakout | schreibschrift | 3 |
| 2026-11-02 | 2026-11-02 | FR | d majuscule calligraphie | Breakout | calligraphie | 1 |
| 2026-10-20 | 2026-10-20 | US | daily handwriting practice pdf free | Breakout | handwriting practice | 1 |
| 2026-10-20 | 2026-10-20 | FR | progression graphisme ms | Breakout | graphisme | 1 |
| 2026-10-20 | 2026-10-20 | FR | centre du graphisme echirolles | Breakout | graphisme | 1 |
| 2026-10-12 | 2026-10-12 | US | calligraphy cat battle cats | Breakout | calligraphy | 1 |
| 2026-10-09 | 2026-10-12 | DE | gebundene handschrift im mittelalter | Breakout | handschrift | 2 |
| 2026-10-09 | 2026-10-12 | DE | gebundene handschrift im mittelalter 5 buchstaben | Breakout | handschrift | 2 |
| 2026-10-09 | 2026-10-12 | DE | gebundene handschrift im ma | Breakout | handschrift | 2 |
| 2026-10-09 | 2026-10-09 | US | angelina jolie handwriting viral note | Breakout | handwriting | 2 |
| 2026-10-09 | 2026-10-09 | US | angelina jolie handwriting | Breakout | handwriting | 2 |
| 2026-10-09 | 2026-10-09 | US | motto of a calligraphy enthusiast | Breakout | calligraphy | 2 |
| 2026-10-09 | 2026-10-09 | US | like samosas and wontons crossword | Breakout | calligraphy | 2 |
| 2026-10-09 | 2026-10-09 | US | series of setbacks in slang crossword clue | Breakout | calligraphy | 2 |
| 2026-10-09 | 2026-10-09 | US | classmate of beavis crossword clue | Breakout | calligraphy | 2 |
| 2026-10-09 | 2026-10-09 | US | resort near snowbird | Breakout | calligraphy | 2 |
| 2026-10-09 | 2026-10-09 | US | jacob elordi handwriting | Breakout | handwriting | 1 |
| 2026-10-09 | 2026-10-09 | DE | lamy kalligraphie füller | Breakout | kalligraphie | 1 |
<!-- AUTO:RISING END -->

## 参考源:大众每日热搜 RSS(全类别,仅供观察)

与站内主题无交集是常态;新闻热点默认不接,博客排名窗口追不上新闻生命周期。季节性选题提前 6–8 周发布。

<!-- AUTO:GENERAL START 由 scripts/trends-backlog.mjs 维护,勿手工编辑此区间 -->
| 首见 | Geo | 关键词 | 热度 | 次数 | 当日新闻语境 |
|---|---|---|---|---|---|
| 2026-11-09 | US | d'andre swift | 2000+ | 1 | Week 10 Fantasy Football Early Waiver Wire Pickups: Darren Waller, Seth McGowan among top  |
| 2026-11-09 | US | colston loveland | 1000+ | 1 | Bears report: TE Colston Loveland good to go vs. Seahawks despite neck injury |
| 2026-11-09 | US | vita vea | 500+ | 1 | Could the Panthers make a trade deadline move? 5 potential targets |
| 2026-11-09 | US | keira knightley | 1000+ | 1 | Netflix’s Best Returning Show Lands With A 92% Rotten Tomatoes Score |
| 2026-11-09 | US | mercer county house snake nest | 500+ | 1 | Mercer County couple finds at least 25 snakes in newly purchased home |
| 2026-11-09 | US | penn state basketball | 200+ | 1 | GAME DAY: Penn State MBB vs. Pittsburgh |
| 2026-11-09 | US | todd bowles | 200+ | 1 | Buccaneers 16-0 Falcons (Nov 1, 2026) Game Recap |
| 2026-11-09 | US | josiah trotter | 200+ | 1 | Could Bucs ILB Josiah Trotter Win Defensive Rookie Of The Year? |
| 2026-11-09 | US | nfc north | 2000+ | 1 | NFC North Mock Draft: Making picks ahead of Week 9 |
| 2026-11-09 | US | lol worlds | 500+ | 1 | Gen.G sweep IG and become the first finalists of Worlds 2026 |
| 2026-11-09 | DE | lol worlds | 100+ | 1 | Gen.G sweep IG and become the first finalists of Worlds 2026 |
| 2026-11-09 | DE | billstedt | 100+ | 1 | Überfall in Hamburg-Billstedt: Mann mit Messer verletzt |
| 2026-11-09 | DE | jacob elordi | 100+ | 1 | No Time to Dye: Jacob Elordi Goes Blonde |
| 2026-11-09 | DE | duckduckgo | 100+ | 1 | Schools scramble after Google gives AI ultimatum |
| 2026-11-09 | DE | fortnite shop | 200+ | 1 | ‘Fortnite’ Reveals Pirate Shop Token Drop Rates, And They Are Bad |
| 2026-11-09 | DE | königsfamilie | 500+ | 1 | Harry und Meghan zeigen sich erstmals seit Rückkehr - Panorama - SZ.de |
| 2026-11-09 | DE | rachel weisz | 100+ | 1 | Vorschau: Verleugnung • Spielfilm Großbritannien/USA 2016 (Denial) |
| 2026-11-09 | DE | задержание | 200+ | 1 | «Что забирали только неформалов — неправда» |
| 2026-11-09 | DE | fahndung | 1000+ | 1 | Polizei Bremen warnt: Gefährlicher Straftäter aus Psychiatrie ausgebrochen |
| 2026-11-09 | DE | limbach-oberfrohna | 200+ | 1 | Zwei Hubschrauber am Sonntagmittag in Limbach-Oberfrohna gesichtet |
| 2026-11-09 | FR | mavericks – nets | 100+ | 1 | Nets vs Mavericks LIVE, Score Updates and Play-by-Play in NBA (37-61) |
| 2026-11-09 | FR | quimper | 100+ | 1 | Tennis de table. Pro A dames : Quimper craque face à Joué-lès-Tours après avoir mené |
| 2026-11-09 | FR | campus drivers saison 2 | 500+ | 1 | “Campus Drivers”, sur Prime Video : malgré ses clichés, on se laisse séduire par cette rom |
| 2026-11-09 | FR | timberwolves – jazz | 200+ | 1 | Live: Wolves look for fourth straight win without Anthony Edwards as they host Jazz |
| 2026-11-09 | FR | sheep esport | 100+ | 1 | Sources: G2 Esports push to retain Labrov amid interest from NAVI and Fnatic |
| 2026-11-09 | FR | jamal musiala | 200+ | 1 | Bayern Munich : les nouvelles sont de plus en plus inquiétantes pour Jamal Musiala |
| 2026-11-09 | FR | hiver | 1000+ | 1 | Le « super El Niño » inquiète les horticulteurs kényans, qui fournissent un tiers des fleu |
| 2026-11-09 | FR | raphael arnault | 100+ | 1 | La justice autorise in extremis une conférence du député LFI Raphaël Arnault à Villeurbann |
| 2026-11-09 | FR | priscilla chan | 500+ | 1 | Mark Zuckerberg’s fortune tops <!-- AUTO:GENERAL END -->00 billion. His 3 daughters won’t inherit most of it |
| 2026-11-09 | FR | julianne moore | 200+ | 1 | Commentary: Review of three early Oscar contenders |
| 2026-11-02 | US | zizou bergs | 200+ | 1 | ̳̳‍‍++[ＬＩＶＥＳｔｒｅａｍ]𝐓𝐕!!] Ignacio Buse VS Zizou Bergs 𝐋𝐈𝐕𝐄 Ｓｔｒｅａｍ |
| 2026-11-02 | US | lorenzo musetti | 200+ | 1 | ̳̳‍‍++[𝐋𝐈𝐕𝐄𝐒𝐓𝐑𝐄𝐀𝐌]TODAY!!] Lorenzo Musetti VS Hubert Hurkacz Live Free November  |
| 2026-11-02 | US | merrimack basketball | 2000+ | 1 | Ascoli vs. Palermo (Nov 6, 2026) Odds and Spread |
| 2026-11-02 | US | nashville weather | 200+ | 1 | Cloudy for Trick or Treating with showers moving in Sunday |
| 2026-11-02 | US | venus williams | 200+ | 1 | Sports News, Transfers, Scores / Watch Live Sport |
| 2026-11-02 | US | olivia colman | 100+ | 1 | What does Olivia Colman&apos;s hot sex with a basket tell us about heteropessimism? / Emma |
| 2026-11-02 | US | crime | 5000+ | 1 | Violent Halloween weekend in US with more than a dozen killed, over 90 injured in shooting |
| 2026-11-02 | US | did the eagles win | 10000+ | 1 | Eagles at Commanders Injury Report |
| 2026-11-02 | US | peso mexicano | 200+ | 1 | Así está el dólar en México hoy: tipo de cambio y cotizaciones en bancos |
| 2026-11-02 | US | local news | 100+ | 1 | Calhoun tennis star gives back to hometown and surprises the high school girls’ team |
| 2026-11-02 | DE | hubert hurkacz | 500+ | 1 | NA ŻYWO: Hubert Hurkacz — Lorenzo Musetti w Paryżu. Relacja i wynik live |
| 2026-11-02 | DE | raumschiff enterprise | 500+ | 1 | »Star Trek«: US-Schauspieler Walter Koenig ist tot |
| 2026-11-02 | DE | dieselkraftstoff | 200+ | 1 | Russland-Prognose: Im November gehen Ölexporte über Häfen an Ostsee und am Schwarzen Meer  |
| 2026-11-02 | DE | die rosenheim-cops | 2000+ | 1 | ZDF streicht am 3. November „Die Rosenheim-Cops“ aus dem Programm |
| 2026-11-02 | DE | sporting lissabon | 200+ | 1 | Trainerwechsel bei Sporting Lissabon - Borges geht, Fonseca vor der Tür |
| 2026-11-02 | DE | atp paris | 200+ | 1 | Rolex Paris Masters / Moïse Kouame laisse le charme agir : &quot;Il faut être patient, mêm |
| 2026-11-02 | DE | wahlen usa midterms | 2000+ | 1 | Drohende Schlappe bei den Midterms: Was Trump als Nächstes planen könnte |
| 2026-11-02 | DE | fc bayern münchen borussia dortmund | 500+ | 1 | Großes Alupech und der späte Fabio Silva: FC Bayern lässt Sieg im Topspiel liegen |
| 2026-11-02 | DE | halloween süssigkeiten nadeln | 10000+ | 1 | Halloween: Polizei ruft wegen präparierter Halloween-Süßigkeiten zu Vorsicht auf |
| 2026-11-02 | DE | restaurant korea | 1000+ | 1 | North Korea touts BBQ restaurant boom, but sceptics dismiss it as propaganda |
| 2026-11-02 | FR | jean luc | 5000+ | 1 | Présidentielle 2027 : Jean-Luc Mélenchon dit annuler sa venue au « 20 heures » de TF1, qu’ |
| 2026-11-02 | FR | jean luc reichmann | 5000+ | 1 | Jean-Luc Reichmann (66 ans) vit dans une maison de 600 m2 à Versailles, &quot;moi, je m&ap |
| 2026-11-02 | FR | lorenzo musetti | 200+ | 1 | DIRECT. Musetti - Hurkacz, ATP 1000, Rolex Paris Masters, Premier tour : 6-6 en direct |
| 2026-11-02 | FR | sous-marin nucléaire | 200+ | 1 | La Russie tire un missile capable de transporter plusieurs ogives nucléaires : lancé depui |
| 2026-11-02 | FR | laeticia hallyday | 200+ | 1 | Laeticia et Joy Hallyday : après avoir profité d’Halloween à Saint-Barth, mère et fille cé |
| 2026-11-02 | FR | apiculteur | 200+ | 1 | Vosges. Le mystère des ruches volées pendant plusieurs années avait pour responsable un ap |
| 2026-11-02 | FR | david schwimmer | 200+ | 1 | Today’s famous birthdays list for November 2, 2026 includes celebrities David Schwimmer, R |
| 2026-11-02 | FR | marion bartoli | 200+ | 1 | [Podcasts] Bartoli Time du Dimanche 1er novembre 2026 |
| 2026-11-02 | FR | rtx 5080 | 500+ | 1 | En Chine, des milliers de cartes graphiques haut de gamme de Nvidia sont démontées pour al |
| 2026-11-02 | FR | flo film florence arthaud | 50000+ | 1 | Florence Arthaud : fausse couche, pannes, 10 jours coupée du monde… L’incroyable récit de  |
| 2026-10-20 | US | tampa bay rays | 20000+ | 1 | Rays 3-1 Guardians (Oct 18, 2026) Final Score |
| 2026-10-20 | US | rockstar games gta vi | 10000+ | 1 | &apos;There&apos;s No One Person That Has This Whole Thing in Their Head&apos; — GTA 6 Dev |
| 2026-10-20 | US | kylie cosmetics | 2000+ | 1 | Victoria’s Secret reboots its fantasy with Kylie Jenner’s $50M diamond bra |
| 2026-10-20 | US | renee montgomery | 200+ | 1 | Renee Montgomery Defends Dual Role As WNBA Analyst and Owner |
| 2026-10-20 | US | brandon cooks | 500+ | 1 | Brandin Cooks&apos; first TD catch as a 49er gives San Francisco a 27-26 lead in Seattle |
| 2026-10-20 | US | kaitlyn chen | 500+ | 1 | The Valkyries&apos; secret weapon is a &apos;goofy&apos; Ivy League grad from SoCal |
| 2026-10-20 | US | amy acton vs vivek ramaswamy | 500+ | 1 | Ramaswamy Facing Tougher Fight Than Republicans Had Expected in Ohio |
| 2026-10-20 | US | valkyries | 10000+ | 1 | WNBA Finals 2026: Valkyries vs. Dream schedule, scores, more |
| 2026-10-20 | US | brandon aiyuk | 2000+ | 1 | Brandon Aiyuk was a star receiver with a <!-- AUTO:GENERAL START 由 scripts/trends-backlog.mjs 维护,勿手工编辑此区间 -->20M contract. Now he’s the NFL’s biggest enigma |
| 2026-10-20 | US | rays score | 1000+ | 1 | Rays 3-1 Guardians (Oct 18, 2026) Final Score |
| 2026-10-12 | DE | crunchyroll | 100+ | 2 | Sechs weitere Anime-Neustarts ab sofort auf Crunchyroll verfügbar |
| 2026-10-20 | DE | 49ers – commanders | 200+ | 1 | Washington Commanders face unbeaten San Francisco 49ers in Monday night football showdown |
| 2026-10-20 | DE | fryzza airfryer pizza | 2000+ | 1 | Bekannter TV-Modarator aus Viersen: Könnes kämpft – in der Höhle der Löwen |
| 2026-10-20 | DE | chevron | 100+ | 1 | Better Oil Stock: Chevron (CVX) vs. ExxonMobil (XOM) |
| 2026-10-20 | DE | femizid | 100+ | 1 | Gewalttat: 47-Jähriger soll mutmaßlich Frau in Köln getötet haben |
| 2026-10-20 | DE | drive | 100+ | 1 | LSU student and fiance, both with New Orleans area ties, killed leaving Tigerland by drunk |
| 2026-10-20 | DE | friedrich merz | 2000+ | 1 | Bundesregierung vereinbart KI-Kooperation mit Nvidia |
| 2026-10-20 | DE | rbb24 | 200+ | 1 | 82-Jähriger und 84-Jährige sterben nach Autounfall im Krankenhaus |
| 2026-10-20 | DE | cyberpunk edgerunners season 2 | 200+ | 1 | Cyberpunk: Edgerunners 2 Delivers the Gory, Action-Packed Goods |
| 2026-10-20 | DE | bruce willis | 200+ | 1 | Licensable video: Bruce Willis advised Ben Affleck to change his voice |
| 2026-10-20 | FR | loto résultats loto | 100+ | 1 | Résultats Loto FDJ : les numéros gagnants du lundi 19 octobre |
| 2026-10-20 | FR | nhl | 100+ | 1 | Anton Frondell’s New Challenge Is The Grind Of A Full NHL Season |
| 2026-10-20 | FR | wnba | 100+ | 1 | Williams lifts Valkyries past Dream in WNBA Finals opener |
| 2026-10-20 | FR | manchester city football club | 200+ | 1 | Man City rivals ‘cannot see saga being sorted this season’ |
| 2026-10-20 | FR | faustine bollaert | 200+ | 1 | Faustine Bollaert (47 ans) : après sa séparation, la grande annonce que tout le monde atte |
| 2026-10-20 | FR | nuit | 200+ | 1 | Le dossier de la semaine. Ces professionnels exercent la nuit : vous dormez, ils travaille |
| 2026-10-20 | FR | macbook pro | 200+ | 1 | Apple pourrait dévoiler un MacBook Pro tactile le 28 octobre |
| 2026-10-20 | FR | casseur | 500+ | 1 | La «panoplie du casseur» : des peines sévères lors des premières comparutions immédiates a |
| 2026-10-20 | FR | snap | 500+ | 1 | NFL Week 6 Winners and Losers: With another listless loss, Eagles face possibility of majo |
| 2026-10-20 | FR | daniel mouchard | 1000+ | 1 | Intervention de la police dans un campus : le président de l&apos;université Sorbonne Nouv |
| 2026-10-12 | US | calais campbell | 2000+ | 1 | Ravens’ Calais Campbell breaks NFL record for games by defensive lineman |
| 2026-10-12 | US | declan doyle | 2000+ | 1 | News &amp; Notes: Tyler Huntley Says Starting Again Feels Like ‘Riding a Bike’ |
| 2026-10-12 | US | andrew vaughn | 2000+ | 1 | Why isn&apos;t Yelich in Brewers&apos; starting lineup for NLCS Game 1? |
| 2026-10-12 | US | jake matthews | 2000+ | 1 | Falcons’ injury report: Jake Matthews questionable to make 200th straight start |
| 2026-10-12 | US | cooper pratt | 2000+ | 1 | Brewers shortstop celebrates series win with soda, not alcohol |
| 2026-10-12 | US | mookie betts | 1000+ | 1 | Dodgers&apos; Mookie Betts, other MLB players feel haunted by Pfister Hotel |
| 2026-10-12 | US | landman season 3 | 2000+ | 1 | ‘Landman’ Just Announced a Major Cast Change for Season 3 |
| 2026-10-12 | US | jamie lee curtis | 1000+ | 1 | Tea Leoni as Jeanie and Tim Daly as James in the Pilot episode of new NBC show &quot;Newly |
| 2026-10-12 | US | américa - medellín | 500+ | 1 | América, por la clasificación: David González convocó a 20 jugadores para recibir al DIM |
| 2026-10-12 | US | marshals cast | 1000+ | 1 | ‘Marshals’ Season 2 Release Guide: Here’s When Episode 2 Drops On CBS And Paramount+ |
| 2026-10-12 | DE | diesel | 500+ | 1 | Six senators call for Trump administration to &apos;immediately reverse course&apos; on Ru |
| 2026-10-12 | DE | anyps5 | 100+ | 1 | AnyPS5 Achieves Full PS5 GPU Shader Instruction Translation |
| 2026-10-12 | DE | promi big brother | 1000+ | 1 | Nach Tag 7: Wer ist raus bei „Promi Big Brother“? – Die Nominierungsliste ist komplett |
| 2026-10-12 | DE | citroën 2cv elektro | 10000+ | 1 | CITROËN 2CV CONCEPT: ZEIT FÜR EIN WIEDERSEHEN MIT DER ENTE |
| 2026-10-12 | DE | mike evans | 100+ | 1 | Tom Brady’s LFG Player of the Game: 49ers’ Mike Evans 🏆 Week 5 DIGITAL EXCLUSIVE |
| 2026-10-12 | DE | jp performance | 100+ | 1 | JP Kraemer will Deutschland verlassen |
| 2026-10-12 | DE | olympiasieger | 200+ | 1 | &quot;Fit wie nie&quot;: Plötzliche Wende um deutsche Rekord-Olympiasieger |
| 2026-10-12 | DE | tom welling | 100+ | 1 | ‘Smallville’ star Tom Welling accidentally exposes himself in hotel window reflection |
| 2026-10-12 | DE | george russell | 200+ | 1 | &quot;Deshalb wird er wahrscheinlich auch kein Weltmeister&quot;: Hartes Urteil für Merced |
| 2026-10-12 | FR | ivresse | 100+ | 1 | Conduite sans permis, en état d’ivresse… un conducteur condamné à 24 mois de prison pour d |
| 2026-10-12 | FR | idealogeek | 200+ | 1 | Oppo Find X10 Pro Max: la version mondiale apparemment encore revue à la baisse, et pas se |
| 2026-10-12 | FR | palmeiras – corinthians | 200+ | 1 | Palmeiras 4 x 1 Corinthians / Campeonato Brasileiro: melhores momentos |
| 2026-10-12 | FR | moustiques | 5000+ | 1 | Une alerte à la dengue déclenche une vaste opération de désinfection de tout un quartier e |
| 2026-10-12 | FR | bagayoko | 100+ | 1 | VIDÉO. Vote contre l’excision à Saint-Denis : quand Bally Bagayoko s&apos;abstient et cafo |
| 2026-10-12 | FR | calendrier om | 200+ | 1 | &quot;Le calendrier semble plus facile…&quot;, Dupraz reste inquiet pour l&apos;OM avant l |
| 2026-10-12 | FR | gilles chabert | 200+ | 1 | Disparition. Gilles Chabert, grande figure des “pulls rouges” et de la montagne, est décéd |
| 2026-10-12 | FR | saint-martin-d'arcé | 100+ | 1 | Piéton de 17 ans tué en Maine-et-Loire : le conducteur placé en garde à vue |
| 2026-10-12 | FR | yassir zabiri | 100+ | 1 | Zabiri Scores His 7th La Liga Goal in Racing Santander’s 2-2 Draw with Valencia |
| 2026-10-12 | FR | exécution publique | 500+ | 1 | « La peine de mort est inadmissible » : Léon XIV à contre-courant de l’administration Trum |
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
| 2026-10-09 | FR | blog graphisme | +350% | Clara Hartley | graphisme(运笔训练)是法国幼儿园真实内容缺口:图样卡+可打印;对口工具是 /prewriting-strokes(/writing-practice 是中日韩格子,不接) | ✅ 已写 `graphisme-maternelle`(fr 源发,2026-10-14) |
| 2026-10-09 | FR | graphisme boucles gs | +150% | Clara Hartley | 并入 graphisme 文章:boucles 图样分龄(GS/MS) | ✅ 已并入 `graphisme-maternelle`(五类笔画家族含 boucles,GS 行写明) |
| 2026-10-09 | FR | graphisme halloween | +130% | Clara Hartley | 季节窗口在 10 月内;来不及则放弃今年,登记明年 9 月底发 | 放弃今年(窗口 10-10 已过);文章按 §6.7 P0-2 去掉过季章节,2027 年 9 月底再评估季节加章 |
| 2026-10-12 | US | beware the man whose handwriting sways like a reed in the wind | +3,650% | — | — | 放弃:病毒式金句/台词波,无产品契合 |
| 2026-10-12 | US | audrey van der meer handwriting | +950% | Mara Voss | 维护触发:van der Meer 是本站已引用的研究者(2024 EEG),核对 handwriting-vs-typing-brain 是否需补充新报道并 bump updated | 继续观察(维护) |
| 2026-10-12 | US | how can i improve my handwriting | +200% | Wes Morales | 支柱文章 how-to-improve-your-handwriting 已覆盖该意图;核对标题/首段是否命中口语问句变体 | 继续观察(已覆盖) |
| 2026-10-12 | US | daily cursive handwriting practice pdf | +130% | Wes Morales | 真实缺口:/daily-cursive-handwriting-practice 工具无配套文章;实测每日连笔工具的 PDF 导出参数,写专文 | ✅ 2026-10-20 已写 `daily-cursive-practice-pdf`,并入当日 Breakout「daily handwriting practice pdf free」 |
| 2026-10-12 | US | handwriting worksheet generator | +100% | Theo Lindgren | copywork-generator/handwriting-workbook 文章邻近但未精确命中该词;评估专文或关键词调整 | 继续观察 |
| 2026-10-12 | US | www.createprintables.com name tracing | +250% | Clara Hartley | 需求已由已发布的 name-tracing-with-lines 覆盖(上周同源词第二次出现) | 已覆盖,不重复建议 |
| 2026-10-12 | US | calligraphy cat battle cats | Breakout | — | — | 放弃:游戏角色内容 |
| 2026-10-12 | US | yu shinan calligraphy hk auction | +4,100% | — | — | 放弃:拍卖新闻 |
| 2026-10-12 | DE | abc in schreibschrift | +110% | Clara Hartley | cursive-alphabet-chart 的 de 版标题已命中 Schreibschrift-Alphabet | 已覆盖 |
| 2026-10-12 | DE | kalligraphie haarschnitt | +120% | — | — | 放弃:与站内主题无关 |
| 2026-10-12 | FR | r/i/a/f majuscule calligraphie(4 词簇) | +400/+250/+190/+160% | Wes Morales | 法语用户逐个学书法大写字母:强化 cursive-alphabet-chart fr 正文的 majuscules 章节,或做单字母系列 | ✅ 已完成(2026-11-01):fr 正文新增「Les capitales une par une」(15 个常用大写的 geste/piège 表 + 一周 15 分钟计划),fr 标题补 majuscules;en 与其他语言正文不动 |
| 2026-10-12 | FR | graphisme halloween gs | +100% | Clara Hartley | 连续两周上榜且带年级限定词,季节窗口将关:P0-2 graphisme 文章立即动笔(含 halloween gs 章节),否则明确放弃今年 | ✅ 已动笔 `graphisme-maternelle`,季节章节按窗口放弃(2026-10-14) |
| 2026-10-20 | US | daily handwriting practice pdf free | Breakout | Wes Morales | 与 10-12 的 daily cursive pdf 同一缺口:成人十五分钟 + 当日页实拍 | ✅ 已写 `daily-cursive-practice-pdf` |
| 2026-10-20 | US | handwriting practice sheets pdf free download | +200% | — | `handwriting-worksheets` 与通用练习纸生成器已吃「免费练习纸 PDF」 | 已覆盖 |
| 2026-10-20 | US | editable handwriting worksheets | +250% | — | 站内是生成后打印,不是可填写的 PDF 表单。不新开近义文 | 继续观察 |
| 2026-10-20 | US | handwriting personality test / handwriting test / handwriting personality / test game | +150% / +140% / +130% / +110% | Theo Lindgren | 站内 quiz 是两分钟看图;完整字形测验在 handwritingpersonalitytest.online,写一篇怎么测、再把 7 的练习带回本站 | ✅ 已写 `handwriting-personality-test` |
| 2026-10-20 | US | createprintables.com name tracing | +150% | — | `name-tracing-with-lines` 已覆盖,同源词再次出现 | 已覆盖 |
| 2026-10-20 | DE | dafont handschrift | +170% | — | 字体站品牌导航 | 放弃 |
| 2026-10-20 | DE | schreibschrift h groß / v in schreibschrift | +150% / +130% | — | 单字母。DE 字母矩阵未开,不单开文 | 继续观察 |
| 2026-10-20 | DE | linienblatt 3. klasse | +250% | Clara Hartley | 德国三年级横线纸。先核现有 de 纸张文能否接,不新开 | 继续观察 |
| 2026-10-20 | DE | kalligraphie pinsel / islamische kalligraphie | +110% / +110% | — | 毛笔与伊斯兰书法,站内字体不接 | 放弃 |
| 2026-10-20 | FR | calligraphie latine | +250% | — | 拉丁书法。先看 best-cursive-fonts / calligraphy 文是否已吃到,不新开 | 继续观察 |
| 2026-11-02 | US | handwriting analysis quiz | +600% | Theo Lindgren | 正中 /handwriting-personality-quiz 工具词;核对规划 §五 的配套文章状态,未动工则尽快补配(§3.1) | 建议排期(核对 §五) |
| 2026-11-02 | US | november cursive / november in cursive | +450% | Wes Morales | 已发布 november-in-cursive(Wes,实测截图题图,含大写 N 断连规则、m-b 拥挤点、12 个月难度表) | ✅ 已完成(2026-11-02) |
| 2026-11-02 | US | november calligraphy / november in calligraphy | +700/+450% | June Park | 同簇的书法版:月历/手账 banner 字幕场景,可与上一条同周发布成对 | 建议排期(同上) |
| 2026-10-12→11-02 | US | happy halloween in cursive / happy halloween calligraphy / spooky handwriting | +120~150% | Wes/June | 万圣节书写簇已过窗口(10-31):放弃今年,统一登记 2027 年 9 月底发布 | 放弃(登记明年) |
| 2026-11-02 | US | handwriting worksheets for kids | +100% | Clara Hartley | 广义词,现有 kindergarten/sight-word/copywork 已广覆盖;评估是否值得一篇 umbrella 汇总文 | 继续观察 |
| 2026-11-02 | US | free calligraphy fonts copy and paste | +170% | Theo Lindgren | cursive-text-generator 文章已覆盖 copy-paste 需求;核对正文是否点明 calligraphy 变体词 | 已覆盖(核对) |
| 2026-11-02 | DE | persönliche handschrift 4 buchstaben | +130% | — | — | 放弃:填字解题流量 |
| 2026-11-02 | DE | schlechte handschrift scherzhaft | +110% | — | — | 放弃:梗图娱乐向,与工具/教学无契合 |
| 2026-11-02 | DE | schreibschrift arten | +170% | Clara Hartley | 德国学校连笔体系确实有"Aarten"内容需求(Vereinfachte/Lateinische Ausgangsschrift 等):de 先行科普文,挂生成器实测参数 | 建议排期(de 新文章,当地独有) |
| 2026-11-02 | FR | écriture cursive gs | +110% | Clara Hartley | GS( Grande Section)衔接需求:并入 §6.7 P0-2 graphisme 文章的 GS 章节,不单开 | 并入 P0-2 |
| 2026-10-26→11-02 | FR | d majuscule calligraphie(Breakout) | Breakout | Wes Morales | 在 2026-11-01 的 15 字母表基础上补 D 行(geste/piège)+周计划归组+「majuscule calligraphie」检索词衔接 | ✅ 已完成(2026-11-02) |
| 2026-11-09 | US | half print half cursive handwriting(3 变体,含 meaning 问句) | 2×Breakout/+700% | Mara Voss | 混合字迹簇是本周最强信号:增强 cursive-vs-print——加「half print half cursive 叫什么/正常吗」章节(hybrid/italic 术语科普);注意 cursive 矩阵被 GSC 判 thin,优先增强现有页不新开 | 排期建议(增强现有) |
| 2026-11-09 | US | thanksgiving handwriting practice / worksheets | 2×Breakout | Clara Hartley | 感恩节 11-26,窗口仅剩约两周:thanksgiving 书写练习页文章(生成器实测参数+节日词表),复用 kindergarten/sight-word 模板 | 催办(季节窗口,立即动笔) |
| 2026-11-09 | US | christmas in cursive / merry christmas in cursive | +160/+110% | Wes Morales | 复用 november-in-cursive 模板:圣诞月份/祝福语连笔文,11 月中发布吃 12 月搜索爬升 | 排期建议(立即,模板现成) |
| 2026-11-09 | DE | eigene handschrift als font | Breakout | Theo Lindgren | 「把手写变成字体」是反复出现的需求(Calligraphr 类工具):de 先行对比向文章——字体化工具 vs 本站生成器的快路线;红线:不贬低竞品 | 排期建议(de 新文章) |
| 2026-11-09 | US | first grade handwriting worksheets | +100% | Clara Hartley | 一年级特定词;现有 kindergarten/sight-word/copywork 已邻近覆盖,且 cursive 矩阵被判 thin | 继续观察(不新开薄页) |
| 2026-11-09 | US | script handwriting | +110% | Wes Morales | 宽泛词,cursive 矩阵已覆盖;GSC 判 thin 期间不加页 | 继续观察 |
| 2026-11-09 | US | italics beautiful handwriting for children | +300% | Clara Hartley | 意大利斜体儿童教学:站内字体不含 italic hand,产品契合弱 | 继续观察(弱契合) |
| 2026-11-09 | US | pinterest handwriting | +110% | — | — | 放弃:平台站内导航词,无内容可做 |
| 2026-11-09 | US | patsy ramsey handwriting | +300% | — | — | 放弃:案件名人新闻 |
| 2026-11-09 | DE | eigenart der handschrift | Breakout | — | — | 放弃:填字解题(buchstaben 同款模式) |
| 2026-11-09 | DE | schlechte handschrift scherzhaft 5 buchstaben | Breakout | — | — | 放弃:填字解题(上周同款加词缀,模式确认) |
