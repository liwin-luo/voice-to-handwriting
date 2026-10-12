import { describe, expect, it } from "vitest";
import {
  DEFAULT_INK,
  DEFAULT_PEN_WIDTH,
  ERASER_WIDTH,
  appendPoint,
  defaultSheet,
  fromRatio,
  parseSheet,
  serializeSheet,
  toRatio,
} from "./pad";

describe("appendPoint", () => {
  it("keeps the first point and drops one closer than 2px", () => {
    const first = appendPoint([], { x: 0.1, y: 0.2 }, 100, 100);
    expect(first).toEqual([{ x: 0.1, y: 0.2 }]);
    const dropped = appendPoint(first, { x: 0.11, y: 0.2 }, 100, 100);
    expect(dropped).toBe(first);
  });

  it("keeps a point at least 2px away", () => {
    const first = [{ x: 0, y: 0 }];
    const next = appendPoint(first, { x: 0.03, y: 0 }, 100, 100);
    expect(next).toEqual([
      { x: 0, y: 0 },
      { x: 0.03, y: 0 },
    ]);
  });
});

describe("ratio", () => {
  it("clamps pointer coordinates into the sheet", () => {
    expect(toRatio(-10, 250, 100, 200)).toEqual({ x: 0, y: 1 });
    expect(toRatio(10, 20, 0, 0)).toEqual({ x: 0, y: 0 });
  });

  it("round-trips a point through the current size", () => {
    const ratio = toRatio(25, 40, 200, 100);
    expect(fromRatio(ratio, 200, 100)).toEqual({ x: 25, y: 40 });
    expect(fromRatio(ratio, 400, 200)).toEqual({ x: 50, y: 80 });
  });
});

describe("parseSheet", () => {
  it("reads back a saved sheet", () => {
    const sheet = defaultSheet();
    sheet.paper = "ruled";
    sheet.ink = DEFAULT_INK;
    sheet.width = DEFAULT_PEN_WIDTH;
    sheet.strokes = [
      {
        tool: "eraser",
        color: "#000000",
        width: ERASER_WIDTH,
        points: [{ x: 1.4, y: -0.2 }],
      },
    ];
    const parsed = parseSheet(serializeSheet(sheet));
    expect(parsed?.paper).toBe("ruled");
    expect(parsed?.strokes[0]).toEqual({
      tool: "eraser",
      color: "#000000",
      width: ERASER_WIDTH,
      points: [{ x: 1, y: 0 }],
    });
  });

  it("rejects a broken record", () => {
    expect(parseSheet(null)).toBeNull();
    expect(parseSheet("{")).toBeNull();
    expect(parseSheet(JSON.stringify({ ...defaultSheet(), paper: "letter" }))).toBeNull();
    expect(parseSheet(JSON.stringify({ ...defaultSheet(), width: 3 }))).toBeNull();
    expect(
      parseSheet(
        JSON.stringify({
          ...defaultSheet(),
          strokes: [{ tool: "pen", color: "blue", width: 4, points: [{ x: 0, y: 0 }] }],
        }),
      ),
    ).toBeNull();
  });
});
