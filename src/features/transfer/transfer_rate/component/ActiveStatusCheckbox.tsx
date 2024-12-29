import React from "react";
import { Form } from "react-bootstrap";

interface ActiveStatusCheckboxProps {
  isActive: boolean;
 onStatusChange: (status: boolean) => void;
}

const ActiveStatusCheckbox: React.FC<ActiveStatusCheckboxProps> = ({ isActive, onStatusChange }) => {
  return (
    <Form.Check className="text-center"
      type="checkbox"
      checked={isActive}
      onChange={(e) => onStatusChange(e.target.checked)}

    />



  );
};

export default ActiveStatusCheckbox;