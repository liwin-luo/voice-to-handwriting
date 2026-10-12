/** 在线手写板的笔迹数据。绘制留在组件里;这里只做抽点、比例坐标和存盘读写。 */

export const PAD_STORAGE_KEY = "vth-pad";

export const PEN_WIDTHS = [2, 4, 8] as const;
export const DEFAULT_PEN_WIDTH = 4;
export const ERASER_WIDTH = 28;
/** 离上一个点不足这么多 CSS 像素就丢掉。 */
export const MIN_POINT_GAP_PX = 2;
export const DEFAULT_INK = "#15317e";
/** 与 useEditorStore 的 INKS 色值一致。引擎不引用 store,避免把 zustand 拉进纯函数。 */
export const PAD_INKS = ["#15317e", "#1a1a1a", "#8c1f28", "#303f9f", "#1b4332", "#6d4c41", "#4b5563"] as const;
export const LINE_GAP = 40;
export const RULED_COLOR = "#c7d4e3";
export const GRID_COLOR = "#d9e2ec";

/** 恶意或写坏的本地记录到此为止,避免一次解析拖死页面。 */
const MAX_STROKES = 2000;
const MAX_POINTS = 5000;

export type PadPaper = "blank" | "ruled" | "grid";
export type PadTool = "pen" | "eraser";

export interface PadPoint {
  /** 相对纸面宽高的比例,0 到 1 */
  x: number;
  y: number;
}

export interface PadStroke {
  tool: PadTool;
  color: string;
  /** 笔用 2/4/8;橡皮用 ERASER_WIDTH */
  width: number;
  points: PadPoint[];
}

export interface PadSheet {
  strokes: PadStroke[];
  paper: PadPaper;
  ink: string;
  width: number;
}

const PAPERS: readonly PadPaper[] = ["blank", "ruled", "grid"];
const HEX = /^#[0-9a-fA-F]{6}$/;

export function defaultSheet(): PadSheet {
  return { strokes: [], paper: "blank", ink: DEFAULT_INK, width: DEFAULT_PEN_WIDTH };
}

function clamp01(n: number): number {
  if (!Number.isFinite(n)) return 0;
  return Math.min(1, Math.max(0, n));
}

export function toRatio(x: number, y: number, width: number, height: number): PadPoint {
  return {
    x: clamp01(width > 0 ? x / width : 0),
    y: clamp01(height > 0 ? y / height : 0),
  };
}

export function fromRatio(point: PadPoint, width: number, height: number): { x: number; y: number } {
  return { x: point.x * width, y: point.y * height };
}

/** 返回原数组表示这个点被丢掉了,调用方可以跳过重画。 */
export function appendPoint(
  points: PadPoint[],
  point: PadPoint,
  width: number,
  height: number,
): PadPoint[] {
  const next = { x: clamp01(point.x), y: clamp01(point.y) };
  const last = points[points.length - 1];
  if (!last) return [next];
  const dx = (next.x - last.x) * width;
  const dy = (next.y - last.y) * height;
  if (dx * dx + dy * dy < MIN_POINT_GAP_PX * MIN_POINT_GAP_PX) return points;
  return [...points, next];
}

function isPaper(value: unknown): value is PadPaper {
  return typeof value === "string" && (PAPERS as readonly string[]).includes(value);
}

function isPenWidth(value: unknown): value is (typeof PEN_WIDTHS)[number] {
  return typeof value === "number" && (PEN_WIDTHS as readonly number[]).includes(value);
}

function parseStroke(value: unknown): PadStroke | null {
  if (!value || typeof value !== "object") return null;
  const raw = value as Record<string, unknown>;
  if (raw.tool !== "pen" && raw.tool !== "eraser") return null;
  if (typeof raw.color !== "string" || !HEX.test(raw.color)) return null;
  if (typeof raw.width !== "number" || !Number.isFinite(raw.width) || raw.width < 1 || raw.width > 64) {
    return null;
  }
  if (!Array.isArray(raw.points) || raw.points.length === 0) return null;
  const points: PadPoint[] = [];
  for (const point of raw.points) {
    if (points.length >= MAX_POINTS) break;
    if (!point || typeof point !== "object") return null;
    const p = point as Record<string, unknown>;
    if (typeof p.x !== "number" || typeof p.y !== "number") return null;
    points.push({ x: clamp01(p.x), y: clamp01(p.y) });
  }
  if (!points.length) return null;
  return { tool: raw.tool, color: raw.color, width: raw.width, points };
}

export function parseSheet(raw: string | null): PadSheet | null {
  if (!raw) return null;
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!data || typeof data !== "object") return null;
  const sheet = data as Record<string, unknown>;
  if (!isPaper(sheet.paper)) return null;
  if (typeof sheet.ink !== "string" || !(PAD_INKS as readonly string[]).includes(sheet.ink)) return null;
  if (!isPenWidth(sheet.width)) return null;
  if (!Array.isArray(sheet.strokes)) return null;
  const strokes: PadStroke[] = [];
  for (const stroke of sheet.strokes) {
    if (strokes.length >= MAX_STROKES) break;
    const parsed = parseStroke(stroke);
    if (!parsed) return null;
    strokes.push(parsed);
  }
  return { strokes, paper: sheet.paper, ink: sheet.ink, width: sheet.width };
}

export function serializeSheet(sheet: PadSheet): string {
  return JSON.stringify(sheet);
}
