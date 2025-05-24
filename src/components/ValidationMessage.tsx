"use client";

// For displaying validation errors (meant to be reused across user's input validation)
const ValidationMessage: React.FC<{message?:string}> = ({message}) => {
  // Do not render this function if no error
  if (!message) return null;

  return (
    <div data-testid="validation-error" className="text-red-500 text-sm mt-1 animate-fade-in">
      {message}
    </div>
  );
};

export default ValidationMessage;