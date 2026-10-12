import { describe, expect, it } from "vitest";
import {
  anchorLevel,
  beatenPercent,
  buildCheckPrompt,
  calendarDay,
  canShareCard,
  formatScore,
  glmModelId,
  parseCheckResponse,
  readModelContent,
  recordUsage,
  shownLegibility,
  socialIntent,
  usageLeft,
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

  it("次数记在浏览器,本地日历日一过就清零", () => {
    expect(calendarDay(new Date(2026, 9, 12, 23, 30))).toBe("2026-10-12");
    expect(usageLeft(null, "2026-10-12")).toBe(3);
    const once = recordUsage(null, "2026-10-12");
    const twice = recordUsage(once, "2026-10-12");
    const thrice = recordUsage(twice, "2026-10-12");
    expect(usageLeft(thrice, "2026-10-12")).toBe(0);
    expect(usageLeft(thrice, "2026-10-13")).toBe(3);
    expect(usageLeft("not-json", "2026-10-12")).toBe(3);
  });

  it("好认保留一位小数,4.8 只在四项都是 5 时留下", () => {
    const body = (legibility: number, causes: number[]) =>
      JSON.stringify({
        status: "scored",
        summary: "可读。",
        legibility: { value: legibility, evidence: "每个词都能读出" },
        size: { value: causes[0], evidence: "高度稳" },
        baseline: { value: causes[1], evidence: "贴着线" },
        spacing: { value: causes[2], evidence: "词间开" },
        slant: { value: causes[3], evidence: "朝向一致" },
      });
    const rare = parseCheckResponse(body(4.84, [5, 5, 5, 5]));
    const capped = parseCheckResponse(body(4.9, [5, 4, 5, 5]));
    const bareFive = parseCheckResponse(body(5, [5, 5, 5, 5]));
    if (rare.status !== "scored" || capped.status !== "scored" || bareFive.status !== "scored") throw new Error("status");
    expect(rare.legibility.value).toBe(4.8);
    expect(capped.legibility.value).toBe(4.7);
    expect(bareFive.legibility.value).toBe(4.7);
    expect(formatScore(rare.legibility.value)).toBe("4.8");
    expect(anchorLevel(4.4)).toBe(4);
    expect(anchorLevel(4.8)).toBe(5);
    expect(shownLegibility(3.2, [3, 3, 3, 3])).toBe(3.2);
    expect(beatenPercent(1)).toBe(0);
    expect(beatenPercent(3.5)).toBe(46);
    expect(beatenPercent(4.7)).toBe(96);
    expect(beatenPercent(4.8)).toBe(98);
    expect(beatenPercent(5)).toBe(99);
  });

  it("社交分享带上分数文案和本页地址", () => {
    const text = "Legibility 5. Next: size";
    const url = "https://voicetohandwriting.online/handwriting-check";
    expect(socialIntent("x", text, url)).toBe(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
    );
    expect(socialIntent("facebook", text, url)).toContain("facebook.com/sharer/sharer.php?u=");
    expect(socialIntent("whatsapp", text, url)).toContain(encodeURIComponent(`${text} ${url}`));
    expect(socialIntent("pinterest", text, url)).toContain("pinterest.com/pin/create/button/");
    expect(socialIntent("email", text, url)).toMatch(/^mailto:\?subject=/);
  });
});
