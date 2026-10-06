import { makeStaticPage } from "@/lib/staticPage";

const { Page, generateMetadata } = makeStaticPage("about");

export { generateMetadata };
export default Page;
