import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { buildCursiveSvg, latinSubsetUrl, rangeCovers } from "./cursiveSvg";

describe("rangeCovers", () => {
  it("区间与单码位都能命中 A", () => {
    expect(rangeCovers("U+20-7E, U+2018", 0x41)).toBe(true);
    expect(rangeCovers("U+41", 0x41)).toBe(true);
    expect(rangeCovers("U+2013-2014", 0x41)).toBe(false);
  });
});

describe("latinSubsetUrl", () => {
  it("优先字重 400,跳过不含 A 的切片", () => {
    const css = `
      @font-face{font-family:"Demo";src:url("./punct.woff2") format("woff2");font-weight:400;unicode-range:U+2013-2014;}
      @font-face{font-family:"Demo";src:url("./thin.woff2") format("woff2");font-weight:200;unicode-range:U+20-7E;}
      @font-face{font-family:"Demo";src:url("./latin.woff2") format("woff2");font-weight:400;unicode-range:U+0,U+20-7E;}
    `;
    expect(latinSubsetUrl(css)).toBe("./latin.woff2");
  });

  it("可变字重 400 700 也算正文", () => {
    const css = `@font-face{src:url("./var.woff2") format("woff2");font-weight:400 700;unicode-range:U+20-7E;}`;
    expect(latinSubsetUrl(css)).toBe("./var.woff2");
  });

  it("真实切片 css 能指出一片 woff2", () => {
    const css = readFileSync("public/fonts/greatvibes/result.css", "utf8");
    expect(latinSubsetUrl(css)).toMatch(/^\.\/[a-f0-9]+\.woff2$/);
  });
});

describe("buildCursiveSvg", () => {
  const base = {
    lines: ["A & B"],
    family: "Great Vibes",
    size: 44,
    ink: "#1a1a1a",
    width: 200,
    height: 80,
    pad: 48,
    lineH: 62,
    fontBase64: "abc+/=",
  };

  it("透明底不画矩形,并转义文本", () => {
    const svg = buildCursiveSvg({ ...base, bg: null });
    expect(svg).not.toContain("<rect");
    expect(svg).toContain("A &amp; B");
    expect(svg).toContain('font-family:"Great Vibes"');
    expect(svg).toContain("data:font/woff2;base64,abc+/=");
  });

  it("有底色时铺满矩形", () => {
    const svg = buildCursiveSvg({ ...base, bg: "#ffffff" });
    expect(svg).toContain('fill="#ffffff"');
  });
});
