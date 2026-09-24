export function pdfFromJpegs(pages) {
  const enc = new TextEncoder();
  const parts = [];
  const offsets = [0];
  let length = 0;

  const add = (part) => {
    const bytes = typeof part === "string" ? enc.encode(part) : part;
    parts.push(bytes);
    length += bytes.length;
  };
  const obj = (bodyParts) => {
    offsets.push(length);
    for (const part of bodyParts) add(part);
  };

  add("%PDF-1.3\n");
  const pageIds = pages.map((_, index) => 3 + index * 3);
  obj([`1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n`]);
  obj([`2 0 obj\n<< /Type /Pages /Count ${pages.length} /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] >>\nendobj\n`]);

  for (let index = 0; index < pages.length; index++) {
    const page = pages[index];
    const pageId = pageIds[index];
    const content = `q\n${page.width} 0 0 ${page.height} 0 0 cm\n/Im Do\nQ\n`;
    obj([`${pageId} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${page.width} ${page.height}] /Contents ${pageId + 1} 0 R /Resources << /XObject << /Im ${pageId + 2} 0 R >> >> >>\nendobj\n`]);
    obj([`${pageId + 1} 0 obj\n<< /Length ${enc.encode(content).length} >>\nstream\n${content}endstream\nendobj\n`]);
    obj([
      `${pageId + 2} 0 obj\n<< /Type /XObject /Subtype /Image /Width ${page.width} /Height ${page.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${page.jpeg.length} >>\nstream\n`,
      page.jpeg,
      "\nendstream\nendobj\n",
    ]);
  }

  const xref = length;
  add(`xref\n0 ${offsets.length}\n`);
  add("0000000000 65535 f \n");
  for (let index = 1; index < offsets.length; index++) add(`${String(offsets[index]).padStart(10, "0")} 00000 n \n`);
  add(`trailer\n<< /Size ${offsets.length} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`);

  const out = new Uint8Array(length);
  let cursor = 0;
  for (const part of parts) {
    out.set(part, cursor);
    cursor += part.length;
  }
  return out;
}
