import { useState, useEffect } from "react";
import axios from "axios";
import { ProjectData } from "../types/types";
import { API_BASE_URL } from "../config";

/**
 * useProject.ts
 *
 * Custom hook for managing project CRUD operations and fetching all projects.
 *
 * This hook abstracts all the logic required for interacting with project-related data,
 * including fetching individual or multiple projects, adding new projects, updating project titles,
 * and deleting projects. It also provides loading and error states for better UI handling.
 *
 * ### Usage
 *
 * #### Importing the Hook
 * ```typescript
 * import useProject from "../hooks/useProject";
 * ```
 *
 * #### Initialize the Hook
 * ```typescript
 * const {
 *   project,
 *   projects,
 *   setProject,
 *   loading,
 *   error,
 *   getProject,
 *   getAllProjects,
 *   addProject,
 *   updateProject,
 *   deleteProject
 * } = useProject(projectID);
 * ```
 * - `projectID`: Pass a number for an existing project or `null` for a new project.
 *
 * #### Returned Values and Functions
 * - `project`: The currently selected project (`ProjectData | null`).
 * - `projects`: A list of all projects (`ProjectData[]`).
 * - `setProject`: Function to manually update the current project state.
 * - `loading`: `boolean` indicating whether an operation is in progress.
 * - `error`: A `string` containing an error message if something goes wrong.
 * - `getProject`: Function to fetch a single project by its ID.
 * - `getAllProjects`: Function to fetch all project metadata.
 * - `addProject`: Function to add a new project by repopulating and sending its data to the backend.
 * - `updateProject`: Function to update the title of the current project.
 * - `deleteProject`: Function to delete the current project by its ID.
 *
 * ### Example: Fetching a Single Project
 * ```tsx
 * import React from "react";
 * import useProject from "../hooks/useProject";
 *
 * const ProjectPage = ({ projectID }: { projectID: number }) => {
 *   const { project, loading, error } = useProject(projectID);
 *
 *   if (loading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error}</div>;
 *
 *   return (
 *     <div>
 *       <h1>{project?.title || "Untitled Project"}</h1>
 *       <p>Video URL: {project?.videoURL}</p>
 *       <img src={project?.thumbnailURL} alt="Project Thumbnail" />
 *     </div>
 *   );
 * };
 *
 * export default ProjectPage;
 * ```
 *
 * ### Example: Adding a New Project
 * ```tsx
 * const handleAddProject = async () => {
 *   const newProjectID = 5; // Example new project ID
 *   const newProject = await addProject(newProjectID);
 *   if (newProject) {
 *     console.log("Project added:", newProject);
 *   }
 * };
 * ```
 *
 * ### Example: Updating a Project Title
 * ```tsx
 * const handleUpdateProject = async () => {
 *   await updateProject("Updated Project Title");
 *   console.log("Project title updated.");
 * };
 * ```
 *
 * ### Example: Deleting a Project
 * ```tsx
 * const handleDeleteProject = async () => {
 *   if (confirm("Are you sure you want to delete this project?")) {
 *     await deleteProject();
 *     console.log("Project deleted.");
 *   }
 * };
 * ```
 *
 * @param {number | null} projectID - The ID of the project to fetch. If null, the hook initializes for a new project.
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
