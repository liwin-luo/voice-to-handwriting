import { describe, expect, it } from "vitest";
import { SITE } from "./site";
import { pageMetadata } from "./seo";

describe("pageMetadata", () => {
  it("把 canonical 写进 og:url,默认类型是 website", () => {
    const meta = pageMetadata("/blog", "en", { title: "Guides", description: "Tips" });
    expect(meta.alternates).toMatchObject({ canonical: `${SITE.url}/blog` });
    expect(meta.openGraph).toMatchObject({
      type: "website",
      url: `${SITE.url}/blog`,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    });
  });

  it("文章页输出 article 和发布、修改时间", () => {
    const meta = pageMetadata(
      "/blog/x",
      "en",
      { title: "T", description: "D" },
      {
        article: { publishedTime: "2026-10-08", modifiedTime: "2026-10-09" },
      },
    );
    expect(meta.openGraph).toMatchObject({
      type: "article",
      url: `${SITE.url}/blog/x`,
      publishedTime: "2026-10-08",
      modifiedTime: "2026-10-09",
    });
    expect(meta.alternates).toMatchObject({
      languages: { en: `${SITE.url}/blog/x` },
    });
    expect(meta.openGraph).not.toHaveProperty("images");
  });
});
