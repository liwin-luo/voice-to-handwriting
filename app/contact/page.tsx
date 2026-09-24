import type { Metadata } from "next";
import Link from "next/link";
import { Frame } from "../frame";

export const metadata: Metadata = { title: "Contact — Voice to Handwriting" };

export default function ContactPage() {
  return (
    <Frame>
      <p className="kicker">Contact</p>
      <h1>Write to us</h1>
      <div className="prose">
        <p>Email hello@voicetohandwriting.online. We read messages about transcription, downloads, and the handwriting styles.</p>
        <p>Include the browser you used and the step you were on. For common questions, see the <Link href="/faq">FAQ</Link>.</p>
      </div>
    </Frame>
  );
}
