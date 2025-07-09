"use client"
import { ArrowRight, Globe } from "lucide-react";
import NavbarLanding from "@/components/landing/navbar";
import Link from "next/link";
import { useEffect } from "react";
import { useTokenValid } from "@/lib/tokenVerify";

export default function HomePage() {

 
  return (
    <div className="container mx-auto p-4">
      <NavbarLanding />

      <main className="flex-1">
        <section className="container mx-auto px-4 py-16 text-center md:py-24">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 inline-flex items-center rounded-full border border-gray-200 px-3 py-1 text-sm">
              <span className="mr-2">Proudly Open Source</span>
              <ArrowRight className="h-3 w-3" />
            </div>

            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
              Take control of your finances.
            </h1>

            <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-600">
              Track your expenses, categorize spending, and gain insights into your financial habits with our modern expense tracker.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/app/dashboard"
                className="rounded-full bg-gray-900 px-6 py-3 text-sm font-medium text-white hover:bg-gray-800"
              >
                Get Started
              </Link>
              <Link
                href="/app/addexpense"
                className="flex items-center gap-2 rounded-full border border-gray-200 px-6 py-3 text-sm font-medium hover:bg-gray-50"
              >
                <ArrowRight className="h-4 w-4" />
                Add Expense
              </Link>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h2 className="text-sm font-medium text-gray-500 mb-12">
              Trusted by thousands
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
              <div className="flex items-center gap-1">
                <div className="font-bold">Personal</div>
                <ArrowRight className="h-3 w-3" />
              </div>
              <div className="flex items-center gap-1">
                <div className="font-medium">Business</div>
                <ArrowRight className="h-3 w-3" />
              </div>
              <div className="flex items-center gap-1">
                <div className="font-medium">Students</div>
                <ArrowRight className="h-3 w-3" />
              </div>
              <div className="flex items-center gap-1">
                <div className="font-bold">Families</div>
                <ArrowRight className="h-3 w-3" />
              </div>
            </div>
          </div>

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
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold md:text-3xl">
                Smart Expense Tracking
              </h2>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2">
                <div className="aspect-square w-full max-w-xs mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl"></div>
              </div>
              <div className="md:w-1/2 space-y-6">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-white">
                    <Globe className="h-3 w-3" />
                  </div>
                  <div>
                    <h3 className="font-medium">Category Insights</h3>
                    <p className="text-gray-600 mt-1">
                      Automatically categorize your expenses and get insights into your spending patterns with detailed analytics.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
