import type { FaqEntry } from "@/content/faqs";

/** 工具页 FAQ 段落:details 折叠 + FAQPage JSON-LD;当前语言无条目时不渲染 */
export default function ToolFaq({ title, items }: { title: string; items: FaqEntry[] }) {
  if (items.length === 0) return null;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };

  return (
    <section className="rise mt-12 max-w-3xl" style={{ animationDelay: "200ms" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h2 className="mb-4 text-lg font-semibold text-zinc-900">{title}</h2>
      <div className="flex flex-col gap-3">
        {items.map((it, i) => (
          <details
            key={i}
            className="group rounded-2xl border border-zinc-200 bg-white p-5 [&_summary::-webkit-details-marker]:hidden"
            open={i === 0}
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[15px] font-semibold text-zinc-900">
              {it.q}
              <span
                aria-hidden
                className="text-xl leading-none text-accent transition-transform duration-200 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">{it.a}</p>
          </details>
        ))}
      </div>
      <p className="mt-6 text-xs text-zinc-400">
        Voice to Handwriting · voicetohandwriting.online
      </p>
    </section>
  );
}
