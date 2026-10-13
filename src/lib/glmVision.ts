import { glmModelId, readModelContent } from "@/lib/handwritingCheck";

/** 智谱看图。照片只放进这一次请求,调用方不把图片写入日志或响应。 */
export async function askGlmVision(prompt: string, jpeg: Uint8Array): Promise<string> {
  const key = process.env.TEXT_API_KEY?.trim();
  if (!key) throw new Error("no key");
  const base = (process.env.TEXT_BASE_URL?.trim() || "https://open.bigmodel.cn/api/coding/paas/v4").replace(/\/$/, "");
  const model = glmModelId(process.env.TEXT_MODEL?.trim() || "glm-5.3-flash");
  const dataUrl = `data:image/jpeg;base64,${Buffer.from(jpeg).toString("base64")}`;
  const res = await fetch(`${base}/chat/completions`, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    signal: AbortSignal.timeout(60_000),
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            { type: "image_url", image_url: { url: dataUrl } },
          ],
        },
      ],
    }),
  });
  if (!res.ok) throw new Error(`model ${res.status}`);
  return readModelContent(await res.json());
}
