import { headers } from "next/headers";
import type { Metadata } from "next";
import { localeFromPath } from "@/lib/locales.mjs";
import "./globals.css";

const site = "https://voicetohandwriting.online";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: {
    default: "Voice to Handwriting — Turn Speech into Printable Handwriting",
    template: "%s — Voice to Handwriting",
  },
  description: "Record or upload speech, edit the transcript, and download it as handwriting in PNG or PDF.",
  openGraph: {
    type: "website",
    siteName: "Voice to Handwriting",
  },
  robots: { index: true, follow: true },
};

export const dynamic = "force-dynamic";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = (await headers()).get("x-pathname") || "/";
  const locale = localeFromPath(pathname);
  return (
    <html lang={locale.hreflang} dir={locale.dir}>
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
