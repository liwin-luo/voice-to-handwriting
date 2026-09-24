"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Frame } from "../frame";
import { loadText, saveText } from "@/lib/session";

export function TextEditor() {
  const router = useRouter();
  const [text, setText] = useState("");

  useEffect(() => {
    setText(loadText());
  }, []);

  return (
    <Frame step={2}>
      <p className="kicker">Step 2 of 3</p>
      <h1>Check the words.</h1>
      <p className="lede">This is the transcript. Fix anything the recording got wrong. The handwriting page uses this text, page by page.</p>
      <div className="panel">
        <textarea className="transcript tall" value={text} placeholder="The transcript shows up here." onChange={(event) => setText(event.target.value)} />
        <div className="actions">
          <button className="back" type="button" onClick={() => router.push("/")}>Back to voice</button>
          <button
            className="primary"
            type="button"
            onClick={() => {
              saveText(text);
              router.push("/handwriting");
            }}
          >
            Make handwriting
          </button>
        </div>
      </div>
    </Frame>
  );
}
