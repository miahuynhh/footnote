import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactPlayer from "react-player";

interface Annotation {
  timestamp: number;
  text: string;
}

interface ProjectData {
  pid: string;
  videoUrl: string;
  title: string;
  annotations: Annotation[];
}

/**
 * Project component displays a single project's video, title, and annotations.
 */
const Project: React.FC = () => {
  const { pid } = useParams<{ pid: string }>(); // Retrieve project ID from URL parameters
  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const { data } = await axios.get(`/api/projects/${pid}`);
        setProject(data);
      } catch (err) {
        console.error("Error fetching project details:", err);
        setError("Failed to load project details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [pid]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {project && (
        <>
          <h1>{project.title}</h1>
          <ReactPlayer url={project.videoUrl} controls />
          <h2>Annotations</h2>
          <ul>
            {project.annotations.map((annotation, index) => (
              <li key={index}>
                {annotation.timestamp}: {annotation.text}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Project;
