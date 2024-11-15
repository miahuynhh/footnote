/**
 * useAnnotations.ts
 *
 * This file defines the `useAnnotations` custom hook, which manages the state
 * and operations for annotations in a project. It handles:
 * - Fetching annotations from the backend.
 * - Adding, editing, and deleting annotations.
 * - Error handling and loading state management.
 *
 * Features:
 * - Uses Axios for HTTP requests.
 * - Provides consistent error handling and rollback mechanisms.
 * - Keeps the state synchronized with the backend.
 */

import { useState, useEffect } from "react";
import axios from "axios";
import { AnnotationData } from "../types/types"; // Type definition for annotation data
import { API_BASE_URL } from "../config"; // Base URL for the API

/**
 * Custom hook for managing annotations within a specific project.
 *
 * @param {number} projectID - The ID of the project for which annotations are managed.
 * @returns {Object} - State variables and functions for annotation management.
 */
export const useAnnotations = (projectID: number) => {
  const [annotations, setAnnotations] = useState<AnnotationData[]>([]); // Array of annotations
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error message

  // Fetch annotations for the project when projectID changes
  useEffect(() => {
    const loadAnnotations = async () => {
      setIsLoading(true); // Start loading
      setError(null); // Reset error state
      try {
        const response = await axios.get<AnnotationData[]>(
          `${API_BASE_URL}/annotations/all?projectID=${projectID}`
        );

        // Use real data if available, otherwise, set an empty array
        setAnnotations(response.data.length > 0 ? response.data : []);
      } catch (err) {
        console.error("Error loading annotations:", err);
        setError("Failed to load annotations."); // Set error message
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    loadAnnotations();
  }, [projectID]);

  // Add a new annotation
  const addAnnotation = async (text: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/annotations/add`, {
        timestamp: "00:00", // Note: All timestamps are hardcoded for now
        text,
        projectID,
      });

      if (response.data && response.data.id) {
        const annotationWithId: AnnotationData = {
          id: response.data.id, // Use ID from backend
          timestamp: "00:00",
          text,
          projectID,
        };

        // Add the new annotation to the state
        setAnnotations((prev) => [...prev, annotationWithId]);
      } else {
        throw new Error("No ID received from backend");
      }
    } catch (err) {
      console.error("Error adding annotation:", err);
      setError("Failed to add annotation."); // Set error message
    }
  };

  // Edit an existing annotation
  const editAnnotation = async (id: number, newText: string) => {
    const previousAnnotations = [...annotations]; // Save current state for rollback

    // Optimistically update the state
    setAnnotations((prev) =>
      prev.map((annotation) =>
        annotation.id === id ? { ...annotation, text: newText } : annotation
      )
    );

    try {
      const response = await axios.put(`${API_BASE_URL}/annotations/edit`, {
        id,
        text: newText,
        projectID,
      });

      if (!response.data.success) {
        throw new Error("Backend did not confirm the update.");
      }
    } catch (err) {
      console.error("Error editing annotation:", err);
      setError("Failed to edit annotation."); // Set error message
      setAnnotations(previousAnnotations); // Roll back to the previous state
    }
  };

  // Delete an annotation
  const deleteAnnotation = async (id: number) => {
    const previousAnnotations = [...annotations]; // Save current state for rollback

    // Optimistically remove the annotation from state
    setAnnotations((prev) => prev.filter((annotation) => annotation.id !== id));

    try {
      await axios.delete(`${API_BASE_URL}/annotations/delete`, {
        data: { id, projectID },
      });
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Unknown error";
      console.error("Error deleting annotation:", errorMessage);
      setError(`Failed to delete annotation: ${errorMessage}`);

      // Roll back to the previous state if the backend call fails
      setAnnotations(previousAnnotations);
    }
  };

  // Return state and functions to the consuming component
  return {
    annotations, // Array of annotations
    isLoading, // Loading state
    error, // Error message
    addAnnotation, // Function to add an annotation
    editAnnotation, // Function to edit an annotation
    deleteAnnotation, // Function to delete an annotation
  };
};
