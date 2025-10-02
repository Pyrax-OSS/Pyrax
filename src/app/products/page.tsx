import DashboardLayout from "../../components/DashboardLayout";
import {
  TypographyH1,
  TypographyH2,
  TypographyH4,
  TypographyP,
  TypographySmall,
  TypographyMuted,
} from "../../components/Typography";
import Card from "../../components/Card";
import Button from "../../components/Button";
import { CurrencyPoundIcon } from "@heroicons/react/24/solid";

export default function ProductsDashboard() {
  return (
    <DashboardLayout>
      <div className="bg-[#fafafa] dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/50 rounded-lg w-full h-full p-8">
        <TypographyH1 className="mb-6 dark:text-zinc-50 !text-4xl">
          Our Products
        </TypographyH1>

        <div className="bg-zinc-950/5 dark:bg-zinc-800/10 text-sm rounded-lg p-1 dark:p-1.5">
          <TypographySmall className="flex items-center gap-2 font-semibold text-zinc-500 dark:text-zinc-400 ml-1 mb-1.5 mt-1">
            <CurrencyPoundIcon className="w-4 h-4 text-black/40" />
            Featured Software Solutions
          </TypographySmall>
          <div className="grid grid-cols-3 mt-1 gap-1 dark:gap-1.5">
            {[
              {
                title: "hardcoded1",
                desc: "blablablblal",
                price: "$25 / license",
              },
              {
                title: "hardcoded2",
                desc: "blablablblal",
                price: "$15 / license",
              },
              {
                title: "hardcoded3",
                desc: "blablablblal",
                price: "$10 / license",
              },
            ].map((res) => (
              <Card
                key={res.title}
                className="p-6 flex flex-col justify-between"
              >
                <div>
                  <TypographyH4 className="dark:text-zinc-100 mb-2">
                    {res.title}
                  </TypographyH4>
                  <TypographyP className="dark:text-zinc-300 mb-4">
                    {res.desc}
                  </TypographyP>
                </div>
                <div>
                  <TypographyMuted className="block text-zinc-600 dark:text-zinc-400 mb-2">
                    {res.price}
                  </TypographyMuted>
                  <Button>Add to Cart</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-6 w-full">
          <TypographyH2 className="mb-1 dark:text-zinc-50 border-none pb-0">
            Coming Soon
          </TypographyH2>
          <TypographyMuted className="text-zinc-500 dark:text-zinc-400">
            New tools and platforms in development
          </TypographyMuted>

          <Card className="border-dashed p-8 mt-6">
            <TypographyH4 className="text-zinc-800 dark:text-zinc-200 mb-2">
              No new releases yet
            </TypographyH4>
            <TypographyMuted className="text-zinc-700 dark:text-zinc-400">
              Stay tuned for exciting new projects and software launches
            </TypographyMuted>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
