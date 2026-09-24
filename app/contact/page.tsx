import { COPY } from "@/lib/copy";
import { pageMetadata } from "@/lib/seo";
import { ContactView } from "../views";

export const metadata = pageMetadata("en", "contact");

export default function ContactPage() {
  return <ContactView locale="en" copy={COPY.en} />;
}
