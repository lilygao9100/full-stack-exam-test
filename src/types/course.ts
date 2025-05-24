export interface Course {
  courseCode: string;
  courseName: string;
  jobType: "Full-Time" | "Part-Time";
  jobVacancy: number;
  skillsNeeded: string[];
  semester: string;
  year: number;
}

// Utility function to capitalise first letter
export function capitaliseFirstLetter(name: string): string {
  if (!name) return "";
  return name.charAt(0).toUpperCase() + name.slice(1);
}