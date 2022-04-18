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
        items.push([rows[0].assignment_id, student.student_id, "OPEN", null, ""]);
    });
    console.log("students", student_response.data.body.user);
    const assignment_response = await axios.post("http://localhost:3000/api/assignment/get_assignments", {items: items});
    console.log("assignment", assignment_response.data.message)
    res.status(201).send({
      message: "Assignment created successfully!",
      body: {
        user: { course_id, assignment_name, assignment_description }
      },
    });
  };

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
  };

exports.getAssignments = async (req, res) => {
    const { items } = req.body;
    console.log("Items", items);
    const {rows} = await db.query(
        format('INSERT INTO submissions (assignment_id, student_id, status, files, grade) VALUES %L', items)
    );
    res.status(201).send({
        message: "Assignment added successfully!"
    });
}

exports.getAssignmentsAssociatedWithCourse = async (req, res) => {
    const { course_id, student_id } = req.body;
    const { rows } = await db.query(
    "SELECT assignment.assignment_id, assignment.assignment_name, assignment.assignment_description, submissions.submission_id, submissions.status, submissions.grade, submissions.files FROM assignment INNER JOIN submissions ON cast(submissions.assignment_id as int)=assignment.assignment_id WHERE assignment.course_id=$1 AND submissions.student_id=$2",
      [course_id, student_id]
    );
    console.log(rows);
    res.status(200).send({
        message: "Assignments fetched successfully",
        courses: rows
    })
};