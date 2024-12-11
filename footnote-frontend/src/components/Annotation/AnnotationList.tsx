/**
 * AnnotationList Component
 *
 * This component renders a list of annotations and provides functionality
 * to edit, delete, and add new annotations. It serves as a wrapper for
 * `AnnotationItem` and `NewAnnotationItem`.
 *
 * Props:
 * - `annotations` (AnnotationData[]): Array of annotations to display.
 * - `onEditSave` (function): Callback to save edits to an annotation.
 * - `onDeleteClick` (function): Callback to delete an annotation.
 * - `onAddAnnotation` (function): Callback to add a new annotation.
 * - `projectID` (number): The project ID for context.
 * -  timestamp` (number): The most recent timestamp associated with the project ID
 * - `onTimestampClick` (function, optional): Callback executed when the timestamp
 *   button is clicked.
 *
 * Usage:
 * ```tsx
 * <AnnotationList
 *   annotations={[{ id: 1, text: "Example", timestamp: "00:30", projectID: 123 }]}
 *   onEditSave={(id, newText, projectID) => console.log("Edit", id, newText, projectID)}
 *   onDeleteClick={(id, projectID) => console.log("Delete", id, projectID)}
 *   onAddAnnotation={(newText, projectID) => console.log("Add", newText, projectID)}
 *   projectID={123}
 *   timestamp-{4}
 *   onTimestampClick={onTimestampClick}
 * />
 * ```
 */

import React from "react";
import { AnnotationData } from "../../types/types";
import AnnotationItem from "./AnnotationItem";
import NewAnnotationItem from "./NewAnnotationItem";

interface AnnotationListProps {
  annotations: AnnotationData[];
  onEditSave: (id: number, newText: string, projectID: number) => void;
  onDeleteClick: (id: number, projectID: number) => void;
  onAddAnnotation: (
    newText: string,
    newTimestamp: number,
    projectID: number
  ) => void;
  projectID: number;
  timestamp: number;
  onTimestampClick: (timestamp: number) => void; // Add this prop
}

const AnnotationList: React.FC<AnnotationListProps> = ({
  annotations,
  onEditSave,
  onDeleteClick,
  onAddAnnotation,
  onTimestampClick,
  projectID,
  timestamp,
}) => {
  return (
    <ul style={{ paddingLeft: "0", paddingRight: "7px" }}>
      {/* Render each annotation */}
      {annotations
        .sort((a, b) => a.timestampNum - b.timestampNum)
        .map((annotation) => (
          <AnnotationItem
            timestamp={annotation.timestampNum}
            key={annotation.id}
            annotation={annotation}
            onEditSave={(id, newText) => onEditSave(id, newText, projectID)}
            onDeleteClick={(id) => onDeleteClick(id, projectID)}
            onTimestampClick={onTimestampClick}
          />
        ))}

      {/* Render the input for adding new annotations */}
      <NewAnnotationItem
        timestamp={timestamp}
        onAddAnnotation={(newText) =>
          onAddAnnotation(newText, timestamp, projectID)
        }
        onTimestampClick={onTimestampClick}
      />
    </ul>
  );
};

export default AnnotationList;
