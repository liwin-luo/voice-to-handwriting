import { audioFormat } from "./audio-format.mjs";

export function openRouterKey(): string | undefined {
  const key = process.env.OPENROUTER_API_KEY?.trim();
  return key?.startsWith("sk-or-") ? key : undefined;
}

export async function transcribeAudio(bytes: Buffer, mime: string): Promise<{ text: string; source: "openrouter" | "placeholder" }> {
  const key = openRouterKey();
  if (!key) return { text: "", source: "placeholder" };

  const model = process.env.OPENROUTER_STT_MODEL || "openai/whisper-1";
  const response = await fetch("https://openrouter.ai/api/v1/audio/transcriptions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://voicetohandwriting.online",
      "X-Title": "Voice to Handwriting",
    },
    body: JSON.stringify({
      model,
      language: "en",
      input_audio: {
        data: bytes.toString("base64"),
        format: audioFormat(mime),
      },
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`OpenRouter ${response.status}: ${detail.slice(0, 180)}`);
  }

  const payload = (await response.json()) as { text?: string };
  const text = payload.text?.trim() ?? "";
  if (!text) throw new Error("No words came back from the recording.");
  return { text, source: "openrouter" };
}
