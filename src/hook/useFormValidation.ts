"use client";
import {useState, useMemo, useCallback} from "react";


// define types for form validation rules
export type ValidationRules = {
  [key: string] : {
    required?: boolean; // is field mandatory?
    minLength?: number; // minimum character count
    maxLength?: number; // maximum character count
    pattern?: RegExp;   // regex pattern for validation
    custom?: (value: any) => boolean; // or other custom validation function
  };
};

// type structure for validation errors
type Errors = {
  [key: string] : string;
};

// custom hook to manage form state and validation logic
export const useFormValidation = <T extends Record<string, any>>(
    initialState: T,
    rules: ValidationRules
) => {
  // state for form values, validation errors, and dirty (touched) status
  const [values, setValues] = useState<T>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [isDirty, setIsDirty] = useState(false);
 
  // function to run validation for a specific field and return error message
  const runValidation = useCallback (
    (name: keyof T, value: T[keyof T]): string | null => {
      const rule = rules[name as string];
      const trimmedValue = typeof value === "string" ? value.trim() : value;
 
    // check required field
    if (rule?.required) {
      if (
         (typeof trimmedValue === "string" && trimmedValue === "") ||
         (Array.isArray(trimmedValue) && trimmedValue.length === 0) ||
         trimmedValue === null ||
         trimmedValue === undefined
       ) {
         return "This field is required";
       }
     }
 
     // check minimum length
     if (rule?.minLength &&
         typeof trimmedValue === "string" &&
         trimmedValue.length < rule.minLength
        ) {
       return `Minimum ${rule.minLength} characters`;
     }
 
     // check maximum length
     if (rule?.maxLength &&
         typeof trimmedValue === "string" &&
         trimmedValue.length > rule.maxLength
        ) {
       return `Maximum ${rule.maxLength} characters`;
     }
 
     // check regex pattern
     if (rule?.pattern &&
         typeof trimmedValue === "string" &&
         !rule.pattern.test(trimmedValue)
        ) {
       return "Invalid format";
     }
 
     // custom validator
     if (rule?.custom && !rule.custom(trimmedValue)) {
       return "Invalid value";
     }
     return null;  // return null if no errors
    }, [rules]
  );
 
  // Validate a single field and update errors state
  const validateField = (name: keyof T, value: T[keyof T]) => {
    const errorMessage = runValidation(name, value);
    setErrors(prev => {
      const newErrors = { ...prev };
      if (errorMessage) {
        newErrors[name as string] = errorMessage;
      } else {
        delete newErrors[name as string];
      }
      return newErrors;
    });
   };
 
   // handle changes in form inputs.
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
      const { name, value } = e.target;
      setValues(prev => ({ ...prev, [name]: value }));
      if (isDirty) {
        validateField(name as keyof T, value as T[keyof T]);
      }
  };
 
  // handler for field blur event, marking the form as "dirty" and validating the field
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setIsDirty(true);
    validateField(name as keyof T, value as T[keyof T]);
  };
 
  // memoized computation of form validity without side effects 
  // (for rendering purposes)
  const computedValidity = useMemo(() => {
     const newErrors: Errors = {};
     for (const fieldName of Object.keys(rules)) {
       const error = runValidation(fieldName, values[fieldName]);
       if (error) newErrors[fieldName] = error;
     }
     return Object.keys(newErrors).length === 0;
   }, [values, rules, runValidation]);
   
 
  // Validate entire form, update errors state, and return validity status
  const isValid = () => {
     const newErrors: Errors = {};
     for (const fieldName of Object.keys(rules)) {
       const error = runValidation(fieldName, values[fieldName]);
       if (error) newErrors[fieldName] = error;
     }
     setErrors(newErrors);
     return Object.keys(newErrors).length === 0;
   };
 
   // Reset the form state to the initial state
   const reset = () => {
     setValues(initialState);
     setErrors({});
     setIsDirty(false);
   };
 
   return {
     values,         // current form field values
     errors,         // current form validation errors
     handleChange,   // handler for input changes
     handleBlur,     // handler for field blur events
     isValid,        // function to validate whole form (updates errors state)
     computedValidity, // pure computed validity (for rendering)
     setValues,      // manual setter to update form values externally
     reset,          // reset form state to inital value 
   };
 };