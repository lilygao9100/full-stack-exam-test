import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TutorsTable from "@/components/TutorsTable";
import { Tutor } from "@/types/tutors";
import { FaTimes } from "react-icons/fa";

const sampleTutors: Tutor[] = [
  {
    id: 1,
    name: "Alice",
    availability: "Full-time",
    appliedCourse: { id: "COSC123", name: "Software Engineering" },
    skills: ["React", "JavaScript"],
    rating: 4,
    chosenBy: 5,
    commentedBy: 3,
    selected: false,
  },
];

describe("TutorsTable Component", () => {
  it("renders tutor data correctly", () => {
    render(<TutorsTable tutors={sampleTutors} />);
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Full-time")).toBeInTheDocument();
    expect(screen.getByText("COSC123 - Software Engineering")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument(); // chosenBy
    expect(screen.getByText("3")).toBeInTheDocument(); // commentedBy
  });

  it("calls onActionClick when red button is clicked", () => {
    const mockActionClick = jest.fn();
    render(
      <TutorsTable
        tutors={sampleTutors}
        actionButton={{ icon: <FaTimes data-testid="remove-icon" />, label: "Remove" }}
        onActionClick={mockActionClick}
      />
    );

    const actionButton = screen.getByTestId("remove-icon");
    fireEvent.click(actionButton);
    expect(mockActionClick).toHaveBeenCalledWith(sampleTutors[0]);
  });

  it("opens profile drawer on row click", () => {
    render(<TutorsTable tutors={sampleTutors} />);
    const row = screen.getByText("Alice");
    fireEvent.click(row);
    expect(screen.getByText("Rate & Comment")).toBeInTheDocument(); // Title inside TutorProfileDrawer
  });

  it("renders no tutors without crashing", () => {
    render(<TutorsTable tutors={[]} />);
    expect(screen.queryByText("Alice")).not.toBeInTheDocument();
  });
});
