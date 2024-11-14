// Author: Mia
// a central file for database configuration

const mysql = require("mysql2");
const fs = require("fs");
require("dotenv").config(); // load environment variables

const caCert = fs.readFileSync(process.env.DB_SSL__CA);

// create a connection
const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  ssl: {
    // enable SSL mode as required by DigitalOcean database
    rejectUnauthorized: true,
    ca: caCert,
  },
});

// tests the connection
conn.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: ", err);
    return;
  } else {
    console.log("Connected to the database as " + conn.threadId);
  }
});

// exports
module.exports = conn;
