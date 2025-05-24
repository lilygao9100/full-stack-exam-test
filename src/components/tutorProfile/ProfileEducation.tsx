"use client";
import React, {useState, useEffect} from "react";
import { useFormValidation } from "@/hook/useFormValidation";
import ValidationMessage from "../ValidationMessage";
import EditDialog from "../EditDialog";
import Image from "next/image";

// Define available degree types
type DegreeType = "Bachelor's Degree" | "Master's Degree" | "PhD" | "Associate Degree";

// Define structure of a single education entry
export interface Education {
  id: number,
  institutionName: string;
  degree: DegreeType;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
};

// Props for ProfileEducation component
interface ProfileEducationProps {
  // Full list of education entries
  educationList: Education[];
  // callback to save updated list
  onSave: (newEducation:Education[]) => void;
};

const EMPTY_EDUCATION: Education = {
  id: -1,
  institutionName: "",
  degree: "Bachelor's Degree",
  fieldOfStudy: "",
  startDate: "",
  endDate: "",
};

// validation rules for form fields
const validationRules = {
  institutionName: {required: true, minLength: 3},
  degree: {required: true},
  fieldOfStudy: {required: true, minLength: 2},
  startDate:{ required: true },
  endDate: { required: true }
};


const ProfileEducation: React.FC<ProfileEducationProps> = ({ 
  educationList, 
  onSave, 
}) => {
  // Controls dialog visibility (true when editing or adding)
  const [isEditing, setIsEditing] = useState(false);
  // Index of the item being edited, or null if adding a new one
  const [editIndex, setEditIndex] = useState<number | null>(null);
  // State to hold the currently edited or new education entry
  const [formValues, setFormValues] = useState<Education | null>(null);

  // Custom form validation hook for handling input values, validation errors, etc.
  const { 
    values, 
    setValues, 
    errors, 
    handleChange, 
    handleBlur, 
    isValid, 
    computedValidity 
  } = useFormValidation(
          formValues || EMPTY_EDUCATION, validationRules );

  // call when the user click 'edit' button on existing entry
  // set the current index, loads the selected education into the form
  const handleEdit = (index: number) => {
    const edu = educationList[index];
    setEditIndex(index);
    setFormValues(edu);
    setIsEditing(true);
  };

  // close the dialog, and reset all related state
  const handleCloseDialog = () => {
    setIsEditing(false); 
    setEditIndex(null); 
    setFormValues(null);
  };

  // handle saving the edited or new education entry
  // validates form first, then update or add to the education list
  // pass the updated list back to parent via onSave
  const handleSave = () => {
    console.log("Form values:", values);
    console.log("Errors:", errors);
    
    console.log("Valid:", isValid());
    if (isValid()) {
      const newEducation = [...educationList];
      if (editIndex !== null && formValues) {
        newEducation[editIndex] = { ...formValues, ...values }; 
      } else {
        const newId = newEducation.length > 0 ? Math.max(...newEducation.map(edu => edu.id)) + 1 : 1;
        newEducation.push({ ...values, id: newId });
      }
      onSave(newEducation);
      setIsEditing(false);
      setFormValues(null); // Clear form state
    }
  };

  return (
    <div className="bg-white border border-gray-200 p-4 my-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl p-2 font-semibold">Education</h2>
        <button
          className="border bg-gray-600 border-gray-600 p-2 rounded hover:bg-gray-800"
          onClick={() => {
            setEditIndex(null);
            setFormValues(null);   
            setIsEditing(true);
          }}
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
      {/* Render education item */}
      {educationList.map((edu, index) => (
        <div 
          key={edu.id} 
          className="
            mb-4 p-2 
            border-b border-gray-200 
            flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{edu.institutionName}</h3>
            <p>{edu.degree} in {edu.fieldOfStudy}</p>
            <p>{edu.startDate} to {edu.endDate}</p>
          </div>
          {/* Edit button for each entry */}
          <button
            className="text-blue-600 text-sm mt-1 hover:text-purple-800"
            onClick={() => handleEdit(index)}
          >
            Edit
          </button>
        </div>
      ))}

        {/* reuse the edit dialog */}
        <EditDialog
          isOpen={isEditing}
          onClose={() => setIsEditing(false)}
          onSave={handleSave}
          title={editIndex !== null ? "Edit Education" : "Add Education"}
        >
          <div className="space-y-4">
            {/* If editing, show the delete button */}
          {editIndex !== null && (
            <button
              className="absolute top-4 right-4 p-2 bg-red-500 hover:bg-red-700 text-white font-bold rounded w-28"
              onClick={() => {
                const updatedData = [...educationList];
                updatedData.splice(editIndex, 1); // Remove the selected education
                onSave(updatedData); // Save the updated list
                handleCloseDialog();
              }}
            >
              Delete
            </button>
          )}
            {/* Form Fields */}
            <div className="flex flex-col">
              <label>Institution Name</label>
              <input
                name="institutionName"
                value={values.institutionName}
                onChange={handleChange}
                onBlur={handleBlur}
                className="
                    mt-1 block 
                    w-full px-3 py-2 
                    border border-gray-300 
                    bg-white rounded-md 
                    shadow-sm focus:outline-none 
                    focus:ring-indigo-500 
                    focus:border-indigo-500 sm:text-sm"
              />
              <ValidationMessage message={errors.institutionName} />
            </div>

            <div className="flex flex-col">
              <label>Degree</label>
              <select
                name="degree"
                value={values.degree}
                onChange={handleChange}
                className="
                    mt-1 block 
                    w-full pl-3 
                    pr-10 py-2 
                    text-base 
                    border border-gray-300 
                    bg-white  
                    focus:outline-none 
                    focus:ring-indigo-500 
                    focus:border-indigo-500 
                    sm:text-sm rounded-md"
                >
                <option value="Bachelor's Degree">Bachelor's Degree</option>
                <option value="Master's Degree">Master's Degree</option>
                <option value="PhD">PhD</option>
                <option value="Associate Degree">Associate Degree</option>
              </select>
              <ValidationMessage message={errors.degree} />
            </div>

            <div className="flex flex-col">
              <label>Field of Study</label>
              <input
                name="fieldOfStudy"
                value={values.fieldOfStudy}
                onChange={handleChange}
                onBlur={handleBlur}
                className="
                    mt-1 block 
                    w-full px-3 py-2 
                    border border-gray-300 
                    bg-white rounded-md 
                    shadow-sm focus:outline-none 
                    focus:ring-indigo-500 
                    focus:border-indigo-500 sm:text-sm"
              />
              <ValidationMessage message={errors.fieldOfStudy} />
            </div>

            <div className="flex flex-col">
              <label>Start Date</label>
              <input
                type="date"
                name="startDate"
                value={values.startDate}
                onChange={handleChange}
                onBlur={handleBlur}
                className="
                    mt-1 block 
                    w-full px-3 py-2 
                    border border-gray-300 
                    bg-white rounded-md shadow-sm 
                    focus:outline-none focus:ring-indigo-500 
                    focus:border-indigo-500 sm:text-sm"
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
                className="
                    mt-1 block 
                    w-full px-3 py-2 
                    border border-gray-300 
                    bg-white rounded-md shadow-sm 
                    focus:outline-none focus:ring-indigo-500 
                    focus:border-indigo-500 sm:text-sm"
              />
              <ValidationMessage message={errors.endDate} />
            </div>

            {/* Dialog Actions: Cancel and Save */}
            <div className="flex justify-end space-x-2">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-5 rounded w-28"
                onClick={handleCloseDialog}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded w-28"
                onClick={handleSave}
                disabled={!computedValidity}
              >
                Save
              </button>
            </div>  
          </div>
        </EditDialog>
      </div>
  );
}

export default ProfileEducation;