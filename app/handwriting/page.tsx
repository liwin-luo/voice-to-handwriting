import type { Metadata } from "next";
import { Studio } from "./studio";

export const metadata: Metadata = {
  title: "Handwriting Preview",
  description: "Choose paper, handwriting style, size, and ink, then download a PNG of one page or a PDF of every page.",
  alternates: { canonical: "/handwriting" },
};

export default function Page() {
  return <Studio />;
}
