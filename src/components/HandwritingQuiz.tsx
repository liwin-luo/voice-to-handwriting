"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { toPng } from "html-to-image";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { QUIZ_CONTENT, type ProfileId, type SampleStyle } from "@/content/quiz";
import type { FontId } from "@/stores/useEditorStore";
import { formatProgress, scoreQuiz } from "@/lib/quiz";

const PROFILE_FONT: Record<ProfileId, FontId> = {
  balanced: "patrickhand",
  bold: "indieflower",
  planner: "kalam",
  spirit: "caveat",
  steady: "cedarvillecursive",
  spark: "dancingscript",
};

const PROFILE_STACK: Record<ProfileId, SampleStyle["font"]> = {
  balanced: "print",
  bold: "messy",
  planner: "neat",
  spirit: "caveat",
  steady: "everyday",
  spark: "fancy",
};

/** 样张字体栈:全部为站内自托管 OFL 字体(layout 全局注入),系统字体兜底保证可读 */
const FONT_STACKS: Record<SampleStyle["font"], string> = {
  print: `"Patrick Hand", "Comic Sans MS", cursive`,
  neat: `"Kalam", "Comic Sans MS", cursive`,
  messy: `"Indie Flower", "Comic Sans MS", cursive`,
  fancy: `"Dancing Script", cursive`,
  everyday: `"Cedarville Cursive", cursive`,
  caveat: `"Caveat", cursive`,
};

/** 样张视觉样式 → CSS:skew 模拟 slant、rotate 模拟基线漂移、墨色深浅模拟笔压 */
function sampleCss(s: SampleStyle): CSSProperties {
  return {
    fontFamily: FONT_STACKS[s.font],
    fontSize: `${(s.size ?? 1) * 2.35}rem`,
    lineHeight: 1.15,
    transform: `skewX(${s.slant ?? 0}deg) rotate(${s.rotate ?? 0}deg)`,
    letterSpacing: `${s.spacing ?? 0}em`,
    wordSpacing: `${s.word ?? 0}em`,
    color: s.ink === "light" ? "#a8a29e" : s.ink === "heavy" ? "#0c0a09" : "#1c1917",
    textShadow: s.ink === "heavy" ? "0.5px 0 currentColor" : undefined,
    WebkitTextStroke: s.ink === "heavy" ? "0.7px currentColor" : undefined,
  };
}

const LEVEL_WIDTH: Record<string, string> = { low: "33%", mid: "66%", high: "100%" };

/** 分步向导:0..n-1 为题目,n 为结果页。打开即第一题。纯本地状态,无上传无存储。 */
export default function HandwritingQuiz({ locale }: { locale: Locale }) {
  const c = QUIZ_CONTENT[locale];
  const total = c.questions.length;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState(false);

  const done = step >= total;
  const result = useMemo(
    () => (done ? scoreQuiz(answers, c.questions) : null),
    [done, answers, c.questions],
  );
  const profile = result ? c.profiles[result.profile] : null;

  const stepped = useRef(false);
  // 换题时把焦点移到题干。首屏不要抢焦点,否则一打开就把标题滚出视口。
  useEffect(() => {
    if (!stepped.current) {
      stepped.current = true;
      return;
    }
    if (step >= 0 && step < total) headingRef.current?.focus();
  }, [step, total]);

  function choose(choice: number) {
    setAnswers((prev) => {
      const next = prev.slice(0, total);
      next[step] = choice;
      return next;
    });
    setStep(step + 1);
  }

  async function download() {
    if (!cardRef.current) return;
    setBusy(true);
    try {
      const url = await toPng(cardRef.current, { pixelRatio: 2 });
      const a = document.createElement("a");
      a.href = url;
      a.download = "handwriting-personality-quiz.png";
      a.click();
    } finally {
      setBusy(false);
    }
  }

  function retake() {
    setAnswers([]);
    setStep(0);
  }

  return (
    <div>
      <p aria-live="polite" className="sr-only">
        {done
          ? c.resultHeading
          : step >= 0
            ? formatProgress(c.progress, step + 1, total)
            : ""}
      </p>

      {step >= 0 && !done && (
        <div className="rounded-3xl border border-zinc-200 bg-white p-5 md:p-8">
          <div className="mb-2 text-xs font-medium text-zinc-400">
            {formatProgress(c.progress, step + 1, total)}
          </div>
          <div className="mb-6 h-1.5 overflow-hidden rounded-full bg-zinc-100" aria-hidden>
            <div
              className="h-full rounded-full bg-accent transition-all duration-300"
              style={{ width: `${(step / total) * 100}%` }}
            />
          </div>
          <h3
            ref={headingRef}
            tabIndex={-1}
            className="outline-none text-lg font-semibold text-zinc-900 md:text-xl"
          >
            {c.questions[step].prompt}
          </h3>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {c.questions[step].options.map((opt, j) => (
              <button
                key={j}
                type="button"
                data-testid="quiz-option"
                onClick={() => choose(j)}
                className="group flex cursor-pointer flex-col items-center justify-between gap-3 rounded-2xl border border-zinc-200 p-4 text-center transition-all duration-300 hover:border-accent hover:shadow-[0_10px_30px_-14px_rgba(21,49,126,0.35)] focus-visible:outline-2 focus-visible:outline-accent"
              >
                {c.questions[step].text ? (
                  <span
                    aria-hidden
                    className="flex min-h-16 items-center overflow-hidden"
                    style={opt.style ? sampleCss(opt.style) : undefined}
                  >
                    {c.questions[step].text}
                  </span>
                ) : null}
                <span className="text-sm leading-snug text-zinc-600 group-hover:text-zinc-900">
                  {opt.label}
                </span>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            disabled={step === 0}
            className="btn btn-ghost mt-5 px-4 py-2 text-sm disabled:opacity-0"
          >
            ← {c.back}
          </button>
        </div>
      )}

      {done && result && profile && (
        <div className="rise">
          <div
            ref={cardRef}
            className="rounded-3xl border border-zinc-200 bg-white p-6 md:p-8"
          >
            <h3 className="text-sm font-medium text-zinc-400">{c.resultHeading}</h3>
            <p
              className="mt-3 text-4xl leading-tight text-zinc-900 md:text-5xl"
              style={{ fontFamily: FONT_STACKS[PROFILE_STACK[result.profile]] }}
            >
              {profile.name}
            </p>
            <p className="mt-2 text-sm text-zinc-500">{profile.tagline}</p>
            <ul className="mt-6 space-y-3">
              {result.dimensions.map((d) => {
                const dim = c.dimensions[d.id];
                return (
                  <li key={d.id} className="flex items-center gap-3 text-sm">
                    <span className="w-28 shrink-0 text-zinc-600 md:w-36">{dim.label}</span>
                    <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-zinc-100" aria-hidden>
                      <span
                        className="block h-full rounded-full bg-accent"
                        style={{ width: LEVEL_WIDTH[d.level] }}
                      />
                    </span>
                    <span className="w-24 shrink-0 text-right text-xs text-zinc-500 md:w-28">
                      {dim.levels[d.level]}
                    </span>
                  </li>
                );
              })}
            </ul>
            <p className="mt-6 text-[10px] leading-snug text-zinc-400">{c.disclaimer}</p>
            <p className="mt-1 text-right text-[10px] text-zinc-300">
              Voice to Handwriting · voicetohandwriting.online
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href={`/?font=${PROFILE_FONT[result.profile]}`}
              className="btn btn-primary px-5 py-2.5 text-sm"
            >
              {c.writeCta}
            </Link>
            <button onClick={download} disabled={busy} className="btn btn-ghost px-5 py-2.5 text-sm">
              {c.download}
            </button>
            <button onClick={retake} className="btn btn-ghost px-5 py-2.5 text-sm">
              {c.retake}
            </button>
          </div>
          <p className="mt-3 text-xs text-zinc-400">{c.disclaimer}</p>

          <div className="mt-8 grid gap-3">
            <h3 className="text-lg font-semibold text-zinc-900">{c.dimsHeading}</h3>
            {result.dimensions.map((d) => {
              const dim = c.dimensions[d.id];
              return (
                <div key={d.id} className="rounded-2xl border border-zinc-200 bg-white p-5">
                  <p className="text-[15px] font-semibold text-zinc-900">
                    {dim.label} · {dim.levels[d.level]}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                    <Link
                      href={dim.practice.href}
                      className="text-accent underline underline-offset-2 transition-colors hover:text-accent-strong"
                    >
                      {dim.practice.text}
                    </Link>
                  </p>
                </div>
              );
            })}
            <div className="rounded-2xl border border-zinc-200 bg-white p-5">
              <p className="text-[15px] font-semibold text-zinc-900">{c.growthLabel}</p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">{profile.growth}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
