import { COPY } from "@/lib/copy";
import { pageMetadata } from "@/lib/seo";
import { FaqView } from "../views";

export const metadata = pageMetadata("en", "faq");

export default function FaqPage() {
  return <FaqView locale="en" copy={COPY.en} />;
}
