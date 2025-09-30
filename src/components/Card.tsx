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
      className={`bg-white dark:bg-zinc-900/60 border border-zinc-400/50 dark:border-zinc-800/50 rounded-lg p-4 ${className}`}
    >
      {children}
    </div>
  );
}
