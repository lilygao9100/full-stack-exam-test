"use client";

import React from "react";
import Sidebar from "@/components/Sidebar"; 
import { ReactNode } from "react";

export default function TutorsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar userType="tutor"/>
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
}