import { describe, expect, it } from "vitest";
import {
  coloringFontId,
  defaultFontId,
  defaultPageFormat,
  formatLength,
  speechLang,
  templateFontId,
} from "./localeDefaults";

describe("localeDefaults", () => {
  it("语音语言跟随页面语言", () => {
    expect(speechLang("en")).toBe("en-US");
    expect(speechLang("de")).toBe("de-DE");
    expect(speechLang("pt")).toBe("pt-BR");
    expect(speechLang("zh")).toBe("zh-CN");
    expect(speechLang("ja")).toBe("ja-JP");
    expect(speechLang("nope")).toBe("en-US");
  });

  it("默认字体与纸张按地区", () => {
    expect(defaultFontId("en")).toBe("patrickhand");
    expect(defaultFontId("fr")).toBe("patrickhand");
    expect(defaultFontId("zh")).toBe("mashanzheng");
    expect(defaultFontId("ja")).toBe("kleeone");
    expect(defaultFontId("ko")).toBe("nanumpenscript");
    expect(defaultPageFormat("en")).toBe("letter");
    expect(defaultPageFormat("de")).toBe("a4");
    expect(defaultPageFormat("zh")).toBe("a4");
  });

  it("拉丁语模板不用中文书法字体", () => {
    expect(templateFontId("mashanzheng", "en")).toBe("caveat");
    expect(templateFontId("longcang", "de")).toBe("dancingscript");
    expect(templateFontId("caveat", "en")).toBe("caveat");
    expect(templateFontId("mashanzheng", "zh")).toBe("mashanzheng");
  });

  it("涂色页默认字体与长度单位", () => {
    expect(coloringFontId("en")).toBe("indieflower");
    expect(coloringFontId("zh")).toBe("zcoolkuaile");
    expect(formatLength(96, "en")).toBe("1.00 in");
    expect(formatLength(96, "de")).toBe("25.4 mm");
  });
});
