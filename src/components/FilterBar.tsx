"use client";

import React, { useState, KeyboardEvent, useEffect, useRef } from "react";
import { FaTimes, FaSearch, FaClock, FaBookOpen, FaCode } from "react-icons/fa";

export interface FilterBarProps {
  searchName: string;
  setSearchName: (value: string) => void;
  availability: string;
  setAvailability: (value: string) => void;
  course: string;
  setCourse: (value: string) => void;
  skills: string[];
  setSkills: (value: string[]) => void;
}

/**
 * FilterBar component that provides filtering controls for tutor search
 * Includes filters for name, availability, course, and skills
 */
const FilterBar: React.FC<FilterBarProps> = ({
  searchName,
  setSearchName,
  availability,
  setAvailability,
  course,
  setCourse,
  skills,
  setSkills,
}) => {
  // State for skill input field  
  const [skillInput, setSkillInput] = useState("");

  // State for course search input and dropdown visibility
  const [courseSearch, setCourseSearch] = useState("");
  const [showCourseDropdown, setShowCourseDropdown] = useState(false);

  // Hardcoded courses list
  const courses = [
    { id: "COSC123", name: "Software Engineering" },
    { id: "COSC234", name: "Software Testing" },
    { id: "COSC934", name: "Cybersecurity Fundamentals"},
    { id: "COSC834", name: "Usibility Engineering"},
    { id: "COSC924", name: "Advanced Programming"}
  ];

  // Filter courses based on search input
  const filteredCourses = courses.filter((c) =>
    `${c.id} - ${c.name}`.toLowerCase().includes(courseSearch.toLowerCase())
  );

  // Ref for course dropdown to handle click outside
  const courseDropdownRef = useRef<HTMLDivElement>(null);

  /**
   * Effect to handle clicks outside the course dropdown
   * Closes the dropdown when clicking outside of it
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        courseDropdownRef.current &&
        !courseDropdownRef.current.contains(event.target as Node)
      ) {
        setShowCourseDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /**
   * Handles key down event for skill input
   * Adds skill to the list when Enter is pressed
   * @param {KeyboardEvent} e - Keyboard event from the input
   */
  const handleSkillKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && skillInput.trim() !== "") {
      e.preventDefault();
      const newSkill = skillInput.trim();
      if (!skills.includes(newSkill)) {
        console.log("Added skill:", newSkill);
        setSkills([...skills, newSkill]);
      }
      setSkillInput("");
    }
  };

  /**
   * Removes a skill from the selected skills list
   * @param {string} skillToRemove - Skill to be removed
   */
  const removeSkill = (skillToRemove: string) => {
    console.log("Removed skill:", skillToRemove);
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  /**
   * Clears the tutor name search field
   */
  const clearTutorName = () => {
    console.log("Clearing tutor name");
    setSearchName("");
  };

  /**
   * Clears the course selection
   */
  const clearCourse = () => {
    console.log("Clearing course");
    setCourse("");
    setCourseSearch("");
  };

  return (
    <div className="p-4 bg-white rounded border flex flex-wrap gap-4">
      {/* Tutor Name Search */}
      <div className="flex-1 min-w-[200px]">
        <label className=" text-sm mb-1 flex items-center">
          <FaSearch className="mr-1" />
          Tutor Name
        </label>
        <div className="relative">
          <input
            type="text"
            value={searchName}
            onChange={(e) => {
              console.log("Tutor Name changed:", e.target.value);
              setSearchName(e.target.value);
            }}
            placeholder="Search tutors..."
            className="w-full pl-8 py-1 border rounded focus:outline-none"
          />
          <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          {searchName && (
            <button
              onClick={clearTutorName}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              <FaTimes size={12} />
            </button>
          )}
        </div>
      </div>

      {/* Availability Filter */}
      <div className="flex-1 min-w-[150px]">
        <label className=" text-sm mb-1 flex items-center">
          <FaClock className="mr-1" />
          Availability
        </label>
        <select
          value={availability}
          onChange={(e) => {
            console.log("Availability changed:", e.target.value);
            setAvailability(e.target.value);
          }}
          className="w-full py-1 border rounded focus:outline-none"
        >
          <option value="">All</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Casual">Casual</option>
        </select>
      </div>

      {/* Course Filter */}
      <div className="flex-1 min-w-[200px] relative" ref={courseDropdownRef}>
        <label className=" text-sm mb-1 flex items-center">
          <FaBookOpen className="mr-1" />
          Course
        </label>
        <div className="relative">
          <input
            type="text"
            value={courseSearch || course}
            onChange={(e) => {
              console.log("Course search changed:", e.target.value);
              setCourseSearch(e.target.value);
              setShowCourseDropdown(true);
            }}
            onFocus={() => setShowCourseDropdown(true)}
            placeholder="Search courses..."
            className="w-full pl-8 py-1 border rounded focus:outline-none"
          />
          <FaBookOpen className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          {(courseSearch || course) && (
            <button
              onClick={clearCourse}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              <FaTimes size={12} />
            </button>
          )}
        </div>
        {showCourseDropdown && (
          <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow max-h-40 overflow-y-auto">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((c) => (
                <div
                  key={c.id}
                  className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    const courseValue = `${c.id} - ${c.name}`;
                    console.log("Course selected:", courseValue);
                    setCourse(courseValue);
                    setCourseSearch(courseValue);
                    setShowCourseDropdown(false);
                  }}
                >
                  {c.id} - {c.name}
                </div>
              ))
            ) : (
              <div className="px-3 py-1 text-gray-500">No courses found</div>
            )}
          </div>
        )}
      </div>

      {/* Skills Filter */}
      <div className="flex-1 min-w-[250px]">
        <label className=" text-sm mb-1 flex items-center">
          <FaCode className="mr-1" />
          Skills
        </label>
        <div className="flex items-center flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="flex items-center bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
            >
              {skill}
              <button
                onClick={() => removeSkill(skill)}
                className="ml-1 text-gray-600"
              >
                <FaTimes size={10} />
              </button>
            </span>
          ))}
          <div className="relative flex-grow min-w-[120px]">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => {
                console.log("Skill input changed:", e.target.value);
                setSkillInput(e.target.value);
              }}
              onKeyDown={handleSkillKeyDown}
              placeholder={skills.length ? "Add more..." : "Type skill + Enter"}
              className="w-full pl-2 py-1 border rounded focus:outline-none"
            />
            {skillInput && (
              <button
                onClick={() => setSkillInput("")}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                <FaTimes size={12} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
