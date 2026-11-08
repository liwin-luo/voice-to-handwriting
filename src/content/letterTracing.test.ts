import { describe, expect, it } from "vitest";
import { tracingPrefill } from "./letterTracing";

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
