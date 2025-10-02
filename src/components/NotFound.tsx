import { useState } from "react";
import { TypographyH1, TypographyP } from "../components/Typography";
import Button from "../components/Button";
import Card from "../components/Card";
import ThemeSwitcher from "../components/ThemeSwitcher";
import type { Theme } from "../utils/theme";
import {
  getStoredTheme,
  applyTheme,
  resolveTheme,
} from "../utils/theme";

export default function NotFound() {
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = getStoredTheme();
    applyTheme(resolveTheme(storedTheme));
    return storedTheme;
  });

  return (
    <div className="bg-[#f3f4f6] text-black dark:bg-zinc-950 dark:text-white min-h-screen flex flex-col items-center justify-center transition-colors duration-300 px-6">
      <Card className="max-w-2xl w-full text-center p-8">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 mb-4">
            <svg
              className="w-10 h-10 text-zinc-600 dark:text-zinc-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <TypographyH1 className="!text-6xl mb-4 text-zinc-900 dark:text-zinc-50">
            404
          </TypographyH1>
          <TypographyP className="text-xl font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
            Page not found
          </TypographyP>
          <TypographyP className="text-zinc-600 dark:text-zinc-400 !mt-2">
            Sorry, we couldn't find the page you're looking for. The page might
            have been moved, deleted, or never existed.
          </TypographyP>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <Button
            onClick={() => (window.location.href = "/")}
            className="w-full sm:w-auto"
          >
            Go back home
          </Button>
          <Button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto !bg-white dark:!bg-zinc-800 !text-zinc-900 dark:!text-zinc-100 border border-zinc-300 dark:border-zinc-700"
          >
            Go back
          </Button>
        </div>
      </Card>

      <div className="mt-8">
        <ThemeSwitcher theme={theme} setTheme={setTheme} />
      </div>
    </div>
  );
}
