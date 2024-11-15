import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import ProjectCard from "../components/ProjectCard";
import useProject from "../hooks/useProject";
import { ProjectData } from "../types/types";
import mockProjects from "../data/mockProjects";
import axios from "axios";
import { API_BASE_URL } from "../config";

const UserHome: React.FC = () => {
  const { projects, loading, error } = useProject();
  const navigate = useNavigate();

  const newProject: ProjectData = {
    id: 0,
    title: "Create a New Project",
    thumbnailURL:
      "https://cdn.discordapp.com/attachments/1264335829665448039/1306489603632398408/file-hu0jIFPQTu4pGA4RKhIGQqCY.png?ex=6736dac2&is=67358942&hm=5d6e5dc2f35129437af8b401553b68e6e4a4183027e91fe80c4b76d6563f8521&",
    videoURL: "",
  };

  const handleCreateNewProject = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/projects/create-project`,
        { withCredentials: true }
      );
      const newPid = response.data.pid;
      console.log(newPid);
      navigate(`/project/${newPid}`);
    } catch (error) {
      console.error("Error creating a new project:", error);
    }
  };

  const shouldShowMockProjects = !loading && (error || projects.length === 0);

  return (
    <section id="homepage" className="block homepage-block">
      <Container>
        <div className="title-holder">
          <h1 className="text-center mb-4">Project Home</h1>
        </div>
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
          <div>
            <ProjectCard
              project={newProject}
              buttonText="Create New Project"
              onClick={handleCreateNewProject}
            />
          </div>
          {shouldShowMockProjects
            ? mockProjects.map((project) => (
                <div key={project.id}>
                  <ProjectCard
                    project={project}
                    buttonText="View Project"
                    onClick={() => navigate(`/project/${project.id}`)}
                  />
                </div>
              ))
            : projects.map((project) => (
                <div key={project.id}>
                  <ProjectCard
                    project={project}
                    buttonText="View Project"
                    onClick={() => navigate(`/project/${project.id}`)}
                  />
                </div>
              ))}
        </Stack>
      </Container>
    </section>
  );
};

export default UserHome;
