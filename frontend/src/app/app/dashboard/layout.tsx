"use client";
import { Header } from "@/components/header/headers";
import { Shell } from "@/components/header/shell";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Shell className="relative flex flex-1 flex-col overflow-x-hidden">
      <Header
        title="Dashboard"
        description="Track your expense."
                actions={<Button onClick={()=>{redirect('/app/addexpense')}}>Add Expense</Button>}

      />
      <div
        className={cn("flex h-full flex-1 flex-col gap-6 md:gap-8")}
      >
        {children}
      </div>
    </Shell>
  );
}
