/**
 * IndexNow 提交脚本(Bing / Yandex / Seznam 等共用协议)
 *
 * 用法:
 *   node scripts/indexnow-submit.mjs            # 提交 sitemap.xml 里的全部 URL(首次/大改版用)
 *   node scripts/indexnow-submit.mjs <url>...   # 只提交指定 URL(日常更新用)
 *
 * 前置:public/<KEY>.txt 已随站点部署,可公开访问。
 * 注意:仅提交新增或内容有变的 URL,反复全量提交会被搜索引擎视为滥用。
 */
const SITE = "https://voicetohandwriting.online";
const KEY = "fd1dfcff0b004932a7cd192d06ffd25c";

const args = process.argv.slice(2);
let urlList = args;

if (urlList.length === 0) {
  const res = await fetch(`${SITE}/sitemap.xml`);
  if (!res.ok) throw new Error(`拉取 sitemap 失败: HTTP ${res.status}`);
  const xml = await res.text();
  urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  console.log(`从 sitemap 解析到 ${urlList.length} 个 URL`);
}

if (urlList.length === 0) throw new Error("没有可提交的 URL");
if (urlList.length > 10000) throw new Error(`IndexNow 单次最多 10000 个 URL,当前 ${urlList.length}`);

const res = await fetch("https://api.indexnow.org/IndexNow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: new URL(SITE).host, key: KEY, urlList }),
});

// 200/202 = 已接受;400 = 格式错;403 = key 文件校验失败;422 = URL 与 key 不属同一站点;429 = 限流
console.log(`IndexNow 响应: HTTP ${res.status} (${urlList.length} 个 URL)`);
if (!res.ok) {
  console.error(await res.text().catch(() => ""));
  process.exit(1);
}
