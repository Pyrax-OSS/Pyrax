import { useState } from "react";
import type { ReactNode } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import banner from "@/assets/text.png";
import type { Theme } from "../utils/theme";
import { getStoredTheme } from "../utils/theme";
import DashboardSidebar from "./DashboardSidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [theme, setTheme] = useState<Theme>(getStoredTheme);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-zinc-100 dark:bg-[#0a0a0b]">
      <div className="sm:hidden fixed top-0 left-0 right-0 z-20 flex items-center justify-between bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-4 py-2">
        <img src={banner} className="invert dark:invert-0 w-auto h-4" />
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? (
            <XMarkIcon className="w-6 h-6 text-zinc-700 dark:text-zinc-300" />
          ) : (
            <Bars3Icon className="w-6 h-6 text-zinc-700 dark:text-zinc-300" />
          )}
        </button>
      </div>

      <DashboardSidebar
        sidebarOpen={sidebarOpen}
        theme={theme}
        setTheme={setTheme}
      />

      <div className="flex-1 flex flex-col items-start p-2 space-y-6 mt-12 sm:mt-0 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
