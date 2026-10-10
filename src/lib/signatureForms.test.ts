import { describe, expect, it } from "vitest";
import { signatureForms } from "./signatureForms";

describe("signatureForms", () => {
  it("拆出全名、名、首字母加姓", () => {
    expect(signatureForms("  Jordan   Lee ")).toEqual(["Jordan Lee", "Jordan", "J. Lee"]);
  });

  it("三个词取名和末段姓", () => {
    expect(signatureForms("Ada Lovelace King")).toEqual(["Ada Lovelace King", "Ada", "A. King"]);
  });

  it("单词和空输入不硬拆", () => {
    expect(signatureForms("Jordan")).toEqual(["Jordan"]);
    expect(signatureForms("李明")).toEqual(["李明"]);
    expect(signatureForms("   ")).toEqual([]);
  });
});
