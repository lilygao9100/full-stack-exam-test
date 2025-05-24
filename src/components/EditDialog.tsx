import React from "react";

// Define the properties expected by the EditDialog component
interface EditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedData: any) => void;
  title?:string;
  children: React.ReactNode;
}

// A reusable modal dialog component used for editing or adding data
const EditDialog: React.FC<EditDialogProps> = ({ isOpen, onClose, onSave, title, children }) => {
  // Do not render the dialog if it's not open
  if (!isOpen) return null;

  return (
    <div className="
            fixed 
            inset-0 
            z-50 
            flex 
            items-center 
            justify-center 
            bg-black 
            bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
          {title && (
            <h2 className="text-xl font-semibold mb-4">
              {title}
            </h2>
          )}

          {/* Content of the dialog */}
          <div>
            {children}
          </div>
      </div>
    </div>
  );
}

export default EditDialog;