import { TextEditor } from "../../text/editor";
import { langMetadata, langParams, readLang } from "@/lib/lang";

export const dynamicParams = false;
export function generateStaticParams() {
  return langParams();
}
export function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return langMetadata(params, "text");
}
export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { id, copy } = await readLang(params);
  return <TextEditor locale={id} copy={copy} />;
}
