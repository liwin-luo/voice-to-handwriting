import { Studio } from "../../handwriting/studio";
import { langMetadata, langParams, readLang } from "@/lib/lang";

export const dynamicParams = false;
export function generateStaticParams() {
  return langParams();
}
export function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return langMetadata(params, "handwriting");
}
export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { id, copy } = await readLang(params);
  return <Studio locale={id} copy={copy} />;
}
