export type Theme = "light" | "dark" | "system"

const THEME_STORAGE_KEY = "theme-preference"

export function getStoredTheme(): Theme {
  const stored = localStorage.getItem(THEME_STORAGE_KEY)
  if (stored === "light" || stored === "dark" || stored === "system") {
    return stored
  }
  return "light" // Default to light instead of system
}

export function setStoredTheme(theme: Theme): void {
  localStorage.setItem(THEME_STORAGE_KEY, theme)
}

export function getSystemTheme(): boolean {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
}

export function resolveTheme(theme: Theme): boolean {
  if (theme === "system") {
    return getSystemTheme()
  }
  return theme === "dark"
}

export function applyTheme(isDark: boolean): void {
  const root = document.documentElement
  if (isDark) {
    root.classList.add("dark")
  } else {
    root.classList.remove("dark")
  }
}