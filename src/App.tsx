import { TypographyH1, TypographyP } from "@/components/Typography"
import ThemeToggle from "@/components/ThemeToggle"

export default function App() {
  return (
    <div className="bg-white text-black dark:bg-zinc-950 dark:text-white h-screen flex items-center justify-center transition-colors duration-300">
      <div className="text-center max-w-4xl px-6">
        <div className="mb-8">
          <TypographyH1>Software is better</TypographyH1>
          <TypographyH1>when developed by us</TypographyH1>
        </div>
        <div className="mt-4">
          <TypographyP className="text-zinc-700 dark:text-zinc-300 text-lg">
            We are a team of highly trained, skilled developers & designers. We
            create some of the
            <br /> best looking and most performant software out there for
            businesses on any budget.
          </TypographyP>
        </div>
      </div>

      <ThemeToggle />
    </div>
  )
}
