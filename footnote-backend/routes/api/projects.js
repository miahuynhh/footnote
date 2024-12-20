/**
 * File for handling project-related backend functionality in the application.
 * This file contains routes for managing projects, including viewing, creating,
 * editing, and deleting projects. The routes also enforce user authentication
 * to ensure that only logged-in users can interact with projects.
 */

// Imports
const express = require("express");
const router = express.Router();
const conn = require("../../config/database");
const {
  CHECK_OWN_PROJECT,
  GET_PROJECTS_BY_USERNAME,
  INSERT_PROJECT,
  GET_PROJECT_BY_PID,
  UPDATE_PROJECTNAME,
  DELETE_PROJECT_BY_PID,
  DELETE_ANNOTATIONS_BY_PID,
} = require("../../queries/sqlConstants");

/**
 * Endpoint: GET /projects/home
 *
 * Retrieves a list of projects for the logged-in user.
 * Only accessible to logged-in users.
 *
 * @param {Object} req - Express request object, must be authenticated.
 * @param {Object} res - Express response object.
 * @returns {Object} List of projects under the logged-in user's account.
 */
router.get("/home", async (req, res) => {
  if (!req.session.isLoggedIn || !req.session.username) {
    return res.status(401).send("Unauthorized, please log in");
  }

  try {
    const result = await getProjects(req.session.username);
    res.send(result);
  } catch (err) {
    console.log("Error retrieving existing projects: ", err);
    res.status(500).send("Error retrieving existing projects");
  }
});

/**
 * Endpoint: GET /projects/create-project
 *
 * Retrieves a new project ID for creating a new project.
 * Only accessible to logged-in users.
 *
 * @param {Object} req - Express request object, must be authenticated.
 * @param {Object} res - Express response object.
 * @returns {Object} The newly generated project ID and default title for the new project.
 */
router.get("/create-project", async (req, res) => {
  if (!req.session.isLoggedIn || !req.session.username) {
    return res.status(401).send("Unauthorized, please log in");
  }

  try {
    const pid = await getPid(req.session.username);
    const title = "untitled";
    res.send({ pid, title });
  } catch (err) {
    console.log("Error getting new project id: ", err);
    res.status(500).send("Error getting new project id");
  }
});

/**
 * Endpoint: GET /projects/load-project/:pid
 *
 * Retrieves a project by its ID.
 * Only accessible to logged-in users.
 *
 * @param {Object} req - Express request object, must contain project ID in route parameter.
 * @param {Object} res - Express response object.
 * @returns {Object} The project details for the specified project ID.
 */
router.get("/load-project/:pid", async (req, res) => {
  if (!req.session.isLoggedIn || !req.session.username) {
    return res.status(401).send("Unauthorized, please log in");
  }

  const pid = req.params.pid; // Extract pid from route parameter

  try {
    const project = await loadProject(pid);
    res.status(200).send(project);
  } catch (err) {
    console.log("Error loading project: ", err);
    res.status(500).send("Error loading project");
  }
});

/**
 * Endpoint: PUT /projects/edit-project-name
 *
 * Edits the name of a project.
 * Only accessible to logged-in users and ensures the user is the owner of the project.
 *
 * @param {Object} req - Express request object, must contain project name and ID in the body.
 * @param {Object} res - Express response object.
 * @returns {Object} A success message if the project name is updated, or an error message.
 */
router.put("/edit-project-name", async (req, res) => {
  if (!req.session.isLoggedIn || !req.session.username) {
    return res.status(401).send("Unauthorized, please log in");
  }

  const { projectName, pid } = req.body;
  console.log(`PID = ${pid}`);

  if (projectName.length > 100) {
    return res
      .status(400)
      .json({ message: "Project name is longer than 100 characters" });
  }

  try {
    // Check if the user owns the project
    const [rows] = await conn.promise().query(CHECK_OWN_PROJECT, [pid]);
    const project = rows[0];

    if (!project || project.username !== req.session.username) {
      return res
        .status(403)
        .send("Forbidden, you are not the owner of this project");
    }

    // Update project name
    const result = await editProjectName(projectName, pid);

    if (result === "Project name edited successfully") {
      return res.status(200).send(result);
    } else {
      return res.status(400).send(result);
    }
  } catch (err) {
    console.log("Error editing project name: ", err);
    res.status(500).send("Error editing project name");
  }
});

/**
 * Endpoint: DELETE /projects/delete-project/:projectID
 *
 * Deletes a project by its ID.
 * Only accessible to logged-in users.
 *
 * @param {Object} req - Express request object, must contain project ID in route parameter.
 * @param {Object} res - Express response object.
 * @returns {Object} A success message if the project is deleted, or an error message.
 */
router.delete("/delete-project/:projectID", async (req, res) => {
  if (!req.session.isLoggedIn || !req.session.username) {
    return res.status(401).send("Unauthorized, please log in");
  }

  const pid = req.params.projectID;

  try {
    const result = await deleteProject(pid);

    if (result === "Deleted project with pid " + pid) {
      res.status(200).send(result);
    } else {
      res.status(400).send(result);
    }
  } catch (err) {
    console.log("Error deleting project: ", err);
    res.status(500).send("Error deleting project");
  }
});

/**
 * Retrieves the list of existing projects (pid, project_name) under the given username.
 *
 * @param {string} username - The username of the logged-in user.
 * @returns {Array} A list of projects associated with the given username.
 */

async function getProjects(username) {
  try {
    const usernameLower = username.toLowerCase();

    const [rows] = await conn
      .promise()
      .query(GET_PROJECTS_BY_USERNAME, [usernameLower]);

    if (rows.length === 0) {
      return [];
    } else {
      return rows.map((row) => ({
        projectID: row.pid,
        title: row.project_name,
        videoURL: row.video_url,
        thumbnailURL: row.thumbnail_url,
      }));
    }
  } catch (err) {
    console.error("Error during projects retrieval: ", err);
    // throw an error, can consider other error handling returns
    throw err;
  }
}

/**
 * Retrieves a new project ID for a logged-in user.
 *
 * @param {string} username - The username of the logged-in user.
 * @returns {number} The newly generated project ID.
 */
async function getPid(username) {
  try {
    const [result] = await conn.promise().query(INSERT_PROJECT, [username]);
    return result.insertId;
  } catch (err) {
    console.error("Error getting new pid ", err);
    return "Error getting new pid";
  }
}

/**
 * Loads a project by its ID.
 *
 * @param {number} pid - The project ID to load.
 * @returns {Object} The details of the project (projectID, title, videoURL, thumbnailURL, username).
 */
async function loadProject(pid) {
  try {
    const [rows] = await conn.promise().query(GET_PROJECT_BY_PID, [pid]);
    if (rows.length === 0) {
      return null; // no projects found
    } else {
      const row = rows[0];
      return {
        projectID: row.pid,
        title: row.project_name || "untitled",
        videoURL: row.video_url,
        thumbnailURL: row.thumbnail_url,
        username: row.username,
      };
    }
  } catch (err) {
    console.log("Error loading project", err);
    throw err;
  }
}

/**
 * Edits the name of a project.
 *
 * @param {string} projectName - The new project name.
 * @param {number} pid - The project ID to update.
 * @returns {string} A message indicating whether the project name was updated successfully.
 */
async function editProjectName(projectName, pid) {
  try {
    const [result] = await conn
      .promise()
      .query(UPDATE_PROJECTNAME, [projectName, pid]);
    if (result.affectedRows > 0) {
      return "Project name edited successfully";
    } else {
      throw new Error("Project name not edited or project ID not found");
    }
  } catch (err) {
    console.error("Error editing project name ", err);
    throw err;
  }
}

/**
 * Deletes all annotations associated with the specified project ID.
 *
 * @param {number} pid - The project ID associated with the annotations to be deleted.
 * @throws {Error} Throws an error if the deletion process encounters any issues
 */
async function deleteAllAnnotations(pid) {
  try {
    await conn.promise().query(DELETE_ANNOTATIONS_BY_PID, pid);
  } catch (err) {
    console.error("Error deleting annotation: ", err);
    throw err;
  }
}

/**
 * Deletes a project by its ID.
 *
 * @param {number} pid - The project ID to delete.
 * @returns {string} A message indicating whether the project was deleted.
 */
async function deleteProject(pid) {
  await deleteAllAnnotations(pid);
  try {
    const [result] = await conn.promise().query(DELETE_PROJECT_BY_PID, pid);

    if (result.affectedRows === 0) {
      return "No matching pid " + pid + " found in PROJECTS";
    }

    return "Deleted project with pid " + pid;
  } catch (err) {
    console.error("Error deleting project: ", err);
    return "Error deleting project";
  }
}

// Exports
module.exports = router;
module.exports.getProjects = getProjects;
module.exports.deleteProject = deleteProject;
module.exports.loadProject = loadProject;
module.exports.editProjectName = editProjectName;
