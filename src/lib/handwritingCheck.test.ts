import { describe, expect, it } from "vitest";
import {
  buildCheckPrompt,
  canShareCard,
  clientKey,
  dayKey,
  readsLeft,
  glmModelId,
  parseCheckResponse,
  rateLimitDecision,
  readModelContent,
  weakestCause,
  type Score,
} from "./handwritingCheck";

const score = (value: Score["value"], evidence = "第二行 read 浮在线上"): Score => ({ value, evidence });

const scored = `{
  "status": "scored",
  "summary": "第一眼就能读完。贴线是四项里最不稳的,下次先把字脚落在同一条线上。",
  "legibility": {"value": 4, "evidence": "每个词都能读出"},
  "size": {"value": 3, "evidence": "this 偏高"},
  "baseline": {"value": 2, "evidence": "read 浮起"},
  "spacing": {"value": 5, "evidence": "词间清楚"},
  "slant": {"value": 4, "evidence": "整段向右"}
}`;

describe("parseCheckResponse", () => {
  it("五项齐全且都有证语时可以出卡片", () => {
    const result = parseCheckResponse("```json\n" + scored + "\n```");
    expect(result.status).toBe("scored");
    expect(canShareCard(result)).toBe(true);
    if (result.status === "scored") {
      expect(result.baseline.evidence).toBe("read 浮起");
      expect(result.summary).toContain("贴线");
    }
  });

  it("没有证语的项丢掉,仍可分享", () => {
    const result = parseCheckResponse(scored.replace('"read 浮起"', '"  "'));
    expect(result.status).toBe("partial");
    expect(canShareCard(result)).toBe(true);
    if (result.status === "partial") expect(result.baseline).toBeNull();
  });

  it("不足两行时只留好认,仍可分享", () => {
    const result = parseCheckResponse('{"status":"too_short","legibility":{"value":3,"evidence":"只有一个词"}}');
    expect(result).toEqual({ status: "too_short", summary: "", legibility: { value: 3, evidence: "只有一个词" } });
    expect(canShareCard(result)).toBe(true);
  });

  it("重拍或不属于拉丁字母时不给分,也不出卡片", () => {
    const retake = parseCheckResponse('{"status":"retake"}');
    const other = parseCheckResponse('note {"status":"unsupported_script"}');
    expect(retake).toEqual({ status: "retake" });
    expect(other).toEqual({ status: "unsupported_script" });
    expect(canShareCard(retake)).toBe(false);
    expect(canShareCard(other)).toBe(false);
  });

  it("没有 JSON 时失败", () => {
    expect(() => parseCheckResponse("看不清")).toThrow("no json");
  });

  it("好认没有证语时失败", () => {
    expect(() => parseCheckResponse('{"status":"scored","legibility":{"value":4,"evidence":""}}')).toThrow("no legibility");
  });
});

describe("weakestCause", () => {
  it("并列时按贴线、大小、间距、斜度取第一个", () => {
    const same = { size: score(3), baseline: score(3), spacing: score(3), slant: score(3) };
    expect(weakestCause(same)).toBe("baseline");
    expect(weakestCause({ ...same, slant: score(1) })).toBe("slant");
    expect(weakestCause({ size: score(2), baseline: null, spacing: score(2), slant: score(4) })).toBe("size");
  });
});

describe("buildCheckPrompt", () => {
  it("含五项锚点,并要求证语用传入的语言", () => {
    const prompt = buildCheckPrompt("zh");
    expect(prompt).toContain("every word is readable at a first glance");
    expect(prompt).toContain("height stays steady on the line");
    expect(prompt).toContain("feet of the letters share one line");
    expect(prompt).toContain("letters sit close inside words");
    expect(prompt).toContain("whole sample leans the same way");
    expect(prompt).toContain("summary");
    expect(prompt).toContain("Chinese");
    expect(buildCheckPrompt("en")).toContain("English");
  });
});

describe("model helpers", () => {
  it("去掉 custom 前缀,并读出文本或分块内容", () => {
    expect(glmModelId("custom/glm-5.3-flash")).toBe("glm-5.3-flash");
    expect(glmModelId("glm-5.3-flash")).toBe("glm-5.3-flash");
    expect(readModelContent({ choices: [{ message: { content: "{\"a\":1}" } }] })).toBe('{"a":1}');
    expect(readModelContent({ choices: [{ message: { content: [{ type: "text", text: "ab" }] } }] })).toBe("ab");
  });

  it("每天 3 次,第二天换钥匙;没有计数时只在开发环境放行", () => {
    expect(rateLimitDecision({ dev: true, hasStore: false, count: null })).toBe("allow");
    expect(rateLimitDecision({ dev: false, hasStore: false, count: null })).toBe("closed");
    expect(rateLimitDecision({ dev: false, hasStore: true, count: 3 })).toBe("allow");
    expect(rateLimitDecision({ dev: false, hasStore: true, count: 4 })).toBe("quota");
    expect(rateLimitDecision({ dev: true, hasStore: false, count: 4 })).toBe("quota");
    expect(rateLimitDecision({ dev: false, hasStore: true, count: null })).toBe("closed");
    expect(readsLeft(0)).toBe(3);
    expect(readsLeft(2)).toBe(1);
    expect(readsLeft(4)).toBe(0);
    expect(dayKey("1.2.3.4", "2026-10-12")).toBe("vth-handwriting-check:1.2.3.4:2026-10-12");
    expect(dayKey("1.2.3.4", "2026-10-13")).not.toBe(dayKey("1.2.3.4", "2026-10-12"));
    expect(clientKey(" 203.0.113.5, bad ")).toBe("203.0.113.5bad");
  });
});
