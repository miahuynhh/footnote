var express = require('express');
const connAnno = require('../services/database');
const bcrypt = require('bcrypt');
// const router = express.Router();
// const db = require('./database')
// const Annotation = require('../createTables.sql'); // Using Annotation model from createTables.sql

// Author: Lauren
// Create a new blank annotation
async function annotationCreate(pid, timestamp) {
    const checkExistingSql = 'SELECT * FROM ANNOTATIONS WHERE pid = ? AND timestamp = ?';
    const createAnnotationSql = 'INSERT INTO ANNOTATIONS(pid, timestamp, note) VALUES(?, ?, ?)';
  
    try {
      // check if annotation already exists
      const [existingAnnotation] = await connAnno.promise().query(checkExistingSql, [pid, timestamp]);
  
      if (existingAnnotation.length > 0) {
        return "Annotation already exists at this time";
      }
  
      // get the last annotation ID
      const [lastAnnotation] = await connAnno.promise().query('SELECT MAX(aid) AS last_aid FROM ANNOTATIONS');
      const lastAid = lastAnnotation[0].last_aid || 0; // if no annotations exist, lastAid will be 0
  
      // create a new annotation
      const newAid = lastAid + 1;
      await connAnno.promise().query(createAnnotationSql, [pid, timestamp, '']);
  
      return "Created annotation " + newAid + "\n";
    } catch (err) {
      console.error('Error during annotation creation: ', err);
      return 'Error during annotation creation';
    }
  }

// Edit a blank annotation
async function annotationEdit(pid, timestamp) {
    const checkExistingSql = 'SELECT note FROM ANNOTATIONS WHERE pid = ? AND timestamp = ?';
  
    try {
      // check if annotation already exists
      const [existingAnnotation] = await connAnno.promise().query(checkExistingSql, [pid, timestamp]);
  
      if (existingAnnotation.length > 0) {
        return existingAnnotation[0].note;
      } else {
        return "Select annotation to edit";
      }
    } catch (err) {
      console.error('Error during annotation editing: ', err);
      return 'Error during annotation editing';
    }
  }


// Save the annotation to the db
async function annotationSave(pid, timestamp, note) {
    const updateAnnotationSql = 'UPDATE ANNOTATIONS SET note = ? WHERE pid = ? AND timestamp = ?';
  
    try {
      // update the existing annotation
      const [result] = await connAnno.promise().query(updateAnnotationSql, [note, pid, timestamp]);
  
      if (result.affectedRows > 0) {
        return "Annotation saved";
      } else {
        return "No annotation found to update";
      }
    } catch (err) {
      console.error('Error during annotation saving: ', err);
      return 'Error during annotation saving';
    }
  }


// Deletes the annotation at the given timestamp with the given PID
async function annotationDelete(pid, timestamp) {
    const deleteAnnotationSql = 'DELETE FROM ANNOTATIONS WHERE pid = ? AND timestamp = ?';
  
    try {
      // delete the existing annotation
      const [result] = await connAnno.promise().query(deleteAnnotationSql, [pid, timestamp]);
  
      if (result.affectedRows > 0) {
        return "Annotation deleted";
      } else {
        return "No annotation found to delete";
      }
    } catch (err) {
      console.error('Error during annotation deletion: ', err);
      return 'Error during annotation deletion';
    }
  }



module.exports.annotationCreate = annotationCreate;
module.exports.annotationEdit = annotationEdit;
module.exports.annotationSave = annotationSave;
module.exports.annotationDelete = annotationDelete;



module.exports = { createAnnotation, router };
