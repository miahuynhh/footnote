import React, { useRef, ChangeEvent, useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";

import { Container, Row, Col, Button } from "react-bootstrap";

import Annotation from "../components/Annotation/Annotation";

import ReactPlayer from "react-player";

import useProject from "../hooks/useProject";

import axios from "axios";

import { API_BASE_URL } from "../config";

const AnnotationPage: React.FC = () => {
  const navigate = useNavigate();

  const { pid } = useParams<"pid">(); // Get the project ID from the URL

  const projectID = pid ? parseInt(pid, 10) : null; // Parse the project ID as a number

  const { project, setProject, deleteProject, loading, error, updateProject } =
    useProject(projectID); // Use custom hook for project management

  const playerRef = useRef<ReactPlayer>(null);

  const [titleInput, setTitleInput] = React.useState(project?.title || ""); // Local state for the input field

  useEffect(() => {
    if (project) {
      setTitleInput(project.title || ""); // Initialize input with the project's title

      document.title = project.title || "Untitled Project"; // Update the document title
    }
  }, [project]);

  if (loading) return <div>Loading...</div>;

  if (error) return <div className="text-danger">{error}</div>;

  /**

* Handle the title input keydown event and update the project title on Enter.

* @param {React.KeyboardEvent<HTMLInputElement>} event - The keyboard event.

*/

  const handleTitleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      const newTitle = titleInput.trim();

      if (newTitle && newTitle !== project?.title) {
        try {
          await updateProject(newTitle);
        } catch (err) {
          console.error("Failed to update project title:", err);

          alert("Error updating the project title. Please try again.");
        }
      }
    }
  };

  /**

* Handle changes to the title input field.

* @param {React.ChangeEvent<HTMLInputElement>} event - The input change event.

*/

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleInput(event.target.value);
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
        <div className="container">
          <input
            type="text"
            value={titleInput}
            onChange={handleTitleChange}
            onKeyDown={handleTitleKeyDown} // Update project on Enter key press
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

        <Col md={6}>
          <div
            className="d-flex justify-content-center align-items-center"
            style={{
              width: "100%",

              height: "300px",

              backgroundColor: "#f0f0f0", // Grey background

              border: "2px dashed #ccc", // Dashed border for placeholder

              borderRadius: "10px",

              cursor: "pointer",

              position: "relative",
            }}
            onClick={() => document.getElementById("file-input")?.click()} // Trigger file input on click
          >
            {!project?.videoURL ? (
              <>
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
                url={project.videoURL} // Video URL from project
                width="100%"
                height="100%"
              />
            )}
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

        <Col md={6}>
          <div className="w-100">
            <Annotation projectID={projectID || 0} />
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
    </Container>
  );
};

export default AnnotationPage;
