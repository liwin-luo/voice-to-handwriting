"use client";
import { useEffect, useMemo, useState } from "react";

/**
 * 文本输入防抖 + IME 组词保护。
 * 重预览(canvas 整页重绘 / toDataURL / DOM 分页测量)不能逐键执行;
 * 拼音等输入法组词暂停(挑选候选词)期间更必须完全暂停重绘,否则候选窗口会被卡死。
 * 返回 [防抖后的值, 需展开到输入框上的 composition 事件属性]。
 */
export function useDebouncedImeSafe<T>(
  value: T,
  delayMs = 300,
): readonly [T, { onCompositionStart: () => void; onCompositionEnd: () => void }] {
  const [debounced, setDebounced] = useState(value);
  const [composing, setComposing] = useState(false);

  useEffect(() => {
    if (composing) return; // 组词中:不定时器,选字期间绝不触发重绘
    const id = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(id);
  }, [value, composing, delayMs]);

  return [
    debounced,
    useMemo(
      () => ({
        onCompositionStart: () => setComposing(true),
        onCompositionEnd: () => setComposing(false),
      }),
      [],
    ),
  ] as const;
}
