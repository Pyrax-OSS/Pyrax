import Card from "@/components/Card";
import { TypographyP, TypographySmall } from "@/components/Typography";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import Button from "@/components/Button";
import { useState } from "react";
import InputField from "@/components/Input";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import type { Theme } from "@/utils/theme";
import { getStoredTheme } from "@/utils/theme";
import { authClient } from "../../../lib/auth-client";

export default function AuthenticationDashboard() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState<Theme>(getStoredTheme);

  const handleSendOTP = async () => {
    setLoading(true);
    try {
      await authClient.emailOtp.sendVerificationOtp({
        email,
        type: "sign-in",
      });
      setStep("otp");
    } catch (error) {
      console.error("Failed to send OTP:", error);
      alert("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setLoading(true);
    try {
      await authClient.signIn.emailOtp({
        email,
        otp,
      });
      window.location.href = "/app";
    } catch (error) {
      console.error("Failed to verify OTP:", error);
      alert("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-100 dark:bg-[#0a0a0b]">
      <div className="bg-zinc-950/5 dark:bg-zinc-800/10 text-sm rounded-lg p-1 dark:p-1.5">
        <TypographySmall className="flex items-center gap-2 font-semibold text-zinc-500 dark:text-zinc-400 ml-1 mb-1.5 mt-1">
          <LockClosedIcon className="w-4 h-4 text-black/40 dark:text-zinc-400" />
          {step === "email" ? "Email Authentication" : "Enter OTP"}
        </TypographySmall>

        <Card className="p-6 flex flex-col w-[420px]">
          <h2 className="font-semibold text-2xl dark:text-zinc-100">
            {step === "email" ? "Welcome home" : "Verify your email"}
          </h2>
          <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300 mb-4">
            {step === "email"
              ? "Sign in to the Pyrax dashboard with email OTP"
              : `We sent a code to ${email}`}
          </p>

          {step === "email" ? (
            <>
              <InputField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Button
                className="w-full bg-black text-white text-center justify-center"
                onClick={handleSendOTP}
                loading={loading}
                disabled={!email}
              >
                Send OTP
              </Button>
            </>
          ) : (
            <>
              <InputField
                label="One-Time Password"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit code"
                maxLength={6}
              />

              <Button
                className="w-full bg-black text-white text-center justify-center"
                onClick={handleVerifyOTP}
                loading={loading}
                disabled={!otp || otp.length !== 6}
              >
                Verify & Sign In
              </Button>

              <TypographyP className="text-sm text-zinc-500 dark:text-zinc-400 text-center mt-2">
                <button
                  onClick={() => setStep("email")}
                  className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                >
                  Use different email
                </button>
              </TypographyP>
            </>
          )}
        </Card>
      </div>
      <footer className="fixed bottom-0 left-0 p-4">
        <ThemeSwitcher theme={theme} setTheme={setTheme} />
      </footer>
    </div>
  );
}
