import type { ReactNode } from "react";

export default function Button({
  children,
  className = "",
  loading = false,
  ...props
}: {
  children: ReactNode;
  className?: string;
  loading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      disabled={loading || props.disabled}
      className={`relative flex items-center justify-center px-4 py-2 cursor-pointer rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:opacity-90 transition ${className}`}
      {...props}
    >
      {loading && (
        <span className="absolute w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin dark:border-zinc-900 dark:border-t-transparent"></span>
      )}
      <span className={`${loading ? "opacity-0" : "opacity-100"} transition`}>
        {children}
      </span>
    </button>
  );
}
