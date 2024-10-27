import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Homepage.css";

interface Project {
  pid: string; // Unique identifier for the project in the database
  thumbnailUrl: string; // URL for the project's thumbnail image
  title: string; // Name/title of the project
  videoUrl: string; // URL for the project's video
}

/**
 * Homepage component that displays the user's list of projects on their personalized homepage.
 * Each project links to a detailed project page with video and annotations.
 * A "Create New" button allows users to start a new project by uploading a video.
 */
const Homepage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  /**
   * Fetches the user's projects from the backend when the component mounts.
   */
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get("/api/projects"); // API call to backend
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

  /**
   * Navigates to the new project upload page when the "Create New" button is clicked.
   */
  const handleCreateNewProject = () => {
    navigate("/projects/new"); // Routes to the new project page
  };

  // Loading or error handling display
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="projects-container">
      {Array.from({ length: 3 }).map((_, index) => {
        const project = projects[index];

        return (
          <div className="card project-card" key={index}>
            {project ? (
              <>
                <img
                  src={project.thumbnailUrl}
                  className="card-img-top"
                  alt={`Thumbnail for ${project.title}`}
                />
                <div className="card-body">
                  <h5 className="card-title">{project.title}</h5>
                  <p className="card-text">
                    Click below to view project details.
                  </p>
                  <Link
                    to={`/projects/${project.pid}`}
                    className="btn btn-primary"
                  >
                    View Project
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="card-body empty-card">
                  <h5 className="card-title">Create New Project</h5>
                  <button
                    type="button"
                    className="btn btn-primary create-btn"
                    onClick={handleCreateNewProject}
                  >
                    <span className="plus-sign"></span> Create New
                  </button>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Homepage;
