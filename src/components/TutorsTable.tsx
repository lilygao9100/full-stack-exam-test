"use client";

import React, { useState } from "react";
import StarRanking from "./StarRanking";
import { FaHandPointer } from "react-icons/fa";
import TutorProfileDrawer from "./TutorProfileDrawer";
import { Tutor, TutorsTableProps } from "@/types/tutors";

const TutorsTable: React.FC<TutorsTableProps> = ({
  tutors,
  actionButton = null,
  onActionClick = () => {},
}) => {
  // State for currently selected tutor (opens profile drawer)
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);

  /**
   * Handles row click to view tutor profile
   * @param {Tutor} tutor - The tutor whose row was clicked
   */
  const handleRowClick = (tutor: Tutor) => {
    console.log("Row clicked for tutor:", tutor.name);
    setSelectedTutor(tutor);
  };

  /**
   * Handles action button clicks while preventing row click propagation
   * @param {React.MouseEvent} e - Mouse event
   * @param {Tutor} tutor - Associated tutor record
   */
  const handleActionClick = (e: React.MouseEvent, tutor: Tutor) => {
    e.stopPropagation();
    console.log("Action clicked for tutor:", tutor.name);
    setSelectedTutor(tutor);
  };

  /**
   * Calculates width percentage for progress bars
   * Caps the value at 100% to prevent overflow
   * @param {number} value - The raw value to convert
   * @returns {number} Percentage value (0-100)
   */
  const getProgressWidth = (value: number) => Math.min(100, value * 10);

  return (
    <div className="w-full overflow-auto border border-gray-200 rounded-lg">
      {/* Tutors Table */}
      <table className="table-auto w-full bg-white">
        {/* Table Header */}
        <thead className="bg-gray-800 text-white">
          <tr className="text-center">
            <th className="px-2 py-2">Name</th>
            <th className="px-2 py-2">Availability</th>
            <th className="px-2 py-2">Course</th>
            <th className="px-2 py-2">Skills</th>
            <th className="px-2 py-2">Rating</th>
            <th className="px-2 py-2">Chosen</th>
            <th className="px-2 py-2">Comments</th>
            <th className="px-2 py-2">Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="text-center">
          {tutors.map((tutor) => (
            <tr
              key={tutor.id}
              className="border-b hover:bg-gray-100 cursor-pointer transition-colors"
              onClick={() => handleRowClick(tutor)}
              title="View Profile"
            >
              {/* Tutor Name */}
              <td className="px-2 py-2">{tutor.name}</td>

              {/* Availability Status */}
              <td className="px-2 py-2">{tutor.availability}</td>

              {/* Course Information */}
              <td className="px-2 py-2">
                {tutor.appliedCourse.id} - {tutor.appliedCourse.name}
              </td>

              {/* Skills List */}
              <td className="px-2 py-2">
                {tutor.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs mr-1"
                  >
                    {skill}
                  </span>
                ))}
              </td>

              {/* Star Rating */}
              <td className="px-2 py-2">
                <StarRanking rating={tutor.rating} />
              </td>

              {/* Chosen By Metric with Progress Bar */}
              <td className="px-2 py-2">
                {tutor.chosenBy}
                <div
                  className="mt-1 h-1 bg-gray-200 rounded"
                  style={{ width: `${getProgressWidth(tutor.chosenBy)}%` }}
                ></div>
              </td>

              {/* Comments Metric with Progress Bar */}
              <td className="px-2 py-2">
                {tutor.commentedBy}
                <div
                  className="mt-1 h-1 bg-gray-200 rounded"
                  style={{ width: `${getProgressWidth(tutor.commentedBy)}%` }}
                ></div>
              </td>

              {/* Action Buttons */}
              <td className="px-2 py-2">
                <div className="flex justify-center items-center space-x-2">
                  {actionButton && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onActionClick(tutor);
                      }}
                      className="text-red-600 hover:text-red-800 transition-colors"
                      title={actionButton.label}
                    >
                      {actionButton.icon}
                    </button>
                  )}

                  {/* Rate/Comment Button */}
                  <button
                    type="button"
                    onClick={(e) => handleActionClick(e, tutor)}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                    title="Rate and Comment"
                  >
                    <FaHandPointer size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Tutor Profile Drawer (shown when tutor is selected) */}
      {selectedTutor && (
        <TutorProfileDrawer
          onClose={() => setSelectedTutor(null)}
          tutor={selectedTutor}
        />
      )}
    </div>
  );
};

export default TutorsTable;


