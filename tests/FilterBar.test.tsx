import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FilterBar, { FilterBarProps } from "@/components/FilterBar";

describe("FilterBar Component", () => {
  const defaultProps: FilterBarProps = {
    searchName: "",
    setSearchName: jest.fn(),
    availability: "",
    setAvailability: jest.fn(),
    course: "",
    setCourse: jest.fn(),
    skills: [],
    setSkills: jest.fn(),
  };

  it("renders all filter inputs", () => {
    render(<FilterBar {...defaultProps} />);

    expect(screen.getByPlaceholderText("Search tutors...")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search courses...")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Type skill + Enter")).toBeInTheDocument();
    expect(screen.getByText("Tutor Name")).toBeInTheDocument();
    expect(screen.getByText("Availability")).toBeInTheDocument();
    expect(screen.getByText("Course")).toBeInTheDocument();
    expect(screen.getByText("Skills")).toBeInTheDocument();
  });

  it("calls setSearchName on name input change", () => {
    render(<FilterBar {...defaultProps} />);
    const input = screen.getByPlaceholderText("Search tutors...");
    fireEvent.change(input, { target: { value: "Alice" } });
    expect(defaultProps.setSearchName).toHaveBeenCalledWith("Alice");
  });

  it("calls setAvailability on availability change", () => {
    render(<FilterBar {...defaultProps} />);
    const select = screen.getByDisplayValue("All");
    fireEvent.change(select, { target: { value: "Full-time" } });
    expect(defaultProps.setAvailability).toHaveBeenCalledWith("Full-time");
  });

  it("calls setCourse when course dropdown item is clicked", () => {
    const props = {
      ...defaultProps,
      course: "",
      setCourse: jest.fn(),
    };

    render(<FilterBar {...props} />);
    const input = screen.getByPlaceholderText("Search courses...");
    fireEvent.change(input, { target: { value: "Software" } });

    const option = screen.findByText("COSC123 - Software Engineering");
    return option.then((el) => {
      fireEvent.click(el);
      expect(props.setCourse).toHaveBeenCalledWith("COSC123 - Software Engineering");
    });
  });

  it("adds skill on Enter key press", () => {
    const setSkillsMock = jest.fn();
    const props = { ...defaultProps, skills: [], setSkills: setSkillsMock };

    render(<FilterBar {...props} />);
    const skillInput = screen.getByPlaceholderText("Type skill + Enter");
    fireEvent.change(skillInput, { target: { value: "React" } });
    fireEvent.keyDown(skillInput, { key: "Enter", code: "Enter" });

    expect(setSkillsMock).toHaveBeenCalledWith(["React"]);
  });

  it("clears tutor name when clear button is clicked", () => {
    const props = { ...defaultProps, searchName: "John" };
  
    render(<FilterBar {...props} />);
    const clearButton = screen.getByRole("button", { name: "" }); // There's no label, use role fallback
    fireEvent.click(clearButton);
    expect(props.setSearchName).toHaveBeenCalledWith("");
  });

  it("does not add duplicate skills", () => {
    const setSkillsMock = jest.fn();
    const props = { ...defaultProps, skills: ["React"], setSkills: setSkillsMock };
  
    render(<FilterBar {...props} />);
    const skillInput = screen.getByPlaceholderText(/add more/i);
    fireEvent.change(skillInput, { target: { value: "React" } });
    fireEvent.keyDown(skillInput, { key: "Enter", code: "Enter" });
  
    expect(setSkillsMock).not.toHaveBeenCalled();
  });
  
  it("removes a skill when X is clicked", () => {
    const setSkillsMock = jest.fn();
    const props = { ...defaultProps, skills: ["React"], setSkills: setSkillsMock };
  
    render(<FilterBar {...props} />);
    const removeBtn = screen.getByRole("button", { name: "" }); // First remove skill "X"
    fireEvent.click(removeBtn);
  
    expect(setSkillsMock).toHaveBeenCalledWith([]);
  });

  it("displays 'No courses found' if search doesn't match any course", () => {
    render(<FilterBar {...defaultProps} />);
    const courseInput = screen.getByPlaceholderText("Search courses...");
    fireEvent.change(courseInput, { target: { value: "nonexistent" } });
  
    expect(screen.getByText("No courses found")).toBeInTheDocument();
  });
  
  it("shows matching course options in dropdown", async () => {
    render(<FilterBar {...defaultProps} />);
    const courseInput = screen.getByPlaceholderText("Search courses...");
    fireEvent.change(courseInput, { target: { value: "Software" } });
  
    expect(await screen.findByText("COSC123 - Software Engineering")).toBeInTheDocument();
  });
});
