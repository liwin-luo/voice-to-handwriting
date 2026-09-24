import type { Metadata } from "next";
import { Frame } from "../frame";

export const metadata: Metadata = { title: "Privacy — Voice to Handwriting" };

export default function PrivacyPage() {
  return (
    <Frame>
      <p className="kicker">Privacy</p>
      <h1>Privacy policy</h1>
      <div className="prose">
        <p>Effective date: September 24, 2026. This policy covers voicetohandwriting.online.</p>
        <h2>What stays in your browser</h2>
        <p>The transcript is saved in this browser tab so you can move from the text page to the handwriting page. Handwriting images are drawn on your device. Clearing the tab removes the transcript.</p>
        <h2>Recordings</h2>
        <p>If you record or upload audio, the file is sent to our server to be transcribed. When transcription is enabled, that audio is forwarded to OpenRouter and is not stored by us after the text is returned. On Chrome, the browser’s own speech recognition may also send audio to the browser maker. We do not sell recordings.</p>
        <h2>What we do not collect</h2>
        <p>There is no account. We do not ask for your name or email to use the tool. If you email us, we use that message only to reply.</p>
        <h2>Children</h2>
        <p>The site is not for children under 13, and we do not knowingly collect their information.</p>
        <h2>Contact</h2>
        <p>Questions about this policy: hello@voicetohandwriting.online.</p>
      </div>
    </Frame>
  );
}
