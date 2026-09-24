export function audioFormat(mime) {
  const type = (mime || "").toLowerCase();
  if (type.includes("webm")) return "webm";
  if (type.includes("ogg")) return "ogg";
  if (type.includes("wav")) return "wav";
  if (type.includes("mpeg") || type.includes("mp3")) return "mp3";
  if (type.includes("aac") && !type.includes("mp4")) return "aac";
  return "m4a";
}
