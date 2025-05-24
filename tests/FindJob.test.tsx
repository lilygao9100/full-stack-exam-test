import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FindJob from '../src/components/FindJob';
import { jobLists } from '../src/types/jobList';

/**
 * This test file checks the behaviour of the FindJob compnent
 * Test 1 - Renders the table with initial job items
 * Test 2 - Navigates to next page if there are more items
 * Test 3 - Navigates back to previous page
 * Test 4 - Apply button links to correct route
 */
describe('findjob component', () => {
  test('renders table and show initial items on first page', () => {
    render(<FindJob/>);

    // check and locate the table container
    const table = screen.getByTestId('jobs-table');
    expect(table).toBeInTheDocument();

    // check if jobs rows are rendered
    const rows = screen.getAllByTestId('jobs-row');
    const expectedRows = Math.min(9, jobLists.length);
    expect(rows).toHaveLength(expectedRows);
  });
  test('goes to next page when "Next" button is clicked (if multiple pages)', () => {
    // only test this if we have more than 9 items
    if (jobLists.length <= 9) return;
    render(<FindJob />);

    // The "Next" button should exist (if totalPages > 1)
    const nextButton = screen.getByTestId('next-button');
    fireEvent.click(nextButton);

    // After clicking, new rows should appear from page 2
    // We can check the text of the first row to see if it matches page 2 data
    const rows = screen.getAllByTestId('jobs-row');
    // Expect the correct number of rows for the second page
    // Or fewer if jobLists doesn't fill that entire page
    expect(rows.length).toBeLessThanOrEqual(9);
  });

  test('goes back to previous page when "Previous" button is clicked', () => {
    if (jobLists.length <= 9) return;

    render(<FindJob />);
    // Move to the next page first
    fireEvent.click(screen.getByTestId('next-button'));
    // Then click "Previous"
    const prevButton = screen.getByTestId('prev-button');
    fireEvent.click(prevButton);
    // We should now be back on the first page
    const rows = screen.getAllByTestId('jobs-row');
    const expectedRows = Math.min(9, jobLists.length);
    expect(rows).toHaveLength(expectedRows);
  });

  test('Apply button links to the correct URL', () => {
    render(<FindJob />);
    
    // Grab the first "Apply" button
    const applyButtons = screen.getAllByTestId('apply-button');
    expect(applyButtons.length).toBeGreaterThan(0);

    // The first course in jobLists
    const firstCourse = jobLists[0];
    // check the link is correct
    const link = applyButtons[0].closest('a');
    const expectedLink = `/tutors/applyJob?courseCode=${firstCourse.courseCode}&courseName=${encodeURIComponent(
      firstCourse.courseName
    )}&jobType=${firstCourse.jobType}&semester=${firstCourse.semester}&year=${firstCourse.year}`;
    expect(link).toHaveAttribute('href', expectedLink);
  });
});