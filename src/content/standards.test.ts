import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { POSTS } from "@/content/posts";
import { BLOG_CONTENT, postLocales } from "@/content/blog/registry";
import { RELATED, TOOL_LABEL_KEY } from "@/content/related";

/**
 * 开发规范自动化校验(docs/DEVELOPMENT-STANDARDS.md §4)。
 * 规范中标"必须"且可机械检查的项在此固化;违反即测试失败,不得合并。
 */

const ROOT = process.cwd();
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

describe("规范 §3.4:POSTS 元数据", () => {
  it("slug 唯一且为小写 kebab-case", () => {
    const slugs = POSTS.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(SLUG_RE);
  });

  it.each(POSTS.map((p) => p.slug))("%s 有非空 en 标题/描述与合法日期", (slug) => {
    const post = POSTS.find((p) => p.slug === slug)!;
    expect(post.i18n.en?.title.trim()).toBeTruthy();
    expect(post.i18n.en?.description.trim()).toBeTruthy();
    expect(post.date).toMatch(DATE_RE);
    expect(post.updated).toMatch(DATE_RE);
    expect(new Date(post.updated) >= new Date(post.date)).toBe(true);
  });

  it.each(POSTS.map((p) => p.slug))("%s 题图若有则真实存在于 public/", (slug) => {
    const post = POSTS.find((p) => p.slug === slug)!;
    if (!post.image) return;
    expect(existsSync(path.join(ROOT, "public", post.image)), `${post.image} 不存在`).toBe(true);
  });
});

describe("规范 §3.4:正文注册表一致性", () => {
  it("POSTS 与 BLOG_CONTENT 双向一致(无幽灵 slug)", () => {
    const metaSlugs = new Set(POSTS.map((p) => p.slug));
    const bodySlugs = new Set(Object.keys(BLOG_CONTENT));
    const onlyMeta = [...metaSlugs].filter((s) => !bodySlugs.has(s));
    const onlyBody = [...bodySlugs].filter((s) => !metaSlugs.has(s));
    expect({ onlyMeta, onlyBody }).toEqual({ onlyMeta: [], onlyBody: [] });
  });

  it.each(POSTS.map((p) => p.slug).flatMap((slug) => postLocales(slug).map((l) => [slug, l] as const)))(
    "%s.%s.mdx 存在且恰好一个 H1",
    (slug, locale) => {
      const file = path.join(ROOT, "src/content/blog", `${slug}.${locale}.mdx`);
      expect(existsSync(file), `${file} 缺失(readingMinutes 与注册表不一致)`).toBe(true);
      const h1s = readFileSync(file, "utf8").split("\n").filter((line) => /^#\s/.test(line));
      expect(h1s, `${slug}.${locale} 应恰好一个一级标题`).toHaveLength(1);
    },
  );
});

describe("规范 §3.3:每篇文章必须登记内链(RELATED)", () => {
  it.each(POSTS.map((p) => p.slug))("%s 已登记 RELATED 且 tools/posts 合法", (slug) => {
    const cfg = RELATED[slug];
    expect(cfg, `${slug} 未登记 related.ts,文章尾部将无内链区块`).toBeDefined();
    expect(cfg!.tools.length, `${slug} 至少链 1 个工具`).toBeGreaterThanOrEqual(1);
    for (const tool of cfg!.tools) {
      expect(TOOL_LABEL_KEY[tool], `${slug} 引用的 ${tool} 不在 TOOL_LABEL_KEY,RelatedLinks 会静默丢弃`).toBeDefined();
    }
    for (const post of cfg!.posts) {
      expect(post, `${slug} 不得链接自身`).not.toBe(slug);
      expect(POSTS.some((p) => p.slug === post), `${slug} 引用的文章 ${post} 不在 POSTS`).toBe(true);
    }
  });
});

describe("规范 §1.2:messages 多语言键位一致", () => {
  // 扁平化 JSON 为 "a.b.c" 键集合;zh 与 en 必须一一对应,防止改文案时漏掉另一语言
  const flatKeys = (obj: unknown, prefix = ""): string[] =>
    Object.entries(obj as Record<string, unknown>).flatMap(([k, v]) => {
      const key = prefix ? `${prefix}.${k}` : k;
      return v && typeof v === "object" && !Array.isArray(v) ? flatKeys(v, key) : [key];
    });

  const en = JSON.parse(readFileSync(path.join(ROOT, "messages/en.json"), "utf8"));
  const zh = JSON.parse(readFileSync(path.join(ROOT, "messages/zh.json"), "utf8"));
  const enKeys = new Set(flatKeys(en));
  const zhKeys = new Set(flatKeys(zh));

  it("zh 与 en 的扁平 key 集合完全一致", () => {
    const missingInZh = [...enKeys].filter((k) => !zhKeys.has(k));
    const extraInZh = [...zhKeys].filter((k) => !enKeys.has(k));
    expect({ missingInZh, extraInZh }).toEqual({ missingInZh: [], extraInZh: [] });
  });

  it("zh 条目不得为空且 ICU 占位符与 en 一致", () => {
    // ICU 参数名提取:顶层 {name} 与 {name, plural, ...}(配对扫描嵌套;子消息里的 # 是数字占位,不是命名参数)
    const icuArgs = (s: string): string[] => {
      const args: string[] = [];
      let i = 0;
      while (i < s.length) {
        if (s[i] !== "{") { i++; continue; }
        const m = /^\{(\w+)(,|\})/.exec(s.slice(i));
        if (!m) { i++; continue; }
        args.push(m[1]);
        let depth = 1;
        let j = i + 1;
        while (depth > 0 && j < s.length) {
          if (s[j] === "{") depth++;
          else if (s[j] === "}") depth--;
          j++;
        }
        i = j;
      }
      return args.sort();
    };
    const lookup = (obj: Record<string, unknown>, key: string) =>
      key.split(".").reduce<unknown>((o, k) => (o as Record<string, unknown>)?.[k], obj);
    for (const key of enKeys) {
      const zhVal = lookup(zh, key);
      expect(zhVal, `${key} zh 值缺失`).toBeTruthy();
      if (typeof zhVal === "string") {
        const enVal = lookup(en, key);
        if (typeof enVal === "string") {
          expect(icuArgs(zhVal), `${key} ICU 占位符不一致`).toEqual(icuArgs(enVal));
        }
      }
    }
  });
});
