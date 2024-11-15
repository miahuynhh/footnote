import { useState, useEffect } from "react";
import axios from "axios";
import { ProjectData } from "../types/types";
import { API_BASE_URL } from "../config";

/**
 * Custom hook for fetching and managing a single project's data by projectID.
 *
 * @param {number | null} projectID - The ID of the project to fetch. If null, the project is new.
 * @returns {Object} - An object containing project data, a setter for the project, loading, and error states.
 */
const useProject = (projectID: number | null) => {
  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      if (projectID === null) {
        // Default state for new projects
        setProject({
          id: 0,
          title: "Untitled Project",
          videoURL: "",
          thumbnailURL: "",
        });
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.get(
          `${API_BASE_URL}/projects/${projectID}`,
          { withCredentials: true }
        );
        setProject(data);
      } catch (err: any) {
        // Handle 404 Not Found for new projects
        if (err.response?.status === 404) {
          setProject({
            id: projectID,
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

    fetchProject();
  }, [projectID]);

  return { project, setProject, loading, error };
};

export default useProject;
