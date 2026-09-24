import { COPY } from "@/lib/copy";
import { pageMetadata } from "@/lib/seo";
import { PrivacyView } from "../views";

export const metadata = pageMetadata("en", "privacy");

export default function PrivacyPage() {
  return <PrivacyView locale="en" copy={COPY.en} />;
}
