/** 写字母之前的运笔。每种笔画画一行范例、一行虚线、一行空白。 */

export const STROKE_GROUPS = {
  lines: ["down", "across", "slant"] as const,
  curves: ["circle", "wave", "arch"] as const,
};

export type StrokeId = (typeof STROKE_GROUPS)["lines"][number] | (typeof STROKE_GROUPS)["curves"][number];

export function strokesFor(group: keyof typeof STROKE_GROUPS): StrokeId[] {
  return [...STROKE_GROUPS[group]];
}
