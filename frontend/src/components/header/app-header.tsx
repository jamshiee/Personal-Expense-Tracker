import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { UserNav } from "./user-nav";
import { Breadcrumbs } from "./breadcrumbs";
import { AppTabs } from "./app-tabs";
import { Shell } from "./shell";

export async function AppHeader() {

  return (
    <header className="sticky top-2 z-50 w-full border-border">
      <Shell className="bg-background/70 px-3 py-3 backdrop-blur-lg md:px-6 md:py-3">
        <div className="flex w-full items-center justify-between">
          <Breadcrumbs />

          <div className="flex items-center gap-1">
            <div className="relative">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="absolute inset-0">
                <UserNav />
              </div>
            </div>
          </div>
        </div>
        <AppTabs  />
      </Shell>
    </header>
  );
}
