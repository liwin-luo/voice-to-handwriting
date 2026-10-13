import { buildCountPrompt, parseCountResponse } from "@/lib/handwritingCount";
import { askGlmVision } from "@/lib/glmVision";
import { routing, type Locale } from "@/i18n/routing";

export const runtime = "nodejs";
export const maxDuration = 120;

const MAX_BYTES = 2 * 1024 * 1024;

function jsonError(error: "bad_image" | "too_big" | "failed" | "unavailable", status: number) {
  return Response.json({ error }, { status });
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
    let text = await askGlmVision(buildCountPrompt(locale), bytes);
    try {
      return Response.json(parseCountResponse(text));
    } catch {
      text = await askGlmVision(buildCountPrompt(locale), bytes);
      return Response.json(parseCountResponse(text));
    }
  } catch (err) {
    console.error("handwriting-count", err instanceof Error ? err.message : "failed");
    return jsonError("failed", 502);
  }
}
