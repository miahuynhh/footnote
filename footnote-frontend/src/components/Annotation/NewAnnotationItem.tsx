/**
 * NewAnnotationItem.tsx
 *
 * This file defines the `NewAnnotationItem` React component, which provides
 * a UI for creating and adding a new annotation. It allows the user to type a
 * new annotation in an input field and save it using a button or the "Enter" key.
 *
 * Features:
 * - Uses Bootstrap components for styling.
 * - Handles user input for adding a new annotation.
 * - Validates input to ensure the annotation is not empty before submission.
 */
import React, { useState } from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap"; // Bootstrap components for styling
import AnnotationBaseItem from "./AnnotationBaseItem"; // Base layout component for annotations
import CheckIcon from "../../assets/check-square-fill.svg"; // Icon for the save button

/**
 * Props for the NewAnnotationItem component.
 *
 * @property {(text: string) => void} onAddAnnotation - Callback function to handle adding a new annotation.
 */
interface NewAnnotationItemProps {
  onAddAnnotation: (text: string) => void;
}

/**
 * NewAnnotationItem is a React functional component that provides a form
 * for adding new annotations. Users can input annotation text and save it
 * via a button click or by pressing the "Enter" key.
 *
 * @param {NewAnnotationItemProps} props - Props for the component.
 * @returns {JSX.Element} - A styled component for creating a new annotation.
 */
const NewAnnotationItem: React.FC<NewAnnotationItemProps> = ({
  onAddAnnotation,
}) => {
  const [newAnnotation, setNewAnnotation] = useState<string>(""); // State to track the new annotation text

  /**
   * Handles the addition of a new annotation.
   * Validates that the input is not empty before invoking the onAddAnnotation callback.
   */
  const handleAddAnnotation = () => {
    if (newAnnotation.trim()) {
      onAddAnnotation(newAnnotation); // Trigger the callback with the new annotation
      setNewAnnotation(""); // Clear the input field
    }
  };

  return (
    <AnnotationBaseItem timestamp="00:00">
      {" "}
      {/* Hardcoded timestamp for new annotations */}
      <InputGroup>
        {/* Input field for entering the new annotation */}
        <FormControl
          value={newAnnotation} // Controlled input state
          onChange={(e) => setNewAnnotation(e.target.value)} // Update state on input change
          placeholder="new annotation" // Placeholder text
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAddAnnotation(); // Add annotation on "Enter" key press
          }}
        />
      </InputGroup>
      {/* Save button for adding the new annotation */}
      <Button variant="link" onClick={handleAddAnnotation} className="p-0">
        <img src={CheckIcon} alt="Save" width={16} height={16} />{" "}
        {/* Save icon */}
      </Button>
    </AnnotationBaseItem>
  );
};

export default NewAnnotationItem; // Export the component for use in other parts of the application
