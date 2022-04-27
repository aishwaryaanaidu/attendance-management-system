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
    // const student_response = await axios.post("http://localhost:3001/api/assignment/get_students", {course_id: course_id});
    const student_response = await axios.get(`http://localhost:3001/api/assignment/get_students/${course_id}`);
    let students = student_response.data.user;
    // let students = parseInt(req.params.course_id);
    console.log("students", student_response.data.user);
    let items = [];
    students.forEach(student => {
        items.push([rows[0].assignment_id, student.student_id, "OPEN", null, ""]);
    });
    console.log("students", student_response.data.user);
    const assignment_response = await axios.post("http://localhost:3001/api/assignment/get_assignments", {items: items});
    console.log("assignment", assignment_response.data.message)
    res.status(201).send({
      message: "Assignment created successfully!",
      body: {
        user: { course_id, assignment_name, assignment_description }
      },
    });
  };

exports.getStudents = async (req, res) => {
    // const { course_id } = req.body;
    const course_id = parseInt(req.params.id);
    const { rows } = await db.query(
      "SELECT * FROM student WHERE $1=ANY(list_of_courses)",
      [course_id]
    );
    console.log("course", rows);
    res.status(201).send({
      message: "User added successfully!",
      user: rows
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

// exports.getAssignmentsAssociatedWithCourse = async (req, res) => {
//     const { course_id, student_id } = req.body;
//     const { rows } = await db.query(
//     "SELECT assignment.assignment_id, assignment.assignment_name, assignment.assignment_description, submissions.submission_id, submissions.status, submissions.grade, submissions.files FROM assignment INNER JOIN submissions ON cast(submissions.assignment_id as int)=assignment.assignment_id WHERE assignment.course_id=$1 AND submissions.student_id=$2",
//       [course_id, student_id]
//     );
//     console.log(rows);
//     res.status(200).send({
//         message: "Assignments fetched successfully",
//         courses: rows
//     })
// };

exports.getAssignmentsAssociatedWithStudent = async (req, res) => {
  const student_id = parseInt(req.params.id);
  const { rows } = await db.query(
  "SELECT assignment.assignment_id, assignment.assignment_name, assignment.assignment_description, submissions.submission_id, submissions.status, submissions.grade, submissions.files, courses.course_name FROM assignment INNER JOIN submissions ON cast(submissions.assignment_id as int)=assignment.assignment_id INNER JOIN courses ON cast(courses.course_id as int)=assignment.course_id WHERE submissions.student_id=$1",
    [student_id]
  );
  console.log(rows);
  result = []
  status = ["OPEN", "IN PROGRESS", "RESOLVED", "BLOCKED"]
  status.forEach(item => {
    let temp = {
      id: item,
      title: item,
      label: item,
      cards: [],
      style: {backgroundColor: '#361460', color: 'white'},
      cardStyle: { backgroundColor: 'yellow', color: 'black' }
    }
    rows.forEach(row => {
      if(row.status == item) {
        temp.cards.push({
          id: row.submission_id,
          title: row.assignment_name,
          description: row.assignment_description,
          label: row.course_name
        })
      }
    })
    result.push(temp)
  })
  
  res.status(200).send({
      message: "Assignments fetched successfully",
      tickets: result
  })
};

