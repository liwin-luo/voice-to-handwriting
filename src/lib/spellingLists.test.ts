import { describe, expect, it } from "vitest";
import { DOLCH_PREPRIMER, FRY_100, SPELLING_LISTS, spellingListMatches } from "./spellingLists";

describe("spellingLists", () => {
  it("Dolch pre-primer 是 40 个不重复的词", () => {
    expect(DOLCH_PREPRIMER).toHaveLength(40);
    expect(new Set(DOLCH_PREPRIMER).size).toBe(40);
  });

  it("Fry 前 100 不重复，前 25 是原表开头", () => {
    expect(FRY_100).toHaveLength(100);
    expect(new Set(FRY_100).size).toBe(100);
    expect(FRY_100.slice(0, 3)).toEqual(["the", "of", "and"]);
    expect(SPELLING_LISTS.find((l) => l.id === "fry25")!.words).toEqual(FRY_100.slice(0, 25));
  });

  it("词表按钮只在文本与该表逐行一致时保持按下", () => {
    expect(spellingListMatches(DOLCH_PREPRIMER.join("\n"), DOLCH_PREPRIMER)).toBe(true);
    expect(spellingListMatches(`${FRY_100.slice(0, 25).join("\n")}\n`, FRY_100.slice(0, 25))).toBe(true);
    expect(spellingListMatches(FRY_100.slice(0, 25).join("\n"), FRY_100)).toBe(false);
  });
});
