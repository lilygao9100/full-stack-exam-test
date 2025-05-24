"use client";
import { useState } from 'react';
import TutorsView from '@/components/TutorsView';
import { selectedTutors } from '@/types/selectedTutors';
import { Tutor } from '@/types/tutors'; 

const MySelection = () => {
  const [currentTutors, setCurrentTutors] = useState([...selectedTutors]);

  const handleRemove = (tutorToRemove: Tutor) => {
    const updatedTutors = currentTutors.filter(tutor => tutor.id !== tutorToRemove.id);
    setCurrentTutors(updatedTutors);
    console.log('Removed:', tutorToRemove.name);
  };

  console.log("[MySelection] rendered with", currentTutors.length, "selected tutors");

  return (
    <div className="flex-1 p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Selected Tutors</h1>
      <TutorsView 
        tutors={currentTutors}
        context="selection"
        onActionClick={handleRemove}
      />
    </div>
  );
};

export default MySelection;

