import NavbarLanding from "@/components/navbar";
import { ArrowRight, Github, Globe } from "lucide-react";
import Link from "next/link";

export default async function HomePage() {
  return (
    <div className="container mx-auto p-4">
      <NavbarLanding />

      <main className="flex-1">
        <section className="container mx-auto px-4 py-16 text-center md:py-24">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 inline-flex items-center rounded-full border border-gray-200 px-3 py-1 text-sm">
              <span className="mr-2">Personal Finance Made Simple</span>
              <ArrowRight className="h-3 w-3" />
            </div>

            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
              Take Control of Your Expenses
            </h1>

            <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-600">
              Track your spending, set budgets, and visualize your financial habits—all in one place. Start your journey to better money management today.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="#"
                className="rounded-full bg-gray-900 px-6 py-3 text-sm font-medium text-white hover:bg-gray-800"
              >
                Start Tracking Now
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 rounded-full border border-gray-200 px-6 py-3 text-sm font-medium hover:bg-gray-50"
              >
                <Github className="h-4 w-4" />
                View on GitHub
              </Link>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-4xl rounded-xl bg-gray-50 p-8 md:p-12">
            <div className="text-center mb-10">
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-white">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold md:text-3xl">
                Why Use Expense Tracker?
              </h2>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2 space-y-6">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-white">
                    <Globe className="h-3 w-3" />
                  </div>
                  <div>
                    <h3 className="font-medium">Visualize Your Spending</h3>
                    <p className="text-gray-600 mt-1">
                      Get clear charts and insights into where your money goes every month.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-white">
                    <ArrowRight className="h-3 w-3" />
                  </div>
                  <div>
                    <h3 className="font-medium">Set Budgets & Goals</h3>
                    <p className="text-gray-600 mt-1">
                      Stay on track with custom budgets and savings goals tailored to your needs.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-white">
                    <Github className="h-3 w-3" />
                  </div>
                  <div>
                    <h3 className="font-medium">Open Source & Secure</h3>
                    <p className="text-gray-600 mt-1">
                      Your data stays private. The code is open for anyone to review and contribute.
                    </p>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="aspect-square w-full max-w-xs mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-6xl">💸</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
