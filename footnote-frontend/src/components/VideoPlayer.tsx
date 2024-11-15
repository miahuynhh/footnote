/**
 * VideoPlayer.tsx
 *
 * This file defines the `VideoPlayer` React component, which uses the `react-player`
 * library to provide video playback functionality. If no video is available, it allows
 * the user to upload a video, which is then sent to the backend.
 *
 * Features:
 * - Responsive video player using `ReactPlayer`.
 * - Video upload functionality for missing videos.
 * - Sends uploaded video to the backend via API.
 */

import React, { useState } from "react";
import ReactPlayer from "react-player"; // Import ReactPlayer for video playback
import { Container, Form } from "react-bootstrap"; // Bootstrap for styling
import axios from "axios";
import { API_BASE_URL } from "../config";

interface VideoPlayerProps {
  projectID: number; // ID of the project associated with the video
  videoURL: string; // URL of the video to play
  onVideoUploaded: (newVideoURL: string) => void; // Callback to update the video URL after upload
}

/**
 * VideoPlayer is a React functional component that renders a responsive video player
 * using the `react-player` library. If no video exists, it provides an option to upload one.
 *
 * @param {VideoPlayerProps} props - Props for the VideoPlayer component.
 * @returns {JSX.Element} - A video player or an upload option.
 */
const VideoPlayer: React.FC<VideoPlayerProps> = ({
  projectID,
  videoURL,
  onVideoUploaded,
}) => {
  const [uploading, setUploading] = useState(false); // State to track upload status
  const [error, setError] = useState<string | null>(null); // State to track upload errors

  /**
   * Handles video file selection and upload to the backend.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event - File input change event.
   */
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("video", file);
    formData.append("projectID", projectID.toString());

    try {
      setUploading(true);
      setError(null);

      const response = await axios.post(
        `${API_BASE_URL}/projects/upload-video`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      const newVideoURL = response.data.videoURL;
      onVideoUploaded(newVideoURL); // Update the video URL in the parent component
    } catch (err) {
      console.error("Error uploading video:", err);
      setError("Failed to upload video. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  if (!videoURL) {
    return (
      <Container className="text-center p-3">
        <p className="text-warning">No video available for this project.</p>
        {error && <p className="text-danger">{error}</p>}
        <Form>
          <Form.Group controlId="formFileUpload">
            <Form.Label>Upload a video for this project:</Form.Label>
            <Form.Control
              type="file"
              accept="video/*"
              onChange={handleFileUpload}
            />
          </Form.Group>
        </Form>
        {uploading && <p>Uploading video...</p>}
      </Container>
    );
  }

  return (
    <div className="video-player-container">
      <ReactPlayer
        url={videoURL} // Video URL passed as a prop
        controls // Show playback controls
        width="100%" // Make the player responsive
        height="100%" // Match height proportionally
        playing={false} // Video starts paused by default
        className="react-player" // Custom class for additional styling
      />
    </div>
  );
};

export default VideoPlayer;
