"use client";
import TutorsView from '@/components/TutorsView';
import { sampleTutors } from '@/types/tutors';
import React from "react";

const LecturerDashboard = () => {
    console.log("[LecturerDashboard] rendered with", sampleTutors.length, "sample tutors");
  return (
    <div className="flex-1 p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Tutor Applications</h1>
      <TutorsView tutors={sampleTutors} />
    </div>
  );
};

export default LecturerDashboard;