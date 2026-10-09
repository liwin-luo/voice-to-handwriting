import { Link } from "@/i18n/navigation";

export interface ToolLaneItem {
  href: string;
  name: string;
  description: string;
}

/** /tools 的一组：一张带纸样的主卡，其余是名单。 */
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
        <ul className="mt-1 divide-y divide-zinc-200 border-t border-zinc-200">
          {rest.map((tool) => (
            <li key={tool.href}>
              <Link
                href={tool.href}
                className="block py-2.5 text-sm text-zinc-800 transition-colors hover:text-accent"
              >
                {tool.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
