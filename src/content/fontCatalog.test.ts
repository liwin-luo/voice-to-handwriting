import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { FONTS } from "@/stores/useEditorStore";
import { FONT_CATALOG } from "./fontCatalog";
import { latinSubsetUrl } from "@/lib/cursiveSvg";

describe("FONT_CATALOG", () => {
  it("每款都有切片样式表,且拉丁子集能被 SVG 导出找到", () => {
    for (const entry of FONT_CATALOG) {
      const cssPath = `public/fonts/${entry.id}/result.css`;
      expect(existsSync(cssPath), cssPath).toBe(true);
      const css = readFileSync(cssPath, "utf8");
      expect(css).toContain(`font-family:"${entry.displayName}"`);
      const subset = latinSubsetUrl(css);
      expect(subset, entry.id).toMatch(/\.woff2$/);
      expect(existsSync(`public/fonts/${entry.id}/${subset!.replace(/^\.\//, "")}`)).toBe(true);
    }
  });

  it("签名体不进主工作台,避免整段书信用高对比花体", () => {
    const ids = new Set<string>(FONTS.map((font) => font.id));
    for (const entry of FONT_CATALOG) {
      if (entry.style === "signature script") expect(ids.has(entry.id)).toBe(false);
    }
    expect(FONT_CATALOG.filter((entry) => entry.stylesheet)).toHaveLength(6);
  });
});
