/**
 * Annotation Component
 *
 * This component handles fetching, displaying, and managing annotations
 * associated with a specific project. It uses the `useAnnotations` hook
 * to retrieve and manage annotation data, providing functionality for
 * adding, editing, and deleting annotations.
 *
 * Props:
 * - `projectID` (number): The unique identifier for the project whose annotations
 *   are being managed.
 * - `timestamp` (number): The most recent timestamp from the video player
 * - `onTimestampClick` (function): A callback function for how to handle the timestamp
 * button in subcomponent.
 *
 * Behavior:
 * - While data is loading, a "Loading..." message is displayed.
 * - If an error occurs during data retrieval, an error message is shown.
 * - Once data is loaded:
 *   - Annotations are displayed in an `AnnotationList`.
 *   - Provides callbacks to handle adding, editing, and deleting annotations.
 *
 * Dependencies:
 * - `useAnnotations`: Custom hook to manage annotation-related API interactions.
 * - `AnnotationList`: Component to display a list of annotations and handle interactions.
 *
 * Usage:
 * ```tsx
 * <Annotation projectID={123} />
 * ```
 *
 * Notes:
 * - Ensure that `useAnnotations` is properly configured to handle API
 *   requests for annotation data.
 */

import React from "react";
import { useAnnotations } from "../../hooks/useAnnotations";
import AnnotationList from "./AnnotationList";

interface AnnotationProps {
  projectID: number; // The ID of the project for which annotations are managed
  timestamp: number; // most recent timestamp that is getting passed down
  onTimestampClick: (timestampNum: number) => void; // Callback for clicking on timestamp
}

const Annotation: React.FC<AnnotationProps> = ({
  projectID,
  timestamp,
  onTimestampClick,
}) => {
  // Fetch annotations and manage state using the useAnnotations hook
  const {
    annotations, // Array of annotation objects
    isLoading,
    error,
    addAnnotation,
    editAnnotation,
    deleteAnnotation,
  } = useAnnotations(projectID); // Pass projectID to the custom hook

  // Show loading indicator while fetching data
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* Display error message, if any */}
      {error && <div className="error-message">{error}</div>}

      {/* Render the list of annotations */}
      <AnnotationList
        annotations={annotations} // Pass annotations to the list
        onEditSave={editAnnotation} // Callback for saving edits
        onDeleteClick={deleteAnnotation} // Callback for deleting annotations
        onAddAnnotation={addAnnotation} // Callback for adding annotations
        onTimestampClick={onTimestampClick}
        projectID={projectID} // Pass the projectID for context
        timestamp={timestamp}
      />
    </>
  );
};

export default Annotation;
