#!/usr/bin/env node
/**
 * Google Trends 选题池扫描器(docs/personas/README.md「选题池」一节)。
 *
 * 两路数据源,按 geo 扫描(默认 US,DE,FR —— 站点 8 语言,德法是博客正文已覆盖的优先补齐语言):
 * 1. 主源:每个 geo 一组「种子词」的相关查询上升榜(Related queries → Rising,近 7 天)。
 *    种子词 = 站点能力簇的圆心词,按当地搜索语言选词(见 GEO_SEEDS 上方的映射注释);
 * 2. 参考源:大众每日热搜 RSS(全类别),仅供观察,新闻热点默认不接。
 *
 * 状态:scripts/.trends-seen.json({rising:{geo:{词:...}},general:{geo:{...}}},v2 平铺结构自动迁移到 US),
 * 90 天未见过期。输出:docs/trends-backlog.md —— 只重渲染 AUTO 注释对之间的表格,人工评估区原样保留。
 * stdout 列出"新入选且值得评估"的 rising 词(涨幅 Breakout 或 ≥100% 且命中关键词宇宙),供定时任务写进人工评估区。
 *
 * 限速现实:非官方接口 429 惩罚窗口可达小时级,脚本带退避重试 + 种子间间隔;
 * 个别种子失败会告警跳过,不影响其余种子。整轮 36 个种子 × 2 请求,正常需数分钟。
 *
 * 用法:node scripts/trends-backlog.mjs [--geo=US,DE,FR]
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const STATE_FILE = path.join(ROOT, "scripts/.trends-seen.json");
const BACKLOG_FILE = path.join(ROOT, "docs/trends-backlog.md");
const PRUNE_DAYS = 90;
const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 trends-backlog/1.2";

/**
 * 站点能力簇 → 各语言种子词(用当地人的搜索语言,不是直译):
 * - 手写渲染主工具(转手写/提升字迹):US handwriting · DE handschrift / handschrift verbessern · FR améliorer son écriture
 * - 连笔簇(/cursive*):US cursive · DE schreibschrift(德国学校连笔) · FR écriture cursive(法国小学低年级就教)
 * - 儿童名字/描红(/name-tracing /name-coloring /word-work):US name tracing · DE name schreiben lernen · FR écrire son nom
 * - 打印纸(/printable-paper):US handwriting worksheets · DE linienblatt(德国学校制式纸) · FR feuille d'écriture
 * - 书法/贺卡(/templates /diy-wedding):US calligraphy · DE kalligraphie · FR calligraphie
 * - 练习日常(/daily-* /writing-practice):US handwriting practice · FR graphisme(法国幼儿园运笔训练)
 */
const GEO_SEEDS = {
  US: ["handwriting", "cursive", "handwriting practice", "handwriting worksheets", "name tracing", "calligraphy"],
  DE: ["handschrift", "schreibschrift", "handschrift verbessern", "name schreiben lernen", "linienblatt", "kalligraphie"],
  FR: ["écriture cursive", "calligraphie", "améliorer son écriture", "graphisme", "écrire son nom", "feuille d'écriture"],
};

const geoArg = process.argv.find((a) => a.startsWith("--geo="));
const GEOS = (geoArg ? geoArg.split("=")[1] : "US,DE,FR").toUpperCase().split(",").map((g) => g.trim());
const TIMEFRAME = "now 7-d"; // Trends 合法值:近 7 天(today 7-d 是无效格式,会 400)
const TODAY = new Date().toISOString().slice(0, 10);

/**
 * 站内关键词宇宙(三语);\b 防子串误判(ink 不中 LinkedIn)。
 * DE:德校书写体系(schreibschrift/ausgangsschrift/druckschrift)、制式纸(lineatur/linienblatt)、贺卡丧谢(grußkarte/danksagung);
 * FR:法国学校体系(écriture cursive/graphisme/lignage/seyès 制/maternelle)、手写/manuscrit、圣诞信(père noël)。
 */
const FIT_RE =
  /\b(handwrit\w*|cursive|worksheet\w*|printable|pen ?pal\w*|fountain pen\w*|gel pen\w*|calligraph\w*|kalligraphie\w*|lettering|signature\w*|name trac\w*|tracing|note ?taking|notebook\w*|journall?ing|journal\w*|diary|stationery|inks?\b|abc\b|alphabet\w*|kindergarten|preschool|homeschool\w*|teacher\w*|classroom\w*|essay\w*|exam\w*|stud(y|ies|ying)|studygram|studytok|thank ?you\w*|santa|wedding\w*|invitation\w*|greeting card\w*|fonts?\b|scribbl\w*|doodl\w*|poem\w*|envelope\w*|grapholog\w*|penmanship|dysgraphia|letter formation|fine motor|handschrift\w*|schreibschrift|ausgangsschrift|druckschrift|linienblatt\w*|lineatur\w*|schreiblinien|schreibpapier|arbeitsblatt\w*|grusskarte\w*|grußkarte\w*|danksagung\w*|weihnachtsmann|écriture|ecriture|graphisme|seyès|seyes|lignage|maternelle|manuscrit\w*|manuscrite|père noel|remerciement\w*|amélior\w*|amelior\w*|livre d'or|vœux|voeux)/i;

/** 评估门槛:涨幅 Breakout 或 ≥100% 才值得进人工评估 */
function growthNum(formatted) {
  if (/breakout/i.test(formatted)) return Infinity;
  const m = formatted.match(/(\d+)\s*%/);
  return m ? Number(m[1]) : 0;
}
function worthEvaluating(growth, query) {
  return FIT_RE.test(query) && growthNum(growth) >= 100;
}

async function get(url, { referer, cookie } = {}) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": UA,
      Accept: "application/json, text/plain, */*",
      ...(cookie ? { Cookie: cookie.Cookie } : {}),
      ...(referer ? { Referer: referer, "Accept-Language": "en-US,en;q=0.9" } : {}),
    },
    signal: AbortSignal.timeout(20_000),
  });
  return res;
}

/** 剥掉 Google JSON API 的 )]}' 类前缀(实测有 )]}', 等变体):从第一个 { 或 [ 截取 */
function parseJson(text) {
  const start = text.search(/[{[]/);
  if (start === -1) throw new Error("响应中找不到 JSON");
  return JSON.parse(text.slice(start));
}

/** Trends explore → relatedsearches:对 427/401/429 带退避重试,首响应的 NID cookie 要带上 */
async function fetchRelatedRising(seed, geo, cookies) {
  const req = encodeURIComponent(
    JSON.stringify({ comparisonItem: [{ keyword: seed, geo, time: TIMEFRAME }], category: 0, property: "" }),
  );
  const exploreUrl = `https://trends.google.com/trends/api/explore?hl=en-US&tz=0&req=${req}`;
  let res;
  for (let attempt = 0; attempt < 4; attempt++) {
    const cookieHeader = cookies.length ? { Cookie: cookies.join("; ") } : {};
    res = await get(exploreUrl, { referer: "https://trends.google.com/", cookie: cookieHeader });
    if (res.ok) break;
    for (const c of res.headers.getSetCookie?.() ?? []) {
      const kv = c.split(";")[0];
      if (!cookies.includes(kv)) cookies.push(kv);
    }
    if (attempt < 3) await new Promise((r) => setTimeout(r, [5_000, 15_000, 30_000][attempt]));
  }
  if (!res?.ok) throw new Error(`explore ${seed} HTTP ${res?.status}`);
  const data = parseJson(await res.text());
  const widget = (data.widgets ?? []).find((w) => String(w.id).startsWith("RELATED_QUERIES"));
  if (!widget) throw new Error(`explore ${seed} 无 RELATED_QUERIES widget`);

  const rsUrl =
    `https://trends.google.com/trends/api/widgetdata/relatedsearches?hl=en-US&tz=0` +
    `&req=${encodeURIComponent(JSON.stringify(widget.request))}&token=${widget.token}`;
  let rsRes;
  for (let attempt = 0; attempt < 3; attempt++) {
    rsRes = await get(rsUrl, { referer: "https://trends.google.com/", cookie: cookies.length ? { Cookie: cookies.join("; ") } : {} });
    if (rsRes.ok) break;
    if (attempt < 2) await new Promise((r) => setTimeout(r, [20_000, 40_000][attempt]));
  }
  if (!rsRes?.ok) throw new Error(`relatedsearches ${seed} HTTP ${rsRes?.status}`);
  const rs = parseJson(await rsRes.text());

  // rankedList 含 top 与 rising 两张表,按 formattedValue 形态识别 rising(含 % 或 Breakout);
  // 实测载荷键名为 rankedKeyword(单数);query 为纯字符串,兼容旧版对象形态
  const out = [];
  for (const list of rs.default?.rankedList ?? []) {
    for (const kw of list.rankedKeyword ?? list.rankedKeywords ?? []) {
      if (/%|breakout/i.test(kw.formattedValue ?? "")) {
        const q = typeof kw.query === "object" && kw.query !== null ? kw.query.query : kw.query;
        if (q) out.push({ query: String(q), growth: kw.formattedValue, num: growthNum(kw.formattedValue) });
      }
    }
  }
  return out;
}

const RSS_URL = (geo) => `https://trends.google.com/trending/rss?geo=${geo}`;

async function fetchRssGeneral(geo) {
  const res = await get(RSS_URL(geo));
  if (!res.ok) throw new Error(`RSS HTTP ${res.status}`);
  const xml = await res.text();
  const items = [];
  for (const m of xml.matchAll(/<item>([\s\S]*?)<\/item>/g)) {
    const body = m[1];
    const title = (body.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? "")
      .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
      .replace(/&(quot|apos|lt|gt|amp);/g, (_, e) => ({ quot: '"', apos: "'", lt: "<", gt: ">", amp: "&" })[e])
      .trim();
    if (!title) continue;
    const traffic = (body.match(/<ht:approx_traffic>([\s\S]*?)<\/ht:approx_traffic>/)?.[1] ?? "?").trim();
    const note = (body.match(/<ht:news_item_title>([\s\S]*?)<\/ht:news_item_title>/)?.[1] ?? "").trim().slice(0, 90);
    items.push({ title, traffic, note });
  }
  return items;
}

function loadState() {
  if (!existsSync(STATE_FILE)) return { rising: {}, general: {} };
  const raw = JSON.parse(readFileSync(STATE_FILE, "utf8"));
  /** 迁移:v1 terms 平铺 / v2 rising、general 平铺(当时只有 US)→ v3 按 geo 分池 */
  const toGeoPools = (pool, flatSource) => {
    const src = pool ?? flatSource ?? {};
    const keys = Object.keys(src);
    if (keys.length === 0) return {};
    const isNested = keys.every((k) => ["US", "DE", "FR"].includes(k));
    return isNested ? src : { US: src };
  };
  return {
    rising: toGeoPools(raw.rising),
    general: toGeoPools(raw.general, raw.terms),
  };
}

function daysBetween(a, b) {
  return Math.round((new Date(b) - new Date(a)) / 86_400_000);
}

async function main() {
  const state = loadState();
  for (const g of GEOS) {
    state.rising[g] = state.rising[g] ?? {};
    state.general[g] = state.general[g] ?? {};
  }

  // ---- 主源:各 geo 种子词相关上升榜 ----
  const cookies = [];
  const perSeedCounts = {};
  let freshRising = 0;
  const suggestions = [];
  for (const geo of GEOS) {
    for (const seed of GEO_SEEDS[geo] ?? []) {
      let rising = [];
      try {
        rising = await fetchRelatedRising(seed, geo, cookies);
      } catch (err) {
        console.error(`  [warn] ${geo}/${seed}: ${err.message}`);
        continue;
      }
      perSeedCounts[`${geo}/${seed}`] = rising.length;
      for (const { query, growth, num } of rising) {
        const prev = state.rising[geo][query];
        if (!prev) {
          freshRising++;
          state.rising[geo][query] = { firstSeen: TODAY, lastSeen: TODAY, count: 1, growth, maxGrowth: num, seed, source: "rising" };
        } else {
          prev.lastSeen = TODAY;
          prev.count += 1;
          if (num > prev.maxGrowth) {
            prev.maxGrowth = num;
            prev.growth = growth;
          }
        }
        if (!prev && worthEvaluating(growth, query)) suggestions.push({ geo, query, growth, num, seed });
      }
      await new Promise((r) => setTimeout(r, 10_000)); // 对接口限速保持礼貌(429 惩罚窗口可达小时级)
    }
  }

  // ---- 参考源:大众日榜 RSS ----
  let freshGeneral = 0;
  for (const geo of GEOS) {
    try {
      for (const { title, traffic, note } of await fetchRssGeneral(geo)) {
        const prev = state.general[geo][title];
        if (!prev) {
          freshGeneral++;
          state.general[geo][title] = { firstSeen: TODAY, lastSeen: TODAY, count: 1, traffic, note };
        } else {
          prev.lastSeen = TODAY;
          prev.count += 1;
        }
      }
    } catch (err) {
      console.error(`  [warn] ${geo} 大众日榜 RSS 失败(不影响主源): ${err.message}`);
    }
  }

  // ---- 过期清理 ----
  for (const pool of ["rising", "general"]) {
    for (const geo of Object.keys(state[pool])) {
      for (const [term, t] of Object.entries(state[pool][geo])) {
        if (daysBetween(t.lastSeen, TODAY) > PRUNE_DAYS) delete state[pool][geo][term];
      }
    }
  }

  // ---- 渲染 backlog(只动 AUTO 区间) ----
  const risingRows = Object.entries(state.rising)
    .flatMap(([geo, terms]) => Object.entries(terms).map(([q, t]) => ({ geo, q, t })))
    .sort((a, b) => b.t.maxGrowth - a.t.maxGrowth || b.t.lastSeen.localeCompare(a.t.lastSeen))
    .map(
      ({ geo, q, t }) =>
        `| ${t.firstSeen} | ${t.lastSeen} | ${geo} | ${q} | ${t.growth} | ${t.seed} | ${t.count} |`,
    );
  const generalRows = Object.entries(state.general)
    .flatMap(([geo, terms]) => Object.entries(terms).map(([q, t]) => ({ geo, q, t })))
    .sort((a, b) => b.t.lastSeen.localeCompare(a.t.lastSeen))
    .map(({ geo, q, t }) => `| ${t.firstSeen} | ${geo} | ${q} | ${t.traffic} | ${t.count} | ${t.note.replace(/\|/g, "/")} |`);

  let backlog = existsSync(BACKLOG_FILE) ? readFileSync(BACKLOG_FILE, "utf8") : null;
  if (!backlog?.includes("<!-- AUTO:RISING START")) backlog = scaffold();
  const risingHeader =
    "| 首见 | 最近见 | Geo | 关键词 | 近7天增长 | 种子词 | 次数 |\n|---|---|---|---|---|---|---|" +
    (risingRows.length ? "\n" + risingRows.join("\n") : "");
  const generalHeader =
    "| 首见 | Geo | 关键词 | 热度 | 次数 | 当日新闻语境 |\n|---|---|---|---|---|---|" +
    (generalRows.length ? "\n" + generalRows.join("\n") : "");
  backlog = backlog
    .replace(/(<!-- AUTO:RISING START[^>]*-->)[\s\S]*?(<!-- AUTO:RISING END -->)/, `$1\n${risingHeader}\n$2`)
    .replace(/(<!-- AUTO:GENERAL START[^>]*-->)[\s\S]*?(<!-- AUTO:GENERAL END -->)/, `$1\n${generalHeader}\n$2`);

  writeFileSync(
    STATE_FILE,
    JSON.stringify({ ...state, lastRun: TODAY, lastGeos: GEOS }, null, 1) + "\n",
  );
  writeFileSync(BACKLOG_FILE, backlog);

  // ---- 汇报 ----
  const seedSummary = Object.entries(perSeedCounts).map(([s, n]) => `${s}:${n}`).join(", ");
  const risingTotal = Object.values(state.rising).reduce((n, g) => n + Object.keys(g).length, 0);
  const generalTotal = Object.values(state.general).reduce((n, g) => n + Object.keys(g).length, 0);
  console.log(`[${TODAY}] geos=${GEOS.join(",")} rising 池 ${risingTotal} 条(新 ${freshRising}),general 池 ${generalTotal} 条(新 ${freshGeneral})`);
  console.log(`各种子词上升词数: ${seedSummary || "全部失败"}`);
  if (suggestions.length) {
    console.log("值得评估的新 rising 词(涨幅 Breakout 或 ≥100% 且命中三语关键词宇宙):");
    for (const s of suggestions.slice(0, 15)) console.log(`  - [${s.geo}] ${s.query}  (${s.growth})  ← 种子词 ${s.seed}`);
  } else {
    console.log("无值得评估的新 rising 词");
  }
}

/** backlog 脚手架(首次生成;之后人工内容与 AUTO 区间外的部分永不覆盖) */
function scaffold() {
  return `# Google Trends 选题池

> 数据源与规则见 docs/personas/README.md「选题池」;本文件由 \`scripts/trends-backlog.mjs\` 每周自动维护,
> 只有 AUTO 注释对之间的表格是机器区,「人工评估」等其余部分归人工。

## 主源:种子词相关查询上升榜(Rising, 近 7 天, US/DE/FR)

以站点能力簇的圆心词为种子、按当地搜索语言选词(DE 德校书写体系/制式纸,FR écriture cursive/graphisme 体系),
看周边词近 7 天涨幅——这就是"和 handwriting 相关的词在涨什么"。
**涨幅 Breakout 或 ≥100%** 的新词由定时任务写进「人工评估」,能挂上体验资产才进排期。
DE/FR 候选的路由规则:优先翻译补齐现有 EN 文章的 de/fr 正文(规范 §3.2),确属当地独有需求才新开文章。

<!-- AUTO:RISING START 由 scripts/trends-backlog.mjs 维护,勿手工编辑此区间 -->
<!-- AUTO:RISING END -->

## 参考源:大众每日热搜 RSS(全类别,仅供观察)

与站内主题无交集是常态;新闻热点默认不接,博客排名窗口追不上新闻生命周期。季节性选题提前 6–8 周发布。

<!-- AUTO:GENERAL START 由 scripts/trends-backlog.mjs 维护,勿手工编辑此区间 -->
<!-- AUTO:GENERAL END -->

## 人工评估

<!-- 每周扫描后追加:日期 | Geo | 关键词 | 增长 | 建议角色 | 体验资产点子 | 结论(排期/放弃/继续观察) -->
`;
}

main().catch((err) => {
  console.error(`trends-backlog 失败:${err.message}`);
  process.exit(1);
});
