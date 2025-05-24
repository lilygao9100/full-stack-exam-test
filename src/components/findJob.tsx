"use client";

import React from "react";
import Link from "next/link";
import { Course, capitaliseFirstLetter } from "@/types/course";
import { jobLists } from "../types/jobList";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from '@/components/ui/pagination';

/**
 * This component displays a paginated table of job listings.
 * When the user clicks "Apply," it navigates to /tutors/applyjob
 * with query parameters for courseCode, jobType, semester, year.
 */
const FindJob: React.FC = () => {
    // State for current page 
    const [page, setPage] = React.useState(1);
    // Decide how many items to show per page
    const itemsPerPage = 9;
    // Calculate total number of pages
    const totalPages = Math.ceil(jobLists.length / itemsPerPage);
    // Slice the jobLists array to get the items for the current page
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentJobs: Course[] = jobLists.slice(startIndex, endIndex);
  
    // Handler to move to the previous/next page
    const goToPreviousPage = () => {
      if (page > 1) setPage(page - 1);
    };
    const goToNextPage = () => {
      if (page < totalPages) setPage(page + 1);
    };

  return (
      <div 
        className="flex flex-col items-center p-6"
        data-testid="findjob-container"
        aria-label="Find Job Container"
      >
        <h1 className="text-3xl font-bold mb-4">Find a Tutor / Lab-assistant Job</h1>
        <p className="text-lg mb-4 text-gray-700">
          Here are the full list of available courses.
          Click <strong className="p-1">Apply</strong> if you are interested.
        </p>

        {/* Table for the current page data */}
        <div 
          className="w-full overflow-auto border border-gray-200 rounded-lg"
          data-testid="jobs-table-container"
          aria-label="Jobs Table Container"
        >
          <table 
            className="table-auto w-full bg-white"
            data-testid="jobs-table"
            aria-label="Jobs Table"
          >
            <thead className="bg-gray-800 text-white">
              <tr className="w-1/6 text-center">
                <th className="px-2 py-2">Course Code</th>
                <th className="px-2 py-2">Course Name</th>
                <th className="px-2 py-2">Job Type</th>
                <th className="px-2 py-2">Job Vacancies</th>
                <th className="px-2 py-2">Skill</th>
                <th className="px-2 py-2">Semester</th>
                <th className="px-2 py-2">Year</th>
                <th className="px-2 py-2">Apply</th> 
              </tr>
            </thead>
            <tbody>
              {currentJobs.map((course) => (
                <tr 
                  key={`
                      ${course.courseCode}-
                      ${course.courseName}-
                      ${course.jobType}-
                      ${course.semester}-
                      ${course.year}
                    `} 
                  className="border-b hover:bg-gray-100 text-center"
                  data-testid="jobs-row"
                  aria-label="Jobs Table Row"
                >
                  <td className="px-2 py-2">{course.courseCode}</td>
                  <td className="px-2 py-2">
                    {capitaliseFirstLetter(course.courseName)}
                  </td>
                  <td className="px-2 py-2">{course.jobType}</td>
                  <td className="px-2 py-2">{course.jobVacancy}</td>
                  <td className="px-2 py-2">
                    {course.skillsNeeded.join(", ")}
                  </td>
                  <td className="px-2 py-2">{course.semester}</td>
                  <td className="px-2 py-2">{course.year}</td>
                  <td className="px-2 py-2">
                  <Link
                    href={`/tutors/applyJob?courseCode=${course.courseCode}&courseName=${encodeURIComponent(
                      course.courseName
                    )}&jobType=${course.jobType}&semester=${course.semester}&year=${course.year}`}
                  >
                      <button 
                          data-testid="apply-button"
                          aria-label={`Apply to ${course.courseCode}`}
                          className="bg-emerald-600 hover:bg-emerald-900 text-white px-4 py-2 rounded">
                            Apply
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination className="mt-6" data-testid="pagination" aria-label="Pagination Controls">
          <PaginationContent>
                {/* Previous button */}
                {page > 1 && (
                    <PaginationItem>
                      <PaginationPrevious
                            data-testid="prev-button"
                            aria-label="Previous Page" 
                            href= "#"
                            onClick={goToPreviousPage}
                      />
                    </PaginationItem>
                  )}
                {/* Page numbers */}
                {Array.from({ length: totalPages}, (_,i) => {
                  const pageNumber = i + 1;
                  return(
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                          data-testid={`page-link-${pageNumber}`}
                          aria-label={`Page ${pageNumber}`}
                          href="#"
                          onClick={() => setPage(pageNumber)}
                          isActive={pageNumber === page}
                       >
                         {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                 })}

                 {/* Next Button */}
                 {page < totalPages && (
                    <PaginationItem>
                      <PaginationNext
                        data-testid="next-button"
                        aria-label="Next Page"
                        href="#"
                        onClick={goToNextPage}
                      />
                    </PaginationItem>
                 )}
            </PaginationContent>
        </Pagination>
      </div>
  )
 
}
export default FindJob;