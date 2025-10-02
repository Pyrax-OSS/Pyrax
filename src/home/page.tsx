import { useState, useEffect } from "react";
import {
  TypographyH1,
  TypographyP,
  TypographySmall,
} from "../components/Typography";
import ThemeSwitcher from "../components/ThemeSwitcher";
import type { Theme } from "../utils/theme";
import { getStoredTheme } from "../utils/theme";
import axios from "axios";

export default function Home() {
  const [theme, setTheme] = useState<Theme>(getStoredTheme);

  const [version, setVersion] = useState("");

  useEffect(() => {
    axios
      .get("https://api.pyrax.dev/version")
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
    <>
      <div className="bg-[#f3f4f6] text-black min-h-screen dark:bg-zinc-950 dark:text-white">
        <div className="p-2">
          <header className="w-full bg-zinc-950/5 dark:bg-zinc-800/10 py-2 px-4 rounded-lg">
            <TypographySmall className="font-semibold text-zinc-600 dark:text-zinc-300">
              We are currently open for commissions!{" "}
              <span className="font-normal text-xs">
                More information will be posted here soon!
              </span>
            </TypographySmall>
          </header>
        </div>
        <div className="min-h-screen flex flex-col items-center justify-center transition-colors duration-300">
          <div className="text-center w-full max-w-4xl mb-8">
            <TypographyH1 className="text-3xl sm:text-4xl md:text-5xl">
              Software is better
            </TypographyH1>
            <TypographyH1 className="text-3xl sm:text-4xl md:text-5xl">
              when developed by us
            </TypographyH1>
            <TypographyP className="text-zinc-700 dark:text-zinc-300 text-base sm:text-lg mt-4">
              We are a team of highly trained, skilled developers & designers.
              We create some of the
              <br className="hidden sm:block" /> best looking and most
              performant software out there for businesses on any budget.
            </TypographyP>
            <TypographyP className="mt-4 font-bold text-zinc-700 dark:text-zinc-300 text-sm sm:text-base">
              {version}
            </TypographyP>
          </div>
          <ThemeSwitcher theme={theme} setTheme={setTheme} />
        </div>
      </div>
    </>
  );
}
