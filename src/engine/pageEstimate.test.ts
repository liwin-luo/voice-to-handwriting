import { describe, expect, it } from "vitest";
import {
  estimate,
  handoffPayload,
  paginateCells,
  parseHandoff,
  previewSlots,
  sheetsFor,
} from "./pageEstimate";

const base = {
  script: "en" as const,
  paper: "college" as const,
  format: "letter" as const,
  size: "normal" as const,
  gap: "normal" as const,
};

describe("estimate", () => {
  it("Letter college ruled 普通拉丁字约为 220 词/面", () => {
    const est = estimate(base);
    expect(est.linesPerPage).toBe(33);
    expect(est.glyphsPerLine).toBe(40);
    expect(est.perPage).toBe(220);
    expect(est.unit).toBe("word");
    expect(est.gapLocked).toBe(false);
  });

  it("wide ruled 约为 180 词/面，德语词更长", () => {
    expect(estimate({ ...base, paper: "wide" }).perPage).toBe(180);
    expect(estimate({ ...base, script: "de" }).perPage).toBe(176);
  });

  it("中文 college ruled 按字计，方格与原稿纸锁住字间距", () => {
    const zh = estimate({ ...base, script: "zh" });
    expect(zh.unit).toBe("char");
    expect(zh.perPage).toBe(24 * 33);
    const grid = estimate({ ...base, paper: "graph" });
    expect(grid.gapLocked).toBe(true);
    expect(grid.tightPerPage).toBe(grid.loosePerPage);
    expect(estimate({ ...base, paper: "genkou400" }).perPage).toBe(Math.floor(400 / 6));
    expect(estimate({ ...base, script: "ja", paper: "genkou200" }).perPage).toBe(200);
  });

  it("紧档比松档更省纸", () => {
    const est = estimate(base);
    expect(est.tightPerPage).toBeGreaterThan(est.perPage);
    expect(est.loosePerPage).toBeLessThan(est.perPage);
  });

  it("自定义行距超出 24–64 会被钳制", () => {
    expect(estimate({ ...base, paper: "custom", pitch: 8 }).pitch).toBe(24);
    expect(estimate({ ...base, paper: "custom", pitch: 200 }).pitch).toBe(64);
  });
});

describe("sheetsFor", () => {
  it("500 词 college ruled 单面 3 张，末页第 9 行", () => {
    const est = estimate(base);
    expect(sheetsFor(est, 500, 1, "en")).toEqual({ writingPages: 3, sheets: 3, lastLine: 9 });
  });

  it("双面把张数按两面计，0 不产出页", () => {
    const est = estimate(base);
    expect(sheetsFor(est, 500, 2, "en").sheets).toBe(2);
    expect(sheetsFor(est, 0, 1, "en")).toEqual({ writingPages: 0, sheets: 0, lastLine: 0 });
  });
});

describe("paginateCells", () => {
  it("按格换行并在换行处丢掉余格", () => {
    expect(paginateCells("abcd", 2, 2)).toEqual([["ab", "cd"]]);
    expect(paginateCells("abcde", 2, 2)).toEqual([["ab", "cd"], ["e"]]);
    expect(paginateCells("a\nb", 4, 4)).toEqual([["a", "b"]]);
    expect(paginateCells("", 4, 4)).toEqual([]);
  });
});

describe("previewSlots", () => {
  it("8 页以内全画，超过则前 3 加最后 1", () => {
    expect(previewSlots(2)).toHaveLength(2);
    expect(previewSlots(9)).toEqual([
      { kind: "page", index: 0 },
      { kind: "page", index: 1 },
      { kind: "page", index: 2 },
      { kind: "gap", omitted: 5 },
      { kind: "page", index: 8 },
    ]);
  });
});

describe("handoff", () => {
  it("带上正文和纸，坏 JSON 丢弃", () => {
    const payload = handoffPayload(base, "hello", "patrickhand");
    expect(payload.mode).toBe("ruled");
    expect(payload.spacing).toBeGreaterThanOrEqual(24);
    expect(parseHandoff(JSON.stringify(payload))?.text).toBe("hello");
    expect(parseHandoff("nope")).toBeNull();
    expect(handoffPayload({ ...base, paper: "graph" }, "a", "patrickhand").mode).toBe("grid");
  });
});
