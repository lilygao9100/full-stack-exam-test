"user client"

import React from "react";

interface ApplicationHistory {
  id: number,
  appliedDate: string,
  courseCode: string,
  courseName: string,
  jobType: string,
  semester: string,
  year: string
}

const DEFAULT_APPLICATION_DATA: ApplicationHistory[] = [
  {
  id: 1,
  appliedDate: "03/01/2025",
  courseCode: "COSC1234",
  courseName: "Full stack development",
  jobType: "Full-Time",
  semester: "Semester 1",
  year: "2025",
},
{
  id: 2,
  appliedDate: "04/01/2025",
  courseCode: "COSC2234",
  courseName: "Software testing",
  jobType: "Full-Time",
  semester: "Semester 1",
  year: "2025",
},
{
  id: 3,
  appliedDate: "05/01/2025",
  courseCode: "COSC3234",
  courseName: "Usability engineerin",
  jobType: "Full-Time",
  semester: "Semester 2",
  year: "2025",
}
]

function MyApplicationPage(){

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-xl font-bold text-center mb-4">My Applications</h1>
      <table className="w-full border-collapse border p-2 border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-200 bg-gray-100 px-4 py-2 text-left">Applied Date</th>
            <th className="border border-gray-200 bg-gray-100 px-4 py-2 text-left">Course Code</th>
            <th className="border border-gray-200 bg-gray-100 px-4 py-2 text-left">Course Name</th>
            <th className="border border-gray-200 bg-gray-100 px-4 py-2 text-left">Job Type</th>
            <th className="border border-gray-200 bg-gray-100 px-4 py-2 text-left">Semester</th>
            <th className="border border-gray-200 bg-gray-100 px-4 py-2 text-left">Year</th>
          </tr>
        </thead>
        <tbody>
          {DEFAULT_APPLICATION_DATA.map((app) => (
            <tr key={app.id}>
              <td className="border border-gray-200 px-4 py-2">{app.appliedDate}</td>
              <td className="border border-gray-200 px-4 py-2">{app.courseCode}</td>
              <td className="border border-gray-200 px-4 py-2">{app.courseName}</td>
              <td className="border border-gray-200 px-4 py-2">{app.jobType}</td>
              <td className="border border-gray-200 px-4 py-2">{app.semester}</td>
              <td className="border border-gray-200 px-4 py-2">{app.year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyApplicationPage;