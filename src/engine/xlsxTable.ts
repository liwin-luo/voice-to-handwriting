/** 最小 xlsx：写出模板、读回第一张表。只支持 store 与 deflate。
 *  ponytail: 邮编列在模板里标成文本，避免 Excel 吃掉前导 0。用户若把格子改成数字再保存，读回来没有前导 0。升级路径：换正式的表格库。 */

export const LETTER_TEMPLATE_ROWS = [
  ["name", "street", "city", "region", "postal", "message"],
  ["Avery Chen", "18 Oak Street", "Glen Rock", "NJ", "07452", ""],
  ["Sam Ortiz", "402 Pine Ave", "Austin", "TX", "78701", ""],
];

const TEXT = new TextEncoder();
const TEXT_OUT = new TextDecoder();

export function buildLetterTemplate(): Uint8Array {
  return buildXlsx(LETTER_TEMPLATE_ROWS, [4]);
}

export function buildXlsx(rows: string[][], textColumns: number[] = []): Uint8Array {
  const text = new Set(textColumns);
  const sheetRows = rows
    .map((row, r) => {
      const cells = row
        .map((value, c) => {
          if (!value) return "";
          const ref = `${colName(c)}${r + 1}`;
          const style = text.has(c) ? ` s="1"` : "";
          return `<c r="${ref}" t="inlineStr"${style}><is><t>${xml(value)}</t></is></c>`;
        })
        .join("");
      return `<row r="${r + 1}">${cells}</row>`;
    })
    .join("");
  const cols = textColumns
    .map((c) => `<col min="${c + 1}" max="${c + 1}" width="16" style="1" customWidth="1"/>`)
    .join("");
  const sheet = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">${cols ? `<cols>${cols}</cols>` : ""}<sheetData>${sheetRows}</sheetData></worksheet>`;
  return zipStore([
    ["[Content_Types].xml", contentTypes()],
    ["_rels/.rels", rels()],
    ["xl/workbook.xml", workbook()],
    ["xl/_rels/workbook.xml.rels", workbookRels()],
    ["xl/styles.xml", styles()],
    ["xl/worksheets/sheet1.xml", sheet],
  ]);
}

export async function readXlsxRows(data: ArrayBuffer): Promise<string[][]> {
  const files = await unzip(new Uint8Array(data));
  const sheetName = [...files.keys()]
    .filter((name) => /xl\/worksheets\/sheet\d+\.xml$/.test(name))
    .sort()[0];
  const sheet = sheetName ? files.get(sheetName) : undefined;
  if (!sheet) throw new Error("sheet");
  const shared = files.has("xl/sharedStrings.xml") ? sharedStrings(files.get("xl/sharedStrings.xml")!) : [];
  return rowsFromSheet(sheet, shared).filter((row) => row.some((cell) => cell.trim()));
}

function rowsFromSheet(xmlText: string, shared: string[]): string[][] {
  const rows: string[][] = [];
  for (const rowXml of xmlText.match(/<row\b[^>]*>[\s\S]*?<\/row>/g) ?? []) {
    const cells: { col: number; value: string }[] = [];
    for (const cell of rowXml.match(/<c\b[^>]*(?:\/>|>[\s\S]*?<\/c>)/g) ?? []) {
      const ref = /r="([A-Z]+)\d+"/i.exec(cell)?.[1];
      if (!ref) continue;
      const type = /t="([^"]+)"/.exec(cell)?.[1] ?? "";
      cells.push({ col: colIndex(ref), value: cellValue(cell, type, shared) });
    }
    const width = cells.reduce((max, cell) => Math.max(max, cell.col + 1), 0);
    const row = Array.from({ length: width }, () => "");
    for (const cell of cells) row[cell.col] = cell.value;
    rows.push(row);
  }
  return rows;
}

function cellValue(cell: string, type: string, shared: string[]): string {
  if (type === "inlineStr") return decodeXml((cell.match(/<t[^>]*>([^<]*)<\/t>/g) ?? []).map(textOf).join(""));
  const raw = /<v[^>]*>([^<]*)<\/v>/.exec(cell)?.[1] ?? "";
  if (type === "s") return shared[Number(raw)] ?? "";
  return decodeXml(raw);
}

function sharedStrings(xmlText: string): string[] {
  return [...xmlText.matchAll(/<si\b[^>]*>([\s\S]*?)<\/si>/g)].map((match) =>
    decodeXml((match[1].match(/<t[^>]*>([^<]*)<\/t>/g) ?? []).map(textOf).join("")),
  );
}

function textOf(tag: string): string {
  return /<t[^>]*>([^<]*)<\/t>/.exec(tag)?.[1] ?? "";
}

function colIndex(letters: string): number {
  let n = 0;
  for (const ch of letters.toUpperCase()) n = n * 26 + (ch.charCodeAt(0) - 64);
  return n - 1;
}

function colName(index: number): string {
  let n = index + 1;
  let name = "";
  while (n > 0) {
    const rem = (n - 1) % 26;
    name = String.fromCharCode(65 + rem) + name;
    n = Math.floor((n - 1) / 26);
  }
  return name;
}

function xml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function decodeXml(value: string): string {
  return value
    .replace(/&#(\d+);/g, (_, n: string) => String.fromCodePoint(Number(n)))
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&");
}

function contentTypes(): string {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
<Default Extension="xml" ContentType="application/xml"/>
<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
<Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
</Types>`;
}

function rels(): string {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>`;
}

function workbook(): string {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
<sheets><sheet name="Recipients" sheetId="1" r:id="rId1"/></sheets>
</workbook>`;
}

function workbookRels(): string {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>`;
}

function styles(): string {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
<numFmts count="1"><numFmt numFmtId="164" formatCode="@"/></numFmts>
<fonts count="1"><font><sz val="11"/><name val="Calibri"/></font></fonts>
<fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills>
<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>
<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
<cellXfs count="2">
<xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>
<xf numFmtId="164" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/>
</cellXfs>
</styleSheet>`;
}

export function zipStore(files: [string, string][]): Uint8Array {
  return zipBytes(files.map(([name, contents]) => {
    const data = TEXT.encode(contents);
    return { name, data, stored: data, method: 0 as const };
  }));
}

/** method 8 的 stored 是 deflate 后的字节，data 是原文，供测试真实的 Excel 压缩包。 */
export function zipBytes(entries: { name: string; data: Uint8Array; stored: Uint8Array; method: 0 | 8 }[]): Uint8Array {
  const locals: Uint8Array[] = [];
  const centrals: Uint8Array[] = [];
  let offset = 0;
  for (const entry of entries) {
    const named = TEXT.encode(entry.name);
    const crc = crc32(entry.data);
    const local = new Uint8Array(30 + named.length + entry.stored.length);
    const view = new DataView(local.buffer);
    view.setUint32(0, 0x04034b50, true);
    view.setUint16(4, 20, true);
    view.setUint16(8, entry.method, true);
    view.setUint32(14, crc, true);
    view.setUint32(18, entry.stored.length, true);
    view.setUint32(22, entry.data.length, true);
    view.setUint16(26, named.length, true);
    local.set(named, 30);
    local.set(entry.stored, 30 + named.length);
    locals.push(local);

    const central = new Uint8Array(46 + named.length);
    const cv = new DataView(central.buffer);
    cv.setUint32(0, 0x02014b50, true);
    cv.setUint16(4, 20, true);
    cv.setUint16(6, 20, true);
    cv.setUint16(10, entry.method, true);
    cv.setUint32(16, crc, true);
    cv.setUint32(20, entry.stored.length, true);
    cv.setUint32(24, entry.data.length, true);
    cv.setUint16(28, named.length, true);
    cv.setUint32(42, offset, true);
    central.set(named, 46);
    centrals.push(central);
    offset += local.length;
  }
  const cdSize = centrals.reduce((sum, part) => sum + part.length, 0);
  const eocd = new Uint8Array(22);
  const ev = new DataView(eocd.buffer);
  ev.setUint32(0, 0x06054b50, true);
  ev.setUint16(8, entries.length, true);
  ev.setUint16(10, entries.length, true);
  ev.setUint32(12, cdSize, true);
  ev.setUint32(16, offset, true);
  const out = new Uint8Array(offset + cdSize + 22);
  let cursor = 0;
  for (const part of [...locals, ...centrals, eocd]) {
    out.set(part, cursor);
    cursor += part.length;
  }
  return out;
}

async function unzip(bytes: Uint8Array): Promise<Map<string, string>> {
  const eocd = findEocd(bytes);
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const count = view.getUint16(eocd + 10, true);
  let cursor = view.getUint32(eocd + 16, true);
  const files = new Map<string, string>();
  for (let i = 0; i < count; i++) {
    if (view.getUint32(cursor, true) !== 0x02014b50) throw new Error("central");
    const method = view.getUint16(cursor + 10, true);
    const size = view.getUint32(cursor + 20, true);
    const nameLen = view.getUint16(cursor + 28, true);
    const extraLen = view.getUint16(cursor + 30, true);
    const commentLen = view.getUint16(cursor + 32, true);
    const localAt = view.getUint32(cursor + 42, true);
    const name = TEXT_OUT.decode(bytes.subarray(cursor + 46, cursor + 46 + nameLen));
    const nameAtLocal = view.getUint16(localAt + 26, true);
    const extraAtLocal = view.getUint16(localAt + 28, true);
    const start = localAt + 30 + nameAtLocal + extraAtLocal;
    const compressed = bytes.subarray(start, start + size);
    const raw = method === 0 ? compressed : method === 8 ? await inflateRaw(compressed) : null;
    if (!raw) throw new Error("method");
    files.set(name, TEXT_OUT.decode(raw));
    cursor += 46 + nameLen + extraLen + commentLen;
  }
  return files;
}

function findEocd(bytes: Uint8Array): number {
  const min = Math.max(0, bytes.length - 22 - 65535);
  for (let i = bytes.length - 22; i >= min; i--) {
    if (bytes[i] === 0x50 && bytes[i + 1] === 0x4b && bytes[i + 2] === 0x05 && bytes[i + 3] === 0x06) return i;
  }
  throw new Error("eocd");
}

async function inflateRaw(data: Uint8Array): Promise<Uint8Array> {
  const stream = new DecompressionStream("deflate-raw");
  const writer = stream.writable.getWriter();
  await writer.write(data as BufferSource);
  await writer.close();
  return new Uint8Array(await new Response(stream.readable).arrayBuffer());
}

function crc32(data: Uint8Array): number {
  let c = 0xffffffff;
  for (const byte of data) c = CRC[(c ^ byte) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

const CRC = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c >>> 0;
  }
  return table;
})();
