/**
 * AnnotationList.tsx
 *
 * This file defines the `AnnotationList` React component, which renders a list
 * of annotations and a component for adding new annotations.
 *
 * The component is designed to:
 * - Display a list of existing annotations using the `AnnotationItem` component.
 * - Allow users to edit or delete existing annotations.
 * - Provide functionality to add new annotations using the `NewAnnotationItem` component.
 *
 * Props include callbacks for editing, deleting, and adding annotations, as well as the
 * `projectID` to associate these actions with a specific project.
 */

import React from "react";
import { AnnotationData } from "../../types/types"; // Import the AnnotationData type
import AnnotationItem from "./AnnotationItem"; // Component for rendering individual annotations
import NewAnnotationItem from "./NewAnnotationItem"; // Component for adding a new annotation

/**
 * Props for the AnnotationList component.
 *
 * @property {AnnotationData[]} annotations - Array of existing annotations to display.
 * @property {(id: number, newText: string, projectID: number) => void} onEditSave - Callback for saving edits to an annotation.
 * @property {(id: number, projectID: number) => void} onDeleteClick - Callback for deleting an annotation.
 * @property {(newText: string, projectID: number) => void} onAddAnnotation - Callback for adding a new annotation.
 * @property {number} projectID - The ID of the project the annotations belong to.
 */
interface AnnotationListProps {
  annotations: AnnotationData[];
  onEditSave: (id: number, newText: string, projectID: number) => void;
  onDeleteClick: (id: number, projectID: number) => void;
  onAddAnnotation: (newText: string, projectID: number) => void;
  projectID: number;
}

/**
 * AnnotationList is a React component that renders a list of annotations
 * and allows the user to edit, delete, or add annotations.
 *
 * @param {AnnotationListProps} props - Props for the component.
 * @returns {JSX.Element} - A list of annotations and an input for adding new ones.
 */
const AnnotationList: React.FC<AnnotationListProps> = ({
  annotations,
  onEditSave,
  onDeleteClick,
  onAddAnnotation,
  projectID,
}) => {
  return (
    <ul>
      {/* Render each annotation as an AnnotationItem */}
      {annotations.map((annotation) => (
        <AnnotationItem
          key={annotation.id}
          annotation={annotation} // Pass the annotation data
          onEditSave={(id, newText) => onEditSave(id, newText, projectID)}
          onDeleteClick={(id) => onDeleteClick(id, projectID)}
        />
      ))}
      {/* Render the NewAnnotationItem for adding new annotations */}
      <NewAnnotationItem
        onAddAnnotation={(newText) => onAddAnnotation(newText, projectID)}
      />
    </ul>
  );
};

export default AnnotationList; // Export the component for use in other parts of the application
