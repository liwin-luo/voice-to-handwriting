"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Frame } from "./frame";
import type { Copy, LocaleId } from "@/lib/copy";
import { localizedPath } from "@/lib/locales.mjs";
import { saveText } from "@/lib/session";

type SpeechResult = { results: ArrayLike<ArrayLike<{ transcript: string }>> };
type SpeechRec = {
  lang: string;
  interimResults: boolean;
  onresult: ((event: SpeechResult) => void) | null;
  onerror: (() => void) | null;
  start: () => void;
  stop: () => void;
};

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRec;
    webkitSpeechRecognition?: new () => SpeechRec;
  }
}

export function VoiceForm({ locale, copy }: { locale: LocaleId; copy: Copy }) {
  const router = useRouter();
  const home = copy.home;
  const [listening, setListening] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const mediaRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const browserTextRef = useRef("");
  const speechRef = useRef<SpeechRec | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function go(text: string) {
    saveText(text);
    router.push(localizedPath(locale, "/text"));
  }

  async function transcribe(file: File) {
    setBusy(true);
    setError("");
    setFileName(file.name || "Recording");
    try {
      const body = new FormData();
      body.append("audio", file);
      const response = await fetch("/api/transcribe", { method: "POST", body });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || home.transcribeError);
      const spoken = payload.source === "openrouter" ? String(payload.text || "") : browserTextRef.current;
      go(spoken);
    } catch (err) {
      setError(err instanceof Error ? err.message : home.transcribeError);
    } finally {
      setBusy(false);
      browserTextRef.current = "";
    }
  }

  async function record() {
    if (mediaRef.current) return;
    setError("");
    browserTextRef.current = "";
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mime = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4"].find((type) => MediaRecorder.isTypeSupported(type)) || "";
      const recorder = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);
      chunksRef.current = [];
      recorder.ondataavailable = (event) => {
        if (event.data.size) chunksRef.current.push(event.data);
      };
      recorder.onstop = () => {
        stream.getTracks().forEach((track) => track.stop());
        speechRef.current?.stop();
        mediaRef.current = null;
        setListening(false);
        const type = recorder.mimeType || mime || "audio/mp4";
        const blob = new Blob(chunksRef.current, { type });
        void transcribe(new File([blob], type.includes("webm") ? "recording.webm" : "recording.m4a", { type }));
      };
      const Ctor = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (Ctor) {
        const speech = new Ctor();
        speech.lang = "en-US";
        speech.interimResults = false;
        speech.onresult = (event) => {
          browserTextRef.current = event.results[0]?.[0]?.transcript ?? "";
        };
        speech.onerror = () => {};
        speechRef.current = speech;
        try {
          speech.start();
        } catch {
          speechRef.current = null;
        }
      }
      mediaRef.current = recorder;
      recorder.start();
      setListening(true);
    } catch {
      setError(home.micError);
    }
  }

  function stop() {
    if (mediaRef.current && mediaRef.current.state !== "inactive") mediaRef.current.stop();
  }

  return (
    <Frame locale={locale} copy={copy} step={1}>
      <p className="kicker">{home.kicker}</p>
      <h1>{home.h1}</h1>
      <p className="lede">{home.lede}</p>
      <div className="panel narrow">
        <button className={listening ? "record live" : "record"} type="button" onPointerDown={record} onPointerUp={stop} onPointerCancel={stop}>
          {listening ? home.listening : busy ? home.transcribing : home.hold}
        </button>
        <button className="upload" type="button" onClick={() => fileRef.current?.click()}>
          {fileName || home.upload}
        </button>
        <input
          ref={fileRef}
          className="file"
          type="file"
          accept="audio/*,.m4a,.mp3,.wav,.webm"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) void transcribe(file);
          }}
        />
        {error && <p className="error">{error}</p>}
      </div>
      <section className="features">
        {home.features.map(([title, body]) => (
          <article className="feature" key={title}>
            <h2>{title}</h2>
            <p>{body}</p>
          </article>
        ))}
      </section>
    </Frame>
  );
}
