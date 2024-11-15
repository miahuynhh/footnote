import React from "react";
import { ProjectData } from "../types/types";
import "./ProjectCard.css";

interface Props {
  project: ProjectData;
  onClick: () => void;
}

const ProjectCard: React.FC<Props> = ({ project, onClick }) => {
  const { title, thumbnailURL } = project;
  const placeholderPic = "https://private-user-images.githubusercontent.com/67350424/386536815-299b2790-60f4-49c8-8c9e-f85d881c8eaa.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzE2NjI5NDIsIm5iZiI6MTczMTY2MjY0MiwicGF0aCI6Ii82NzM1MDQyNC8zODY1MzY4MTUtMjk5YjI3OTAtNjBmNC00OWM4LThjOWUtZjg1ZDg4MWM4ZWFhLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDExMTUlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMTE1VDA5MjQwMlomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTllMmVhMDg4YjVjNzUyNjgxNzM1YzAxMmZmZjI2NTVjZmJkY2M3ZmI5ZWY5ZmRjZGE3Y2NiOTIyMGNmYjZkNjMmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.feahjUZ6iLgafR7C46pgoISD1up_gg7ZMwgnfRnJP6k";

  return (
    <div className="project-card" onClick={onClick}>
      <img src={thumbnailURL || placeholderPic} alt={title} />
      <p className="project-title">{title || "Untitled"}</p>
    </div>
  );
};

export default ProjectCard;
