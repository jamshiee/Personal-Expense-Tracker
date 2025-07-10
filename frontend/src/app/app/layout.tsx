"use client";
import { AppHeader } from "@/components/header/app-header";
import ProtectedRoute from "@/components/ProtectedRoute";
import React from "react";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute>
      <div className="relative mx-auto flex min-h-screen w-full flex-col items-center justify-center gap-6 p-4">
        <AppHeader />
        <main className="z-10 flex w-full flex-1 flex-col items-start justify-center">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
