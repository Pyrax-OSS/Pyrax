import Card from "@/components/Card";
import { TypographyP, TypographySmall } from "@/components/Typography";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import Button from "@/components/Button";
import { useState } from "react";
import InputField from "@/components/Input";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import type { Theme } from "@/utils/theme";
import { getStoredTheme } from "@/utils/theme";

export default function AuthenticationDashboard() {
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState<Theme>(getStoredTheme);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert(isRegister ? "Registered!" : "Logged in!");
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-100 dark:bg-[#0a0a0b]">
      <div className="bg-zinc-950/5 dark:bg-zinc-800/10 text-sm rounded-lg p-1 dark:p-1.5">
        <TypographySmall className="flex items-center gap-2 font-semibold text-zinc-500 dark:text-zinc-400 ml-1 mb-1.5 mt-1">
          <LockClosedIcon className="w-4 h-4 text-black/40 dark:text-zinc-400" />
          {isRegister ? "Register Account" : "Authentication Required"}
        </TypographySmall>

        <Card className="p-6 flex flex-col w-[420px]">
          <h2 className="font-semibold text-2xl dark:text-zinc-100">
            {isRegister ? "Create your account" : "Welcome home"}
          </h2>
          <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300 mb-4">
            {isRegister
              ? "Sign up to access the Pyrax dashboard"
              : "Sign in to the Pyrax dashboard"}
          </p>

          {isRegister && (
            <>
              <InputField label="Full Name" type="text" />
              <InputField label="Username" type="text" />
            </>
          )}

          <InputField label="Email" type="email" />
          <InputField label="Password" type="password" />

          <Button
            className="w-full bg-black text-white text-center justify-center"
            onClick={handleSubmit}
            loading={loading}
          >
            {isRegister ? "Register" : "Login"}
          </Button>

          <TypographyP className="text-sm text-zinc-500 dark:text-zinc-400 text-left mt-2">
            {isRegister ? (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setIsRegister(false)}
                  className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                >
                  Login
                </button>
              </>
            ) : (
              <>
                No account?{" "}
                <button
                  onClick={() => setIsRegister(true)}
                  className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                >
                  Register
                </button>
              </>
            )}
          </TypographyP>
        </Card>
      </div>
      <footer className="fixed bottom-0 left-0 p-4">
        <ThemeSwitcher theme={theme} setTheme={setTheme} />
      </footer>
    </div>
  );
}
