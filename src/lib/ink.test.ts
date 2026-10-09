import { describe, expect, it } from "vitest";
import { fadeInk } from "./ink";

describe("fadeInk", () => {
  it("按比例往白色混合", () => {
    expect(fadeInk("#000000", 0.5)).toBe("#808080");
    expect(fadeInk("#ffffff", 0.5)).toBe("#ffffff");
    expect(fadeInk("nope")).toBe("nope");
  });
});
