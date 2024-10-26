import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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
   * Ensures that the response is an array before setting it in state.
   */
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get("/api/projects"); // API call to get user's projects
        setProjects(Array.isArray(data) ? data : []); // Ensure data is an array
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
    <div className="projects-grid">
      {/* Button to create a new project */}
      <div className="project-tile create-new">
        <button type="button" onClick={handleCreateNewProject}>
          <span className="plus-sign">+</span>
          <span>Create New</span>
        </button>
      </div>

      {/* Display each project with thumbnail and title, linking to the project details */}
      {projects.map(({ pid, thumbnailUrl, title }) => (
        <div className="project-tile" key={pid}>
          <Link to={`/projects/${pid}`}>
            <img src={thumbnailUrl} alt={`Thumbnail for ${title}`} />
            <div className="project-title">{title}</div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Homepage;
