import { Link } from "@/i18n/navigation";

export interface ToolLaneItem {
  href: string;
  name: string;
  description: string;
}

/** /tools 的一组：一张带纸样的主卡，其余是名单。宽屏名单在名字右侧放一句说明；悬停只铺淡底。 */
export default function ToolLane({
  title,
  sample,
  fontCss,
  paperBackground,
  featuredHref,
  tools,
  delayMs = 0,
}: {
  title: string;
  sample: string;
  fontCss: string;
  paperBackground: string;
  featuredHref: string;
  tools: ToolLaneItem[];
  delayMs?: number;
}) {
  const featured = tools.find((tool) => tool.href === featuredHref) ?? tools[0];
  const rest = tools.filter((tool) => tool.href !== featured.href);

  return (
    <section className="rise mt-8" style={{ animationDelay: `${delayMs}ms` }}>
      <h2 className="mb-3 text-base font-semibold text-zinc-900">{title}</h2>
      <Link
        href={featured.href}
        className="group grid grid-cols-1 items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-4 transition-all duration-300 hover:border-accent sm:grid-cols-[148px_minmax(0,1fr)] sm:p-5"
      >
        <span
          aria-hidden
          className="block h-28 overflow-hidden rounded-xl border border-zinc-200"
          style={{ background: paperBackground }}
        >
          <span
            className="block px-3 pt-7 text-2xl leading-none text-zinc-800"
            style={{ fontFamily: fontCss }}
          >
            {sample}
          </span>
        </span>
        <span>
          <span className="text-lg font-semibold text-zinc-950 group-hover:text-accent">
            {featured.name}
          </span>
          <span className="mt-1 block text-sm leading-relaxed text-zinc-600">{featured.description}</span>
        </span>
      </Link>
      {rest.length > 0 && (
        <ul className="mt-1 border-t border-zinc-200 sm:grid sm:grid-cols-[max-content_minmax(0,1fr)] sm:gap-x-8">
          {rest.map((tool) => (
            <li key={tool.href} className="sm:col-span-2 sm:grid sm:grid-cols-subgrid">
              <Link
                href={tool.href}
                className="group block rounded-lg px-2 py-4 text-sm transition-colors hover:bg-accent/5 focus-visible:bg-accent/5 focus-visible:outline-2 focus-visible:outline-accent sm:col-span-2 sm:grid sm:grid-cols-subgrid sm:items-center"
              >
                <span className="font-semibold whitespace-nowrap text-zinc-900 group-hover:text-accent group-focus-visible:text-accent">
                  {tool.name}
                </span>
                <span className="hidden min-w-0 truncate text-zinc-500 sm:block">{tool.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
