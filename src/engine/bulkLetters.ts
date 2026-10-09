/** 可打印手写信：解析收件人表、套姓名、把正文拆成信纸页。
 *  不寄信、不校验地址。信封尺寸由调用方按纸型选择。 */

export const BULK_LETTER_CAP = 30;

export const LETTER_KINDS = ["thanks", "referral", "prospect", "winback", "announce"] as const;
export type LetterKind = (typeof LETTER_KINDS)[number];

export interface Recipient {
  name: string;
  street: string;
  city: string;
  region: string;
  postal: string;
  /** 非空时整封替换模板，仍替换 {name} 与 {from} */
  message: string;
}

export type ParseIssue =
  | { code: "badHeader" }
  | { code: "noRows" }
  | { code: "truncated"; count: number }
  | { code: "skipped"; count: number };

const HEADER_ALIAS: Record<string, keyof Recipient> = {
  name: "name",
  street: "street",
  address: "street",
  city: "city",
  region: "region",
  state: "region",
  postal: "postal",
  zip: "postal",
  postcode: "postal",
  message: "message",
};

const REQUIRED: (keyof Recipient)[] = ["name", "street", "city", "region", "postal"];

/** ponytail: 约一页 US Letter / A4（22px 手写）。超长段按单位硬切。升级路径：用 PaperView 的行顶测量分页。 */
export const LETTER_PAGE_UNITS = 900;

export function parseRecipientCsv(text: string): { recipients: Recipient[]; issues: ParseIssue[] } {
  if (!text.trim()) return { recipients: [], issues: [] };
  const rows = parseCsv(text).filter((row) => row.some((cell) => cell.trim()));
  if (rows.length === 0) return { recipients: [], issues: [{ code: "noRows" }] };

  const index = new Map<keyof Recipient, number>();
  rows[0].forEach((cell, i) => {
    const key = HEADER_ALIAS[cell.trim().toLowerCase()];
    if (key && !index.has(key)) index.set(key, i);
  });
  if (REQUIRED.some((key) => !index.has(key))) return { recipients: [], issues: [{ code: "badHeader" }] };

  const recipients: Recipient[] = [];
  let skipped = 0;
  for (const row of rows.slice(1)) {
    const name = field(row, index.get("name")!);
    if (!name) {
      skipped += 1;
      continue;
    }
    recipients.push({
      name,
      street: field(row, index.get("street")!),
      city: field(row, index.get("city")!),
      region: field(row, index.get("region")!),
      postal: field(row, index.get("postal")!),
      message: index.has("message") ? field(row, index.get("message")!) : "",
    });
  }

  const issues: ParseIssue[] = [];
  if (skipped) issues.push({ code: "skipped", count: skipped });
  if (recipients.length === 0) {
    issues.push({ code: "noRows" });
    return { recipients, issues };
  }
  if (recipients.length > BULK_LETTER_CAP) {
    issues.push({ code: "truncated", count: BULK_LETTER_CAP });
    return { recipients: recipients.slice(0, BULK_LETTER_CAP), issues };
  }
  return { recipients, issues };
}

/** 回信地址的第一行，用作信末署名。没有则留空。 */
export function fromLine(returnAddress: string): string {
  return returnAddress.split(/\r?\n/).map((line) => line.trim()).find(Boolean) ?? "";
}

export function fillLetter(body: string, name: string, from: string): string {
  const signed = from.trim()
    ? body.replaceAll("{from}", from.trim())
    : body.replaceAll("\n{from}", "").replaceAll("{from}", "");
  return signed.replaceAll("{name}", name.trim()).replace(/\n{3,}/g, "\n\n").trim();
}

export function letterBody(recipient: Recipient, template: string, from: string): string {
  const source = recipient.message.trim() ? recipient.message : template;
  return fillLetter(source, recipient.name, from);
}

export function returnLines(returnAddress: string): string[] {
  return returnAddress.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
}

export function recipientLines(recipient: Recipient): string[] {
  const place =
    recipient.city && recipient.region
      ? `${recipient.city}, ${recipient.region}${recipient.postal ? ` ${recipient.postal}` : ""}`
      : [recipient.city, recipient.region, recipient.postal].filter(Boolean).join(" ");
  return [recipient.name, recipient.street, place].filter(Boolean);
}

export function recipientSeed(name: string): number {
  let h = 2166136261;
  for (const ch of name) h = Math.imul(h ^ ch.codePointAt(0)!, 16777619);
  return h >>> 0;
}

export function paginateLetter(text: string, budget = LETTER_PAGE_UNITS): string[] {
  const clean = text.trim();
  if (!clean) return [];
  const pages: string[] = [];
  let current = "";
  const flush = () => {
    if (current.trim()) pages.push(current.trim());
    current = "";
  };
  for (const para of clean.split(/\n{2,}/)) {
    if (textUnits(para) > budget) {
      flush();
      let rest = para;
      while (rest) {
        const taken = takeUnits(rest, budget);
        if (!taken.chunk) break;
        pages.push(taken.chunk.trim());
        rest = taken.rest.trimStart();
      }
      continue;
    }
    const next = current ? `${current}\n\n${para}` : para;
    if (current && textUnits(next) > budget) {
      flush();
      current = para;
    } else current = next;
  }
  flush();
  return pages;
}

function field(row: string[], index: number): string {
  return (row[index] ?? "").trim();
}

export function tableToCsv(rows: string[][]): string {
  return rows
    .filter((row) => row.some((cell) => cell.trim()))
    .map((row) => row.map(csvEscape).join(","))
    .join("\n");
}

function csvEscape(value: string): string {
  if (/[",\n\r]/.test(value)) return `"${value.replaceAll('"', '""')}"`;
  return value;
}

/** RFC 风格的最小 CSV：逗号分隔、双引号字段、"" 为引号本身。 */
export function parseCsv(text: string): string[][] {
  const src = text.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (quoted) {
      if (ch === '"') {
        if (src[i + 1] === '"') {
          cell += '"';
          i += 1;
        } else quoted = false;
      } else cell += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ",") {
      row.push(cell);
      cell = "";
    } else if (ch === "\n") {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else cell += ch;
  }
  if (cell.length > 0 || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }
  return rows;
}

function isCjk(code: number): boolean {
  return (
    (code >= 0x3400 && code <= 0x9fff) ||
    (code >= 0x3000 && code <= 0x303f) ||
    (code >= 0xf900 && code <= 0xfaff) ||
    (code >= 0xff00 && code <= 0xffef)
  );
}

function textUnits(text: string): number {
  let n = 0;
  for (let i = 0; i < text.length; ) {
    const code = text.codePointAt(i)!;
    n += code === 10 ? 24 : isCjk(code) ? 2 : 1;
    i += code > 0xffff ? 2 : 1;
  }
  return n;
}

function takeUnits(text: string, budget: number): { chunk: string; rest: string } {
  let n = 0;
  let i = 0;
  while (i < text.length) {
    const code = text.codePointAt(i)!;
    const width = code === 10 ? 24 : isCjk(code) ? 2 : 1;
    if (n + width > budget && i > 0) break;
    n += width;
    i += code > 0xffff ? 2 : 1;
  }
  return { chunk: text.slice(0, i), rest: text.slice(i) };
}
