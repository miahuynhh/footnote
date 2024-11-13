import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Annotation from "../components/Annotation/Annotation";
import ReactPlayer from "react-player";
import video from "../assets/dog.mp4"; // Default video (can be replaced after upload)
import { ChangeEvent } from "react";
import axios from "axios";

const AnnotationPage: React.FC = () => {
  const playerRef = useRef<ReactPlayer>(null);

  const [title, setTitle] = useState<string>("Untitled");
  const [timestamp, setTimestamp] = useState<number>(0);
  const [videoUrl, setVideoUrl] = useState<string>(video); // State to hold the video URL
  const [isVideoUploaded, setIsVideoUploaded] = useState<boolean>(false); // Track if video is uploaded

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null); // debouncing the POST request

  let { pid } = useParams<"pid">();

  const handlePause = () => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      setTimestamp(currentTime);
      console.log("Video paused at:", timestamp);
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
      if (pid) {
        updateProjectName(event.target.value, pid); // Use projectId to update the project title
      }
    }, 1000);
  };

  // Send request to backend to update project name
  const updateProjectName = async (newTitle: string, pid: string) => {
    try {
      console.log(newTitle);
      await axios.put(
        `http://localhost:3000/projects/edit-project-name`,
        { projectName: newTitle, pid: pid },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Error updating project name: ", error);
    }
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "video/mp4") {
      const fileUrl = URL.createObjectURL(file); // Create a URL for the video file
      setVideoUrl(fileUrl);
      setIsVideoUploaded(true);
      setVideoUrl(fileUrl);
      setIsVideoUploaded(true);
    } else {
      alert("Please upload a valid MP4 file.");
    }
  };

  return (
    <Container fluid>
      <Row className="bg-primary text-white p-3 mb-3">
        <Col>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="form-control text-center"
            style={{
              fontSize: "2rem",
              backgroundColor: "transparent",
              border: "none",
              color: "white",
            }}
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <div
            className="d-flex justify-content-center align-items-center"
            style={{
              width: "100%",
              height: "300px",
              backgroundColor: "#f0f0f0", // Grey background
              border: "2px dashed #ccc", // Dashed border for the placeholder
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
                <p style={{ position: "absolute", color: "#888" }}>
                  Click to upload video
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
        // TODO: the projectID should be retreived from the project page
        <Col md={6}>
          <div className="w-100">
            <Annotation projectID={0} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AnnotationPage;
