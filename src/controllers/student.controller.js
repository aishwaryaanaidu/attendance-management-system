const db = require("../config/database");
const axios = require('axios');

exports.getCourses = async (req, res) => {
    const { student_id } = req.body;
    const { rows } = await db.query(
      "SELECT list_of_courses FROM student WHERE student_id = $1",
      [student_id]
    );
    // console.log(rows);
    const course_names = await axios.post("http://localhost:3000/api/student/get_course_names", {course_ids: rows[0].list_of_courses});
    // console.log(course_names)
    res.status(200).send({
        message: "Courses fetched successfully",
        course_names: course_names.data.course_names
    });
};

exports.getCourseNames = async (req, res) => {
    const { course_ids } = req.body;
    const { rows } = await db.query(
        'SELECT course_id, course_name FROM courses WHERE course_id = ANY($1::int[])',[course_ids]
    );
    // console.log(rows);
    res.status(200).send({
        message: "Courses fetched successfully",
        course_names: rows
    });
};