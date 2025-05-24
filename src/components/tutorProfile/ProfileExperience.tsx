"use client";
import React, {useState, useEffect} from 'react';
import { useFormValidation } from '@/hook/useFormValidation';
import ValidationMessage from '../ValidationMessage';
import EditDialog from '../EditDialog';
import {AvailableType, RoleType} from "../../types/profile";
import Image from "next/image";

// Interface defining the shape of experience objects
export interface Experiences {
  experienceID: number,
  previousRole: RoleType;
  previousCourseName: string;
  jobType: AvailableType;
  startDate?: string;
  endDate?: string;
};

// Validation rules for the form with custom validation for each field
const validationRules = {
  previousRole: {
    required: true,
    custom: (value: RoleType) => ["Tutor", "Lab assistant"].includes(value)
  },
  previousCourseName: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z0-9\s]+$/
  },
  jobType: {
    required: true,
    custom: (value: AvailableType) => ["Full-Time", "Part-Time"].includes(value)
  },
  startDate: {
    required: true,
  },
  endDate: {
    required: true,
  }
};

// Utility to convert YYYY-MM-DD to DD-MM-YYYY
const convertDateToDDMMYYYY = (dateStr: string): string => {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-");
  return `${day}-${month}-${year}`;
};

const generateID = () => Number(`${Date.now()}${Math.floor(Math.random() * 1000)}`);

interface ExperiencesSectionProps {
  experiences: Experiences[];
  onSave: (experiences: Experiences[]) => void;
};

// Component for managing and displaying a list of experiences
const ExperiencesSection: React.FC<ExperiencesSectionProps> = ({ 
  experiences, 
  onSave 
}) => {
  // State management
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  // Initial form state
  const initialExperienceState: Experiences = {
    experienceID: generateID(),
    previousRole: "Tutor",
    previousCourseName: "",
    jobType: "Full-Time",
    startDate: "",
    endDate: ""
  };

  // Custom form validation hook
  const { 
    values, 
    setValues, 
    errors, 
    handleChange, 
    handleBlur, 
    isValid,
    computedValidity 
   } 
  = useFormValidation<Experiences>(initialExperienceState, validationRules);

  // Set form values when editing an existing experience
  useEffect(() => {
    if (editIndex !== null && experiences[editIndex]) {
      setValues(experiences[editIndex]);
    }
  }, [editIndex, experiences, setValues]);

  // Handle edit experience
  const handleEdit = (index: number) => {
    setEditIndex(index);
    setIsEditing(true);
  }
  // Handle add new experience
  const handleAddNew = () => {
    setEditIndex(null);
    setValues(initialExperienceState);
    setIsEditing(true);
  };

  // Handle close dialog
  // Reset the edit index and close the dialog
  const handleCloseDialog = () => {
    setIsEditing(false);
    setEditIndex(null);
    setValues(initialExperienceState);
  };

  // Handle deleting experience from the list
  const handleDelete = (index: number) => {
    const newExperiences = experiences.filter((_, i) => i !== index);
    onSave(newExperiences);
  };

  // Handle Save and form submission
  const handleSave = () => {
    if (isValid()) {
      // Convert dates before saving
      const convertedValues = {
        ...values,
        startDate: values.startDate ? convertDateToDDMMYYYY(values.startDate) : "",
        endDate: values.endDate ? convertDateToDDMMYYYY(values.endDate) : ""
      };

      const newExperiences = [...experiences];
      if (editIndex !== null) {
        // Update existing experience
        newExperiences[editIndex] = { 
          ...convertedValues, 
          experienceID: experiences[editIndex].experienceID };
      } else {
        // Add new experience
        newExperiences.push({ 
          ...convertedValues, 
          experienceID: generateID() });
      }
      onSave(newExperiences);
      handleCloseDialog();
    }
  };

  return(
    <div className="bg-white border border-gray-200 p-4 my-4">
      {/* Header with the add button */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl p-2 font-semibold">Experiences</h2>
        <button
            className="border bg-gray-600 border-gray-600 p-2 rounded hover:bg-gray-800"
            onClick={handleAddNew}
        >
          <Image
            src="/Images/edit-icon.png"
            alt="Edit"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        </button>
      </div>

      {/* Experiences list */}
      {experiences.map((experience, index) => (
        <div 
          key={experience.experienceID} 
          className="mb-4 p-2 border-b border-gray-200 flex justify-between items-start group relative"
          > 
          {/* Experience details */}
          <div className='pr-8'>
          <h3 className="text-lg font-semibold"> {experience.previousCourseName} </h3>
            <p className='font-semibold'>
              {experience.jobType} {experience.previousRole}
            </p>
            <p>
            Start time: {experience.startDate} - End time: {experience.endDate}
            </p>
          </div>

          {/* Edit button */}
          <button
            className="text-blue-600 text-sm mt-1 hover:text-purple-800"
            onClick={() => handleEdit(index)}
          >
            Edit
          </button>
        </div>
      ))}

      {/* Reusing dialog to add or edit experience */}
      <EditDialog
        isOpen={isEditing}
        onClose={handleCloseDialog}
        onSave={handleSave}
        title={editIndex !== null ? "Edit Experience" : "Add Experience"}
      >
        <div className="space-y-4">
          {/* If editing, show the delete button in the dialog's top-right corner */}
          {editIndex !== null && (
            <button
              className="absolute top-4 right-4 p-2 bg-red-500 hover:bg-red-700 text-white font-bold rounded w-28"
              onClick={() => {
                handleDelete(editIndex);
                handleCloseDialog();
              }}
            >
              Delete
            </button>
          )}

          {/* Previous Role */}
          <div className="flex flex-col">
            <label>Role</label>
            <select
              name="previousRole"
              value={values.previousRole}
              onChange={handleChange}
              className="border rounded p-2"
            >
              <option value="Tutor">Tutor</option>
              <option value="Lab assistant">Lab Assistant</option>
            </select>
            <ValidationMessage message={errors.previousRole} />
          </div>

          {/* Course Name */}
          <div className="flex flex-col">
            <label>Course Name</label>
            <input
              name="previousCourseName"
              value={values.previousCourseName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`border rounded p-2 ${
                errors.previousCourseName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <ValidationMessage message={errors.previousCourseName} />
          </div>

          {/* Job Type */}
          <div className="flex flex-col">
            <label>Job Type</label>
            <select
              name="jobType"
              value={values.jobType}
              onChange={handleChange}
              className="border rounded p-2"
            >
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
            </select>
            <ValidationMessage message={errors.jobType} />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label>Start Date</label>
              <input
                type="date"
                name="startDate"
                value={values.startDate}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`border rounded p-2 ${
                  errors.startDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            <ValidationMessage message={errors.startDate} />
            </div>
            <div className="flex flex-col">
              <label>End Date</label>
              <input
                type="date"
                name="endDate"
                value={values.endDate}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`border rounded p-2 ${
                  errors.endDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            <ValidationMessage message={errors.endDate} />
            </div>

            <div className="col-span-2 flex justify-end gap-2 mt-4">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-5 rounded w-28"
                onClick={handleCloseDialog}
              >
                Cancel
              </button>
              <button
                className={`px-5 py-2 text-white rounded w-28 ${
                  computedValidity ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
                }`}
                onClick={handleSave}
                disabled={!computedValidity}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </EditDialog>

    </div>
  )
};

export default ExperiencesSection;