/**
 * NewAnnotationItem Component
 *
 * This component allows users to add a new annotation by entering text
 * and submitting it. It integrates with the `AnnotationBaseItem` for
 * consistent styling and structure.
 *
 * Props:
 * - `timestamp` (number): The numerical value of the timestamp associated with
 * the annotation
 * - `onAddAnnotation` (function): Callback to handle adding a new annotation.
 *   Receives the new annotation text as an argument.
 * - `onTimestampClick` (function, optional): Callback executed when the timestamp
 *   button is clicked.
 *
 * Behavior:
 * - Users can type a new annotation in the input field.
 * - Pressing Enter or clicking the save button submits the annotation.
 * - The input is cleared after submission.
 *
 * Usage:
 * ```tsx
 * <NewAnnotationItem onAddAnnotation={(text) => console.log("New annotation:", text)} />
 * ```
 */

import React, { useState } from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import AnnotationBaseItem from "./AnnotationBaseItem";

interface NewAnnotationItemProps {
  timestamp: number;
  onAddAnnotation: (text: string, timestamp: number) => void; // Callback for adding a new annotation
  onTimestampClick: (timestamp: number) => void; // Callbock
}

const NewAnnotationItem: React.FC<NewAnnotationItemProps> = ({
  timestamp,
  onAddAnnotation,
  onTimestampClick,
}) => {
  const [newAnnotation, setNewAnnotation] = useState<string>("");

  const handleAddAnnotation = () => {
    if (newAnnotation.trim()) {
      onAddAnnotation(newAnnotation, timestamp);
      setNewAnnotation("");
    }
  };

  return (
    <div className="annotation-item">
      <AnnotationBaseItem
        timestamp="00:00"
        timestampNum={0}
        onTimestampClick={() => onTimestampClick(timestamp)}
      >
        {/* Input field for new annotation */}
        <InputGroup>
          <FormControl
            className="no-border-shadow"
            value={newAnnotation}
            onChange={(e) => setNewAnnotation(e.target.value)}
            placeholder="new annotation"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddAnnotation();
            }}
          />
        </InputGroup>
      </AnnotationBaseItem>
    </div>
  );
};

export default NewAnnotationItem;
