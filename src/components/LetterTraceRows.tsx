import { repeatedLetterLine } from "@/content/letterTracing";

const VIEW_W = 640;
const ROW_H = 88;

/** 首屏三行：一行实心示例，两行虚线。字母写在 SVG 文本里，页面源码里就有。 */
export default function LetterTraceRows({
  letter,
  fontCss,
  exampleLabel,
  dottedLabel,
}: {
  letter: string;
  fontCss: string;
  exampleLabel: string;
  dottedLabel: string;
}) {
  const line = repeatedLetterLine(letter);
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
      <TraceRow text={line} fontCss={fontCss} label={exampleLabel} dashed={false} />
      <TraceRow text={line} fontCss={fontCss} label={dottedLabel} dashed />
      <TraceRow text={line} fontCss={fontCss} label={dottedLabel} dashed />
    </div>
  );
}

function TraceRow({
  text,
  fontCss,
  label,
  dashed,
}: {
  text: string;
  fontCss: string;
  label: string;
  dashed: boolean;
}) {
  return (
    <svg viewBox={`0 0 ${VIEW_W} ${ROW_H}`} className="block h-auto w-full" role="img" aria-label={label}>
      <line x1="16" y1="6" x2={VIEW_W - 16} y2="6" stroke="#b8c8dc" strokeWidth="1" />
      <line
        x1="16"
        y1={ROW_H * 0.52}
        x2={VIEW_W - 16}
        y2={ROW_H * 0.52}
        stroke="#9db3cc"
        strokeWidth="1"
        strokeDasharray="8 6"
      />
      <line x1="16" y1={ROW_H - 6} x2={VIEW_W - 16} y2={ROW_H - 6} stroke="#9db3cc" strokeWidth="1" />
      <text
        x="24"
        y={ROW_H - 12}
        textLength={VIEW_W - 48}
        lengthAdjust="spacing"
        fontFamily={fontCss}
        fontSize="46"
        fill={dashed ? "none" : "#3a3a3a"}
        stroke={dashed ? "#3a3a3a" : "none"}
        strokeWidth={dashed ? 1.15 : 0}
        strokeDasharray={dashed ? "2.5 2.5" : undefined}
      >
        {text}
      </text>
    </svg>
  );
}
