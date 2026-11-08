import { Link } from "@/i18n/navigation";

export interface ToolLaneItem {
  href: string;
  name: string;
  description: string;
  /** 卡顶纸样缩略:该工具默认输出的字体与纸底(CSS 渲染,零图片) */
  fontCss: string;
  paperBackground: string;
}

/** /tools 的一组:每张卡顶部带该工具真实输出的纸样缩略(createprintables 的预览卡模式,
    样张用 paper.ts 的 CSS 背景实时渲染,无图片资源)。 */
export default function ToolLane({
  title,
  sample,
  tools,
  delayMs = 0,
}: {
  title: string;
  sample: string;
  tools: ToolLaneItem[];
  delayMs?: number;
}) {
  return (
    <section className="rise mt-8" style={{ animationDelay: `${delayMs}ms` }}>
      <h2 className="section-title mb-3">{title}</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="card group flex flex-col overflow-hidden transition-colors duration-150 hover:border-accent focus-visible:outline-2 focus-visible:outline-accent"
          >
            <span
              aria-hidden
              className="block h-24 border-b border-zinc-100"
              style={{ background: tool.paperBackground }}
            >
              <span
                className="block px-4 pt-6 text-xl leading-none text-zinc-800"
                style={{ fontFamily: tool.fontCss }}
              >
                {sample}
              </span>
            </span>
            <span className="flex flex-1 flex-col gap-1 p-4">
              <span className="font-semibold text-zinc-950 transition-colors duration-150 group-hover:text-accent">
                {tool.name}
              </span>
              <span className="text-[13px] leading-relaxed text-zinc-500">{tool.description}</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
