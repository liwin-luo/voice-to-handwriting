import { describe, expect, it } from "vitest";
import { buildCountPrompt, countTranscript, parseCountResponse, type Counts } from "./handwritingCount";

function expectCounts(text: string, partial: Partial<Counts>) {
  const zero: Counts = { cjk: 0, words: 0, latinLetters: 0, otherLetters: 0, digits: 0, punctuation: 0, illegible: 0, other: 0 };
  expect(countTranscript(text)).toEqual({ ...zero, ...partial });
}

describe("countTranscript", () => {
  it("按书写体系分开数", () => {
    expectCounts("hello", { words: 1, latinLetters: 5 });
    expectCounts("hello world", { words: 2, latinLetters: 10 });
    expectCounts("don't", { words: 1, latinLetters: 4, punctuation: 1 });
    expectCounts("well-known", { words: 1, latinLetters: 9, punctuation: 1 });
    expectCounts("hello, world", { words: 2, latinLetters: 10, punctuation: 1 });
    expectCounts("hello,world", { words: 2, latinLetters: 10, punctuation: 1 });
    expectCounts("room 12", { words: 1, latinLetters: 4, digits: 2 });
    expectCounts("3rd", { words: 1, latinLetters: 2, digits: 1 });
    expectCounts("2026", { digits: 4 });
    expectCounts("你好", { cjk: 2 });
    expectCounts("こんにちは", { cjk: 5 });
    expectCounts("コーヒー", { cjk: 4 });
    expectCounts("안녕", { cjk: 2 });
    expectCounts("привет", { words: 1, otherLetters: 6 });
    expectCounts("hello你好", { words: 1, latinLetters: 5, cjk: 2 });
    expectCounts("a □ b", { words: 2, latinLetters: 2, illegible: 1 });
  });

  it("全角数字算数字,句号算标点,汉字数字算字", () => {
    expectCounts("１２", { digits: 2 });
    expectCounts("。", { punctuation: 1 });
    expectCounts("三", { cjk: 1 });
  });

  it("空格和看不清的记号本身不加进字数", () => {
    expectCounts("  \n", {});
    expectCounts("😀", { other: 1 });
    expectCounts("ㄱ", { cjk: 1 });
    expectCounts("e.g.", { words: 2, latinLetters: 2, punctuation: 2 });
  });
});

describe("parseCountResponse", () => {
  it("数字只来自转写,模型写的计数丢掉", () => {
    const result = parseCountResponse('{"status":"counted","transcript":"hi","words":99,"cjk":8}');
    expect(result.status).toBe("counted");
    if (result.status === "counted") {
      expect(result.counts.words).toBe(1);
      expect(result.counts.latinLetters).toBe(2);
      expect(result.counts.cjk).toBe(0);
    }
  });

  it("从代码块里取出 JSON", () => {
    const result = parseCountResponse('```json\n{"status":"counted","transcript":"ab"}\n```');
    expect(result.status).toBe("counted");
    if (result.status === "counted") expect(result.transcript).toBe("ab");
  });

  it("retake 丢掉转写", () => {
    expect(parseCountResponse('{"status":"retake","transcript":"hello"}')).toEqual({ status: "retake" });
  });

  it("空白转写变成 empty,有字的 empty 按 counted 收下", () => {
    expect(parseCountResponse('{"status":"counted","transcript":"  \\n"}')).toEqual({ status: "empty" });
    const result = parseCountResponse('{"status":"empty","transcript":"hi"}');
    expect(result.status).toBe("counted");
    if (result.status === "counted") expect(result.counts.words).toBe(1);
  });

  it("没有 JSON 时抛错", () => {
    expect(() => parseCountResponse("nope")).toThrow(/no json/);
  });

  it("备注截到 240 字,转写超过 8000 字截断", () => {
    const noted = parseCountResponse(JSON.stringify({ status: "counted", transcript: "hi", note: `  ${"n".repeat(300)}  ` }));
    expect(noted.status).toBe("counted");
    if (noted.status === "counted") expect(noted.note).toHaveLength(240);

    const long = parseCountResponse(JSON.stringify({ status: "counted", transcript: "a".repeat(8001) }));
    expect(long.status).toBe("counted");
    if (long.status === "counted") {
      expect(long.truncated).toBe(true);
      expect(long.transcript).toHaveLength(8000);
      expect(long.counts.latinLetters).toBe(8000);
    }
  });
});

describe("buildCountPrompt", () => {
  it("要求只转写手写,看不清写方框,不改错字不翻译,备注用传入的语言", () => {
    const prompt = buildCountPrompt("zh");
    expect(prompt).toContain("handwritten");
    expect(prompt).toContain("□");
    expect(prompt).toContain("Do not correct spelling");
    expect(prompt).toContain("Do not translate");
    expect(prompt).toContain("Chinese");
    expect(buildCountPrompt("en")).toContain("English");
    expect(buildCountPrompt("ja")).toContain("Japanese");
  });
});
