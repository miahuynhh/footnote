// Author: Mia

// Include methods to create and clear all necessary tables including
// tables USERS, PROJECTS, ANNOTATIONS, sessions

const conn = require("./database");

// Create all necessary tables in Digital Ocean database.
async function createTables() {
  const createUsersTableSql = `
    CREATE TABLE IF NOT EXISTS USERS(
      username VARCHAR(100) PRIMARY KEY,
      hashed_password VARCHAR(256) NOT NULL
    );
  `;
  const createProjectsTableSql = `
    CREATE TABLE IF NOT EXISTS PROJECTS(
      pid INT PRIMARY KEY AUTO_INCREMENT,
      project_name VARCHAR(100),
      video_url VARCHAR(2083),
      thumbnail_url VARCHAR(2083),
      username VARCHAR(100) NOT NULL,
      FOREIGN KEY (username) REFERENCES USERS(username)
    );
  `;

  const createAnnotationsTableSql = `
    CREATE TABLE IF NOT EXISTS ANNOTATIONS(
      aid INT PRIMARY KEY AUTO_INCREMENT,
      timestamp VARCHAR(256),
      text VARCHAR(1000),
      pid INT NOT NULL,
      FOREIGN KEY (pid) REFERENCES PROJECTS(pid)
    );
  `;

  try {
    await conn.promise().query(createUsersTableSql);
    console.log("USERS table created");

    await conn.promise().query(createProjectsTableSql);
    console.log("PROJECTS table created");

    await conn.promise().query(createAnnotationsTableSql);
    console.log("ANNOTATIONS table created");
  } catch (err) {
    console.log("Error creating tables: ", err);
  }
}

// Clear all necessary tables in Digital Ocean database.
// Not the same as drop tables (this is clearing, not dropping).
async function clearTables() {
  const clearUsersTableSql = "DELETE FROM USERS;";
  const clearProjectsTableSql = "DELETE FROM PROJECTS;";
  const resetProjectsTableSql = "ALTER TABLE PROJECTS AUTO_INCREMENT = 1;";
  const clearAnnotationsTableSql = "DELETE FROM ANNOTATIONS;";
  const resetAnnotationsTableSql =
    "ALTER TABLE ANNOTATIONS AUTO_INCREMENT = 1;";
  const clearSessionsTableSql = "DELETE FROM sessions;";

  try {
    // Clear in the order of ANNOTATIONS -> PROJECTS -> USERS due to foreign key constraints
    await conn.promise().query(clearAnnotationsTableSql);
    console.log("ANNOTATIONS table cleared");

    await conn.promise().query(resetAnnotationsTableSql);
    console.log("ANNOTATIONS table pid autoincrement reset");

    await conn.promise().query(clearProjectsTableSql);
    console.log("PROJECTS table cleared");

    await conn.promise().query(resetProjectsTableSql);
    console.log("PROJECTS table pid autoincrement reset");

    await conn.promise().query(clearUsersTableSql);
    console.log("USERS table cleared");

    await conn.promise().query(clearSessionsTableSql);
    console.log("sessions table cleared");
  } catch (err) {
    console.log("Error clearing tables: ", err);
  }
}

// Exports
module.exports.createTables = createTables;
module.exports.clearTables = clearTables;
