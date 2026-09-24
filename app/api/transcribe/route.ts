import { transcribeAudio } from "@/lib/transcribe";

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ error: "Send an audio recording." }, { status: 400 });
  }

  const file = form.get("audio");
  if (!(file instanceof File) || file.size === 0) {
    return Response.json({ error: "The recording was empty." }, { status: 400 });
  }

  try {
    const bytes = Buffer.from(await file.arrayBuffer());
    const result = await transcribeAudio(bytes, file.type || "audio/mp4");
    return Response.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not transcribe the recording.";
    return Response.json({ error: message }, { status: 502 });
  }
}
