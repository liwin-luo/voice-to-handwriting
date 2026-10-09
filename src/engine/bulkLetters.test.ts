import { describe, expect, it } from "vitest";
import {
  BULK_LETTER_CAP,
  fillLetter,
  fromLine,
  letterBody,
  paginateLetter,
  parseRecipientCsv,
  recipientLines,
  recipientSeed,
} from "./bulkLetters";

const HEADER = "name,street,city,region,postal";

describe("parseRecipientCsv", () => {
  it("reads people and a quoted street", () => {
    const parsed = parseRecipientCsv(
      `${HEADER}\nAvery Chen,"18 Oak Street, Apt 2",Glen Rock,NJ,07452\nSam Ortiz,402 Pine Ave,Austin,TX,78701\n`,
    );
    expect(parsed.issues).toEqual([]);
    expect(parsed.recipients).toHaveLength(2);
    expect(parsed.recipients[0].street).toBe("18 Oak Street, Apt 2");
    expect(parsed.recipients[1].city).toBe("Austin");
  });

  it("accepts zip and state as column names and lets message replace the template", () => {
    const parsed = parseRecipientCsv("name,address,city,state,zip,message\nSam,1 Main,Austin,TX,78701,Hello {name}\n");
    expect(parsed.issues).toEqual([]);
    expect(letterBody(parsed.recipients[0], "Template for {name}\n{from}", "Jo")).toBe("Hello Sam");
  });

  it("skips a row with no name and caps the list", () => {
    const rows = Array.from({ length: BULK_LETTER_CAP + 2 }, (_, i) =>
      i === 0 ? ",1 Main,Austin,TX,78701" : `Person ${i},1 Main,Austin,TX,78701`,
    );
    const parsed = parseRecipientCsv(`${HEADER}\n${rows.join("\n")}\n`);
    expect(parsed.recipients).toHaveLength(BULK_LETTER_CAP);
    expect(parsed.issues).toEqual([
      { code: "skipped", count: 1 },
      { code: "truncated", count: BULK_LETTER_CAP },
    ]);
  });

  it("rejects a table without the required columns", () => {
    expect(parseRecipientCsv("name,note\nSam,hi\n").issues).toEqual([{ code: "badHeader" }]);
  });

  it("stays quiet when the box is empty", () => {
    expect(parseRecipientCsv("  \n").issues).toEqual([]);
  });
});

describe("fillLetter", () => {
  it("fills the name and drops an empty signature", () => {
    expect(fillLetter("Dear {name},\n\nThanks.\n{from}", "Sam", "")).toBe("Dear Sam,\n\nThanks.");
    expect(fromLine("\n  Jo Lee\n1 Main")).toBe("Jo Lee");
  });

  it("keeps the same seed for the same name", () => {
    expect(recipientSeed("Sam")).toBe(recipientSeed("Sam"));
    expect(recipientLines({ name: "Sam", street: "1 Main", city: "Austin", region: "TX", postal: "78701", message: "" })).toEqual([
      "Sam",
      "1 Main",
      "Austin, TX 78701",
    ]);
  });
});

describe("paginateLetter", () => {
  it("keeps a short note on one page and does not drop a long one", () => {
    expect(paginateLetter("Dear Sam,\n\nThanks.")).toEqual(["Dear Sam,\n\nThanks."]);
    const long = "word ".repeat(800).trim();
    const pages = paginateLetter(long);
    expect(pages.length).toBeGreaterThan(1);
    expect(pages.join(" ").replace(/ +/g, " ")).toBe(long);
  });
});
