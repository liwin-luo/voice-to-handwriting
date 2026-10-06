/** 确定性伪随机抖动:同一(种子, 字符索引)永远得到同一抖动参数,
 *  保证编辑文字不扰动其他字符、导出可复现。 */

export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function hash2(a: number, b: number): number {
  let h = (a ^ 0x9e3779b9) >>> 0;
  h = Math.imul(h ^ (h >>> 16), 0x45d9f3b) >>> 0;
  h = Math.imul(h ^ (h >>> 16), 0x45d9f3b) >>> 0;
  h = (h ^ b) >>> 0;
  h = Math.imul(h ^ (h >>> 16), 0x45d9f3b) >>> 0;
  h = Math.imul(h ^ (h >>> 16), 0x45d9f3b) >>> 0;
  return h >>> 0;
}

export interface JitterParams {
  rotate: number; // deg, ±2
  translateY: number; // px, ±3
  scale: number; // 0.95 ~ 1.05
  letterSpacing: number; // px, ±1
  opacity: number; // 0.85 ~ 1
}

/** @param charIndex 字符全局索引 @param seed 全局种子 @param intensity 0~1 仿真度 */
export function charJitter(charIndex: number, seed: number, intensity: number): JitterParams {
  const rand = mulberry32(hash2(seed, charIndex));
  const n = (x: number) => (Object.is(x, -0) ? 0 : x); // intensity=0 时归一化 -0
  return {
    rotate: n((rand() * 4 - 2) * intensity),
    translateY: n((rand() * 6 - 3) * intensity),
    scale: 1 + (rand() * 0.1 - 0.05) * intensity,
    letterSpacing: n((rand() * 2 - 1) * intensity),
    opacity: 1 - rand() * 0.15 * intensity,
  };
}
