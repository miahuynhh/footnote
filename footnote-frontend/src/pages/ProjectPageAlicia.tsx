/**
 * ProjectPage.tsx
 *
 * This file defines the `ProjectPage` React component, which serves as the main page
 * for viewing and managing a specific project. It handles both new and existing projects.
 */

import React, { useState, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../components/Header";
import VideoPlayer from "../components/VideoPlayer";
import Annotation from "../components/Annotation/Annotation";
import useProject from "../hooks/useProject";
import axios from "axios";
import { API_BASE_URL } from "../config";

const ProjectPage: React.FC = () => {
  const { projectID } = useParams<{ projectID: string }>(); // Get projectID from URL
  const parsedProjectID =
    projectID === "new" ? null : parseInt(projectID || "0", 10);

  const { project, setProject, loading, error } = useProject(parsedProjectID);

  const [isVideoUploaded, setIsVideoUploaded] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  // Handle title updates
  const handleTitleChange = async (newTitle: string) => {
    if (!project) return;

    try {
      await axios.put(
        `${API_BASE_URL}/projects/edit-project-name`,
        { projectName: newTitle, projectID: project.id },
        { withCredentials: true }
      );
      setProject((prev) => (prev ? { ...prev, title: newTitle } : null));
    } catch (err) {
      console.error("Error updating project title:", err);
    }
  };

  // Handle video uploads
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "video/mp4") {
      const fileUrl = URL.createObjectURL(file); // Create a URL for the video file
      setVideoUrl(fileUrl); // Set the video preview URL
      setIsVideoUploaded(true);
      updateVideoUpload(file); // Upload the file to the backend
    } else {
      alert("Please upload a valid MP4 file.");
    }
  };

  // Upload the video to the backend
  const updateVideoUpload = async (file: File) => {
    if (!project) return;

    try {
      const formData = new FormData();
      formData.append("video", file);
      formData.append("projectID", project.id.toString());

      const response = await axios.post(
        `${API_BASE_URL}/videos/upload-video`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const newVideoURL = response.data.videoURL;
      setProject((prev) => (prev ? { ...prev, videoURL: newVideoURL } : null));
      alert("Video uploaded successfully!");
    } catch (err) {
      console.error("Error uploading video:", err);
      alert("Failed to upload video. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-danger">{error}</div>;
  }

  return (
    <section id="project-page" className="block project-page-block">
      <Container>
        {/* Header Section */}
        <Row>
          <Col>
            <Header
              title={project?.title || "Untitled Project"}
              onTitleChange={handleTitleChange}
            />
          </Col>
        </Row>

        {/* Main Content: Video Player and Annotations */}
        <Row className="mt-4">
          <Col md={6} className="d-flex justify-content-center">
            <div className="video-upload-section">
              {isVideoUploaded ? (
                <VideoPlayer
                  projectID={project?.id || 0}
                  videoURL={videoUrl || ""}
                />
              ) : (
                <div>
                  <p>Upload a video to get started:</p>
                  <input
                    type="file"
                    accept="video/mp4"
                    onChange={handleFileUpload}
                  />
                </div>
              )}
            </div>
          </Col>
          <Col md={6} className="d-flex justify-content-center">
            <Annotation projectID={project?.id || 0} />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProjectPage;
