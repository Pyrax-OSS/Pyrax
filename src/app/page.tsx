import DashboardLayout from "@/components/DashboardLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import {
  TypographyH1,
  TypographyH2,
  TypographyH4,
  TypographyP,
  TypographySmall,
  TypographyMuted,
} from "@/components/Typography.js";
import Card from "@/components/Card.js";
import Button from "@/components/Button.js";
import { ChartPieIcon } from "@heroicons/react/24/solid";

export default function ServersDashboard() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="bg-[#fafafa] dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/50 rounded-lg w-full h-full p-8">
          <TypographyH1 className="mb-6 dark:text-zinc-50 !text-4xl">
            Welcome back, Fraser! 👋
          </TypographyH1>

          <div className="bg-zinc-950/5 dark:bg-zinc-800/10 text-sm rounded-lg p-1 dark:p-1.5">
            <TypographySmall className="flex items-center gap-2 font-semibold text-zinc-500 dark:text-zinc-400 ml-1 mb-1.5 mt-1">
              <ChartPieIcon className="w-4 h-4 text-black/40" />
              Your Account Overview
            </TypographySmall>
            <div className="grid grid-cols-3 mt-1 gap-1 dark:gap-1.5">
              {[
                {
                  title: "Active Licenses",
                  used: "1",
                  percent: "Renewal in 4 days",
                },
                {
                  title: "Support Tickets",
                  used: "1 Open",
                  percent: "Needs attention",
                },
                {
                  title: "Purchases",
                  used: "2",
                  percent: "Buy 1 more for 50% off",
                },
              ].map((res) => (
                <Card key={res.title}>
                  <div className="flex items-center mb-8">
                    <TypographyH4 className="dark:text-zinc-100">
                      {res.title}
                    </TypographyH4>
                  </div>
                  <TypographyP className="font-bold dark:text-zinc-100">
                    {res.used}
                  </TypographyP>
                  <TypographyMuted className="text-zinc-600 dark:text-zinc-400">
                    {res.percent}
                  </TypographyMuted>
                </Card>
              ))}
            </div>
          </div>

          <div className="mt-6 w-full">
            <TypographyH2 className="mb-1 dark:text-zinc-50 border-none pb-0">
              Support
            </TypographyH2>
            <TypographyMuted className="text-zinc-500 dark:text-zinc-400">
              Manage tickets and contact our team
            </TypographyMuted>

            <Card className="border-dashed p-8 mt-6">
              <TypographyH4 className="text-zinc-800 dark:text-zinc-200 mb-2">
                No open tickets
              </TypographyH4>
              <TypographyMuted className="text-zinc-700 dark:text-zinc-400">
                You can create a new support request if you need assistance
              </TypographyMuted>
              <div className="mt-4">
                <Button>Create Ticket</Button>
              </div>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
