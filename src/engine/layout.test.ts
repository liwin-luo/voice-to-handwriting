import { describe, expect, it } from "vitest";
import { expandPages, paginateLineTops } from "./layout";
import { tokenize } from "./tokens";

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

describe("多段落分页回路(回归:换行后文字错乱)", () => {
  it("多段落 + 尾随换行:每页 token 列表还原出原始段落", () => {
    const text = "计划;h\njhl'\nytt'vhvkkhk\n";
    const tokens = tokenize(text);
    // 模拟测量:三行,top 分别为 0/40/80;换行符无测量值
    const tops = [0, 0, 0, -1, 40, -1, 80, -1];
    const boxes = tokens
      .map((t, i) => ({ index: i, top: tops[i] }))
      .filter((b) => b.top >= 0);
    const pages = expandPages(paginateLineTops(boxes, 1027), tokens);
    // 单页应包含全部 8 个 token,且按索引升序(乱序/重复都会导致渲染错乱)
    expect(pages).toEqual([[0, 1, 2, 3, 4, 5, 6, 7]]);
    // 按页还原的文字应与原文一致
    const restored = pages[0]
      .map((i) => (tokens[i].kind === "newline" ? "\n" : tokens[i].text))
      .join("");
    expect(restored).toBe(text);
  });
});
