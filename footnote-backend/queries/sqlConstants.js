/**
 * All SQL constants used for database operations.
 */

// Environment
const tableSuffix = process.env.DB_SUFFIX || "dev";

/////////////////////////////////ALL TABLES/////////////////////////////////////

// Create table queries

/**
 * SQL query to create the USERS table.
 * The table stores user information such as username and hashed password.
 * The table is suffixed based on the environment (e.g., dev).
 */
const CREATE_USERS_TABLE = `
  CREATE TABLE IF NOT EXISTS USERS_${tableSuffix}(
    username VARCHAR(100) PRIMARY KEY,
    hashed_password VARCHAR(256) NOT NULL
  );
`;

/**
 * SQL query to create the PROJECTS table.
 * The table stores project information, including the unique project id,
 * project name, URLs for video and thumbnail, and the associated user's username
 * as a foreign key reference.
 * The table is suffixed based on the environment (e.g., dev).
 */
const CREATE_PROJECTS_TABLE = `
  CREATE TABLE IF NOT EXISTS PROJECTS_${tableSuffix}(
    pid INT PRIMARY KEY AUTO_INCREMENT,
    project_name VARCHAR(100),
    video_url VARCHAR(2083),
    thumbnail_url VARCHAR(2083),
    username VARCHAR(100) NOT NULL,
    FOREIGN KEY (username) REFERENCES USERS_${tableSuffix}(username)
  );
`;

/**
 * SQL query to create the ANNOTATIONS table.
 * The table stores annotations for each project, including the unique annotation id,
 * timestamp and text data, favorite field (0 or 1), with a foreign key reference to the PROJECTS table.
 * The table is suffixed based on the environment (e.g., dev).
 */
const CREATE_ANNOTATIONS_TABLE = `
  CREATE TABLE IF NOT EXISTS ANNOTATIONS_${tableSuffix}(
    aid INT PRIMARY KEY AUTO_INCREMENT,
    timestampStr VARCHAR(256),
    timestampNum DOUBLE,
    text VARCHAR(1000),
    favorite INT DEFAULT 0,
    pid INT NOT NULL,
    FOREIGN KEY (pid) REFERENCES PROJECTS_${tableSuffix}(pid)
  );
`;

// Clear table queries

/**
 * SQL queries to delete all records from the specified table.
 * These operations clear the tables but preserve their structures.
 */
const CLEAR_USERS_TABLE = `DELETE FROM USERS_${tableSuffix};`;
const CLEAR_PROJECTS_TABLE = `DELETE FROM PROJECTS_${tableSuffix};`;
const CLEAR_ANNOTATIONS_TABLE = `DELETE FROM ANNOTATIONS_${tableSuffix};`;
const CLEAR_SESSIONS_TABLE = `DELETE FROM SESSIONS_${tableSuffix};`;

// Reset table queries

/**
 * SQL query to reset the auto-increment value of the specified table.
 * These operations set the auto-increment counter to 1, reinitializing the tables.
 */
const RESET_PROJECTS_TABLE = `ALTER TABLE PROJECTS_${tableSuffix} AUTO_INCREMENT = 1;`;
const RESET_ANNOTATIONS_TABLE = `ALTER TABLE ANNOTATIONS_${tableSuffix} AUTO_INCREMENT = 1;`;

///////////////////////////////USERS TABLE//////////////////////////////////////

/**
 * SQL query to check if a user already exists in the USERS table.
 * This query retrieves the user based on the provided username.
 */
const CHECK_EXISTING_USER = `SELECT * FROM USERS_${tableSuffix} WHERE username = ?;`;

/**
 * SQL query to create a new user in the USERS table.
 * This query inserts a new username and its associated hashed password into the table.
 */
const CREATE_NEW_USER = `INSERT INTO USERS_${tableSuffix}(username, hashed_password) VALUES(?, ?);`;

//////////////////////////////PROJECTS TABLE////////////////////////////////////
/**
 * SQL query to check the owner of a project in the PROJECTS table.
 * This query retrieves the username of the user who owns the specified project
 * based on the provided project id.
 */
const CHECK_OWN_PROJECT = `SELECT username FROM PROJECTS_${tableSuffix} WHERE pid = ?;`;

/**
 * SQL query to get all projects information associated with a specific username.
 */
const GET_PROJECTS_BY_USERNAME = `SELECT * FROM PROJECTS_${tableSuffix} WHERE username = ?;`;

/**
 * SQL query to insert a new project into the PROJECTS table, based on the associated username
 */
const INSERT_PROJECT = `INSERT INTO PROJECTS_${tableSuffix}(username) VALUES(?);`;

/**
 * SQL query to get all project details by its project ID (pid).
 */
const GET_PROJECT_BY_PID = `SELECT * FROM PROJECTS_${tableSuffix} WHERE pid = ?;`;

/**
 * SQL query to update the name of a project in the PROJECTS table based on the provided project ID.
 */
const UPDATE_PROJECTNAME = `UPDATE PROJECTS_${tableSuffix} SET project_name = ? WHERE pid = ?;`;

/**
 * SQL query to delete a project from the PROJECTS table by its project ID.
 */
const DELETE_PROJECT_BY_PID = `DELETE FROM PROJECTS_${tableSuffix} WHERE pid = ?;`;

/**
 * SQL query to update the video URL of a project in the PROJECTS table by its project ID.
 */
const UPDATE_PROJECTURL = `UPDATE PROJECTS_${tableSuffix} SET video_url = ? WHERE pid = ?;`;

/**
 * SQL query to update the thumbnail URL of a project in the PROJECTS table by its project ID.
 */
const UPDATE_THUMBNAILURL = `UPDATE PROJECTS_${tableSuffix} SET thumbnail_url = ? WHERE pid = ?;`;

/////////////////////////////ANNOTATIONS TABLE//////////////////////////////////

/**
 * SQL query to delete all annotations for a specific project in the ANNOTATIONS table.
 * This query removes all annotation entries associated with the specified project ID.
 */
const DELETE_ANNOTATIONS_BY_PID = `DELETE FROM ANNOTATIONS_${tableSuffix} WHERE pid = ?`;

/**
 * SQL query to get all annotations for a specific project by its project ID.
 * This query retrieves the annotation details (aid, timestampStr, timestampNum, text, favorite) for the specified project.
 */
const GET_ANNOTATIONS_BY_PID = `SELECT aid, timestampStr, timestampNum, text, favorite FROM ANNOTATIONS_${tableSuffix} WHERE pid = ?;`;

/**
 * SQL query to insert a new annotation into the ANNOTATIONS table.
 * This query adds a new annotation entry with timestampStr, timestampNum, text, and the associated project ID.
 */
const INSERT_ANNOTATION = `INSERT INTO ANNOTATIONS_${tableSuffix} (timestampStr, timestampNum, text, pid) VALUES (?, ?, ?, ?);`;

/**
 * SQL query to update an existing annotation's text in the ANNOTATIONS table.
 * This query modifies the text of an annotation specified by its annotation ID.
 */
const UPDATE_ANNOTATION = `UPDATE ANNOTATIONS_${tableSuffix} SET text = ? WHERE aid = ?;`;

/**
 * SQL query to update an existing annotation's favorite field in the ANNOTATIONS table.
 * This query modifies the favorite field of an annotation specified by its annotation ID.
 */
const FAVORITE_ANNOTATION = `UPDATE ANNOTATIONS_${tableSuffix} SET favorite = ? WHERE aid = ?;`;

/**
 * SQL query to delete an annotation from the ANNOTATIONS table by its annotation ID.
 * This query removes a specific annotation based on its annotation ID.
 */
const DELETE_ANNOTATION_BY_AID = `DELETE FROM ANNOTATIONS_${tableSuffix} WHERE aid = ?;`;

// Exports
module.exports = {
  CREATE_USERS_TABLE,
  CREATE_PROJECTS_TABLE,
  CREATE_ANNOTATIONS_TABLE,
  CLEAR_USERS_TABLE,
  CLEAR_PROJECTS_TABLE,
  CLEAR_ANNOTATIONS_TABLE,
  CLEAR_SESSIONS_TABLE,
  RESET_PROJECTS_TABLE,
  RESET_ANNOTATIONS_TABLE,
  CHECK_EXISTING_USER,
  CREATE_NEW_USER,
  CHECK_OWN_PROJECT,
  GET_PROJECTS_BY_USERNAME,
  INSERT_PROJECT,
  GET_PROJECT_BY_PID,
  UPDATE_PROJECTNAME,
  UPDATE_THUMBNAILURL,
  DELETE_PROJECT_BY_PID,
  UPDATE_PROJECTURL,
  DELETE_ANNOTATIONS_BY_PID,
  GET_ANNOTATIONS_BY_PID,
  INSERT_ANNOTATION,
  UPDATE_ANNOTATION,
  FAVORITE_ANNOTATION,
  DELETE_ANNOTATION_BY_AID,
};
