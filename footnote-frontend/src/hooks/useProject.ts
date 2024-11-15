import { useState, useEffect } from "react";
import axios from "axios";
import { ProjectData } from "../types/types";
import { API_BASE_URL } from "../config";

/**
 * Custom hook for managing project CRUD operations and fetching all projects.
 *
 * @param {number | null} projectID - The ID of the project to fetch. If null, it's for new projects.
 * @returns {Object} - An object containing project data, project list, loading, error states, and CRUD functions.
 */
const useProject = (projectID: number | null) => {
  const [project, setProject] = useState<ProjectData | null>(null);
  const [projects, setProjects] = useState<ProjectData[]>([]); // List of all projects
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch project data on mount or when projectID changes
  useEffect(() => {
    if (projectID !== null) {
      getProject(projectID);
    } else {
      // Default state for new projects
      setProject({
        id: 0,
        title: "Untitled Project",
        videoURL: "",
        thumbnailURL: "",
      });
      setLoading(false);
    }
  }, [projectID]);

  // Fetch all projects on mount
  useEffect(() => {
    getAllProjects();
  }, []);

  /**
   * Fetch a project by its ID.
   * @param {number} id - The project ID.
   */
  const getProject = async (id: number) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_BASE_URL}/projects/${id}`, {
        withCredentials: true,
      });
      setProject(data);
    } catch (err: unknown) {
      if (err.response?.status === 404) {
        setProject({
          id,
          title: "Untitled Project",
          videoURL: "",
          thumbnailURL: "",
        });
      } else {
        console.error("Error fetching project data:", err);
        setError("Failed to load project data.");
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetch all projects with basic details.
   */
  const getAllProjects = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_BASE_URL}/projects/home`, {
        withCredentials: true,
      });
      setProjects(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("Failed to load projects.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Add a project by repopulating its data and sending it to the backend.
   * @param {number} newProjectID - The project ID for the new project.
   * @returns {ProjectData | null} - The newly created project data.
   */
  const addProject = async (
    newProjectID: number
  ): Promise<ProjectData | null> => {
    try {
      // Fetch the project data for the given ID
      const { data: projectData } = await axios.get(
        `${API_BASE_URL}/projects/${newProjectID}`,
        { withCredentials: true }
      );

      // Put the data to create the new project
      const { data: newProject } = await axios.put(
        `${API_BASE_URL}/projects/${newProjectID}`,
        projectData,
        { withCredentials: true }
      );

      setProject(newProject); // Update state with the new project
      return newProject; // Return the new project data
    } catch (err) {
      console.error("Error adding project:", err);
      setError("Failed to add project. Please try again.");
      return null;
    }
  };

  /**
   * Update the title of the current project.
   * @param {string} newTitle - The new title for the project.
   */
  const updateProject = async (newTitle: string) => {
    if (!project) {
      setError("No project data available to update.");
      return;
    }

    try {
      const { data } = await axios.put(
        `${API_BASE_URL}/projects/${project.id}`,
        { title: newTitle },
        { withCredentials: true }
      );
      setProject((prev) => (prev ? { ...prev, title: data.title } : null)); // Update only the title
    } catch (err) {
      console.error("Error updating project title:", err);
      setError("Failed to update project title. Please try again.");
    }
  };

  /**
   * Delete the current project by its ID.
   */
  const deleteProject = async () => {
    if (!project) {
      setError("No project data available to delete.");
      return;
    }

    try {
      await axios.delete(`${API_BASE_URL}/projects/${project.id}`, {
        withCredentials: true,
      });
      setProject(null); // Clear state on successful deletion
      alert("Project deleted successfully.");
    } catch (err) {
      console.error("Error deleting project:", err);
      setError("Failed to delete project. Please try again.");
    }
  };

  return {
    project,
    projects, // List of all projects
    setProject,
    loading,
    error,
    getProject,
    getAllProjects,
    addProject,
    updateProject,
    deleteProject,
  };
};

export default useProject;
