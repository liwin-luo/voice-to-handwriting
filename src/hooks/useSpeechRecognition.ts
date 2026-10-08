"use client";
import { useCallback, useEffect, useRef, useState } from "react";

interface SRLike {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((e: any) => void) | null;
  onend: (() => void) | null;
  onerror: ((e: { error: string }) => void) | null;
}
type SRCtor = new () => SRLike;

// 测试注入点
let testSR: SRCtor | null = null;
export function setSRForTest(c: SRCtor | null) {
  testSR = c;
}

function getSR(): SRCtor | null {
  if (testSR) return testSR;
  if (typeof window === "undefined") return null;
  const w = window as any;
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

/**
 * Web Speech API 封装:
 * - Chrome 约 60s 自动断开 → onend 中若仍在监听态则自动重启
 * - final 片段经 onFinal 交给调用方;interim 独立展示
 * - 连续快速失败(重启 50 次)则报错停止,避免死循环
 */
export function useSpeechRecognition(opts: { lang?: string; onFinal: (t: string) => void }) {
  const { lang = "en-US", onFinal } = opts;
  // SSR 与客户端首帧统一为 false,挂载后再探测,避免水合不一致
  const [supported, setSupported] = useState(false);
  useEffect(() => setSupported(getSR() !== null), []);
  const [listening, setListening] = useState(false);
  const [interim, setInterim] = useState("");
  const [error, setError] = useState<"denied" | "network" | "stopped" | null>(null);

  const recRef = useRef<SRLike | null>(null);
  const wantRef = useRef(false);
  const restartsRef = useRef(0);
  const onFinalRef = useRef(onFinal);
  onFinalRef.current = onFinal;

  const create = useCallback((): SRLike | null => {
    const Ctor = getSR();
    if (!Ctor) return null;
    const rec = new Ctor();
    rec.lang = lang;
    rec.continuous = true;
    rec.interimResults = true;
    rec.onresult = (e) => {
      let fin = "";
      let intr = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) fin += r[0].transcript;
        else intr += r[0].transcript;
      }
      if (fin) onFinalRef.current(fin);
      setInterim(intr);
    };
    rec.onerror = (e) => {
      if (e.error === "not-allowed") {
        wantRef.current = false;
        setListening(false);
        setError("denied");
      } else if (e.error === "network") {
        setError("network");
      }
      // no-speech / aborted 交给 onend 重启逻辑
    };
    rec.onend = () => {
      setInterim("");
      if (wantRef.current) {
        if (restartsRef.current < 50) {
          restartsRef.current += 1;
          setTimeout(() => {
            if (!wantRef.current) return;
            try {
              rec.start();
            } catch {
              /* already started */
            }
          }, 200);
        } else {
          wantRef.current = false;
          setListening(false);
          setError("stopped");
        }
      } else {
        setListening(false);
      }
    };
    return rec;
  }, [lang]);

  const start = useCallback(() => {
    setError(null);
    restartsRef.current = 0;
    wantRef.current = true;
    const rec = recRef.current ?? create();
    if (!rec) return;
    recRef.current = rec;
    try {
      rec.start();
    } catch {
      /* InvalidStateError: 已在运行 */
    }
    setListening(true);
  }, [create]);

  const stop = useCallback(() => {
    wantRef.current = false;
    setInterim("");
    recRef.current?.stop();
    setListening(false);
  }, []);

  useEffect(
    () => () => {
      wantRef.current = false;
      recRef.current?.abort();
    },
    [],
  );

  return { supported, listening, interim, error, start, stop };
}
