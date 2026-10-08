import { getLocale } from "next-intl/server";
import { AUTHORS } from "@/content/authors";
import type { Locale } from "@/i18n/routing";

/** /about 的「写作桌位」区块:五个笔名桌位,role/bio 来自 authors.ts(已本地化,en 兜底) */
export default async function AuthorDesks() {
  const locale = (await getLocale()) as Locale;
  return (
    <ul className="not-prose mt-4 flex flex-col gap-3">
      {Object.values(AUTHORS).map((author) => {
        const t = author.i18n[locale] ?? author.i18n.en;
        return (
          <li key={author.id} className="rounded-xl border border-zinc-200 bg-white p-4">
            <p className="text-sm">
              <span className="font-semibold text-zinc-900">{author.name}</span>
              <span className="text-zinc-500"> · {t?.role}</span>
            </p>
            <p className="mt-1 text-sm leading-relaxed text-zinc-500">{t?.bio}</p>
          </li>
        );
      })}
    </ul>
  );
}
