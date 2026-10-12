import { buildCheckPrompt, glmModelId, parseCheckResponse, readModelContent } from "@/lib/handwritingCheck";
import { routing, type Locale } from "@/i18n/routing";

export const runtime = "nodejs";
export const maxDuration = 120;

const MAX_BYTES = 2 * 1024 * 1024;

function jsonError(error: "bad_image" | "too_big" | "failed" | "unavailable", status: number) {
  return Response.json({ error }, { status });
}

async function askModel(jpeg: Uint8Array, locale: string): Promise<string> {
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
            { type: "text", text: buildCheckPrompt(locale) },
            { type: "image_url", image_url: { url: dataUrl } },
          ],
        },
      ],
    }),
  });
  if (!res.ok) throw new Error(`model ${res.status}`);
  return readModelContent(await res.json());
}

export async function POST(req: Request) {
  const localeParam = new URL(req.url).searchParams.get("locale");
  const locale: Locale = routing.locales.includes(localeParam as Locale) ? (localeParam as Locale) : "en";

  const declared = Number(req.headers.get("content-length") || 0);
  if (declared > MAX_BYTES) return jsonError("too_big", 413);
  const bytes = new Uint8Array(await req.arrayBuffer());
  if (bytes.byteLength > MAX_BYTES) return jsonError("too_big", 413);
  if (bytes.byteLength < 3 || bytes[0] !== 0xff || bytes[1] !== 0xd8) return jsonError("bad_image", 400);
  if (!process.env.TEXT_API_KEY?.trim()) return jsonError("unavailable", 503);

  try {
    let text = await askModel(bytes, locale);
    try {
      return Response.json(parseCheckResponse(text));
    } catch {
      text = await askModel(bytes, locale);
      return Response.json(parseCheckResponse(text));
    }
  } catch (err) {
    console.error("handwriting-check", err instanceof Error ? err.message : "failed");
    return jsonError("failed", 502);
  }
}
