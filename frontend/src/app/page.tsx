"use client"
import { ArrowRight, Globe } from "lucide-react";
import NavbarLanding from "@/components/landing/navbar";
import Link from "next/link";

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
                href="/sign-in"
                className="rounded-full bg-gray-900 px-6 py-3 text-sm font-medium text-white hover:bg-gray-800"
              >
                Get Started
              </Link>
              <Link
                href="/app"
                className="flex items-center gap-2 rounded-full border border-gray-200 px-6 py-3 text-sm font-medium hover:bg-gray-50"
              >
                <ArrowRight className="h-4 w-4" />
                Add Expense
              </Link>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-19">
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

          
        </section>
      </main>
    </div>
  );
}
