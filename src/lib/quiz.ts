import type {
  DimensionId,
  Level,
  ProfileId,
  QuizQuestion,
} from "@/content/quiz";

export interface DimensionScore {
  id: DimensionId;
  score: number;
  max: number;
  level: Level;
}

export interface QuizResult {
  dimensions: DimensionScore[];
  profile: ProfileId;
}

const DIMENSION_ORDER: DimensionId[] = ["social", "expressive", "space", "focus", "pace"];

/** 三档阈值:低于 1/3 为低,低于 2/3 为中,其余为高 */
function levelOf(score: number, max: number): Level {
  const ratio = max === 0 ? 0 : score / max;
  if (ratio < 1 / 3) return "low";
  if (ratio < 2 / 3) return "mid";
  return "high";
}

/** 确定性档案映射:同一组答案永远得到同一档案(从上到下首个命中) */
function resolveProfile(dims: DimensionScore[]): ProfileId {
  const level = (id: DimensionId) => dims.find((d) => d.id === id)?.level;
  const is = (id: DimensionId, lv: Level) => level(id) === lv;
  if (is("pace", "high") && is("social", "high")) return "spark";
  if (is("expressive", "high") && is("social", "high")) return "bold";
  if (is("focus", "high") && !is("expressive", "high")) return "planner";
  if (is("focus", "low") && is("social", "low")) return "spirit";
  if (is("social", "low")) return "steady";
  return "balanced";
}

/**
 * 纯函数计分:answers[i] 为第 i 题所选选项的下标。
 * answers 不足或越界的题按 0 分计(正常流程不会发生,防御空答案)。
 */
export function scoreQuiz(answers: number[], questions: QuizQuestion[]): QuizResult {
  const scores = new Map<DimensionId, number>();
  const maxes = new Map<DimensionId, number>();
  for (const q of questions) {
    maxes.set(q.dimension, (maxes.get(q.dimension) ?? 0) + 2);
  }
  answers.forEach((choice, i) => {
    const q = questions[i];
    const opt = q?.options[choice];
    if (!q || !opt) return;
    scores.set(q.dimension, (scores.get(q.dimension) ?? 0) + opt.score);
  });
  const dimensions = DIMENSION_ORDER.filter((id) => maxes.has(id)).map((id) => {
    const score = scores.get(id) ?? 0;
    const max = maxes.get(id) ?? 0;
    return { id, score, max, level: levelOf(score, max) };
  });
  return { dimensions, profile: resolveProfile(dimensions) };
}

/** 进度文案占位符替换({n} 当前题号,{total} 总题数) */
export function formatProgress(template: string, n: number, total: number): string {
  return template.replace("{n}", String(n)).replace("{total}", String(total));
}
