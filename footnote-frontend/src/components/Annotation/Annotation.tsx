/**
 * Annotation.tsx
 *
 * This file defines the `Annotation` React component, which serves as a container
 * for displaying and managing annotations within a project. It integrates with the
 * `useAnnotations` custom hook to handle fetching, adding, editing, and deleting annotations.
 *
 * Features:
 * - Fetches annotations for a specific project using `useAnnotations`.
 * - Displays a loading message while annotations are being fetched.
 * - Handles and displays error messages if data fetching fails.
 * - Passes the fetched data and action callbacks to the `AnnotationList` component for rendering.
 */

import React from "react";
import { useAnnotations } from "../../hooks/useAnnotations"; // Custom hook for annotation data management
import AnnotationList from "./AnnotationList"; // Component for rendering the list of annotations

/**
 * Props for the Annotation component.
 *
 * @property {number} projectID - The ID of the project whose annotations are being managed.
 */
interface AnnotationProps {
  projectID: number;
}

/**
 * Annotation is a React functional component that provides a container for managing
 * and displaying annotations for a specific project.
 *
 * @param {AnnotationProps} props - Props for the component.
 * @returns {JSX.Element} - A container for the annotation list, with loading and error handling.
 */
const Annotation: React.FC<AnnotationProps> = ({ projectID }) => {
  const {
    annotations,
    isLoading,
    error,
    addAnnotation,
    editAnnotation,
    deleteAnnotation,
  } = useAnnotations(projectID); // Pass the projectID to fetch the correct annotations

  // Display a loading message while annotations are being fetched
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* Display an error message if there was an error during data fetching */}
      {error && <div className="error-message">{error}</div>}

      {/* Render the list of annotations using the AnnotationList component */}
      <AnnotationList
        annotations={annotations}
        onEditSave={editAnnotation}
        onDeleteClick={deleteAnnotation}
        onAddAnnotation={addAnnotation}
        projectID={projectID}
      />
    </>
  );
};

export default Annotation;
