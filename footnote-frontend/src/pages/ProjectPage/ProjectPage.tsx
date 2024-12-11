import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Annotation from "../../components/Annotation/Annotation";
import ReactPlayer from "react-player";
import useProject from "../../hooks/useProject";
import axios from "axios";
import "./ProjectPage.css";
import homeIcon from "../../assets/home-button.png";
import deleteIcon from "../../assets/delete-button.png";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import uploadIcon from "../../assets/upload.png";
import closeButton from "../../assets/close-button.png";
import importMessage from "../../assets/import-message-window.png";

import { API_BASE_URL } from "../../config";

const ProjectPage: React.FC = () => {
  const navigate = useNavigate();

  const { pid } = useParams<"pid">(); // Get the project ID from the URL
  const projectID = pid ? parseInt(pid, 10) : null; // Parse the project ID as a number

  const { project, setProject, deleteProject, loading, error, updateProject } =
    useProject(projectID); // Use custom hook for project management

  const playerRef = useRef<ReactPlayer>(null);
  const [titleInput, setTitleInput] = React.useState(project?.title || ""); // Local state for the input field
  const [timestamp, setTimestamp] = useState<number>(0);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null); // debouncing the POST request
  const [showImportMessage, setShowImportMessage] = useState(true);

  useEffect(() => {
    if (project) {
      setTitleInput(project.title || ""); // Initialize input with the project's title
      document.title = project.title || "Untitled Project"; // Update the document title
    }
  }, [project]);

  if (loading) return <div>Loading...</div>;

  if (error) return <div className="text-danger">{error}</div>;

  const handleSeek = (newTimestamp: number) => {
    setTimestamp(newTimestamp);
    console.log("Video scrubbed to:", newTimestamp);
  };

  // Handle the timestamp click and update the timestamp
  const handleTimestampClick = (newTimestamp: number) => {
    setTimestamp(newTimestamp);
    if (playerRef.current) {
      playerRef.current.seekTo(newTimestamp, "seconds");
    }
    console.log("Video seeked to timestamp:", newTimestamp);
  };

  const handlePause = () => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      setTimestamp(currentTime);
      console.log("Video paused at:", timestamp);
    }
  };

  /**
   * Handle changes to the title input field.
   * @param {React.ChangeEvent<HTMLInputElement>} event - The input change event.
   */
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleInput(event.target.value);

    // Clear the previous timeout if any
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Set a new timeout to update the debounced title after 1000ms
    debounceTimeout.current = setTimeout(async () => {
      try {
        await updateProject(event.target.value);
        await setTitleInput(project?.title || "");
      } catch (err) {
        console.error("Failed to update project title:", err);
        alert("Error updating the project title. Please try again.");
      }
    }, 1000);
  };

  /**
   * Handle video file upload.
   * @param {ChangeEvent<HTMLInputElement>} event - The input change event for file upload.
   */
  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      alert("No file selected.");
      return;
    }

    if (file.type !== "video/mp4") {
      alert("Please upload a valid MP4 file.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("video", file); // Append the video file
      formData.append("pid", String(project?.projectID)); // Include the project ID if available

      // Generate a temporary URL for the uploaded video
      const fileUrl = URL.createObjectURL(file);
      setProject((prev) => (prev ? { ...prev, videoURL: fileUrl } : null));

      // Send the file to the backend
      const response = await axios.post(
        `${API_BASE_URL}/videos/upload-video`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Specify form-data encoding
          },
          withCredentials: true, // Include credentials if required
        }
      );

      // Handle success response
      console.log("Video uploaded successfully:", response.data);
      alert("Video uploaded successfully.");
    } catch (error) {
      console.error("Failed to upload video:", error);
      alert("Error uploading video. Please try again.");
    }
  };

  /**
   * Handle project deletion.
   */
  const handleDeleteProject = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project? This action is irreversible."
    );

    if (confirmDelete) {
      try {
        await deleteProject(); // Use hook to delete the project
        navigate("/home"); // Redirect to homepage
      } catch (err) {
        console.error("Failed to delete project:", err);

        alert("Error deleting the project. Please try again.");
      }
    }
  };

  const handleCloseWindow = () => {
    setShowImportMessage(false);
  };

  return (
    <section id="projectpage">
      <Container fluid>
        {/* Project Title */}

        <Row>
          <div className="title-container">
            <input
              type="text"
              value={titleInput}
              onChange={handleTitleChange}
              placeholder="Enter Project Title"
              className="title-input"
            />
          </div>
        </Row>

        {/* Video and Annotations */}

        <Row className="mb-1">
          {/* Video Section */}

          <Col md={7} style={{ paddingRight: "30px", paddingLeft: "0" }}>
            <div className="video-placeholder d-flex justify-content-center align-items-center">
              {!project?.videoURL ? (
                showImportMessage && (
                  <div className="import-message">
                    <img
                      className="import-close-button"
                      src={closeButton}
                      alt="Close button"
                      onClick={handleCloseWindow}
                    />
                    <img
                      className="import-message-image"
                      src={importMessage}
                      alt="import"
                    />
                  </div>
                )
              ) : (
                <ReactPlayer
                  controls={true}
                  ref={playerRef}
                  onPause={handlePause}
                  onSeek={handleSeek}
                  url={project.videoURL}
                  width="100%"
                  height="100%"
                />
              )}

              <button
                className="upload-video-button"
                onClick={() => document.getElementById("file-input")?.click()} // Trigger file input on click
              >
                <img
                  className="upload-video-button-img"
                  src={uploadIcon}
                  alt="upload"
                />
              </button>
            </div>

            <input
              id="file-input"
              type="file"
              accept="video/mp4"
              onChange={handleFileUpload}
              style={{ display: "none" }}
            />
          </Col>

          {/* Annotation Section */}

          <Col className="annotation-section" md={5}>
            <div className="scroll-space"></div>
            <div className="annotation-container">
              <div className="annotation-heading">Notes</div>
              <Annotation
                projectID={projectID || 0}
                timestamp={timestamp}
                onTimestampClick={handleTimestampClick}
              />
            </div>
          </Col>
        </Row>

        {/* Home Button */}
        <div>
          <button className="home-button" onClick={() => navigate("/home")}>
            <img src={homeIcon} alt="Home" className="home-icon" />
          </button>
        </div>

        {/* Delete Project Button */}
        <div>
          <button className="delete-button" onClick={handleDeleteProject}>
            <img src={deleteIcon} alt="Delete" className="delete-icon" />
          </button>
        </div>

        {/* Logout Button */}
        <div>
          <LogoutButton></LogoutButton>
        </div>
      </Container>
    </section>
  );
};

export default ProjectPage;
