/**
 * UserHome.tsx
 *
 * This file defines the `UserHome` React component, which serves as the user's main homepage
 * for managing projects. It displays a list of projects retrieved from the backend and includes
 * a button for creating a new project.
 *
 * Features:
 * - Fetches user projects from the backend using the `useProject` hook.
 * - Handles loading, error states, and fallback to mock projects if the API fails.
 * - Uses a reusable `ProjectCard` component for project display.
 * - Integrates navigation for creating and viewing individual projects.
 */
import React from "react";
import { useNavigate } from "react-router-dom"; // For navigation to project pages
import Container from "react-bootstrap/Container"; // Bootstrap container for layout
import Stack from "react-bootstrap/Stack"; // Bootstrap stack for horizontal layout
import ProjectCard from "../components/ProjectCard"; // Reusable project card component
import useProject from "../hooks/useProject"; // Custom hook to fetch user projects
import { ProjectData } from "../types/types"; // Type definition for project data
import mockProjects from "../data/mockProjects"; // Mock project data for fallback
import axios from "axios"; // Axios for HTTP requests
import { API_BASE_URL } from "../config"; // Base URL for API requests
import NewProjectIMG from "../assets/footnote.png"; // Thumbnail image for creating a new project

/**
 * UserHome is a React functional component that displays the user's project dashboard.
 * It includes an option to create a new project and displays either fetched projects
 * or mock projects on error.
 *
 * @returns {JSX.Element} - The user home page.
 */
const UserHome: React.FC = () => {
  const { projects, loading, error } = useProject(); // Fetch projects using custom hook
  const navigate = useNavigate(); // Hook for navigating between routes

  // Define the placeholder for the "Create a New Project" card
  const newProject: ProjectData = {
    id: 0,
    title: "Create a New Project",
    thumbnailURL: NewProjectIMG, // Image asset for the card
    videoURL: "", // No associated video for new projects
  };

  /**
   * Handles the creation of a new project.
   * Sends a request to the backend to create a new project and navigates to its page.
   */
  const handleCreateNewProject = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/projects/create-project`,
        { withCredentials: true } // Include credentials (cookies) for authentication
      );
      const newPid = response.data.pid; // Extract the project ID from the response
      console.log(newPid); // Log the new project ID for debugging
      navigate(`/project/${newPid}`); // Navigate to the newly created project's page
    } catch (error) {
      console.error("Error creating a new project:", error); // Log the error for debugging
    }
  };

  // Determine whether to show mock projects (if loading is complete and there is an error)
  const shouldShowMockProjects = !loading && error;

  return (
    <section id="homepage" className="block homepage-block">
      <Container>
        <div className="title-holder">
          <h1 className="text-center mb-4">Project Home</h1>
        </div>
        {/* Error message if projects fail to load */}
        {error && (
          <p className="text-center text-danger">
            Unable to fetch projects. Showing mock projects instead.
          </p>
        )}
        <Stack
          direction="horizontal"
          gap={3}
          className="justify-content-center"
          style={{ width: "100%", flexWrap: "nowrap" }}
        >
          {/* Card for creating a new project */}
          <div>
            <ProjectCard
              project={newProject}
              buttonText="Create New Project"
              onClick={handleCreateNewProject}
            />
          </div>
          {/* Display mock projects or fetched projects */}
          {shouldShowMockProjects
            ? mockProjects.map((project) => (
                <div key={project.id}>
                  <ProjectCard
                    project={project}
                    buttonText="View Project"
                    onClick={() => navigate(`/project/${project.id}`)} // Navigate to the project's page
                  />
                </div>
              ))
            : projects.map((project) => (
                <div key={project.id}>
                  <ProjectCard
                    project={project}
                    buttonText="View Project"
                    onClick={() => navigate(`/project/${project.id}`)} // Navigate to the project's page
                  />
                </div>
              ))}
        </Stack>
      </Container>
    </section>
  );
};

export default UserHome; // Export the component for use in routing
