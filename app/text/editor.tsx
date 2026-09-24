"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Frame } from "../frame";
import type { Copy, LocaleId } from "@/lib/copy";
import { localizedPath } from "@/lib/locales.mjs";
import { loadText, saveText } from "@/lib/session";

export function TextEditor({ locale, copy }: { locale: LocaleId; copy: Copy }) {
  const router = useRouter();
  const textCopy = copy.text;
  const [text, setText] = useState("");

  useEffect(() => {
    setText(loadText());
  }, []);

  return (
    <Frame locale={locale} copy={copy} step={2}>
      <p className="kicker">{textCopy.kicker}</p>
      <h1>{textCopy.h1}</h1>
      <p className="lede">{textCopy.lede}</p>
      <div className="panel">
        <textarea className="transcript tall" value={text} placeholder={textCopy.placeholder} onChange={(event) => setText(event.target.value)} />
        <div className="actions">
          <button className="back" type="button" onClick={() => router.push(localizedPath(locale, "/"))}>
            {textCopy.back}
          </button>
          <button
            className="primary"
            type="button"
            onClick={() => {
              saveText(text);
              router.push(localizedPath(locale, "/handwriting"));
            }}
          >
            {textCopy.next}
          </button>
        </div>
      </div>
    </Frame>
  );
}
