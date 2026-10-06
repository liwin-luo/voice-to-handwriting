/**
 * 把用户上传的图片转成适合做纸张背景的 data URL。
 * 压到长边 1600px 的 JPEG:customPaper 会被持久化到 localStorage,原图(data URL)很容易超出 5MB 配额,
 * 一旦写入失败会丢掉全部样式偏好,所以必须在入库前压缩。
 */
export async function fileToPaperImage(file: File): Promise<string> {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const el = new Image();
    el.onload = () => resolve(el);
    el.onerror = reject;
    el.src = dataUrl;
  });
  const max = 1600;
  const ratio = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
  if (ratio === 1 && file.size < 200 * 1024) return dataUrl; // 已经足够小,直接用原图保留透明度
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(img.naturalWidth * ratio));
  canvas.height = Math.max(1, Math.round(img.naturalHeight * ratio));
  const ctx = canvas.getContext("2d");
  if (!ctx) return dataUrl;
  ctx.fillStyle = "#ffffff"; // 透明区域垫白,避免 JPEG 编码后变黑
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", 0.85);
}
