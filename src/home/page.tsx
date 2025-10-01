import { useState, useEffect } from "react";
import { TypographyH1, TypographyP } from "@/components/Typography";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import type { Theme } from "@/utils/theme";
import { getStoredTheme, applyTheme, resolveTheme } from "@/utils/theme";
import axios from "axios";
import Card from "@/components/Card";

export default function Home() {
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = getStoredTheme();
    applyTheme(resolveTheme(storedTheme));
    return storedTheme;
  });

  const [version, setVersion] = useState("");

  useEffect(() => {
    axios
      .get("/api/version")
      .then((res) => {
        const data = res.data;
        if (typeof data === "object" && data !== null && "version" in data) {
          setVersion(data.version);
        } else {
          setVersion(typeof data === "string" ? data : JSON.stringify(data));
        }
      })
      .catch((err) => console.error("Failed to fetch version:", err));
  }, []);

  return (
    <div className="bg-[#f3f4f6] text-black dark:bg-zinc-950 dark:text-white h-screen flex flex-col items-center justify-center transition-colors duration-300 relative">
      <Card className="absolute top-4 left-4 px-3 dark:bg-[#0a0a0a] py-2 rounded-lg border text-xs sm:text-sm flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
        <span className="font-semibold text-blue-600 dark:text-blue-400">
          Open for Commissions
        </span>
        <span className="text-zinc-600 dark:text-zinc-400">
          More info coming soon
        </span>
      </Card>

        <TypographyH1>Software is better</TypographyH1>
        <TypographyH1>when developed by us</TypographyH1>
        <TypographyP className="text-zinc-700 dark:text-zinc-300 text-lg mt-4">
          We are a team of highly trained, skilled developers & designers. We
          create some of the
          <br /> best looking and most performant software out there for
          businesses on any budget.
        </TypographyP>
        <p className="mt-4 font-bold text-zinc-700 dark:text-zinc-300">
          {version}
        </p>
      <ThemeSwitcher theme={theme} setTheme={setTheme} />
    </div>
  );
}
