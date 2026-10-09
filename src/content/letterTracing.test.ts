import { describe, expect, it } from "vitest";
import {
  PRINT_LETTERS,
  getPrintLetter,
  letterFaqs,
  letterSlotOffsets,
  repeatedLetterLine,
  tracingPrefill,
} from "./letterTracing";

describe("print letter tracing pages", () => {
  it("covers a–z once, and no two letters share the same mix-up", () => {
    expect(PRINT_LETTERS.map((letter) => letter.slug).join("")).toBe("abcdefghijklmnopqrstuvwxyz");
    const watches = new Set(PRINT_LETTERS.map((letter) => letter.watch));
    const motions = new Set(PRINT_LETTERS.map((letter) => letter.motion));
    expect(watches.size).toBe(26);
    expect(motions.size).toBe(26);
  });

  it("faqs include the letter's own start and mix-up", () => {
    const a = getPrintLetter("a");
    expect(a).toBeDefined();
    const faqs = letterFaqs(a!);
    expect(faqs[0].a).toBe(a!.start);
    expect(faqs[1].a).toBe(a!.watch);
    expect(faqs).toHaveLength(3);
  });
});

describe("letter tracing rows", () => {
  it("repeats one letter eight times", () => {
    expect(repeatedLetterLine("b")).toBe("b b b b b b b b");
  });

  it("drops the layout when the glyphs no longer fit", () => {
    expect(letterSlotOffsets(8, 40, 700)).toHaveLength(8);
    expect(letterSlotOffsets(8, 80, 400)).toBeNull();
    expect(letterSlotOffsets(1, 40, 100)).toEqual([0]);
  });
});

describe("tracingPrefill", () => {
  it("uses the word list when both params are present", () => {
    expect(tracingPrefill("?words=fan&letter=f")).toBe("fan");
  });

  it("lowercases a single letter", () => {
    expect(tracingPrefill("?letter=Q")).toBe("q");
  });

  it("ignores a missing or multi-letter value", () => {
    expect(tracingPrefill("")).toBeNull();
    expect(tracingPrefill("?letter=ab")).toBeNull();
  });
});
