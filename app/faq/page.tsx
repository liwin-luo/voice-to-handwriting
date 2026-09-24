import type { Metadata } from "next";
import { Frame } from "../frame";

export const metadata: Metadata = {
  title: "FAQ",
  description: "How voice to handwriting works: recording, uploads, phones, paper styles, and PNG or PDF downloads.",
  alternates: { canonical: "/faq" },
};

const ITEMS = [
  ["What does this site do?", "You record or upload speech, check the transcript, then turn those exact words into handwriting you can download."],
  ["Do I need an account?", "No. Record, edit, and download without signing up."],
  ["Can I use it on a phone?", "Yes. Android Chrome can transcribe in the browser. iPhone sends the recording to a transcription service. If that service is not configured, type the words on the text page."],
  ["Which audio files can I upload?", "m4a, mp3, wav, and webm."],
  ["Is the handwriting the same as what I said?", "Yes. The handwriting page uses the text you saved. It does not rewrite it into a different letter."],
  ["What templates and styles are there?", "Paper templates are Letter, Note, Card, and Grid. Handwriting styles are Casual, Cursive, and Messy. You can also set Small, Medium, or Large, and Blue, Black, or Pencil ink."],
  ["What is the difference between PNG and PDF?", "PNG downloads the page you are looking at. PDF downloads every page."],
  ["Can I print it?", "Yes. Download the PDF and print it, or print the PNG."],
  ["What language is the transcript?", "English."],
  ["Do you keep my recording?", "The transcript stays in this browser tab. A recording is sent for transcription only when that service is turned on, and we do not keep the file after the words come back. Details are on the privacy page."],
];

export default function FaqPage() {
  return (
    <Frame>
      <p className="kicker">FAQ</p>
      <h1>Questions</h1>
      <div className="prose">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: ITEMS.map(([title, body]) => ({
                "@type": "Question",
                name: title,
                acceptedAnswer: { "@type": "Answer", text: body },
              })),
            }),
          }}
        />
        {ITEMS.map(([title, body]) => (
          <section key={title}>
            <h2>{title}</h2>
            <p>{body}</p>
          </section>
        ))}
      </div>
    </Frame>
  );
}
