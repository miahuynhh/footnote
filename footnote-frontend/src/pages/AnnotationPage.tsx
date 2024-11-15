import React, { useState, useRef, ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import Annotation from "../components/Annotation/Annotation";
import ReactPlayer from "react-player";
import video from "../assets/dog.mp4"; // Default video (can be replaced after upload)
import useProject from "../hooks/useProject";

const AnnotationPage: React.FC = () => {
  const navigate = useNavigate();
  const playerRef = useRef<ReactPlayer>(null);

  const { pid } = useParams<"pid">(); // Get the project ID from the URL
  const projectID = pid ? parseInt(pid, 10) : null; // Parse the project ID as a number

  const { project, deleteProject, setProject } = useProject(projectID);

  const [title, setTitle] = useState<string>(project?.title || "Untitled");
  const [timestamp, setTimestamp] = useState<number>(0);
  const [videoUrl, setVideoUrl] = useState<string>(project?.videoURL || video); // State to hold the video URL
  const [isVideoUploaded, setIsVideoUploaded] = useState<boolean>(
    !!project?.videoURL
  ); // Track if video is uploaded

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null); // debouncing the POST request

  const handlePause = () => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      setTimestamp(currentTime);
      console.log("Video paused at:", currentTime);
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);

    // Clear the previous timeout if any
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Set a new timeout to update the debounced title after 1000ms
    debounceTimeout.current = setTimeout(() => {
      if (projectID) {
        setProject((prev) =>
          prev ? { ...prev, title: event.target.value } : null
        );
        // Add logic to update the title on the backend if needed
      }
    }, 1000);
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "video/mp4") {
      const fileUrl = URL.createObjectURL(file); // Create a URL for the video file
      setVideoUrl(fileUrl);
      setIsVideoUploaded(true);
      // Add logic to upload the file to the backend here if needed
    } else {
      alert("Please upload a valid MP4 file.");
    }
  };

  const handleDeleteProject = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project? This action is irreversible."
    );
    if (confirmDelete && projectID) {
      try {
        await deleteProject(); // Call the hook's deleteProject function
        alert("Project deleted successfully!");
        navigate("/"); // Navigate back to the home page after deletion
      } catch (error) {
        console.error("Error deleting project:", error);
        alert("Failed to delete project. Please try again.");
      }
    }
  };

  return (
    <Container fluid>
      <Row className="text-white p-1 mb-1">
        <div className="container">
          <input
            type="text"
            value={title}
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
          />
          <div className="underline" />
        </div>
      </Row>

      <Row className="mb-1">
        <Col md={6}>
          <div
            className="d-flex justify-content-center align-items-center"
            style={{
              width: "100%",
              height: "300px",
              backgroundColor: "#f0f0f0", // Grey background
              border: "2px dashed #ccc", // Dashed border for the placeholder
              borderRadius: "10px",
              cursor: "pointer",
              position: "relative",
            }}
            onClick={() => document.getElementById("file-input")?.click()} // Trigger file input on click
          >
            {!isVideoUploaded ? (
              <>
                {/* Plus icon placeholder */}
                <span
                  style={{
                    fontSize: "3rem",
                    color: "#888",
                    position: "absolute",
                  }}
                >
                  +
                </span>
                <p
                  style={{
                    position: "absolute",
                    color: "#888",
                    marginTop: "90px",
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
                    marginTop: "140px",
                    fontSize: "12px",
                    fontWeight: "500",
                  }}
                >
                  .MP4
                </p>
              </>
            ) : (
              <ReactPlayer
                controls={true}
                ref={playerRef}
                onPause={handlePause}
                url={videoUrl} // Pass the dynamically set video URL here
                width="100%" // Ensure it fits in the container
                height="100%"
              />
            )}
          </div>
          <input
            id="file-input"
            type="file"
            accept="video/mp4"
            onChange={handleFileUpload}
            style={{ display: "none" }} // Hide the file input element
          />
        </Col>
        <Col md={6}>
          <div className="w-100">
            <Annotation projectID={projectID || 0} />
          </div>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col className="text-center">
          <Button variant="danger" onClick={handleDeleteProject}>
            Delete Project
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default AnnotationPage;
