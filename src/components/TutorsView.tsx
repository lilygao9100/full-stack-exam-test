"use client";

import React, { useState } from "react";
import FilterBar from "./FilterBar";
import TutorsTable from "./TutorsTable";
import { Tutor } from '@/types/tutors';
import { FaSort, FaSortUp, FaSortDown, FaStar, FaUserCheck, FaComment, FaTimes } from "react-icons/fa";

interface SortConfig {
  column: keyof Tutor | null;
  direction: "asc" | "desc";
}

interface TutorsViewProps {
  tutors: Tutor[];
  context?: 'dashboard' | 'selection';
  onActionClick?: (tutor: Tutor) => void;
}

/**
 * TutorsView component - Main view for displaying and managing tutor listings
 * Features filtering, sorting, and context-specific actions
 */
const TutorsView: React.FC<TutorsViewProps> = ({ 
  tutors, 
  context = 'dashboard',
  onActionClick = () => {} 
}) => {
    console.log(`[TutorsView] Rendering ${context} with`, tutors.length, 'tutors');
  // Filter state management
  const [searchName, setSearchName] = useState("");
  const [availability, setAvailability] = useState("");
  const [course, setCourse] = useState("");
  const [skills, setSkills] = useState<string[]>([]);

  // Sorting state
  const [sortConfig, setSortConfig] = useState<SortConfig>({ column: null, direction: "asc" });

  /**
   * Filters tutors based on the current context
   * - Dashboard context shows all unselected tutors
   * - Selection context shows only selected tutors
   */
  const contextFilteredTutors = tutors.filter(tutor => 
    context === 'dashboard' ? !tutor.selected : tutor.selected
  );

  /**
   * Applies all active filters to the tutor list
   * - Name search (partial match)
   * - Availability (exact match)
   * - Course (matches ID, name, or full display string)
   * - Skills (must include all selected skills)
   */
  let filteredTutors = contextFilteredTutors.filter((tutor) => {
    const nameMatch = tutor.name.toLowerCase().includes(searchName.toLowerCase());
    const availabilityMatch = availability === "" || tutor.availability === availability;
    const courseMatch = course === "" || 
      tutor.appliedCourse.name === course || 
      tutor.appliedCourse.id === course ||
      `${tutor.appliedCourse.id} - ${tutor.appliedCourse.name}` === course;
    const skillsMatch = skills.length === 0 || skills.every((skill) => tutor.skills.includes(skill));
    return nameMatch && availabilityMatch && courseMatch && skillsMatch;
  });

  /**
   * Applies all active filters to the tutor list
   * - Name search (partial match)
   * - Availability (exact match)
   * - Course (matches ID, name, or full display string)
   * - Skills (must include all selected skills)
   */
  if (sortConfig.column !== null) {
    filteredTutors = [...filteredTutors].sort((a, b) => {
      if (a[sortConfig.column!] < b[sortConfig.column!]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.column!] > b[sortConfig.column!]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }

  // Action button configuration based on context
  const actionButton = context === 'selection' 
    ? { icon: <FaTimes size={16} />, label: 'Remove from selection' }
    : null;

  /**
   * Handles column sorting
   * Toggles direction if same column is clicked again
   * @param {keyof Tutor} column - Column to sort by
   */
  const handleSort = (column: keyof Tutor) => {
    setSortConfig(prev => ({
      column,
      direction: prev.column === column && prev.direction === "asc" ? "desc" : "asc"
    }));
  };

  /**
   * Displays appropriate sort icon based on current sort state
   * @param {Object} props - Component props
   * @param {keyof Tutor} props.column - Column this icon represents
   */
  const SortIcon = ({ column }: { column: keyof Tutor }) => {
    if (sortConfig.column !== column) return <FaSort className="ml-1 text-gray-400" />;
    return sortConfig.direction === "asc" 
      ? <FaSortUp className="ml-1 text-purple-600" /> 
      : <FaSortDown className="ml-1 text-purple-600" />;
  };

  return (
    <div className="p-6">
      {/* Filter Bar Component */}
      <FilterBar
        searchName={searchName}
        setSearchName={setSearchName}
        availability={availability}
        setAvailability={setAvailability}
        course={course}
        setCourse={setCourse}
        skills={skills}
        setSkills={setSkills}
      />
      
    {/* Sort Controls */}
    <div className="mt-4 mb-3 flex items-center gap-3">
    <span className="text-sm font-semibold">Sort by:</span>
    <div className="flex items-center gap-2">
        {/* Rating Sort Button */}
        <button
        onClick={() => handleSort("rating")}
        className="flex items-center text-sm px-2 py-1 border rounded"
        >
        <FaStar className="mr-1" />
        Rating
        <SortIcon column="rating" />
        </button>

        {/* Chosen By Sort Button */}
        <button
        onClick={() => handleSort("chosenBy")}
        className="flex items-center text-sm px-2 py-1 border rounded"
        >
        <FaUserCheck className="mr-1" />
        Chosen
        <SortIcon column="chosenBy" />
        </button>

        {/* Comments Sort Button */}
        <button
        onClick={() => handleSort("commentedBy")}
        className="flex items-center text-sm px-2 py-1 border rounded"
        >
        <FaComment className="mr-1" />
        Comments
        <SortIcon column="commentedBy" />
        </button>
    </div>
    </div>

      {/* Tutors Table Component */}
      <TutorsTable 
        tutors={filteredTutors} 
        actionButton={actionButton}
        onActionClick={onActionClick}
      />
    </div>
  );
};

export default TutorsView;