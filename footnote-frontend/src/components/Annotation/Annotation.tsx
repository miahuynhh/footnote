import React from "react";
import { useAnnotations } from "../../hooks/useAnnotations";
import AnnotationList from "./AnnotationList";

interface AnnotationProps {
  projectID: number;
}

const Annotation: React.FC<AnnotationProps> = ({ projectID }) => {
  const {
    annotations,
    isLoading,
    error,
    addAnnotation,
    editAnnotation,
    deleteAnnotation,
  } = useAnnotations(projectID); // Pass projectID to useAnnotations

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {error && <div className="error-message">{error}</div>}
      <AnnotationList
        annotations={annotations}
        onEditSave={editAnnotation}
        onDeleteClick={deleteAnnotation}
        onAddAnnotation={addAnnotation}
        projectID={0}
      />
    </>
  );
};

export default Annotation;
