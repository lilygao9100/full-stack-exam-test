"use client";
import React, {useState, useEffect} from "react";
import { useFormValidation } from "@/hook/useFormValidation";
import ValidationMessage from "../ValidationMessage";
import EditDialog from "../EditDialog";
import Image from "next/image";

// Define the available skills as a union skilltype.
export type SkillsType = 
      "Software engineering" | 
      "Programming Language" |
      "Full stack development" |
      "Front-end development" |
      "Back-end development" |
      "Web development" |
      "SQL" | 
      "Software Testing" |
      "Python"| 
      "Java" | 
      "JavaScript" | 
      "C++" | 
      "C#" | 
      "Ruby" | 
      "Swift" |
      "Kotlin" | 
      "HTML" | 
      "CSS" | 
      "React" | 
      "Angular" | 
      "Node.js" | 
      "Django" | 
      "AWS" | 
      "Azure" | 
      "Google Cloud Platform" | 
      "DevOps" | 
      "Agile Methodologies"|
      "Machine learning" |
      "Cybersecurity";

// Define the props for this component.
interface SkillsSectionProps {
  // The current skills array from the parent component.
  skills: SkillsType[];
  // Callback to update skills in the parent.
  onSave: (skills: SkillsType[]) => void;
};

// Define all the possible skill options available for selection.
const skillsOptions: SkillsType[] = [
 "Software engineering", "Programming Language", "Full stack development", 
 "Front-end development", "Back-end development", "Web development", "SQL", 
 "Software Testing", "Python", "Java", "JavaScript", "C++", "C#", "Ruby", 
 "Swift", "Kotlin", "HTML", "CSS", "React", "Angular", "Node.js", "Django", 
 "AWS", "Azure", "Google Cloud Platform", "DevOps", 
 "Agile Methodologies","Machine learning", "Cybersecurity"
];

// Set up validation rules for the skills field.
// Here we ensure that at least one skill is selected.
const validationRules = {
  skills: {
    required: true,
    custom: (value:SkillsType[]) => value.length > 0
  }
};

const ProfileSkills: React.FC<SkillsSectionProps> = ({ skills, onSave }) => {
  // Initialize the form validation hook with the initial state,
  // which is derived from the incoming "skills" prop.
  const {
    values, 
    setValues,
    errors, 
    isValid,
    computedValidity
    } = useFormValidation<{ skills: SkillsType[] }>(
                                    {skills},validationRules  );
  
  // Local state to control whether the Skills edit dialog is open.
  const [isEditing, setIsEditing] = useState(false);

  // Keep a copy of the initial skills to allow a reset if the user cancels editing.
  const [initialSkills, setInitialSkills] = useState<SkillsType[]>(skills);

  // When the parent "skills" prop changes, 
  // update both form values and initial state.
  useEffect(() => {
    setValues({ skills });
    setInitialSkills(skills);
  }, [skills, setValues]);

  // Close the dialog and revert unsaved changes.
  const handleCloseDialog = () => {
    setIsEditing(false);
    // Reset form state to the original skills.
    setValues({ skills: initialSkills });
  };

  // Save handler: Validate and then call onSave with current skills.
  const handleSave = () => {
    if (isValid()) {
      onSave(values.skills);
      setIsEditing(false);
    } else {
      console.log("ProfileSkills: Validation failed", errors);
    }
  };

  // Toggle the selection of a skill:
  // If the skill is already selected, remove it; 
  // otherwise, add it to the array.
  const toggleSkill = (skill: SkillsType) => {
    const newSkills = values.skills.includes(skill)
      ? values.skills.filter(s => s !== skill)
      : [...values.skills, skill];
    setValues({ skills: newSkills });
  };

  return (
    <div className="bg-white border border-gray-200 p-4 my-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl p-2 font-semibold">Skills</h2>
        <button
          className="border bg-gray-600 border-gray-600 p-2 rounded hover:bg-gray-800"
          onClick={ () => setIsEditing(true)}
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

      <ul className="list-disc pl-5">
        {skills.map((skill, index) => (
          <li key={index} className="mb-2">
            {skill}
          </li>
        ))}
      </ul>

      {/* Edit Dialog part */}
      <div className="h-1/2">
        <EditDialog
          isOpen={isEditing}
          onClose={handleCloseDialog}
          onSave={handleSave}
          title="Edit skills"
        >
          <div className="overflow-auto max-h-96 space-y-3 p-3">
            <div className="flex flex-col">
              {skillsOptions.map(skill => (
                <label key={skill} className="inline-flex items-center mt-3">
                  <input
                    type="checkbox"
                    checked={values.skills.includes(skill)}
                    onChange={() => toggleSkill(skill)}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2 text-gray-700">{skill}</span>
                </label>
              ))}
            </div>

            <ValidationMessage message={errors.skills} />

            <div className="flex justify-end space-x-2">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-5 rounded w-28"
                onClick={handleCloseDialog}
              >
                Cancel
              </button>
              <button
                className="
                    bg-blue-500 hover:bg-blue-700 
                    text-white font-bold 
                    py-2 px-5 rounded w-28"
                onClick={handleSave}
                disabled={!computedValidity}
              >
                Save
              </button>
            </div>
          </div>
        </EditDialog>
      </div>
    </div>
  );
}
export default ProfileSkills;