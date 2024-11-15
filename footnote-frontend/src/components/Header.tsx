/**
 * Header.tsx
 *
 * This file defines the `Header` React component, which displays the project title
 * and allows the user to edit it by clicking on the title.
 *
 * Features:
 * - Displays the current project title.
 * - Allows inline editing of the title with a save-on-blur or Enter key.
 * - Calls a callback to save the updated title in the parent component.
 */

import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";

interface HeaderProps {
  title: string; // Current project title
  onTitleChange: (newTitle: string) => void; // Callback to handle title updates
}

/**
 * Header is a React functional component that displays the project title
 * and provides inline editing functionality.
 *
 * @param {HeaderProps} props - Props for the Header component.
 * @returns {JSX.Element} - A header displaying the project title.
 */
const Header: React.FC<HeaderProps> = ({ title, onTitleChange }) => {
  const [isEditing, setIsEditing] = useState(false); // Tracks if the title is being edited
  const [editableTitle, setEditableTitle] = useState(title); // Temporary state for the editable title

  /**
   * Handles saving the edited title.
   */
  const handleSave = () => {
    if (editableTitle.trim() && editableTitle !== title) {
      onTitleChange(editableTitle); // Call parent callback with the new title
    }
    setIsEditing(false); // Exit edit mode
  };

  /**
   * Handles key press events for saving or canceling edits.
   */
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSave(); // Save on Enter
    } else if (event.key === "Escape") {
      setEditableTitle(title); // Revert to original title on Escape
      setIsEditing(false);
    }
  };

  return (
    <div className="header-container text-center">
      {isEditing ? (
        <InputGroup className="mb-3">
          <Form.Control
            type="text"
            value={editableTitle}
            onChange={(e) => setEditableTitle(e.target.value)}
            onBlur={handleSave} // Save on blur
            onKeyDown={handleKeyDown} // Handle keyboard events
            autoFocus
            className="edit-title-input"
          />
        </InputGroup>
      ) : (
        <h1
          className="project-title"
          onClick={() => setIsEditing(true)} // Enter edit mode on click
          onMouseOver={(e) => e.currentTarget.classList.add("hovered")} // Add hover styling
          onMouseOut={(e) => e.currentTarget.classList.remove("hovered")} // Remove hover styling
          style={{ cursor: "pointer" }}
        >
          {editableTitle || "Untitled Project"}
        </h1>
      )}
    </div>
  );
};

export default Header;
