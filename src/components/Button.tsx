import type { ReactNode } from "react";

export default function Button({
  children,
  className = "",
  ...props
}: {
  children: ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`inline-flex items-center px-4 py-2 cursor-pointer rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:opacity-90 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
