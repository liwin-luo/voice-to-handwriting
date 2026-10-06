/** 确定性伪随机抖动:同一(种子, 字符索引)永远得到同一抖动参数,
 *  保证编辑文字不扰动其他字符、导出可复现。
 *
 *  笔迹指纹模型:种子先派生一套"全局书写习惯"(倾斜、大小波动、基线波浪、
 *  字距倾向、墨色深浅),再与逐字符扰动叠加——换种子 = 换一种人的字,
 *  而不只是重摇噪声。所有参数最终乘以 intensity,0 = 完全工整。 */

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

/** 该笔迹的全局书写习惯(由种子唯一决定) */
export interface StyleFingerprint {
  slant: number; // 全局倾斜角度(°,-5~5)
  sizeAmp: number; // 字号波动倍率(0.4~1.8)
  bounceAmp: number; // 上下跳动倍率(0.4~1.8)
  waveAmp: number; // 基线波浪幅度(px,0~7)
  waveFreq: number; // 波浪频率(每字符 0.04~0.3)
  spacingTendency: number; // 字距倾向(px,-1~1)
  darkness: number; // 墨色深浅(0.78~1)
}

export function styleFingerprint(seed: number): StyleFingerprint {
  const r = mulberry32(hash2(seed, 0));
  return {
    slant: r() * 10 - 5,
    sizeAmp: 0.4 + r() * 1.4,
    bounceAmp: 0.4 + r() * 1.4,
    waveAmp: r() * 7,
    waveFreq: 0.04 + r() * 0.26,
    spacingTendency: r() * 2 - 1,
    darkness: 1 - r() * 0.22,
  };
}

export interface JitterParams {
  rotate: number; // deg
  translateY: number; // px
  scale: number;
  letterSpacing: number; // px
  opacity: number;
}

/** @param charIndex 字符全局索引 @param seed 全局种子 @param intensity 0~1 仿真度 */
export function charJitter(charIndex: number, seed: number, intensity: number): JitterParams {
  const fp = styleFingerprint(seed);
  const rand = mulberry32(hash2(seed, charIndex));
  const n = (x: number) => (Object.is(x, -0) ? 0 : x);
  const wave = Math.sin(charIndex * fp.waveFreq * Math.PI) * fp.waveAmp;
  return {
    rotate: n((fp.slant + (rand() * 4 - 2)) * intensity),
    translateY: n((wave + (rand() * 6 - 3) * fp.bounceAmp) * intensity),
    scale: 1 + (rand() * 0.2 - 0.1) * fp.sizeAmp * intensity,
    letterSpacing: n((fp.spacingTendency + (rand() * 2 - 1) * 0.8) * intensity),
    opacity: Math.min(1, 1 - (rand() * 0.12 + (1 - fp.darkness) * 0.6) * intensity),
  };
}
