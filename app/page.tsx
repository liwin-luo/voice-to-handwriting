import { COPY } from "@/lib/copy";
import { pageMetadata } from "@/lib/seo";
import { VoiceForm } from "./voice-form";

export const metadata = pageMetadata("en", "home");

export default function Page() {
  return <VoiceForm locale="en" copy={COPY.en} />;
}
