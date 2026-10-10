/** 把姓名拆成练习用的短签。
 *  ponytail: 只按空格切,不认 de / van / 复姓。升级路径是姓氏虚词表。 */
const MAX_CHARS = 48;

function clip(value: string): string {
  const text = value.replace(/\s+/g, " ").trim();
  return text.length > MAX_CHARS ? text.slice(0, MAX_CHARS).trim() : text;
}

export function signatureForms(raw: string): string[] {
  const name = clip(raw);
  if (!name) return [];
  const parts = name.split(" ");
  const forms = [name];
  if (parts.length >= 2) {
    const first = parts[0] ?? "";
    const last = parts[parts.length - 1] ?? "";
    forms.push(first);
    const initial = Array.from(first)[0] ?? "";
    if (initial) forms.push(`${initial.toLocaleUpperCase("en-US")}. ${last}`);
  }
  return [...new Set(forms)];
}
