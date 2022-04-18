const db = require("../config/database");

exports.getCourses = async (req, res) => {
    const { instructor_id } = req.body;
    const { rows } = await db.query(
      "SELECT * FROM courses WHERE instructor_id = $1",
      [instructor_id]
    );
    res.status(200).send({
        message: "Courses fetched successfully",
        courses: rows
    })
};

exports.getAssignments = async (req, res) => {
    const { course_id } = req.body;
    const { rows } = await db.query(
      "SELECT * FROM assignment WHERE course_id = $1",
      [course_id]
    );
    console.log(rows);
    res.status(200).send({
        message: "Assignments fetched successfully",
        courses: rows
    })
};