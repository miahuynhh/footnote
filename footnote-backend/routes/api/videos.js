const express = require("express");
const multer = require("multer"); // Middleware for handling file uploads
const generateThumbnail = require("../api/thumbnails");
const { uploadToS3, uploadThumbnailToS3 } = require("../../services/s3Service"); // Import the S3 upload function

const router = express.Router();
const conn = require("../../config/database");

const {
  UPDATE_PROJECTURL,
  UPDATE_THUMBNAILURL,
} = require("../../queries/sqlConstants");

// Configure multer to store uploaded files in memory (in a buffer)
const upload = multer({ storage: multer.memoryStorage() });

/**
 * Endpoint: POST /videos/upload-video
 *
 * Route for uploading a video file. The file is uploaded to the server, and then stored in
 * DigitalOcean Spaces using the AWS SDK. The route expects a single video file and returns
 * the URL of the uploaded file, along with the thumbnail URL.
 *
 * @param {string} path - Express route path.
 * @param {callback} middleware - Middleware to handle file uploads using multer.
 * @param {callback} callback - Async function that handles the request and response.
 *                               The function does the following:
 *                               - Validates the uploaded file and project ID.
 *                               - Uploads the video to S3 and generates a thumbnail.
 *                               - Updates the video and thumbnail URLs in the database.
 *                               - Responds with a success message and the URLs of the uploaded video and thumbnail.
 */
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

    generateThumbnail(
      file.buffer,
      file.originalname,
      async (err, thumbnailBuffer) => {
        if (err) {
          return res.status(500).json({ error: "Failed to create thumbnail." });
        }

        // Upload thumbnail to S3
        const thumbnailResult = await uploadThumbnailToS3(
          thumbnailBuffer,
          file.originalname
        );

        // Update the Url for video with given pid in DigitalOcean Cluser database
        const messageUrl = await addUrl(pid, uploadResult.Location);

        // Update the Url for thumbnail with given pid in DigitalOcean Cluser database
        const messageThumbnailUrl = await addThumbnailUrl(
          pid,
          thumbnailResult.Location
        );

        // Respond with success and the URL of the uploaded video
        return res.status(200).json({
          message:
            "Video uploaded successfully! " + messageUrl + messageThumbnailUrl,
          videoUrl: uploadResult.Location, // The S3 URL of the uploaded video
          thumbnailUrl: thumbnailResult.Location, // The S3 URL of the uploaded thumbnail
        });
      }
    );
  } catch (error) {
    // Log the error and return a 500 error response if the upload fails
    console.error("Error uploading video:", error);
    return res.status(500).json({ error: "Failed to upload video." });
  }
});

/**
 * Adds the video URL to a project with the specified pid in the database.
 * If no matching project ID (pid) is found, returns an error message.
 *
 * @param {string} pid - The project ID to update with the new video URL.
 * @param {string} videoUrl - The URL of the uploaded video to store in the database.
 * @returns {string} - A success or error message based on whether the URL update was successful.
 */
async function addUrl(pid, videoUrl) {
  try {
    const [result] = await conn
      .promise()
      .query(UPDATE_PROJECTURL, [videoUrl, pid]);

    if (result.affectedRows === 0) {
      return "No matching pid " + pid + " found in PROJECTS";
    }

    return "Updated video URL for project with pid " + pid;
  } catch (err) {
    console.error("Error during URL insertion: ", err);
    return "Error during URL insertion";
  }
}

/**
 * Adds the thumbnail URL to a project with the specified pid in the database.
 * If no matching project ID (pid) is found, returns an error message.
 *
 * @param {string} pid - The project ID to update with the new thumbnail URL.
 * @param {string} thumbnailUrl - The URL of the uploaded thumbnail to store in the database.
 * @returns {string} - A success or error message based on whether the URL update was successful.
 */
async function addThumbnailUrl(pid, thumbnailUrl) {
  try {
    const [result] = await conn
      .promise()
      .query(UPDATE_THUMBNAILURL, [thumbnailUrl, pid]);

    if (result.affectedRows === 0) {
      return "No matching pid " + pid + " found in PROJECTS";
    }

    return "Updated thumbnail URL for project with pid " + pid;
  } catch (err) {
    console.error("Error during URL insertion: ", err);
    return "Error during URL insertion";
  }
}

// Exports
module.exports = router;
