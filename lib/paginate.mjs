export function wrapLine(line, maxChars) {
  const words = line.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return [""];
  const rows = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (current && next.length > maxChars) {
      rows.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) rows.push(current);
  return rows;
}

export function paginate(text, template) {
  const rows = String(text || "")
    .split(/\n/)
    .flatMap((line) => wrapLine(line, template.maxChars));
  const pages = [];
  for (let i = 0; i < rows.length; i += template.lines) pages.push(rows.slice(i, i + template.lines));
  return pages.length ? pages : [[]];
}
