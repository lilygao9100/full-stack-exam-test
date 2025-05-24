export interface Course {
    id: string;
    name: string;
  }
  
  export interface Tutor {
    id: number;
    name: string;
    availability: 'Full-time' | 'Part-time' | 'Casual';
    appliedCourse: Course;
    skills: string[];
    rating: number;
    chosenBy: number;
    commentedBy: number;
    selected: boolean;
  }
  
  export const sampleTutors: Tutor[] = [
    {
      id: 1,
      name: "Jay Pritchett",
      availability: "Full-time",
      appliedCourse: { id: "COSC123", name: "Software Engineering" },
      skills: ["Python", "Testing", "AWS"],
      rating: 4,
      chosenBy: 3,
      commentedBy: 10,
      selected: false
    },
    {
      id: 2,
      name: "Mitchell Pritchett",
      availability: "Part-time",
      appliedCourse: { id: "COSC234", name: "Software Testing" },
      skills: ["Python", "UI/UX", "React"],
      rating: 5,
      chosenBy: 2,
      commentedBy: 5,
      selected: false
    },

    {
        id: 3,
        name: "Claire Pritchett",
        availability: "Full-time",
        appliedCourse: { id: "COSC934", name: "Cybersecurity Fundamentals" },
        skills: ["Cybersecurity", "Azure", "AWS"],
        rating: 4,
        chosenBy: 6,
        commentedBy: 1,
        selected: false
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
        selected: false
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
        selected: false
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
        selected: false
    },
    {
        id: 7,
        name: "Luke Dunphy",
        availability: "Part-time",
        appliedCourse: { id: "COSC924", name: "Advanced Programming" },
        skills: ["Java", "Python", "Swift", "Kotlin"],
        rating: 3,
        chosenBy: 8,
        commentedBy: 2,
        selected: false
    },
  ];
  
  export interface TutorsTableProps {
    tutors: Tutor[];
    actionButton?: {
        icon: React.ReactNode;
        label: string;
    } | null;
    onActionClick?: (tutor: Tutor) => void;
}