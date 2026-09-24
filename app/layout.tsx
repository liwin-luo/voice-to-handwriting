import type { Metadata } from "next";
import "./globals.css";

const site = "https://voicetohandwriting.online";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: {
    default: "Voice to Handwriting — Turn Speech into Printable Handwriting",
    template: "%s — Voice to Handwriting",
  },
  description: "Record or upload speech, edit the transcript, and download it as handwriting in PNG or PDF.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site,
    siteName: "Voice to Handwriting",
    title: "Voice to Handwriting — Turn Speech into Printable Handwriting",
    description: "Record or upload speech, edit the transcript, and download it as handwriting in PNG or PDF.",
  },
  robots: { index: true, follow: true },
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
