import { beforeEach, describe, expect, it } from "vitest";
import { useEditorStore } from "./useEditorStore";

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
    expect(s.fontId).toBe("mashanzheng");
    expect(s.paperId).toBe("ruled");
    expect(s.intensity).toBeGreaterThan(0);
    expect(s.intensity).toBeLessThanOrEqual(1);
  });

  it("reseed 改变种子", () => {
    const before = useEditorStore.getState().seed;
    useEditorStore.getState().reseed();
    expect(useEditorStore.getState().seed).not.toBe(before);
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
