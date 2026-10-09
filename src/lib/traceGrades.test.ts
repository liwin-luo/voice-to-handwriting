import { describe, expect, it } from "vitest";
import { TRACE_GRADES, gradeForBand, tracingLines, tracingSheets } from "./traceGrades";

describe("tracingLines", () => {
  it("空输入用示例名", () => {
    expect(tracingLines("", "Emma\nLiam")).toEqual(["Emma", "Liam"]);
    expect(tracingLines("  \n  ", "小明")).toEqual(["小明"]);
  });

  it("有输入就丢掉示例", () => {
    expect(tracingLines("Noah\n\nOlivia", "Emma")).toEqual(["Noah", "Olivia"]);
  });
});

describe("tracingSheets", () => {
  it("两个以上的名字才拆成每人一页", () => {
    expect(tracingSheets(["Emma", "Liam"], true)).toEqual([["Emma"], ["Liam"]]);
    expect(tracingSheets(["Emma"], true)).toEqual([["Emma"]]);
    expect(tracingSheets(["Emma", "Liam"], false)).toEqual([["Emma", "Liam"]]);
  });
});

describe("gradeForBand", () => {
  it("正好落在档位上才算选中", () => {
    expect(gradeForBand(TRACE_GRADES[1].bandH)).toBe(TRACE_GRADES[1].id);
    expect(gradeForBand(100)).toBeNull();
  });
});
