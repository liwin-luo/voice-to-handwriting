import { describe, expect, it } from "vitest";
import { expandPages, paginateLineTops } from "./layout";

describe("paginateLineTops", () => {
  it("同一行的字符进入同一页", () => {
    // 6 个字符,前 3 个 top=0,后 3 个 top=50;页高 100 → 一页
    const boxes = [0, 1, 2]
      .map((i) => ({ index: i, top: 0 }))
      .concat([3, 4, 5].map((i) => ({ index: i, top: 50 })));
    expect(paginateLineTops(boxes, 100)).toEqual([[0, 1, 2, 3, 4, 5]]);
  });

  it("超出一页高的行整体移到下一页", () => {
    const boxes = [
      { index: 0, top: 0 },
      { index: 1, top: 0 },
      { index: 2, top: 120 },
      { index: 3, top: 120 },
    ];
    expect(paginateLineTops(boxes, 100)).toEqual([
      [0, 1],
      [2, 3],
    ]);
  });

  it("空输入返回空", () => {
    expect(paginateLineTops([], 100)).toEqual([]);
  });
});

describe("expandPages", () => {
  it("换行 token 归入前一字符所在页", () => {
    // tokens: [0:"你"(cjk), 1:"\n"(newline), 2:"他"(cjk)]
    // 分页只测量到 span 0 和 2,换行 1 应跟随 0
    const groups = paginateLineTops(
      [
        { index: 0, top: 0 },
        { index: 2, top: 200 },
      ],
      100,
    );
    const result = expandPages(groups, [
      { kind: "cjk" },
      { kind: "newline" },
      { kind: "cjk" },
    ]);
    expect(result).toEqual([[0, 1], [2]]);
  });

  it("同页中段的换行插回原位(保持索引升序)", () => {
    // tokens: [0:cjk, 1:cjk, 2:newline, 3:cjk],全部同页
    const result = expandPages([[0, 1, 3]], [
      { kind: "cjk" },
      { kind: "cjk" },
      { kind: "newline" },
      { kind: "cjk" },
    ]);
    expect(result).toEqual([[0, 1, 2, 3]]);
  });
});
