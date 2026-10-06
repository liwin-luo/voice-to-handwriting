"use client";
import { ArrowDown } from "@phosphor-icons/react/dist/ssr";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { FONTS, useEditorStore } from "@/stores/useEditorStore";
import { tokenize, type Token } from "@/engine/tokens";
import { expandPages, paginateLineTops } from "@/engine/layout";
import { charJitter } from "@/engine/jitter";
import { getPaper, makeCustomPaper } from "@/engine/paper";

export const PAGE_W = 794; // A4 @96dpi
export const PAGE_H = 1123;
const PADDING = 48;
const PAGE_GAP = 24; // 与 gap-6 保持一致

interface ParaGroup {
  /** [全局 token 索引, token]:索引必须全局唯一,jitter 与测量分页都依赖它 */
  items: Array<[number, Token]>;
  /** 该组首字符的全局 token 索引(-1 表示空段落) */
  startIndex: number;
}

/** 把 token 序列按 newline 边界切成段落组;newline 本身不渲染 */
function partitionParagraphs(tokens: Token[]): ParaGroup[] {
  const groups: ParaGroup[] = [];
  let items: Array<[number, Token]> = [];
  let startIndex = -1;
  tokens.forEach((t, i) => {
    if (t.kind === "newline") {
      groups.push({ items, startIndex });
      items = [];
      startIndex = -1;
    } else {
      if (startIndex === -1) startIndex = i;
      items.push([i, t]);
    }
  });
  groups.push({ items, startIndex });
  return groups;
}

export default function PaperView() {
  const t = useTranslations("tool");
  const th = useTranslations("home");
  const { text, fontId, paperId, ink, fontSize, intensity, seed, align, indent, watermark, customPaper } =
    useEditorStore();
  const composing = useEditorStore((s) => s.composing);
  const setText = useEditorStore((s2) => s2.setText);
  const font = FONTS.find((f) => f.id === fontId) ?? FONTS[0];
  const paper = paperId === "custom" ? makeCustomPaper(customPaper) : getPaper(paperId);

  // 长文本逐键重排版(tokenize + 隐藏 DOM 测量 + 分页渲染)很重:
  // 输入防抖,且 IME 组词期间完全暂停(组词事件在 TranscriptEditor 上报)
  const [deferredText, setDeferredText] = useState("");
  useEffect(() => {
    if (composing) return; // 组词中:不定时器,选字期间绝不重排版
    const id = setTimeout(() => setDeferredText(text), 300);
    return () => clearTimeout(id);
  }, [text, composing]);

  const tokens = useMemo(() => tokenize(deferredText), [deferredText]);
  const [pages, setPages] = useState<Token[][]>([]);
  const measureRef = useRef<HTMLDivElement>(null);

  // 纸张按容器宽度自适应缩放(仅 transform,不影响导出像素)
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => setScale(Math.min(1, el.clientWidth / PAGE_W));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // 稳定引用:重组件的 useMemo 依赖
  const charStyle = useMemo(
    () =>
      ({
        fontFamily: font.css,
        fontSize,
        color: ink,
        lineHeight: `${paper.lineHeight}px`,
      }) as const,
    [font.css, fontSize, ink, paper.lineHeight],
  );

  // 真段落起点 = 文首或紧跟换行的 token;跨页续行不在此集合,不加缩进
  const paraStarts = useMemo(
    () =>
      new Set(
        tokens
          .map((tok, i) => (i === 0 || tokens[i - 1].kind === "newline" ? i : -1))
          .filter((i) => i >= 0),
      ),
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

  // 渲染整棵 token 树(每字符 jitter + 分页)很重:仅在排版相关状态变化时重算,
  // 输入组词/逐键 store 更新时直接复用,保证编辑器输入流畅
  const { measureNode, content } = useMemo(() => {
    const rendered = (tok: Token, i: number) => {
      const j = charJitter(i, seed, intensity);
      return (
        <span
          key={i}
          data-idx={i}
          style={{
            ...charStyle,
            display: "inline-block",
            transform: `rotate(${j.rotate}deg) translateY(${j.translateY}px) scale(${j.scale})`,
            letterSpacing: tok.kind === "word" ? `${j.letterSpacing * 0.3}px` : `${j.letterSpacing}px`,
            opacity: j.opacity,
            whiteSpace: "pre",
          }}
        >
          {tok.kind === "space" ? "\u00A0" : tok.text}
        </span>
      );
    };

    /** 段落流渲染:测量容器与可见页共用,保证 offsetTop 一致 */
    const tokenFlow = (list: Token[]) => (
      <div style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
        {partitionParagraphs(list).map((group, gi) =>
          group.items.length === 0 ? (
            <div key={gi} style={{ height: paper.lineHeight }} />
          ) : (
            <div
              key={gi}
              style={{
                textAlign: align,
                // 仅"真段落起点"缩进两格;跨页续行不缩进
                textIndent:
                  indent && group.startIndex !== -1 && paraStarts.has(group.startIndex) ? "2em" : 0,
              }}
            >
              {group.items.map(([idx, tok]) => rendered(tok, idx))}
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

    const content =
      pages.length === 0 ? (
        <div
          className="shadow-paper flex flex-col items-center gap-4 rounded-xl pt-24"
          style={{ width: PAGE_W, height: PAGE_H, background: paper.background }}
        >
          <p className="font-hand text-4xl text-zinc-300">{t("emptyTitle")}</p>
          <p className="text-sm text-zinc-400">{t("emptyHint")}</p>
          <button
            onClick={() => setText(th("sampleText"))}
            className="btn btn-ghost mt-1 px-4 py-2 text-xs"
          >
            {t("trySample")}
          </button>
          <ArrowDown className="size-4 animate-bounce text-zinc-300" />
        </div>
      ) : (
        pages.map((pageTokens, p) => (
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
            {watermark && (
              <span className="absolute left-5 bottom-3 text-[10px] tracking-wide text-zinc-400/90 select-none">
                {th("watermarkLabel")}
              </span>
            )}
          </div>
        ))
      );

    return { measureNode, content };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokens, pages, paraStarts, charStyle, align, indent, watermark, paper.background, paper.lineHeight, seed, intensity, t, th]);

  const contentH =
    pages.length === 0 ? PAGE_H : pages.length * PAGE_H + (pages.length - 1) * PAGE_GAP;

  return (
    <>
      {measureNode}
      {/* overflow-hidden:裁掉 scale 后残留的未缩放布局盒,避免透明区域拦截点击 */}
      <div ref={wrapRef} style={{ height: contentH * scale }} className="overflow-hidden">
        <div
          className="flex flex-col items-center gap-6"
          style={{ width: PAGE_W, transform: `scale(${scale})`, transformOrigin: "top left" }}
        >
          {content}
        </div>
      </div>
    </>
  );
}
