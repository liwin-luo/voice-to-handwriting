import type { Metadata } from "next";
import { VoiceForm } from "./voice-form";

export const metadata: Metadata = {
  title: { absolute: "Voice to Handwriting — Turn Speech into Printable Handwriting" },
  description: "Turn speech into handwriting. Record or upload audio, fix the transcript, then download a PNG or a multi-page PDF.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Voice to Handwriting",
    description: "Record or upload speech, edit the words, and download handwriting as PNG or PDF.",
    url: "/",
  },
};

export default function Page() {
  return <VoiceForm />;
}
