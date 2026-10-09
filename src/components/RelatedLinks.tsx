import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { RELATED, relatedPostAvailable, TOOL_LABEL_KEY } from "@/content/related";
import { isEnOnlyTool } from "@/lib/tools";
import { getPostMeta } from "@/content/posts";

/**
 * 文章尾部内链区块:相关工具 + 相关文章。
 * 映射在 src/content/related.ts,所有语言版本共用(解决翻译版零内链问题)。
 */
export default async function RelatedLinks({ slug, locale }: { slug: string; locale: Locale }) {
  const cfg = RELATED[slug];
  if (!cfg) return null;

  const t = await getTranslations({ locale, namespace: "post" });
  const tnav = await getTranslations({ locale, namespace: "nav" });

  const tools = cfg.tools
    .filter((href) => TOOL_LABEL_KEY[href])
    // en-only 工具只在默认语言的页面出现,其他语言链过去是 404
    .filter((href) => locale === routing.defaultLocale || !isEnOnlyTool(href))
    .map((href) => ({ href, label: tnav(TOOL_LABEL_KEY[href]) }));

  const posts = cfg.posts
    .filter((s) => s !== slug && relatedPostAvailable(s, locale))
    .map((s) => ({ href: `/blog/${s}`, title: getPostMeta(s, locale)?.title }));

  if (!tools.length && !posts.length) return null;

  return (
    <div className="mt-10 space-y-6 border-t border-zinc-200 pt-6 text-[15px]">
      {tools.length > 0 && (
        <section>
          <h2 className="mb-2 text-base font-semibold">{t("tryTools")}</h2>
          <ul className="ml-5 list-disc space-y-1">
            {tools.map((tl) => (
              <li key={tl.href}>
                <Link
                  href={tl.href}
                  className="text-accent underline underline-offset-2 transition-colors hover:text-accent-strong"
                >
                  {tl.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
      {posts.length > 0 && (
        <section>
          <h2 className="mb-2 text-base font-semibold">{t("related")}</h2>
          <ul className="ml-5 list-disc space-y-1">
            {posts.map((p) => (
              <li key={p.href}>
                <Link
                  href={p.href}
                  className="text-accent underline underline-offset-2 transition-colors hover:text-accent-strong"
                >
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
