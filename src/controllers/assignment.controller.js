const db = require("../config/database");
const axios = require('axios');

let format = require('pg-format');

exports.createAssignment = async (req, res) => {
    const { course_id, assignment_name, assignment_description } = req.body;
    const { rows } = await db.query(
        "INSERT INTO assignment (course_id, assignment_name, assignment_description) VALUES ($1, $2, $3) RETURNING *",
        [course_id, assignment_name, assignment_description]
    );
    console.log("details", rows);
    const student_response = await axios.post("http://localhost:3000/api/assignment/get_students", {course_id: course_id});
    let students = student_response.data.body.user;
    console.log("students", student_response.data.body.user);
    let items = [];
    students.forEach(student => {
        let temp = {};
        // temp.assignment_id = rows[0].assignment_id,
        // temp.student_id = student.student_id,
        // temp.status = "OPEN",
        // temp.files = null,
        // temp.grade = ""
        items.push([rows[0].assignment_id, student.student_id, "OPEN", null, ""]);
    });
    console.log("students", student_response.data.body.user);
    const assignment_response = await axios.post("http://localhost:3000/api/assignment/get_assignments", {items: items});
    console.log("assignment", assignment_response.data.message)
    res.status(201).send({
      message: "User added successfully!",
      body: {
        user: { course_id, assignment_name, assignment_description }
      },
    });
  };


// exports.getStudents = async (req, res) => {
//     // console.log(course_id)
//     const { course_id } = req.body;
//     const { rows } = await db.query(
//         // "SELECT * FROM student WHERE $1=ANY(list_of_courses)",
//         "SELECT * FROM student WHERE student_id=$1",
//         [course_id]
//     )
//     console.log("students1" + rows)
//     return rows
// }

exports.getStudents = async (req, res) => {
    const { course_id } = req.body;
    const { rows } = await db.query(
      "SELECT * FROM student WHERE $1=ANY(list_of_courses)",
      [course_id]
    );
    console.log("course", rows);
    res.status(201).send({
      message: "User added successfully!",
      body: {
        user: rows
      },
    });
    // return rows
  };

exports.getAssignments = async (req, res) => {
    // const { rows } = await db.query(
    //     "INSERT INTO submissions (assignment_id, student_id, status, files, grade) VALUES ($1, $2, $3, $4, $5)",
    //     [rows[0].assignment_id, student.student_id, "OPEN", null, null]
    // );
    // return result;
    const { items } = req.body;
    console.log("Items", items);
    // let sql = "INSERT INTO submissions (assignment_id, student_id, status, files, grade) VALUES ?";
    let sql = "INSERT INTO submissions (assignment_id, student_id, status, files, grade) VALUES ?";
    const {rows} = await db.query(
        // sql,
        // [items.map(item => [item.assignment_id, item.student_id, item.status, item.files, item.grade])]
        // [items]
        format('INSERT INTO submissions (assignment_id, student_id, status, files, grade) VALUES %L', items)
    );
    res.status(201).send({
        message: "Assignment added successfully!"
    });
}