import { Tutor } from './tutors';

export const selectedTutors: Tutor[] = [
  {
    id: 2,
    name: "Mitchell Pritchett",
    availability: "Part-time",
    appliedCourse: { id: "COSC234", name: "Software Testing" },
    skills: ["Python", "UI/UX", "React"],
    rating: 5,
    chosenBy: 2,
    commentedBy: 5,
    selected: true  
  },
  {
    id: 4,
    name: "Gloria Delgado-Pritchett",
    availability: "Full-time",
    appliedCourse: { id: "COSC123", name: "Software Engineering" },
    skills: ["Swift", "JS", "SQL", "NoSQL", "DevOps"],
    rating: 3,
    chosenBy: 14,
    commentedBy: 0,
    selected: true
},

{
    id: 5,
    name: "Manny Delgado",
    availability: "Part-time",
    appliedCourse: { id: "COSC834", name: "Usibility Engineering" },
    skills: ["UI/UX", "HTML", "CSS"],
    rating: 5,
    chosenBy: 2,
    commentedBy: 1,
    selected: true
},
{
    id: 6,
    name: "Phil Dunphy",
    availability: "Full-time",
    appliedCourse: { id: "COSC834", name: "Usibility Engineering" },
    skills: ["UI/UX", "HTML", "CSS", "Js", "C##", "Swift"],
    rating: 3,
    chosenBy: 14,
    commentedBy: 2,
    selected: true
},
{
    id: 7,
    name: "Luke Dunphy",
    availability: "Part-time",
    appliedCourse: { id: "COSC934", name: "Advanced Programming" },
    skills: ["Java", "Python", "Swift", "Kotlin"],
    rating: 3,
    chosenBy: 8,
    commentedBy: 2,
    selected: true
},

];