"use client";
import { AppHeader } from "@/components/header/app-header";
import { useAuth } from "@/lib/tokenVerify";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { set } from "react-hook-form";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const{ user }= useAuth();
  const router = useRouter();

  
    useEffect(() => {
      if (!user) {
        router.push("/sign-in");
      } else {
        router.push("/app/dashboard");
      }
      console.log("user", user);
    }, [user, router]);
 

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center"> 
          <h1 className="text-2xl font-bold">Loading...</h1>
          <p className="mt-2 text-gray-500">Please wait while we verify your session...</p>
        </div>
    </div>
    );
  }

  

  return (
    <div className="relative mx-auto flex min-h-screen w-full flex-col items-center justify-center gap-6 p-4">
      <AppHeader />
      <main className="z-10 flex w-full flex-1 flex-col items-start justify-center">
        {children}
      </main>
    </div>
  );
}
