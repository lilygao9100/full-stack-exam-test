"use client";
import React, {useState, useEffect} from "react";
import {Course, capitaliseFirstLetter} from "@/types/course";
import { useRouter } from "next/navigation";
import { jobLists } from "../types/jobList";

/**
 * This component displays a welcome message, today's date, and a grid of available course jobs.
 * Users can view more courses by clicking "View More" or clicking on a specific course card.
 */
const TutorDashboard: React.FC = () => {
  const router = useRouter();

  // Only display the first four courses on the dashboard
  const firstFour: Course[] = jobLists.slice(0, 4);

  // User can view more courses by clicking the link/arrow icon
  const handleViewMore = () => {
    router.push("/tutor/findJob");
  };

  // For today's date 
  const [today, setToday] = useState('');

  useEffect(() => {
    const formattedDate = new Date().toLocaleDateString("en-GB", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    setToday(formattedDate);
  }, []);

  return (
    <div className="p-6">
      {/* Top Row */}
      <div className="flex justify-between items-start w-full mb-8 pt-4 p-4">
        {/* Left side (vertical stack of texts) */}
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold">Welcome</h1>
          <p className="text-lg">
            Here are some available courses. To see more, click "View More.
          </p>
        </div>
        {/* Right side: current date */}
        <div className="text-right text-gray-800">
          <p className="text-xl p-4">{today || "Loading date..."}</p>
        </div>
      </div>

      {/* Bottom Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-10 p-4" >
          {firstFour.map((course) => {
            const courseName = capitaliseFirstLetter(course.courseName);
            return (
              <div
                key={course.courseCode}
                className="
                    bg-white 
                    shadow-md 
                    rounded-lg 
                    p-4 
                    cursor-pointer 
                    hover:shadow-lg 
                    transition-shadow"
                onClick={handleViewMore}
              >
                <div>
                  <p><strong></strong> {course.courseCode}</p>
                  <h2 className="text-xl font-semibold mb-2">{courseName}</h2>
                  <div className="mt-4 flex items-center justify-between">
                    <p>
                      <strong></strong> 
                      {course.jobVacancy} jobs available
                    </p>
                    {/* An arrow icon or button to "View More" or "Apply" */}
                    <button 
                      onClick={handleViewMore} 
                      className="text-purple-500 hover:text-purple-700"
                      title="View More"
                    >
                      ➜
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* "View More" button for user to see more, directs them to [Find job] page*/}
          {jobLists.length > 4 && (
            <div className="mt-6 p-4 items-end justify-end">
              <button
                onClick={handleViewMore}
                className="
                      inline-flex
                      items-center
                      bg-cyan-700 
                      text-white 
                      px-4 py-2 
                      rounded 
                      hover:bg-cyan-900"
              >
                View More
                <span className="ml-5"> → </span>
              </button>
            </div>
          )}
    </div>

  );
};

export default TutorDashboard;