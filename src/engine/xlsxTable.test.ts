import { deflateRawSync } from "node:zlib";
import { describe, expect, it } from "vitest";
import { parseRecipientCsv, tableToCsv } from "./bulkLetters";
import { LETTER_TEMPLATE_ROWS, buildLetterTemplate, readXlsxRows, zipBytes, zipStore } from "./xlsxTable";

describe("xlsx recipients", () => {
  it("round-trips the template, including a leading zero in the postal code", async () => {
    const rows = await readXlsxRows(buildLetterTemplate().buffer as ArrayBuffer);
    expect(rows).toEqual(LETTER_TEMPLATE_ROWS.map((row) => (row[5] === "" ? row.slice(0, 5) : row)));
    const parsed = parseRecipientCsv(tableToCsv(rows));
    expect(parsed.issues).toEqual([]);
    expect(parsed.recipients[0].postal).toBe("07452");
    expect(parsed.recipients[0].message).toBe("");
  });

  it("keeps a comma inside a street", async () => {
    const rows = [
      ["name", "street", "city", "region", "postal"],
      ["Sam Ortiz", "402 Pine Ave, Apt 2", "Austin", "TX", "78701"],
    ];
    const back = await readXlsxRows(Uint8Array.from(zipStore([["[Content_Types].xml", ""], ["xl/worksheets/sheet1.xml", sheet(rows)]])).buffer as ArrayBuffer);
    expect(parseRecipientCsv(tableToCsv(back)).recipients[0].street).toBe("402 Pine Ave, Apt 2");
  });

  it("reads shared strings and a numeric postal from a deflated sheet", async () => {
    const shared = `<?xml version="1.0"?><sst xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" count="2"><si><t>name</t></si><si><t>Avery &amp; Chen</t></si></sst>`;
    const sheetXml = `<?xml version="1.0"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData>
      <row r="1"><c r="A1" t="s"><v>0</v></c><c r="B1" t="inlineStr"><is><t>street</t></is></c><c r="C1" t="inlineStr"><is><t>city</t></is></c><c r="D1" t="inlineStr"><is><t>region</t></is></c><c r="E1" t="inlineStr"><is><t>postal</t></is></c></row>
      <row r="2"><c r="A2" t="s"><v>1</v></c><c r="B2" t="inlineStr"><is><t>18 Oak Street</t></is></c><c r="C2" t="inlineStr"><is><t>Glen Rock</t></is></c><c r="D2" t="inlineStr"><is><t>NJ</t></is></c><c r="E2"><v>7452</v></c></row>
    </sheetData></worksheet>`;
    const packed = deflateRawSync(Buffer.from(sheetXml));
    const bytes = zipBytes([
      { name: "xl/sharedStrings.xml", data: Buffer.from(shared), stored: Buffer.from(shared), method: 0 },
      { name: "xl/worksheets/sheet1.xml", data: Buffer.from(sheetXml), stored: packed, method: 8 },
    ]);
    const rows = await readXlsxRows(bytes.buffer as ArrayBuffer);
    expect(rows[1][0]).toBe("Avery & Chen");
    expect(rows[1][4]).toBe("7452");
  });
});

function sheet(rows: string[][]): string {
  const body = rows
    .map((row, r) => {
      const cells = row.map((value, c) => `<c r="${String.fromCharCode(65 + c)}${r + 1}" t="inlineStr"><is><t>${value}</t></is></c>`).join("");
      return `<row r="${r + 1}">${cells}</row>`;
    })
    .join("");
  return `<?xml version="1.0"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData>${body}</sheetData></worksheet>`;
}
