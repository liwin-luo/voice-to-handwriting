"use client";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { CORE_LOCALES, LOCALE_LABELS, routing, type Locale } from "@/i18n/routing";

/** es/pt 没有正文的桌位/文章/FAQ 区:切语言时落回该语言首页,避免 404 */
const GATED = /^\/(blog|authors|faq)(\/|$)/;

/** 目标 URL 可用性探测缓存:同一 URL 一个会话只探一次(2026-11-18,en-only 页切语言 404 修复) */
const probed = new Map<string, boolean>();

/** 目标语言的路径:en 无前缀(routing localePrefix=as-needed) */
function targetHref(pathname: string, target: Locale): string {
  return target === routing.defaultLocale ? pathname : `/${target}${pathname}`;
}

/** 探测目标页是否存在:2xx 且未被 308 带走(被带走 = 该语言没有这页,同样落回首页) */
async function targetAvailable(pathname: string, target: Locale): Promise<boolean> {
  const href = targetHref(pathname, target);
  const cached = probed.get(href);
  if (cached !== undefined) return cached;
  let ok = false;
  try {
    const res = await fetch(href, { method: "HEAD" });
    ok = res.ok && !res.redirected;
  } catch {
    ok = false;
  }
  probed.set(href, ok);
  return ok;
}

/** 语言切换:下拉选择,替换当前路径到目标语言(2026-11-09 恢复双语时按历史版本找回)。
 *  目标语言没有对应页面时(20+ 篇 en-only 文章、/cursive-alphabet 等)落回该语言首页,不把用户送进 404。 */
export default function LocaleSwitch() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <select
      aria-label="Language"
      value={locale}
      onChange={async (e) => {
        const target = e.target.value as Locale;
        // en 是所有内容的兜底语言:路径必然存在,直接换
        if (target === routing.defaultLocale) {
          router.replace(pathname, { locale: target });
          return;
        }
        const gated = GATED.test(pathname) && !CORE_LOCALES.includes(target);
        const exists = !gated && (await targetAvailable(pathname, target));
        router.replace(exists ? pathname : "/", { locale: target });
      }}
      className="select-field w-auto cursor-pointer py-1.5 pl-3 pr-8 text-xs"
    >
      {routing.locales.map((l) => (
        <option key={l} value={l}>
          {LOCALE_LABELS[l]}
        </option>
      ))}
    </select>
  );
}
