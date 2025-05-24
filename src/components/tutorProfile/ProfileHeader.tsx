"use client";
import React, {useState, useEffect, useMemo} from "react";
import { useFormValidation } from "@/hook/useFormValidation";
import ValidationMessage from "../ValidationMessage";
import EditDialog from "../EditDialog";
import { ProfileData } from "@/types/profile";
import Image from "next/image";

// Component props include profile data and an onSave handler
interface ProfileHeaderProps extends ProfileData{
  onSave: (
    data: Omit<ProfileData,'userId' | 'userName' | 'emailAddress'>
  ) => void;
};

// Define validation rules on profile header
const validationRules = {
  firstName: {
    required: true,
    minLength: 1,
    maxLength: 50
  },
  lastName: {
    required: true,
    minLength: 2,
    maxLength: 50
  },
  availability: {
    required: true
  },
  aboutMeText: {
    required: true,
    minLength: 10,   
    maxLength: 500
  }
}

// main profileHeader component
const ProfileHeader: React.FC<ProfileHeaderProps> = ({ 
  userId, 
  userName, 
  firstName, 
  lastName, 
  emailAddress, 
  availability, 
  aboutMeText, 
  onSave
}) => { 
    // Use custom hook for handling form validation and state management
    const { 
      values,
      errors,
      handleChange,
      handleBlur,
      computedValidity,
      isValid,
      setValues,
    } = useFormValidation(
         { firstName,lastName,availability,aboutMeText }, 
         validationRules
  );

    // Check the state of dialog visbility [ to track if it's being edited or not]
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const currentValues = useMemo(
      () => ({ firstName, lastName, availability, aboutMeText }),
      [firstName, lastName, availability, aboutMeText]
    );

    // Sync form state when props change.
    useEffect(() => {
      setValues(currentValues);
    }, [currentValues, setValues]);

    // Close the dialog and resets any unsaved changes the user made
    const handleCloseDialog =() => {
      setIsDialogOpen(false);
      setValues(currentValues);
    };

    // Handle save action if form values are valid, and clsoes the dialog
    const handleSave = () => {
      if (isValid()) {
        onSave({
          firstName: values.firstName,
          lastName: values.lastName,
          availability: values.availability,
          aboutMeText: values.aboutMeText
      });
        setIsDialogOpen(false);
    }
  };

  return (
    <div 
      className="relative w-full h-56 overflow-hidden"
      data-testid="profile-header"
      aria-label="Profile Header Component"
    >
      {/* Profile header background image */}
      <Image
        src="/Images/profile-bg.png"
        alt="Profile Header Background"
        fill
        className="object-cover opacity-70 z-0"
      />
      {/* Edit profile button */}
      <button
        data-testid="edit-button"
        aria-label="Edit Profile"
        onClick={() => setIsDialogOpen(true)}
        className=" absolute right-4 top-4 p-2 border border-gray-300 bg-gray-500 rounded z-40"
      >
        <Image
          src="/Images/edit-icon.png"
          alt="Edit"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      </button>

      {/* Profile header display: The outer main container - HStack  */}
      <div className="flex flex-row items-center justify-center p-4 z-30 space-y-4 relative">
        {/* Left section: Avatar */}
        <div className="w-1/5 flex flex-col z-30">
          <Image
            src="/Images/profile-avatar.png"
            alt="Profile Avatar"
            width={128}
            height={128}
            className="rounded-full border-4 border-white"
          />
        </div>

        {/* Right section: User profile details in a VStack */}
        <div className="flex-grow z-30 pl-5">
          <div className="flex flex-col">
            <h1 
              className="text-3xl font-bold text-gray-800"
              data-testid="profile-name"
            >
              {firstName} {lastName}
            </h1>
            <div className="space-y-1 mt-1">
              <p className="text-base text-gray-600" data-testid="profile-username">
                <span className="font-medium">Username:</span> {userName}
              </p>
              <p className="text-base text-gray-600" data-testid="profile-availability">
                <span className="font-medium">Availability:</span> {availability}
              </p>
              <p className="text-base text-gray-600" data-testid="profile-email">
                <span className="font-medium">Email:</span> {emailAddress}
              </p>
            </div>
            <div className="mt-3">
              <p 
                className="text-base text-gray-700 leading-relaxed"
                data-testid="profile-aboutme"
              >
                {aboutMeText}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit profile dialog */}
      <EditDialog
        data-testid="edit-dialog"
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onSave={handleSave}
        title="Edit profile"
      >
        <div className="space-y-4">
          {/* First name edit part */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">First Name</label>
            <input
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                `border rounded p-2 
                ${errors.firstName 
                  ? 'border-red-500' 
                  : 'border-gray-300'}`
              }
              data-testid="input-firstName"
              aria-label="Edit First Name"
            />
            <ValidationMessage data-testid="validation-error" message={errors.firstName} />
          </div>

          {/* Last name edit part */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Last Name</label>
            <input
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                `border rounded p-2 
                ${errors.lastName 
                  ? 'border-red-500' 
                  : 'border-gray-300'}`
              }
              data-testid="input-lastName"
              aria-label="Edit Last Name"
            />
            <ValidationMessage message={errors.lastName} />
          </div>

          {/* Read-only Email Display */}
          <div className="flex flex-col">
            <label className="text-sm font-medium">Email</label>
            <input
              value={emailAddress}
              readOnly
              data-testid="readonly-email"
              aria-label="Read Only Email"
              className="border rounded p-2 bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Let user select their Availability [2 options only - present as a dropdown] */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Availability</label>
            <select
              name="availability"
              value={values.availability}
              onChange={handleChange}
              className="border rounded p-2 bg-white"
              data-testid="select-availability"
              aria-label="Select Availability"
            >
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
            </select>
          </div>

          {/* Let user edit 'About me' text area */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">About ME</label>
            <textarea
              name="aboutMeText"
              value={values.aboutMeText}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                `border rounded p-2 h-32 resize-none 
                ${errors.aboutMeText 
                  ? 'border-red-500' 
                  : 'border-gray-300'}`
              }
              data-testid="textarea-aboutMe"
              aria-label="Edit About Me"
            />
            <ValidationMessage message={errors.aboutMeText}/>
            <div className="text-sm text-gray-500 mt-1">
              {values.aboutMeText.length}/500 characters
            </div>
          </div>

          {/* Dialog action buttons */}
          <div className="flex gap-3 justify-end pt-4">
            <button
              type="button"
              onClick={handleCloseDialog}
              className="px-4 py-2 border rounded-lg text-white font-bold bg-red-500 hover:bg-red-700 w-28"
              data-testid="cancel-button"
              aria-label="Cancel Profile Changes"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={!computedValidity}
              className={`
                px-4 py-2 rounded-lg text-white font-bold w-28
                ${computedValidity ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}
              `}
              data-testid="save-button"
              aria-label="Save Profile Changes"
            >
              Save
            </button>
          </div>
        </div>
      </EditDialog>
    </div>
  );
};
export default ProfileHeader;