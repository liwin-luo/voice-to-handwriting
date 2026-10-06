import { makeStaticPage } from "@/lib/staticPage";

const { Page, generateMetadata } = makeStaticPage("terms");

export { generateMetadata };
export default Page;
