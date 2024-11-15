/**
 * UserHome.tsx
 *
 * This file defines the `UserHome` React component, which serves as the user's main homepage
 * for managing projects. It displays a list of projects retrieved from the backend and includes
 * a button for creating a new project.
 *
 * Features:
 * - Fetches user projects from the backend using the `useProject` hook.
 * - Handles loading, error states, and displays the projects dynamically.
 * - Uses a reusable `ProjectCard` component for project display.
 * - Integrates navigation for creating and viewing individual projects.
 */

import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import { ProjectData } from "../../types/types";
import NewProjectIMG from "../../assets/footnote.png";
import useProject from "../../hooks/useProject";
import axios from "axios";
import { API_BASE_URL } from "../../config";

const UserHome: React.FC = () => {
  const { projects, getProject, error, loading } = useProject(null);
  const navigate = useNavigate();

  const newProject: ProjectData = {
    id: 0,
    title: "Create a New Project",
    thumbnailURL: NewProjectIMG,
    videoURL: "",
  };

  /**
   * Handles the creation of a new project.
   * Requests the backend to create a project, fetches its data, and navigates to its page.
   */
  const handleCreateNewProject = async () => {
    try {
      // Request the backend to create a new project and get its ID
      const response = await axios.get(
        `${API_BASE_URL}/projects/create-project`,
        { withCredentials: true }
      );
      const newProjectID = response.data.pid;

      console.log("New Project ID:", newProjectID);

      // Fetch the newly created project using its ID
      await getProject(newProjectID);

      // Navigate to the new project page
      navigate(`/project/${newProjectID}`);
    } catch (error) {
      console.error("Error creating a new project:", error);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <section id="homepage" className="block homepage-block">
      <Container>
        <div className="title-holder">
          <h1 className="text-center mb-4">Project Home</h1>
        </div>
        {/* Error message if projects fail to load */}
        {error && <p className="text-center text-danger">{error}</p>}
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
          {/* Display fetched projects */}
          {projects.map((project) => (
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

export default UserHome;
