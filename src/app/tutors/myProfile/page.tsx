"use client";

import React from "react";
import ProfileEntirePage from "@/components/tutorProfile/ProfileEntirePage";

export default function MyProfilePage(){
  return (
    <div className="flex">
      <main className="flex-grow">
        <ProfileEntirePage />
      </main>
    </div>
  );
}