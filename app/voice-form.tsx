"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Frame } from "./frame";
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

export function VoiceForm() {
  const router = useRouter();
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
    router.push("/text");
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
      if (!response.ok) throw new Error(payload.error || "Could not transcribe that audio.");
      const spoken = payload.source === "openrouter" ? String(payload.text || "") : browserTextRef.current;
      go(spoken);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not transcribe that audio.");
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
      setError("Allow the microphone, then try again.");
    }
  }

  function stop() {
    if (mediaRef.current && mediaRef.current.state !== "inactive") mediaRef.current.stop();
  }

  return (
    <Frame step={1}>
      <p className="kicker">Step 1 of 3</p>
      <h1>Add your voice.</h1>
      <p className="lede">Record on this page, or upload an audio file. The next page shows the words.</p>
      <div className="panel narrow">
        <button className={listening ? "record live" : "record"} type="button" onPointerDown={record} onPointerUp={stop} onPointerCancel={stop}>
          {listening ? "Listening… release to transcribe" : busy ? "Transcribing…" : "Hold to record"}
        </button>
        <button className="upload" type="button" onClick={() => fileRef.current?.click()}>
          {fileName || "Upload audio"}
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
        <article className="feature">
          <h2>Record or upload</h2>
          <p>Hold the button to record, or upload an m4a, mp3, wav, or webm file. Phones and computers use the same step.</p>
        </article>
        <article className="feature">
          <h2>Fix the transcript</h2>
          <p>The words land on their own page. Change a name or a sentence before anything is written by hand.</p>
        </article>
        <article className="feature">
          <h2>Paper, ink, and download</h2>
          <p>Pick Letter, Note, Card, or Grid, then a handwriting style, size, and ink. Save a PNG of one page or a PDF of all pages.</p>
        </article>
      </section>
    </Frame>
  );
}
