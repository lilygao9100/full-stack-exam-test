import React,{useState, useEffect} from "react";
import {capitaliseFirstLetter} from "@/types/course";
import CustomAlert from "./CustomAlert";
import { useSearchParams } from "next/navigation";

// Allowed types for alert messages
type AlertType = "success" | "error" | "warning" | "info";

// Interface defining structure of form data
interface JobFormData {
  firstName: string;
  lastName: string;
  email: string;
  courseCode: string;
  courseName: string;
  jobType: string;
  semester: string;
  year: string
}

// Main form component for job application
function ApplyJobForm() {
  // Use State to store user's inputs
  const [formInput, setFormInput] = useState<JobFormData>({
    firstName: "",
    lastName: "",
    email: "",
    courseCode: "",
    courseName: "",
    jobType: "",
    semester: "",
    year: ""
  });

  // State to manage alert visibility and message
  const [alert, setAlert] = useState<{
    type: AlertType;
    message: string;
    show:boolean;
  }>({
      type: "info", 
      message:"",  
      show:false
  })

  // Retrieve query parameters from URL
  const searchParams = useSearchParams();

  // On mount, we read the query params and set them in state
  useEffect(()=> {
    const courseCode = searchParams.get("courseCode") || "";
    const courseName = searchParams.get("courseName") || "";
    const jobType = searchParams.get("jobType") || "";
    const semester = searchParams.get("semester") || "";
    const year = searchParams.get("year") || "";

    setFormInput((prev) => ({
      ...prev,
      courseCode,
      courseName,
      jobType,
      semester,
      year,
    }));
  }, [searchParams]);

  // Handler for changes in input fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const {name, value} = e.target;
    setFormInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  // Helper function to validate email format.
  const validateEmail = (email:string) => {
    const re = /^\S+@\S+\.\S+$/;
    return re.test(email);
  };

  // Validate that all required fields are filled
  const validateFormInput = (): boolean => {
    //if any field is empty, show a warning alert to the user
    const { 
      firstName, 
      lastName, 
      email
    } = formInput;

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim()
    ) {
      setAlert({
        type: "warning",
        message: "Please fill out all fields before submitting",
        show: true,
      });
      return false
    }
    if (!validateEmail(email)) {
        setAlert({
          type: "error",
          message: "Invalid email. Please enter a valid email address.",
          show: true,
        });
        return false
      }
    return true;
  };

  // Handler for form submission
  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateFormInput()) return; 
    
    // If everything is valid, show a success alert
    setAlert({
      type: "success",
      message: "Your application has been submitted successfully!",
      show: true,
    });

    // Reset the form after submission
    setFormInput((prev) => ({
      ...prev,
      firstName: "",
      lastName: "",
      email: "",
    }));
  };

  return (
    <div className="max-w-md ma-auto p-4 mt-6 border rounded shadow-sm">
      <h1 className="text-2xl font-bold mb-4">Apply for Course</h1>
      
      <div data-testid="alert">
        {alert.show && (
          <CustomAlert type={alert.type} message={alert.message} />
        )}
      </div>

      <form 
        data-testid="apply-form"
        onSubmit={handleSubmit} className="space-y-4">
        {/* First Name field */}
        <div>
          <label className="block mb-1 font-medium" htmlFor="firstName">
            First Name:
          </label>
          <input
            required
            type="text"
            name="firstName"
            id="firstName"
            value={formInput.firstName}
            onChange={handleChange}
            className="w-full border rounded caret-pink-500 px-2 py-1"
            data-testid="firstName-input"
            aria-label="First Name"
          />
        </div>
        {/* Last Name field */}
        <div>
          <label className="block mb-1 font-medium" htmlFor="firstName">
            Last Name:
          </label>
          <input
            required
            type="text"
            name="lastName"
            id="lastName"
            value={formInput.lastName}
            onChange={handleChange}
            className="w-full border rounded caret-pink-500 px-2 py-1"
            data-testid="lastName-input"
            aria-label="Last Name"
          />
        </div>

        {/* Email field */}
        <div>
          <label className="block mb-1 font-medium" htmlFor="firstName">
            Email Address:
          </label>
          <input
            required
            type="email"
            name="email"
            id="email"
            value={formInput.email}
            onChange={handleChange}
            className="w-full border rounded caret-pink-500 px-2 py-1"
            data-testid="email-input"
            aria-label="Email Address"
          />
        </div>

        {/* Course Code & course name */}
        <div>
          <label className="block mb-1 font-medium">Course</label>
          <label>
            <div 
              className="w-full border rounded px-2 py-1 bg-gray-100"
              data-testid="course-info"
              aria-label="Course Information"
            >
              {formInput.courseCode} - {capitaliseFirstLetter(formInput.courseName)}
            </div>
          </label>
          
        </div>

        {/* Job type */}
        <div>
          <label className="block mb-1 font-medium">Job Type</label>
          <div 
            className="w-full border rounded px-2 py-1 bg-gray-100"
            data-testid="jobtype-info"
            aria-label="Job Type"
          >
            {formInput.jobType}
          </div>
        </div>

        {/* Semester */}
        <div>
          <label className="block mb-1 font-medium">Semester</label>
          <div 
            className="w-full border rounded px-2 py-1 bg-gray-100"
            data-testid="semester-info"
            aria-label="Semester"
          >
            {formInput.semester}
          </div>
        </div>

        {/* Year */}
        <div>
          <label className="block mb-1 font-medium">Year</label>
          <div 
            className="w-full border rounded px-2 py-1 bg-gray-100"
            data-testid="year-info"
            aria-label="Year"
          >
            {formInput.year}
          </div>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-800"
          data-testid="submit-button"
          aria-label="Submit Application"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default ApplyJobForm;
