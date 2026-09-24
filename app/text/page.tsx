import type { Metadata } from "next";
import { TextEditor } from "./editor";

export const metadata: Metadata = {
  title: "Edit Transcript",
  description: "Review and edit the words from your recording before they are written by hand.",
  alternates: { canonical: "/text" },
};

export default function Page() {
  return <TextEditor />;
}
