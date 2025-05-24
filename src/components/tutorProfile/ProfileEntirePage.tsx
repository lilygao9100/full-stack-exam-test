"use client"
import React, {useState} from "react";
import { ProfileData } from "@/types/profile";
import ProfileHeader from "./ProfileHeader";
import ProfileExperiences, { Experiences }  from "./ProfileExperience";
import ProfileEducation, { Education }  from "./ProfileEducation";
import ProfileSkills,{SkillsType} from "./ProfileSkills";

// Sample mock data
const SAMPLE_EDUCATION_DATA: Education[] = [
  {
    id:1,
    institutionName: "University of RMIT",
    degree: "Master's Degree",
    fieldOfStudy: "Information Technology",
    startDate: "2023-07-01",
    endDate: "2025-07-01",
  },
  {
    id:2,
    institutionName: "University of Melbourne",
    degree: "Master's Degree",
    fieldOfStudy: "Teaching",
    startDate: "2018-02-01",
    endDate: "2019-12-01",
  },
  {
    id:3,
    institutionName: "University of Melbourne",
    degree: "Bachelor's Degree",
    fieldOfStudy: "Commerce",
    startDate: "2014-03-01",
    endDate: "2017-06-01",
  },
]

// Sample mock data
const SAMPLE_EXPERIENCES: Experiences[] = [
  {
    experienceID:1,
    previousRole: "Tutor",
    previousCourseName: "Software Fundamental Engineering",
    jobType: "Full-Time",
    startDate: "2023-01-01",
    endDate: "2023-06-01",
  },
  {
    experienceID:2,
    previousRole: "Tutor",
    previousCourseName: "Data Concept",
    jobType: "Part-Time",
    startDate: "2022-01-01",
    endDate: "2022-06-01",
  },
  {
    experienceID:3,
    previousRole: "Tutor",
    previousCourseName:"Software Testing",
    jobType: "Part-Time",
    startDate: "2021-01-01",
    endDate: "2021-06-01",
  },
]

const ProfileEntirePage: React.FC = () => {
    // Central state management for ALL profile data
    // Profile header state
    const [profileData, setProfileData] = useState<ProfileData>({
      userId: "1",
      userName: "jayPrichett",
      firstName: "Jay",
      lastName: "Prichett",
      emailAddress: "tutor1@example.com",
      availability: "Full-Time" as "Full-Time" | "Part-Time",
      aboutMeText: "I am a passionate teacher and lifelong learner. I love to help students learn and grow in their studies. My goal is to make learning fun and engaging for everyone.",
    });

  // Manage whether the dialog is open, and which secton is being edited
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  
  // Skills State
  const [skills, setSkills] = useState<SkillsType[]>([
    'Python','Swift', 'Java','React','JavaScript'
  ]);
  // Education State
  const [education, setEducation] = useState<Education[]>(SAMPLE_EDUCATION_DATA);
  // Experience State
  const [experiences, setExperiences] = useState<Experiences[]>(SAMPLE_EXPERIENCES);
  
  // Handle saving profile header changes
  const handleSaveProfileHeader = (updatedData: {
    firstName: string;
    lastName: string;
    availability: "Full-Time" | "Part-Time";
    aboutMeText: string;
  }) => {
    setProfileData(prev => ({
      ...prev,
      ...updatedData
    }));
  };
  
  // Handler for opening the dialog
  const handleOpenDialog = (title: string) => {
  setDialogTitle(title);
  setIsDialogOpen(true);
}

 // Handler for closing the dialog
 const handleCloseDialog = () => {
  setIsDialogOpen(false);
  setDialogTitle('');
};

// Save handler for all sections using title as a switch
  function handleSave(updatedData: any): void {
    switch (dialogTitle) {
      case "Edit Profile Header":
        setProfileData(prev => ({
          ...prev,
          ...updatedData,
        }));
        break;
      case "Edit Skills":
        setSkills(updatedData);
        break;
      case "Edit Experience":
        setExperiences(updatedData);
        break;
      case "Edit Education":
        setEducation(updatedData);
        break;
    }
    setIsDialogOpen(false);
  }

    return (
      <div className="flex flex-col items-center w-full p-4">
        <div className="w-full max-w-4xl">
          {/* Profile header */}
          <ProfileHeader
            {...profileData}
            onSave={handleSaveProfileHeader}
          />

          {/* Experience section */}
          <ProfileExperiences 
            experiences={experiences}
            onSave={setExperiences}
          />

          {/* Education section */}
          <ProfileEducation
            educationList={education}
            onSave={setEducation}
          />

          {/* Skills section */}
          <ProfileSkills
            skills={skills} 
            onSave={setSkills}
          />
        </div>

      </div>
    )
  }

export default ProfileEntirePage;
