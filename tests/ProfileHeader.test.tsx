import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import ProfileHeader from '../src/components/tutorProfile/ProfileHeader';
import { useFormValidation } from '@/hook/useFormValidation';

// Mock implementation of useFormValidation
jest.mock('@/hook/useFormValidation', ()=> ({
  useFormValidation: (initialValues: any, rule: any) => {
    // Import useState from React
    const React = require('react');
    const [values, setValues] = React.useState(initialValues);
    const [errors, setErrors] = React.useState({});
    const [computedValidity, setComputedValidity] = React.useState(true);

    const validate = (vals: any) => {
      const newErrors: any = {};
      if (vals.aboutMeText?.length < 10) {
        newErrors.aboutMeText = 'About Me text must be at least 10 characters.';
      }
      return newErrors;
    };
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      const updated = { ...values, [name]: value };
      setValues(updated);
  
      const newErrors = validate(updated);
      setErrors(newErrors);
      setComputedValidity(Object.keys(newErrors).length === 0);
    };
    
    const handleBlur = jest.fn();

    const isValid =() => {
      // if aboutMeText is less than 10 chars, will cause error
      if (values.aboutMeText.length < 10) {
        errors.aboutMeText = 'About Me text must be at least 10 characters.';
        return false;
      }
      return true;
    };

    return {
      values,
      errors,
      handleChange,
      handleBlur,
      isValid,
      setValues,
      computedValidity
    };
  },
}));

describe('Profile header component', () => {
  const onSaveMock = jest.fn();
  beforeEach(()=> {
    jest.clearAllMocks();
  });

  /**
   * Test 1. Render the profile info as expected
   */
  test('displays user info', () => {
    render(
      <ProfileHeader
        userId="1"
        userName="zoe"
        firstName="zoe"
        lastName="xu"
        emailAddress="zoe@example.com"
        availability="Full-Time"
        aboutMeText="I am passionate teacher. I love teaching"
        onSave={onSaveMock}
      />
    );

    // check displayed user info as expected
    expect(screen.getByTestId('profile-name')).toHaveTextContent('zoe xu');
    expect(screen.getByTestId('profile-username')).toHaveTextContent('zoe');
    expect(screen.getByTestId('profile-email')).toHaveTextContent('zoe@example.com');
    expect(screen.getByTestId('profile-availability')).toHaveTextContent('Full-Time');
    expect(screen.getByTestId('profile-aboutme')).toHaveTextContent(
      'I am passionate teacher.'
    );
  });

  /**
   * Test 2: opens the edit dialog when clicking edit button
   */
  test('open edit dialog after clicking edit button', async () => {
    render (
      <ProfileHeader
          userId="1"
          userName="zoe"
          firstName="zoe"
          lastName="xu"
          emailAddress="zoe@example.com"
          availability="Full-Time"
          aboutMeText="I am passionate teacher. I love teaching"
          onSave={onSaveMock}
        />
    );
    fireEvent.click(screen.getByTestId('edit-button'));
    // After EditDialog is opened, 
    // we should find the dialog and the save/cancel buttons
    const dialogHeader = await screen.findByText('Edit profile');
    expect(dialogHeader).toBeInTheDocument();
    expect(screen.getByTestId('cancel-button')).toBeInTheDocument();
    expect(screen.getByTestId('save-button')).toBeInTheDocument();
  });

  /**
    * Test 3: Shows validation error if aboutMe is too short on saving
    */
  test('shows validation error for short About Me text', async () => {
    render(
      <ProfileHeader
        userId="1"
        userName="zoe"
        firstName="zoe"
        lastName="xu"
        emailAddress="zoe@example.com"
        availability="Full-Time"
        aboutMeText="hello, I am Zoe. " 
        onSave={onSaveMock}
      />
    );

    fireEvent.click(screen.getByTestId('edit-button'));
    await screen.findByText('Edit profile');
    const textarea = screen.getByTestId('textarea-aboutMe');
    fireEvent.change(textarea, { target: { name: 'aboutMeText', value: 'hi' } });

    fireEvent.click(screen.getByTestId('save-button'));
    // Our mock in useFormValidation sets an error if length < 10
    await waitFor(() => {
      const errorMsg = screen.getByTestId('validation-error');
      expect(errorMsg).toBeInTheDocument();
    });
    // onSave should not have been called
    expect(onSaveMock).not.toHaveBeenCalled();
  });


  /**
   * Test 4: successful save calls onSave with updated data
   */
  test('calls onSave with new data when user saves valid edits', async () => {
    render(
      <ProfileHeader
        userId="1"
        userName="zoe"
        firstName="zoe"
        lastName="xu"
        emailAddress="zoe@example.com"
        availability="Part-Time"
        aboutMeText={"Hello, I am Zoe. I am a passionate teacher and lifelong learner."} 
        onSave={onSaveMock}
      />
    );

    fireEvent.click(screen.getByTestId('edit-button'));
    await screen.findByText('Edit profile');
    // change firstName from "zoe" to "Jane"
    const firstNameInput = screen.getByTestId('input-firstName');
    fireEvent.change(firstNameInput, { target: { name: 'firstName', value: 'Jane' } });
    // click Save
    fireEvent.click(screen.getByTestId('save-button'));

    await waitFor(() => {
      // onSave should have been called with updated data
      expect(onSaveMock).toHaveBeenCalledWith({
        firstName: "Jane",
        lastName: "xu",
        availability: "Part-Time",
        aboutMeText: "Hello, I am Zoe. I am a passionate teacher and lifelong learner.",
      });
    });
  });

})
