import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "recording";
type Size = "sm" | "md";

const variantClass: Record<Variant, string> = {
  primary: "btn-primary",
  secondary: "btn-ghost",
  ghost: "border border-transparent text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900",
  recording: "btn-recording",
};

const sizeClass: Record<Size, string> = {
  sm: "px-2.5 py-1",
  md: "px-3 py-1.5",
};

/** 新代码的按钮出口;存量 `btn btn-*` 类继续有效(同一样式令牌)。asChild 场景用 <Link className="btn ...">。 */
export default function Button({
  variant = "secondary",
  size = "md",
  href,
  children,
  className = "",
  ...rest
}: {
  variant?: Variant;
  size?: Size;
  href?: string;
  children: ReactNode;
  className?: string;
} & Omit<ComponentProps<"button">, "className" | "children">) {
  const cls = `btn ${variantClass[variant]} ${sizeClass[size]} ${className}`;
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  );
}
