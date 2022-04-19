const db = require("../config/database");

exports.getCourses = async (req, res) => {
    // const { instructor_id } = req.body;
    const instructor_id = parseInt(req.params.instructor_id);
    const { rows } = await db.query(
      "SELECT * FROM courses WHERE instructor_id = $1",
      [instructor_id]
    );
    res.status(200).send({
        message: "Courses fetched successfully",
        courses: rows
    })
};

// exports.getAssignments = async (req, res) => {
//     // const { course_id } = req.body;
//     const course_id = parseInt(req.params.course_id);
//     const { rows } = await db.query(
//       "SELECT * FROM assignment WHERE course_id = $1",
//       [course_id]
//     );
//     console.log(rows);
//     res.status(200).send({
//         message: "Assignments fetched successfully",
//         courses: rows
//     })
// };

exports.getAssignments = async (req, res) => {
  const course_id = parseInt(req.params.course_id);
  const { rows } = await db.query(
    "SELECT assignment.assignment_id, assignment.assignment_name, assignment.assignment_description, submissions.submission_id, submissions.status, submissions.grade, submissions.files, student.fname, student.lname FROM assignment INNER JOIN submissions ON cast(submissions.assignment_id as int)=assignment.assignment_id INNER JOIN student ON cast(student.student_id as int)=submissions.student_id WHERE assignment.course_id=$1",
    [course_id]
  );
  console.log(rows);
  res.status(200).send({
      message: "Assignments fetched successfully",
      courses: rows
  })
};