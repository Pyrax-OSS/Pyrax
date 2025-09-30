import { HomeIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import banner from "@/assets/text.png";
import type { Theme } from "@/utils/theme";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { TypographySmall } from "@/components/Typography";
import Dropdown from "@/components/Dropdown";

interface DashboardSidebarProps {
  sidebarOpen: boolean;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export default function DashboardSidebar({ sidebarOpen, theme, setTheme }: DashboardSidebarProps) {
  return (
    <div
      className={`fixed sm:static z-30 inset-y-0 left-0 transform sm:translate-x-0 transition-transform duration-200 ease-in-out w-64 flex flex-col p-4 bg-white dark:bg-zinc-950 sm:bg-transparent sm:dark:bg-transparent ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="sticky top-4 w-full hidden sm:block">
        <img src={banner} className="invert dark:invert-0 w-auto h-4 ml-1" />
        <div className="w-full mt-6">
          <TypographySmall className="text-zinc-500 ml-1 dark:text-zinc-500">
            IMPORTANT
          </TypographySmall>
          <button className="w-full flex items-center gap-2 cursor-pointer text-sm mt-2 p-1 border border-zinc-300 dark:border-zinc-800 dark:text-zinc-100 rounded-lg bg-white dark:bg-zinc-900/50 font-semibold hover:dark:bg-zinc-800/50 hover:bg-zinc-200 transition-colors">
            <HomeIcon className="w-4 h-4 ml-2 stroke-2" />
            Dashboard
          </button>
        </div>
      </div>

      <div className="flex-1" />

      <Dropdown
        className="sticky bottom-4 w-full"
        contentClassName="text-center"
        trigger={(isOpen) => (
          <button className="w-full flex flex-row items-center p-2 rounded-lg transition-all cursor-pointer group">
            <img
              src="https://media.discordapp.net/attachments/1358462813231775976/1422670875139768441/criminal-puppy.png?ex=68dd8500&is=68dc3380&hm=53efb071ffdfd7f92927a6f78f6f6692fd9ebcc23737ccb4fe76a69aacce3be8&=&format=webp&quality=lossless&width=838&height=996"
              className="w-8 h-8 rounded-lg"
              alt="User avatar"
            />
            <div className="flex flex-col ml-3 gap-0.5 flex-1 text-left">
              <TypographySmall className="font-semibold text-zinc-800 dark:text-zinc-100">
                Fraser Griffiths
              </TypographySmall>
              <p className="text-zinc-500 !text-[11px] uppercase dark:text-zinc-400">
                hi.lydon@gmail.com
              </p>
            </div>
            <ChevronUpIcon
              className={`w-4 h-4 stroke-2 text-zinc-400 dark:text-zinc-500 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        )}
      >
        <ThemeSwitcher theme={theme} setTheme={setTheme} />
      </Dropdown>
    </div>
  );
}
