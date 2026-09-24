import { COPY } from "@/lib/copy";
import { pageMetadata } from "@/lib/seo";
import { Studio } from "./studio";

export const metadata = pageMetadata("en", "handwriting");

export default function Page() {
  return <Studio locale="en" copy={COPY.en} />;
}
