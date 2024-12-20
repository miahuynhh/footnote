/**
 * This module provides functions for uploading video and thumbnail files
 * to DigitalOcean Spaces, an S3-compatible object storage service, using AWS SDK v3.
 */

const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
require("dotenv").config();

// Initialize the S3 client (configured for DigitalOcean Spaces)
const s3Client = new S3Client({
  region: "us-east-1",
  endpoint: process.env.DO_SPACES_ENDPOINT,
  credentials: {
    accessKeyId: process.env.DO_SPACES_KEY,
    secretAccessKey: process.env.DO_SPACES_SECRET,
  },
});

const BUCKET_NAME = process.env.DO_SPACES_BUCKET;
const THUMBNAIL_BUCKET_NAME = process.env.DO_SPACES_THUMBNAIL_BUCKET;

/**
 * Uploads a file to a DigitalOcean Space (S3 compatible service) using the AWS SDK v3.
 *
 * @param {Object} file - The file to upload (retrieved from multer's file object).
 * @param {Buffer} file.buffer - The file's buffer (contents of the file).
 * @param {string} file.originalname - The original name of the uploaded file.
 * @param {string} file.mimetype - The MIME type of the uploaded file.
 * @returns {Promise<Object>} - Resolves with the uploaded file's URL and metadata.
 * @throws {Error} - Throws an error if the upload to S3 fails.
 */
async function uploadToS3(file) {
  // Define the parameters for the S3 upload
  const params = {
    Bucket: BUCKET_NAME,
    Key: `videos/${Date.now()}-${file.originalname}`, // Create a unique filename using a timestamp
    Body: file.buffer, // The contents of the file (buffer)
    ContentType: file.mimetype, // Set the MIME type of the file
    ACL: "public-read", // Set the file to be publicly readable
  };

  try {
    const command = new PutObjectCommand(params); // Create the S3 PutObject command
    const data = await s3Client.send(command); // Send the command to S3

    // Return the location of the uploaded file along with additional data
    return {
      Location: `${process.env.DO_SPACES_ENDPOINT}/${BUCKET_NAME}/${params.Key}`, // The public URL of the uploaded file
      data, // Additional response data from S3
    };
  } catch (error) {
    console.error("S3 upload error:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
}

/**
 * Uploads a thumbnail image to a DigitalOcean Space, with the image saved as a public-readable file.
 *
 * @param {Object} file - The thumbnail file to upload (retrieved from multer's file object).
 * @param {string} videoName - The name of the video associated with the thumbnail.
 * @returns {Promise<Object>} - Resolves with the uploaded thumbnail's URL and metadata.
 * @throws {Error} - Throws an error if the upload to S3 fails.
 */
async function uploadThumbnailToS3(file, videoName) {
  const params = {
    Bucket: THUMBNAIL_BUCKET_NAME,
    Key: `thumbnails/${Date.now()}-${videoName}`, // Create a unique filename using a timestamp
    Body: file.buffer, // The contents of the file / buffer
    ContentType: "image/jpeg", // Thumbnails are typically JPEG
    ACL: "public-read", // Set the file to be publicly readable
  };

  try {
    const command = new PutObjectCommand(params);
    const data = await s3Client.send(command);

    return {
      Location: `${process.env.DO_SPACES_ENDPOINT}/${THUMBNAIL_BUCKET_NAME}/${params.Key}`, // The public URL of the uploaded file
      data, // Additional response data from S3
    };
  } catch (error) {
    console.error("Thumbnail upload error:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
}

// Exports
module.exports = { uploadToS3, uploadThumbnailToS3 };
