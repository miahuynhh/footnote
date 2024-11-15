import React from "react";
import { useNavigate } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import useProject from "../hooks/useProject";
import { ProjectData } from "../types/types";
import axios from "axios";
import { API_BASE_URL } from "../config";

const UserHome: React.FC = () => {
  const { projects, error } = useProject();
  const navigate = useNavigate();

  const newProject: ProjectData = {
    id: 0,
    title: "Create Project",
    thumbnailURL:
      "https://private-user-images.githubusercontent.com/67350424/386543382-e9379069-cf91-4fac-8d67-fe5ff79a129c.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzE2NjM3NzAsIm5iZiI6MTczMTY2MzQ3MCwicGF0aCI6Ii82NzM1MDQyNC8zODY1NDMzODItZTkzNzkwNjktY2Y5MS00ZmFjLThkNjctZmU1ZmY3OWExMjljLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDExMTUlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMTE1VDA5Mzc1MFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTdkODQyYWE2MWU3MmE5ZWU4MmVlOTk1YzcwYjhkMmYyNDM5NzQ0YTY5YmIyMjhkZmU3N2Y2ZjhhZDQ2NjBhOTUmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.7LPXA86cyl539RKpVWveJ3qyq8VTo2mb4YIGaJLX9Ls",
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

  return (
    <section id="homepage" className="block homepage-block">
      <div className="page-border-wrapper"> {/* Container with border */}
        <div className="page-content"> {/* Inner content container */}
          <div className="header">
            <div className="text">Home</div>
            <div className="underline" />
            <div className="underline-gap" style={{ marginTop: "40px" }}> {/* New gap element */}</div>
          </div>

          {error && (
            <p className="text-center text-danger">
              Unable to fetch projects. Showing mock projects instead.
            </p>
          )}

          <div className="hstack gap-3"> {/* Container for project cards */}
            <div className="spacer"></div> {/* Spacer for left padding */}
            <div>
              <ProjectCard
                project={newProject}
                onClick={handleCreateNewProject}
              />
            </div>
            {projects.length > 0 && (
              <>
                {projects.map((project) => (
                  <div key={project.id}>
                    <ProjectCard
                      project={project}
                      onClick={() => navigate(`/project/${project.id}`)}
                    />
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserHome;
