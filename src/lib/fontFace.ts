/** 等待指定 font-family 完成注册再画 canvas,否则 fonts.load 空转、画出回退字体。
 *  字体样式表由 FontStylesheets 水合后异步注入;超时兜底放行(画回退也好过永久转圈)。 */
export function waitForFontFace(family: string, timeoutMs = 3000): Promise<void> {
  return new Promise((resolve) => {
    const started = Date.now();
    const tick = () => {
      for (const face of document.fonts) {
        if (face.family.replace(/["']/g, "") === family) return resolve();
      }
      if (Date.now() - started > timeoutMs) return resolve();
      setTimeout(tick, 50);
    };
    tick();
  });
}
