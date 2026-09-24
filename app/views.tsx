import Link from "next/link";
import { Frame } from "./frame";
import { COPY, type LocaleId } from "@/lib/copy";
import { localizedPath } from "@/lib/locales.mjs";

type Props = { locale: LocaleId; copy: (typeof COPY)[LocaleId] };

export function FaqView({ locale, copy }: Props) {
  return (
    <Frame locale={locale} copy={copy}>
      <p className="kicker">{copy.faq.kicker}</p>
      <h1>{copy.faq.h1}</h1>
      <div className="prose">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: copy.faq.items.map(([title, body]) => ({
                "@type": "Question",
                name: title,
                acceptedAnswer: { "@type": "Answer", text: body },
              })),
            }),
          }}
        />
        {copy.faq.items.map(([title, body]) => (
          <section key={title}>
            <h2>{title}</h2>
            <p>{body}</p>
          </section>
        ))}
      </div>
    </Frame>
  );
}

export function PrivacyView({ locale, copy }: Props) {
  return (
    <Frame locale={locale} copy={copy}>
      <p className="kicker">{copy.privacy.kicker}</p>
      <h1>{copy.privacy.h1}</h1>
      <div className="prose">
        {copy.privacy.notice ? <p>{copy.privacy.notice}</p> : null}
        {copy.privacy.blocks.map(([title, body]) => (
          <section key={title || body.slice(0, 24)}>
            {title ? <h2>{title}</h2> : null}
            <p>{body}</p>
          </section>
        ))}
      </div>
    </Frame>
  );
}

export function ContactView({ locale, copy }: Props) {
  return (
    <Frame locale={locale} copy={copy}>
      <p className="kicker">{copy.contact.kicker}</p>
      <h1>{copy.contact.h1}</h1>
      <div className="prose">
        <p>{copy.contact.body}</p>
        <p>
          {copy.contact.beforeFaq}
          <Link href={localizedPath(locale, "/faq")}>{copy.contact.faq}</Link>
          {copy.contact.afterFaq}
        </p>
      </div>
    </Frame>
  );
}
