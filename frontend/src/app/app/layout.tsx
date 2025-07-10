"use client";
import { AppHeader } from "@/components/header/app-header";
import { useAuth } from "@/lib/tokenVerify";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [userData, setUserData] = useState();
  const { user, loading } = useAuth();
  console.log("user", user);
  useEffect(() => {
    if (!user) {
      router.push("/sign-in");
    }
  }, []);

  if (loading)
    return (
      <div>
        <h1 className="text-2xl font-bold text-center">Loading...</h1>
        <p className="text-center">Please wait while we fetch your data.</p>
      </div>
    );

  return (
    <div className="relative mx-auto flex min-h-screen w-full flex-col items-center justify-center gap-6 p-4">
      <AppHeader />
      <main className="z-10 flex w-full flex-1 flex-col items-start justify-center">
        {children}
      </main>
    </div>
  );
}
