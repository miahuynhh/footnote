/**
 * Central file for backend handling of annotation retrieval, creation, deletion.
 * This module provides routes to interact with annotations for specific projects,
 * including viewing, adding, editing, and deleting annotations.
 */

// Imports
var express = require("express");
var router = express.Router();
const conn = require("../../config/database");
const {
  GET_ANNOTATIONS_BY_PID,
  INSERT_ANNOTATION,
  UPDATE_ANNOTATION,
  FAVORITE_ANNOTATION,
  DELETE_ANNOTATION_BY_AID,
} = require("../../queries/sqlConstants");

/**
 * Endpoint: GET /annotations/all
 *
 * Retrieves all annotations associated with a given project ID.
 * Only accessible to logged-in users.
 *
 * @param {Object} req - Express request object, must contain projectID query parameter.
 * @param {Object} res - Express response object.
 * @returns {Object} List of annotations for the project if successful, or an error message.
 */
router.get("/all", async (req, res) => {
  if (!req.session.isLoggedIn || !req.session.username) {
    return res.status(401).send("Unauthorized, please log in");
  }

  try {
    const result = await getAnnotations(req.query.projectID);
    res.send(result);
  } catch (err) {
    console.log("Error retrieving existing annotations: ", err);
    res.status(500).send("Error retrieving existing annotations");
  }
});

/**
 * Endpoint: POST /annotations/add
 *
 * Adds a new annotation to a project. Only accessible to logged-in users.
 *
 * @param {Object} req - Express request object, must contain timestampStr, timestampNum, text, and projectID in the body.
 * @param {Object} res - Express response object.
 * @returns {Object} The created annotation with ID if successful, or an error message.
 */
router.post("/add", async (req, res) => {
  if (!req.session.isLoggedIn || !req.session.username) {
    return res.status(401).send("Unauthorized, please log in");
  }

  const { timestampStr, timestampNum, text, projectID } = req.body;

  try {
    const result = await addAnnotation(
      timestampStr,
      timestampNum,
      text,
      projectID
    );
    res.send(result);
  } catch (err) {
    console.log("Error adding annotation: ", err);
    res.status(500).send("Error adding annotation");
  }
});

/**
 * Endpoint: PUT /annotations/edit
 *
 * Edits an existing annotation. Only accessible to logged-in users.
 *
 * @param {Object} req - Express request object, must contain id, text, and projectID in the body.
 * @param {Object} res - Express response object.
 * @returns {Object} An empty object if the annotation was updated successfully, or an error message.
 */
router.put("/edit", async (req, res) => {
  if (!req.session.isLoggedIn || !req.session.username) {
    return res.status(401).send("Unauthorized, please log in");
  }

  const { id, text, projectID } = req.body;

  try {
    await editAnnotation(id, text, projectID);
    res.send({});
  } catch (err) {
    console.log("Error editing annotation: ", err);
    res.status(500).send("Error editing annotation");
  }
});

/**
 * Endpoint: PUT /annotations/favorite
 *
 * Favorites or unfavorites an existing annotation. Only accessible to logged-in users.
 *
 * @param {Object} req - Express request object, must contain id, favorite, and projectID in the body.
 * @param {Object} res - Express response object.
 * @returns {Object} An empty object if the annotation was updated successfully, or an error message.
 */
router.put("/favorite", async (req, res) => {
  if (!req.session.isLoggedIn || !req.session.username) {
    return res.status(401).send("Unauthorized, please log in");
  }

  const { id, favorite, projectID } = req.body;

  try {
    await favoriteAnnotation(id, favorite, projectID);
    res.send({});
  } catch (err) {
    console.log("Error favoriting or unfavoriting annotation: ", err);
    res.status(500).send("Error favoriting or unfavoriting annotation");
  }
});

/**
 * Endpoint: DELETE /annotations/delete
 *
 * Deletes an annotation given its ID. Only accessible to logged-in users.
 *
 * @param {Object} req - Express request object, must contain id of the annotation in the body.
 * @param {Object} res - Express response object.
 * @returns {Object} A message confirming deletion or stating that the annotation was not found.
 */
router.delete("/delete", async (req, res) => {
  if (!req.session.isLoggedIn || !req.session.username) {
    return res.status(401).send("Unauthorized, please log in");
  }

  try {
    const result = await deleteAnnotation(req.body.id);
    if (result === "Annotation deleted") {
      res.status(200).send({ message: result });
    } else {
      res.status(404).send({ message: result });
    }
  } catch (err) {
    console.log("Error deleting annotation: ", err);
    res.status(500).send("Error deleting annotation");
  }
});

/**
 * Retrieves all annotations for a specific project.
 *
 * @param {number} pid - The project ID for which to fetch annotations.
 * @returns {Array} An array of annotations for the project.
 */
async function getAnnotations(pid) {
  try {
    const [rows] = await conn.promise().query(GET_ANNOTATIONS_BY_PID, [pid]);

    if (rows.length === 0) {
      return [];
    } else {
      // extract the aid, timestamp, text, and favorite
      return rows.map((row) => ({
        id: row.aid,
        timestampStr: row.timestampStr,
        timestampNum: row.timestampNum,
        text: row.text,
        favorite: row.favorite,
      }));
    }
  } catch (err) {
    console.error("Error during annotations retrieval: ", err);
    // throw an error, can consider other error handling returns
    throw err;
  }
}

/**
 * Adds a new annotation to a project.
 *
 * @param {string} timestampStr - The timestamp string for the annotation.
 * @param {number} timestampNum - The numerical timestamp for the annotation.
 * @param {string} text - The text content of the annotation.
 * @param {number} pid - The project ID to associate the annotation with.
 * @returns {Object} The newly created annotation object (id, timestampStr, timestampNum, text).
 */
async function addAnnotation(timestampStr, timestampNum, text, pid) {
  try {
    const [result] = await conn
      .promise()
      .query(INSERT_ANNOTATION, [timestampStr, timestampNum, text, pid]);

    if (result.affectedRows > 0) {
      return {
        id: result.insertId, // equivalent to aid
        timestampStr: timestampStr,
        timestampNum: timestampNum,
        text: text,
      };
    } else {
      throw new Error("Annotation not added");
    }
  } catch (err) {
    console.error("Error adding annotation: ", err);
    throw err;
  }
}

/**
 * Edits an existing annotation.
 *
 * @param {number} aid - The annotation ID to be updated.
 * @param {string} text - The new text content for the annotation.
 * @param {number} projectID - The project ID associated with the annotation.
 * @returns {void} Returns nothing if successful, otherwise throws an error.
 */
async function editAnnotation(aid, text, projectID) {
  try {
    const [result] = await conn.promise().query(UPDATE_ANNOTATION, [text, aid]);

    if (result.affectedRows > 0) {
      return;
    } else {
      throw new Error("Annotation not found or not updated");
    }
  } catch (err) {
    console.error("Error editing annotation", err);
    return "Error editing annotation";
  }
}

/**
 * Edits an existing annotation.
 *
 * @param {number} aid - The annotation ID to be updated.
 * @param {number} favorite - The new favorite value (0 for unfavorite or 1 for favorite) for the annotation.
 * @param {number} projectID - The project ID associated with the annotation.
 * @returns {void} Returns nothing if successful, otherwise throws an error.
 */
async function favoriteAnnotation(aid, favorite, projectID) {
  try {
    const [result] = await conn
      .promise()
      .query(FAVORITE_ANNOTATION, [favorite, aid]);

    if (result.affectedRows > 0) {
      return;
    } else {
      throw new Error("Annotation not found or not updated");
    }
  } catch (err) {
    console.error("Error favoriting or unfavoriting annotation", err);
    return "Error favoriting or unfavoriting annotation";
  }
}

/**
 * Deletes an annotation by its ID.
 *
 * @param {number} aid - The annotation ID to delete.
 * @returns {string} A message indicating whether the annotation was deleted or not found.
 */
async function deleteAnnotation(aid) {
  try {
    const [result] = await conn.promise().query(DELETE_ANNOTATION_BY_AID, aid);

    if (result.affectedRows === 0) {
      return "Annotation not found or not deleted";
    } else {
      return "Annotation deleted";
    }
  } catch (err) {
    console.error("Error deleting annotation: ", err);
    return "Error deleting annotation";
  }
}

// Exports
module.exports = router;
