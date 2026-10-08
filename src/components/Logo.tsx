/** 品牌 logo:钢笔尖(手写工具站),与 src/app/icon.svg 同源设计 */
export default function Logo({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden focusable="false">
      <rect width="32" height="32" rx="7" fill="currentColor" />
      <path
        fill="#ffffff"
        d="M16 27.5 9.8 14.2C9.8 8.7 12.2 5.5 16 5.5s6.2 3.2 6.2 8.7L16 27.5Z"
      />
      <circle cx="16" cy="13.2" r="1.6" fill="currentColor" />
      <path stroke="currentColor" strokeWidth="1.2" d="M16 15.4v9" />
    </svg>
  );
}
