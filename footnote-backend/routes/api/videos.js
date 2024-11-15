const express = require("express");
const multer = require("multer"); // Middleware for handling file uploads
const { uploadToS3 } = require("../../services/s3Service"); // Import the S3 upload function

const router = express.Router();
const conn = require("../../config/database");

// Configure multer to store uploaded files in memory (in a buffer)
const upload = multer({ storage: multer.memoryStorage() });

/**
 * POST /upload-video
 *
 * Route for uploading a video file. The file is uploaded to the server, and then stored in
 * DigitalOcean Spaces using the AWS SDK. The route expects a single video file and returns
 * the URL of the uploaded file.
 *
 * @name POST /upload-video
 * @function
 * @param {string} path - Express route path.
 * @param {callback} middleware - Middleware to handle file uploads using multer.
 * @param {callback} callback - Async function that handles the request and response.
 */

// endpoint: http://localhost:3000/videos/upload-video
router.post("/upload-video", upload.single("video"), async (req, res) => {
  try {
    const file = req.file; // Retrieve the uploaded file from the request
    const pid = req.body.pid; // Retrieve the pid from the form data

    if (!file) {
      // If no file is provided in the request, return an error
      return res.status(400).json({ error: "No file uploaded." });
    }

    if (!pid) {
      // If pid is missing, return an error
      return res.status(400).json({ error: "Project ID (pid) is required." });
    }

    // Call the S3 upload function to store the file in DigitalOcean Spaces
    const uploadResult = await uploadToS3(file);

    // Update the Url for video with given pid in DigitalOcean Cluser database
    const messageUrl = await addUrl(pid, uploadResult.Location);

    // Respond with success and the URL of the uploaded video
    return res.status(200).json({
      message: "Video uploaded successfully! " + messageUrl,
      data: uploadResult.Location, // The S3 URL of the uploaded file
    });
  } catch (error) {
    // Log the error and return a 500 error response if the upload fails
    console.error("Error uploading video:", error);
    return res.status(500).json({ error: "Failed to upload video." });
  }
});

// Adds a video URL to a previously created project using the pid
// Returns error message if there is no existing matching pid in PROJECTS
async function addUrl(pid, videoUrl) {
  const addUrlSql = "UPDATE PROJECTS SET video_url = ? WHERE pid = ?;";

  try {
    const [result] = await conn.promise().query(addUrlSql, [videoUrl, pid]);

    if (result.affectedRows === 0) {
      return "No matching pid " + pid + " found in PROJECTS";
    }

    return "Updated video URL for project with pid " + pid;
  } catch (err) {
    console.error("Error during URL insertion: ", err);
    return "Error during URL insertion";
  }
}

module.exports = router;
//export default router
