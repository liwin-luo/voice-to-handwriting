import { describe, expect, it } from "vitest";
import { TRACE_GRADES, gradeForBand, tracingLines } from "./traceGrades";

describe("tracingLines", () => {
  it("空输入用示例名", () => {
    expect(tracingLines("", "Emma\nLiam")).toEqual(["Emma", "Liam"]);
    expect(tracingLines("  \n  ", "小明")).toEqual(["小明"]);
  });

  it("有输入就丢掉示例", () => {
    expect(tracingLines("Noah\n\nOlivia", "Emma")).toEqual(["Noah", "Olivia"]);
  });
});

describe("gradeForBand", () => {
  it("正好落在档位上才算选中", () => {
    expect(gradeForBand(TRACE_GRADES[1].bandH)).toBe(TRACE_GRADES[1].id);
    expect(gradeForBand(100)).toBeNull();
  });
});
