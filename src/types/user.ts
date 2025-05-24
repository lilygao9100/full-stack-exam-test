
// Define the structure of a user object
export interface User {
  id: number;
  email: string;
  password: string;
  userType: "tutor" | "lecturer";
}

// List of dummy data user registration data in localStorage
export const DEFAULT_USERS: User[] = [
  { id: 1, email: "tutor1@example.com", password: "Password123!", userType: "tutor" },
  { id: 2, email: "tutor2@example.com", password: "Password123!", userType: "tutor" },
  { id: 3, email: "lecturer1@example.com", password: "Password123!", userType: "lecturer" },
  { id: 4, email: "lecturer2@example.com", password: "Password123!", userType: "lecturer" },
];