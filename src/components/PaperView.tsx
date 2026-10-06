"use client";
import { ArrowDown } from "@phosphor-icons/react/dist/ssr";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { FONTS, useEditorStore } from "@/stores/useEditorStore";
import { tokenize, type Token } from "@/engine/tokens";
import { expandPages, paginateLineTops } from "@/engine/layout";
import { charJitter } from "@/engine/jitter";
import { getPaper } from "@/engine/paper";

export const PAGE_W = 794; // A4 @96dpi
export const PAGE_H = 1123;
const PADDING = 48;

export default function PaperView() {
  const { text, fontId, paperId, ink, fontSize, intensity, seed } = useEditorStore();
  const font = FONTS.find((f) => f.id === fontId) ?? FONTS[0];
  const paper = getPaper(paperId);
  const tokens = useMemo(() => tokenize(text), [text]);
  const [pages, setPages] = useState<Token[][]>([]);
  const measureRef = useRef<HTMLDivElement>(null);

  const charStyle = {
    fontFamily: font.css,
    fontSize,
    color: ink,
    lineHeight: `${paper.lineHeight}px`,
  } as const;

  useLayoutEffect(() => {
    let cancelled = false;
    const measure = () => {
      const el = measureRef.current;
      if (!el || cancelled) return;
      const boxes = Array.from(el.querySelectorAll<HTMLElement>("[data-idx]")).map((s) => ({
        index: Number(s.dataset.idx),
        top: s.offsetTop,
      }));
      const groups = paginateLineTops(boxes, PAGE_H - PADDING * 2);
      setPages(expandPages(groups, tokens).map((g) => g.map((i) => tokens[i])));
    };
    measure();
    // 字体异步加载会改变排版,加载完成后重测
    document.fonts?.ready.then(() => {
      if (!cancelled) measure();
    });
    return () => {
      cancelled = true;
    };
  }, [tokens, fontSize, paper.lineHeight, font.css]);

  const rendered = (t: Token, i: number) => {
    if (t.kind === "newline") return <br key={i} />;
    const j = charJitter(i, seed, intensity);
    return (
      <span
        key={i}
        data-idx={i}
        style={{
          ...charStyle,
          display: "inline-block",
          transform: `rotate(${j.rotate}deg) translateY(${j.translateY}px) scale(${j.scale})`,
          letterSpacing: t.kind === "word" ? `${j.letterSpacing * 0.3}px` : `${j.letterSpacing}px`,
          opacity: j.opacity,
          whiteSpace: "pre",
        }}
      >
        {t.kind === "space" ? "\u00A0" : t.text}
      </span>
    );
  };

  if (pages.length === 0) {
    return (
      <>
        {/* 隐藏测量容器:与可见页同宽同行高,仅用于拿每字符 offsetTop */}
        <div
          ref={measureRef}
          aria-hidden
          style={{
            position: "absolute",
            visibility: "hidden",
            left: -99999,
            width: PAGE_W - PADDING * 2,
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {tokens.map(rendered)}
        </div>
        {/* 精心构图的空状态:用产品自己的手写字体说话 */}
        <div
          className="shadow-paper flex flex-col items-center justify-center gap-4 rounded-xl"
          style={{ width: PAGE_W, height: PAGE_H, background: paper.background }}
        >
          <p className="font-hand text-4xl text-zinc-300">说一段话,落笔成字</p>
          <p className="text-sm text-zinc-400">点击下方「点击说话」,或直接在右侧输入文字</p>
          <ArrowDown className="size-4 animate-bounce text-zinc-300" />
        </div>
      </>
    );
  }

  return (
    <>
      <div
        ref={measureRef}
        aria-hidden
        style={{
          position: "absolute",
          visibility: "hidden",
          left: -99999,
          width: PAGE_W - PADDING * 2,
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
      >
        {tokens.map(rendered)}
      </div>
      <div className="flex flex-col items-center gap-6">
        {pages.map((pageTokens, p) => (
          <div
            key={p}
            className="paper shadow-paper relative overflow-hidden rounded-xl"
            style={{
              width: PAGE_W,
              height: PAGE_H,
              background: paper.background,
              padding: PADDING,
            }}
          >
            <div style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
              {pageTokens.map(rendered)}
            </div>
            <span className="absolute right-5 bottom-3 font-mono text-[11px] text-zinc-400">
              {p + 1} / {pages.length}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
