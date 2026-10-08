import { beforeEach, describe, expect, it } from "vitest";
import { useHistoryStore } from "./useHistoryStore";

const style = {
  fontId: "mashanzheng",
  paperId: "ruled",
  ink: "#15317e",
  fontSize: 28,
  intensity: 0.6,
  align: "left" as const,
  indent: false,
};

describe("useHistoryStore", () => {
  beforeEach(() => useHistoryStore.getState().clear());

  it("add 写入并置于最新", () => {
    const h = useHistoryStore.getState();
    h.add({ text: "第一", source: "speech", style });
    h.add({ text: "第二", source: "audio", style });
    const entries = useHistoryStore.getState().entries;
    expect(entries).toHaveLength(2);
    expect(entries[0].text).toBe("第二");
  });

  it("相同文本去重(跨来源,保留最新快照)", () => {
    const h = useHistoryStore.getState();
    h.add({ text: "同文", source: "speech", style });
    h.add({ text: "同文", source: "export", style });
    const entries = useHistoryStore.getState().entries;
    expect(entries).toHaveLength(1);
    expect(entries[0].source).toBe("export");
  });

  it("上限 50 条,旧的被裁剪", () => {
    const h = useHistoryStore.getState();
    for (let i = 0; i < 55; i++) h.add({ text: `文${i}`, source: "edit" as never, style });
    const entries = useHistoryStore.getState().entries;
    expect(entries).toHaveLength(50);
    expect(entries[0].text).toBe("文54");
  });

  it("remove 与 clear", () => {
    const h = useHistoryStore.getState();
    h.add({ text: "甲", source: "speech", style });
    h.add({ text: "乙", source: "audio", style });
    const id = useHistoryStore.getState().entries[0].id;
    useHistoryStore.getState().remove(id);
    expect(useHistoryStore.getState().entries.map((e) => e.text)).toEqual(["甲"]);
    useHistoryStore.getState().clear();
    expect(useHistoryStore.getState().entries).toHaveLength(0);
  });
});
