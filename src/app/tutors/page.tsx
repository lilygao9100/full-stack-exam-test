"use client";

import React from "react";
import TutorDashboard from "../../components/TutorDashboard";


const TutorsPage = () => {
  return (
    <div className="flex">
      <main className="flex-grow">
        <TutorDashboard />
      </main>
    </div>
  );
};

export default TutorsPage;
