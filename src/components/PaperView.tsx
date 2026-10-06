"use client";
import { ArrowDown } from "@phosphor-icons/react/dist/ssr";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { FONTS, useEditorStore, type TextAlign } from "@/stores/useEditorStore";
import { tokenize, type Token } from "@/engine/tokens";
import { expandPages, paginateLineTops } from "@/engine/layout";
import { charJitter } from "@/engine/jitter";
import { getPaper } from "@/engine/paper";

export const PAGE_W = 794; // A4 @96dpi
export const PAGE_H = 1123;
const PADDING = 48;

interface ParaGroup {
  tokens: Token[];
  /** 该组首字符的全局 token 索引(-1 表示空段落) */
  startIndex: number;
}

/** 把 token 序列按 newline 边界切成段落组;newline 本身不渲染 */
function partitionParagraphs(tokens: Token[]): ParaGroup[] {
  const groups: ParaGroup[] = [];
  let current: Token[] = [];
  let startIndex = -1;
  tokens.forEach((t, i) => {
    if (t.kind === "newline") {
      groups.push({ tokens: current, startIndex });
      current = [];
      startIndex = -1; // 待定:若下一个不是 newline,则是真段落起点
    } else {
      if (startIndex === -1) startIndex = i;
      current.push(t);
    }
  });
  groups.push({ tokens: current, startIndex });
  return groups;
}

export default function PaperView() {
  const { text, fontId, paperId, ink, fontSize, intensity, seed, align, indent } =
    useEditorStore();
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

  // 真段落起点 = 文首或紧跟换行的 token;跨页续行不在此集合,不加缩进
  const paraStarts = useMemo(
    () => new Set(tokens.map((t, i) => (i === 0 || tokens[i - 1].kind === "newline" ? i : -1)).filter((i) => i >= 0)),
    [tokens],
  );

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

  /** 段落流渲染:测量容器与可见页共用,保证 offsetTop 一致 */
  const tokenFlow = (list: Token[]) => (
    <div style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
      {partitionParagraphs(list).map((group, gi) =>
        group.tokens.length === 0 ? (
          // 空段落:占一行高度
          <div key={gi} style={{ height: paper.lineHeight }} />
        ) : (
          <div
            key={gi}
            style={{
              textAlign: align,
              // 仅"真段落起点"缩进两格;跨页续行不缩进
              textIndent: indent && group.startIndex !== -1 && paraStarts.has(group.startIndex) ? "2em" : 0,
            }}
          >
            {group.tokens.map(rendered)}
          </div>
        ),
      )}
    </div>
  );

  const measureNode = (
    <div
      ref={measureRef}
      aria-hidden
      style={{
        position: "absolute",
        visibility: "hidden",
        left: -99999,
        width: PAGE_W - PADDING * 2,
      }}
    >
      {tokenFlow(tokens)}
    </div>
  );

  if (pages.length === 0) {
    return (
      <>
        {measureNode}
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
      {measureNode}
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
            {tokenFlow(pageTokens)}
            <span className="absolute right-5 bottom-3 font-mono text-[11px] text-zinc-400">
              {p + 1} / {pages.length}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

export type { TextAlign };
