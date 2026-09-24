import { PrivacyView } from "../../views";
import { langMetadata, langParams, readLang } from "@/lib/lang";

export const dynamicParams = false;
export function generateStaticParams() {
  return langParams();
}
export function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return langMetadata(params, "privacy");
}
export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { id, copy } = await readLang(params);
  return <PrivacyView locale={id} copy={copy} />;
}
