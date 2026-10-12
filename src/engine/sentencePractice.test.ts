import { describe, expect, it } from "vitest";
import {
  CJK_LINE_MAX,
  LATIN_LINE_MAX,
  fitsOneLine,
  firstSentence,
  guidesFor,
  marginSide,
  modelFont,
  parseSentencePracticeRecord,
  printedSentence,
  sheetRows,
  slantDirection,
  wordSpaceIndexes,
} from "./sentencePractice";

describe("firstSentence", () => {
  it("keeps the terminator and drops the rest", () => {
    expect(firstSentence("Please read this note. Thanks.")).toEqual({
      sentence: "Please read this note.",
      truncated: true,
    });
    expect(firstSentence("你好。后面丢掉。")).toEqual({ sentence: "你好。", truncated: true });
    expect(firstSentence("停！不要。")).toEqual({ sentence: "停！", truncated: true });
    expect(firstSentence("Quoi? Suite.")).toEqual({ sentence: "Quoi?", truncated: true });
  });

  it("does not flag a single sentence", () => {
    expect(firstSentence("Please read this note.")).toEqual({
      sentence: "Please read this note.",
      truncated: false,
    });
    expect(firstSentence("No mark here")).toEqual({ sentence: "No mark here", truncated: false });
    expect(firstSentence("  hi  ")).toEqual({ sentence: "hi", truncated: false });
    expect(firstSentence("")).toEqual({ sentence: "", truncated: false });
  });

  it("collapses newlines so the line can be drawn", () => {
    expect(firstSentence("Please read\nthis note. More")).toEqual({
      sentence: "Please read this note.",
      truncated: true,
    });
  });
});

describe("printedSentence", () => {
  it("uses the sample only when the field is empty", () => {
    expect(printedSentence("  ", "Please read this note.")).toEqual({
      sentence: "Please read this note.",
      truncated: false,
    });
    expect(printedSentence("Hello. Extra", "Please read this note.")).toEqual({
      sentence: "Hello.",
      truncated: true,
    });
  });
});

describe("fitsOneLine", () => {
  it("allows 80 Latin characters and rejects 81", () => {
    expect(fitsOneLine("a".repeat(LATIN_LINE_MAX))).toBe(true);
    expect(fitsOneLine("a".repeat(LATIN_LINE_MAX + 1))).toBe(false);
  });

  it("allows 40 CJK characters and rejects 41", () => {
    expect(fitsOneLine("字".repeat(CJK_LINE_MAX))).toBe(true);
    expect(fitsOneLine("字".repeat(CJK_LINE_MAX + 1))).toBe(false);
    expect(fitsOneLine("あ".repeat(CJK_LINE_MAX + 1))).toBe(false);
    expect(fitsOneLine("한".repeat(CJK_LINE_MAX + 1))).toBe(false);
  });

  it("uses the CJK limit as soon as one wide character appears", () => {
    expect(fitsOneLine(`${"a".repeat(50)}字`)).toBe(false);
  });
});

describe("sheet plan", () => {
  it("prints a model, a dotted line, then three blanks", () => {
    expect(sheetRows(false)).toEqual(["solid", "dashed", "blank", "blank", "blank"]);
  });

  it("drops the model rows when writing the sentence again", () => {
    expect(sheetRows(true)).toEqual(["blank", "blank", "blank"]);
  });

  it("moves the margin and flips only the slant guides", () => {
    expect(marginSide(false)).toBe("left");
    expect(marginSide(true)).toBe("right");
    expect(slantDirection("size", true)).toBeNull();
    expect(slantDirection("slant", false)).toBe("right");
    expect(slantDirection("slant", true)).toBe("left");
    expect(guidesFor("size", false)).toEqual([{ kind: "baseline" }, { kind: "midline" }]);
    expect(guidesFor("slant", true)).toEqual([{ kind: "slant", direction: "left" }]);
    expect(guidesFor("spacing", false)).toEqual([{ kind: "baseline" }, { kind: "spaceTicks" }]);
    expect(guidesFor("print", false)).toEqual([{ kind: "baseline" }]);
  });

  it("locks print to Patrick Hand", () => {
    expect(modelFont("size", false)).toBe("patrickhand");
    expect(modelFont("size", true)).toBe("sacramento");
    expect(modelFont("print", true)).toBe("patrickhand");
  });

  it("marks spaces and ignores a CJK sentence with none", () => {
    expect(wordSpaceIndexes("Please read this")).toEqual([6, 11]);
    expect(wordSpaceIndexes("请先读这张便条。")).toEqual([]);
    expect(wordSpaceIndexes("a\u3000b")).toEqual([1]);
  });
});

describe("parseSentencePracticeRecord", () => {
  const saved = {
    sentence: "Please read this note.",
    focus: "size",
    leftHand: false,
    script: true,
    lineHeight: "regular",
    downloadedAt: "2026-10-12T00:00:00.000Z",
  };

  it("reads a saved download", () => {
    expect(parseSentencePracticeRecord(JSON.stringify(saved))).toEqual(saved);
  });

  it("drops a broken payload and forces script off for print", () => {
    expect(parseSentencePracticeRecord(null)).toBeNull();
    expect(parseSentencePracticeRecord("{")).toBeNull();
    expect(parseSentencePracticeRecord(JSON.stringify({ ...saved, focus: "print", script: true }))).toMatchObject({
      focus: "print",
      script: false,
    });
  });
});
