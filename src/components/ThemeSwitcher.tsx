import { useEffect } from "react";
import { SunIcon, MoonIcon, ComputerDesktopIcon } from "@heroicons/react/24/outline";
import type { Theme } from "@/utils/theme";
import { resolveTheme, applyTheme, setStoredTheme } from "@/utils/theme";

interface ThemeSwitcherProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export default function ThemeSwitcher({ theme, setTheme }: ThemeSwitcherProps) {
  useEffect(() => {
    const isDark = resolveTheme(theme);
    applyTheme(isDark);

    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e: MediaQueryListEvent) => {
        applyTheme(e.matches);
      };
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme]);

  const themes = [
    { id: "light", icon: SunIcon },
    { id: "dark", icon: MoonIcon },
    { id: "system", icon: ComputerDesktopIcon },
  ];

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    setStoredTheme(newTheme);
  };

  return (
    <div className="bg-zinc-950/5 dark:bg-zinc-800/10 rounded-lg p-0.5 flex flex-row gap-1 border border-zinc-200 dark:border-zinc-800/40 w-fit">
      {themes.map((t) => {
        const Icon = t.icon;
        const isActive = theme === t.id;
        return (
          <button
            key={t.id}
            onClick={() => handleThemeChange(t.id as Theme)}
            className={`rounded-md p-1.5 cursor-pointer transition-colors duration-300 ${
              isActive
                ? "bg-white dark:bg-zinc-900/60"
                : "hover:bg-zinc-200 hover:dark:bg-zinc-800/30"
            }`}
          >
            <Icon
              className={`w-4 h-4 transition-colors duration-300 ${
                isActive ? "text-zinc-800 dark:text-zinc-100" : "text-zinc-700 dark:text-zinc-400"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
