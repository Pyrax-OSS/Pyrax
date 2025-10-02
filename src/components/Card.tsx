import type { ReactNode } from "react";

export default function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`border border-zinc-300/60 dark:border-zinc-800/50 bg-white rounded-lg dark:bg-zinc-950/20 p-4 ${className}`}
    >
      {children}
    </div>
  );
}
