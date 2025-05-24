// Define allowed types for job availability and roles
export type AvailableType = "Full-Time" | "Part-Time";
export type RoleType = "Tutor" | "Lab assistant" ;

export interface ProfileData {
  userId: string;
  userName: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  availability: AvailableType;
  aboutMeText: string;
}