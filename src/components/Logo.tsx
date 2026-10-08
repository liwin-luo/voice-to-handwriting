/** 品牌 logo:钢笔尖(手写工具站),与 src/app/icon.svg 同源设计 */
export default function Logo({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden focusable="false">
      <rect width="32" height="32" rx="7" fill="currentColor" />
      <path
        fill="#ffffff"
        d="M16 26.5C12.8 22.6 9.5 18.2 9.5 13 9.5 8.9 12.4 6 16 6s6.5 2.9 6.5 7c0 5.2-3.3 9.6-6.5 13.5Z"
      />
      <circle cx="16" cy="13.5" r="2" fill="currentColor" />
      <rect x="15.3" y="16" width="1.4" height="8" rx="0.7" fill="currentColor" />
    </svg>
  );
}
