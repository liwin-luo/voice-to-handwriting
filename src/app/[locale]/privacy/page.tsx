import { makeStaticPage } from "@/lib/staticPage";

const { Page, generateMetadata } = makeStaticPage("privacy");

export { generateMetadata };
export default Page;
