// Author: Mia, Lauren
// Central file for backend handling of annotation retrieval, creation, deletion.

var express = require("express");
var router = express.Router();
const conn = require("../../config/database");

// endpoint: "http://localhost:3000/annotations/all"
router.get("/all", async (req, res) => {
  // TODO: session handling?
  // const pid = req.session.pid;

  console.log(req.query.projectID);
  try {
    const result = await getAnnotations(req.query.projectID);
    res.send(result);
  } catch (err) {
    console.log("Error retrieving existing annotations: ", err);
    res.status(500).send("Error retrieving existing annotations");
  }
});

// endpoint: "http://localhost:3000/annotations/add"
router.post("/add", async (req, res) => {
  // TODO: session handling?
  // const pid = req.session.pid;
  const { timestamp, text, projectID } = req.body;

  try {
    const result = await addAnnotation(timestamp, text, projectID);
    res.send(result);
  } catch (err) {
    console.log("Error adding annotation: ", err);
    res.status(500).send("Error adding annotation");
  }
});

// endpoint: "http://localhost:3000/annotations/edit"
router.put("/edit", async (req, res) => {
  // TODO: session handling?
  const { id, text, projectID } = req.body;

  try {
    await editAnnotation(id, text, projectID);
    res.send({});
  } catch (err) {
    console.log("Error editing annotation: ", err);
    res.status(500).send("Error editing annotation");
  }
});

// endpoint: "http://localhost:3000/annotations/delete"
router.delete("/delete", async (req, res) => {
  // TODO: session handling?

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

// Retrieve the list of existing annotations under the given pid (project id)
// Returns: an array of Annotations objects like follows
// [
//   { id: 1
//     timestamp: "00:31",
//     text: "this is an annotation"
//   },
//   { id: 2
//     timestamp: "00:31",
//     text: "this is another annotation"
//   },
// ]
async function getAnnotations(pid) {
  const getAnnotationsSql =
    "SELECT aid, timestamp, text FROM ANNOTATIONS WHERE pid = ?";
  // const mockProjectSql = "INSERT INTO PROJECTS (project_name, username) VALUES ('eta newjeans', 'footnote');";
  // const mockAnnotationSql = "INSERT INTO ANNOTATIONS (timestamp, text, pid) VALUES ('00:00', 'first annotation', 1), ('01:32', 'second annotation', 1);";

  try {
    // conn.promise().query(mockProjectSql);
    // conn.promise().query(mockAnnotationSql);

    const [rows] = await conn.promise().query(getAnnotationsSql, [pid]);

    if (rows.length === 0) {
      return [];
    } else {
      // extract the aid, timestamp, and text
      return rows.map((row) => ({
        id: row.aid,
        timestamp: row.timestamp,
        text: row.text,
      }));
    }
  } catch (err) {
    console.error("Error during annotations retrieval: ", err);
    // throw an error, can consider other error handling returns
    throw err;
  }
}

// add an annotation, given the timestamp, text, and project id
// returns the Annotation object as follows
// { id: 1
//   timestamp: "00:31",
//   text: "this is an annotation"
// }
async function addAnnotation(timestamp, text, pid) {
  const addAnnotationSql =
    "INSERT INTO ANNOTATIONS (timestamp, text, pid) VALUES (?, ?, ?);";

  try {
    const [result] = await conn
      .promise()
      .query(addAnnotationSql, [timestamp, text, pid]);

    if (result.affectedRows > 0) {
      return {
        id: result.insertId, // equivalent to aid
        timestamp: timestamp,
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

// edit an annotation, given the timestamp, text, and annotation id
// returns the Annotation object as follows
// { id: 1
//   timestamp: "00:31",
//   text: "this is an annotation"
// }
async function editAnnotation(aid, text, projectID) {
  const editAnnotationSql = "UPDATE ANNOTATIONS SET text = ? WHERE aid = ?;";

  try {
    const [result] = await conn.promise().query(editAnnotationSql, [text, aid]);

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

// deletes an annotation, given the annotation id
// returns a success or failure message
async function deleteAnnotation(aid) {
  const deleteAnnotationSql = "DELETE FROM ANNOTATIONS WHERE aid = ?";

  try {
    const [result] = await conn.promise().query(deleteAnnotationSql, aid);

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

// Lauren's code:

// // Create a new blank annotation
// const createAnnotation = (req, res) => {
//     try {
//         const { pid, timestamp } = req.body;

//         // Assuming you have a function to get the next available aid
//         const getNextAid = async () => {
//             const lastAnnotation = await db.query('SELECT MAX(aid) AS lastAid FROM annotations WHERE pid = ?', [pid]);
//             return lastAnnotation.rows[0].lastAid + 1 || 1;
//         };

//         // Create a new annotation instance
//         // the new aid should be
//         const newAnnotation = new Annotation({
//             aid: nextAid,
//             timestamp,
//             note: '',
//             pid
//         });

//         // Save the annotation to the database
//         db.query('INSERT INTO annotations (aid, timestamp, note, pid) VALUES (?, ?, ?, ?)',
//                 [newAnnotation.aid, newAnnotation.timestamp, newAnnotation.note, newAnnotation.pid],
//                 (err, result) => {
//                 if (err) {
//                     console.error(err);
//                     res.status(500).json({ message: 'Error creating annotation' });
//                 } else {
//                     res.status(201).json(newAnnotation);
//                 }
//                 });

//         res.status(201).json(annotation);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Error creating annotation' });
//     }
// };

// // Create a new blank annotation
// async function annotationCreate(pid, timestamp) {
//     const checkExistingSql = 'SELECT * FROM ANNOTATIONS WHERE pid = ? AND timestamp = ?';
//     const createAnnotationSql = 'INSERT INTO ANNOTATIONS(pid, timestamp, note) VALUES(?, ?, ?)';

//     try {
//       // check if annotation already exists
//       const [existingAnnotation] = await conn.promise().query(checkExistingSql, [pid, timestamp]);

//       if (existingAnnotation.length > 0) {
//         return "Annotation already exists at this time";
//       }

//       // get the last annotation ID
//       const [lastAnnotation] = await conn.promise().query('SELECT MAX(aid) AS last_aid FROM ANNOTATIONS');
//       const lastAid = lastAnnotation[0].last_aid || 0; // if no annotations exist, lastAid will be 0

//       // create a new annotation
//       const newAid = lastAid + 1;
//       await conn.promise().query(createAnnotationSql, [pid, timestamp, '']);

//       return "Created annotation " + newAid + "\n";
//     } catch (err) {
//       console.error('Error during annotation creation: ', err);
//       return 'Error during annotation creation';
//     }
//   }

// Edit a blank annotation
// async function annotationEdit(pid, timestamp) {
//     const checkExistingSql = 'SELECT note FROM ANNOTATIONS WHERE pid = ? AND timestamp = ?';

//     try {
//       // check if annotation already exists
//       const [existingAnnotation] = await conn.promise().query(checkExistingSql, [pid, timestamp]);

//       if (existingAnnotation.length > 0) {
//         return existingAnnotation[0].note;
//       } else {
//         return "Select annotation to edit";
//       }
//     } catch (err) {
//       console.error('Error during annotation editing: ', err);
//       return 'Error during annotation editing';
//     }
//   }

// Save the annotation to the db
// async function annotationSave(pid, timestamp, note) {
//     const updateAnnotationSql = 'UPDATE ANNOTATIONS SET note = ? WHERE pid = ? AND timestamp = ?';

//     try {
//       // update the existing annotation
//       const [result] = await conn.promise().query(updateAnnotationSql, [note, pid, timestamp]);

//       if (result.affectedRows > 0) {
//         return "Annotation saved";
//       } else {
//         return "No annotation found to update";
//       }
//     } catch (err) {
//       console.error('Error during annotation saving: ', err);
//       return 'Error during annotation saving';
//     }
//   }

// // Deletes the annotation at the given timestamp with the given PID
// async function annotationDelete(pid, timestamp) {
//     const deleteAnnotationSql = 'DELETE FROM ANNOTATIONS WHERE pid = ? AND timestamp = ?';

//     try {
//       // delete the existing annotation
//       const [result] = await conn.promise().query(deleteAnnotationSql, [pid, timestamp]);

//       if (result.affectedRows > 0) {
//         return "Annotation deleted";
//       } else {
//         return "No annotation found to delete";
//       }
//     } catch (err) {
//       console.error('Error during annotation deletion: ', err);
//       return 'Error during annotation deletion';
//     }
//   }

module.exports = router;
// module.exports.annotationCreate = annotationCreate;
// module.exports.annotationEdit = annotationEdit;
// module.exports.annotationSave = annotationSave;
// module.exports.annotationDelete = annotationDelete;
// module.exports = { createAnnotation, router };
