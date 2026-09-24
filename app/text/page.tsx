import { COPY } from "@/lib/copy";
import { pageMetadata } from "@/lib/seo";
import { TextEditor } from "./editor";

export const metadata = pageMetadata("en", "text");

export default function Page() {
  return <TextEditor locale="en" copy={COPY.en} />;
}
