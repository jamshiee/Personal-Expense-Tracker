import { ArrowUpRight, Slash } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { UserNav } from "./user-nav";
import { AppTabs } from "./app-tabs";
import { Shell } from "./shell";
import Image from "next/image";

export  function AppHeader() {

  return (
    <header className="sticky top-2 z-50 w-full border-border">
      <Shell className="bg-background/70 px-3 py-3 backdrop-blur-lg md:px-6 md:py-3">
        <div className="flex w-full items-center justify-between">
            <div className="flex px-4 items-center">
          <Link href="/app" className="shrink-0">
        <Image
          src="/icon.png"
          alt="OpenStatus"
          height={30}
          width={30}
          className="rounded-full border border-border"
        />
      </Link>
          <Slash className="-rotate-12 mr-0.5 ml-2.5 h-4 w-4 text-muted-foreground" />
          <div className="w-40 font-bold text-xl text-primary">
            Finance Buddy
          </div>
          </div>

          <div className="flex items-center gap-1">
            <div className="relative">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="absolute inset-0">
                <UserNav />
              </div>
            </div>
          </div>
        </div>
        <AppTabs />
      </Shell>
    </header>
  );
}
