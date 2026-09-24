import { guessOccasion as guessOccasionJs, guessWho as guessWhoJs, sampleLetter as sampleLetterJs } from "./sample.mjs";

export type Occasion = "thanks" | "birthday";

export type Letter = {
  greeting: string;
  paragraphs: string[];
  closing: string;
  signature: string;
};

export type DraftInput = {
  transcript: string;
  occasion?: Occasion;
};

export function guessOccasion(transcript: string): Occasion {
  return guessOccasionJs(transcript);
}

export function guessWho(transcript: string): string {
  return guessWhoJs(transcript);
}

export function sampleLetter(input: DraftInput): Letter {
  return sampleLetterJs(input);
}

function extractJson(content: string): Letter {
  const start = content.indexOf("{");
  const end = content.lastIndexOf("}");
  if (start < 0 || end <= start) throw new Error("Model did not return a letter.");
  const parsed = JSON.parse(content.slice(start, end + 1)) as Partial<Letter>;
  if (!parsed.greeting || !Array.isArray(parsed.paragraphs) || parsed.paragraphs.length === 0) {
    throw new Error("Model returned an incomplete letter.");
  }
  return {
    greeting: String(parsed.greeting),
    paragraphs: parsed.paragraphs.map(String),
    closing: String(parsed.closing || "Sincerely,"),
    signature: String(parsed.signature || "Alex"),
  };
}

export async function draftLetter(input: DraftInput): Promise<{ letter: Letter; source: "openrouter" | "placeholder" }> {
  const transcript = input.transcript.trim();
  if (!transcript) throw new Error("Say what the letter is about first.");

  const { openRouterKey } = await import("./transcribe");
  const key = openRouterKey();
  if (!key) return { letter: sampleLetter({ ...input, transcript }), source: "placeholder" };

  const occasion = input.occasion ?? guessOccasion(transcript);
  const model = process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini";
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://voicetohandwriting.online",
      "X-Title": "Voice to Handwriting",
    },
    body: JSON.stringify({
      model,
      temperature: 0.7,
      messages: [
        {
          role: "system",
          content:
            "Turn spoken notes into a letter the user can hand-copy. Reply with JSON only: {\"greeting\":\"Dear ...\",\"paragraphs\":[\"...\"],\"closing\":\"Thank you,\",\"signature\":\"First name\"}. English. 120 to 220 words across the paragraphs. Use the concrete details they said. Drop filler. Do not write \"I hope this letter finds you well\".",
        },
        {
          role: "user",
          content: `Occasion: ${occasion}\nSpoken request:\n${transcript}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`OpenRouter ${response.status}: ${detail.slice(0, 180)}`);
  }

  const payload = (await response.json()) as { choices?: { message?: { content?: string } }[] };
  const content = payload.choices?.[0]?.message?.content;
  if (!content) throw new Error("OpenRouter returned an empty letter.");
  return { letter: extractJson(content), source: "openrouter" };
}
