/**
 * AnnotationItem Component
 *
 * This component represents an individual annotation item. It allows users
 * to view, edit, or delete the annotation content.
 *
 * Props:
 * - `timestampNum` (number): The numerical value of the timestamp associated with
 * the annotation
 * - `annotation` (AnnotationData): The data for the annotation, including
 *   its ID, text, timestamp, and associated project ID.
 * - `onEditSave` (function): Callback to handle saving an edited annotation.
 *   Receives `id`, `newText`, and `projectId` as arguments.
 * - `onDeleteClick` (function): Callback to handle deleting an annotation.
 *   Receives `id` and `projectId` as arguments.
 * - `onTimestampClick` (function, optional): Callback executed when the timestamp
 *   button is clicked.
 *
 * Behavior:
 * - When editing is active:
 *   - The text field is shown, and the user can save with Enter or cancel with Escape.
 * - When not editing:
 *   - Displays the annotation text with edit and delete buttons.
 *
 * Usage:
 * ```tsx
 * <AnnotationItem
 *   annotation={{
 *     id: 1,
 *     timestamp: "1:30",
 *     text: "This is an annotation",
 *     projectID: 123
 *
 *   }}
 *   onEditSave={(id, newText, projectId) => console.log(id, newText, projectId)}
 *   onDeleteClick={(id, projectId) => console.log(id, projectId)}
 *   onTimestampClick={onTimestampClick}
 * />
 * ```
 */

import React, { useState } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import AnnotationBaseItem from "./AnnotationBaseItem";
import { AnnotationData } from "../../types/types";
import TrashIcon from "../../assets/trash.png";
import EditIcon from "../../assets/pen.png";

interface AnnotationItemProps {
  timestamp: number;
  annotation: AnnotationData; // The data for the annotation
  onEditSave: (id: number, newText: string, projectId: number) => void; // Callback for saving edits
  onDeleteClick: (id: number, projectId: number) => void; // Callback for deleting the annotation
  onTimestampClick: (timestampNum: number) => void; // Callback for clicking on timestamp
}

const AnnotationItem: React.FC<AnnotationItemProps> = ({
  annotation,
  onEditSave,
  onDeleteClick,
  onTimestampClick,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(annotation.text);

  const handleEditSave = () => {
    if (editText.trim()) {
      onEditSave(annotation.id, editText, annotation.projectID);
      setIsEditing(false);
    }
  };

  const handleEditCancel = () => {
    setEditText(annotation.text);
    setIsEditing(false);
  };

  return (
    <div className="annotation-item">
      <AnnotationBaseItem
        timestamp={annotation.timestampStr}
        timestampNum={annotation.timestampNum}
        onTimestampClick={onTimestampClick}
      >
        {isEditing ? (
          <InputGroup>
            <FormControl
              className="no-border-shadow"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={handleEditSave}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleEditSave();
                if (e.key === "Escape") handleEditCancel();
              }}
              placeholder="Edit annotation"
              autoFocus
            />
          </InputGroup>
        ) : (
          <span className="annotation-text">{annotation.text}</span>
        )}

        {!isEditing && (
          <div>
            <Button
              variant="link"
              onClick={() => setIsEditing(true)}
              className="p-0 mx-2"
            >
              <img src={EditIcon} alt="Edit" width={16} height={16} />
            </Button>

            <Button
              variant="link"
              onClick={() => onDeleteClick(annotation.id, annotation.projectID)}
              className="p-0"
            >
              <img src={TrashIcon} alt="Delete" width={16} height={16} />
            </Button>
          </div>
        )}
      </AnnotationBaseItem>
    </div>
  );
};

export default AnnotationItem;
