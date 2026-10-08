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
