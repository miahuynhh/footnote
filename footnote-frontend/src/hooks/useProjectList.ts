import { useState, useEffect } from "react";
import axios from "axios";
import { ProjectData } from "../types/types";
import { API_BASE_URL } from "../config";

const useProject = () => {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
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
    fetchProjects();
  }, []);

  return { projects, loading, error };
};

export default useProject;
