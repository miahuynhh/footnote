import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import Annotation from "../../components/Annotation/Annotation";
import ReactPlayer from "react-player";
import useProject from "../../hooks/useProject";
import axios from "axios";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import pencil from "../../assets/pencil.ico";
import arrow from "../../assets/arrow.png";

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

  return (
    <Container fluid>
      {/* Project Title */}

      <Row className="text-white p-1 mb-1">
        <div>
          <button
            className="back-home-button"
            onClick={() => navigate("/home")}
          >
            Back to Project Home
          </button>
        </div>
        <div className="container">
          <input
            type="text"
            value={titleInput}
            onChange={handleTitleChange}
            className="form-control text-center input-field"
            style={{
              fontSize: "48px",
              fontWeight: "650",
              color: "#3c009d",
              backgroundColor: "transparent",
              border: "none",
              width: "400px",
              outline: "none",
            }}
            placeholder="Enter Project Title"
          />

          <div className="underline" />
        </div>
      </Row>

      {/* Video and Annotations */}

      <Row className="mb-1">
        {/* Video Section */}

        <Col md={7}>
          <div
            className="d-flex justify-content-center align-items-center"
            style={{
              width: "100%",
              height: "500px",
              backgroundColor: "#f0f0f0", // Grey background
              border: "2px dashed #ccc", // Dashed border for placeholder
              borderRadius: "10px",
              position: "relative",
            }}
          >
            {!project?.videoURL ? (
              <>
                {/* <span
                  style={{
                    fontSize: "3rem",
                    color: "#888",
                    position: "absolute",
                  }}
                >
                  +
                </span> */}

                <p
                  style={{
                    position: "absolute",
                    color: "#888",
                    top: "50px",
                    right: "90px",
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  Import Video
                </p>

                <p
                  style={{
                    position: "absolute",
                    color: "#888",
                    top: "75px",
                    right: "120px",
                    fontSize: "12px",
                    fontWeight: "500",
                  }}
                >
                  .MP4
                </p>

                <img
                  src={arrow} // Provide the relative path to your pencil.ico image
                  alt="arrow points to pencil"
                  style={{
                    position: "absolute",
                    top: "30px",
                    right: "55px",
                    width: "30px", // Adjust the size of the image as needed
                    height: "30px",
                    opacity: 0.9,
                  }}
                />
              </>
            ) : (
              <ReactPlayer
                controls={true}
                ref={playerRef}
                onPause={handlePause}
                onSeek={handleSeek}
                url={project.videoURL} // Video URL from project
                width="100%" // Ensure it fits in the container
                height="100%"
              />
            )}

            <button
              onClick={() => document.getElementById("file-input")?.click()} // Trigger file input on click
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                padding: "5px 10px",
                border: "none",
                cursor: "pointer",
                zIndex: 10, // Ensure the button is above other elements
              }}
            >
              <img
                src={pencil} // Provide the relative path to your pencil.ico image
                alt="pencil"
                style={{
                  width: "20px", // Adjust the size of the image as needed
                  height: "20px",
                }}
              />
            </button>
          </div>

          <input
            id="file-input"
            type="file"
            accept="video/mp4"
            onChange={handleFileUpload}
            style={{ display: "none" }} // Hidden file input
          />
        </Col>

        {/* Annotation Section */}

        <Col md={5}>
          <div className="w-100">
            <Annotation
              projectID={projectID || 0}
              timestamp={timestamp}
              onTimestampClick={handleTimestampClick}
            />
          </div>
        </Col>
      </Row>

      {/* Delete Project Button */}

      <Row className="mt-4">
        <Col className="text-center">
          <Button variant="danger" onClick={handleDeleteProject}>
            Delete Project
          </Button>
        </Col>
      </Row>

      <div>
        <LogoutButton></LogoutButton>
      </div>
    </Container>
  );
};

export default ProjectPage;
