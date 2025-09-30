import { useState, useEffect, useRef } from "react"
import { SunIcon, MoonIcon, ComputerDesktopIcon } from "@heroicons/react/24/outline"
import type { Theme } from "@/utils/theme"
import { getStoredTheme, setStoredTheme, resolveTheme, applyTheme } from "@/utils/theme"

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => {
    // Initialize and immediately apply theme
    const storedTheme = getStoredTheme()
    const isDark = resolveTheme(storedTheme)
    applyTheme(isDark)
    return storedTheme
  })
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const isDark = resolveTheme(theme)
    applyTheme(isDark)

    // Listen for system theme changes when theme is "system"
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
      const handleChange = (e: MediaQueryListEvent) => {
        applyTheme(e.matches)
      }
      mediaQuery.addEventListener("change", handleChange)
      return () => mediaQuery.removeEventListener("change", handleChange)
    }
  }, [theme])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme)
    setStoredTheme(newTheme)
    setIsDropdownOpen(false)
  }

  return (
    <div className="fixed bottom-6 right-6" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="p-3 rounded-lg bg-zinc-200/50 border border-zinc-400/30 dark:bg-zinc-800/40 dark:border-zinc-700/30 transition-colors duration-100 cursor-pointer"
        aria-label="Toggle theme menu"
      >
        {theme === "dark" && <MoonIcon className="w-5 h-5" />}
        {theme === "light" && <SunIcon className="w-5 h-5" />}
        {theme === "system" && <ComputerDesktopIcon className="w-5 h-5" />}
      </button>

      {isDropdownOpen && (
        <div className="absolute bottom-full right-0 mb-2 bg-zinc-200/40 border-zinc-400/20 dark:bg-zinc-800/30 dark:border-zinc-700/20 border rounded-lg cursor-pointer overflow-hidden">
          <button
            onClick={() => handleThemeChange("light")}
            className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-zinc-400/20 dark:hover:bg-zinc-700/20 transition-colors cursor-pointer"
          >
            <SunIcon className="w-5 h-5" />
            <span>Light</span>
          </button>
          <button
            onClick={() => handleThemeChange("dark")}
            className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-zinc-400/20 dark:hover:bg-zinc-700/20 transition-colors cursor-pointer"
          >
            <MoonIcon className="w-5 h-5" />
            <span>Dark</span>
          </button>
          <button
            onClick={() => handleThemeChange("system")}
            className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-zinc-400/20 dark:hover:bg-zinc-700/20 transition-colors cursor-pointer"
          >
            <ComputerDesktopIcon className="w-5 h-5" />
            <span>System</span>
          </button>
        </div>
      )}
    </div>
  )
}