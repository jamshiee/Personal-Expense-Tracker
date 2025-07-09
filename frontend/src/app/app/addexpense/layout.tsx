import { Header } from "@/components/header/headers";
import { Shell } from "@/components/header/shell";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Shell className="relative flex flex-1 flex-col overflow-x-hidden">
      <Header
        title="Add Expense"
        description="Add your expenses and keep track of it."
      />
      <div
        className={cn("flex h-full flex-1 flex-col gap-6 md:gap-8")}
      >
        {children}
      </div>
    </Shell>
  );
}
