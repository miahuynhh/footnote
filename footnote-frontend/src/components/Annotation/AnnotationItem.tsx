/**
 * AnnotationItem.tsx
 *
 * This file defines the `AnnotationItem` React component, which renders an individual
 * annotation with the following features:
 * - Displaying a timestamp and annotation text.
 * - Allowing users to edit the annotation text.
 * - Providing options to save edits or cancel them.
 * - Allowing users to delete the annotation.
 *
 * The component uses `AnnotationBaseItem` as a base layout and includes interaction
 * logic for editing and deleting annotations.
 */

import React, { useState } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap"; // Bootstrap components for styling
import AnnotationBaseItem from "./AnnotationBaseItem"; // Base layout component for annotations
import { AnnotationData } from "../../types/types"; // Type definition for annotation data
import TrashIcon from "../../assets/trash3-fill.svg"; // Icon for delete button
import EditIcon from "../../assets/pencil-square.svg"; // Icon for edit button

/**
 * Props for the AnnotationItem component.
 *
 * @property {AnnotationData} annotation - The annotation data to display.
 * @property {(id: number, newText: string, projectId: number) => void} onEditSave - Callback for saving edits to the annotation.
 * @property {(id: number, projectId: number) => void} onDeleteClick - Callback for deleting the annotation.
 */
interface AnnotationItemProps {
  annotation: AnnotationData;
  onEditSave: (id: number, newText: string, projectId: number) => void;
  onDeleteClick: (id: number, projectId: number) => void;
}

/**
 * AnnotationItem is a React component that renders an individual annotation with
 * options for editing and deleting.
 *
 * @param {AnnotationItemProps} props - Props for the component.
 * @returns {JSX.Element} - A styled annotation item with editing and delete functionality.
 */
const AnnotationItem: React.FC<AnnotationItemProps> = ({
  annotation,
  onEditSave,
  onDeleteClick,
}) => {
  // State to track if the annotation is being edited
  const [isEditing, setIsEditing] = useState(false);

  // State to hold the edited text
  const [editText, setEditText] = useState(annotation.text);

  // Handles saving the edited annotation
  const handleEditSave = () => {
    if (editText.trim()) {
      onEditSave(annotation.id, editText, annotation.projectID);
      setIsEditing(false); // Exit editing mode after saving
    }
  };

  // Handles canceling the edit
  const handleEditCancel = () => {
    setEditText(annotation.text); // Reset to the original text
    setIsEditing(false); // Exit editing mode
  };

  return (
    <AnnotationBaseItem
      timestamp={annotation.timestamp} // Pass the timestamp to the base component
      onTimestampClick={() => {}} // Placeholder for future functionality
    >
      {/* Editing Mode */}
      {isEditing ? (
        <InputGroup>
          <FormControl
            value={editText} // Current edited text
            onChange={(e) => setEditText(e.target.value)} // Update text as user types
            onBlur={handleEditSave} // Save when focus is lost
            onKeyDown={(e) => {
              if (e.key === "Enter") handleEditSave(); // Save on Enter
              if (e.key === "Escape") handleEditCancel(); // Cancel on Escape
            }}
            placeholder="Edit annotation" // Placeholder text for the input
            autoFocus // Automatically focus the input when entering editing mode
          />
        </InputGroup>
      ) : (
        // Display Mode
        <span>{annotation.text}</span> // Display the annotation text
      )}

      {/* Action Buttons */}
      {!isEditing && (
        <div>
          {/* Edit Button */}
          <Button
            variant="link"
            onClick={() => setIsEditing(true)} // Enter editing mode
            className="p-0 mx-2"
          >
            <img src={EditIcon} alt="Edit" width={16} height={16} />
          </Button>

          {/* Delete Button */}
          <Button
            variant="link"
            onClick={() => onDeleteClick(annotation.id, annotation.projectID)} // Trigger delete action
            className="p-0"
          >
            <img src={TrashIcon} alt="Delete" width={16} height={16} />
          </Button>
        </div>
      )}
    </AnnotationBaseItem>
  );
};

export default AnnotationItem; // Export the component for use in other parts of the application
