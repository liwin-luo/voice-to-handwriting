/** 把墨色往白纸上淡一档，给描红层用。amount 为 0 时保持原色，为 1 时变成纯白。 */
export function fadeInk(hex: string, amount = 0.55): string {
  const n = hex.replace("#", "");
  if (n.length !== 6) return hex;
  const channels = [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16));
  if (channels.some((c) => Number.isNaN(c))) return hex;
  const mix = (c: number) => Math.round(c + (255 - c) * amount);
  return `#${channels.map((c) => mix(c).toString(16).padStart(2, "0")).join("")}`;
}
