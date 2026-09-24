import { draftLetter, type Occasion } from "@/lib/draft";

export async function POST(request: Request) {
  let body: { transcript?: string; occasion?: Occasion };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Send a transcript." }, { status: 400 });
  }

  try {
    const result = await draftLetter({
      transcript: body.transcript ?? "",
      occasion: body.occasion,
    });
    return Response.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not draft the letter.";
    const status = message.startsWith("Say what") ? 400 : 502;
    return Response.json({ error: message }, { status });
  }
}
