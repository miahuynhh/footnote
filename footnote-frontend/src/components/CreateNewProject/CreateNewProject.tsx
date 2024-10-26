import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

/**
 * CreateNewProject component allows users to create a new project by uploading a video and setting a title.
 */
const CreateNewProject: React.FC = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a video file.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("video", file);

    try {
      // Update with your actual backend server URL
      const response = await axios.post(
        "http://localhost:5000/upload-video",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Navigate to the new project's page
      navigate(`/projects/${response.data.data}`); // Adjust if needed to match returned project ID
    } catch (err) {
      console.error("Error uploading project:", err);
      setError("Failed to upload project.");
    }
  };

  return (
    <div>
      <h1>Create New Project</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          required
        />
        <button type="submit">Upload Video</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default CreateNewProject;
