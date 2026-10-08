import { beforeEach, describe, expect, it } from "vitest";
import { migrateEditorPrefs, useEditorStore } from "./useEditorStore";

describe("useEditorStore", () => {
  beforeEach(() => useEditorStore.getState().reset());

  it("appendText 追加并保留已有文本", () => {
    const s = useEditorStore.getState();
    s.setText("你好");
    useEditorStore.getState().appendText("世界");
    expect(useEditorStore.getState().text).toBe("你好世界");
  });

  it("默认样式值合法", () => {
    const s = useEditorStore.getState();
    expect(s.fontId).toBe("patrickhand");
    expect(s.pageFormat).toBe("letter");
    expect(s.fontChosen).toBe(false);
    expect(s.paperId).toBe("ruled");
    expect(s.intensity).toBeGreaterThan(0);
    expect(s.intensity).toBeLessThanOrEqual(1);
  });

  it("reseed 改变种子", () => {
    const before = useEditorStore.getState().seed;
    useEditorStore.getState().reseed();
    expect(useEditorStore.getState().seed).not.toBe(before);
  });

  it("旧偏好里选过的字体不会被当成未选择", () => {
    expect(migrateEditorPrefs({ fontId: "caveat" }, 0)).toMatchObject({ fontChosen: true });
    expect(migrateEditorPrefs({ fontId: "mashanzheng" }, 0)).toMatchObject({ fontChosen: false });
  });

  it("手动选字体后记为用户选择", () => {
    useEditorStore.getState().setFontId("caveat");
    expect(useEditorStore.getState().fontChosen).toBe(true);
    useEditorStore.getState().applyFontId("patrickhand");
    expect(useEditorStore.getState().fontId).toBe("patrickhand");
    expect(useEditorStore.getState().fontChosen).toBe(true);
  });

  it("文字排列:默认左对齐无缩进,可切换", () => {
    const s = useEditorStore.getState();
    expect(s.align).toBe("left");
    expect(s.indent).toBe(false);
    s.setAlign("center");
    s.setIndent(true);
    expect(useEditorStore.getState().align).toBe("center");
    expect(useEditorStore.getState().indent).toBe(true);
  });
});
