import { buildCheckPrompt, dayKey, glmModelId, parseCheckResponse, rateLimitDecision, readModelContent, readsLeft } from "@/lib/handwritingCheck";
import { routing, type Locale } from "@/i18n/routing";

export const runtime = "nodejs";
export const maxDuration = 120;

const MAX_BYTES = 2 * 1024 * 1024;

function jsonError(error: "bad_image" | "too_big" | "quota" | "failed" | "unavailable", status: number) {
  return Response.json({ error }, { status });
}

const memoryCounts = new Map<string, number>();

function storeEnv(): { url: string; token: string } | null {
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim().replace(/\/$/, "");
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  if (!url || !token) return null;
  return { url, token };
}

function clientIp(req: Request): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0] ?? req.headers.get("x-real-ip") ?? "local";
}

/** 本地没有 Upstash 时用进程内存。重启清零,只给 next dev 用。 */
function memoryCount(ip: string, bump: boolean): number {
  const key = dayKey(ip);
  const current = memoryCounts.get(key) ?? 0;
  if (!bump) return current;
  memoryCounts.set(key, current + 1);
  return current + 1;
}

async function redisCount(ip: string, bump: boolean): Promise<number | null> {
  const store = storeEnv();
  if (!store) return null;
  const key = dayKey(ip);
  const res = await fetch(bump ? `${store.url}/pipeline` : `${store.url}/get/${encodeURIComponent(key)}`, {
    method: bump ? "POST" : "GET",
    headers: { Authorization: `Bearer ${store.token}`, ...(bump ? { "Content-Type": "application/json" } : {}) },
    signal: AbortSignal.timeout(5_000),
    body: bump ? JSON.stringify([["INCR", key], ["EXPIRE", key, "172800"]]) : undefined,
  });
  if (!res.ok) return null;
  const data = (await res.json()) as { result?: unknown } | Array<{ result?: unknown }>;
  const result = Array.isArray(data) ? data[0]?.result : data.result;
  if (result === null || result === undefined) return bump ? null : 0;
  const count = Number(result);
  return Number.isFinite(count) ? count : null;
}

async function usageCount(ip: string, bump: boolean): Promise<number | null> {
  if (storeEnv()) return redisCount(ip, bump);
  if (process.env.NODE_ENV !== "production") return memoryCount(ip, bump);
  return null;
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

  const hasStore = !!storeEnv();
  const count = await usageCount(clientIp(req), true);
  const gate = rateLimitDecision({ dev: process.env.NODE_ENV !== "production", hasStore, count });
  if (gate === "quota") return Response.json({ error: "quota", remaining: 0 }, { status: 429 });
  if (gate === "closed") return jsonError("unavailable", 503);

  try {
    let text = await askModel(bytes, locale);
    try {
      return Response.json({ ...parseCheckResponse(text), remaining: readsLeft(count ?? 0) });
    } catch {
      text = await askModel(bytes, locale);
      return Response.json({ ...parseCheckResponse(text), remaining: readsLeft(count ?? 0) });
    }
  } catch (err) {
    console.error("handwriting-check", err instanceof Error ? err.message : "failed");
    return jsonError("failed", 502);
  }
}

export async function GET(req: Request) {
  const count = await usageCount(clientIp(req), false);
  if (count === null) {
    if (process.env.NODE_ENV !== "production") return Response.json({ remaining: null });
    return jsonError("unavailable", 503);
  }
  return Response.json({ remaining: readsLeft(count) });
}
