"use client";

import React from "react";
import { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";


export default function Layout({ children }: { children: ReactNode }) {
  console.log("[Lecturer Layout] rendered with children");
  return (
    <div className="flex min-h-screen">
      <Sidebar userType="lecturer" />
      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
}