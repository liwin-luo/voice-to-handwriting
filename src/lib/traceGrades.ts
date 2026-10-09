export const TRACE_GRADES = [
  { id: "young", bandH: 120 },
  { id: "mid", bandH: 90 },
  { id: "older", bandH: 68 },
] as const;

export type TraceGradeId = (typeof TRACE_GRADES)[number]["id"];

export function gradeForBand(bandH: number): TraceGradeId | null {
  return TRACE_GRADES.find((g) => g.bandH === bandH)?.id ?? null;
}

/** 空输入（含纯空白行）时用示例名，让预览和导出都有字。 */
export function tracingLines(input: string, sample: string): string[] {
  const lines = input.split("\n").map((l) => l.trim()).filter(Boolean);
  if (lines.length) return lines;
  return sample.split("\n").map((l) => l.trim()).filter(Boolean);
}

/** 每人一页时，每个名字单独占一页并在该页内重复。否则所有名字在同一页循环。 */
export function tracingSheets(lines: string[], oneEach: boolean): string[][] {
  if (!oneEach || lines.length < 2) return [lines];
  return lines.map((line) => [line]);
}
