import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Voice to Handwriting — Upload, transcribe, write by hand",
  description: "Record or upload speech, read the transcript, then turn those exact words into handwriting you can print.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;600&family=Cedarville+Cursive&family=Homemade+Apple&family=Sora:wght@420;560;640&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
