#!/usr/bin/env node
/**
 * Google Trends 选题池扫描器(docs/personas/README.md「选题池」一节)。
 *
 * 两路数据源:
 * 1. 主源:6 个站内种子词的「相关查询上升榜」(Related queries → Rising,近 7 天,US)。
 *    走 Trends explore + widgetdata/relatedsearches 非官方接口,这是"和 handwriting 相关的词在涨什么";
 * 2. 参考源:大众每日热搜 RSS(全类别),只做观察,新闻热点默认不接。
 *
 * 状态:scripts/.trends-seen.json(rising/general 两个池:首见/最近见/次数/增长等),90 天未见过期。
 * 输出:docs/trends-backlog.md —— 只重渲染 AUTO 注释对之间的表格,人工评估区原样保留。
 * stdout 会列出"新入选且值得评估"的 rising 词,供定时任务写进人工评估区;本脚本只收集不写文。
 *
 * 用法:node scripts/trends-backlog.mjs [--geo=US]
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const STATE_FILE = path.join(ROOT, "scripts/.trends-seen.json");
const BACKLOG_FILE = path.join(ROOT, "docs/trends-backlog.md");
const PRUNE_DAYS = 90;
const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 trends-backlog/1.1";

/** 种子词 = 站内选题簇的圆心(docs/personas/README.md);换词请连同 README 一起改 */
const SEEDS = ["handwriting", "cursive", "handwriting practice", "handwriting worksheets", "name tracing", "calligraphy"];

const geo = (process.argv.find((a) => a.startsWith("--geo=")) ?? "--geo=US").split("=")[1].toUpperCase();
const TIMEFRAME = "now 7-d"; // Trends 合法值:近 7 天(today 7-d 是无效格式,会 400)
const TODAY = new Date().toISOString().slice(0, 10);

/** 站内关键词宇宙;\b 防子串误判(ink 不中 LinkedIn)。rising 词已天然相关,此正则用作二道门,挡杂音 */
const FIT_RE =
  /\b(handwrit\w*|cursive|worksheet\w*|printable|pen ?pal\w*|fountain pen\w*|gel pen\w*|calligraph\w*|lettering|signature\w*|name trac\w*|tracing|note ?taking|notebook\w*|journall?ing|journal\w*|diary|stationery|inks?\b|abc\b|alphabet\w*|kindergarten|preschool|homeschool\w*|teacher\w*|classroom\w*|essay\w*|exam\w*|stud(y|ies|ying)|studygram|studytok|thank ?you\w*|santa|wedding\w*|invitation\w*|greeting card\w*|fonts?\b|scribbl\w*|doodl\w*|poem\w*|envelope\w*|grapholog\w*|penmanship|dysgraphia|letter formation|fine motor)/i;

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

/** Trends explore:拿 RELATED_QUERIES widget 的 token;对 427/401/429 带退避重试,首响应的 NID cookie 要带上 */
async function fetchRelatedRising(seed, cookies) {
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
  const rsText = await rsRes.text();
  const rs = parseJson(rsText);

  // rankedList 含 top 与 rising 两张表,按 formattedValue 形态识别 rising(含 % 或 Breakout);
  // kw.query 兼容字符串与 {query: "..."} 对象两种载荷
  const out = [];
  for (const list of rs.default?.rankedList ?? []) {
    for (const kw of list.rankedKeywords ?? []) {
      if (/%|breakout/i.test(kw.formattedValue ?? "")) {
        const q = typeof kw.query === "object" && kw.query !== null ? kw.query.query : kw.query;
        if (q) out.push({ query: String(q), growth: kw.formattedValue, num: growthNum(kw.formattedValue) });
      }
    }
  }
  return out;
}

const RSS_URL = `https://trends.google.com/trending/rss?geo=${geo}`;

async function fetchRssGeneral() {
  const res = await get(RSS_URL);
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
  // 兼容 v1(只有 terms 字段):整体迁移到 general 池
  if (!raw.rising && raw.terms) return { rising: {}, general: raw.terms };
  return { rising: raw.rising ?? {}, general: raw.general ?? {} };
}

function daysBetween(a, b) {
  return Math.round((new Date(b) - new Date(a)) / 86_400_000);
}

async function main() {
  const state = loadState();

  // ---- 主源:种子词相关上升榜 ----
  const cookies = [];
  const perSeedCounts = {};
  let freshRising = 0;
  const suggestions = [];
  for (const seed of SEEDS) {
    let rising = [];
    try {
      rising = await fetchRelatedRising(seed, cookies);
    } catch (err) {
      console.error(`  [warn] ${seed}: ${err.message}`);
      continue;
    }
    perSeedCounts[seed] = rising.length;
    for (const { query, growth, num } of rising) {
      const prev = state.rising[query];
      if (!prev) {
        freshRising++;
        state.rising[query] = { firstSeen: TODAY, lastSeen: TODAY, count: 1, growth, maxGrowth: num, seed, source: "rising" };
      } else {
        prev.lastSeen = TODAY;
        prev.count += 1;
        if (num > prev.maxGrowth) {
          prev.maxGrowth = num;
          prev.growth = growth;
        }
      }
      if (!prev && worthEvaluating(growth, query)) suggestions.push({ query, growth, num, seed });
    }
    await new Promise((r) => setTimeout(r, 10_000)); // 对接口限速保持礼貌(429 惩罚窗口可达小时级)
  }

  // ---- 参考源:大众日榜 RSS ----
  let freshGeneral = 0;
  try {
    for (const { title, traffic, note } of await fetchRssGeneral()) {
      const prev = state.general[title];
      if (!prev) {
        freshGeneral++;
        state.general[title] = { firstSeen: TODAY, lastSeen: TODAY, count: 1, traffic, note };
      } else {
        prev.lastSeen = TODAY;
        prev.count += 1;
      }
    }
  } catch (err) {
    console.error(`  [warn] 大众日榜 RSS 失败(不影响主源): ${err.message}`);
  }

  // ---- 过期清理 ----
  for (const pool of ["rising", "general"]) {
    for (const [term, t] of Object.entries(state[pool])) {
      if (daysBetween(t.lastSeen, TODAY) > PRUNE_DAYS) delete state[pool][term];
    }
  }

  // ---- 渲染 backlog(只动 AUTO 区间) ----
  const risingRows = Object.entries(state.rising)
    .sort((a, b) => (b[1].maxGrowth - a[1].maxGrowth) || b[1].lastSeen.localeCompare(a[1].lastSeen))
    .map(([q, t]) => `| ${t.firstSeen} | ${t.lastSeen} | ${q} | ${t.growth} | ${t.seed} | ${t.count} |`);
  const generalRows = Object.entries(state.general)
    .sort((a, b) => b[1].lastSeen.localeCompare(a[1].lastSeen))
    .map(([q, t]) => `| ${t.firstSeen} | ${q} | ${t.traffic} | ${t.count} | ${t.note.replace(/\|/g, "/")} |`);

  let backlog = existsSync(BACKLOG_FILE) ? readFileSync(BACKLOG_FILE, "utf8") : null;
  if (!backlog) backlog = scaffold();
  const risingTable =
    "| 首见 | 最近见 | 关键词 | 近7天增长 | 种子词 | 次数 |\n|---|---|---|---|---|---|" +
    (risingRows.length ? "\n" + risingRows.join("\n") : "");
  const generalTable =
    "| 首见 | 关键词 | 热度 | 次数 | 当日新闻语境 |\n|---|---|---|---|---|" +
    (generalRows.length ? "\n" + generalRows.join("\n") : "");
  backlog = backlog
    .replace(/(<!-- AUTO:RISING START[^>]*-->)[\s\S]*?(<!-- AUTO:RISING END -->)/, `$1\n${risingTable}\n$2`)
    .replace(/(<!-- AUTO:GENERAL START[^>]*-->)[\s\S]*?(<!-- AUTO:GENERAL END -->)/, `$1\n${generalTable}\n$2`);
  backlog = backlog.replace(/geo=\w+/, `geo=${geo}`);

  writeFileSync(STATE_FILE, JSON.stringify({ ...state, lastRun: TODAY, lastGeo: geo }, null, 1) + "\n");
  writeFileSync(BACKLOG_FILE, backlog);

  // ---- 汇报 ----
  const seedSummary = Object.entries(perSeedCounts).map(([s, n]) => `${s}:${n}`).join(", ");
  console.log(
    `[${TODAY}] geo=${geo} rising 池 ${Object.keys(state.rising).length} 条(新 ${freshRising}),general 池 ${Object.keys(state.general).length} 条(新 ${freshGeneral})`,
  );
  console.log(`各种子词上升词数: ${seedSummary || "全部失败"}`);
  if (suggestions.length) {
    console.log("值得评估的新 rising 词(涨幅 Breakout 或 ≥100% 且命中站内宇宙):");
    for (const s of suggestions.slice(0, 12)) console.log(`  - ${s.query}  (${s.growth})  ← 种子词 ${s.seed}`);
  } else {
    console.log("无值得评估的新 rising 词");
  }
}

/** backlog 脚手架(首次生成;之后人工内容与 AUTO 区间外的部分永不覆盖) */
function scaffold() {
  return `# Google Trends 选题池

> 数据源与规则见 docs/personas/README.md「选题池」;本文件由 \`scripts/trends-backlog.mjs\` 每周自动维护,
> 只有 AUTO 注释对之间的表格是机器区,「人工评估」等其余部分归人工。

## 主源:种子词相关查询上升榜(Rising, 近 7 天, US)

以站内选题簇圆心词为种子,看周边词近 7 天涨幅——这就是"和 handwriting 相关的词在涨什么"。
**涨幅 Breakout 或 ≥100%** 的新词由定时任务写进「人工评估」,能挂上体验资产(角色卡「发布门槛」)才进排期。

<!-- AUTO:RISING START 由 scripts/trends-backlog.mjs 维护,勿手工编辑此区间 -->
<!-- AUTO:RISING END -->

## 参考源:大众每日热搜 RSS(全类别,仅供观察)

与站内主题无交集是常态;新闻热点默认不接,博客排名窗口追不上新闻生命周期。季节性选题提前 6–8 周发布。

<!-- AUTO:GENERAL START 由 scripts/trends-backlog.mjs 维护,勿手工编辑此区间 -->
<!-- AUTO:GENERAL END -->

## 人工评估

<!-- 每周扫描后追加:日期 | 关键词 | 增长 | 建议角色 | 体验资产点子 | 结论(排期/放弃/继续观察) -->
`;
}

main().catch((err) => {
  console.error(`trends-backlog 失败:${err.message}`);
  process.exit(1);
});
