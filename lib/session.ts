export const TEXT_KEY = "v2h-text";

export function saveText(text: string) {
  sessionStorage.setItem(TEXT_KEY, text);
}

export function loadText() {
  return sessionStorage.getItem(TEXT_KEY) || "";
}
